import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	let { locals } = event;

	return {
		user: locals.user
	};
};
