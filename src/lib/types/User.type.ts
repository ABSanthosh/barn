export interface UserProfile {
	id: string;
	email: string;
	name: string;
	picture: string | null;
	newUser: boolean;
	premiumUser: boolean;
	updatedAt: Date;
}

export type UserSettings = {
	phone: string | null;
	isStudent: boolean;
	school: string | null;
	dateOfBirth: string | null;
	theme: Theme;
	articlesPerPage: number;
};

export type User = {
	id: string;
	googleId: string;
	email: string;
	name: string;
	picture: string | null;
	newUser: boolean;
	accessToken: string;
	refreshToken: string;
	idToken: string | null;
	premiumUser: boolean;
	createdAt: Date | null;
	updatedAt: Date | null;
}