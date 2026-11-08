export interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({
  text = 'Memuat data...',
  size,
}: LoadingSpinnerProps) {
  const spinnerClass =
    size === 'sm' ? 'spinner-border spinner-border-sm' : 'spinner-border'

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center py-5 text-center"
      role="status"
    >
      <div className={`${spinnerClass} text-primary`} aria-hidden="true" />
      {text && <span className="mt-2 text-muted small">{text}</span>}
      <span className="visually-hidden">{text || 'Loading...'}</span>
    </div>
  )
}

