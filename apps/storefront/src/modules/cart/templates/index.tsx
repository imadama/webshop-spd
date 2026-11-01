import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { HttpTypes } from "@medusajs/types"

export default function CartTemplate({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  const count = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
  return (
    <div
      className="spd-cart-page spd-page spd-container"
      data-testid="cart-container"
    >
      <Breadcrumbs items={[{ label: "Winkelwagen" }]} />
      {cart?.items?.length ? (
        <>
          <div className="spd-page-intro">
            <p className="spd-eyebrow">Jouw selectie</p>
            <h1>
              Winkelwagen <span className="spd-heading-count">{count}</span>
            </h1>
            <p>Controleer je producten en ga verder naar afrekenen.</p>
          </div>
          <div className="spd-cart-layout">
            <div className="spd-cart-items">
              {!customer && <SignInPrompt />}
              <ItemsTemplate cart={cart} />
            </div>
            <aside className="spd-summary-panel">
              {cart.region && <Summary cart={cart} />}
            </aside>
          </div>
        </>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  )
}
