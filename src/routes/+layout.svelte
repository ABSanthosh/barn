<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { theme } from '$lib/Store/ThemeStore';
	import { setUser } from '$lib/Store/UserStore';
	import Toast from '$components/Toast/Toast.svelte';
	import { addToast, ToastStore } from '$lib/Store/ToastStore';
	export let data: PageData;

	$: setUser(data.user);
	$: theme.set(data.user?.settings.theme!);
	onMount(() => {
		if ($page.url.searchParams.get('error') !== null) {
			addToast({
				dir: 'top',
				type: 'danger',
				message: $page.url.searchParams.get('error')!
			});

			goto($page.url.pathname, { replaceState: true });
		}
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
