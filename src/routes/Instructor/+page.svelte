<script lang="ts">
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	interface Teacher {
		name: string | undefined;
		field: string | undefined;
		school: string | undefined;
		email: string | undefined;
		profile: string | undefined;
	}

	const authData = pb.authStore.model;
	let teachers_data: Teacher[];

	onMount(async () => {
		if (!authData) {
			window.location.href = '/login';
			return;
		}

		let localTeacher = await pb.collection('users_teacher').getFullList();
		console.log(localTeacher);

		Promise.all(
			localTeacher.map(async (teacher) => {
				const departmentData = await pb
					.collection('department')
					.getOne(teacher.field, { requestKey: teacher.id });
				teacher.field = departmentData.name;

				const schoolData = await pb
					.collection('school')
					.getOne(teacher.school, { requestKey: null });
				teacher.school = schoolData.name;

				teacher.profile = pb.files.getUrl(teacher, teacher.profile);
				return teacher;
			})
		).then(() => {
			teachers_data = localTeacher;
		});
	});
</script>

<div class="profile img-bg flex h-svh w-full justify-center gap-4 pt-8">
	<div class="mx-4 grid h-fit w-[98%] grid-cols-3 justify-center rounded-2xl">
		{#if teachers_data}
			{#each teachers_data as teacher}
				<div class="flex flex-col items-center justify-center rounded-xl p-14">
					<div class="relative z-10 mb-[-6rem] flex h-48 w-48 rounded-full">
						<img
							class="h-48 w-48 rounded-full border-4 border-solid border-white object-cover"
							src={teacher.profile}
							alt="Profile Picture"
						/>
					</div>
					<div
						class="relative flex h-[18rem] w-[24rem] items-center justify-center rounded-xl bg-white"
					>
						<div class="mt-12 flex w-full flex-col items-center justify-center">
							<div class="mb-8 mt-8 flex flex-col items-center justify-center text-lg">
								<span class="text-4xl">{teacher.name}</span>
							</div>
							<p class="text-md">{teacher.field}</p>
							<p class="text-md">{teacher.school}</p>
							<p class="text-md">{teacher.email}</p>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
