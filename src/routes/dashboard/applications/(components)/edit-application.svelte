<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { buttonVariants, Button } from '$lib/components/ui/button';
	import { Loader2, Pencil, Plus } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Alert from '$lib/components/ui/alert';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../$types';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';
	import type { Application } from '$types/types';
	import { twMerge } from 'tailwind-merge';

	let editOpen = false;
	let loading = false;
    
	export let form: ActionData;
	export let application: Application;
</script>

<Dialog.Root
	open={editOpen}
	onOpenChange={(value) => {
		if (value) {
			editOpen = value;
		}
	}}
>
	<Dialog.Trigger class={twMerge(buttonVariants({ variant: 'ghost' }), 'p-1 rounded-lg h-auto')}>
		<Pencil size={16} />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Application</Dialog.Title>
			<Dialog.Description>Edit the application. Click save when you're done.</Dialog.Description>
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
				action="/dashboard/applications?/edit"
				on:submit={() => (loading = true)}
				use:enhance={() => {
					return async ({ result, update }) => {
						loading = false;
						if (result.type === 'success') {
							invalidateAll();
							editOpen = false;
						} else {
							update();
						}
					};
				}}
			>
				<input type="hidden" name="id" value={application.id} />
				<div class="py-4">
					<div class="space-y-1 mb-4">
						<Label for="title">Title</Label>
						<Input
							name="title"
							bind:value={application.title}
							id="title"
							placeholder="Job title"
							type="text"
						/>
					</div>
					<div class="space-y-1 mb-4">
						<Label for="company">Company</Label>
						<Input
							name="company"
							bind:value={application.company}
							id="company"
							placeholder="Company name"
							type="text"
						/>
					</div>
					<div class="space-y-1 mb-4">
						<Label for="company">Stage</Label>
						<Input
							name="stage"
							bind:value={application.stage}
							id="stage"
							placeholder="Stage"
							type="text"
						/>
					</div>
					<div class="space-y-1 mb-4">
						<Label for="link">Job Link</Label>
						<Input
							name="link"
							bind:value={application.link}
							id="link"
							placeholder="Link"
							type="url"
						/>
					</div>
					<div class="space-y-1 mb-4">
						<Label for="description">Job Description</Label>
						<Textarea
							name="description"
							bind:value={application.description}
							id="description"
							placeholder="Job description"
							rows={10}
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
					<Button type="button" on:click={() => (editOpen = false)} variant="secondary"
						>Cancel</Button
					>
				</div>
			</form>
		</div>
		<Dialog.Footer />
	</Dialog.Content>
</Dialog.Root>
