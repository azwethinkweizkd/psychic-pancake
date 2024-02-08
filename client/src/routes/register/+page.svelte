<div class="login-register-container">
	<form class="login-register-form" method="POST" action="/register">
		<input
			class="login-register-input"
			type="text"
			name="firstname"
			placeholder="First name"
			required
		/>
		<input
			class="login-register-input"
			type="text"
			name="lastname"
			placeholder="Last name"
			required
		/>
		<input class="login-register-input" type="email" name="email" placeholder="Email" required />
		<input
			class="login-register-input"
			type="password"
			name="password"
			placeholder="Password"
			required
		/>
		<button class="login-register-submit-btn" type="submit">Register</button>
	</form>
	<div class="a-tag-div">
		<a class="login-register-a-tag" href="/login"> Existing User? Login here</a>
	</div>
</div>
