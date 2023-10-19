<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { buttonVariants, Button } from '$lib/components/ui/button';
	import { Loader2, Plus } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Alert from '$lib/components/ui/alert';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../$types';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';
	let title = '';
	let company = '';
	let description = '';

	let newOpen = false;
	let loading = false;
	export let form: ActionData;
</script>

<Dialog.Root
	open={newOpen}
	onOpenChange={(value) => {
		if (value) {
			newOpen = value;
		}
	}}
>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<Plus class="mr-2" size={16} />
		Add application
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>Add a new application. Click save when you're done.</Dialog.Description>
		</Dialog.Header>
		<div>
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
				action="/dashboard/applications?/new"
				on:submit={() => (loading = true)}
				use:enhance={() => {
					return async ({ result, update }) => {
						loading = false;
						if (result.type === 'success') {
							invalidateAll();
							newOpen = false;
						} else {
							update();
						}
					};
				}}
			>
				<div class="py-4">
					<div class="space-y-1 mb-4">
						<Label for="title">Title</Label>
						<Input name="title" bind:value={title} id="title" placeholder="Job title" type="text" />
					</div>
					<div class="space-y-1 mb-4">
						<Label for="company">Company</Label>
						<Input
							name="company"
							bind:value={company}
							id="company"
							placeholder="Company name"
							type="company"
						/>
					</div>
					<div class="space-y-1 mb-4">
						<Label for="description">Job Description</Label>
						<Textarea
							name="description"
							bind:value={description}
							id="description"
							placeholder="Job description"
						/>
					</div>
				</div>
				<div class="float-right space-x-1">
					<Button type="submit" disabled={loading}>
						{#if loading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Please wait
						{:else}
							Save
						{/if}</Button
					>
					<Button on:click={() => (newOpen = false)} variant="secondary">Cancel</Button>
				</div>
			</form>
		</div>
		<Dialog.Footer />
	</Dialog.Content>
</Dialog.Root>
