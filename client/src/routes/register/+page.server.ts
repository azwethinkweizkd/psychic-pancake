import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const firstname = data.get('firstname');
		const lastname = data.get('lastname');
		const email = data.get('email');
		const password = data.get('password');

		try {
			const response = await axios.post(
				'http://localhost:5000/api/auth/register',
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
					secure: import.meta.env.NODE_ENV === 'production',
					maxAge: 60 * 60 * 8
				}),
					cookies.set('accessToken', data.accessToken, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: import.meta.env.NODE_ENV === 'production',
						maxAge: 60 * 30
					});

				return redirect(302, '/dashboard');
			} else {
				console.error('Login failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
};
