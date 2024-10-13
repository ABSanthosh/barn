import { addUserBookmark, removeUserBookmark } from '$db/Bookmark.db.js';
import type { Bookmark } from '$types/Bookmark.type.js';

export const DELETE = async ({ request }) => {
	const { userId, articleId } = (await request.json()) as { userId: string; articleId: string };

	try {
		const result = await removeUserBookmark(userId, articleId);

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

export const POST = async ({ request }) => {
	const { userId, bookmark } = (await request.json()) as { userId: string; bookmark: Bookmark };

	try {
		const result = await addUserBookmark(userId, bookmark);
		return new Response(JSON.stringify({ result }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
