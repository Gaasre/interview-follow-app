<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { Filter, ArrowDownUp } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import NewApplication from './(components)/new-application.svelte';
	import DeleteApplication from './(components)/delete-application.svelte';
	import EditApplication from './(components)/edit-application.svelte';

	export let data;
	export let form;
</script>

<div>
	<Card.Root class="w-full h-[calc(100vh-2rem)] p-2">
		<Card.Header>
			<Card.Title>
				<h1 class="text-4xl font-bold">Applications</h1>
			</Card.Title>
			<Card.Description>Manage your job applications here</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="py-6 flex justify-between">
				<div class="space-x-1">
					<Button variant="secondary">
						<Filter class="mr-2" size={16} />
						Filter
					</Button>
					<Button variant="secondary">
						<ArrowDownUp class="mr-2" size={16} />
						Sort
					</Button>
				</div>
				<div>
					<NewApplication {form} />
				</div>
			</div>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>#</Table.Head>
						<Table.Head>Title</Table.Head>
						<Table.Head>Company</Table.Head>
						<Table.Head class="w-[150px]">Status</Table.Head>
						<Table.Head class="text-right w-[150px]">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.applications.items as application, i (i)}
						<Table.Row>
							<Table.Cell>{i}</Table.Cell>
							<Table.Cell class="font-bold">{application.title}</Table.Cell>
							<Table.Cell>{application.company}</Table.Cell>
							<Table.Cell><Badge>Resume sent</Badge></Table.Cell>
							<Table.Cell class="text-right space-x-0.5">
								<EditApplication {form} {application} />
								<DeleteApplication id={application.id} />
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>
