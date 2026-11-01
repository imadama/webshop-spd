import { ArrowRight, ShoppingBag } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
export default function EmptyCartMessage() {
  return (
    <div className="spd-empty-state" data-testid="empty-cart-message">
      <span className="spd-empty-icon">
        <ShoppingBag aria-hidden="true" />
      </span>
      <p className="spd-eyebrow">Jouw winkelwagen</p>
      <h1>Je winkelwagen is nog leeg.</h1>
      <p>Ontdek het assortiment en vind de laadoplossing die bij je past.</p>
      <LocalizedClientLink href="/store" className="spd-button">
        Bekijk het assortiment <ArrowRight aria-hidden="true" />
      </LocalizedClientLink>
    </div>
  )
}
