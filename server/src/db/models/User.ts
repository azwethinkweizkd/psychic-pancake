export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	refreshTokens: [];
	createdAt: Date;
	updatedAt: Date;
}
