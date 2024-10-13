import db from '$db';
import type { Bookmark } from '$types/Bookmark.type';

// addUserBookmark
export const addUserBookmark = async (userId: string, bookmark: Bookmark) => {
	return await db.userBookmark.create({
		data: {
			userId,
			...bookmark
		}
	});
};

export const removeUserBookmark = async (userId: string, articleId: string) => {
	return await db.userBookmark.deleteMany({
		where: {
			userId,
			articleId
		}
	});
};

export const getAllUserBookmark = async (userId: string) => {
	return await db.userBookmark.findMany({
		where: {
			userId
		}
	});
};
