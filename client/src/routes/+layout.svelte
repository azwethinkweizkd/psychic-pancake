<script lang="ts">
	export let data;
</script>

<nav>
	<div class="container">
		<h2>
			<a class="app-title-home-link" href="/">
				<img
					src="https://fontmeme.com/permalink/240208/3c7543c79f33b3acfa759966acc2fe6a.png"
					alt="pokemon-font"
				/>
			</a>
		</h2>
	</div>
	<ul>
		{#if data.user}
			<li>
				<a class="nav-link" href="/dashboard">Dashboard</a>
			</li>
			<li>
				<a class="nav-link" href="/account">Account</a>
			</li>

			<li>
				<form method="POST" action="/logout">
					<button type="submit">Logout</button>
				</form>
			</li>
		{:else}
			<li>
				<a class="nav-link" href="/login"> Login </a>
			</li>
		{/if}
	</ul>
</nav>

<slot />

<style>
	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f2f2f2;
		padding: 10px;
		background-color: #5db9ff;
	}

	ul {
		display: flex;
		align-items: center; /* Vertically center items */
		margin: 0;
		padding: 0;
		list-style-type: none;
	}
	li {
		margin: 0 10px;
	}
	.nav-link {
		text-decoration: none;
		color: fbd743;
		font-size: large;
		font-weight: 700;
	}

	.nav-link:visited {
		color: whitesmoke;
	}
	button {
		padding: 10px 14px;
		background-color: #ff1f1f;
		color: #f2f2f2;
		border: none;
		border-radius: 5px;
		text-align: center;
		font-weight: bold;
		font-size: large;
	}
	.container {
		flex: 0.75;
		color: whitesmoke;
	}
	.app-title-home-link {
		font-weight: bolder;
		font-size: xx-large;
		text-decoration: none;
	}

	.app-title-home-link:visited {
		color: whitesmoke;
	}
</style>
