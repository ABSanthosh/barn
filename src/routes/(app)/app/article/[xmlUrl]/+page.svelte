<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		document.getElementById('Article')?.scrollIntoView();
	});

	$: summary = '';
</script>

<main class="Article" id="Article">
	<a href="/app" data-icon="arrow_back" class="CrispButton"> Back </a>

	<h1 class="Article__title">{data.content?.title}</h1>
	{#if data.content?.excerpt && data.content?.excerpt.length > 0}
		<p class="Article__subTitle">
			{data.content?.excerpt}
		</p>
	{/if}

	<div class="Article__meta">
		<span data-icon="edit_calendar">
			{data.content?.publishedTime}
		</span>
		{#if data.content?.byline}
			<span data-icon="history_edu">
				by {data.content?.byline}
			</span>
		{/if}
		<span data-icon="timer">
			{data.content?.estimatedReadingTime}
		</span>

		<a
			href={data.content?.source}
			target="_blank"
			rel="noopener noreferrer"
			data-icon="open_in_new"
		>
			<span>Read Original Article</span>
		</a>
	</div>

	<details
		class="Article__details"
		on:toggle={(e) => {
			// @ts-ignore
			if (e.target.open && summary === '') {
				fetch(`/summarize`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						content: data.content?.textContent
					})
				})
					.then((res) => res.json())
					.then((res) => (summary = res));
			}
		}}
	>
		<summary>Summarize with AI</summary>
		<p>
			{#if summary === ''}
				Loading...
			{:else}
				{summary}
			{/if}
		</p>
	</details>

	{@html data.content?.content}

	<a href="/app" data-icon="arrow_back" class="CrispButton"> Back </a>
</main>

<style lang="scss" global>
	.Article {
		padding: 60px 10px;

		&__details {
			background:
				linear-gradient(canvas, canvas),
				linear-gradient(120deg, hsl(278, 44%, 73%), hsl(35, 81%, 73%)) border-box;

			margin: 20px 0;
			border: 4px solid transparent;
			background-clip: padding-box, border-box;
			border-radius: 15px;

			& > p {
				padding: 20px;
				font-size: 1.2em;
				line-height: 1.4em;
			}

			& > summary {
				gap: 10px;
				@include make-flex($dir: row);
				padding: 8px 20px;
				font-size: 1.5em;
				cursor: pointer;

				&::before {
					background-image: url(/src/lib/images/AI.svg);
					background-size: contain;
					background-repeat: no-repeat;
					content: '';
					@include box(30px, 30px);
					@include make-flex();
				}
			}
		}

		& > a {
			margin-bottom: 30px;
			width: fit-content;
		}

		&__title {
			font-size: 2.5em;
			line-height: 1.4em;
			margin-bottom: 20px;
		}

		&__subTitle {
			font-size: 1.5em;
			line-height: 1.4em;
			margin-bottom: 20px;
			color: var(--subText);
		}

		&__meta {
			@include box(100%, auto);
			@include make-flex($align: flex-start);
			gap: 10px;
			padding: 20px 0;
			border-bottom: 1px solid var(--subText);
			border-top: 1px solid var(--subText);
			margin: 20px 0;

			& > a > span {
				text-decoration: underline;
			}

			& > a,
			& > span {
				gap: 10px;
				text-decoration: none;
				@include make-flex($dir: row);
			}
		}

		#readability-page-1 {
			--body-padding: 64px;
			--content-width: 22em;
			--line-height: 1.6em;
			--text-alignment: start;
			--word-spacing: 0;
			--letter-spacing: 0;
			--font-weight: normal;

			font-size: 20px;

			h1,
			h2,
			h3 {
				font-weight: bold;
			}

			h1 {
				font-size: 1.6em;
				line-height: 1.25em;
			}

			h2 {
				font-size: 1.2em;
				line-height: 1.51em;
			}

			h3 {
				font-size: 1em;
				line-height: 1.66em;
			}

			a:link {
				text-decoration: underline;
				font-weight: normal;
			}

			a:link,
			a:link:hover,
			a:link:active {
				color: var(--t-crp-link-primary);
			}

			a:visited {
				color: var(--t-crp-link-primary-visited);
			}

			* {
				max-width: 100%;
				// height: auto;
			}

			p,
			code,
			pre,
			blockquote,
			ul,
			ol,
			li,
			figure,
			.wp-caption {
				margin: 0px 0px calc(8px + var(--line-height) * 0.4);
				padding: 10px 0;
				border-radius: 5px;
				// text-align: justify;
			}

			li {
				margin-bottom: 0;
			}

			li > ul,
			li > ol {
				margin-bottom: -10px;
			}

			p > img:only-child,
			p > a:only-child > img:only-child,
			.wp-caption img,
			figure img {
				display: block;
			}

			figure {
				@include make-flex();
				gap: 10px;
				position: relative;

				& video,
				& img {
					border: 1px solid var(--subText);
					border-radius: 7px;
				}

				& > figcaption {
					font-size: 15px;
					color: var(--subText);
					text-align: center;
					user-select: none;
					font-style: italic;
				}
			}
			svg {
				padding: 10px 0;
			}
			img[moz-reader-center] {
				margin-inline: auto;
				border: 1px solid var(--subText);
				border-radius: 7px;
				padding: 10px;
			}

			/* Align non-centered images with the text. Margins are unset unless the user makes a text alignment selection. */
			/* Does not use logical properties because the margins are tied to text alignment and not text direction. */
			img:not([moz-reader-center]) {
				margin-left: unset;
				margin-right: unset;
			}

			.caption,
			.wp-caption-text {
				font-size: 0.9em;
				line-height: 1.48em;
				font-style: italic;
			}

			pre {
				white-space: pre-wrap;
			}

			blockquote {
				padding: 0;
				padding-inline-start: 16px;
				border-inline-start: 2px solid var(--subText) !important;
				background-color: var(--t-crp-background-hover);

				p {
					padding: 10px;
				}
			}

			details {
				padding: 10px;
				border: 1px solid var(--subText);
				border-radius: 5px;
				margin: 10px 0;
				background-color: var(--t-crp-background-hover);
				summary {
					font-weight: bold;
					cursor: pointer;

					@include make-flex($just: flex-start, $dir: row);

					&::before {
						content: '▶';
						margin-right: 10px;
					}
				}

				&[open] {
					summary {
						&::before {
							content: '▼';
						}
					}
				}
			}

			ul,
			ol {
				padding: 0;
			}

			ul {
				padding-inline-start: 30px;
				list-style: disc;
			}

			ol {
				padding-inline-start: 30px;
			}

			table,
			th,
			td {
				border: 1px solid currentColor;
				border-collapse: collapse;
				padding: 6px;
				vertical-align: top;
			}

			table {
				margin: 5px;
			}

			/* Visually hide (but don't display: none) screen reader elements */
			.visually-hidden,
			.visuallyhidden,
			.sr-only {
				display: inline-block;
				width: 1px;
				height: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				border-width: 0;
			}

			/* Hide elements with common "hidden" class names */
			.hidden,
			.invisible {
				display: none;
			}

			/* Enforce wordpress and similar emoji/smileys aren't sized to be full-width,
 * see bug 1399616 for context. */
			img.wp-smiley,
			img.emoji {
				display: inline-block;
				border-width: 0;
				/* height: auto is implied from `#readability-page-1 *` rule. */
				width: 1em;
				margin: 0 0.07em;
				padding: 0;
			}

			pre code {
				background-color: var(--background);
				border: 1px solid var(--subText);
				display: block;
				overflow: auto;
				padding: 10px;
			}
		}
	}
</style>
