<script lang="ts">
	import type { PageData } from './$types';
	import pb from '$lib/pb';

	import Background from '$lib/assets/class-background.png';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { ClipboardPen } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
	let tabSet: number = 0;

	let assignment_submitted_map = {};
	data.assignments.reverse();
	let authData = {};

	onMount(async () => {
		const authStore = pb.authStore;
		if (!authStore.isValid) window.location.href = '/login';

		authData = authStore.model;

		if (authData.is_teacher) {
			const all_submitted = await pb.collection('assignments').getFullList({
				filter: `subject = '${data.id}'`
			});

			data.assignments.forEach(async (assignment) => {
				const submitted_stds = assignment.submitted_std;
				let submitted_students = [];
				submitted_stds.forEach(async (std) => {
					const std_data = await pb.collection('users').getOne(std);
					submitted_students.push({ std_data });
				});

				const submitted_count = submitted_stds.length;
				assignment_submitted_map[assignment.id] = {
					total: submitted_count,
					submitted_std: submitted_students
				};
			});
		} else {
			const us_submitted = await pb.collection('assignments').getFullList({
				filter: `submitted_std ~ '${authData.id}' && subject = '${data.id}'`
			});

			data.assignments.forEach((assignment) => {
				assignment_submitted_map[assignment.id] =
					us_submitted.filter((us) => us.id == assignment.id).length != 0;
			});
			console.log(assignment_submitted_map);
		}
	});
</script>

<div class="mx-auto mt-4 flex h-full w-[80%] flex-col bg-white">
	<div
		class="relative flex h-[20rem] w-full rounded-xl bg-[#323336] bg-opacity-70 text-4xl text-white"
	>
		<div
			style="background-image: url({Background})"
			class="absolute h-full w-full rounded-xl bg-cover bg-center bg-no-repeat"
		></div>

		<div class="absolute h-full w-full rounded-xl bg-[#323336] bg-opacity-70"></div>
		<div class="relative flex flex-col justify-end gap-2 p-8">
			<span class="">{data.name}</span>
			<span class="text-2xl">{data.instructor.name}</span>
		</div>
	</div>
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>งานทั้งหมด</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>รายชื่อนักเรียน</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<div class="flex flex-col gap-4">
					{#each data.assignments as assignment}
						<a href="/subject/{data.id}/assignment/{assignment.id}">
							<div
								class="flex items-center justify-between rounded-xl border border-solid border-black border-opacity-20 p-4"
							>
								<div class="flex items-center gap-4">
									<div
										class="rounded-full {assignment_submitted_map[assignment.id] &&
										!authData.is_teacher
											? 'bg-green-500'
											: 'bg-blue-500'} p-2"
									>
										<ClipboardPen class=" text-white" />
									</div>
									<div class="flex flex-col">
										<span class="mb-[-0.2rem] text-lg font-[500]">{assignment.name}</span>
										<span class="text-sm">{assignment.created}</span>
									</div>
								</div>
								{#if assignment_submitted_map[assignment.id] && authData.is_teacher}
									<span>ส่งแล้ว {assignment_submitted_map[assignment.id].total}</span>
								{:else if assignment_submitted_map[assignment.id]}
									<span>ส่งงานเรียบร้อยแล้ว</span>
								{:else}
									<div class="flex items-center gap-4">
										<span>กำหนดส่ง</span>
										<div class="flex flex-col justify-center">
											<span>{new Date(assignment.deadline).toLocaleDateString('th-th')}</span>
											<span>{new Date(assignment.deadline).toLocaleTimeString('th-th')}</span>
										</div>
									</div>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			{:else if tabSet === 1}
				<div class="grid grid-cols-3 gap-4">
					{#each data.students_in_class as student}
						<div class="mx-auto flex h-20 w-[95%] pt-4">
							<div class="relative flex h-20 w-20">
								<img
									class="relative float-right h-20 w-20 rounded-full object-cover"
									src={pb.files.getUrl(student, student.profile)}
									alt="student profile"
								/>
							</div>
							<div class="relative flex flex-col justify-center p-4">
								<span class="text-xl">{student.name}</span>
								<span class="text-sm">{student.email}</span>

								<span class="text-sm">{student.std_id}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
