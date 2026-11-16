import React from 'react'
import type { CartItemData, CoffeeProduct } from '../types'
import { formatRupiah } from '../utils/format'
import Button from './Button'

export interface CartItemProps {
  item: CartItemData
  product: CoffeeProduct
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

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
            className="cart-quantity-button px-2 py-0 fw-bold coffee-tap-target"
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
            className="cart-quantity-button px-2 py-0 fw-bold coffee-tap-target"
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
          className="coffee-tap-target px-2 py-1"
        >
          Hapus
        </Button>
      </div>
    </li>
  )
}

export default CartItem
