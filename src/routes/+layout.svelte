<script>
	import pb from '$lib/pb';
	import '../app.pcss';

	export let data

	const isLoggedIn = pb.authStore.isValid
</script>

<nav class='w-full fixed'>
	<div class='flex items-center justify-between p-4 text-black backdrop-blur-md bg-opacity-50 bg-white'>
		<span class='text-2xl'>สาขาเทคโนโลยีสารสนเทศ</span>
		<div class='flex gap-x-4'>
			<a href='/'>Home</a>
			<a href='/timetable'>Timetable</a>
			<a href='/instructor'>Instructor</a>
			<a href='/404'>Assignment</a>
			{#if isLoggedIn}
				<a href='/profile'>Profile</a>
				<a href='/logout'>Logout</a>
			{:else}
				<a href='/login'>Login</a>
			{/if}
		</div>
	</div>
</nav>
<div class='pt-16 h-svh'>
	<slot />
</div>
