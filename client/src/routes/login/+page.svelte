<form method="POST" action="?/login">
	<input type="text" name="firstname" placeholder="First name" required />
	<input type="text" name="lastname" placeholder="Last name" required />
	<input type="email" name="email" placeholder="Email" required />
	<input type="password" name="password" placeholder="Password" required />
	<button type="submit">Login</button>
	<button type="submit" formaction="?/register">Register</button>
</form>
