import axios from 'axios';
import { BACKEND_URL_LOCATION, NODE_ENV } from '$env/static/private';
import { getUserInfo } from '../../hooks.server.js';

export const actions = {
	default: async ({ cookies, request, locals }: any) => {
		const data = await request.formData();
		const firstname = data.get('firstname');
		const lastname = data.get('lastname');
		const email = data.get('email');
		const password = data.get('password');

		try {
			const response = await axios.post(
				`${BACKEND_URL_LOCATION}/api/auth/register`,
				{
					firstname,
					lastname,
					email,
					password
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (response.status === 200) {
				const { data } = response;

				cookies.set('refreshToken', data.refreshToken, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: NODE_ENV === 'production',
					maxAge: 60 * 60 * 8
				}),
					cookies.set('accessToken', data.accessToken, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: NODE_ENV === 'production',
						maxAge: 60 * 30
					});
				locals.user = await getUserInfo(data.refreshToken);
			} else {
				console.error('Login failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
};
