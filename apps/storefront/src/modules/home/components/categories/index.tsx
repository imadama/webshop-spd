import Image from "next/image"
import { ArrowRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  getCategoryPresentation,
  getProductImage,
} from "@lib/util/catalog-presentation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Categories({
  categories,
  products,
}: {
  categories: HttpTypes.StoreProductCategory[]
  products: HttpTypes.StoreProduct[]
}) {
  const topLevel = categories.filter(
    (category) => !category.parent_category && category.handle,
  )
  if (!topLevel.length) return null

  return (
    <section
      id="assortiment"
      className="spd-container spd-section"
      aria-labelledby="category-title"
    >
      <div className="spd-section-heading">
        <div>
          <p className="spd-eyebrow">Het assortiment</p>
          <h2 id="category-title">Wat zoek je?</h2>
        </div>
        <LocalizedClientLink href="/store" className="spd-text-link">
          Alle producten <ArrowRight aria-hidden="true" />
        </LocalizedClientLink>
      </div>
      <div className="spd-category-grid">
        {topLevel.map((category, index) => {
          const { label, description } = getCategoryPresentation(category)
          const product =
            products.find(
              (p) =>
                p.categories?.some((c) => c.id === category.id) &&
                getProductImage(p),
            ) ?? category.products?.find((p) => getProductImage(p))
          const image = product && getProductImage(product)
          return (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="spd-category"
            >
              <div className="spd-category-top">
                <span className="spd-category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowRight aria-hidden="true" />
              </div>
              {image && (
                <div className="spd-category-image">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 120px, 170px"
                    className="object-contain"
                  />
                </div>
              )}
              <div className="spd-category-copy">
                <h3>{label}</h3>
                <p>{description}</p>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
