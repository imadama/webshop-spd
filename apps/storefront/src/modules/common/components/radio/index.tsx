export default function Radio({
  checked,
  "data-testid": testId,
}: {
  checked: boolean
  "data-testid"?: string
}) {
  return (
    <span
      className="spd-radio-mark"
      aria-hidden="true"
      data-state={checked ? "checked" : "unchecked"}
      data-testid={testId || "radio-button"}
    >
      {checked && <span />}
    </span>
  )
}
