import type { PageServerLoad } from './$types';
import { validateTokens } from '$lib/auth/auth';

export const load: PageServerLoad = async (event) => {
	let refreshTokenCookie = event.cookies.get('refreshToken');

	if (refreshTokenCookie) {
		return await validateTokens(event);
	}
};
