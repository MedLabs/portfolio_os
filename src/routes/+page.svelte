<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Files from '$lib/components/Files.svelte';

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
			icon: 'vscode-icons:default-folder-opened'
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
		}
	]);
	let visibleApps = $state<string[]>([]);

	function toggleApp(app: string): void {
		console.log(app);
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
	class=" flex justify-center h-screen w-screen bg-gradient-to-br from-10% from-indigo-500 via-sky-500 via-30% to-emerald-500 to-90%"
>
	<Panel {apps} {toggleApp} />
	{#if isRunning('terminal')}
		<Terminal />
	{/if}
	{#if isRunning('files')}
		<Files />
	{/if}
</div>
