<script lang="ts">
	import Modal from '$components/Modal.svelte';
	import Settings from '$components/Settings/Settings.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import { toggleSettings, SettingStore } from '$lib/Store/SettingStore';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Modal toggleModal={toggleSettings} showModal={$SettingStore.isSettingsOpen}>
	<Settings allTopics={data.allTopics} />
</Modal>

<main class="HomeContainer">
	<Sidebar />
	<div class="Home">
		<slot />
	</div>
</main>

<style lang="scss">
	.HomeContainer {
		display: grid;
		@include box(100vw, 100vh);
		grid-template-columns: min-content 1fr;
		scrollbar-gutter: stable;
		scroll-behavior: smooth;

		@include respondAt(845px) {
			grid-template-columns: 1fr;
			padding-left: 56px;
		}

		@include respondAt(650px) {
			padding-left: 0;
			padding-top: 30px;
		}
	}

	.Home {
		@include box();
		overflow: auto;
		max-height: 100%;

		// immediate child of Home
		& > :global(*) {
			max-width: 800px;
			// $maxWidth
			margin: 0 auto;
		}
	}
</style>
