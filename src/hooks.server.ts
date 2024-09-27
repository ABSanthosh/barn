import { getUserById } from '$db/User.db';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authentication: Handle = async ({ event, resolve }) => {
	const googleSub = event.cookies.get('session');
	if (googleSub) {
		const user = await getUserById(googleSub);

		if (user) {
			event.locals.user = user;
		} else {
			event.cookies.delete('session', {
				path: '/'
			});
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};

const authorization: Handle = async ({ event, resolve }) => {
	const googleSub = event.cookies.get('session');
	const protectedRoutes = ['/app'];

	if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!googleSub) {
			throw redirect(303, '/?error=unauthorized');
		}

		// This is a new user, redirect them to the onboarding page
		// Prevents redirect loop when user is already on the onboarding page
		if (event.locals.user?.newUser && !event.url.pathname.startsWith('/app/onboarding')) {
			throw redirect(303, '/app/onboarding/feed');
		} else if (!event.locals.user?.newUser && !event.url.pathname.startsWith('/app')) {
			throw redirect(303, '/app');
		}
	}

	return resolve(event);
};

export const handle = sequence(authentication, authorization);
