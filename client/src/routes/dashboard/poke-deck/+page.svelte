<script>
	import Pokecard from '$lib/components/Pokecard.svelte';
	export let data;
</script>

<section>
	<h1>Poke Deck</h1>

	{#if data.isLoading}
		<p>Loading...</p>
	{:else}
		<div class="poke-deck">
			{#each data.pokemonCards as pokemon}
				<Pokecard {pokemon} />
			{/each}
		</div>
	{/if}
</section>

<style>
	section {
		width: 85%;
		margin: auto;
	}
	.poke-deck {
		margin: 24px 0;
		padding: 48px;
		display: flex;
		flex-wrap: wrap;
		gap: 64px;
		justify-content: center;
	}
</style>
