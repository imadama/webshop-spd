import { HttpTypes } from "@medusajs/types"
import ProductCard from "./card"
export default function ProductPreview({
  product,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  return <ProductCard product={product} />
}
