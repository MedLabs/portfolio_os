<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Files from '$lib/components/Files.svelte';
	import Email from '$lib/components/Email.svelte';

	const apps = $state([
		{
			title: 'Terminal',
			value: 'terminal',
			running: false,
			icon: 'vscode-icons:file-type-powershell'
		},
		{
			title: 'Files',
			value: 'files',
			running: false,
			icon: 'fluent-emoji-flat:card-file-box'
		},
		{
			title: 'Stacks',
			value: 'stacks',
			running: false,
			icon: 'vscode-icons:file-type-appscript'
		},
		{
			title: 'Blog',
			value: 'blog',
			running: false,
			icon: 'vscode-icons:file-type-rss'
		},
		{
			title: 'Contact',
			value: 'email',
			running: false,
			icon: 'fluent-emoji-flat:e-mail'
		}
	]);
	let visibleApps = $state<string[]>([]);

	function toggleApp(app: string): void {
		if (!isRunning(app)) {
			visibleApps.push(app);
		} else {
			visibleApps = visibleApps.filter((i) => i !== app);
		}
	}

	function isRunning(app: string): boolean {
		return visibleApps.includes(app);
	}
</script>

<div
	class=" flex justify-center h-screen w-screen bg-gradient-to-br from-10% from-indigo-500 via-violet-700 via-30% to-pink-700 to-90%"
>
	<a
		href="https://github.com/medlabs/portfolio_os.git"
		class="w-fit absolute left-0 text-white/50 p-2">Svelte Version</a
	>
	<Panel {apps} {toggleApp} />
	{#if isRunning('terminal')}
		<Terminal toggle={toggleApp} runApp={toggleApp} />
	{/if}
	{#if isRunning('files')}
		<Files toggle={toggleApp} />
	{/if}
	{#if isRunning('email')}
		<Email toggle={toggleApp} />
	{/if}
</div>
