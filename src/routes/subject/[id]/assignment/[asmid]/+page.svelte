<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import pb from '$lib/pb';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	let authData;

	onMount(() => {
		if (!pb.authStore.isValid) window.location.href = '/login';
		authData = pb.authStore.model;
	});

	let students_assignments_state = data.students_assignments_state;

	const handleCheckboxChange = (e) => {
		console.log(students_assignments_state);
		let submitted_std = [];
		for (let std_id in students_assignments_state) {
			if (students_assignments_state[std_id].submitted) {
				submitted_std.push(std_id);
			}
		}
		pb.collection('assignments')
			.update(data.assignment_info.id, {
				submitted_std
			})
			.then(() => {
				toast.success('บันทึกการส่งงานเรียบร้อย');
			});
	};
</script>

<div class="mx-auto mt-4 w-[80%]">
	<div class="flex flex-col">
		<span class="text-4xl font-bold">{data.assignment_info.name}</span>
		<div>
			<span>{data.instructor.name}</span>
			<span>{new Date(data.assignment_info.created).toLocaleDateString('th-th')}</span>
		</div>
	</div>
	<div class="mt-8 flex flex-col">
		<span class="text-3xl font-semibold">รายละเอียดงาน</span>
		<span class="mt-2">{data.assignment_info.description}</span>
	</div>
	{#if authData && authData.is_teacher}
		<div class="mt-8 flex flex-col gap-8">
			<div>
				<span class="text-3xl font-semibold">นักเรียนทั้งหมด</span>
				<div class="mt-4 grid grid-cols-4 gap-4">
					{#each Object.entries(students_assignments_state) as [std_id, std]}
						<div
							class="flex items-center justify-between rounded-xl border border-solid border-black border-opacity-20 p-4"
						>
							<div class="flex items-center gap-4">
								<div class="relative flex h-16 w-16">
									<img
										src={pb.getFileUrl(std, std.profile)}
										class="rounded-full object-cover"
										alt="profile"
									/>
								</div>
								<div class="flex flex-col">
									<span>{std.name}</span>
									<span>{std.std_id}</span>
								</div>
							</div>
							<div>
								<input
									bind:checked={students_assignments_state[std_id].submitted}
									on:change={handleCheckboxChange}
									type="checkbox"
									class="checkbox checkbox-accent h-4 w-4"
								/>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
