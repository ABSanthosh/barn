<script lang="ts">
	import { toggleSettings } from '$lib/Store/SettingStore';
	import AccountSettings from './AccountSettings.svelte';
	import GeneralSettings from './GeneralSettings.svelte';
	import TopicSettings from './TopicSettings.svelte';

	$: sideBarOpen = false;
	$: selectedSetting = 'General';

	let hamburger: HTMLInputElement;

	const settingItems = [
		{ name: 'General', component: GeneralSettings },
		{ name: 'Account', component: AccountSettings },
		{ name: 'Topics', component: TopicSettings }
	];
</script>

<main class="Settings">
	<div class="Settings__top">
		<div class="Settings__sidebar {sideBarOpen ? 'Settings__sidebar--open' : ''}">
			<div class="Settings__Hamburger">
				<input
					type="checkbox"
					id="NavBarInput"
					bind:this={hamburger}
					on:change={() => (sideBarOpen = !sideBarOpen)}
				/>
				<div class="hamButton">
					<label class="HamMenu" for="NavBarInput">
						<span class="span HL1" />
						<span class="span HL2" />
						<span class="span HL3" />
					</label>
				</div>
			</div>
			<h2>Settings</h2>
			<ul>
				{#each settingItems as item}
					<button
						class="CrispButton"
						data-type="ghost"
						data-active={selectedSetting === item.name}
						on:click={() => {
							selectedSetting = item.name;
							if (sideBarOpen) {
								sideBarOpen = false;
								hamburger.checked = false;
							}
						}}
					>
						{item.name}
					</button>
				{/each}
			</ul>
		</div>
		<div class="Settings__feed">
			<h3 class="Settings__feed--title">{selectedSetting}</h3>
			{#each settingItems as item}
				{#if selectedSetting === item.name}
					<svelte:component this={item.component} />
				{/if}
			{/each}
		</div>
	</div>
	<div class="Settings__bottom">
		<button class="CrispButton" data-type="danger" on:click={() => toggleSettings()}>
			Close
		</button>
	</div>
</main>

<style lang="scss">
	.Settings {
		overflow: hidden;
		position: relative;
		border-radius: 19px;
		@include box();

		display: grid;
		grid-template-rows: 1fr 50px;

		#NavBarInput,
		.hamButton {
			display: none;
		}

		.hamButton {
			@include respondAt(930px) {
				z-index: 1;
				width: auto;
				height: 20px;
				position: absolute;
				right: -40px;
				@include make-flex();
				label {
					height: 100%;
					margin: unset;
					@include make-flex($just: space-around);
					cursor: pointer;
					span {
						width: 20px;
						display: block;
						transform-origin: 4px 0px;
						transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
						border-top: 2px solid var(--separator);
						border-radius: 10px;
						&:first-child {
							transform-origin: 0% 0%;
						}
						&:nth-last-child(2) {
							transform-origin: 0% 100%;
						}
					}
				}
			}
		}

		#NavBarInput:checked ~ .hamButton > label > .span.HL1 {
			opacity: 1;
			transform: rotate(45deg) translate(3px, -4px);
		}
		#NavBarInput:checked ~ .hamButton > label > .span.HL2 {
			opacity: 0;
			transform: rotate(0deg) scale(0.2, 0.2);
		}
		#NavBarInput:checked ~ .hamButton > label > .span.HL3 {
			transform: rotate(-45deg) translate(4px, 0px);
		}

		&__top {
			display: grid;
			overflow: hidden;
			@include box(100%, 100%);
			grid-template-columns: 240px 1fr;

			@include respondAt(930px) {
				grid-template-columns: 1fr;
			}
		}

		&__bottom {
			padding: 0 15px;
			@include make-flex($align: flex-end);
			border-top: 1px solid var(--separator);
		}

		&__sidebar {
			gap: 10px;
			padding: 15px;
			overflow: auto;
			max-height: 100%;
			@include box(100%, auto);
			border-right: 1px solid var(--separator);
			@include make-flex($dir: column, $just: flex-start);

			@include respondAt(930px) {
				overflow: unset;
				max-width: 280px;
				z-index: 1;
				position: absolute;
				left: -280px;
				height: 100%;
				border-radius: 18px 0 0 18px;
				background-color: var(--modal-bg);
				transition: left 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
				&--open {
					left: 0;
				}
			}

			& > ul {
				flex: 1;
				overflow: auto;
				list-style: none;
				@include box(100%, auto);

				.CrispButton {
					margin-top: 5px;
					--crp-button-width: 100%;
					--crp-button-height: 34px;
					justify-content: flex-start;
				}
			}
		}

		&__feed {
			padding: 15px;
			overflow-y: auto;
			gap: 15px;
			@include make-flex($just: flex-start, $align: flex-start);

			&--title {
				font-size: 1.5rem;
				font-weight: 600;
				color: var(--text);
				width: 100%;
				padding-bottom: 5px;
				border-bottom: 1px solid var(--separator);
			}

			@include respondAt(930px) {
				padding: 40px 15px 15px;
			}
		}
	}
</style>
