import { redirect, type Handle } from '@sveltejs/kit';
import { getUserInfo } from '$lib/api/user/user';

const unProtectedRoutes: string[] = ['/', '/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
	let refreshTokenCookie = event.cookies.get('refreshToken');

	if (!refreshTokenCookie && !unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/');

	if (refreshTokenCookie) {
		let refreshToken = event.cookies.get('refreshToken');
		let userInfoResponse = await getUserInfo(refreshToken);
		let user = userInfoResponse?.user;

		if (user) {
			event.locals.user = user;
		}
	}

	return await resolve(event);
};
