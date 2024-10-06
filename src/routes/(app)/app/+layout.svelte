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
		scrollbar-gutter: stable;
		scroll-behavior: smooth;

		@include respondAt(845px) {
			grid-template-columns: 1fr;
			padding-left: 56px;
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
