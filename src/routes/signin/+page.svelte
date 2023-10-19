<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { Loader2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;

	export let form;
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
			<form
				method="POST"
				action="/signin"
				on:submit={() => (loading = true)}
				use:enhance={() => {
					return async ({ result, update }) => {
						loading = false;
						if (result.type === 'success') {
							goto('/dashboard');
						} else {
							update();
						}
					};
				}}
			>
				<div class="space-y-1 mb-1">
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
				<Button class="w-full" type="submit" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait
					{:else}
						Sign-in
					{/if}
				</Button>
			</form>
			<p class="text-center text-sm text-gray-700 mt-4">
				Don't have an account? <a class="text-slate-500 font-bold" href="/signup">Sign up</a>
			</p>
		</Card.Content>
	</Card.Root>
</div>
