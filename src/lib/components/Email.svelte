<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount, onDestroy } from 'svelte';
	import dnd from '$lib/utils/dnd.svelte';

	let email: HTMLDivElement;
	let emailPos = $state({ top: window.innerHeight, left: window.innerWidth / 3 });
	let windowMaximized = $state(false);
	let { toggle } = $props<{ toggle: (param: string) => void }>();

	onMount(() => {
		if (email) {
			emailPos.top = Math.random() * (window.innerHeight - 50 - email.offsetHeight);
			emailPos.left = Math.random() * (window.innerWidth - email.offsetWidth);
			email.style.top = `${emailPos.top}px`;
			email.style.left = `${emailPos.left}px`;
		}
		const cleanup = dnd(email);
		onDestroy(() => cleanup);
	});

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
		div!.style.top = `${emailPos.top}px`;
		div!.style.left = `${emailPos.left}px`;
	}
	function closeAndMinimize() {
		toggle('email');
	}
</script>

<div
	id="email"
	bind:this={email}
	class={`w-[45vw] h-[50vh] absolute bg-white rounded-lg border-2  border-neutral-200 shadow `}
>
	<div
		class="flex justify-start h-14 p-2 items-center text-neutral-800 backdrop-blur-md border-b rounded-t-lg border-neutral-200 active:cursor-grabbing"
	>
		<button
			class="flex w-4 h-4 bg-red-400 rounded-full mr-1 justify-center items-center text-white"
			onclick={closeAndMinimize}
		>
			<Icon icon="carbon:close" class="invisible hover:visible text-xs" />
		</button>
		<button
			class="flex justify-center items-center w-4 h-4 bg-orange-400 rounded-full mr-1 text-white"
		>
			<Icon icon="carbon:subtract" class="invisible hover:visible text-xs" />
		</button>
		<button
			class="flex justify-center items-center w-4 h-4 bg-green-400 rounded-full mr-1 text-white"
			onclick={() => (windowMaximized ? restore('email') : maximize('email'))}
			>{#if windowMaximized}
				<Icon icon="carbon:minimize" class="invisible hover:visible text-xs text-white" />
			{:else}
				<Icon icon="carbon:maximize" class="invisible hover:visible text-xs" />
			{/if}
		</button>
		<div class="ml-4 text-neutral-800 text-center">Email</div>
		<Icon icon="carbon:send-alt" class="ml-4 text-2xl text-neutral-500" />
	</div>
	<div class="flex flex-col flex-1 pt-2 px-2 w-full bg-white">
		<div class="flex justify-start items-center gap-2 border-b border-neutral-300 mb-1">
			<span class="text-stone-500 font-normal">To:</span><input
				type="text"
				value="lassaad@zoho.com"
				class="w-full p-1 outline-none bg-white"
				disabled
			/>
		</div>
		<div class="flex justify-start items-center gap-2 border-b border-neutral-300 mb-1">
			<span class="text-stone-500 font-normal">From:</span><input
				type="text"
				class="w-full p-1 outline-none"
			/>
		</div>
		<div class="flex justify-start items-center gap-2 border-b border-neutral-300 mb-1">
			<span class="text-stone-500 font-normal">Subject:</span><input
				type="text"
				class="w-full p-1 outline-none"
			/>
		</div>
		<textarea
			name="message"
			id="message"
			placeholder="Your message here"
			class="outline-none w-full pt-2 z-50"
			rows="10"
		></textarea>
	</div>
</div>
