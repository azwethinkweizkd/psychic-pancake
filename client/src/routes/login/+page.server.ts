import { BACKEND_URL_LOCATION, NODE_ENV } from '$env/static/private';
import { getUserInfo } from '../../hooks.server';

export const actions = {
	default: async ({ cookies, request, locals }: any) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			const response = await fetch(`${BACKEND_URL_LOCATION}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			if (response.ok) {
				const responseData = await response.json();
				cookies.set('refreshToken', responseData.refreshToken, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: NODE_ENV === 'production',
					maxAge: 60 * 60 * 8
				}),
					cookies.set('accessToken', responseData.accessToken, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: NODE_ENV === 'production',
						maxAge: 60 * 30
					});

				locals.user = await getUserInfo(responseData.refreshToken);
			} else {
				console.error('Login failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
};
