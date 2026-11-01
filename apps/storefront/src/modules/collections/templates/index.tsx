import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import CatalogLayout from "@modules/store/templates/catalog-layout"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = Math.max(1, Number.parseInt(page || "1") || 1)
  const sort = sortBy || "created_at"
  return (
    <CatalogLayout
      title={collection.title}
      description="Ontdek de producten in deze collectie."
      sortBy={sort}
    >
      <Suspense
        key={`${collection.id}-${sort}-${pageNumber}`}
        fallback={<SkeletonProductGrid />}
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          collectionId={collection.id}
          countryCode={countryCode}
        />
      </Suspense>
    </CatalogLayout>
  )
}
