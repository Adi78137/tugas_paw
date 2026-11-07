import React from 'react'
import type { CoffeeProduct } from '../types'
import ProductCard from './ProductCard'

// Props menerima daftar produk, array id favorit, serta callback penanganan keranjang, favorit, dan hapus
export interface ProductGridProps {
  products: CoffeeProduct[]
  favorites: string[]
  onAddToCart: (product: CoffeeProduct) => void
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  hasActiveSearchOrFilter: boolean
}

// Komponen grid yang merender kartu-kartu produk kopi menggunakan map dan key
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  favorites,
  onAddToCart,
  onToggleFavorite,
  onDelete,
  hasActiveSearchOrFilter,
}) => {
  // Conditional rendering untuk tampilan kosong
  if (products.length === 0) {
    return (
      <div className="card coffee-card text-center p-5 my-4">
        <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--coffee-espresso)' }}>
          {hasActiveSearchOrFilter ? 'Produk Kopi Tidak Ditemukan' : 'Belum Ada Produk'}
        </h3>
        <p className="coffee-text-secondary small mb-0" style={{ maxWidth: '440px', margin: '0 auto' }}>
          {hasActiveSearchOrFilter
            ? 'Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih. Silakan atur ulang kata kunci atau kategori.'
            : 'Belum ada produk di dalam katalog kopi. Silakan tambahkan produk baru melalui formulir.'}
        </p>
      </div>
    )
  }

  return (
    <div className="row g-3 g-md-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-lg-4">
          <ProductCard
            product={product}
            isFavorite={favorites.includes(product.id)}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid

