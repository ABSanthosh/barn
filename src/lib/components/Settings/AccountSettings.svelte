<script lang="ts">
	$: accountSettingsData = {
		name: 'John Doe',
		email: 'j@doe',
		phone: '1234567890',
		// other user account related settings
		isStudent: true,
		school: 'School of Hard Knocks'
	};
</script>

<form class="GeneralSettings">
	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Name </span>
		<input
			type="text"
			class="CrispInput"
			style="width: 60%;"
			id="name"
			bind:value={accountSettingsData.name}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Email </span>
		<input
			type="email"
			class="CrispInput"
			style="width: 60%;"
			id="email"
			bind:value={accountSettingsData.email}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Phone </span>
		<input
			type="tel"
			class="CrispInput"
			style="width: 60%;"
			id="phone"
			bind:value={accountSettingsData.phone}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Are you a student? </span>
		<input
			type="checkbox"
			class="CrispCheckbox"
			style="width: 60%;"
			id="isStudent"
			bind:checked={accountSettingsData.isStudent}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> School </span>
		<input
			type="text"
			class="CrispInput"
			style="width: 60%;"
			id="school"
			bind:value={accountSettingsData.school}
		/>
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
