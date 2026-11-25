export interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = 'Gagal memuat data dari DummyJSON. Periksa koneksi, lalu coba lagi.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className="d-flex flex-column align-items-start my-3 p-3"
      role="alert"
      style={{
        backgroundColor: 'var(--c-surface)',
        border: '1px solid #f87171',
        borderRadius: 'var(--r-md)',
        color: 'var(--c-ink)',
      }}
    >
      <p className="mb-2" style={{ color: '#991b1b', fontWeight: 500 }}>
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          className="btn"
          onClick={onRetry}
          style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#991b1b',
            minHeight: '44px',
            padding: '0.4rem 1rem',
          }}
        >
          Coba lagi
        </button>
      )}
    </div>
  )
}
