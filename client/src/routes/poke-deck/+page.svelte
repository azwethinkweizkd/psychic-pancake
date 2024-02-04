<script lang="ts">
	import type { PokemonCard, Pokemon, Move } from '../../../types/pokemon';
	import Pokecard from '../../lib/components/Pokecard.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let pokemonCards: PokemonCard[] = [];
	let isLoading = true;

	async function fetchPokemons() {
		try {
			const response = await axios.get<Pokemon[]>('http://localhost:5000/api/pokemon');
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
	}

	onMount(fetchPokemons);
	console.log(pokemonCards);
</script>

<h1>Poke Deck</h1>

{#if isLoading}
	<p>Loading...</p>
{:else}
	<div class="poke-deck">
		{#each pokemonCards as pokemon}
			<Pokecard {pokemon} />
		{/each}
	</div>
{/if}

<style>
	.poke-deck {
		margin: 24px 0;
		padding: 48px;
		display: flex;
		flex-wrap: wrap;
		gap: 64px;
		justify-content: center;
	}
</style>
