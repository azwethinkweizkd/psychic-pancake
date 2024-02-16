import axios from 'axios';

export const getUserInfo = async (token: string | undefined) => {
	if (token) {
		const response = await axios.get(`http://localhost:5000/api/users/user-profile`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return {
			user: await response.data
		};
	}
};
