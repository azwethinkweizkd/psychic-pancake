const jwt = require("jsonwebtoken");
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt";
import {
	addRefreshTokenToWhiteList,
	findRefreshTokenById,
	deleteRefreshToken,
	revokeTokens,
} from "./auth.services";
import {
	findUserByEmail,
	createUserByEmailAndPassword,
	findUserById,
} from "../users/users.services";
import hashToken from "../../utils/hashToken";

const router = express.Router();

router.post(
	"/register",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { firstname, lastname, email, password } = req.body;
			if (!email || !password) {
				res.status(400);
				throw new Error("You must provide an email and a password");
			}

			const existingUser = await findUserByEmail(email);

			if (existingUser) {
				res.status(400);
				throw new Error("Email is already in use.");
			}

			const user = await createUserByEmailAndPassword({
				firstname,
				lastname,
				email,
				password,
			});
			const jti = uuidv4();
			const { accessToken, refreshToken } = generateTokens(user, jti);
			await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

			res.json({
				accessToken,
				refreshToken,
			});
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	"/login",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				res.status(400);
				throw new Error("You mush provide an email and a password");
			}

			const existingUser = await findUserByEmail(email);

			if (!existingUser) {
				res.status(403);
				throw new Error("Invalid login credentials");
			}

			const validPassword = await bcrypt.compare(
				password,
				existingUser.password
			);
			if (!validPassword) {
				res.status(403);
				throw new Error("Invalid login credentials");
			}

			const jti = uuidv4();
			const { accessToken, refreshToken } = generateTokens(existingUser, jti);
			await addRefreshTokenToWhiteList({
				jti,
				refreshToken,
				userId: existingUser.id,
			});

			res.json({
				accessToken,
				refreshToken,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/refreshToken",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) {
				res.status(400);
				throw new Error("Missing refresh token.");
			}
			const payload = jwt.verify(refreshToken, process.env.JWT_ACCESS_SECRET);
			const savedRefreshToken = await findRefreshTokenById(payload.jti);

			if (!savedRefreshToken || savedRefreshToken.revoked === true) {
				res.status(401);
				throw new Error("Unauthorized");
			}

			const hashedToken = hashToken(refreshToken);
			if (hashedToken !== savedRefreshToken.hashedToken) {
				res.status(401);
				throw new Error("Unauthorized");
			}

			const user = await findUserById(payload.userId);
			if (!user) {
				res.status(401);
				throw new Error("Unauthorized");
			}

			await deleteRefreshToken(savedRefreshToken.id);
			const jti = uuidv4();
			const { accessToken, refreshToken: newRefreshToken } = generateTokens(
				user,
				jti
			);
			await addRefreshTokenToWhiteList({
				jti,
				refreshToken: newRefreshToken,
				userId: user.id,
			});

			res.json({
				accessToken,
				refreshToken: newRefreshToken,
			});
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	"/revokeRefreshTokens",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req.body;
			await revokeTokens(userId);
			res.json({ message: `Tokens revoked for user with id #${userId}` });
		} catch (err) {
			next(err);
		}
	}
);

export default router;
