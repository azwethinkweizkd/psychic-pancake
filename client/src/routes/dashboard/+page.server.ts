import { getUserInfo } from '$lib/api/user/user';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	let { cookies, locals } = event;
	let refreshToken = cookies.get('refreshToken');
	let userInfoResponse = await getUserInfo(refreshToken);
	let user = userInfoResponse?.user;

	if (user) {
		locals.user = user;
		return {
			user: locals.user
		};
	}
};
