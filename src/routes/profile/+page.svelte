<script lang="ts">

	import Avatar from '$lib/assets/profile.jpeg';
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	const authData = pb.authStore.model

	let PAGE_MODE = 0

	let name: string, field: string, school: string, email: string, avatarUrl: string, id: string
	name = field = school = email = id = 'Not Specified'

	onMount(async () => {
		if(!authData) {
			window.location.href = '/login'
			return
		}

		if(authData.is_teacher) PAGE_MODE = 1

		const departmentData = await pb.collection('department').getOne(authData.field)
		const schoolData = await pb.collection('school').getOne(authData.school)

		if(!departmentData || !schoolData) return

		avatarUrl = pb.files.getUrl(authData, authData.profile)
			name = authData.name ? authData.name : 'Not Specified'
			email = authData.email ? authData.email : 'Not Specified'
			field = departmentData.name ? departmentData.name : 'Not Specified'
			school = schoolData.name ? schoolData.name : 'Not Specified'

		if(PAGE_MODE == 0) {
			id = authData.std_id ? authData.std_id : 'Not Specified'
		}
	})
</script>


<div class="profile flex h-svh w-full flex-col items-center justify-center">
	<div class="flex flex-col items-center justify-center bg-white p-14 gap-y-2">
		<div class="mb-6 flex h-48 w-48 rounded-full">
			<img class="rounded-full object-cover" src={avatarUrl} alt="Profile Picture" />
		</div>
		<h1>{name}</h1>
		{#if PAGE_MODE == 0}
		<p>{id}</p>
		{/if}
		<p>{field}</p>
		<p>{school}</p>
		<p>{email}</p>
	</div>
</div>
