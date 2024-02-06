<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<h2>Dashboard</h2>

{#if data && data.user}
	<p>
		Welcome, {data.user.firstname}
		{data.user.lastname}
	</p>
{/if}
