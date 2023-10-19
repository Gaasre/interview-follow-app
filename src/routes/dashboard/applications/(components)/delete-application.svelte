<script lang="ts">
	import { deleteApplication } from '$api/application';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Loader2, Trash } from 'lucide-svelte';

	let open = false;
	let loading = false;
	export let id: string;
</script>

<AlertDialog.Root
	{open}
	onOpenChange={(value) => {
		if (value) {
			open = value;
		}
	}}
>
	<AlertDialog.Trigger asChild let:builder>
		<Button builders={[builder]} class="p-1 rounded-lg h-auto" variant="destructive"
			><Trash size={16} /></Button
		>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your application.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form
				action="/dashboard/applications?/delete"
				method="POST"
				on:submit={() => (loading = true)}
				use:enhance={() => {
					return async ({ result, update }) => {
						loading = false;
						if (result.type === 'success') {
							invalidateAll();
							open = false;
						} else {
							update();
						}
					};
				}}
			>
				<input type="hidden" name="id" value={id} />
				<Button type="submit" variant="destructive" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait
					{:else}
						Continue
					{/if}
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
