<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let children = [] as {
		label: string;
		props: any;
		component: new (...args: any[]) => SvelteComponent;
	}[];
	export let className = '';

	$: activeTab = children[0].label;
</script>

<div class="TabView {className}">
	<div class="Tabs">
		{#each children as child}
			<button
				class="CrispButton"
				data-active={child.label === activeTab}
				on:click={() => (activeTab = child.label)}
			>
				{child.label}
			</button>
		{/each}
	</div>
	{#each children as child}
		{#if child.label === activeTab}
			<svelte:component this={child.component} {...child.props} />
		{/if}
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
					&:not([data-active]) {
						border-right: 0;
					}
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
