import { HttpTypes } from "@medusajs/types"
export default function ProfileEmail({
  customer,
}: {
  customer: HttpTypes.StoreCustomer
}) {
  return (
    <div data-testid="account-email-editor">
      <p className="text-small-regular text-ui-fg-subtle mb-2">E-mailadres</p>
      <p className="text-sm font-medium" data-testid="current-info">
        {customer.email}
      </p>
      <p className="text-small-regular text-ui-fg-subtle mt-2">
        Wil je je e-mailadres wijzigen?{" "}
        <a
          className="underline text-spd-green"
          href="mailto:info@smartpowerdeals.nl"
        >
          Neem contact met ons op.
        </a>
      </p>
    </div>
  )
}
