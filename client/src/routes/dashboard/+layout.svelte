<main>
	<aside>
		<nav>
			<ul>
				<li>
					<a href="/account">Account</a>
				</li>
				<li>
					<a href="/dashboard/poke-deck">Poke Deck</a>
				</li>
				<li>
					<a href="/dashboard/buy-new-pack">Buy Poke Card Pack</a>
				</li>
				<li>
					<a href="/dashboard/trade">Trade</a>
				</li>
				<li>
					<a href="/dashboard/trainer-battle">Battle</a>
				</li>
			</ul>
		</nav>
	</aside>

	<slot />
</main>

<style>
	main {
		display: flex;
	}
	ul {
		padding: 0px;
		margin: 0px;
		height: 100%;
	}
	li {
		margin: 10px 10px 15px 0;
		list-style: none;
		border: 4px solid blue;
		border-right: 8px ridge blue;
		border-left: 0px;
		text-align: right;
		border-radius: 0px 16px 16px 0px;
		padding-right: 8px;
		box-shadow: 4px 0 4px -1px #888;
	}
	a {
		display: block;
		width: 100%;
		height: 100%;
		padding: 4px 14px 4px 0px;
		text-decoration: none;
		border-radius: 0px 8px 8px 0px;
	}
</style>
