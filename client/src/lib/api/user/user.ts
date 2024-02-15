import axios from 'axios';
import { BACKEND_URL_LOCATION } from '$env/static/private';

export const getUserInfo = async (token: string | undefined) => {
	if (token) {
		const response = await axios.get(`${BACKEND_URL_LOCATION}/api/users/user-profile`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return {
			user: await response.data
		};
	}
};
