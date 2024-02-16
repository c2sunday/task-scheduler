import pb from '$lib/pb';
import { error } from '@sveltejs/kit';
import { onMount } from 'svelte';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const id = params.id;
	let data, instructor;

	try {
		data = await pb.collection('subjects').getOne(id);
		instructor = await pb.collection('users_teacher').getOne(data.instructor);
	} catch (err) {
		error(404, 'Not found');
	}

	if (!data || !instructor) return;

	let students_in_class = [];

	const tmp_students = await pb.collection('users').getFullList({
		filter: `assigned_subjects ~ '${id}'`
	});

	console.log(tmp_students);
	for (const student of tmp_students) {
		console.log(student);
		if (student.assigned_subjects.includes(id)) {
			students_in_class.push(student);
		}
	}

	const assignments = await pb
		.collection('assignments')
		.getFullList({ filter: `subject = '${id}' && class = ${data.class} && year = ${data.year}` });
	return { ...data, instructor, students_in_class, assignments };
}
