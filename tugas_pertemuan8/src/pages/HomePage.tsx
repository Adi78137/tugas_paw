import { Link } from 'react-router-dom'
import { useGadgets } from '../hooks/useGadgets'
import { useFavorites } from '../hooks/useFavorites'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { ProductCard } from '../components/ProductCard'

export function HomePage() {
  useDocumentTitle('Beranda')
  const { data: gadgets, loading, error, refetch } = useGadgets()
  const { isFavorite, toggleFavorite } = useFavorites()

  const topGadgets = gadgets
    ? [...gadgets].sort((a, b) => b.rating - a.rating).slice(0, 4)
    : []

  return (
    <div>
      <section className="bg-light py-5 border-bottom">
        <div className="container py-4 text-center">
          <h1 className="display-5 fw-bold mb-3">Temukan Gadget Impian Anda</h1>
          <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: '640px' }}>
            Jelajahi koleksi smartphone, laptop, tablet, dan aksesoris gadget
            terbaik dengan spesifikasi lengkap dan harga terjangkau.
          </p>
          <div className="d-flex justify-content-center gap-2">
            <Link to="/katalog" className="btn btn-primary btn-lg px-4">
              Jelajahi Katalog
            </Link>
            <Link to="/favorit" className="btn btn-outline-secondary btn-lg px-4">
              Lihat Favorit
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 className="h4 fw-bold mb-1">Produk Unggulan</h2>
            <p className="text-muted small mb-0">
              Pilihan gadget dengan penilaian rating tertinggi dari pengguna.
            </p>
          </div>
          <Link to="/katalog" className="btn btn-sm btn-outline-primary">
            Lihat Semua &rarr;
          </Link>
        </div>

        {loading && <LoadingSpinner text="Memuat produk unggulan..." />}

        {error && (
          <ErrorMessage
            message={`Gagal memuat produk unggulan: ${error.message}`}
            onRetry={refetch}
          />
        )}

        {!loading && !error && (
          <div className="row g-4">
            {topGadgets.map((gadget) => (
              <div key={gadget.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard
                  product={gadget}
                  isFavorite={isFavorite(gadget.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

