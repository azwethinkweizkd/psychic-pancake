import { BACKEND_URL_LOCATION } from '$env/static/private';
import type { PokemonCard, Pokemon, Move } from '$lib/types/pokemon';
import axios from 'axios';

export async function load() {
	let pokemonCards: PokemonCard[] = [];
	let isLoading = true;

	try {
		const response = await axios.get<Pokemon[]>(`${BACKEND_URL_LOCATION}/api/pokemon`);
		const pokemons = response.data;

		pokemons.forEach((pokemon) => {
			const filteredMoves = pokemon.moves.filter((move) => {
				const redBlueVersions = move.version_group_details.filter((detail) => {
					return detail.version_group.name === 'red-blue' && detail.level_learned_at >= 1;
				});
				return redBlueVersions.length > 0;
			});

			let selectedMoves: Move[] = [];
			for (let i = 0; i < 2 && i < filteredMoves.length; i++) {
				const randomIndex = Math.floor(Math.random() * filteredMoves.length);
				selectedMoves.push(filteredMoves[randomIndex]);
				filteredMoves.splice(randomIndex, 1);
			}

			const hpStat = pokemon.stats.find((stat) => stat.stat.name === 'hp');
			const spriteString = pokemon.sprites.front_default;
			const newPokemonCard: PokemonCard = {
				name: pokemon.name,
				sprite: spriteString,
				hp: hpStat ? hpStat.base_stat : 0,
				moves: selectedMoves
			};
			pokemonCards.push(newPokemonCard);
			isLoading = false;
		});
	} catch (error) {
		console.error('Failed to fetch pokemons', error);
	}

	return {
		pokemonCards,
		isLoading
	};
}
