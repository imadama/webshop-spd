"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SortProducts, { SortOptions } from "./sort-products"

export default function RefinementList({
  sortBy,
  "data-testid": testId,
}: {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}) {
  const router = useRouter(),
    pathname = usePathname(),
    searchParams = useSearchParams()
  function setQueryParams(name: string, value: string) {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    params.delete("page")
    router.push(`${pathname}?${params}`)
  }
  return (
    <SortProducts
      sortBy={sortBy}
      setQueryParams={setQueryParams}
      data-testid={testId}
    />
  )
}
