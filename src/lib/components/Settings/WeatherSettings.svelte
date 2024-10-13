<script lang="ts">
	import WeatherPicker from '$components/WeatherPicker/WeatherPicker.svelte';
</script>

<WeatherPicker isStandalone={true} />

<style lang="scss">
	:global(.WeatherPicker) {
		@include box(100% !important, 100% !important);
		border: 0 !important;
		padding: 0 !important;
		border-radius: 0 !important;
	}
</style>
