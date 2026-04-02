import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const PRICE_ID_PRO = 'price_1234567890' // Replace with actual price ID

export async function createCheckoutSession(userId: string) {
  return await stripe.checkout.sessions.create({
    customer_email: '',
    line_items: [
      {
        price: PRICE_ID_PRO,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?canceled=true`,
    metadata: {
      userId,
    },
  })
}
