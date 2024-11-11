<script lang="ts">
	import Icon from '@iconify/svelte';

	const { apps, toggleApp } = $props<{
		apps: { title: string; value: string; running: boolean; icon: string }[];
		toggleApp: void;
	}>();
</script>

<div
	class="flex justify-center gap-4 items-center fixed bottom-3 w-1/2 rounded-xl backdrop-blur-sm h-20 bg-white/30 text-center z-max"
>
	{#each apps as app}
		<Icon
			icon={app.icon}
			class="text-6xl hover:scale-150 hover:-translate-y-6 duration-200"
			onclick={() => toggleApp(app.value)}
		/>
	{/each}
</div>
