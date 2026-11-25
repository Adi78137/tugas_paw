import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useGadget } from '../hooks/useGadget'
import { useNotes } from '../hooks/useNotes'
import { useFavorites } from '../hooks/useFavorites'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NoteForm } from '../components/NoteForm'
import { NoteList } from '../components/NoteList'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { RatingBadge } from '../components/RatingBadge'
import { HeartIcon } from '../components/Icons'
import { formatHarga } from '../utils/format'
import { localizeDescription } from '../utils/descriptions'
import { CATEGORY_LABELS, type GadgetCategory } from '../utils/constants'
import {
  localizeWarranty,
  localizeShipping,
  localizeReturn,
  localizeAvailability,
  localizeTag,
  localizeReviewComment,
} from '../utils/localize'
import '../components/Catalog.css'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { data: product, loading, error, refetch } = useGadget(id)
  const { notes, addNote, deleteNote } = useNotes(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  useDocumentTitle(product?.title ?? 'Detail Produk')

  const [activeImage, setActiveImage] = useState(0)
  const [copyNotice, setCopyNotice] = useState('')
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  async function salinTautan() {
    let berhasil = false
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        berhasil = true
      } catch {
        berhasil = false
      }
    }

    if (!berhasil) {
      const field = document.createElement('textarea')
      field.value = window.location.href
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      berhasil = document.execCommand('copy')
      field.remove()
    }

    setCopyNotice(
      berhasil
        ? 'Tautan produk tersalin.'
        : 'Tautan gagal disalin. Salin dari bilah alamat.',
    )
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopyNotice(''), 2500)
  }

  const state = location.state as
    | { fromSearch?: string; search?: string; from?: string }
    | string
    | null
  let fromSearch = ''
  if (typeof state === 'string') {
    fromSearch = state
  } else if (state && typeof state === 'object') {
    fromSearch = state.fromSearch || state.search || state.from || ''
  }
  const backUrl = fromSearch
    ? `/katalog${fromSearch.startsWith('?') ? fromSearch : `?${fromSearch}`}`
    : '/katalog'

  if (loading) {
    return (
      <div className="container py-5">
        <LoadingSpinner text="Memuat informasi lengkap dan ulasan gadget..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <ErrorMessage
          message={`Gagal memuat detail gadget: ${error.message}. Periksa sambungan internet Anda dan coba lagi.`}
          onRetry={refetch}
        />
        <div className="mt-3 text-center">
          <Link to={backUrl} className="kg-back-btn">
            Kembali ke katalog
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h4 fw-bold mb-3">Produk Tidak Ditemukan</h1>
        <p className="text-muted mb-4">
          Gadget yang Anda tuju tidak tersedia dalam katalog DummyJSON atau telah dihapus.
        </p>
        <Link to={backUrl} className="btn btn-primary">
          Kembali ke katalog
        </Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const numericId = product.id
  const favorited = isFavorite(numericId)

  const diskon =
    product.discountPercentage && product.discountPercentage > 0
      ? product.discountPercentage
      : undefined

  const categoryLabel =
    CATEGORY_LABELS[product.category as GadgetCategory] ?? product.category

  const isiSorotan = (nilai: string) => nilai || 'Tidak tersedia'
  const ukuran = product.dimensions
    ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} mm`
    : ''
  const dimensiBerat = [ukuran, product.weight ? `${product.weight} g` : '']
    .filter(Boolean)
    .join(' · ')

  const sorotan = [
    { label: 'Garansi', value: isiSorotan(localizeWarranty(product.warrantyInformation)) },
    { label: 'Pengiriman', value: isiSorotan(localizeShipping(product.shippingInformation)) },
    { label: 'Kebijakan Retur', value: isiSorotan(localizeReturn(product.returnPolicy)) },
    { label: 'Dimensi / Berat', value: isiSorotan(dimensiBerat) },
  ]

  return (
    <div>
      <div className="kg-detail-band">
        <div className="container">
          <div className="kg-detail-band-top">
            <Link to={backUrl} className="kg-back-btn kg-back-btn--light">
              Kembali ke katalog
            </Link>

            <nav aria-label="Breadcrumb">
              <ol className="kg-breadcrumb">
                <li>
                  <Link to="/">Beranda</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={backUrl}>Katalog</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="kg-breadcrumb-current">
                  {product.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4 g-lg-5 mb-4">
          <div className="col-12 col-md-6">
            <div className="kg-detail-image-main">
              <img
                src={images[activeImage] ?? product.thumbnail}
                alt={`${product.title} - gambar ${activeImage + 1}`}
                width={600}
                height={600}
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).src = product.thumbnail
                }}
              />
            </div>

            {images.length > 1 && (
              <div
                className="kg-detail-thumbnails"
                role="group"
                aria-label="Pilihan gambar produk"
              >
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`kg-detail-thumb-btn${activeImage === idx ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`Lihat gambar ${idx + 1}`}
                    aria-pressed={activeImage === idx}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      width={56}
                      height={56}
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src =
                          product.thumbnail
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 col-md-6">
            <div className="kg-detail-meta">
              {product.brand && (
                <>
                  <span className="kg-meta-brand">{product.brand}</span>
                  <span className="kg-meta-dot" aria-hidden="true">•</span>
                </>
              )}
              <span>{categoryLabel}</span>
              <span className="kg-meta-dot" aria-hidden="true">•</span>
              <RatingBadge rating={product.rating} />
            </div>

            <h1 className="kg-detail-title">{product.title}</h1>
            <p className="kg-detail-description">
              {localizeDescription(product.id)}
            </p>

            <div className="kg-detail-price-box">
              <p className="kg-detail-price-label">Estimasi harga</p>
              <div className="d-flex align-items-baseline gap-2 flex-wrap mb-1">
                {diskon ? (
                  <>
                    <span className="kg-detail-price tabular-nums">
                      {formatHarga(product.price, diskon)}
                    </span>
                    <span className="kg-detail-original-price tabular-nums">
                      {formatHarga(product.price)}
                    </span>
                    <span className="kg-status-badge is-lime">
                      -{Math.round(diskon)}%
                    </span>
                  </>
                ) : (
                  <span className="kg-detail-price tabular-nums">
                    {formatHarga(product.price)}
                  </span>
                )}
              </div>

              <div className="kg-detail-stock">
                {product.stock === 0 ? (
                  <span className="text-muted">
                    {localizeAvailability('Out of Stock')}
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="text-danger fw-semibold">
                    Stok {product.stock} unit (
                    {localizeAvailability(
                      product.availabilityStatus || 'Low Stock',
                    )}
                    )
                  </span>
                ) : (
                  <span className="text-muted">
                    Stok {product.stock} unit (
                    {localizeAvailability(
                      product.availabilityStatus || 'In Stock',
                    )}
                    )
                  </span>
                )}
              </div>
            </div>

            <section className="kg-highlights" aria-labelledby="spesifikasi-utama">
              <h2 id="spesifikasi-utama" className="kg-section-label">
                Spesifikasi Utama
              </h2>
              <div className="kg-highlight-grid">
                {sorotan.map((item) => (
                  <div key={item.label} className="kg-highlight-card">
                    <p className="kg-highlight-label">{item.label}</p>
                    <p className="kg-highlight-value">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="kg-detail-actions">
              <button
                type="button"
                className={favorited ? 'kg-btn-fav-outline' : 'kg-btn-primary'}
                onClick={() => toggleFavorite(numericId)}
                aria-pressed={favorited}
              >
                <HeartIcon filled={favorited} size={20} />
                {favorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              </button>
              <button
                type="button"
                className="kg-btn-secondary"
                onClick={salinTautan}
              >
                Salin Link Produk
              </button>
            </div>
            <p className="kg-copy-notice" aria-live="polite">
              {copyNotice}
            </p>
          </div>
        </div>

        <section className="kg-full-specs" aria-labelledby="spesifikasi-lengkap">
          <h2 id="spesifikasi-lengkap" className="kg-section-label">
            Spesifikasi Lengkap
          </h2>
          <dl className="kg-specs-list">
            {product.sku && (
              <div className="kg-spec-item">
                <dt className="kg-spec-label">SKU</dt>
                <dd className="kg-spec-value">{product.sku}</dd>
              </div>
            )}
            <div className="kg-spec-item">
              <dt className="kg-spec-label">Stok</dt>
              <dd className="kg-spec-value">{product.stock} unit</dd>
            </div>
            {product.minimumOrderQuantity && (
              <div className="kg-spec-item">
                <dt className="kg-spec-label">Min. Pemesanan</dt>
                <dd className="kg-spec-value">
                  {product.minimumOrderQuantity} unit
                </dd>
              </div>
            )}
            {product.weight && (
              <div className="kg-spec-item">
                <dt className="kg-spec-label">Berat</dt>
                <dd className="kg-spec-value">{product.weight} g</dd>
              </div>
            )}
            {product.dimensions && (
              <div className="kg-spec-item">
                <dt className="kg-spec-label">Dimensi</dt>
                <dd className="kg-spec-value">{ukuran}</dd>
              </div>
            )}
            {product.tags && product.tags.length > 0 && (
              <div className="kg-spec-item">
                <dt className="kg-spec-label">Tag</dt>
                <dd className="kg-spec-value kg-spec-tags">
                  {product.tags.map(localizeTag).filter(Boolean).join(', ')}
                </dd>
              </div>
            )}
          </dl>
        </section>

        <div className="kg-detail-bottom-grid">
          {product.reviews && product.reviews.length > 0 && (
            <section aria-label="Ulasan pembeli">
              <h2 className="h5 fw-bold mb-3">
                Ulasan Pembeli ({product.reviews.length})
              </h2>
              <div className="kg-review-list">
                {product.reviews.map((review, idx) => (
                  <article key={idx} className="kg-review-card">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong className="kg-review-name">
                        {review.reviewerName}
                      </strong>
                      <RatingBadge rating={review.rating} />
                    </div>
                    <p className="kg-review-comment">
                      {localizeReviewComment(review.comment)}
                    </p>
                    <time className="kg-review-date" dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString('id-ID', {
                        dateStyle: 'medium',
                      })}
                    </time>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section aria-label="Catatan pribadi">
            <h2 className="h5 fw-bold mb-3">Catatan Pribadi</h2>
            <NoteForm onAddNote={addNote} />
            <NoteList notes={notes} onDeleteNote={deleteNote} />
          </section>
        </div>
      </div>
    </div>
  )
}
