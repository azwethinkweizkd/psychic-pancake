import express, { Express, Request, Response } from "express";
import https from "https";
import fs from "fs";

import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// if (process.env.NODE_ENV === "development") {
// 	const options = {
// 		key: fs.readFileSync("./src/ssl/server.key"),
// 		cert: fs.readFileSync("./src/ssl/server.cert"),
// 	};

// 	https.createServer(options, app).listen(PORT, () => {
// 		console.log(`Server running on https://localhost:${PORT}`);
// 	});
// } else {

// }
