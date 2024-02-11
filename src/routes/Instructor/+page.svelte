<script lang="ts">
	import pb from "$lib/pb";
	import { onMount } from "svelte";

	interface Teacher {
		name: string | undefined;
		field: string | undefined;
		school: string | undefined;
		email: string | undefined;
		profile: string | undefined;
	}

	const authData = pb.authStore.model
	let teachers_data: Teacher[]

	onMount(async () => {
		if(!authData) {
			window.location.href = '/login'
			return
		}

		let localTeacher = await pb.collection('users_teacher').getFullList()
		console.log(localTeacher)

		Promise.all(localTeacher.map(async teacher => {
			const departmentData = await pb.collection('department').getOne(teacher.field, {requestKey: teacher.id})
			teacher.field = departmentData.name

			const schoolData = await pb.collection('school').getOne(teacher.school, {requestKey: null})
			teacher.school = schoolData.name

			teacher.profile = pb.files.getUrl(teacher, teacher.profile)
			return teacher
		})).then(() => {
			teachers_data = localTeacher
		})

	})

</script>

<div class="profile grid grid-cols-3 gap-4 mx-4 items-center justify-center h-svh">
	{#if teachers_data}
		{#each teachers_data as teacher}
			<div class="flex flex-col items-center justify-center bg-white p-14 gap-y-2">
				<div class="mb-6 flex h-48 w-48 rounded-full">
					<img class="rounded-full object-cover" src={teacher.profile} alt="Profile Picture" />
				</div>
				<h1>{teacher.name}</h1>
			<p>{teacher.field}</p>
			<p>{teacher.school}</p>
			<p>{teacher.email}</p>
			</div>
		{/each}
	{/if}
</div>
