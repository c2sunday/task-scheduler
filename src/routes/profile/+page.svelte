<script lang="ts">
	import Avatar from '$lib/assets/profile.jpeg';
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	const authData = pb.authStore.model;

	let PAGE_MODE = 0;

	let name: string, field: string, school: string, email: string, avatarUrl: string, id: string;
	name = field = school = email = id = 'Not Specified';

	onMount(async () => {
		if (!authData) {
			window.location.href = '/login';
			return;
		}

		if (authData.is_teacher) PAGE_MODE = 1;

		const departmentData = await pb.collection('department').getOne(authData.field);
		const schoolData = await pb.collection('school').getOne(authData.school);

		if (!departmentData || !schoolData) return;

		avatarUrl = pb.files.getUrl(authData, authData.profile);
		name = authData.name ? authData.name : 'Not Specified';
		email = authData.email ? authData.email : 'Not Specified';
		field = departmentData.name ? departmentData.name : 'Not Specified';
		school = schoolData.name ? schoolData.name : 'Not Specified';

		if (PAGE_MODE == 0) {
			id = authData.std_id ? authData.std_id : 'Not Specified';
		}
	});
</script>

<div
	class="profile img-bg flex h-svh w-full flex-col items-center justify-center bg-cover bg-center"
>
	<div class="flex flex-col items-center justify-center rounded-xl p-14">
		<div class="relative z-10 mb-[-6rem] flex h-48 w-48 rounded-full">
			<img
				class="h-48 w-48 rounded-full border-4 border-solid border-white object-cover"
				src={avatarUrl}
				alt="Profile Picture"
			/>
		</div>
		<div class="relative flex h-[18rem] w-[24rem] items-center justify-center rounded-xl bg-white">
			<div class="mt-12 flex w-full flex-col items-center justify-center">
				<div class="mb-8 mt-8 flex flex-col items-center justify-center text-lg">
					<span class="text-4xl">{name}</span>
					{#if PAGE_MODE == 0}
						<p class="font-medium">{id}</p>
					{/if}
				</div>
				<p class="text-md">{field}</p>
				<p class="text-md">{school}</p>
				<p class="text-md">{email}</p>
			</div>
		</div>
	</div>
</div>
