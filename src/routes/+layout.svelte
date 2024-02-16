<script>
	import pb from '$lib/pb';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';

	export let data;

	const isLoggedIn = pb.authStore.isValid;
</script>

<nav class="fixed w-full">
	<div class="glass flex items-center justify-between p-4">
		<a href="/"><span class="text-2xl">สาขาเทคโนโลยีสารสนเทศ</span></a>
		<div class="flex gap-x-4">
			<a href="/">Home</a>
			<a href="/timetable">Timetable</a>
			<a href="/instructor">Instructor</a>
			<a href="/subject">Assignment</a>
			{#if isLoggedIn}
				<a href="/profile">Profile</a>
				<a href="/logout">Logout</a>
			{:else}
				<a href="/login">Login</a>
			{/if}
		</div>
	</div>
</nav>
<Toaster />
<div class="h-svh pt-16">
	<slot />
</div>
