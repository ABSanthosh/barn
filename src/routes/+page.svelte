<script lang="ts">
	import Header from '$components/Header/Header.svelte';
</script>

<Header />

<main class="HomePage">
	<section class="SplashWrapper">
		<div class="Splash">
			<h1>
				Stay Informed, <br />
				<span> Effortlessly </span>
			</h1>
			<p>
				Discover the latest news from trusted sources, all in one place. Get updates that matter to
				you, anytime, anywhere.
			</p>
		</div>
	</section>

	<section class="About">
		<div class="About__content">
			<h2>scroll on your own terms</h2>
			<p>
				In 2024, we work, play, collaborate, and.... scroll. Feeds and timelines decide what we we
				read, watch, and care about.
				<br />
				<br />
				But your *for you* page isn't really for you -- it's just the content that the company knows
				will keep you hooked.
				<br />
				<br />
				What if you curated your own news feed? You could fill it with things you actually care about,
				not just clickbait. real journalism, not whatever your racist high-school classmate shares. Learn
				something new, remember to stay active, keep tabs on what matters.
				<br />
				<br />
				Barn can help you do just that!
			</p>
		</div>
	</section>
	<!-- <div class="AboutGroup">
		<section class="Chart BentoCard">
			<img src="/src/lib/images/Chart.png" alt="Chart" />
		</section>
		<section class="Chart BentoCard">
			<img src="/src/lib/images/Chart.png" alt="Chart" />
		</section>
	</div> -->
</main>

<style lang="scss">
	:global(html) {
		overflow-y: auto;
		overflow-x: hidden;
	}
	:global(#app) {
		padding: 0 15px;
	}
	.HomePage {
		@include box();
		max-width: $maxWidth;
		@include make-flex($just: flex-start);
		gap: 30px;

		.BentoCard {
			border-radius: 20px;
			background-color: var(--modal-bg-noBlur);
			border: 1px solid var(--secondary);
			box-shadow: var(--t-crp-box-shadow);
		}
	}

	.SplashWrapper {
		@include box(100%, 80vh);
		@include make-flex();

		.Splash {
			margin-top: 70px;
			height: 80%;
			border-radius: 20px;

			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			grid-template-columns: 1.2fr 1fr;
			background-image: url(/src/lib/images/Clouds5.jpg);

			gap: 20px;
			padding: 15px 50px 15px 50px;
			@include make-flex($align: flex-start);

			@include respondAt(646px) {
				padding: 15px 30px 15px 30px;
			}

			h1 {
				font-size: 50px;
				text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.236);
				margin-top: 0;
				line-height: 1.5;

				span {
					color: light-dark(#fbffb3, #494d00);
				}

				@include respondAt(646px) {
					font-size: 40px;
				}
			}

			& > p {
				width: 70%;
				font-size: 20px;
				color: #656746;

				@include respondAt(646px) {
					width: 100%;
				}
			}

			@include respondAt(1015px) {
				margin-top: 60px;
			}
		}
	}
	.AboutGroup {
		width: 100%;
		display: grid;
		grid-template-columns: 1.7fr 1fr;
		grid-gap: 20px;
		grid-template-rows: 1fr 1fr;
	}

	.About {
		width: 100vw;
		padding: 15px 0 50px 0;
		display: grid;
		grid-row: span 2;
		align-items: center;
		justify-content: center;
		background-color: var(--fullSection);
		margin: 40px 0;

		&__content {
			padding: 48px 0;
			height: auto;
			max-width: $maxWidth;
			margin: 0 48px;
			h2 {
				font-size: 45px;
				font-weight: 600;
				margin: 32px 0;

				@include respondAt(540px) {
					font-size: 40px;
				}
			}

			p {
				font-size: 21px;
				max-width: 100%;
				line-height: 31px;

				@include respondAt(540px) {
					font-size: 20px;
				}
			}
		}
	}
</style>
