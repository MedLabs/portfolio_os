<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount, onDestroy } from 'svelte';
	import dnd from '$lib/utils/dnd.svelte';

	let files: HTMLDivElement;
	let filesPos = $state({ top: window.innerHeight, left: window.innerWidth / 3 });
	let windowMaximized = $state(false);
	let { toggle } = $props<{ toggle: (param: string) => void }>();
	onMount(() => {
		if (files) {
			filesPos.top = Math.random() * (window.innerHeight - 50 - files.offsetHeight);
			filesPos.left = Math.random() * (window.innerWidth - files.offsetWidth);
			files.style.top = `${filesPos.top}px`;
			files.style.left = `${filesPos.left}px`;
		}
		const cleanup = dnd(files);
		onDestroy(() => cleanup);
	});

	const shortcuts = [
		{
			title: 'Home',
			icon: 'home'
		},
		{
			title: 'Documents',
			icon: 'home'
		},
		{
			title: 'Pictures',
			icon: 'home'
		},
		{
			title: 'Downloads',
			icon: 'home'
		},
		{
			title: 'Videos',
			icon: 'home'
		},
		{
			title: 'Projects',
			icon: 'home'
		}
	];
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
		div?.classList.add('w-[50vw]');
		div?.classList.add('h-[40vh]');
		div!.style.top = `${filesPos.top}px`;
		div!.style.left = `${filesPos.left}px`;
	}
	function closeAndMinimize() {
		toggle('files');
	}
</script>

<div id="files" bind:this={files} class={`w-[50vw] h-[40vh] flex justify-start absolute shadow `}>
	<!-- sidebar -->
	<div class="h-full w-1/5 bg-neutral-100/75 backdrop-blur-md pt-2 rounded-tl-lg rounded-bl-lg">
		<div class="flex justify-start h-8 p-2 items-center text-white active:cursor-move">
			<button class="w-4 h-4 bg-red-400 rounded-full mr-1" onclick={closeAndMinimize}>x</button>
			<button class="w-4 h-4 bg-orange-400 rounded-full mr-1">-</button>
			<button
				class="w-4 h-4 bg-green-400 rounded-full mr-1"
				onclick={() => (windowMaximized ? restore('files') : maximize('files'))}
				>{windowMaximized ? '°' : '^'}</button
			>
		</div>
		{#each shortcuts as s}
			<p class="text-sm w-full text-neutral-700 p-1 hover:bg-neutral-100/25 hover:cursor-default">
				{s.title}
			</p>
		{/each}
	</div>
	<!-- icons OR lines -->
	<div class="bg-neutral-100 w-full rounded-tr-lg rounded-br-lg">
		<div
			class="flex h-10 p-2 items-center rounded-tr-lg text-white border-b border-neutral-300 bg-neutral-200 active:cursor-move"
		>
			<Icon icon="carbon:chevron-left" class="text-2xl text-neutral-700" />
			<Icon icon="carbon:chevron-right" class="ml-2 text-2xl text-neutral-700" />
			<div class="ml-4 text-neutral-700 text-center font-bold">Files</div>
		</div>
	</div>
</div>
