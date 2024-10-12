import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST() {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 500,
		currency: 'usd',
		payment_method_types: ['card']
	});

	return new Response(JSON.stringify({ client_secret: paymentIntent.client_secret }));
}
