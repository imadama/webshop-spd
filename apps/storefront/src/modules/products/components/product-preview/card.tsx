import Image from "next/image"
import { ArrowRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  getCategoryPresentation,
  getProductImage,
  getProductLabel,
} from "@lib/util/catalog-presentation"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

export default function ProductCard({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const image = getProductImage(product),
    category = product.categories?.[0]
  const prices =
    product.variants
      ?.map((v) => v.calculated_price?.calculated_amount)
      .filter((v) => v != null) ?? []
  const range = new Set(prices).size > 1
  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="spd-product-card"
      data-testid="product-wrapper"
    >
      <div className="spd-product-card-image">
        {image ? (
          <Image
            src={image}
            alt={getProductLabel(product.title)}
            fill
            sizes="(max-width:767px) 44vw, (max-width:1023px) 40vw, 300px"
            className="object-contain"
          />
        ) : (
          <div className="spd-image-placeholder">
            <PlaceholderImage size={32} />
            <span>Productfoto volgt</span>
          </div>
        )}
      </div>
      <div className="spd-product-card-body">
        {category && (
          <p className="spd-product-category">
            {getCategoryPresentation(category).label}
          </p>
        )}
        <h3 data-testid="product-title">{getProductLabel(product.title)}</h3>
        <div className="spd-product-card-bottom">
          <div>
            {cheapestPrice ? (
              <>
                <span className="spd-card-price" data-testid="price">
                  {range && <small>Vanaf </small>}
                  {cheapestPrice.calculated_price}
                </span>
                <span className="spd-card-detail">
                  Bekijk uitvoering en details
                </span>
              </>
            ) : (
              <span className="spd-card-detail">Bekijk product en prijs</span>
            )}
          </div>
          <span className="spd-card-arrow">
            <ArrowRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
