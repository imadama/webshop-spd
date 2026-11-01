"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
export function Pagination({
  page,
  totalPages,
  "data-testid": testId,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const pathname = usePathname(),
    searchParams = useSearchParams()
  const href = (number: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(number))
    return `${pathname}?${params}`
  }
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (number) =>
      number === 1 || number === totalPages || Math.abs(number - page) <= 2,
  )
  return (
    <nav
      className="spd-pagination"
      aria-label="Productpagina’s"
      data-testid={testId}
    >
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev">
          Vorige
        </Link>
      )}
      {pages.map((number, index) => (
        <span key={number} className="spd-pagination-entry">
          {index > 0 && number - pages[index - 1] > 1 && (
            <span aria-hidden="true">…</span>
          )}
          {number === page ? (
            <span aria-current="page" aria-label={`Pagina ${number}`}>
              {number}
            </span>
          ) : (
            <Link href={href(number)} aria-label={`Pagina ${number}`}>
              {number}
            </Link>
          )}
        </span>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} rel="next">
          Volgende
        </Link>
      )}
    </nav>
  )
}
