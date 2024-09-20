import { redirect } from '@sveltejs/kit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';
import { OAuth2Client } from 'google-auth-library';
import { upsertUser } from '$db/User.db.js';

export async function GET({ url, cookies }) {
	const code = url.searchParams.get('code');

	try {
		const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
		const response = await client.getToken(code!);
		client.setCredentials(response.tokens);
		const payload = (
			await client.verifyIdToken({
				idToken: client.credentials.id_token!,
				audience: GOOGLE_CLIENT_ID
			})
		).getPayload();

		if (payload)
			await upsertUser({
				id: payload.sub,
				email: payload.email || '',
				name: payload.name || '',
				picture: payload.picture || '',
				accessToken: client.credentials.access_token!,
				refreshToken: client.credentials.refresh_token!,
				createdAt: new Date(),
				updatedAt: new Date(),
				googleId: payload.sub,
				idToken: client.credentials.id_token!
			});
		else throw redirect(303, '/?error=No%20payload%20found');

		cookies.set('session', payload.sub, {
			httpOnly: true, // Ensure this cookie cannot be accessed via client-side JavaScript
			path: '/',
			secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
			maxAge: 60 * 60 * 24 * 7 // 1 week expiration
		});
	} catch (error) {
		console.error(error);
		return redirect(303, '/?error=Failed%20to%20authenticate');
	}

	return redirect(303, '/app');
}
