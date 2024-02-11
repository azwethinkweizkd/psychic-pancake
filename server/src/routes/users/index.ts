import express, { Response, NextFunction } from "express";
import { isAuthenticated, CustomRequest } from "../../middlewares";
import { findUserById } from "./users.services";

const router = express.Router();

router.get(
	"/user-profile",
	isAuthenticated,
	async (req: CustomRequest, res: Response, next: NextFunction) => {
		try {
			const { userId } = req.payload;
			const user = await findUserById(userId);

			let userRes = {
				id: user?.id,
				firstname: user?.firstname,
				lastname: user?.lastname,
				email: user?.email,
			};
			if (user) {
				return res.json(userRes);
			} else {
				return res.status(401).json({ message: "Unauthorized" });
			}
		} catch (error) {
			next(error);
		}
	}
);

export default router;
