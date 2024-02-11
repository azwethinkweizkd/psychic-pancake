import express from "express";
import { isAuthenticated, CustomRequest } from "../../middlewares";
import axios from "axios";
const router = express.Router();

router.get("/get-all-cards", async (_, res, next) => {
	axios
		.get(
			"https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]",
			{
				headers: {
					"X-API-KEY": process.env.POKEMONTCG_API_KEY,
				},
			}
		)
		.then((response) => {
			// Handle the response here
			console.log(response.data);
		})
		.catch((error) => {
			// Handle errors here
			console.error("Error fetching data:", error);
		});
});

export default router;
