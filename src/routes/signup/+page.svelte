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
	let repassword = '';
	let name = '';
	let loading = false;

	export let form;
</script>

<div class="min-h-screen h-full flex items-center justify-center">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Sign Up</Card.Title>
			<Card.Description>Let's get you started!</Card.Description>
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
			{#if form?.success}
				<div class="mb-4" transition:fade>
					<Alert.Root variant="success">
						<Alert.Title>Success</Alert.Title>
						<Alert.Description
							>Your account has been created. <a class="font-bold" href="/signin">Signin</a> here</Alert.Description
						>
					</Alert.Root>
				</div>
			{/if}
			<form
				method="POST"
				action="/signup"
				use:enhance={() => {
					return async ({ update }) => {
						loading = false;
						update();
					};
				}}
			>
				<div class="space-y-1 mb-1">
					<Label for="name">Name</Label>
					<Input name="name" bind:value={name} id="name" placeholder="John Doe" />
				</div>
				<div class="space-y-1 mb-1">
					<Label for="email">Email</Label>
					<Input name="email" bind:value={email} id="email" placeholder="your@email.com" />
				</div>
				<div class="space-y-1 mb-1">
					<Label for="password">Password</Label>
					<Input
						name="password"
						bind:value={password}
						id="password"
						placeholder="******"
						type="password"
					/>
				</div>
				<div class="space-y-1 mb-4">
					<Label for="repassword">Confirm Password</Label>
					<Input
						name="repassword"
						bind:value={repassword}
						id="repassword"
						placeholder="******"
						type="password"
					/>
				</div>
				<Button type="submit" disabled={loading} class="w-full">
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait
					{:else}
						Sign-up
					{/if}
				</Button>
			</form>
			<p class="text-center text-sm text-gray-700 mt-4">
				Already have an account? <a class="text-slate-500 font-bold" href="/signin">Sign in</a>
			</p>
		</Card.Content>
	</Card.Root>
</div>
