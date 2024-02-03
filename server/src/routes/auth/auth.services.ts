import db from "../../db/index";
import hashToken from "../../utils/hashToken";

interface RefreshTokenData {
	jti: any;
	refreshToken: any;
	userId: string;
}

function addRefreshTokenToWhiteList({
	jti,
	refreshToken,
	userId,
}: RefreshTokenData) {
	return db.refreshToken.create({
		data: {
			id: jti,
			hashedToken: hashToken(refreshToken),
			userId,
		},
	});
}

function findRefreshTokenById(id: string) {
	return db.refreshToken.findUnique({
		where: {
			id,
		},
	});
}

function deleteRefreshToken(id: string) {
	return db.refreshToken.update({
		where: {
			id,
		},
		data: {
			revoked: true,
		},
	});
}

function revokeTokens(userId: string) {
	return db.refreshToken.updateMany({
		where: {
			userId,
		},
		data: {
			revoked: true,
		},
	});
}

export {
	addRefreshTokenToWhiteList,
	findRefreshTokenById,
	deleteRefreshToken,
	revokeTokens,
};
