<script lang="ts">
	import Background from '$lib/assets/class-background.png'
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	const auth = pb.authStore
	let needLogin = false

	if(!auth.isValid) needLogin = true


	let subjects = {revision: 0, data: []}
	let authData

	onMount(async () => {
		if(needLogin) window.location.href = '/login'
		authData = auth.model

		for (const subject of authData.assigned_subjects) {
			const subject_data = await pb.collection('subjects').getOne(subject)
			const instructor_data = await pb.collection('users_teacher').getOne(subject_data.instructor)
			subjects.data.push({...subject_data, instructor_data})
		}
		subjects.revision = 1
	})

</script>

<div class="profile grid grid-cols-4 gap-4 mx-4 pt-4 rounded-full">
	{#key subjects.revision}
	{#each subjects.data as subject}
		<div class="flex flex-col rounded-xl bg-white gap-y-2 border-slate-300 border border-solid h-[20rem] w-[20rem] overflow-hidden">
			<div class='flex h-28 w-full relative'>
				<div style="background-image: url({Background})" class='bg-no-repeat bg-cover h-full w-full bg-center absolute'></div>
				<div class='bg-[#323336] bg-opacity-70 h-full w-full absolute'></div>
				<div class='relative flex flex-col text-white m-3 overflow-hidden'>
					<a href='/' class='hover:underline flex flex-col'>
						<span class='text-xl text-ellipsis overflow-hidden text-nowrap'>{subject.name}</span> <!-- add elipsis when text too long -->
						<span class='text-sm'>{subject.year}/{subject.class}</span>
					</a>
					<span class='text-sm mt-4'>{subject.instructor_data.name}</span>
				</div>
			</div>
			<div class='w-full relative flex-grow p-4'>
				<img class='object-cover relative mt-[-4rem] w-20 h-20 rounded-full float-right ' src={pb.files.getUrl(subject.instructor_data, subject.instructor_data.profile)} alt="instructor profile" />
			</div>
		</div>
	{/each}
	{/key}

</div>
