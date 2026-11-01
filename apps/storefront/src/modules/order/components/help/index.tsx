import { ArrowRight } from "@medusajs/icons"
export default function Help() {
  return (
    <aside className="spd-order-help">
      <div>
        <h2>Een vraag over je bestelling?</h2>
        <p>
          Vermeld je bestelnummer als je ons mailt. We helpen je graag verder.
        </p>
      </div>
      <a href="mailto:info@smartpowerdeals.nl">
        info@smartpowerdeals.nl <ArrowRight aria-hidden="true" />
      </a>
    </aside>
  )
}
