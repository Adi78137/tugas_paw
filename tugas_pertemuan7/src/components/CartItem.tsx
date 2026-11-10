import React from 'react'
import type { CartItemData, CoffeeProduct } from '../types'
import { formatRupiah } from '../utils/format'
import Button from './Button'

// Props menerima satu item keranjang, data produk asli, dan handler ubah kuantitas / hapus
export interface CartItemProps {
  item: CartItemData
  product: CoffeeProduct
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

// Stateless; dikontrol melalui callback parent
export const CartItem: React.FC<CartItemProps> = ({ item, product, onUpdateQuantity, onRemove }) => {
  const itemTotal = product.harga * item.quantity

  return (
    <li className="list-group-item p-3 border-0 border-bottom border-light-subtle d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
      <div className="flex-grow-1 min-width-0">
        <h4 className="h6 fw-bold mb-0" style={{ color: 'var(--coffee-espresso)' }}>
          {product.nama}
        </h4>
        <div className="small coffee-text-muted">
          {formatRupiah(product.harga)} x {item.quantity} • <span className="badge badge-coffee-category">{product.kategori}</span>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto gap-3">
        <div className="d-flex align-items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.productId, -1)}
            ariaLabel={`Kurangi jumlah ${product.nama}`}
            className="px-2 py-0 fw-bold"
            style={{ width: '32px', height: '32px' }}
          >
            -
          </Button>

          <span className="fw-semibold px-2 text-center" style={{ minWidth: '28px' }}>
            {item.quantity}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.productId, 1)}
            disabled={product.stok <= 0}
            ariaLabel={`Tambah jumlah ${product.nama}`}
            className="px-2 py-0 fw-bold"
            style={{ width: '32px', height: '32px' }}
          >
            +
          </Button>
        </div>

        <div className="fw-bold text-end" style={{ color: 'var(--coffee-accent)', minWidth: '90px' }}>
          {formatRupiah(itemTotal)}
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(item.productId)}
          ariaLabel={`Hapus ${product.nama} dari keranjang`}
          className="px-2 py-1"
          style={{ minHeight: '32px' }}
        >
          Hapus
        </Button>
      </div>
    </li>
  )
}

export default CartItem
