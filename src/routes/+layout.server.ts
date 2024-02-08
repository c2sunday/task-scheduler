import pb from '$lib/pb'
import type { AuthModel } from 'pocketbase'

interface DataStruct {
	users: AuthModel | null
}

export const load = async () => {
	const data: DataStruct = {
		users: null
	}

	const isAuth = pb.authStore.isValid
	if (isAuth) {
		const store = pb.authStore
		data.users = store.model
		console.log(store.model)
	}

	console.log('entire data:', data)

	return data // RETURN USER DATA BACK
}
