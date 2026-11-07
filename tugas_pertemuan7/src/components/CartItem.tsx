import React from 'react'
import type { CartItemData } from '../types'
import Button from './Button'

// Props menerima data satu item keranjang serta handler untuk ubah kuantitas dan hapus item
export interface CartItemProps {
  item: CartItemData
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

// Komponen baris item dalam keranjang; stateless dan dikontrol melalui callback parent
export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const itemTotal = item.product.harga * item.quantity

  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(itemTotal)

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(item.product.harga)

  return (
    <li className="list-group-item p-3 border-0 border-bottom border-light-subtle d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
      <div className="flex-grow-1">
        <h4 className="h6 fw-bold mb-0" style={{ color: 'var(--coffee-espresso)' }}>
          {item.product.nama}
        </h4>
        <div className="small coffee-text-muted">
          {formattedPrice} x {item.quantity} • <span className="badge badge-coffee-category">{item.product.kategori}</span>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto gap-3">
        {/* Tombol Pengatur Jumlah */}
        <div className="d-flex align-items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.product.id, -1)}
            ariaLabel={`Kurangi jumlah ${item.product.nama}`}
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
            onClick={() => onUpdateQuantity(item.product.id, 1)}
            disabled={item.product.stok <= 0}
            ariaLabel={`Tambah jumlah ${item.product.nama}`}
            className="px-2 py-0 fw-bold"
            style={{ width: '32px', height: '32px' }}
          >
            +
          </Button>
        </div>

        {/* Subtotal */}
        <div className="fw-bold text-end" style={{ color: 'var(--coffee-accent)', minWidth: '90px' }}>
          {formattedSubtotal}
        </div>

        {/* Tombol Hapus */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(item.product.id)}
          ariaLabel={`Hapus ${item.product.nama} dari keranjang`}
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

