<script>
	import { onMount } from 'svelte';
	import { isAuth } from '../stores';
	import { goto } from '$app/navigation';

	onMount(async () => {
		if ($isAuth) {
			goto('/');
		}
	});
	import SocialAuth from './SocialAuth.svelte';
	let name, username, email, password, password2;
	let message;
	let errors = [];
	const submitForm = async (res) => {
		try {
			const submit = await fetch('https://ultra-movie.herokuapp.com/user/newUser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					username,
					email,
					password,
					password2
				})
			});
			const data = await submit.json();
			if (data.success) {
				message = data.message;
				setTimeout(() => {
					window.location.href = '/auth/signin';
				}, 2000);
			} else {
				errors = data.errors;
				throw new Error('something went wrong. IDK neither');
			}
		} catch (err) {
			console.log(err);
		}
	};
</script>

<div id="animatedBackground">
	<div id="login-box">
		<div class="left">
			<h1>Sign up</h1>
			<form on:submit|preventDefault={submitForm}>
				<input type="text" name="name" placeholder="Name" bind:value={name} required />
				<input type="text" name="username" placeholder="Username" bind:value={username} required />
				<input type="text" name="email" placeholder="E-mail" bind:value={email} required />
				<input
					type="password"
					name="password"
					placeholder="Password"
					bind:value={password}
					required
				/>
				<input
					type="password"
					name="password2"
					placeholder="Retype password"
					bind:value={password2}
					required
				/>
				<input type="submit" value="Sign me up" />
			</form>
		</div>

		<div class="right" id="right">
			<div class="error-con">
				{#if errors.length > 0 || message}
					{#each errors as error}
						<p class="error-p">
							{'! ' + error}
						</p>
					{/each}
					<p class="success-p">
						{'! ' + message + ' Please login now.'}
					</p>
				{/if}
			</div>
			<SocialAuth />
			<a class="have-acc" href="/auth/signin"><p>Already have an account? Sign in!</p></a>
			<a class="have-acc" href="/"><p>Or continue without login!</p></a>
		</div>
		<div class="or" id="or">OR</div>
	</div>
</div>

<style>
	.error-con {
		position: absolute;
		top: 50px;
		color: rgb(127, 231, 127);
		font-size: 12px;
	}
	.have-acc {
		text-decoration: none;
		color: white;
		font-size: 13px;
		margin: 8px;
	}
	#animatedBackground {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: url('/bg.jpg');
		background-repeat: repeat;
		background-position: 0 0;
		background-size: auto 100%;
		/*adjust s value for speed*/
		animation: animatedBackground 500s linear infinite;
	}

	@keyframes animatedBackground {
		from {
			background-position: 0 0;
		}
		/*use negative width if you want it to flow right to left else and positive for left to right*/
		to {
			background-position: -10000px 0;
		}
	}
	@media (max-width: 600px) {
		.error-con {
			position: absolute;
			top: 395px;
			left: 90px;
			color: red;
			font-size: 11px;
		}
		#or {
			position: absolute;
			top: 405px;
			left: 40px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
			line-height: 40px;
			text-align: center;
		}
		#login-box {
			background-color: rgba(0, 0, 0, 0.4);
			display: flex;
			flex-direction: column;
			position: relative;
			margin: 5% auto;
			min-width: 250px;
			max-width: 600px;
			background: #fff;
			border-radius: 2px;
		}

		#right {
			box-sizing: border-box;
			padding: 40px;
			width: 300px;
			background: url('https://goo.gl/lPCXrQ');
			background-size: cover;
			background-position: center;
			border-radius: 0 2px 2px 0;
		}
	}

	#login-box {
		display: flex;
		position: relative;
		margin: 5% auto;
		min-width: 250px;
		padding-bottom: 15px;
		max-width: 600px;
		background: #fff;
		border-radius: 15px;
		background: rgba(27, 29, 27, 0.8); /* Green background with 30% opacity */
	}

	.left {
		color: white;
		box-sizing: border-box;
		padding: 40px;
		width: 300px;
		height: 400px;
	}

	h1 {
		margin: 0 0 20px 0;
		font-weight: 300;
		font-size: 28px;
	}
	input {
		border-radius: 5px;
		padding: 10px;
		margin-bottom: 25px;
	}

	input[type='text'],
	input[type='password'] {
		display: block;
		box-sizing: border-box;
		margin-bottom: 20px;
		width: 220px;
		height: 32px;
		border: none;
		border-bottom: 1px solid #aaa;
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 15px;
		transition: 0.2s ease;
	}

	input[type='text']:focus,
	input[type='password']:focus {
		border-bottom: 2px solid #16a085;
		color: #16a085;
		transition: 0.2s ease;
	}

	input[type='submit'] {
		width: 120px;
		height: 32px;
		background: rgba(27, 29, 27, 0.8);
		border: none;
		border-radius: 2px;
		color: #fff;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		text-transform: uppercase;
		transition: 0.1s ease;
		cursor: pointer;
	}

	input[type='submit']:hover,
	input[type='submit']:focus {
		opacity: 0.8;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		transition: 0.1s ease;
	}

	input[type='submit']:active {
		opacity: 1;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
		transition: 0.1s ease;
	}

	.or {
		position: absolute;
		top: 190px;
		left: 275px;
		width: 40px;
		height: 40px;
		background: rgba(27, 29, 27, 0.8);
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		line-height: 40px;
		text-align: center;
		color: white;
	}

	.right {
		box-sizing: border-box;
		padding-left: 25px;
		padding-top: 140px;
		padding-right: 15px;
		width: 300px;
		background: url('https://goo.gl/lPCXrQ');
		background-size: cover;
		background-position: center;
		border-radius: 0 2px 2px 0;
	}

	.right .loginwith {
		display: block;
		margin-bottom: 40px;
		font-size: 28px;
		color: #fff;
		text-align: center;
	}

	button.social-signin {
		margin-bottom: 20px;
		width: 220px;
		height: 36px;
		border: none;
		border-radius: 2px;
		color: #fff;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		transition: 0.2s ease;
		cursor: pointer;
	}

	button.social-signin:hover,
	button.social-signin:focus {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		transition: 0.2s ease;
	}

	button.social-signin:active {
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
		transition: 0.2s ease;
	}

	button.social-signin.facebook {
		background: #32508e;
	}

	button.social-signin.twitter {
		background: #55acee;
	}

	button.social-signin.google {
		background: #dd4b39;
	}
</style>
