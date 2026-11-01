import { Suspense } from "react"
import { User, ShoppingBag, ArrowRight } from "@medusajs/icons"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { getCategoryPresentation } from "@lib/util/catalog-presentation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import AnnouncementBar from "@modules/layout/components/announcement-bar"
import SideMenu from "@modules/layout/components/side-menu"
import SearchField from "@modules/layout/components/search-field"

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions(),
    listLocales(),
    getLocale(),
    listCategories(),
  ])
  const topLevelCategories = categories
    .filter((c) => !c.parent_category && c.handle)
    .slice(0, 6)

  return (
    <div className="spd-site-header">
      <a href="#page-content" className="spd-skip-link">
        Naar de inhoud
      </a>
      <AnnouncementBar />
      <header>
        <div className="spd-container spd-header-main">
          <div className="spd-mobile-menu">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
              categories={categories}
            />
          </div>
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
            className="spd-wordmark"
            aria-label="SmartPowerDeals, naar de homepage"
          >
            SmartPower<span>Deals</span>
            <small>Laden & energie</small>
          </LocalizedClientLink>
          <SearchField className="spd-search-desktop" />
          <nav className="spd-header-actions" aria-label="Mijn winkel">
            <LocalizedClientLink
              href="/account"
              data-testid="nav-account-link"
              className="spd-account-link"
            >
              <User aria-hidden="true" />
              <span>Mijn account</span>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="spd-cart-link"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag aria-hidden="true" />
                  <span>Winkelwagen (0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </nav>
          <SearchField className="spd-search-mobile" />
        </div>
        <div className="spd-category-nav">
          <nav className="spd-container" aria-label="Productcategorieën">
            <LocalizedClientLink href="/store" className="spd-all-products">
              Alle producten
            </LocalizedClientLink>
            {topLevelCategories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
              >
                {getCategoryPresentation(category).label}
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink href="/#keuzehulp" className="spd-nav-advice">
              Hulp bij kiezen <ArrowRight aria-hidden="true" />
            </LocalizedClientLink>
          </nav>
        </div>
      </header>
    </div>
  )
}
