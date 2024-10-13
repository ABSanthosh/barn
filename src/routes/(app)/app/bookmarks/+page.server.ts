import { getAllUserBookmark } from '$db/Bookmark.db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, depends }) => {
	depends('bookmarks:count');
	return {
		bookmarks: await getAllUserBookmark(locals.user!.id)
	};
};
