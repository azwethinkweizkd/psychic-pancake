const jwt = require("jsonwebtoken");
import { User } from "@prisma/client";

function generateAccessToken(user: User) {
	return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: "5m",
	});
}

function generateRefreshToken(user: User, jti: any) {
	return jwt.sign(
		{
			userId: user.id,
			jti,
		},
		process.env.JWT_ACCESS_SECRET,
		{
			expiresIn: "8h",
		}
	);
}

function generateTokens(user: User, jti: any) {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user, jti);

	return {
		accessToken,
		refreshToken,
	};
}

export { generateAccessToken, generateRefreshToken, generateTokens };
