import type { Handle } from '@sveltejs/kit';
import axios from 'axios';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	return response;
};
