import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ cookies, locals }) {
		cookies.delete('accessToken', { path: '/' });
		cookies.delete('refreshToken', { path: '/' });
		locals.user = null;

		return redirect(302, '/login');
	}
};
