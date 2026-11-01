import { notFound } from "next/navigation"
import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { getCategoryPresentation } from "@lib/util/catalog-presentation"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import CatalogLayout from "@modules/store/templates/catalog-layout"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  if (!category || !countryCode) notFound()
  const pageNumber = Math.max(1, Number.parseInt(page || "1") || 1)
  const sort = sortBy || "created_at"
  const { label, description } = getCategoryPresentation(category)
  return (
    <CatalogLayout
      title={label}
      description={category.description || description}
      currentCategory={category.id}
      sortBy={sort}
      titleTestId="category-page-title"
      links={category.category_children
        ?.filter((c) => c.handle)
        .map((c) => ({
          label: getCategoryPresentation(c).label,
          href: `/categories/${c.handle}`,
        }))}
    >
      <Suspense
        key={`${category.id}-${sort}-${pageNumber}`}
        fallback={<SkeletonProductGrid />}
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          categoryId={category.id}
          countryCode={countryCode}
        />
      </Suspense>
    </CatalogLayout>
  )
}
