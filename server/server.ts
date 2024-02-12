// server.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

interface User {
	id: number;
	email: string;
	name?: string;
}

app.get("/api/users", async (req: Request, res: Response) => {
	try {
		const users: User[] = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		console.error("Error retrieving users:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
