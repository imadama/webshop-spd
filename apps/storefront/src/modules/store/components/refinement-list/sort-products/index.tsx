"use client"
export type SortOptions = "price_asc" | "price_desc" | "created_at"
export default function SortProducts({
  sortBy,
  setQueryParams,
  "data-testid": testId,
}: {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}) {
  return (
    <label className="spd-sort">
      <span>Sorteer op</span>
      <select
        value={sortBy}
        onChange={(event) =>
          setQueryParams("sortBy", event.target.value as SortOptions)
        }
        data-testid={testId || "sort-products"}
      >
        <option value="created_at">Nieuwste producten</option>
        <option value="price_asc">Prijs: laag naar hoog</option>
        <option value="price_desc">Prijs: hoog naar laag</option>
      </select>
    </label>
  )
}
