<script lang="ts">
	import { enhance } from '$app/forms';
	import { toggleSettings } from '$lib/Store/SettingStore';
	import { setTheme, theme } from '$lib/Store/ThemeStore';
	import { addToast } from '$lib/Store/ToastStore';
	import { setUserSettings, UserStore } from '$lib/Store/UserStore';
	import type { ActionResult } from '@sveltejs/kit';

	let generalSettingsData = {
		theme: $UserStore?.settings.theme!,
		articlesPerPage: $UserStore?.settings.articlesPerPage
	};

	// $: generalSettingsData.theme, themeToggleTransition(generalSettingsData.theme!);

	let themeToggle: HTMLSelectElement;
	const themeToggleTransition = async (theme: Theme) => {
		if (
			!themeToggle ||
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			setTheme(theme);
			return;
		}

		document
			.startViewTransition(async () => {
				setTheme(theme);
			})
			.ready.then(() => {
				// https://akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/#what-is-the-grow-animation
				const { top, left, width, height } = themeToggle.getBoundingClientRect();
				const x = left + width / 2;
				const y = top + height / 2;
				const right = window.innerWidth - left;
				const bottom = window.innerHeight - top;
				const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
				const isDark = theme !== 'dark';
				const clipPath = [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRadius}px at ${x}px ${y}px)`
				];

				document.documentElement.animate(
					{
						clipPath: isDark ? clipPath.reverse() : clipPath
					},
					{
						duration: 500,
						easing: 'ease-in-out',
						pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
					}
				);
			});
	};

	const handleSettingsEnhance = ({ formData }: { formData: FormData }) => {
		formData.append(
			'userStore',
			JSON.stringify({
				id: $UserStore?.id,
				settings: {
					...$UserStore?.settings,
					theme: generalSettingsData.theme,
					articlesPerPage: generalSettingsData.articlesPerPage
				}
			})
		);

		return async ({ result, update }: { result: ActionResult; update: () => void }) => {
			if (result.type === 'success') {
				addToast({
					dir: 'bottom',
					message: 'Your settings have been updated successfully',
					type: 'success'
				});

				toggleSettings();
				setUserSettings(JSON.parse(result.data?.settings.settings));
			}

			update();
		};
	};
</script>

<form
	method="post"
	class="GeneralSettings"
	use:enhance={handleSettingsEnhance}
	action="/app?/updateGeneralSettings"
>
	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span style="color: inherit;"> Default Theme </span>
		<select
			id="theme"
			class="CrispSelect"
			bind:value={generalSettingsData.theme}
			on:change={() => themeToggleTransition(generalSettingsData.theme)}
		>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span style="color: inherit;"> Articles per topic </span>
		<select
			class="CrispSelect"
			id="articlesPerPage"
			bind:this={themeToggle}
			bind:value={generalSettingsData.articlesPerPage}
		>
			{#each [5, 15, 20, 25, 30, 35] as item}
				<option value={item}>{item}</option>
			{/each}
		</select>
	</label>
	<i class="CrispMessage w-100" data-type="error" style="color: var(--subText);">
		You will have 5 times the number of articles per topic since you have selected 5 topics.
	</i>

	<div
		style="display: flex; gap: 13px; justify-content: space-between; width: 100%; margin-top: auto;"
	>
		<i style="color: var(--subText);">
			Last updated: {$UserStore?.updatedAt &&
				new Date($UserStore?.updatedAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				})}
		</i>
		<button class="CrispButton" data-type="success" type="submit"> Save </button>
	</div>
</form>

<style lang="scss">
	:root {
		&::view-transition-old(root),
		&::view-transition-new(root) {
			animation: none;
			mix-blend-mode: normal;
		}
	}
	.GeneralSettings {
		gap: 13px;
		@include box();
		@include make-flex($just: flex-start);

		.CrispLabel {
			.CrispSelect {
				width: 60%;
				height: 30px;
			}
			@include respondAt(600px) {
				flex-direction: column !important;
				width: 100% !important;

				.CrispSelect {
					width: 100% !important;
				}
			}
		}
		.CrispButton {
			&[data-type='success'] {
				margin-top: auto;
				margin-left: auto;
			}
		}
	}
</style>
