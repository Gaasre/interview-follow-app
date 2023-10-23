import { getSelf } from '$api/user';
import type { User } from '$types/types';
import { redirect, type Handle } from '@sveltejs/kit';
import { sessionToken } from './stores';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	const requestedPath = event.url.pathname;

	if (token) {
		sessionToken.set(token);
		try {
			const user = await getSelf();

			if (!user) {
				if (requestedPath.startsWith('/dashboard')) {
					// not a public route and we don't have a token
					// redirect to signin
					throw redirect(303, '/signin');
				}
			}

			if (!requestedPath.startsWith('/dashboard')) {
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
		} catch (error) {
			event.cookies.delete('token');
			throw redirect(303, '/');
		}
	} else {
		if (requestedPath.startsWith('/dashboard')) {
			// not a public route and we don't have a token
			// redirect to signin
			throw redirect(303, '/signin');
		}
	}

	return await resolve(event);
};
