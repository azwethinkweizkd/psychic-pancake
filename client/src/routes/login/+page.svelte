<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	onMount(() => {
		if (data.user) {
			goto('/dashboard');
		}
	});
</script>

<div class="login-register-container">
	<form class="login-register-form" method="POST" action="/login">
		<input class="login-register-input" type="email" name="email" placeholder="Email" required />
		<input
			class="login-register-input"
			type="password"
			name="password"
			placeholder="Password"
			required
		/>
		<button class="login-register-submit-btn" type="submit">Login</button>
	</form>
	<div class="a-tag-div">
		<a class="login-register-a-tag" href="/register"> Would you like to create a new account? </a>
	</div>
</div>

<style>
	:global(.login-register-container) {
		width: 35%;
		margin: 5rem auto;
		border-radius: 16px;
		border: 1px solid lightblue;
		box-shadow: 7.5px 7.5px 10px 10px mediumturquoise;
		padding: 24px;
	}
	:global(.login-register-form) {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: 65%;
		gap: 16px;
	}

	:global(.login-register-input) {
		width: 50%;
		margin: 0 auto;
	}

	:global(.login-register-submit-btn) {
		width: fit-content;
		margin: 0 auto;
		background-color: midnightblue;
		color: white;
		padding: 12px 24px;
		border-radius: 4px;
		border: none;
		font-weight: 700;
		font-size: medium;
	}

	:global(.a-tag-div) {
		width: fit-content;
		margin: 8px auto 0;
		text-align: center;
	}

	:global(.login-register-a-tag) {
		text-align: center;
		text-decoration: none;
	}
</style>
