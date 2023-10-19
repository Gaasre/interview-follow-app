<script>
	import Sidebar from './(components)/sidebar.svelte';
</script>

<div class="grid grid-cols-6">
	<Sidebar />
	<div class="col-span-5 border-l">
		<slot />
	</div>
</div>
