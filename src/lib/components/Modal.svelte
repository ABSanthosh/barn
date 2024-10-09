<script lang="ts">
	export let showModal = false;
	export let toggleModal: () => void;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<dialog
		class="Modal"
		bind:this={dialog}
		on:close={() => toggleModal()}
		on:click|self={() => dialog.close()}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="Modal__content" on:click|stopPropagation>
			<slot />
		</div>
	</dialog>
{/if}

<style lang="scss">
	.Modal {
		position: fixed;
		@include box(100vw, 100vh);
		@include make-flex();
		// max-width: 32em;
		background: transparent;
		border: none;
		padding: 0;

		&::backdrop {
			background: var(--modal-blur-bg);
			backdrop-filter: blur(5px);
		}

		&:-internal-dialog-in-top-layer {
			max-width: unset;
			max-height: unset;
		}

		&__content {
			display: none;
			border-radius: 15px;
			background-color: transparent;
			@include box(min(calc(100vw - 50px), 80vh), 530px);

			border-radius: 20px;
			background-color: var(--modal-bg-noBlur);
			border: 1px solid var(--secondary);
			box-shadow: var(--t-crp-box-shadow);
		}

		&[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}

		&[open] > &__content {
			display: flex;
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
