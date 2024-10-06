<script lang="ts">
	import { onMount } from 'svelte';
	import getGreeting from '$utils/greet';
	import { UserStore } from '$lib/Store/UserStore';
	import type { PageData } from './$types';
	import type { GithubTopic } from '$types/Topic.type';
	import YtEmbed from '$components/YtEmbed.svelte';

	export let data: PageData;

	let greet = {
		greet: '',
		funny: ''
	};

	onMount(async () => {
		greet = getGreeting($UserStore?.name!);
	});

	const dataType = (item: GithubTopic) => {
		if (item.image) {
			if (
				item.image.includes('.mp3') ||
				item.image.includes('.wav') ||
				item.image.includes('.ogg')
			) {
				return 'audio';
			} else if (
				item.image.includes('.mp4') ||
				item.image.includes('.webm') ||
				item.image.includes('.ogg') ||
				item.image.includes('.mov')
			) {
				return 'video';
			} else {
				return 'image';
			}
		} else if (item.link.includes('youtube.com')) {
			return 'youtube';
		} else {
			return 'empty';
		}
	};
</script>

<main class="Feed">
	<div class="Feed__greet">
		<h1>{greet.greet}</h1>
		<p>{greet.funny}</p>
	</div>
	<ul class="Feed__content">
		{#each data.userContent as item}
			{@const itemType = dataType(item)}

			{#if itemType === 'youtube'}
				<li class="FeedItem" data-type={itemType}>
					<a class="FeedItem__box" href={`/app/article/${encodeURIComponent(item.link)}`}>
						<h2>
							{item.title}
						</h2>
						<p>
							{item.description}
						</p>
					</a>
					<YtEmbed bind:url={item.link} />
				</li>
			{:else if itemType === 'audio'}
				<li class="FeedItem" data-type={itemType}>
					<a class="FeedItem__box" href={`/app/article/${encodeURIComponent(item.link)}`}>
						<h2>
							{item.title}
						</h2>
						<p>
							{item.description}
						</p>
					</a>
					<audio controls>
						<source src={item.image} type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
				</li>
			{:else if itemType === 'video'}
				<li class="FeedItem" data-type={itemType}>
					<a class="FeedItem__box" href={`/app/article/${encodeURIComponent(item.link)}`}>
						<h2>
							{item.title}
						</h2>
						<p>
							{item.description}
						</p>
					</a>
					<video autoplay>
						<source src={item.image} type="video/mp4" />
						<track kind="captions" />
						Your browser does not support the video element.
					</video>
				</li>
			{:else if itemType === 'image'}
				<li class="FeedItem" data-type={itemType}>
					<a class="FeedItem__box" href={`/app/article/${encodeURIComponent(item.link)}`}>
						<h2>
							{item.title}
						</h2>
						<p>
							{item.description}
						</p>
					</a>
					<img src={item.image} alt={item.title} />
				</li>
			{/if}

			<hr />
		{/each}
	</ul>
</main>

<style lang="scss">
	.Feed {
		gap: 20px;
		padding: 20px;
		@include make-flex($align: flex-start);

		&__greet {
			margin-bottom: 160px;
			@include make-flex($align: flex-start);

			h1 {
				font-size: 35px;
			}
			p {
				font-size: 18px;
				color: var(--subText);
			}
		}

		&__content {
			// gap: 20px;
			list-style: none;
			@include make-flex();
			@include box(100%, auto);

			// li {
			// 	@include make-flex();
			// 	@include box(100%, auto);
			// }

			hr {
				border: none;
				border-bottom: 1px solid var(--border);
				width: 100%;
			}
		}
	}
	.FeedItem {
		gap: 20px;
		padding: 30px 0;
		@include box(100%, auto);

		&__box {
			flex: 1;
			color: var(--text);
			text-decoration: none;

			h2 {
				margin: 0;
				font-size: 21px;
				transition: all 0.2s ease-in-out;
			}
			&:hover > h2 {
				text-decoration: underline;
			}

			p {
				line-clamp: 3;
				font-size: 17px;
				overflow: hidden;
				display: -webkit-box;
				color: var(--subText);
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}

		&[data-type='youtube'],
		&[data-type='image'] {
			display: grid;
			grid-template-columns: 1fr 275px;
			img {
				object-fit: cover;
				border-radius: 15px;
				@include box(100%, 175px);
			}
			:global(.YtEmbed) {
				@include box(100%, 175px);
			}

			@include respondAt(685px) {
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 175px;
			}
		}

		&[data-type='audio'] {
			display: grid;
			grid-template-rows: 1fr 50px;
			audio {
				@include box();
			}
		}

		&[data-type='video'] {
			gap: 20px;
			display: grid;
			grid-template-rows: 1fr min-content;
			video {
				@include box();
				border-radius: 15px;
			}
		}
	}
</style>
