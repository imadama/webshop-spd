"use client"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { StateType } from "@lib/hooks/use-toggle-state"
export default function CountrySelect({
  regions,
}: {
  regions: HttpTypes.StoreRegion[]
  toggleState: StateType
}) {
  const { countryCode } = useParams<{ countryCode: string }>()
  const pathname = usePathname().slice(countryCode.length + 1)
  const names = new Intl.DisplayNames(["nl"], { type: "region" })
  const countries = regions
    .flatMap((region) => region.countries || [])
    .filter((country) => country.iso_2)
  return (
    <label className="spd-country-field">
      <span>Bezorgen in</span>
      <select
        aria-label="Land voor bezorging"
        value={countryCode}
        onChange={(event) => updateRegion(event.target.value, pathname)}
      >
        {countries.map((country) => (
          <option key={country.iso_2} value={country.iso_2!}>
            {names.of(country.iso_2!.toUpperCase()) || country.display_name}
          </option>
        ))}
      </select>
    </label>
  )
}
