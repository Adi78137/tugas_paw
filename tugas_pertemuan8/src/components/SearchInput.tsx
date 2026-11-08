export interface SearchInputProps {
  id?: string
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({
  id = 'gadget-search-input',
  label = 'Cari Gadget',
  value,
  onChange,
  placeholder = 'Cari berdasarkan nama, brand, atau tag...',
}: SearchInputProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label}
      </label>
      <input
        id={id}
        type="search"
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

