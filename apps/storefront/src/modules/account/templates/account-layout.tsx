import { ReactNode } from "react"
import { HttpTypes } from "@medusajs/types"
import AccountNav from "../components/account-nav"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
export default function AccountLayout({
  customer,
  children,
}: {
  customer: HttpTypes.StoreCustomer | null
  children: ReactNode
}) {
  return (
    <div
      className="spd-account-page spd-page spd-container"
      data-testid="account-page"
    >
      <Breadcrumbs items={[{ label: "Mijn account" }]} />
      {customer ? (
        <div className="spd-account-layout">
          <AccountNav customer={customer} />
          <div className="spd-account-content">{children}</div>
        </div>
      ) : (
        children
      )}
      <div className="spd-account-help">
        <div>
          <h2>Kunnen we je ergens mee helpen?</h2>
          <p>
            Mail ons je vraag over een product, je account of je bestelling.
          </p>
        </div>
        <a className="spd-text-link" href="mailto:info@smartpowerdeals.nl">
          info@smartpowerdeals.nl
        </a>
      </div>
    </div>
  )
}
