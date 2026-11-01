import Image from "next/image"
import { ArrowRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  getCategoryPresentation,
  getProductImage,
  getProductLabel,
} from "@lib/util/catalog-presentation"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ProductsPreview({
  products,
}: {
  products: HttpTypes.StoreProduct[]
}) {
  const illustrated = products.filter(
    (product) => product.handle && getProductImage(product),
  )
  const selection: HttpTypes.StoreProduct[] = []
  for (const handle of [
    "laadkabels",
    "thuisladers",
    "laadpaal",
    "thuisbatterijen",
  ]) {
    const product = illustrated.find((p) =>
      p.categories?.some((category) => category.handle === handle),
    )
    if (product && !selection.some((p) => p.id === product.id))
      selection.push(product)
  }
  for (const product of illustrated) {
    if (selection.length >= 4) break
    if (!selection.some((p) => p.id === product.id)) selection.push(product)
  }
  if (!selection.length) return null

  return (
    <section className="spd-products-section" aria-labelledby="products-title">
      <div className="spd-container spd-section">
        <div className="spd-section-heading">
          <div>
            <p className="spd-eyebrow">Om mee te beginnen</p>
            <h2 id="products-title">Uit ons assortiment</h2>
          </div>
          <LocalizedClientLink href="/store" className="spd-text-link">
            Bekijk alles <ArrowRight aria-hidden="true" />
          </LocalizedClientLink>
        </div>
        <div className="spd-product-grid">
          {selection.map((product) => {
            const { cheapestPrice } = getProductPrice({ product })
            const category = product.categories?.[0]
            const prices =
              product.variants
                ?.map((variant) => variant.calculated_price?.calculated_amount)
                .filter((amount) => amount != null) ?? []
            const hasPriceRange = new Set(prices).size > 1
            return (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="spd-product-card"
              >
                <div className="spd-product-card-image">
                  <Image
                    src={getProductImage(product)!}
                    alt={getProductLabel(product.title)}
                    fill
                    sizes="(max-width: 767px) 45vw, (max-width: 1023px) 42vw, 280px"
                    className="object-contain"
                  />
                </div>
                <div className="spd-product-card-body">
                  {category && (
                    <p className="spd-product-category">
                      {getCategoryPresentation(category).label}
                    </p>
                  )}
                  <h3>{getProductLabel(product.title)}</h3>
                  <div className="spd-product-card-bottom">
                    <div>
                      {cheapestPrice ? (
                        <>
                          <span className="spd-card-price">
                            {hasPriceRange && <small>Vanaf </small>}
                            {convertToLocale({
                              amount: cheapestPrice.calculated_price_number,
                              currency_code: cheapestPrice.currency_code,
                              locale: "nl-NL",
                            })}
                          </span>
                          <span className="spd-card-detail">
                            Bekijk uitvoering en details
                          </span>
                        </>
                      ) : (
                        <span className="spd-card-detail">
                          Bekijk product en prijs
                        </span>
                      )}
                    </div>
                    <span className="spd-card-arrow">
                      <ArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
