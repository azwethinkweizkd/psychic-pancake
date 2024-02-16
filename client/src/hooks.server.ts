import { redirect, type Handle } from '@sveltejs/kit';
import axios from 'axios';
import { validateTokens } from '$lib/auth/auth';
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

const unProtectedRoutes: string[] = ['/', '/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
	let refreshTokenCookie = event.cookies.get('refreshToken');

	if (!refreshTokenCookie && !unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/');

	if (!event.locals.user && refreshTokenCookie) {
		await validateTokens(event).then(async () => {
			let refreshToken = event.cookies.get('refreshToken');
			let userInfoResponse = await getUserInfo(refreshToken);
			let user = userInfoResponse?.user;

			if (user) {
				event.locals.user = user;
			}
		});
	}

	return await resolve(event);
};
