"use client"
import { useParams, usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRightOnRectangle } from "@medusajs/icons"
const links = [
  { href: "/account", label: "Overzicht", testId: "overview-link" },
  { href: "/account/profile", label: "Mijn gegevens", testId: "profile-link" },
  { href: "/account/addresses", label: "Adressen", testId: "addresses-link" },
  { href: "/account/orders", label: "Bestellingen", testId: "orders-link" },
]
export default function AccountNav({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) {
  const route = usePathname()
  const { countryCode } = useParams<{ countryCode: string }>()
  return (
    <aside className="spd-account-nav" data-testid="account-nav">
      <p className="spd-eyebrow">Mijn account</p>
      <h2>Hoi {customer?.first_name || "daar"}.</h2>
      <nav aria-label="Accountnavigatie">
        {links.map((link) => (
          <LocalizedClientLink
            key={link.href}
            href={link.href}
            aria-current={
              route === `/${countryCode}${link.href}` ? "page" : undefined
            }
            data-testid={link.testId}
          >
            {link.label}
          </LocalizedClientLink>
        ))}
        <button
          type="button"
          onClick={() => signout(countryCode)}
          data-testid="logout-button"
        >
          <ArrowRightOnRectangle aria-hidden="true" />
          Uitloggen
        </button>
      </nav>
    </aside>
  )
}
