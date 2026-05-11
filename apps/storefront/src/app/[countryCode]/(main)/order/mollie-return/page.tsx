import { placeOrder } from "@lib/data/cart"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Betaling verwerken — SmartPowerDeals",
}

// Called after Mollie redirects the user back to the store.
// placeOrder() calls cart.complete() and redirects to /order/{id}/confirmed on success.
// If the webhook hasn't fired yet, we show a processing message.
export default async function MollieReturnPage() {
  try {
    await placeOrder()
  } catch (e: unknown) {
    // NEXT_REDIRECT is thrown by redirect() — let Next.js handle it
    if ((e as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) throw e
  }

  // Reached only if cart.complete returned type:"cart" (payment not yet captured).
  return (
    <div className="content-container flex flex-col items-center justify-center py-24 gap-6 text-center">
      <Heading level="h1" className="text-2xl">
        Betaling wordt verwerkt...
      </Heading>
      <Text className="text-ui-fg-subtle max-w-md">
        Je betaling wordt bevestigd. Je ontvangt een bevestigingsmail zodra de
        betaling is verwerkt. Controleer je bestellingen via je account.
      </Text>
      <LocalizedClientLink href="/account/orders" className="text-ui-fg-interactive hover:underline">
        Mijn bestellingen bekijken
      </LocalizedClientLink>
    </div>
  )
}
