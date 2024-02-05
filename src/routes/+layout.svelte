<script>
	import '../app.pcss';
</script>

<nav class='w-full fixed'>
	<div class='flex items-center justify-between p-4 text-black backdrop-blur-md bg-opacity-50 bg-white'>
		<span class='text-2xl'>สาขาเทคโนโลยีสารสนเทศ</span>
		<div class='flex gap-x-4'>
			<span>Home</span>
			<span>Timetable</span>
			<span>Profile</span>
			<span>Instructor</span>
			<span>Assignment</span>
		</div>
	</div>
</nav>
<div class='pt-20'>
<slot />
</div>
