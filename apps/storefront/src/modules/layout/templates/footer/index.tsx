import { ArrowRight } from "@medusajs/icons"
import { listCategories } from "@lib/data/categories"
import { getCategoryPresentation } from "@lib/util/catalog-presentation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const categories = (await listCategories()).filter(
    (c) => !c.parent_category && c.handle,
  )
  return (
    <footer className="spd-footer">
      <div className="spd-container">
        <div className="spd-footer-grid">
          <div>
            <LocalizedClientLink href="/" className="spd-wordmark">
              SmartPower<span>Deals</span>
              <small>Laden & energie</small>
            </LocalizedClientLink>
            <p>
              Voor thuis en onderweg.
              <br />
              Vind de laadoplossing die bij je past.
            </p>
          </div>
          <div>
            <h2>Het assortiment</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <LocalizedClientLink href={`/categories/${category.handle}`}>
                    {getCategoryPresentation(category).label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>We helpen je verder</h2>
            <ul>
              <li>
                <LocalizedClientLink href="/#keuzehulp">
                  Hulp bij kiezen
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account">
                  Mijn account
                </LocalizedClientLink>
              </li>
              <li>
                <a href="mailto:info@smartpowerdeals.nl">
                  info@smartpowerdeals.nl <ArrowRight aria-hidden="true" />
                </a>
              </li>
            </ul>
            <p>
              Vragen over een product, je bestelling
              <br />
              of een retour? Mail ons gerust.
            </p>
          </div>
        </div>
        <div className="spd-footer-bottom">
          <span>© {new Date().getFullYear()} SmartPowerDeals</span>
          <LocalizedClientLink href="/store">
            Bekijk alle producten <ArrowRight aria-hidden="true" />
          </LocalizedClientLink>
        </div>
      </div>
    </footer>
  )
}
