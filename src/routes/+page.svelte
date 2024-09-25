<script lang="ts">
	import Header from '$components/Header/Header.svelte';
</script>

<!-- <Header /> -->

<section class="Splash"></section>

<style lang="scss">
	:global(#app) {
		padding: 0 15px;
	}
	.Splash {
		width: 100%;
		height: 70vh;
		display: grid;
		padding: 15px;
		margin-top: 70px;
		border-radius: 20px;
		max-width: $maxWidth;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		grid-template-columns: 1.2fr 1fr;
		background-image: url(/src/lib/images/Clouds5.jpg);

		@include respondAt(1015px) {
			margin-top: 60px;
		}
	}
</style>
