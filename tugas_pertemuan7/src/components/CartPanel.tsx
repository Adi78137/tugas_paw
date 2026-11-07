import React from 'react'
import type { CartItemData } from '../types'
import Button from './Button'
import CartItem from './CartItem'

// Props menerima data isi keranjang, status visibilitas panel, dan handler aksi keranjang
export interface CartPanelProps {
  cart: CartItemData[]
  isOpen: boolean
  onClose: () => void
  onUpdateQuantity: (productId: string, delta: number) => void
  onRemove: (productId: string) => void
  onClearCart: () => void
}

// Komponen panel keranjang belanja; mendukung tampilan ringkasan dan kendali modal/offcanvas
export const CartPanel: React.FC<CartPanelProps> = ({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClearCart,
}) => {
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.product.harga * item.quantity, 0)

  const formattedTotalPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalPrice)

  if (!isOpen) return null

  return (
    <aside
      id="keranjang"
      className="card coffee-card mb-4 border-2"
      style={{ borderColor: 'var(--coffee-accent)' }}
      aria-labelledby="keranjang-heading"
    >
      <div className="card-header bg-white p-3 p-md-4 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h2 id="keranjang-heading" className="h5 fw-bold mb-0" style={{ color: 'var(--coffee-espresso)' }}>
            Keranjang Belanja
          </h2>
          <span className="coffee-text-secondary small">
            {totalItemCount} item kopi dan alat seduh dipilih
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="tm-tap-target px-3"
          ariaLabel="Tutup panel keranjang belanja"
        >
          ✕ Tutup
        </Button>
      </div>

      <div className="card-body p-0">
        {cart.length === 0 ? (
          <div className="text-center py-5 px-3">
            <h3 className="h6 fw-bold mb-2" style={{ color: 'var(--coffee-espresso)' }}>
              Keranjang Masih Kosong
            </h3>
            <p className="coffee-text-secondary small mb-0" style={{ maxWidth: '380px', margin: '0 auto' }}>
              Belum ada produk kopi atau alat seduh yang ditambahkan. Silakan pilih produk dari katalog di bawah.
            </p>
          </div>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-0">
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </ul>

            <div className="p-3 p-md-4 bg-light bg-opacity-50 border-top d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              <div>
                <div className="coffee-text-muted small">Total Pembayaran:</div>
                <div className="fs-5 fw-bold" style={{ color: 'var(--coffee-accent)' }}>
                  {formattedTotalPrice}
                </div>
              </div>

              <div className="d-flex gap-2 w-100 w-sm-auto justify-content-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearCart}
                  className="tm-tap-target text-nowrap"
                  ariaLabel="Kosongkan seluruh isi keranjang"
                >
                  Kosongkan
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert(`Pesanan berhasil diproses! Total: ${formattedTotalPrice}`)}
                  className="tm-tap-target text-nowrap fw-semibold px-4"
                  ariaLabel="Lanjut ke proses pemesanan"
                >
                  Checkout Pesanan
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

export default CartPanel

