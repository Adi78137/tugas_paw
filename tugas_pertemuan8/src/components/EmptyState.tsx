export interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title = 'Tidak ada produk ditemukan',
  description = 'Coba ubah kata kunci pencarian atau filter kategori Anda.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-5 px-3 border rounded bg-light my-3">
      <h3 className="h5 fw-bold mb-2">{title}</h3>
      {description && <p className="text-muted mb-3">{description}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

