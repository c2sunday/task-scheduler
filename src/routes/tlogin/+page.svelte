<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import pb from "$lib/pb";
	import { onMount } from "svelte";

	onMount(() => {
		if(pb.authStore.isValid) window.location.href = '/'
	})

	const handleLogin = async (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement)
		try {
		const authData = await pb.collection('users_teacher').authWithPassword(formData.get('email'), formData.get('password'))
		if(authData) window.location.href = '/'
		console.log(authData)

		} catch(error) {
			alert('Failed to authenticate, please try again')
		}
	}
	
</script>

<div class='h-full flex items-center justify-center'>
	<div class='bg-white p-4 rounded-2xl'>
		<div class='flex flex-col gap-4 justify-center items-center'>
			<span class='text-2xl'>Login</span>
			<form class='flex flex-col gap-2' on:submit|preventDefault={handleLogin}>
				<input type='text' class='rounded-full' name='email' placeholder='E-Mail Address' />
				<input type='password' class='rounded-full' name='password' placeholder='Password' />
				<a href='/login' class='mb-2 text-sm'>Login as Student</a>
				<button class='bg-black text-white p-2 rounded-full'>Login</button>
			</form>
		</div>
	</div>	
</div>
