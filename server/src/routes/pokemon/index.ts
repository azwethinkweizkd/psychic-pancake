import { Request, Response } from "express";
import axios from "axios";

const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
	const numsArr: number[] = [];
	while (numsArr.length < count) {
		let randomNum = Math.ceil(Math.random() * max);
		if (!numsArr.includes(randomNum)) {
			numsArr.push(randomNum);
		}
	}
	return numsArr;
};

const pokemonApi = (req: Request, res: Response) => {
	const numsArr = generateUniqueRandomNumbers(6, 151);
	const pokemonPromises = numsArr.map((randomNumPoke) => {
		return axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumPoke}`);
	});

	Promise.all(pokemonPromises)
		.then((responses) => {
			const pokemonData = responses.map((response) => response.data);

			res.json(pokemonData);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send("Internal Server Error");
		});
};

export default pokemonApi;
