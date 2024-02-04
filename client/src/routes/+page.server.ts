import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateTokens } from '$lib/auth/auth';

export const load: PageServerLoad = async (event) => {
	if (event.cookies.get('refreshToken')) {
		return await validateTokens(event);
	} else redirect(303, '/login');
};
