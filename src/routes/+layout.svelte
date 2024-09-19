<script lang="ts">
	import Header from '$components/Header.svelte';
	import { theme } from '$lib/Store/ThemeStore';
	import { onMount } from 'svelte';

	onMount(() => {
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

<style lang="scss" global>
	@import '../styles/root/global.scss';
</style>
