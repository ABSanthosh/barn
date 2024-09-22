<script lang="ts">
	import type { PageData } from "./$types";
	import FeedBuilder from '$components/Onboarding/FeedBuilder.svelte';

	export let data: PageData
</script>

<main class="Onboarding">
	<FeedBuilder allTopics={data.allTopics} />
</main>

<style lang="scss">
	.Onboarding {
		@include box(100%, 100vh);
		@include make-flex();
		padding: 0 20px;
	}
</style>