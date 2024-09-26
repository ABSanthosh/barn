<script lang="ts">
	import {
		addTopicItems,
		maxTopicCategories,
		OnboardStore,
		removeCategory
	} from '$lib/Store/OnboardStore';
	import { addToast } from '$lib/Store/ToastStore';
	import type { categorizedTopics } from '$types/Topic.type';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export const { allTopics } = $$props as { allTopics: categorizedTopics };

	$: disable = (category: string) =>
		Object.keys($OnboardStore.selectedTopicItems).length >= maxTopicCategories &&
		!(category in $OnboardStore.selectedTopicItems);
</script>

<div class="SimpleFeedBuilder">
	<div class="SimpleFeedBuilder__top">
		<h2>
			Pick
			{#key Object.keys($OnboardStore.selectedTopicItems).length}
				<span in:fly={{ duration: 300, easing: cubicOut }}>
					{maxTopicCategories - Object.keys($OnboardStore.selectedTopicItems).length}
				</span>
			{/key}

			of your favorite topics
		</h2>
		<ul>
			{#each Object.keys(allTopics) as category (category)}
				<label
					class="CrispButton"
					for={category}
					data-active={category in $OnboardStore.selectedTopicItems}
					data-icon={category in $OnboardStore.selectedTopicItems ? 'check' : ''}
					data-icon-after=""
					data-disabled={disable(category)}
				>
					{category}
					<input
						hidden
						id={category}
						type="checkbox"
						disabled={disable(category)}
						checked={category in $OnboardStore.selectedTopicItems}
						on:change={(e) => {
							// @ts-ignore
							if (e.target.checked) {
								addTopicItems(allTopics[category]);
							} else {
								removeCategory(category);
							}
						}}
					/>
				</label>
			{/each}
		</ul>
	</div>
	<div class="SimpleFeedBuilder__bottom">
		<button
			class="CrispButton"
			on:click={() => {
				addToast({
					dir: 'bottom',
					type: 'success',
					message: 'Saved your feed',
					timeout: 1000
				});
			}}
		>
			<span>Save</span>
		</button>
	</div>
</div>

<style lang="scss">
	.SimpleFeedBuilder {
		@include box();
		padding: 0 20px;

		display: grid;
		grid-template-rows: 1fr 50px;

		&__top {
			@include box();

			max-height: 100%;
			@include make-flex();
			ul {
				@include make-flex($dir: row);
				gap: 20px;
				@include box(100%, auto);
				padding: 20px;
				max-height: 100%;
				overflow: auto;
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 20px;

				.CrispButton {
					--crp-button-height: 35px;
					--crp-button-width: auto;
					--crp-button-font-size: 18px;

					&[data-disabled='true'] {
						cursor: not-allowed;
						color: light-dark(#e7e9c7, #4d4d4d);
						border: var(--crp-button-disabled-border);
						background-color: var(--crp-button-disabled-background-color);
					}
				}
			}
		}

		&__bottom {
			padding: 0 15px;
			@include make-flex($align: flex-end);
			border-top: 1px solid var(--separator);
		}
	}
</style>
