import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowLeft, ShieldCheck } from "@medusajs/icons"
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="spd-checkout-page">
      <header className="spd-checkout-header">
        <nav className="spd-container" aria-label="Afrekenen">
          <LocalizedClientLink
            href="/cart"
            className="spd-checkout-back"
            data-testid="back-to-cart-link"
          >
            <ArrowLeft aria-hidden="true" />
            <span>Winkelwagen</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="spd-wordmark"
            data-testid="store-link"
          >
            SmartPower<span>Deals</span>
            <small>Laden & energie</small>
          </LocalizedClientLink>
          <span className="spd-checkout-security">
            <ShieldCheck aria-hidden="true" />
            Afrekenen
          </span>
        </nav>
      </header>
      <div data-testid="checkout-container">{children}</div>
      <footer className="spd-checkout-footer spd-container">
        <span>© {new Date().getFullYear()} SmartPowerDeals</span>
        <a href="mailto:info@smartpowerdeals.nl">
          Een vraag over je bestelling?
        </a>
      </footer>
    </div>
  )
}
