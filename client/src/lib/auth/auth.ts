import { redirect } from '@sveltejs/kit';
import { BACKEND_URL_LOCATION, NODE_ENV } from '$env/static/private';
import type { RequestEvent } from '../../routes/$types';
import axios from 'axios';

export async function validateTokens(event: RequestEvent | null) {
	const { cookies } = event;
	try {
		const refreshToken = cookies.get('refreshToken');
		const response = await axios.post(`${BACKEND_URL_LOCATION}/api/auth/refreshToken`, {
			refreshToken
		});

		if (response.status === 200) {
			const { accessToken, refreshToken: newRefreshToken } = response.data;

			cookies.set('refreshToken', newRefreshToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: NODE_ENV === 'production',
				maxAge: 60 * 60 * 8
			}),
				cookies.set('accessToken', accessToken, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: NODE_ENV === 'production',
					maxAge: 60 * 30
				});
		} else {
			return redirect(302, '/');
		}
	} catch (error) {
		console.error('Error validating tokens:', error);
		return error;
	}
}
