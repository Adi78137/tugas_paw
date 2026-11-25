export interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title = 'Tidak ada produk yang cocok',
  description = 'Periksa kata kunci pencarian atau sesuaikan filter kategori untuk menemukan produk.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div
      className="text-center py-5 px-3 my-3"
      style={{
        backgroundColor: 'var(--c-surface)',
        border: '1px solid var(--c-line)',
        borderRadius: 'var(--r-md)',
      }}
    >
      <h3
        className="h5 mb-2"
        style={{ color: 'var(--c-ink)', fontWeight: 700 }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="mb-3 mx-auto"
          style={{
            color: 'var(--c-muted)',
            maxWidth: '480px',
            fontSize: '0.95rem',
          }}
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAction}
          style={{ minHeight: '44px' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
