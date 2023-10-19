import { getSelf } from '$api/user';
import type { User } from '$types/types';
import { redirect, type Handle } from '@sveltejs/kit';
import { sessionToken } from './stores';

const PUBLIC_ROUTES = ['/signin', '/signup', '/'];
const AUTH_ROUTES = ['/signin', '/signup'];

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token) {
		sessionToken.set(token);
		const user = await getSelf();

		const requestedPath = event.url.pathname;

		if (!user) {
			if (!PUBLIC_ROUTES.some((value) => requestedPath.startsWith(value))) {
				// not a public route and we don't have a user
				// redirect to signin
				throw redirect(303, '/signin');
			}
		}

		if (AUTH_ROUTES.some((value) => requestedPath.startsWith(value))) {
			// auth route and we already have a user
			// redirect to the dashboard
			throw redirect(303, '/dashboard');
		}

		const sessionUser: User = {
			id: user.id,
			email: user.email,
			name: user.name
		};

		event.locals.user = sessionUser;
	}

	return await resolve(event);
};
