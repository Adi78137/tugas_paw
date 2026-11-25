interface ViewToggleProps {
  value: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}

function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true">
      <rect x="2" y="2" width="6" height="6" rx="1" />
      <rect x="12" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="12" width="6" height="6" rx="1" />
      <rect x="12" y="12" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 4h11M7 10h11M7 16h11" strokeLinecap="round" />
      <circle cx="3" cy="4" r="1" fill="currentColor" stroke="none" />
      <circle cx="3" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="3" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="kg-view-toggle" role="group" aria-label="Tampilan produk">
      <button
        type="button"
        className={value === 'grid' ? 'is-active' : ''}
        aria-pressed={value === 'grid'}
        onClick={() => onChange('grid')}
      >
        <GridIcon />
        Grid
      </button>
      <button
        type="button"
        className={value === 'list' ? 'is-active' : ''}
        aria-pressed={value === 'list'}
        onClick={() => onChange('list')}
      >
        <ListIcon />
        List
      </button>
    </div>
  )
}
