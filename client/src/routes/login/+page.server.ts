import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			const response = await fetch('http://localhost:5000/api/auth/login', {
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
