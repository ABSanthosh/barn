<main class="Onboarding">
	<slot></slot>
</main>

<style lang="scss">
	.Onboarding {
		@include box(100%, 100vh);
		@include make-flex();
		padding: 0 20px;

		@include respondAt(565px) {
			padding: 0 10px;
		}
	}
</style>
