<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { fly } from 'svelte/transition';

	export let children = [] as {
		label: string;
		props: any;
		component: new (...args: any[]) => SvelteComponent;
	}[];
	export let className = '';

	$: activeIndex = 0;
	$: activeTab = children[activeIndex].label;
</script>

<div class="TabView {className}">
	<div class="Tabs">
		{#each children as child, index}
			<button
				class="CrispButton"
				data-active={child.label === activeTab}
				on:click={() => {
					activeTab = child.label;
					activeIndex = index;
				}}
			>
				{child.label}
			</button>
		{/each}
	</div>
	{#each children as child, index (child.label)}
		{#key child.label}
			{#if child.label === activeTab}
				<div
					in:fly={{
						x: index > activeIndex ? 50 : -50,
						duration: 500
					}}
					style="height: 100%; width: 100%; max-height: 100%; max-width: 100%;"
				>
					<svelte:component this={child.component} {...child.props} />
				</div>
			{/if}
		{/key}
	{/each}
</div>

<style lang="scss">
	.TabView {
		position: relative;
		border-radius: 30px;
		background-color: var(--modal-bg-noBlur);
		border: 1px solid var(--secondary);
		margin-top: 20px;

		.Tabs {
			top: -20px;
			left: 50%;
			transform: translateX(-50%);
			@include box(auto, auto);
			@include make-flex($dir: row);
			position: absolute;

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
		}
	}
</style>
