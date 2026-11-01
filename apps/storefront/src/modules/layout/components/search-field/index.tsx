"use client"

import { MagnifyingGlass } from "@medusajs/icons"
import { useParams } from "next/navigation"

export default function SearchField({
  className = "",
}: {
  className?: string
}) {
  const { countryCode } = useParams<{ countryCode: string }>()
  return (
    <form
      action={`/${countryCode}/store`}
      method="get"
      className={`spd-search ${className}`}
      role="search"
    >
      <input
        type="search"
        name="q"
        placeholder="Zoek een laadkabel, lader of product…"
        aria-label="Zoek naar producten"
      />
      <button type="submit" aria-label="Zoeken">
        <MagnifyingGlass aria-hidden="true" />
      </button>
    </form>
  )
}
