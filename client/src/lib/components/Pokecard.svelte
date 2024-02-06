<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import type { PokemonCard } from '../types/pokemon';

	export let pokemon: PokemonCard;

	let rotateX = 0;
	let rotateY = 0;
	let brightness = 1;

	let maxRotation = 30;
	let width = 180;
	let height = 250;

	$: style = `
          --rotateX: ${rotateX}deg;
          --rotateY: ${rotateY}deg;
          --brightness: ${brightness};
          --maxShadowOffsetX: ${-rotateY * 0.4}px;
          --maxShadowOffsetY: ${rotateX * 0.4}px;
          --blurRadius: ${brightness * 0.4}px;
          --spreadRadius: ${brightness * 0.4}px;
      `;
	const scaleX = scaleLinear().domain([0, height]).range([-maxRotation, maxRotation]);
	const scaleY = scaleLinear().domain([0, width]).range([maxRotation, -maxRotation]);
	const scaleBrightness = scaleLinear().domain([0, height]).range([1.5, 0.5]);

	function onMouseMove(ev) {
		const mouseX = ev.offsetX;
		const mouseY = ev.offsetY;

		rotateY = scaleY(mouseX);
		rotateX = scaleX(mouseY);
		brightness = scaleBrightness(mouseY);
	}

	function onMouseLeave(ev) {
		rotateX = 0;
		rotateY = 0;
		brightness = 1;
	}

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<div
	role="presentation"
	class="poke-card"
	on:mousemove={onMouseMove}
	on:mouseleave={onMouseLeave}
	{style}
>
	<div class="pokecard-content">
		<div class="name-hp-row">
			<h3 class="poke-name">{capitalizeFirstLetter(pokemon.name)}</h3>
			<div class="hp-type-row">
				<p class="hp">{pokemon.hp}</p>
				<img src="" alt="" />
			</div>
		</div>
		<div class="poke-sprite-box">
			<img class="poke-sprite" alt={pokemon.name} src={pokemon.sprite} />
		</div>
		<div class="moves">
			{#each pokemon.moves as move}
				<p>{capitalizeFirstLetter(move.move.name)}</p>
			{/each}
		</div>
	</div>
</div>

<style>
	.poke-card {
		border: 4px solid black;
		width: fit-content;
		border-radius: 6px;
		background-color: burlywood;

		--rotateX: 0;
		--rotateY: 0;

		transform: scale(1) rotateX(var(--rotateX)) rotateY(var(--rotateY));
		perspective: 600px;
		transition: all 250ms ease-out;

		--maxShadowOffsetX: 512px;
		--maxShadowOffsetY: -512px;
		--blurRadius: 512px;
		--spreadRadius: 512px;

		box-shadow: var(--maxShadowOffsetX) var(--maxShadowOffsetY) var(--blurRadius)
			var(--spreadRadius) rgba(0, 0, 0, 0.5);
		-webkit-box-shadow: var(--maxShadowOffsetX) var(--maxShadowOffsetY) var(--blurRadius)
			var(--spreadRadius) rgba(0, 0, 0, 0.5);
		-moz-box-shadow: var(--maxShadowOffsetX) var(--maxShadowOffsetY) var(--blurRadius)
			var(--spreadRadius) rgba(0, 0, 0, 0.5);
	}

	.poke-card:hover {
		transform: scale(1.2) rotateX(var(--rotateX)) rotateY(var(--rotateY));
	}

	.name-hp-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2px;
	}

	.poke-name {
		margin: 0px 16px;
		margin-top: 3px;
		margin-bottom: 1px;
	}

	.hp-type-row {
		margin: 0 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hp {
		height: fit-content;
		margin: 0 0;
		margin-top: 3px;
		margin-bottom: 1px;
	}

	.poke-sprite-box {
		height: fit-content;
		border: 4px solid yellow;
		border-radius: 6px;
		margin: 0 12px;
		background-image: url('../../spriteBG.png');
		background-size: cover;
		background-repeat: no-repeat;
	}

	.poke-sprite {
		height: 225px;
		width: 275px;
	}
	.moves {
		margin: 0 16px;
		width: 275px;
		height: 175px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
</style>
