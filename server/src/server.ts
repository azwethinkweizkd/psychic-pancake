import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./routes/users";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
