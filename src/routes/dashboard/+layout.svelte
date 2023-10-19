<script>
	import Sidebar from './(components)/sidebar.svelte';
</script>

<div class="grid grid-cols-6">
	<Sidebar />
	<div class="col-span-5 bg-primary-foreground py-4 pr-4">
		<slot />
	</div>
</div>
