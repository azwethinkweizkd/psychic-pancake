<script lang="ts">
	export let data;
</script>

<nav>
	<div class="container">
		<h2>
			<a href="/"> Pokemon App </a>
		</h2>
	</div>
	<ul>
		{#if data.user}
			<li>
				<a href="/dashboard"> Dashboard </a>
			</li>
			<li>
				<a href="/account">Account</a>
			</li>

			<li>
				<form method="POST" action="/logout">
					<button type="submit">Logout</button>
				</form>
			</li>
		{:else}
			<li>
				<a href="/login"> Login </a>
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
	a {
		text-decoration: none;
		color: #333;
	}
	button {
		padding: 10px 14px;
		background-color: #333;
		color: #f2f2f2;
		border: none;
		border-radius: 5px;
		text-align: center;
		font-weight: bold;
		font-size: large;
	}
	.container {
		flex: 0.75;
	}
</style>
