import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../../routes/$types';
import axios from 'axios';

export async function validateTokens(event: RequestEvent) {
	const { cookies } = event;
	try {
		const refreshToken = cookies.get('refreshToken');
		const response = await axios.post('http://localhost:5000/api/auth/refreshToken', {
			refreshToken
		});

		if (response.status === 200) {
			const { accessToken, refreshToken: newRefreshToken } = response.data;

			cookies.set('refreshToken', newRefreshToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: import.meta.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 8
			});

			cookies.set('accessToken', accessToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: import.meta.env.NODE_ENV === 'production',
				maxAge: 60 * 5
			});
		} else {
			throw redirect(303, '/login');
		}
	} catch (error) {
		console.error('Error validating tokens:', error);
		return error;
	}
}
