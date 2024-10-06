<script lang="ts">
	import { browser } from '$app/environment';
	import clickOutside from '$directive/clickOutside';
	import { getYtEmbedLink, getYtThumbnail } from '$utils/ytUtils';
	import { onDestroy, onMount } from 'svelte';

	export let { url, modal = false } = $$props as {
		url: string;
		modal?: boolean;
	};

	const hijackEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			modal = false;
			e.preventDefault();
		}
	};

	onMount(() => {
		if (modal) {
			window.addEventListener('keydown', (e) => hijackEscape(e));
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', (e) => hijackEscape(e));
		}
	});

	$: thumbnail = getYtThumbnail(url);
</script>

<button
	class="YtEmbed"
	type="button"
	style="background-image: url({thumbnail})"
	on:click={() => (modal = true)}
/>

{#if modal}
	<div class="YtEmbed__modal">
		<iframe
			use:clickOutside
			on:outclick={() => (modal = false)}
			width="560"
			height="315"
			src={getYtEmbedLink(url)}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>
{/if}

<style lang="scss">
	.YtEmbed {
		position: relative;
		@include make-flex();
		@include box(100%, 190px);
		background-color: transparent;
		outline: none;
		border: none;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		border-radius: 8px;

		&::after {
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='external-icon' viewBox='0 0 28.57 20' focusable='false' style='pointer-events: none; display: block; width: 100%25; height: 100%25;'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28.57 20' preserveAspectRatio='xMidYMid meet'%3E%3Cg%3E%3Cpath d='M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z' fill='%23FF0000'/%3E%3Cpath d='M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%3C/svg%3E");
			content: '';
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 50px;
			height: 50px;
			transition:
				height 0.2s,
				width 0.2s;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--ytEmbedBlur);
			border-radius: 9px;
			backdrop-filter: blur(5px);
			transition: background-color 0.2s;
		}
		&:hover {
			cursor: pointer;

			&::before {
				background-color: var(--ytEmbedBlurHover);
			}

			&::after {
				height: 55px;
				width: 55px;
			}
		}

		&__modal {
			@include box();
			position: fixed;
			top: 0;
			left: 0;
			@include make-flex();
			backdrop-filter: blur(1px);
			z-index: 1;
			background: var(--ytEmbedBlur);
		}
	}
</style>
