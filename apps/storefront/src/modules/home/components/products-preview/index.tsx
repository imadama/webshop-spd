import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"
import Thumbnail from "@modules/products/components/thumbnail"

export default async function ProductsPreview({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 4,
      fields: "*variants.calculated_price",
    },
  })

  if (!products?.length) return null

  return (
    <section className="content-container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-artico text-2xl small:text-3xl text-spd-green uppercase tracking-wide">
          Populaire producten
        </h2>
        <LocalizedClientLink
          href="/store"
          className="text-spd-green text-sm font-semibold hover:text-spd-green-dark transition-colors flex items-center gap-1"
        >
          Meer bekijken
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 small:gap-6">
        {products.map((product) => {
          const { cheapestPrice } = getProductPrice({ product })
          return (
            <LocalizedClientLink
              key={product.id}
              href={`/products/${product.handle}`}
              className="group bg-white rounded-xl overflow-hidden border border-spd-cream-dark hover:border-spd-green hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-square w-full bg-spd-cream overflow-hidden">
                <Thumbnail
                  thumbnail={product.thumbnail}
                  images={product.images}
                  size="square"
                  className="!rounded-none !shadow-none"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-grey-80 line-clamp-2 mb-2 group-hover:text-spd-green transition-colors">
                  {product.title}
                </h3>
                {cheapestPrice && (
                  <div className="text-spd-green font-bold text-base">
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
        })}
      </div>
    </section>
  )
}
