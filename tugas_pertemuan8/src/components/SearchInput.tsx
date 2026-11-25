import { SearchIcon } from './Icons'

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
  placeholder = 'Cari berdasarkan nama, merek, atau tag...',
}: SearchInputProps) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="form-label mb-1"
        style={{
          color: 'var(--c-ink)',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        {label}
      </label>
      <div className="position-relative d-flex align-items-center">
        <span
          className="position-absolute start-0 d-inline-flex align-items-center justify-content-center ps-3 pe-2"
          style={{
            color: 'var(--c-muted)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <SearchIcon size={18} />
        </span>
        <input
          id={id}
          type="search"
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            paddingLeft: '2.5rem',
            minHeight: '44px',
          }}
        />
      </div>
    </div>
  )
}
