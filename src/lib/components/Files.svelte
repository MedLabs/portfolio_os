<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import dnd from '$lib/utils/dnd.svelte';

	let files: HTMLDivElement;
	let filesPos = $state({ top: window.innerHeight, left: window.innerWidth / 3 });
	onMount(() => {
		if (files) {
			filesPos.top = Math.random() * (window.innerHeight - files.offsetHeight);
			filesPos.left = Math.random() * (window.innerWidth - files.offsetWidth);
			files.style.top = `${filesPos.top}px`;
			files.style.left = `${filesPos.left}px`;
		}
		const cleanup = dnd(files);
		onDestroy(() => cleanup);
	});
</script>

<div
	bind:this={files}
	class={`w-[50vw] h-[40vh] absolute bg-neutral-100 rounded-lg border-2 border-neutral-700 shadow active:cursor-move z-10 `}
>
	<div class="flex justify-start h-8 p-2 items-center text-white border-b border-neutral-600">
		<div class="w-4 h-4 bg-red-400 rounded-full mr-1"></div>
		<div class="w-4 h-4 bg-orange-400 rounded-full mr-1"></div>
		<div class="w-4 h-4 bg-green-400 rounded-full mr-1"></div>
		<div class="ml-4 text-neutral-700 text-center">Files</div>
	</div>
	<div class="flex justify-start h-full w-full">
		<div class="w-1/4 border bg-neutral-200 h-full"></div>
	</div>
</div>
