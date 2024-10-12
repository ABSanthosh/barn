<script lang="ts">
</script>

<main class="PremiumSettings">
	<div class="PremiumSettings__content">
		<h1>Upgrade to Premium</h1>
		<p>Unlock the full potential of Barn with a premium subscription.</p>
	</div>
	<div class="PremiumSettings__cards">
		<div class="PremiumSettings__card PremiumSettings__card--free">
			<div class="PremiumSettings__card--top">
				<div class="PremiumSettings__card--left">
					<span class="VersionType">Free</span>
					<span class="Price"> $0 </span>
					<span class="Period"> / month </span>
				</div>
				<ul class="PremiumSettings__card--right">
					<li>Select upto 5 Topics</li>
					<li>Ad-Free Experience</li>
					<li>Only Current day news</li>
					<li>Cross Device Sync</li>
				</ul>
			</div>
			<div class="PremiumSettings__card--bottom">
				<button class="CrispButton"> Enjoying Right Now </button>
			</div>
		</div>
		<div class="PremiumSettings__card PremiumSettings__card--premium">
			<div class="PremiumSettings__card--top">
				<div class="PremiumSettings__card--left">
					<span class="VersionType">Premium</span>
					<span class="Price"> $5 </span>
					<span class="Period"> / month </span>
				</div>
				<ul class="PremiumSettings__card--right">
					<li>Select upto 10 Topics</li>
					<li>Ad-Free Experience</li>
					<li>Only Current day news</li>
					<li>Cross Device Sync</li>
					<li>Access to Last 3 day news</li>
				</ul>
			</div>
			<div class="PremiumSettings__card--bottom">
				<form method="POST" action="?/subscribe">
					<button class="CrispButton" type="submit"> Upgrade Now </button>
				</form>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.PremiumSettings {
		@include make-flex($just: flex-start);
		margin-bottom: 10px;
		gap: 20px;
		@include box(100%, auto);

		&__content {
			text-align: center;
			margin: 0 auto;

			h1 {
				font-size: 30px;
			}

			& > p {
				font-size: 20px;
				color: var(--subText);
			}
		}

		&__cards {
			@include box();
			@include make-flex($just: space-between);
			gap: 20px;
		}

		&__card {
			gap: 20px;
			@include box(100%, auto);
			border-radius: 20px;
			padding: 20px;
			border: 1px solid var(--secondary);
			box-shadow: var(--t-crp-box-shadow);

			display: grid;
			grid-template-rows: 1fr 30px;

			&--top {
				display: grid;
				grid-template-columns: 0.6fr 1fr;
				@include respondAt(460px) {
					grid-template-columns: 1fr;
				}
			}

			&--bottom {
				.CrispButton {
					// background-color: var(--blueBg);
					// color: light-dark(#fbffb3, #494d00);
					border: 0px;
					width: 100%;
				}
			}

			&--left {
				gap: 10px;
				@include make-flex($align: flex-start);

				.VersionType {
					font-size: 16px;
					font-weight: 500;
					border-radius: 5px;
					line-height: 100%;
					padding: 6px 15px;
				}

				.Price {
					font-size: 70px;
					font-weight: 500;
					line-height: 100%;
				}
			}

			ul {
				margin-left: 15px;
				li {
					font-size: 17px;
					line-height: 100%;
					padding: 10px 0;
				}
			}

			&--free {
				background-color: light-dark(#d6f1ff, #80cfcf);
				.VersionType {
					border: 1px solid var(--blueBg);
				}

				.CrispButton {
					background-color: var(--blueBg);
					color: light-dark(#fbffb3, #494d00);
				}
			}

			&--premium {
				background-color: light-dark(#ffd6ff, #cf80cf);

				.VersionType {
					border: 1px solid var(--pinkBg);
				}

				.CrispButton {
					background-color: var(--pinkBg);
					color: light-dark(#fff, #4d004d);
				}

				ul {
					margin-left: 15px;
					li {
						font-size: 17px;
						line-height: 100%;
						padding: 10px 0;
					}
				}
			}
		}
	}
</style>
