<script lang="ts">
	import { onMount } from 'svelte';
	import getGreeting from '$utils/greet';
	import { UserStore } from '$lib/Store/UserStore';
	import type { PageData } from './$types';
	import type { GithubTopic } from '$types/Topic.type';
	import YtEmbed from '$components/YtEmbed.svelte';
	import type { WeatherResponse } from '$types/Weather.type';
	import WeatherCard from '$components/Weather/WeatherCard.svelte';

	export let data: PageData & {
		weatherData: WeatherResponse[];
	};

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

	$: activeTab = 'All';

	$: content = () => {
		if (activeTab === 'All') {
			return data.userContent;
		} else {
			// if Articles, return dataType === 'image'
			// if Podcasts, return dataType === 'audio'
			// if Videos, return dataType === 'video'
			return data.userContent.filter((item) => {
				if (activeTab === 'Articles') {
					return dataType(item) === 'image';
				} else if (activeTab === 'Podcasts') {
					return dataType(item) === 'audio';
				} else if (activeTab === 'Videos') {
					return dataType(item) === 'video';
				} else if (activeTab === 'Youtube') {
					return dataType(item) === 'youtube';
				}
			});
		}
	};

	const getSource = (source: string) => {
		// remove https:// and www. from the source
		// split the source by / and return the first element
		return source.replace('https://', '').replace('www.', '').split('/')[0];
	};
</script>

<main class="Feed">
	<div class="Feed__greet">
		<h1>{greet.greet}</h1>
		<p>{greet.funny}</p>
	</div>
	<div class="Feed__weather">
		{#each data.weatherData as item}
			<WeatherCard weatherData={item} />
		{/each}
	</div>
	<div class="Tabs">
		{#each ['All', 'Articles', 'Podcasts', 'Videos', 'Youtube'] as child, index}
			<button
				class="CrispButton"
				data-active={child === activeTab}
				on:click={() => {
					activeTab = child;
				}}
			>
				{child}
			</button>
		{/each}
	</div>
	<ul class="Feed__content">
		{#each content() as item}
			{@const itemType = dataType(item)}

			<li class="FeedItem">
				<div class="FeedItem__top" data-type={itemType}>
					<a
						class="FeedItem__box"
						href={`/app/article/${encodeURIComponent(item.id)}?day=today&topic=${item.topic}`}
					>
						<span>
							{getSource(item.link)}
						</span>
						<h2>{item.title}</h2>
						<p>{item.description}</p>
					</a>
					{#if itemType === 'youtube'}
						<YtEmbed bind:url={item.link} />
					{:else if itemType === 'audio'}
						<audio controls>
							<source src={item.image} type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
					{:else if itemType === 'video'}
						<video autoplay>
							<source src={item.image} type="video/mp4" />
							<track kind="captions" />
							Your browser does not support the video element.
						</video>
					{:else if itemType === 'image'}
						<img src={item.image} alt={item.title} />
					{/if}
				</div>
				<div class="FeedItem__bottom">
					<span class="FeedItem__meta" data-icon="edit_calendar">
						{new Date(item.published).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
				</div>
			</li>
			<hr />
		{/each}
	</ul>
</main>

<style lang="scss">
	.Feed {
		.Tabs {
			@include box(100%, auto);
			@include make-flex($dir: row);

			.CrispButton {
				--crp-button-height: 40px;
				--crp-button-width: 100px;
				--crp-button-border-radius: 0;

				&:first-child {
					border-top-left-radius: 7px;
					border-bottom-left-radius: 7px;
				}

				&:last-child {
					border-top-right-radius: 7px;
					border-bottom-right-radius: 7px;
				}
			}

			@include respondAt(435px) {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				.CrispButton {
					--crp-button-width: 100%;

					&:first-child {
						border-radius: 0;
						border-top-left-radius: 7px;
					}

					&:nth-child(2) {
						border-top-right-radius: 7px;
					}

					&:last-child {
						border-radius: 0;
						border-bottom-left-radius: 7px;
						border-bottom-right-radius: 7px;
						grid-column: 1 / -1;
					}
				}
			}
		}

		&__weather {
			gap: 20px;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(2, minmax(200px, 1fr));

			@include respondAt(870px) {
				grid-template-columns: 1fr;
			}
		}
		& {
			gap: 20px;
			padding: 20px;
			@include make-flex($align: flex-start);
		}
		&__greet {
			margin-bottom: 60px;
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
		gap: 10px;
		padding: 30px 0 15px 0;
		@include box(100%, auto);
		@include make-flex();

		&__box {
			flex: 1;
			color: var(--text);
			text-decoration: none;

			span {
				font-size: 14px;
				color: var(--subText);
			}

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
		&__top {
			gap: 20px;
			@include box(100%, auto);
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

		&__bottom {
			@include make-flex($align: flex-end);
			@include box(100%, auto);
		}

		&__meta {
			gap: 10px;
			text-decoration: none;
			color: var(--subText);
			@include make-flex($dir: row);
		}
	}
</style>
