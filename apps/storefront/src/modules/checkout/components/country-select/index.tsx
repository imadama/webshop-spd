import { forwardRef, useId, useImperativeHandle, useMemo, useRef } from "react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { HttpTypes } from "@medusajs/types"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = "Land", region, defaultValue, ...props }, ref) => {
  const uniqueId = useId()
  const id = props.id || uniqueId
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current,
  )

  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.iso_2
        ? new Intl.DisplayNames(["nl"], { type: "region" }).of(
            country.iso_2.toUpperCase(),
          )
        : country.display_name,
    }))
  }, [region])

  return (
    <div className="spd-field">
      <label htmlFor={id}>
        {placeholder}
        {props.required && <span aria-hidden="true"> *</span>}
      </label>
      <NativeSelect
        ref={innerRef}
        placeholder="Kies een land"
        defaultValue={defaultValue}
        {...props}
        id={id}
        aria-label={props["aria-label"] || placeholder}
      >
        {countryOptions?.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </div>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
