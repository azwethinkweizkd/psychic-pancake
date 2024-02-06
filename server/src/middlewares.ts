const jwt = require("jsonwebtoken");
import type {
	Request as ExpressRequest,
	Response,
	NextFunction,
} from "express";

interface CustomRequest extends ExpressRequest {
	payload?: any; // Define the payload property
}

function isAuthenticated(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(401);
		throw new Error("🚫 Un-Authorized 🚫");
	}

	try {
		const token = authorization.split(" ")[1];
		const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		req.payload = payload;
	} catch (err: any) {
		res.status(401);
		if (err.name === "TokenExpiredError") {
			throw new Error(err.name);
		}
		throw new Error("🚫 Un-Authorized 🚫");
	}

	return next();
}

export { isAuthenticated, CustomRequest };
