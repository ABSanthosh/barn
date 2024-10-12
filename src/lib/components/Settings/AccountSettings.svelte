<script lang="ts">
	import { enhance } from '$app/forms';
	import { toggleSettings } from '$lib/Store/SettingStore';
	import { addToast } from '$lib/Store/ToastStore';
	import { setUser, setUserSettings, UserStore } from '$lib/Store/UserStore';
	import type { ActionResult } from '@sveltejs/kit';

	let accountSettingsData = {
		name: $UserStore?.name,
		email: $UserStore?.email,
		phone: $UserStore?.settings.phone,
		school: $UserStore?.settings.school,
		isStudent: $UserStore?.settings.isStudent,
		dateOfBirth: $UserStore?.settings.dateOfBirth
	};

	const handleSettingsEnhance = ({ formData }: { formData: FormData }) => {
		formData.append(
			'userStore',
			JSON.stringify({
				id: $UserStore?.id,
				name: accountSettingsData.name,
				settings: {
					phone: accountSettingsData.phone,
					school: accountSettingsData.school,
					isStudent: accountSettingsData.isStudent,
					dateOfBirth: accountSettingsData.dateOfBirth
				}
			})
		);

		return async ({ result, update }: { result: ActionResult; update: () => void }) => {
			if (result.type === 'success') {
				const newUserData = {
					email: result.data?.user.email,
					name: result.data?.user.name,
					id: result.data?.user.id,
					picture: result.data?.user.picture,
					newUser: result.data?.user.newUser,
					updatedAt: result.data?.user.updatedAt
				};
				setUser(newUserData);
				setUserSettings(JSON.parse(result.data?.settings.settings));

				accountSettingsData = {
					name: $UserStore?.name,
					email: newUserData.email,
					phone: $UserStore?.settings.phone,
					school: $UserStore?.settings.school,
					isStudent: $UserStore?.settings.isStudent,
					dateOfBirth: $UserStore?.settings.dateOfBirth
				};

				toggleSettings();

				addToast({
					dir: 'bottom',
					message: 'Your settings have been updated successfully',
					type: 'success'
				});
			}

			update();
		};
	};
</script>

<form
	class="GeneralSettings"
	method="post"
	use:enhance={handleSettingsEnhance}
	action="/app?/updateSettings"
>
	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Name </span>
		<input
			type="text"
			class="CrispInput"
			style="width: 60%;"
			id="name"
			required
			bind:value={accountSettingsData.name}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span style="color: inherit;"> Email </span>
		<input
			disabled
			id="email"
			type="email"
			class="CrispInput"
			readonly
			style="width: 60%;"
			value={accountSettingsData.email}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Phone </span>
		<input
			type="tel"
			id="phone"
			class="CrispInput"
			style="width: 60%;"
			required
			bind:value={accountSettingsData.phone}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span style="color: inherit;"> Are you a student? </span>
		<input
			id="isStudent"
			type="checkbox"
			class="CrispInput"
			style="width: 60%; height: 100%;"
			on:click={(e) => {
				// @ts-ignore
				accountSettingsData.isStudent = e.target.checked;
			}}
			checked={accountSettingsData.isStudent}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> School </span>
		<input
			required
			type="text"
			id="school"
			class="CrispInput"
			style="width: 60%;"
			bind:value={accountSettingsData.school}
		/>
	</label>

	<label class="CrispLabel" data-direction="row" data-justify="space-between">
		<span data-mandatory style="color: inherit;"> Date of Birth </span>
		<input
			type="date"
			class="CrispInput"
			style="width: 60%;"
			id="dateOfBirth"
			bind:value={accountSettingsData.dateOfBirth}
		/>
	</label>

	<div
		style="display: flex; gap: 13px; justify-content: space-between; width: 100%; margin-top: auto;"
	>
		<i style="color: var(--subText);">
			Last updated: {$UserStore?.updatedAt &&
				new Date($UserStore?.updatedAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				})}
		</i>
		<button class="CrispButton" data-type="success" type="submit"> Save </button>
	</div>
</form>

<style lang="scss">
	.GeneralSettings {
		gap: 13px;
		@include box();
		@include make-flex($just: flex-start);

		// .CrispButton {
		// 	&[data-type='success'] {
		// 		margin-top: auto;
		// 		margin-left: auto;
		// 	}
		// }
	}
</style>
