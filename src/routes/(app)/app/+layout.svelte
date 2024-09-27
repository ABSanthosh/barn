<script>
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
</script>

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
		grid-template-areas: 'sidebar content';

		@include respondAt(845px) {
			grid-template-columns: 1fr;
			padding-left: 56px;
		}
	}

	.Home {
		flex: 1;
	}
</style>
