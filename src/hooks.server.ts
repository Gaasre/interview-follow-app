import { getSelf } from '$api/user';
import type { User } from '$types/types';
import type { Handle } from '@sveltejs/kit';
import { sessionToken } from './stores';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token) {
		sessionToken.set(token);
		try {
			const user = await getSelf();

			if (!user) {
				throw new Error('User not found');
			}

			const sessionUser: User = {
				id: user.id,
				email: user.email,
				name: user.name
			};

			console.log(sessionUser);

			event.locals.user = sessionUser;
		} catch (error) {
			console.error(error);
		}
	}

	return await resolve(event);
};
