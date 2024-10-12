<script lang="ts">
	import SimpleFeedBuilder from '$components/Onboarding/SimpleFeedBuilder/SimpleFeedBuilder.svelte';
	import type { categorizedTopics } from '$types/Topic.type';

	export let allTopics: categorizedTopics = {};
</script>

<!-- <SimpleFeedBuilder {allTopics} /> -->
