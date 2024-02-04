import express, { Request, Response, NextFunction } from "express";
import db from "../../db";
import { isAuthenticated } from "../../middlewares";
import { findUserById } from "./users.services";

const router = express.Router();

router.get("/is-authenticated", isAuthenticated, (req, res) => {
	// Access user information from req.user if needed
	res.json({ message: "Access granted. User authenticated." });
});

router.get("/all-users", async (_: Request, res: Response) => {
	try {
		const users = await db.user.findMany();
		res.json(users);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Something went wrong while retrieving users" });
	}
});

export default router;
