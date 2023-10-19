<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Briefcase, Calendar, LayoutDashboard, ListTodo, UserCircle } from 'lucide-svelte';
	import { page } from '$app/stores';

	$: variant = (page: string) => {
		const a = $page.url.pathname.split('/');
		const b = a[a.length - 1];
		return b.includes(page) ? 'secondary' : 'ghost';
	};
</script>

<div class="pb-12 min-h-screen h-full">
	<div class="space-y-4 py-4">
		<div class="px-4 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
			<div class="space-y-1">
				<Button
					href="/dashboard"
					class="w-full justify-start space-x-4"
					variant={variant('dashboard')}
				>
					<LayoutDashboard size={16} />
					<span>Dashboard</span>
				</Button>
				<Button
					href="/dashboard/calendar"
					class="w-full justify-start space-x-4"
					variant={variant('calendar')}
				>
					<Calendar size={16} />
					<span>Calendar</span>
				</Button>
				<Button
					href="/dashboard/applications"
					class="w-full justify-start space-x-4"
					variant={variant('applications')}
				>
					<Briefcase size={16} />
					<span>Job Applications</span>
				</Button>
				<Button
					href="/dashboard/interviews"
					class="w-full justify-start space-x-4"
					variant={variant('interviews')}
				>
					<ListTodo size={16} />
					<span>Interviews</span>
				</Button>
			</div>
		</div>
		<div class="px-4 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Settings</h2>
			<div class="space-y-1">
				<Button
					href="/dashboard/account"
					class="w-full justify-start space-x-4"
					variant={variant('account')}
				>
					<UserCircle size={16} />
					<span>Account</span>
				</Button>
			</div>
		</div>
	</div>
</div>
