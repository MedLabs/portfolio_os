<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount, onDestroy } from 'svelte';
	import dnd from '$lib/utils/dnd.svelte';

	let files: HTMLDivElement;
	let filesPos = $state({ top: window.innerHeight, left: window.innerWidth / 3 });
	let windowMaximized = $state(false);
	let selectedPage = $state('home');
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
			icon: 'carbon:home',
			value: 'home'
		},
		{
			title: 'Documents',
			icon: 'carbon:document',
			value: 'documents'
		},
		{
			title: 'Pictures',
			icon: 'carbon:image',
			value: 'pictures'
		},
		{
			title: 'Downloads',
			icon: 'carbon:download',
			value: 'downloads'
		},
		{
			title: 'Videos',
			icon: 'carbon:video',
			value: 'videos'
		},
		{
			title: 'Projects',
			icon: 'carbon:application-web',
			value: 'projects'
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
		div?.classList.add('w-[45vw]');
		div?.classList.add('h-[40vh]');
		div!.style.top = `${filesPos.top}px`;
		div!.style.left = `${filesPos.left}px`;
	}
	function closeAndMinimize() {
		toggle('files');
	}
</script>

<div id="files" bind:this={files} class={`w-[45vw] h-[40vh] flex justify-start absolute shadow `}>
	<!-- sidebar -->
	<div
		class={`h-full ${windowMaximized ? 'w-1/5' : 'w-1/3'} bg-neutral-100/75 backdrop-blur-md pt-2 rounded-tl-lg rounded-bl-lg`}
	>
		<div class="flex justify-start h-8 p-2 items-center text-white active:cursor-move">
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
		</div>
		{#each shortcuts as s}
			<div
				class="flex jsutify-start items-center text-sm w-full text-neutral-800 p-1 hover:bg-neutral-100/25 hover:cursor-default"
				role="button"
				onclick={() => (selectedPage = s.value)}
			>
				<Icon icon={s.icon} class="mr-2" /><span>{s.title} </span>
			</div>
		{/each}
	</div>
	<!-- icons OR lines -->
	<div class="flex flex-col bg-neutral-100 w-full h-full rounded-tr-lg rounded-br-lg">
		<div
			class="flex h-10 p-2 items-center rounded-tr-lg text-white border-b border-neutral-300 bg-neutral-200 active:cursor-move"
		>
			<Icon icon="carbon:chevron-left" class="text-2xl text-neutral-700" />
			<Icon icon="carbon:chevron-right" class="ml-2 text-2xl text-neutral-700" />
			<div class="ml-4 text-neutral-700 text-center font-bold">Files</div>
		</div>
		<!-- Empty folder -->
		{#if selectedPage !== 'projects'}
			<div
				class="flex flex-1 text-neutral-300 font-bold text-3xl justify-center items-center w-full rounded-br-lg"
			>
				No files yet
			</div>
		{:else}
			<div
				class="flex flex-1 text-neutral-300 font-bold text-3xl justify-center items-center w-full rounded-br-lg"
			>
				Projects
			</div>
		{/if}
	</div>
</div>
