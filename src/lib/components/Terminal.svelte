<script lang="ts">
	import dnd from '$lib/utils/dnd.svelte';
	import { onDestroy, onMount } from 'svelte';

	let terminal: HTMLDivElement;

	let terminalPos = $state({ top: window.innerHeight, left: window.innerWidth / 3 });
	onMount(() => {
		if (terminal) {
			terminalPos.top = Math.random() * (window.innerHeight - terminal.offsetHeight);
			terminalPos.left = Math.random() * (window.innerWidth - terminal.offsetWidth);
			terminal.style.top = `${terminalPos.top}px`;
			terminal.style.left = `${terminalPos.left}px`;
		}
		const cleanup = dnd(terminal);
		onDestroy(() => cleanup);
	});
</script>

<div
	bind:this={terminal}
	class={`w-[30vw] h-[30vh] absolute bg-neutral-800 rounded-lg border-2 border-neutral-700 shadow active:cursor-move z-10 `}
>
	<div class="flex justify-start h-8 p-2 items-center text-white border-b border-neutral-600">
		<div class="w-4 h-4 bg-red-400 rounded-full mr-1"></div>
		<div class="w-4 h-4 bg-orange-400 rounded-full mr-1"></div>
		<div class="w-4 h-4 bg-green-400 rounded-full mr-1"></div>
		<div class="ml-4 text-neutral-100 text-center">Terminal</div>
	</div>
	<div>
		<p class="pt-2 px-2 text-neutral-500"># type /help for Help</p>
		<input class="border-0 bg-transparent w-full text-lime-500 p-2" value="$_" />
	</div>
</div>
