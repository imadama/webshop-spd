import { ReactNode } from "react"
import { listCategories } from "@lib/data/categories"
import { getCategoryPresentation } from "@lib/util/catalog-presentation"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { ArrowRight } from "@medusajs/icons"

export default async function CatalogLayout({
  title,
  description,
  currentCategory,
  sortBy,
  children,
  titleTestId,
  links,
}: {
  title: string
  description?: string
  currentCategory?: string
  sortBy: SortOptions
  children: ReactNode
  titleTestId?: string
  links?: { label: string; href: string }[]
}) {
  const categories = (await listCategories()).filter(
    (c) => !c.parent_category && c.handle,
  )
  return (
    <div
      className="spd-catalog-page spd-page spd-container"
      data-testid="category-container"
    >
      <Breadcrumbs items={[{ label: title }]} />
      <div className="spd-page-intro">
        <p className="spd-eyebrow">Het assortiment</p>
        <h1 data-testid={titleTestId}>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="spd-catalog-layout">
        <aside className="spd-catalog-sidebar">
          <h2>Categorieën</h2>
          <nav aria-label="Filter op categorie">
            <LocalizedClientLink
              href="/store"
              aria-current={!currentCategory ? "page" : undefined}
            >
              Alle producten
            </LocalizedClientLink>
            {categories.map((c) => (
              <LocalizedClientLink
                key={c.id}
                href={`/categories/${c.handle}`}
                aria-current={c.id === currentCategory ? "page" : undefined}
              >
                {getCategoryPresentation(c).label}
                <ArrowRight aria-hidden="true" />
              </LocalizedClientLink>
            ))}
          </nav>
          <div className="spd-catalog-help">
            <p>Twijfel over je keuze?</p>
            <LocalizedClientLink href="/#keuzehulp">
              Bekijk de keuzehulp <ArrowRight aria-hidden="true" />
            </LocalizedClientLink>
          </div>
        </aside>
        <div className="spd-catalog-results">
          <div className="spd-catalog-toolbar">
            <span>Vind wat past bij jouw situatie</span>
            <RefinementList sortBy={sortBy} />
          </div>
          {links && links.length > 0 && (
            <div className="spd-subcategories">
              {links.map((link) => (
                <LocalizedClientLink key={link.href} href={link.href}>
                  {link.label}
                  <ArrowRight aria-hidden="true" />
                </LocalizedClientLink>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
