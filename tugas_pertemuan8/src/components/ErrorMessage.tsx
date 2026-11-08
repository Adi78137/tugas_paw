export interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className="alert alert-danger d-flex flex-column align-items-start my-3"
      role="alert"
    >
      <div className="mb-2">{message}</div>
      {onRetry && (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onRetry}
        >
          Coba lagi
        </button>
      )}
    </div>
  )
}

