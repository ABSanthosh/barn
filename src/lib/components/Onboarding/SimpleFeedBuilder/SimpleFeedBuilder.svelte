<script lang="ts">
	import {
		addTopicItems,
		maxTopicCategories,
		OnboardStore,
		removeCategory
	} from '$lib/Store/OnboardStore';
	import type { categorizedTopics } from '$types/Topic.type';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export const { allTopics } = $$props as { allTopics: categorizedTopics };

	$: disable = (category: string) =>
		Object.keys($OnboardStore.selectedTopicItems).length >= maxTopicCategories &&
		!(category in $OnboardStore.selectedTopicItems);
</script>

<div class="SimpleFeedBuilder">
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

<style lang="scss">
	.SimpleFeedBuilder {
		@include box();
		padding: 0 20px;
		@include make-flex();
		max-height: 100%;

		// h2 {
		//   font-size: 1.5rem;
		//   font-weight: 500;
		//   margin-bottom: 20px;
		// }

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
</style>
