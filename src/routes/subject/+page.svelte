<script lang="ts">
	import Background from '$lib/assets/class-background.png';
	import pb from '$lib/pb';
	import { onMount } from 'svelte';
	import { Plus, X } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	const auth = pb.authStore;
	let needLogin = false;

	if (!auth.isValid) needLogin = true;

	let subjects = { revision: 0, data: [] };
	let authData;

	onMount(async () => {
		if (needLogin) window.location.href = '/login';
		authData = auth.model;

		if (authData.is_teacher) {
			const subjectList = await pb
				.collection('subjects')
				.getFullList({ filter: `instructor = '${authData.id}'` });
			for (const subject of subjectList) {
				const instructor_data = await pb.collection('users_teacher').getOne(subject.instructor);
				subjects.data.push({ ...subject, instructor_data });
			}
			subjects.revision = 1;
		} else {
			for (const subject of authData.assigned_subjects) {
				const subject_data = await pb.collection('subjects').getOne(subject);
				const instructor_data = await pb
					.collection('users_teacher')
					.getOne(subject_data.instructor);
				subjects.data.push({ ...subject_data, instructor_data });
			}

			subjects.revision = 1;
		}
	});

	let addClassModal;

	const addClass = () => {
		addClassModal.showModal();
	};

	const handleJoinClass = async (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const id = formData.get('classID');
		e.target.reset();

		try {
			const existing = await pb.collection('users').getOne(authData.id);
			if (existing.assigned_subjects.includes(id)) {
				addClassModal.close();
				toast.error('คุณได้เข้าชั้นเรียนนี้อยู่แล้ว');
				return;
			}
			await pb.collection('users').update(authData.id, {
				assigned_subjects: [...authData.assigned_subjects, id]
			});
			const new_subject_data = await pb.collection('subjects').getOne(id);
			const instructor_data = await pb
				.collection('users_teacher')
				.getOne(new_subject_data.instructor);
			subjects.data.push({ ...new_subject_data, instructor_data });
			addClassModal.close();
			toast.success('เข้าร่วมชั้นเรียนสำเร็จ');
			subjects.revision++;
		} catch (ex) {
			console.error(ex);
			toast.error('ไม่พบรหัสชั้นเรียนที่คุณระบุ');
			// TODO: ADD TOAST FOR SHOWING ERRORS
		}
	};
</script>

<dialog class="modal" id="addClassModal" bind:this={addClassModal}>
	<Toaster />

	<div class="bg-base-200 relative rounded-xl p-8">
		<a
			role="button"
			on:click={() => {
				addClassModal.close();
			}}
		>
			<X class="absolute right-4 top-4" />
		</a>
		<span class="text-2xl">เข้าร่วมชั้นเรียน</span>
		<div class="mt-4 flex flex-col gap-4">
			<form on:submit|preventDefault={handleJoinClass}>
				<input
					name="classID"
					type="text"
					class="input input-bordered"
					placeholder="รหัสชั้นเรียน"
				/>
				<button class="btn btn-outline text-neutral bg-info">เข้าร่วม</button>
			</form>
		</div>
	</div>
</dialog>

<div class="profile mx-4 grid grid-cols-4 gap-4 rounded-full pt-4">
	{#key subjects.revision}
		{#each subjects.data as subject}
			<div
				class="flex h-[20rem] w-[20rem] flex-col gap-y-2 overflow-hidden rounded-xl border border-solid border-slate-300 bg-white"
			>
				<div class="relative flex h-28 w-full">
					<div
						style="background-image: url({Background})"
						class="absolute h-full w-full bg-cover bg-center bg-no-repeat"
					></div>
					<div class="absolute h-full w-full bg-[#323336] bg-opacity-70"></div>
					<div class="relative m-3 flex flex-col overflow-hidden text-white">
						<a href="/subject/{subject.id}" class="flex flex-col hover:underline">
							<span class="overflow-hidden text-ellipsis text-nowrap text-xl">{subject.name}</span>
							<!-- add elipsis when text too long -->
							<span class="text-sm">{subject.year}/{subject.class}</span>
						</a>
						<span class="mt-4 text-sm">{subject.instructor_data.name}</span>
					</div>
				</div>
				<div class="relative w-full flex-grow p-4">
					<img
						class="relative float-right mt-[-4rem] h-20 w-20 rounded-full object-cover"
						src={pb.files.getUrl(subject.instructor_data, subject.instructor_data.profile)}
						alt="instructor profile"
					/>
				</div>
			</div>
		{/each}
	{/key}
</div>

{#if authData && !authData.is_teacher}
	<a on:click={addClass} role="button">
		<div class="absolute bottom-4 right-4 w-fit rounded-full bg-blue-400 p-4">
			<Plus size={24} />
		</div>
	</a>
{/if}
