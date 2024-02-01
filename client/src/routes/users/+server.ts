import axios from 'axios';

export async function GET() {
	try {
		const response = await axios.get('http://localhost:5000/users');
		const data = response.data;

		// Return the response object
		return {
			status: 200,
			body: data
		};
	} catch (error) {
		console.error('Error fetching users:', error);
		// Return an error response
		return {
			status: 500,
			body: { error: 'Internal Server Error' }
		};
	}
}
