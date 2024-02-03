import express, { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { generateTokens } from "../../utils/jwt";
import { addRefreshTokenToWhiteList } from "./auth.services";
import {
	findUserByEmail,
	createUserByEmailAndPassword,
} from "../users/users.services";

const router = express.Router();

router.post(
	"/register",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.body);
			const { email, password } = req.body;
			if (!email || !password) {
				res.status(400);
				throw new Error("You must provide an email and a password");
			}

			const existingUser = await findUserByEmail(email);

			if (existingUser) {
				res.status(400);
				throw new Error("Email is already in use.");
			}

			const user = await createUserByEmailAndPassword({ email, password });
			const jti = uuid();
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

export default router;
