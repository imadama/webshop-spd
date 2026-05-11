import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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
    <section className="bg-white border-t border-spd-cream-dark">
      <div className="content-container py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-artico text-3xl text-spd-green uppercase tracking-wide">
            Uitgelichte producten
          </h2>
          <LocalizedClientLink
            href="/store"
            className="text-spd-green font-semibold text-sm hover:text-spd-green-dark transition-colors border-b border-spd-green hover:border-spd-green-dark"
          >
            Alle producten bekijken →
          </LocalizedClientLink>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-4 gap-6">
          {products.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
