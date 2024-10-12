import { type User } from '@prisma/client';
import db from './index';
import { type UserProfile, type UserSettings } from '../types/User.type';

// upsert user
export async function upsertUser(user: User, settings: UserSettings) {
	const { createdAt, updatedAt, newUser, ...userWithoutTimestamps } = user;

	return await db.user.upsert({
		where: { id: userWithoutTimestamps.id },
		update: userWithoutTimestamps,
		create: {
			...userWithoutTimestamps,
			settings: {
				create: {
					settings: JSON.stringify(settings)
				}
			}
		}
	});
}

// get user by id
export async function getUserById(id: string): Promise<
	| (UserProfile & {
			settings: UserSettings;
	  })
	| null
> {
	const user = await db.user.findUnique({
		where: { id },
		include: { settings: true }
	});
	if (!user) return null;
	else {
		return {
			email: user.email,
			id: user.id,
			picture: user.picture,
			name: user.name,
			newUser: user.newUser,
			updatedAt: user.updatedAt!,
			premiumUser: user.premiumUser,
			settings: JSON.parse(`${user?.settings[0].settings}`)
		};
	}
}

export async function takeUserVirginity(userId: string) {
	return await db.user.update({
		where: { id: userId },
		data: { newUser: false }
	});
}

export async function updateUserName(userId: string, name: string) {
	return await db.user.update({
		where: { id: userId },
		data: { name }
	});
}

export async function updateUserSetting(userId: string, setting: UserSettings) {
	return await db.userSettings.upsert({
		where: { userId },
		update: {
			userId,
			settings: JSON.stringify(setting)
		},
		create: {
			userId,
			settings: JSON.stringify(setting)
		}
	});
}

export async function makeUserPremium(userId: string) {
	return await db.user.update({
		where: { id: userId },
		data: { premiumUser: true }
	});
}
