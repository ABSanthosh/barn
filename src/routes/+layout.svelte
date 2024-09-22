<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { theme } from '$lib/Store/ThemeStore';
	import { UserStore } from '$lib/Store/UserStore';
	import { page } from '$app/stores';
	import { addToast, ToastStore } from '$lib/Store/ToastStore';
	import { goto } from '$app/navigation';
	import Toast from '$components/Toast.svelte';
	import Header from '$components/Header.svelte';

	export let data: PageData;

	$: UserStore.set(data.user);
	onMount(() => {
		if ($page.url.searchParams.get('error') !== null) {
			addToast({
				dir: 'top',
				type: 'danger',
				message: $page.url.searchParams.get('error')!
			});

			goto($page.url.pathname, { replaceState: true });
		}
		theme.subscribe((value) => {
			if (document) {
				document.documentElement.setAttribute('data-theme', value);
			}
		});
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="keywords" content="AB, Santhosh" />
	<meta name="author" content="ABSanthosh" />
	<meta name="color-scheme" content={$theme} />

	<title>Barn</title>
</svelte:head>

<Header />

<slot></slot>

{#if $ToastStore}
	<ul class="ToastList">
		{#each $ToastStore as toast (toast.id)}
			<Toast {...toast} />
		{/each}
	</ul>
{/if}

<style lang="scss" global>
	@import '../styles/root/global.scss';
</style>
