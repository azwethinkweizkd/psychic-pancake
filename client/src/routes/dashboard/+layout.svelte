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
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
	}
</style>
