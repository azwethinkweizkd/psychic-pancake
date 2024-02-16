import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ cookies, locals }) {
		locals.user = null;
		cookies.delete('accessToken', { path: '/' });
		cookies.delete('refreshToken', { path: '/' });

		return redirect(302, '/login');
	}
};
