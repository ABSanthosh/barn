import { type User } from '@prisma/client';
import db from './index';
import { type UserProfile } from '../types/User.type';

// upsert user
export async function upsertUser(user: User) {
	return await db.user.upsert({
		where: { id: user.id },
		update: user,
		create: user
	});
}

// get user by id
export async function getUserById(id: string): Promise<UserProfile | null> {
	const user = await db.user.findUnique({
		where: { id }
	});

	if (!user) return null;
	else
		return {
			email: user.email,
			id: user.id,
			picture: user.picture,
			name: user.name
		};
}
