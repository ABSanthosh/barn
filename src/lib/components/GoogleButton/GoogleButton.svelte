<script lang="ts">
	import clickOutside from '$directive/clickOutside';
	import { UserStore } from '$lib/Store/UserStore';

	$: isProfileOpen = false;
</script>

{#if JSON.stringify($UserStore) === '{}'}
	<form hidden action="/auth?/login" method="POST" id="google-login" />
	<button class="Google--button CrispButton" type="submit" form="google-login">
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			style="display: block;"
		>
			<path
				fill="#EA4335"
				d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
			/>
			<path
				fill="#4285F4"
				d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
			/>
			<path
				fill="#FBBC05"
				d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
			/>
			<path
				fill="#34A853"
				d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
			/>
			<path fill="none" d="M0 0h48v48H0z" />
		</svg>
		<span>Sign in</span>
	</button>
{:else}
	<details
		data-no-marker
		use:clickOutside
		bind:open={isProfileOpen}
		class="CrispMenu Google__profile"
		on:outclick={() => (isProfileOpen = false)}
	>
		<summary>
			<img referrerpolicy="no-referrer" src={$UserStore.picture || ''} alt="Avatar" />
		</summary>
		<ul class="Google__profile--box CrispMenu__content" data-direction="bottom" data-align="center">
			<div class="Google__profile--content">
				<span>
					<strong>
						Hi, {$UserStore.name}
					</strong>
				</span>
				<span>
					{$UserStore.email}
				</span>
			</div>
			<form action="/auth?/logout" method="POST" class="w-100">
				<button type="submit" data-type="danger" class="CrispButton w-100"> Logout </button>
			</form>
		</ul>
	</details>
{/if}

<style lang="scss">
	.Google {
		&--button {
			gap: 6px;
			cursor: pointer;

			--crp-button-width: auto;
			--crp-button-height: 100%;
			--crp-button-padding-top: 5px;
			--crp-button-padding-left: 7px;
			--crp-button-padding-right: 7px;
			--crp-button-padding-bottom: 5px;

			& > span {
				font-size: 15px;
				white-space: nowrap;
			}

			& > svg {
				@include box(auto);
			}
		}
		&__profile {
			min-width: unset;
			--crp-menu-width: auto;
			--crp-menu-height: 100%;

			&--content {
				@include box();
				padding: 2px 5px;
				@include make-flex($align: flex-start);

				& > span {
					font-size: 14px;
					font-weight: 500;

					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 100%;
					color: var(--subText);

					& > strong {
						font-size: large;
						color: var(--text);
					}
				}
			}

			& > summary {
				@include box();
				padding: 0;
				border-radius: 50%;

				& > img {
					border-radius: 50%;
					@include box(auto);
				}

				&::before {
					content: '';
				}
			}

			&--box {
				@include box(200px, auto);

				// & > li {
				// 	width: 100%;

				// 	& > a {
				// 		width: 100%;
				// 		@include make-flex();
				// 	}
				// }
			}

			// &--item {
			// 	gap: 8px;
			// 	text-decoration: none;
			// 	@include make-flex($dir: row, $just: flex-start);

			// 	// &:not(.active):hover {
			// 	// 	background-color: #f3f4f6;
			// 	// }
			// }
		}
	}
</style>
