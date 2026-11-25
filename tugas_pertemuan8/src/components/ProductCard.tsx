import { Link } from 'react-router-dom'
import { HeartIcon } from './Icons'
import { RatingBadge } from './RatingBadge'
import { CATEGORY_LABELS, type GadgetCategory } from '../utils/constants'
import { formatHarga } from '../utils/format'
import { localizeDescription } from '../utils/descriptions'
import { localizeTag } from '../utils/localize'
import type { Product } from '../types/product'

export interface ProductCardProps {
  product: Product
  isFavorite?: boolean
  onToggleFavorite?: (id: number) => void
  layout?: 'grid' | 'list'
  catalogSearch?: string
}

export function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  layout = 'grid',
  catalogSearch,
}: ProductCardProps) {
  const categoryLabel =
    CATEGORY_LABELS[product.category as GadgetCategory] ?? product.category
  const diskon =
    product.discountPercentage && product.discountPercentage > 0
      ? product.discountPercentage
      : undefined
  const discount = diskon ? Math.round(diskon) : null
  const detailUrl = `/produk/${product.id}`
  const tags = (product.tags ?? []).slice(0, 3).map(localizeTag).filter(Boolean)

  const status =
    product.stock === 0
      ? { label: 'Habis', tone: 'is-muted' }
      : discount
        ? { label: `-${discount}%`, tone: 'is-lime' }
        : product.stock <= 5
          ? { label: 'Stok terbatas', tone: 'is-deep' }
          : null

  return (
    <article className={`kg-product-card kg-product-card--${layout}`}>
      <div className="kg-product-top">
        <span className="kg-product-brand">
          {product.brand || categoryLabel}
        </span>
        {status && (
          <span className={`kg-status-badge ${status.tone}`}>
            {status.label}
          </span>
        )}
        {onToggleFavorite && (
          <button
            type="button"
            className={`kg-favorite-button${isFavorite ? ' is-active' : ''}`}
            onClick={() => onToggleFavorite(product.id)}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            aria-pressed={isFavorite}
          >
            <HeartIcon filled={isFavorite} size={18} />
          </button>
        )}
      </div>

      <Link
        to={detailUrl}
        state={{ fromSearch: catalogSearch }}
        className="kg-product-image"
        aria-label={`Lihat detail ${product.title}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          loading="lazy"
        />
      </Link>

      <div className="kg-product-details">
        <h2 className="kg-product-title">
          <Link to={detailUrl} state={{ fromSearch: catalogSearch }}>
            {product.title}
          </Link>
        </h2>

        <p className="kg-product-desc">
          {localizeDescription(product.id)}
        </p>

        {tags.length > 0 && (
          <ul className="kg-product-tags" aria-label="Tag produk">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <div className="kg-product-meta">
          <RatingBadge rating={product.rating} />
          <span className="kg-product-category">{categoryLabel}</span>
        </div>

        <div className="kg-product-foot">
          <div className="kg-product-price-group">
            <p className="kg-product-price tabular-nums">
              {formatHarga(product.price, diskon)}
            </p>
            {discount && (
              <s className="kg-product-original tabular-nums">
                {formatHarga(product.price)}
              </s>
            )}
          </div>
          <Link
            to={`/produk/${product.id}`}
            state={{ fromSearch: catalogSearch }}
            className="kg-card-cta"
            aria-label={`Lihat detail ${product.title}`}
          >
            Detail
          </Link>
        </div>
      </div>
    </article>
  )
}
