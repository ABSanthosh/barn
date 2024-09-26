import { type User } from '@prisma/client';
import db from './index';
import { type UserProfile } from '../types/User.type';

// upsert user
export async function upsertUser(user: User) {
	const { createdAt, updatedAt, ...userWithoutTimestamps } = user;

	return await db.user.upsert({
		where: { id: userWithoutTimestamps.id },
		update: userWithoutTimestamps,
		create: userWithoutTimestamps
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
			name: user.name,
			newUser: user.newUser
		};
}

export async function takeUserVirginity(userId: string){
	return await db.user.update({
		where: { id: userId },
		data: { newUser: false }
	});
}