import { Link } from 'react-router-dom'
import { useGadgets } from '../hooks/useGadgets'
import { useFavorites } from '../hooks/useFavorites'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { EmptyState } from '../components/EmptyState'
import { ProductCard } from '../components/ProductCard'
import '../components/Catalog.css'

export function HomePage() {
  useDocumentTitle('Beranda')
  const { data: gadgets, loading, error, refetch } = useGadgets()
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const topGadgets = gadgets
    ? [...gadgets].sort((a, b) => b.rating - a.rating).slice(0, 4)
    : []
  const categoryCount = gadgets
    ? new Set(gadgets.map((gadget) => gadget.category)).size
    : 0

  return (
    <div className="container kg-home">
      <section className="kg-home-hero">
        <div>
          <h1>Katalog gadget dengan harga rupiah.</h1>
          <p>
            Jelajahi koleksi smartphone, laptop, tablet, dan aksesoris pilihan
            lengkap dengan estimasi harga rupiah, spesifikasi, dan ulasan
            pembeli.
          </p>
          <div className="kg-home-actions">
            <Link to="/katalog" className="btn btn-primary">
              Buka katalog
            </Link>
            <Link to="/favorit" className="btn btn-outline-secondary">
              Lihat favorit
            </Link>
          </div>
        </div>

        {!error && (
          <dl className="kg-home-stats" aria-label="Ringkasan katalog">
            <div>
              <dt>Produk</dt>
              <dd>{loading ? '...' : (gadgets?.length ?? 0)}</dd>
            </div>
            <div>
              <dt>Kategori</dt>
              <dd>{loading ? '...' : categoryCount}</dd>
            </div>
            <div>
              <dt>Favorit</dt>
              <dd>{favoriteIds.length}</dd>
            </div>
          </dl>
        )}
      </section>

      <section aria-labelledby="produk-unggulan">
        <div className="kg-section-head">
          <h2 id="produk-unggulan">Rating tertinggi</h2>
          <Link to="/katalog">Lihat semua produk</Link>
        </div>

        {loading && <LoadingSpinner text="Memuat produk unggulan..." />}

        {error && (
          <ErrorMessage
            message={`Gagal memuat produk unggulan: ${error.message}`}
            onRetry={refetch}
          />
        )}

        {!loading && !error && topGadgets.length === 0 && (
          <EmptyState
            title="Belum ada produk"
            description="API tidak mengembalikan produk. Muat ulang halaman untuk mencoba lagi."
          />
        )}

        {!loading && !error && topGadgets.length > 0 && (
          <div className="kg-product-grid">
            {topGadgets.map((gadget) => (
              <ProductCard
                key={gadget.id}
                product={gadget}
                isFavorite={isFavorite(gadget.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
