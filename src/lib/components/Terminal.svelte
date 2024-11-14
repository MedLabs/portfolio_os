<script lang="ts">
	import Icon from '@iconify/svelte';
	import dnd from '$lib/utils/dnd.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { shell } from '../utils/shell';

	let terminal: HTMLDivElement;
	let cmd = $state<string>('');
	let history = $state<string[]>([]);
	let windowMaximized = $state<boolean>(false);
	const { toggle, runApp } = $props<{
		toggle: (param: string) => void;
		runApp: (app: string) => void;
	}>();

	let terminalPos = $state({ top: window.innerHeight / 2, left: window.innerWidth / 3 });
	onMount(() => {
		if (terminal) {
			terminalPos.top = Math.random() * (window.innerHeight - terminal.offsetHeight - 50);
			terminalPos.left = Math.random() * (window.innerWidth - terminal.offsetWidth);
			terminal.style.top = `${terminalPos.top}px`;
			terminal.style.left = `${terminalPos.left}px`;
		}
		const cleanup = dnd(terminal);
		onDestroy(() => cleanup);
	});
	function maximize(element: string) {
		windowMaximized = true;
		let div = document.getElementById(element);
		div?.classList.add('w-screen');
		div?.classList.add('h-screen');
		div?.classList.remove('w-[50vw]');
		div?.classList.remove('h-[40vh]');
		div!.style.left = '0px';
		div!.style.top = '0px';
	}
	function restore(element: string) {
		windowMaximized = false;
		let div = document.getElementById(element);
		div?.classList.remove('w-screen');
		div?.classList.remove('h-screen');
		div?.classList.add('w-[45vw]');
		div?.classList.add('h-[40vh]');
		div!.style.top = `${terminalPos.top}px`;
		div!.style.left = `${terminalPos.left}px`;
	}
	function closeAndMinimize() {
		toggle('files');
	}

	function runCmd(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (shell(cmd) === '') {
				return;
			}
			if (shell(cmd) === 'C') {
				history = [];
				cmd = '';
				return;
			}
			if (cmd === '/files') {
				history.push(`<span class="text-lime-500">medlabs~$</span> ${cmd}`);
				cmd = '';
				runApp('files');
				return;
			}
			history.push(`<span class="text-lime-500">medlabs~$</span> ${cmd}`);
			history.push(shell(cmd));

			cmd = '';
		}
	}
</script>

<div
	bind:this={terminal}
	class={`w-[40vw] h-[45vh] absolute bg-neutral-800 rounded-lg border-2 border-neutral-700 shadow overflow-auto `}
>
	<div
		class="flex justify-start h-8 p-2 items-center text-white border-b border-neutral-600 active:cursor-move"
	>
		<button
			class="flex w-4 h-4 bg-red-400 rounded-full mr-1 justify-center items-center"
			onclick={closeAndMinimize}
		>
			<Icon icon="carbon:close" class="text-xs" />
		</button>
		<button class="flex justify-center items-center w-4 h-4 bg-orange-400 rounded-full mr-1">
			<Icon icon="carbon:subtract" class="text-xs" />
		</button>
		<button
			class="flex justify-center items-center w-4 h-4 bg-green-400 rounded-full mr-1"
			onclick={() => (windowMaximized ? restore('files') : maximize('files'))}
			>{#if windowMaximized}
				<Icon icon="carbon:minimize" class="text-xs" />
			{:else}
				<Icon icon="carbon:maximize" class="text-xs" />
			{/if}
		</button>
		<div class="ml-4 text-neutral-100 text-center">Terminal</div>
	</div>
	<div class="grid pt-2 px-2">
		<p class="text-neutral-500 w-full"># type /help for Help</p>
		{#each history as h}
			<p class="text-white">{@html h}</p>
		{/each}
		<div class="flex justify-start items-center">
			<span class="text-lime-500">medlabs~$</span>
			<input
				class="border-0 bg-transparent w-full p-2 text-white z-max outline-none"
				type="text"
				bind:value={cmd}
				onkeyup={runCmd}
			/>
		</div>
	</div>
</div>
