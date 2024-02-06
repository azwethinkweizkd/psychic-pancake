import { redirect, type Handle } from '@sveltejs/kit';
import { getUserInfo } from '$lib/api/user/user';

const unProtectedRoutes: string[] = ['/', '/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
	let refreshTokenCookie = event.cookies.get('refreshToken');

	if (!refreshTokenCookie && !unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/');

	return await resolve(event);
};
