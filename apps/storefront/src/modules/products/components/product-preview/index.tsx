import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group bg-white rounded-xl overflow-hidden border border-spd-cream-dark hover:border-spd-green hover:shadow-md transition-all duration-200"
      data-testid="product-wrapper"
    >
      <div className="aspect-square w-full bg-spd-cream overflow-hidden">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="square"
          isFeatured={isFeatured}
          className="!rounded-none !shadow-none"
        />
      </div>
      <div className="p-4">
        <h3
          className="text-sm font-semibold text-grey-80 line-clamp-2 mb-2 group-hover:text-spd-green transition-colors"
          data-testid="product-title"
        >
          {product.title}
        </h3>
        {cheapestPrice && (
          <div className="text-spd-green font-bold text-base" data-testid="price">
            {cheapestPrice.calculated_price}
          </div>
        )}
        <div className="mt-3">
          <span className="inline-block bg-spd-green text-white text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-spd-green-dark transition-colors">
            Bekijk product
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
