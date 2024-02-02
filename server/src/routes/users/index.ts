import express, { Request, Response } from "express";
import db from "../../db";

const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
	try {
		const users = await db.user.findMany();
		res.json(users);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Something went wrong while retrieving users" });
	}
});

export default usersRouter;
