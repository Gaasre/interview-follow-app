<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let email = '';
	let password = '';

	let showAlert = false;
	let alertValue = '';

	export let form;

	const submitLogin = (input: any) => {
		console.log(input);
	};
</script>

<div class="min-h-screen h-full flex items-center justify-center">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Sign In</Card.Title>
			<Card.Description>Sign in to your account.</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if form?.failed}
				<div class="mb-4" transition:fade>
					<Alert.Root variant="destructive">
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>{form.message}</Alert.Description>
					</Alert.Root>
				</div>
			{/if}
			<form method="POST" action="/auth" use:enhance={submitLogin}>
				<div class="space-y-1">
					<Label for="email">Email</Label>
					<Input name="email" bind:value={email} id="email" placeholder="your@email.com" />
				</div>
				<div class="space-y-1 mb-4">
					<Label for="username">Password</Label>
					<Input
						name="password"
						bind:value={password}
						id="password"
						placeholder="******"
						type="password"
					/>
				</div>
				<Button type="submit">Sign-in</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
