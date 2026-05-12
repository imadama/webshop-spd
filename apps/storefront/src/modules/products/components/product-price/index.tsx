import { clx } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="h-10 bg-spd-cream-dark animate-pulse rounded-lg" />
  }

  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="flex items-baseline gap-3">
        {!variant && (
          <span className="text-sm text-grey-50">Vanaf</span>
        )}
        <span
          className={clx("text-3xl font-bold", {
            "text-red-600": selectedPrice.price_type === "sale",
            "text-spd-green": selectedPrice.price_type !== "sale",
          })}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
        {selectedPrice.price_type === "sale" && (
          <span
            className="text-lg text-grey-40 line-through"
            data-testid="original-product-price"
          >
            {selectedPrice.original_price}
          </span>
        )}
      </div>
      {selectedPrice.price_type === "sale" && (
        <span className="inline-flex items-center bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full w-fit">
          -{selectedPrice.percentage_diff}% korting
        </span>
      )}
      <p className="text-xs text-grey-50 mt-1">Inclusief BTW · Gratis verzending</p>
    </div>
  )
}
