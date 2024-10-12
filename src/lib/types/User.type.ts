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
