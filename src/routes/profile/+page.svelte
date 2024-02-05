<script>
	export let name = 'Your Name';
	export let ID = '1234567890';
	export let department = 'เทคโนโลยีสารสนเทศ';
	export let school = 'โรงเรียนจิตรลดาวิชาชีพ';
	export let email = 'your.email@example.com';

	import Avatar from '$lib/assets/profile.jpeg';
</script>

<div class="profile flex w-full flex-col items-center">
	<div class="flex flex-col items-center justify-center bg-white p-14 gap-y-2">
		<div class="mb-6 flex h-48 w-48 rounded-full">
			<img class="rounded-full object-cover" src={Avatar} alt="Profile Picture" />
		</div>
		<h1>{name}</h1>
		<p>{ID}</p>
		<p>{department}</p>
		<p>{school}</p>
		<p>{email}</p>
	</div>
</div>
