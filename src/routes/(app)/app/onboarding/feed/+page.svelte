<script lang="ts">
	import type { PageData } from './$types';
	import TabView from '$components/TabView/TabView.svelte';
	import FeedBuilder from '$components/Onboarding/FeedBuilder/FeedBuilder.svelte';
	import SimpleFeedBuilder from '$components/Onboarding/SimpleFeedBuilder/SimpleFeedBuilder.svelte';

	export let data: PageData;

	const tabs = [
		{
			label: 'Basic',
			props: { allTopics: data.allTopics },
			component: SimpleFeedBuilder
		},
		{
			label: 'Advanced',
			props: { allTopics: data.allTopics },
			component: FeedBuilder
		}
	];
</script>

<main class="Onboarding">
	<TabView children={tabs} className="OnboardingTabs" />
</main>

<style lang="scss">
	.Onboarding {
		@include box(100%, 100vh);
		@include make-flex();
		padding: 0 20px;

		@include respondAt(565px) {
			padding: 0 10px;
		}
	}

	:global(.OnboardingTabs) {
		@include box(900px, 600px);
		padding: 30px 10px 10px 10px;

		@include respondAt(930px) {
			width: 100%;
		}
	}
</style>
