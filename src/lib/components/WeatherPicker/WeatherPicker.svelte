<script lang="ts">
	import { search } from 'fast-fuzzy';
	import { flip } from 'svelte/animate';
	import Cities from '$data/cities.json';
	import { fade, fly } from 'svelte/transition';
	import clickOutside from '$directive/clickOutside';
	import { maxCities, OnboardStore, toggleCity } from '$lib/Store/OnboardStore';

	let searchTerm = '';
	$: searchResult = search(
		searchTerm,
		Cities.filter((city) => !$OnboardStore.selectedCities.includes(city)),
		{
			keySelector: (city) => city.name
		}
	).slice(0, 5);

	let cityInput: HTMLInputElement;

	$: console.log($OnboardStore.selectedCities);
</script>

<div class="WeatherPicker">
	<div class="WeatherPicker__top" use:clickOutside on:outclick={() => (searchTerm = '')}>
		<input
			type="text"
			class="CrispInput"
			bind:this={cityInput}
			bind:value={searchTerm}
			disabled={$OnboardStore.selectedCities.length >= maxCities}
			placeholder="Search for a city"
		/>
		{#if searchTerm !== ''}
			<ul class="WeatherPicker__list">
				{#if searchResult.length === 0}
					<p class="CrispMessage" data-type="info">No results found</p>
				{/if}
				{#each searchResult as city (city)}
					<button
						animate:flip
						in:fly={{ y: 10, duration: 300 }}
						class="CrispButton"
						on:click={() => {
							toggleCity(city);
							searchTerm = '';
						}}
					>
						{city.name}
					</button>
				{/each}
			</ul>
		{/if}
	</div>
	<div class="WeatherPicker__middle">
		{#each $OnboardStore.selectedCities as city (city.name)}
			<div class="WeatherCard">
				<h3>{city.name}</h3>
				<p>{city.country}</p>

				<div style="display: flex; gap: 5px; justify-content: flex-end; width: 100%;">
					<a
						target="_blank"
						class="CrispButton"
						referrerPolicy="no-referrer"
						style="width: fit-content;"
						href="https://maps.google.com/?q={city.lat},{city.lon}"
						data-icon="open_in_new"
					>
						Go to map
					</a>
					<button class="CrispButton" data-type="danger" on:click={() => toggleCity(city)}>
						Remove
					</button>
				</div>
			</div>
		{/each}
	</div>
	<div class="WeatherPicker__bottom">
		<a href="/app/onboarding/feed" class="CrispButton">
			<span>Previous</span>
		</a>
		<a href="/app/onboarding/feed" class="CrispButton">
			<span>next</span>
		</a>
	</div>
</div>

<style lang="scss">
	.WeatherPicker {
		gap: 20px;
		padding: 20px;
		overflow: hidden;
		position: relative;
		border-radius: 20px;
		@include box(550px, 600px);
		border: 1px solid var(--secondary);
		background-color: var(--modal-bg-noBlur);
		// @include make-flex($just: flex-start);

		display: grid;
		grid-template-rows: 35px 1fr 45px;

		.CrispInput {
			--crp-input-width: 100%;
			--crp-input-height: 35px;
			--crp-input-border: 1px solid var(--separator);
		}

		&__top {
			width: 100%;
			display: flex;
			position: relative;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			.WeatherPicker__list {
				gap: 10px;
				top: 100%;
				padding: 10px;
				margin-top: 10px;
				list-style: none;
				position: absolute;
				border-radius: 13px;
				@include make-flex();
				@include box(100%, auto);
				background-color: var(--tertiary);
				border: 1px solid var(--separator);
				box-shadow: var(--t-crp-elevation-shadow);
				transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

				.CrispButton {
					--crp-button-width: 100%;
					--crp-button-height: 34px;
					justify-content: flex-start;
				}
			}
		}

		&__middle {
			overflow: auto;
			max-height: 100%;

			@include box(100%, 100%);
		}

		&__bottom {
			width: 100%;
			padding: 0;
			@include make-flex($dir: row, $just: space-between, $align: flex-end);
			border-top: 1px solid var(--separator);
		}
	}

	.WeatherCard {
		padding: 10px;
		color: var(--text);
		@include box(100%, auto);
		background-color: var(--tertiary);
		@include make-flex($align: flex-start);

		// first and last child at the same time
		&:first-child:last-child {
			border-radius: 10px;
		}

		&:first-child {
			border-radius: 10px 10px 0 0;
		}

		&:not(:first-child) {
			border-top: 1px solid var(--separator);
		}

		&:last-child {
			border-radius: 0 0 10px 10px;
		}
	}
</style>
