<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	let {
		children,
		text,
		position = 'top',
		size = ''
	} = $props<{ children: () => void; text: string; position: string; size: string }>();

	let visible = $state(false);

	let tooltipRef = $state<HTMLDivElement | null>(null);
	let targetRef = $state<HTMLDivElement | null>(null);

	// Event listeners for mouse and focus events
	onMount(() => {
		if (targetRef) {
			targetRef.addEventListener('mouseenter', showTooltip);
			targetRef.addEventListener('mouseleave', hideTooltip);
			targetRef.addEventListener('focus', showTooltip);
			targetRef.addEventListener('blur', hideTooltip);
		}
	});

	// Cleanup event listeners when the component is destroyed
	onDestroy(() => {
		if (targetRef) {
			targetRef.removeEventListener('mouseenter', showTooltip);
			targetRef.removeEventListener('mouseleave', hideTooltip);
			targetRef.removeEventListener('focus', showTooltip);
			targetRef.removeEventListener('blur', hideTooltip);
		}
	});

	const showTooltip = () => (visible = true);
	const hideTooltip = () => (visible = false);
</script>

<div class="relative inline-block" bind:this={targetRef}>
	{#if visible}
		<div
			bind:this={tooltipRef}
			class={`absolute ${size} left-1/2 transform -translate-x-1/2 mb-8 p-2 bg-gray-700 text-white text-sm rounded ${position === 'bottom' ? 'top-full' : 'bottom-full'}`}
		>
			{text}
		</div>
	{/if}
	{@render children()}
</div>
