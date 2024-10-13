<script lang="ts">
	import { invalidate } from '$app/navigation';
	import YtEmbed from '$components/YtEmbed.svelte';
	import { addToast } from '$lib/Store/ToastStore';
	import { UserStore } from '$lib/Store/UserStore';
	import type { Bookmark } from '$types/Bookmark.type';
	import type { PageData } from './$types';

	export let data: PageData & {
		bookmarks: Bookmark[];
	};

	$: bookmarkIds = data.bookmarks.map((item) => item.articleId);

	const getSource = (source: string) => {
		// remove https:// and www. from the source
		// split the source by / and return the first element
		return source.replace('https://', '').replace('www.', '').split('/')[0];
	};
	const dataType = (item: Bookmark) => {
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
	<h1>Bookmarks</h1>
	{#if data.bookmarks.length === 0}
		<p class="CrispMessage" data-type="info" style="margin: auto;" data-format="box">
			No bookmarks found
		</p>
	{/if}
	<ul class="Feed__content">
		{#each data.bookmarks as item}
			{@const itemType = dataType(item)}
			{@const isBookmarked = bookmarkIds.includes(item.articleId)}

			<li class="FeedItem">
				<div class="FeedItem__top" data-type={itemType}>
					<a
						class="FeedItem__box"
						href={`/app/article/${encodeURIComponent(item.articleId)}?day=today&topic=${item.topic}`}
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
					<button
						class="CrispButton"
						data-type="ghost"
						title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
						data-icon={isBookmarked ? 'bookmark_added' : 'bookmark'}
						on:click={async () => {
							if (!isBookmarked) {
								await fetch(`/api/bookmark`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										userId: $UserStore?.id,
										bookmark: {
											articleId: item.articleId,
											title: item.title,
											link: item.link,
											image: item.image,
											author: item.author,
											source: getSource(item.link),
											description: item.description,
											published: item.published,
											topic: item.topic
										}
									})
								}).then((res) => {
									if (res.ok) {
										invalidate('bookmarks:count');
										addToast({
											message: 'Article bookmarked',
											type: 'success',
											dir: 'bottom',
											timeout: 1000
										});
									} else {
										addToast({
											message: 'Failed to bookmark article',
											type: 'danger',
											dir: 'bottom',
											timeout: 1000
										});
									}
								});
							} else {
								await fetch(`/api/bookmark`, {
									method: 'DELETE',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										userId: $UserStore?.id,
										articleId: item.articleId
									})
								}).then((res) => {
									if (res.ok) {
										addToast({
											message: 'Article removed from bookmarks',
											type: 'success',
											dir: 'bottom',
											timeout: 1000
										});
										invalidate('bookmarks:count');
									} else {
										addToast({
											message: 'Failed to remove article from bookmarks',
											type: 'danger',
											dir: 'bottom',
											timeout: 1000
										});
									}
								});
							}
						}}
					/>
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
		gap: 20px;
		padding: 20px;
		@include make-flex($align: flex-start);

		h1 {
			margin: 0;
			font-size: 35px;
			width: 100%;

			border-bottom: 1.5px solid var(--separator);
		}

		&__content {
			// gap: 20px;
			list-style: none;
			@include make-flex();
			@include box(100%, auto);

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
			@include make-flex($dir: row, $just: space-between);
			@include box(100%, auto);

			.CrispButton {
				padding: 2px;
				@include box(35px, 35px);

				&::before {
					color: var(--subText);
					font-size: 25px;
				}
			}
		}

		&__meta {
			gap: 10px;
			text-decoration: none;
			color: var(--subText);
			@include make-flex($dir: row);
		}
	}
</style>
