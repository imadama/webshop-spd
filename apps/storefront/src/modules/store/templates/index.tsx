import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"
import CatalogLayout from "./catalog-layout"

export default function StoreTemplate({
  sortBy,
  page,
  q,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  q?: string
  countryCode: string
}) {
  const pageNumber = Math.max(1, Number.parseInt(page || "1") || 1)
  const sort = sortBy || "created_at"
  const query = q?.trim() || undefined
  return (
    <CatalogLayout
      title={query ? `Zoekresultaten voor “${query}”` : "Alle producten"}
      description={
        query
          ? "Bekijk de producten die passen bij je zoekopdracht."
          : "Laadkabels, mobiele laders, laadpunten en energie voor thuis. Ontdek het assortiment en vergelijk de mogelijkheden."
      }
      sortBy={sort}
      titleTestId="store-page-title"
    >
      <Suspense
        key={`${query ?? ""}-${sort}-${pageNumber}`}
        fallback={<SkeletonProductGrid />}
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          q={query}
          countryCode={countryCode}
        />
      </Suspense>
    </CatalogLayout>
  )
}
