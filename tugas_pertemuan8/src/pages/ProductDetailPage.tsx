import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGadget } from '../hooks/useGadget'
import { useNotes } from '../hooks/useNotes'
import { useFavorites } from '../hooks/useFavorites'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NoteForm } from '../components/NoteForm'
import { NoteList } from '../components/NoteList'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { formatHarga } from '../utils/format'
import { CATEGORY_LABELS, type GadgetCategory } from '../utils/constants'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, loading, error, refetch } = useGadget(id)
  const { notes, addNote, deleteNote } = useNotes(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  useDocumentTitle(product?.title ?? 'Detail Produk')

  const [activeImage, setActiveImage] = useState(0)

  if (loading) {
    return (
      <div className="container py-5">
        <LoadingSpinner text="Memuat detail produk..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <ErrorMessage
          message={`Gagal memuat detail produk: ${error.message}`}
          onRetry={refetch}
        />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2 className="h4 fw-bold mb-3">Produk Tidak Ditemukan</h2>
        <p className="text-muted mb-4">
          Produk yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/katalog" className="btn btn-primary">
          Kembali ke Katalog
        </Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const numericId = product.id
  const favorited = isFavorite(numericId)

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Beranda</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/katalog">Katalog</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-5">
          <img
            src={images[activeImage] ?? product.thumbnail}
            alt={`${product.title} - gambar ${activeImage + 1}`}
            className="img-fluid rounded border w-100"
            style={{ maxHeight: '380px', objectFit: 'contain' }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = product.thumbnail
            }}
          />
          {images.length > 1 && (
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`btn p-0 border rounded${activeImage === idx ? ' border-primary border-2' : ''}`}
                  style={{ width: '56px', height: '56px', overflow: 'hidden' }}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Lihat gambar ${idx + 1}`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
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

        <div className="col-12 col-md-7">
          <span className="badge bg-secondary mb-2">
            {CATEGORY_LABELS[product.category as GadgetCategory] ??
              product.category}
          </span>
          <h1 className="h3 fw-bold mb-1">{product.title}</h1>

          {product.brand && (
            <p className="text-muted small mb-2">Brand: {product.brand}</p>
          )}

          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-warning text-dark">
              ★ {product.rating.toFixed(1)}
            </span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="badge bg-danger">Stok hampir habis</span>
            )}
            {product.stock === 0 && (
              <span className="badge bg-secondary">Stok habis</span>
            )}
          </div>

          <div className="mb-3">
            {discountedPrice ? (
              <>
                <span className="h4 fw-bold text-danger me-2">
                  {formatHarga(discountedPrice)}
                </span>
                <span className="text-muted text-decoration-line-through small">
                  {formatHarga(product.price)}
                </span>
                <span className="badge bg-success ms-2">
                  -{product.discountPercentage?.toFixed(0)}%
                </span>
              </>
            ) : (
              <span className="h4 fw-bold">{formatHarga(product.price)}</span>
            )}
          </div>

          <p className="text-secondary mb-3">{product.description}</p>

          {product.tags && product.tags.length > 0 && (
            <div className="d-flex flex-wrap gap-1 mb-3">
              {product.tags.map((tag) => (
                <span key={tag} className="badge bg-light text-dark border">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <table className="table table-sm table-bordered small mb-3">
            <tbody>
              {product.sku && (
                <tr>
                  <th scope="row" className="w-50">SKU</th>
                  <td>{product.sku}</td>
                </tr>
              )}
              {product.warrantyInformation && (
                <tr>
                  <th scope="row">Garansi</th>
                  <td>{product.warrantyInformation}</td>
                </tr>
              )}
              {product.shippingInformation && (
                <tr>
                  <th scope="row">Pengiriman</th>
                  <td>{product.shippingInformation}</td>
                </tr>
              )}
              {product.returnPolicy && (
                <tr>
                  <th scope="row">Retur</th>
                  <td>{product.returnPolicy}</td>
                </tr>
              )}
              <tr>
                <th scope="row">Stok</th>
                <td>{product.stock} unit</td>
              </tr>
              {product.minimumOrderQuantity && (
                <tr>
                  <th scope="row">Min. Pemesanan</th>
                  <td>{product.minimumOrderQuantity} unit</td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            type="button"
            className={`btn ${favorited ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => toggleFavorite(numericId)}
          >
            {favorited ? '♥ Hapus dari Favorit' : '♡ Tambah ke Favorit'}
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mb-5">
          <h2 className="h5 fw-bold mb-3">Ulasan Pembeli</h2>
          <div className="row g-3">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="col-12 col-md-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-semibold small">
                        {review.reviewerName}
                      </span>
                      <span className="badge bg-warning text-dark">
                        ★ {review.rating}
                      </span>
                    </div>
                    <p className="small text-secondary mb-1">{review.comment}</p>
                    <div
                      className="text-muted"
                      style={{ fontSize: '0.72rem' }}
                    >
                      {new Date(review.date).toLocaleDateString('id-ID', {
                        dateStyle: 'medium',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-5">
        <h2 className="h5 fw-bold mb-3">Catatan Pribadi</h2>
        <NoteForm onAddNote={addNote} />
        <NoteList notes={notes} onDeleteNote={deleteNote} />
      </section>
    </div>
  )
}

