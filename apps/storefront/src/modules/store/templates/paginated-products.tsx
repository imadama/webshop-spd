import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  q,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  q?: string
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (q) {
    queryParams["q"] = q
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  if (!products.length) {
    return (
      <div
        className="flex flex-col items-start gap-y-3 py-12"
        data-testid="no-products-message"
      >
        <p className="text-base-semi">
          {q
            ? `Geen producten gevonden voor “${q}”.`
            : "Er staan hier nog geen producten."}
        </p>
        {q && (
          <>
            <p className="text-base-regular text-ui-fg-subtle">
              Probeer een andere zoekterm, bijvoorbeeld het type kabel of het
              vermogen dat je zoekt.
            </p>
            <LocalizedClientLink
              href="/store"
              className="text-base-regular underline hover:text-spd-green transition-colors"
            >
              Bekijk alle producten
            </LocalizedClientLink>
          </>
        )}
      </div>
    )
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      {q && (
        <p
          className="mb-6 text-base-regular text-ui-fg-subtle"
          data-testid="search-result-count"
        >
          {count === 1 ? "1 product gevonden" : `${count} producten gevonden`}
        </p>
      )}
      <ul className="spd-catalog-product-grid" data-testid="products-list">
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
