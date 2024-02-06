import { getUserInfo } from '$lib/api/user/user';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const refreshToken = cookies.get('refreshToken');
	return {
		user: await getUserInfo(refreshToken)
	};
};
