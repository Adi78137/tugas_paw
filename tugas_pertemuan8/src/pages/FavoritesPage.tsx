import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGadgets } from '../hooks/useGadgets'
import { useFavorites } from '../hooks/useFavorites'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { EmptyState } from '../components/EmptyState'
import { ProductCard } from '../components/ProductCard'

export function FavoritesPage() {
  useDocumentTitle('Favorit Saya')
  const navigate = useNavigate()
  const { data: gadgets, loading, error, refetch } = useGadgets()
  const { favoriteIds, isFavorite, toggleFavorite, clearFavorites } =
    useFavorites()

  const [showConfirm, setShowConfirm] = useState(false)

  const favoriteProducts = (gadgets ?? []).filter((g) =>
    favoriteIds.includes(g.id),
  )

  const handleClearAll = () => {
    clearFavorites()
    setShowConfirm(false)
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Favorit Saya</h1>
          <p className="text-muted small mb-0">
            {favoriteIds.length} produk tersimpan
          </p>
        </div>
        {favoriteIds.length > 0 && !showConfirm && (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => setShowConfirm(true)}
          >
            Hapus Semua
          </button>
        )}
      </div>

      {showConfirm && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between gap-3 mb-4">
          <span className="small">
            Yakin ingin menghapus semua{' '}
            <strong>{favoriteIds.length} produk</strong> dari daftar favorit?
          </span>
          <div className="d-flex gap-2 flex-shrink-0">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleClearAll}
            >
              Ya, Hapus Semua
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowConfirm(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat daftar favorit..." />}

      {error && (
        <ErrorMessage
          message={`Gagal memuat data produk: ${error.message}`}
          onRetry={refetch}
        />
      )}

      {!loading && !error && favoriteProducts.length === 0 && (
        <EmptyState
          title="Belum ada produk favorit"
          description="Tambahkan gadget ke favorit dari halaman katalog atau detail produk."
          actionLabel="Jelajahi Katalog"
          onAction={() => navigate('/katalog')}
        />
          
      )}

      {!loading && !error && favoriteProducts.length > 0 && (
        <div className="row g-4">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

