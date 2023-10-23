<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { Filter, ArrowDownUp, ArrowDownAZ, ArrowUpZA } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import NewApplication from './(components)/new-application.svelte';
	import DeleteApplication from './(components)/delete-application.svelte';
	import EditApplication from './(components)/edit-application.svelte';
	import { goto } from '$app/navigation';

	export let data;
	export let form;

	let titleOrder = data.sort?.includes('-title') ? -1 : data.sort?.includes('title') ? 1 : 0;
	let companyOrder = data.sort?.includes('-company') ? -1 : data.sort?.includes('company') ? 1 : 0;

	const sort = () => {
		let a = [];
		if (titleOrder == 1) {
			a.push('title');
		} else if (titleOrder == -1) {
			a.push('-title');
		}

		if (companyOrder == 1) {
			a.push('company');
		} else if (companyOrder == -1) {
			a.push('-company');
		}

		return a.join(',');
	};
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
			<div class="py-6 flex justify-end">
				<NewApplication {form} />
			</div>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">#</Table.Head>
						<Table.Head>
							<span>Title</span>
							<Button variant="ghost" class="p-1 h-auto"><Filter size={12} /></Button>
							<Button
								variant={titleOrder == 0 ? 'ghost' : 'secondary'}
								class="p-1 h-auto"
								on:click={() => {
									if (titleOrder == 0) {
										titleOrder = 1;
									} else if (titleOrder == 1) {
										titleOrder = -1;
									} else {
										titleOrder = 0;
									}
									goto(`/dashboard/applications?sort=${sort()}`);
								}}
							>
								{#if titleOrder == 0}
									<ArrowDownUp size={12} />
								{:else if titleOrder == 1}
									<ArrowDownAZ size={12} />
								{:else}
									<ArrowUpZA size={12} />
								{/if}
							</Button>
						</Table.Head>
						<Table.Head>
							<span>Company</span>
							<Button variant="ghost" class="p-1 h-auto"><Filter size={12} /></Button>
							<Button
								variant={companyOrder == 0 ? 'ghost' : 'secondary'}
								class="p-1 h-auto"
								on:click={() => {
									if (companyOrder == 0) {
										companyOrder = 1;
									} else if (companyOrder == 1) {
										companyOrder = -1;
									} else {
										companyOrder = 0;
									}
									goto(`/dashboard/applications?sort=${sort()}`);
								}}
							>
								{#if companyOrder == 0}
									<ArrowDownUp size={12} />
								{:else if companyOrder == 1}
									<ArrowDownAZ size={12} />
								{:else}
									<ArrowUpZA size={12} />
								{/if}
							</Button>
						</Table.Head>
						<Table.Head class="w-[150px]">Stage</Table.Head>
						<Table.Head class="w-[250px]">Link</Table.Head>
						<Table.Head class="text-right w-[150px]">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.applications.items as application, i (i)}
						<Table.Row>
							<Table.Cell>{i}</Table.Cell>
							<Table.Cell>{application.title}</Table.Cell>
							<Table.Cell>{application.company}</Table.Cell>
							<Table.Cell><Badge variant="secondary">{application.stage}</Badge></Table.Cell>
							<Table.Cell>
								<div class="w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
									<a class="text-primary" href={application.link}>{application.link} </a>
								</div>
							</Table.Cell>
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
