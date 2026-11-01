import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductCard from "../product-preview/card"

export default async function RelatedProducts({
  product,
  countryCode,
}: {
  product: HttpTypes.StoreProduct
  countryCode: string
}) {
  const category = product.categories?.[0]
  if (!category && !product.collection_id) return null
  const { response } = await listProducts({
    countryCode,
    queryParams: {
      limit: 5,
      ...(category
        ? { category_id: [category.id] }
        : { collection_id: [product.collection_id!] }),
    },
  })
  const products = response.products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
  if (!products.length) return null
  return (
    <section>
      <div className="spd-section-heading">
        <div>
          <p className="spd-eyebrow">Vergelijk de mogelijkheden</p>
          <h2>Ook in deze categorie</h2>
        </div>
      </div>
      <div className="spd-product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
