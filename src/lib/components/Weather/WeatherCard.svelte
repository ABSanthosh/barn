<script lang="ts">
	import type { WeatherResponse } from '$types/Weather.type';

	export let { weatherData } = $$props as {
		weatherData: WeatherResponse;
	};
</script>

<div class="WeatherCard">
	<div class="WeatherCard__top">
		<div class="WeatherCard__top--left">
			<h4>
				{weatherData.name}
			</h4>
			<h2>{weatherData.temp.c}</h2>
		</div>
		<div class="WeatherCard__top--right">
			<img src={weatherData.icon} alt={weatherData.weatherDesc} />
			<p>{weatherData.weatherDesc}</p>
			<span>H:{weatherData.min.c} L:{weatherData.max.c}</span>
		</div>
	</div>
	<ul class="WeatherCard__bottom">
		{#each weatherData.forecast as item, index}
			{#if index < 6}
				<li>
					<p>{new Date(item.time).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</p>
					<img src={item.weather.icon} alt={item.weather.description} />
					<p>{item.temp.c}</p>
				</li>
			{/if}
		{/each}
	</ul>
</div>

<style lang="scss">
	.WeatherCard {
		border-radius: 20px;
		background-color: var(--weather-card-bg);
		border: 1px solid var(--secondary);
		min-width: 0;
		box-shadow: var(--t-crp-box-shadow);
		border-radius: 10px;
		padding: 1rem;
		gap: 35px;
		@include make-flex();

		&__top {
			width: 100%;
			@include make-flex($dir: row, $align: flex-start, $just: space-between);

			&--left {
				gap: 15px;
				@include make-flex($align: flex-start);
				h4 {
					line-height: 100%;
					font-weight: 400;
				}

				h2 {
					line-height: 100%;
					font-size: 2rem;
				}
			}

			&--right {
				@include make-flex($align: flex-end);
				span {
					font-size: 0.9rem;
					color: var(--subText);
					width: 100%;
					text-align: end;
				}
				img {
					margin-left: auto;
					width: 50px;
				}
			}
		}

		&__bottom {
			@include make-flex($dir: row, $just: space-between);
			list-style: none;
			width: 100%;
			max-width: 100%;
			overflow: hidden;
			li {
				text-align: center;
				flex: 1;
				border-radius: 5px;
				@include box(55px, 100%);

				p {
					@include box(100%, auto);
					font-size: 0.8rem;
					color: var(--subText);
				}

				img {
					width: 85%;
				}
			}
		}
	}
</style>
