<script lang="ts">
	import pb from '$lib/pb';
	import { onMount } from 'svelte';

	const authData = pb.authStore.model;
	let timetableUrl = '';

	let PAGE_MODE = 0; // 1 IS TEACHER

	onMount(async () => {
		if (!authData) {
			window.location.href = '/login';
			return;
		}

		if (authData.is_teacher) PAGE_MODE = 1;

		if (PAGE_MODE == 0) {
			try {
				const schoolData = await pb.collection('school').getOne(authData.school);
				if (!schoolData) return;

				const semester = schoolData.semester;
				const timetable = await pb.collection('timetable').getFullList({
					filter: `year = ${authData.year} && field = "${authData.field}" && class = ${authData.class} && semester = ${semester}`
				});
				console.log(timetable);
				timetableUrl = pb.files.getUrl(timetable[0], timetable[0].timetable_img);
			} catch (err) {
				console.log(err);
			}
		}
	});
</script>

<div class="img-bg flex h-full items-center justify-center">
	<div class="flex h-[80%] w-full items-center justify-center">
		<div class="mx-auto h-full w-fit rounded-2xl bg-white px-8">
			<div class="flex flex-col items-center pt-10">
				<span class="text-4xl font-semibold">{PAGE_MODE == 0 ? 'ตารางเรียน' : 'ตารางสอน'}</span>
			</div>
			<div class="mt-14 flex items-center justify-center gap-x-14">
				<img src={timetableUrl} class="w-[55rem]" />
			</div>
		</div>
	</div>
</div>
