import React, { useState } from 'react'
import type { CoffeeProduct } from '../types'
import Button from './Button'

// Props menerima data satu produk kopi, status favorit, dan handler aksi (keranjang, favorit, hapus)
export interface ProductCardProps {
  product: CoffeeProduct
  onAddToCart: (product: CoffeeProduct) => void
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  isFavorite: boolean
}

// Komponen kartu produk kopi; mengelola state lokal showDetail untuk buka/tutup deskripsi
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  onDelete,
  isFavorite,
}) => {
  const [showDetail, setShowDetail] = useState(false)

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.harga)

  // Penentuan kelas gradien warna blok visual berdasarkan tingkat sangrai dan kategori
  const getThumbClass = () => {
    if (product.kategori === 'Alat Seduh') {
      return 'kategori-alat'
    }
    const sangrai = product.tingkatSangrai.toLowerCase()
    if (product.kategori === 'Bubuk') {
      if (sangrai.includes('dark')) return 'bubuk-dark'
      if (sangrai.includes('light')) return 'bubuk-light'
      return 'kategori-bubuk'
    }
    // Biji Kopi
    if (sangrai.includes('light')) return 'roast-light'
    if (sangrai.includes('dark')) return 'roast-dark'
    return 'roast-medium'
  }

  const thumbClass = getThumbClass()
  const isOutOfStock = product.stok <= 0

  return (
    <article className="card coffee-card h-100 d-flex flex-column" aria-labelledby={`product-${product.id}`}>
      {/* Visual Header Pengganti Foto (Murni CSS dengan variasi warna sangrai dan kategori) */}
      <div className={`coffee-visual-thumb ${thumbClass}`}>
        <div className="coffee-pattern-overlay" aria-hidden="true"></div>
        <div className="text-center p-2 position-relative z-1">
          <span className="badge badge-coffee-category px-2 py-1 small text-uppercase">
            {product.kategori}
          </span>
          <div
            className="small mt-1 font-monospace fw-semibold"
            style={{ color: '#fffdfa', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
          >
            {product.tingkatSangrai !== '-' ? `Sangrai: ${product.tingkatSangrai}` : 'Peralatan'}
          </div>
        </div>
      </div>

      <div className="card-body p-3 p-md-4 d-flex flex-column flex-grow-1">
        {/* Asal, Kategori, dan Tombol Favorit yang adaptif di layar 375px */}
        <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
          <div className="d-flex flex-wrap gap-1 align-items-center">
            <span className="badge badge-coffee-origin">{product.asal}</span>
            <span className="badge badge-coffee-category">{product.kategori}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleFavorite(product.id)}
            ariaLabel={isFavorite ? `Hapus ${product.nama} dari favorit` : `Tambahkan ${product.nama} ke favorit`}
            className={`px-2 py-1 text-nowrap ${isFavorite ? 'text-warning fw-bold border-warning' : ''}`}
            style={{ minHeight: '34px' }}
          >
            {isFavorite ? '★ Favorit' : '☆ Favorit'}
          </Button>
        </div>

        <h3
          id={`product-${product.id}`}
          className="h6 fw-bold mb-1"
          style={{
            color: 'var(--coffee-espresso)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            lineHeight: 1.35,
          }}
        >
          {product.nama}
        </h3>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-1">
          <div className="fw-bold fs-6" style={{ color: 'var(--coffee-accent)' }}>
            {formattedPrice}
          </div>
          <div className="small">
            {isOutOfStock ? (
              <span className="badge bg-danger text-white">Stok Habis</span>
            ) : (
              <span className="coffee-text-muted">Stok: <strong>{product.stok}</strong></span>
            )}
          </div>
        </div>

        {/* Conditional Rendering Detail Deskripsi dan Catatan Rasa */}
        {showDetail && (
          <div
            className="p-3 mb-3 rounded-2"
            style={{
              backgroundColor: 'var(--coffee-surface-subtle)',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            <p className="coffee-text-secondary small mb-2">{product.deskripsi}</p>
            {product.catatanRasa && (
              <div className="small font-monospace" style={{ color: 'var(--coffee-accent)' }}>
                <strong>Profil Rasa:</strong> {product.catatanRasa}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-2 border-top border-light-subtle d-flex flex-column gap-2">
          <div className="d-flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetail((prev) => !prev)}
              className="w-50 text-nowrap tm-tap-target px-1"
              ariaLabel={showDetail ? `Tutup detail ${product.nama}` : `Lihat detail ${product.nama}`}
            >
              {showDetail ? 'Tutup detail' : 'Lihat detail'}
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="w-50 text-nowrap tm-tap-target px-1"
              ariaLabel={`Hapus produk ${product.nama}`}
            >
              Hapus
            </Button>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className="w-100 fw-semibold text-nowrap tm-tap-target px-2"
            ariaLabel={`Tambah ${product.nama} ke keranjang`}
          >
            {isOutOfStock ? 'Stok Habis' : '+ Tambah ke Keranjang'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
