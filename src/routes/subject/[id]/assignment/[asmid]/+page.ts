import pb from '$lib/pb';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const subject_id = params.id;
	const id = params.asmid;

	try {
		const subject = await pb.collection('subjects').getOne(subject_id);
		const instructor = await pb.collection('users_teacher').getOne(subject.instructor);
		const assignment_info = await pb.collection('assignments').getOne(id);

		const students_assignments_state = {};

		for (const std of assignment_info.submitted_std) {
			const student = await pb.collection('users').getOne(std);
			students_assignments_state[std] = { ...student, submitted: true };
		}

		// check non submitted by all students minus the one in submitted_std
		const students = await pb.collection('users').getFullList({
			filter: `assigned_subjects ~ '${subject_id}'`
		});
		for (const std of students) {
			if (!assignment_info.submitted_std.includes(std.id)) {
				students_assignments_state[std.id] = { ...std, submitted: false };
			}
		}

		return { subject_id, assignment_info, instructor, students_assignments_state };
	} catch (ex) {
		console.error(ex);
		return;
	}
}
