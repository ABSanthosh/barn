<script lang="ts">
	import {
		loadStripe,
		type Stripe,
		type StripeCardElement,
		type StripeError
	} from '@stripe/stripe-js';
	import { Elements, CardNumber, CardExpiry, CardCvc } from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { goto } from '$app/navigation';
	import { setUserPremium, UserStore } from '$lib/Store/UserStore';
	import { toggleSettings } from '$lib/Store/SettingStore';
	import { addToast } from '$lib/Store/ToastStore';

	let stripe: Stripe | null = null;
	let error: StripeError | null = null;
	let cardElement: StripeCardElement | null = null;
	let name: string = '';
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(env.PUBLIC_STRIPE_KEY!);
	});

	async function createPaymentIntent() {
		const response = await fetch('/payment/intent', { method: 'POST' });
		const { client_secret } = await response.json();

		return client_secret;
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return;

		processing = true;

		// create the payment intent server-side
		const clientSecret = await createPaymentIntent();

		// confirm payment with stripe
		const result = await stripe?.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement as StripeCardElement,
				billing_details: {
					name
				}
			}
		});

		if (result!.error) {
			// payment failed, notify user
			error = result!.error;
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			// goto('/examples/credit-card/thanks');
			const formData = new FormData();
			formData.append('id', $UserStore?.id!);
			await fetch('/app?/confirmPremiumPurchase', {
				method: 'POST',
				body: formData
			}).then((res) => {
				if (res.ok) {
					toggleSettings();
					addToast({
						message: 'Thank you for your purchase!',
						type: 'success',
						dir: 'bottom'
					});
					setUserPremium(true);
				}
			});
		}
	}
</script>

{#if error}
	<p class="CrispMessage" data-type="info">{error.message} Please try again.</p>
{/if}

<Elements {stripe}>
	<form on:submit|preventDefault={submit}>
		<input
			class="CrispInput"
			style="height: 43px;"
			name="name"
			bind:value={name}
			placeholder="Your name"
			disabled={processing}
		/>
		<CardNumber bind:element={cardElement} classes={{ base: 'input' }} />

		<div class="row">
			<CardExpiry classes={{ base: 'input' }} />
			<CardCvc classes={{ base: 'input' }} />
		</div>

		<button class="CrispButton" style="width: 100%;" data-type="success" disabled={processing}>
			{#if processing}
				Processing...
			{:else}
				Pay
			{/if}
		</button>
	</form>
</Elements>

<style lang="scss">
	form {
		@include make-flex();
		@include box();
		gap: 10px;

		.row {
			@include make-flex($dir: row);
			gap: 10px;
			width: 100%;
		}
	}

	// input,
	:global(.input) {
		border: 1px solid var(--t-crp-border);
		padding: 12px;
		border-radius: 8px;
		background: var(--elevation-1);
		box-shadow: var(--t-crp-box-shadow);
		width: 100% !important;
	}

	.row :global(.input) {
		width: 20%;
	}
</style>
