<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount, onDestroy } from 'svelte';
	import dnd from '$lib/utils/dnd.svelte';

	let { toggle } = $props<{ toggle: (param: string) => void }>();
	let files: HTMLDivElement;
	let filesPos = $state({ top: window.innerHeight, left: window.innerWidth / 3 });
	let windowMaximized = $state(false);
	let selectedPage = $state('projects');
	let sub = $state('');

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

	let content = [
		{
			name: 'Mobile',
			value: 'mobile',
			icon: 'vscode-icons:folder-type-android',
			files: [
				{
					name: 'Puzzle Game',
					icon: 'fluent-emoji-flat:video-game',
					description: 'Do something while pooping.'
				},
				{
					name: 'TodoApp',
					icon: 'fluent-emoji-flat:bookmark-tabs',
					description: 'Planify your day in one click'
				},
				{
					name: 'VPN App',
					icon: 'fluent-emoji-flat:shield',
					description: 'Stop Being Tracked by NSA and other Evil groups'
				},
				{
					name: 'Ninder',
					icon: 'fluent-emoji-flat:nerd-face',
					description: 'A Tinder Like App, for Nerds'
				}
			]
		},
		{
			name: 'Web Sites',
			value: 'websites',
			icon: 'vscode-icons:folder-type-view',
			files: [
				{
					name: 'Vlang',
					icon: 'vscode-icons:file-type-vlang',
					description: 'A less ugly Web Site for the best programming language in the world.'
				},
				{
					name: 'MakeuseOf',
					icon: 'vscode-icons:file-type-phraseapp',
					description: 'New Website for MUO'
				},
				{
					name: 'Dentalis',
					icon: 'fluent-emoji-flat:tooth',
					description: 'An App falling page.'
				},
				{
					name: 'New HN',
					icon: 'logos:ycombinator',
					description: 'The new HackerNews UI'
				}
			]
		},
		{
			name: 'Apps',
			value: 'apps',
			icon: 'vscode-icons:folder-type-template',
			files: [
				{
					name: 'Dentalis',
					icon: 'fluent-emoji-flat:tooth',
					description: 'Plateform dedicated to dentists',
					link: 'https://dentalis.tn'
				},
				{
					name: 'PyTracker',
					icon: 'token:branded:orai',
					description: 'Vehicle detector based on intelligent model',
					link: '#'
				}
			]
		},
		{
			name: 'CLI tools',
			value: 'cli',
			icon: 'vscode-icons:folder-type-cli'
		}
	];
	function maximize(element: string) {
		windowMaximized = true;
		let div = document.getElementById(element);
		div?.classList.remove('w-[45vw]');
		div?.classList.remove('h-[50vh]');
		div?.classList.add('w-screen');
		div?.classList.add('h-screen');
		div!.style.left = '0px';
		div!.style.top = '0px';
	}
	function restore(element: string) {
		windowMaximized = false;
		let div = document.getElementById(element);
		div?.classList.remove('w-screen');
		div?.classList.remove('h-screen');
		div?.classList.add('w-[45vw]');
		div?.classList.add('h-[50vh]');
		div!.style.top = `${filesPos.top}px`;
		div!.style.left = `${filesPos.left}px`;
	}
	function closeAndMinimize() {
		toggle('files');
	}
	function next(p: string): void {
		if (p === '') return;
		sub = p;
		console.log(sub);
	}
</script>

<div id="files" bind:this={files} class={`w-[45vw] h-[50vh] flex justify-start absolute shadow `}>
	<!-- sidebar -->
	<div
		class={`h-full ${windowMaximized ? 'w-1/5' : 'w-1/3'} bg-neutral-100/75 backdrop-blur-sm pt-2 ${!windowMaximized ? 'rounded-tl-lg rounded-bl-lg' : ''}`}
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
				class={`flex jsutify-start items-center text-sm w-full text-neutral-800 p-1 hover:bg-neutral-100/25 hover:cursor-default ${selectedPage === s.value ? 'bg-neutral-400/25' : ''}`}
				role="button"
				onclick={() => (selectedPage = s.value)}
			>
				<Icon icon={s.icon} class="text-blue-500 text-lg mx-2" /><span>{s.title} </span>
			</div>
		{/each}
	</div>
	<!-- icons OR lines -->
	<div
		class={`flex flex-col bg-neutral-100 w-full h-full ${!windowMaximized ? 'rounded-tr-lg rounded-br-lg' : ''} `}
	>
		<div
			class="flex justify-between h-10 p-2 items-center rounded-tr-lg text-white border-b border-neutral-300 bg-neutral-200 active:cursor-grabbing"
		>
			<div class="flex">
				<Icon
					icon="carbon:chevron-left"
					class="text-2xl text-neutral-700 cursor-pointer"
					onclick={() => (sub = '')}
				/>
				<Icon icon="carbon:chevron-right" class="ml-2 text-2xl text-neutral-700" />
				<div class="ml-4 text-neutral-700 text-center font-bold">
					{shortcuts.find((i) => i.value === selectedPage)!.title}
				</div>
				<Icon icon="carbon:list" class="ml-2 text-xl text-neutral-700" />
				<Icon icon="carbon:chevron-sort" class="ml-2 text-xl text-neutral-700" />
			</div>
			<div class="flex">
				<Icon icon="carbon:information" class="ml-2 text-xl text-neutral-700" />
				<Icon icon="carbon:overflow-menu-horizontal" class="ml-2 text-xl text-neutral-700" />
			</div>
			<div class="flex">
				<Icon icon="carbon:chevron-down" class="ml-2 text-xl text-neutral-700" />
				<Icon icon="carbon:search" class="ml-2 text-xl text-neutral-700" />
			</div>
		</div>
		<!-- Empty folder -->
		{#if selectedPage !== 'projects'}
			<div
				class="flex flex-1 text-neutral-300 font-bold text-3xl justify-center items-center w-full rounded-br-lg"
			>
				No files yet
			</div>
		{:else}
			<div class="flex grow w-full justify-start rounded-br-lg">
				{#if sub === ''}
					{#each content as c}
						<button
							class="flex flex-col w-1/4 h-1/4 items-center justify-center z-max"
							onclick={() => next(c.value)}
						>
							<Icon icon={c.icon} class="text-6xl" />
							<span class="text-sm text-neutral-700">{c.name}</span>
						</button>
					{/each}
				{:else}
					{#each content.find((i) => i.value === sub)!.files! as f}
						<div class="flex flex-col w-1/4 h-1/4 items-center text-center justify-center">
							<Icon icon={f.icon} class="text-6xl" />
							<span class="text-sm text-neutral-700">{f.name}</span>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>
