import { Link } from 'react-router-dom'
import { RatingBadge } from './RatingBadge'
import { CATEGORY_LABELS, type GadgetCategory } from '../utils/constants'
import { formatHarga } from '../utils/format'
import type { Product } from '../types/product'

export interface ProductCardProps {
  product: Product
  isFavorite?: boolean
  onToggleFavorite?: (id: number) => void
}

export function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
}: ProductCardProps) {
  const categoryLabel =
    CATEGORY_LABELS[product.category as GadgetCategory] ?? product.category

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative bg-light rounded-top d-flex align-items-center justify-content-center p-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="img-fluid object-fit-contain"
          style={{ maxHeight: '180px' }}
        />
        {onToggleFavorite && (
          <button
            type="button"
            className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm ${
              isFavorite ? 'btn-danger' : 'btn-light text-muted'
            }`}
            onClick={() => onToggleFavorite(product.id)}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            style={{ width: '36px', height: '36px', padding: 0 }}
          >
            <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
          </button>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-2 gap-2">
          <span className="badge bg-secondary-subtle text-secondary small">
            {categoryLabel}
          </span>
          <RatingBadge rating={product.rating} />
        </div>

        {product.brand && (
          <small className="text-muted text-uppercase fw-semibold mb-1">
            {product.brand}
          </small>
        )}

        <h3 className="card-title h6 fw-bold mb-2">
          <Link
            to={`/produk/${product.id}`}
            className="text-decoration-none text-dark"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto pt-2 d-flex align-items-baseline justify-content-between">
          <span className="fs-5 fw-bold text-primary">
            {formatHarga(product.price)}
          </span>
          {product.discountPercentage ? (
            <small className="text-danger">
              -{Math.round(product.discountPercentage)}%
            </small>
          ) : null}
        </div>
      </div>
    </div>
  )
}

