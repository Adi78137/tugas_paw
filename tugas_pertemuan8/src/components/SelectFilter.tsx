export interface SelectOption {
  value: string
  label: string
}

export interface SelectFilterProps {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly SelectOption[] | SelectOption[]
}

export function SelectFilter({
  id = 'gadget-select-filter',
  label,
  value,
  onChange,
  options,
}: SelectFilterProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label}
      </label>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

