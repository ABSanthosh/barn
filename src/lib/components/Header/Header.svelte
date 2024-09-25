<script lang="ts">
	import { setTheme, theme } from '$lib/Store/ThemeStore';
	import GoogleButton from '../GoogleButton/GoogleButton.svelte';
	import { UserStore } from '$lib/Store/UserStore';

	let themeToggle: HTMLButtonElement;

	const themeToggleTransition = async () => {
		if (
			!themeToggle ||
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			setTheme($theme === 'dark' ? 'light' : 'dark');
			return;
		}

		document
			.startViewTransition(async () => {
				setTheme($theme === 'dark' ? 'light' : 'dark');
			})
			.ready.then(() => {
				// https://akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/#what-is-the-grow-animation
				const { top, left, width, height } = themeToggle.getBoundingClientRect();
				const x = left + width / 2;
				const y = top + height / 2;
				const right = window.innerWidth - left;
				const bottom = window.innerHeight - top;
				const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
				const isDark = $theme !== 'dark';
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
</script>

<header class="HeaderWrapper">
	<div class="Header">
		<div class="Header__left">
			<a href="/">
				<h3>Barn</h3>
			</a>
		</div>
		<div class="Header__right">
			<GoogleButton />
			{#if $UserStore !== null}
				<a
					class="CrispButton Header__right--appcta"
					href="/app"
					data-icon-after={String.fromCharCode(59620)}
				>
					Go To App
				</a>
			{/if}

			<button
				class="CrispButton theme"
				bind:this={themeToggle}
				on:click={async () => await themeToggleTransition()}
				aria-label="Toggle theme"
				title="Toggle theme"
			>
				<svg viewBox="0 0 20 20" width="16px" height="16px" fill="currentColor">
					{#if $theme === 'dark'}
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
					{:else}
						<path
							fill-rule="evenodd"
							d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
							clip-rule="evenodd"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</div>
</header>

<style lang="scss">
	:root {
		&::view-transition-old(root),
		&::view-transition-new(root) {
			animation: none;
			mix-blend-mode: normal;
		}
	}
	.HeaderWrapper {
		top: 0;
		left: 0;
		right: 0;
		gap: 10px;
		z-index: 5;
		position: fixed;
		@include make-flex();
		@include box(100%, 44px);
		background: var(--header-bg);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--secondary);
	}
	.Header {
		@include box();
		padding: 8px 15px;
		max-width: $maxWidth;
		@include make-flex($dir: row, $just: space-between);

		&__left {
			@include box(auto, 100%);

			& > a {
				font-size: 20px;
				user-select: none;
				line-height: 100%;
				position: relative;

				text-decoration: none;
				color: var(--text);
				font-family: 'Fraunces', serif;

				h3 {
					height: 100%;
					@include make-flex();
				}
				@include respondAt(700px) {
					font-size: 18px;
					h3 {
						margin-bottom: 0px;
					}
				}
			}
		}

		&__right {
			gap: 10px;
			@include box(auto, 100%);
			@include make-flex($dir: row);

			&--appcta {
				@include box(auto, 100%);
				font-size: 14px;
				color: var(--text);
				@include make-flex($dir: row, $just: center, $align: center);
				text-decoration: none;
			}

			.CrispButton.theme {
				--crp-button-width: auto;
				aspect-ratio: 1;
				--crp-button-height: 100%;
				--crp-button-padding-top: 3px;
				--crp-button-padding-left: 3px;
				--crp-button-padding-right: 3px;
				--crp-button-padding-bottom: 3px;
				// --crp-button-border-radius: 5px;
			}
		}
	}
</style>
