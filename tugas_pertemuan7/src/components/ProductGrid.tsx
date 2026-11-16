import React from 'react'
import type { CoffeeProduct } from '../types'
import ProductCard from './ProductCard'

export interface ProductGridProps {
  products: CoffeeProduct[]
  favorites: string[]
  onAddToCart: (product: CoffeeProduct) => void
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  hasActiveSearchOrFilter: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  favorites,
  onAddToCart,
  onToggleFavorite,
  onDelete,
  hasActiveSearchOrFilter,
}) => {
  if (products.length === 0) {
    return (
      <div className="card coffee-card text-center p-5 my-4">
        <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--coffee-espresso)' }}>
          {hasActiveSearchOrFilter ? 'Belum ketemu kopinya' : 'Katalog masih kosong'}
        </h3>
        <p className="coffee-text-secondary small mb-0" style={{ maxWidth: '440px', margin: '0 auto' }}>
          {hasActiveSearchOrFilter
            ? 'Coba kata kunci lain atau pilih kategori yang berbeda.'
            : 'Tambahkan kopi atau perlengkapan seduh lewat formulir di atas.'}
        </p>
      </div>
    )
  }

  return (
    <div className="row g-3 g-md-4 align-items-start">
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

