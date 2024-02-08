<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<section>
	<h2>Dashboard</h2>

	{#if data && data.user}
		<p>
			Welcome, {data.user.firstname}
			{data.user.lastname}
		</p>
		<a href="/dashboard/poke-deck">Poke Deck</a>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}
</style>
