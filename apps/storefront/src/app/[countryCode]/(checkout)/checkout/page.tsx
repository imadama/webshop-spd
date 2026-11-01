import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import EmptyCartMessage from "@modules/cart/components/empty-cart-message"

export const metadata: Metadata = {
  title: "Afrekenen",
}

export default async function Checkout({
  params,
  searchParams,
}: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ step?: string }>
}) {
  const { countryCode } = await params
  const { step } = await searchParams
  const cart = await retrieveCart()

  if (!cart?.items?.length)
    return (
      <div className="spd-container">
        <EmptyCartMessage />
      </div>
    )
  if (!step || !["address", "delivery", "payment", "review"].includes(step)) {
    const nextStep =
      !cart.shipping_address?.address_1 || !cart.email
        ? "address"
        : !cart.shipping_methods?.length
          ? "delivery"
          : "payment"
    redirect(`/${countryCode}/checkout?step=${nextStep}`)
  }

  const customer = await retrieveCustomer()

  return (
    <div className="spd-container spd-checkout-content">
      <div className="spd-page-intro">
        <p className="spd-eyebrow">Bijna klaar</p>
        <h1>Afrekenen</h1>
        <p>Vul je gegevens in en controleer je bestelling.</p>
      </div>
      <ol className="spd-checkout-progress" aria-label="Stappen bij afrekenen">
        {[
          { key: "address", label: "Adres" },
          { key: "delivery", label: "Bezorgen" },
          { key: "payment", label: "Betalen" },
          { key: "review", label: "Controleren" },
        ].map((item, index) => (
          <li
            key={item.key}
            aria-current={step === item.key ? "step" : undefined}
          >
            <span>{index + 1}</span>
            {item.label}
          </li>
        ))}
      </ol>
      <div className="spd-checkout-layout">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  )
}
