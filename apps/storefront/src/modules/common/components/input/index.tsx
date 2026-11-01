import React, { useId, useState } from "react"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      required,
      topLabel,
      className,
      errors: _errors,
      touched: _touched,
      id,
      ...props
    },
    ref,
  ) => {
    const uniqueId = useId()
    const fieldId = id || uniqueId
    const [showPassword, setShowPassword] = useState(false)
    return (
      <div className="spd-field">
        {topLabel && <span className="spd-field-context">{topLabel}</span>}
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        <div className="spd-field-control">
          <input
            {...props}
            ref={ref}
            id={fieldId}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            required={required}
            className={`spd-input ${type === "password" ? "spd-input-password" : ""} ${className || ""}`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"
              }
              aria-pressed={showPassword}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  },
)
Input.displayName = "Input"
export default Input
