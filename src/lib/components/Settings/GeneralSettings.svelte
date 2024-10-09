<script lang="ts">
	$: generalSettingsData = {
		theme: 'light',
		articlesPerPage: 10
	};
</script>

<form class="GeneralSettings">
	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Theme </span>
		<select
			id="theme"
			class="CrispSelect"
			style="width: 60%;"
			bind:value={generalSettingsData.theme}
		>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Articles per page </span>
		<select
			class="CrispSelect"
			style="width: 60%;"
			id="articlesPerPage"
			bind:value={generalSettingsData.articlesPerPage}
		>
			{#each [5, 10, 15, 20, 25] as item}
				<option value={item}>{item}</option>
			{/each}
		</select>
	</label>

	<button class="CrispButton" data-type="success" type="submit"> Save </button>
</form>

<style lang="scss">
	.GeneralSettings {
		gap: 13px;
		@include box();
		@include make-flex($just: flex-start);

		.CrispButton {
			&[data-type='success'] {
				margin-top: auto;
				margin-left: auto;
			}
		}
	}
</style>
