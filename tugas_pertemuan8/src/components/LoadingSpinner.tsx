export interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({
  text = 'Memuat data...',
  size = 'md',
}: LoadingSpinnerProps) {
  const dimension = size === 'sm' ? 20 : size === 'lg' ? 36 : 28
  const strokeWidth = size === 'sm' ? 3 : 2.5

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center py-5 text-center"
      role="status"
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--c-brand)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="kg-spinner"
        aria-hidden="true"
        style={{
          animation: 'spin 800ms linear infinite',
        }}
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      {text && (
        <span
          className="mt-3 small"
          style={{ color: 'var(--c-muted)', fontWeight: 500 }}
        >
          {text}
        </span>
      )}
      <span className="visually-hidden">{text || 'Memuat...'}</span>
    </div>
  )
}
