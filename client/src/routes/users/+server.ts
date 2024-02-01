import axios from 'axios';

export async function get() {
	const { data } = await axios.get('http://localhost:5000/api/users');
	return {
		body: {
			users: data
		}
	};
}
