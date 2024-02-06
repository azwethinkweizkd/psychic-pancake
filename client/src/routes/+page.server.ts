import type { PageServerLoad } from './$types';
import { validateTokens } from '$lib/auth/auth';

export const load: PageServerLoad = async (event) => {
	let { cookies } = event;
	let refreshTokenCookie = cookies.get('refreshToken');

	if (refreshTokenCookie) {
		await validateTokens(event);
	}
};
