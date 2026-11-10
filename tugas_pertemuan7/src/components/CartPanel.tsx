import React, { useEffect, useState } from 'react'
import type { CartItemData, CoffeeProduct } from '../types'
import { formatRupiah } from '../utils/format'
import Button from './Button'
import CartItem from './CartItem'

// Props menerima keranjang, daftar produk (untuk lookup), status visibilitas, dan handler aksi
export interface CartPanelProps {
  cart: CartItemData[]
  products: CoffeeProduct[]
  isOpen: boolean
  onClose: () => void
  onUpdateQuantity: (productId: string, delta: number) => void
  onRemove: (productId: string) => void
  onClearCart: () => void
  onCheckout: () => void
}

// Panel keranjang belanja; mengelola state lokal pesan sukses checkout
export const CartPanel: React.FC<CartPanelProps> = ({
  cart,
  products,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  onCheckout,
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
    useEffect(() => {
    if (!isOpen) setSuccessMessage(null)
  }, [isOpen])

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => {
    const p = products.find((pr) => pr.id === item.productId)
    return acc + (p ? p.harga * item.quantity : 0)
  }, 0)

  const handleCheckout = () => {
    setSuccessMessage(`Pesanan diproses. Total: ${formatRupiah(totalPrice)}`)
    onCheckout()
  }

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
          className="coffee-tap-target px-3"
          ariaLabel="Tutup panel keranjang belanja"
        >
          ✕ Tutup
        </Button>
      </div>

      <div className="card-body p-0">
        {successMessage && cart.length === 0 && (
          <div className="alert alert-success m-3 d-flex justify-content-between align-items-start" role="alert">
            <span className="small">{successMessage}</span>
            <button
              type="button"
              className="btn-close btn-sm ms-3 flex-shrink-0"
              aria-label="Tutup pesan sukses"
              onClick={() => setSuccessMessage(null)}
            />
          </div>
        )}

        {cart.length === 0 && !successMessage ? (
          <div className="text-center py-5 px-3">
            <h3 className="h6 fw-bold mb-2" style={{ color: 'var(--coffee-espresso)' }}>
              Keranjang Masih Kosong
            </h3>
            <p className="coffee-text-secondary small mb-0" style={{ maxWidth: '380px', margin: '0 auto' }}>
              Belum ada produk kopi atau alat seduh yang ditambahkan. Silakan pilih produk dari katalog di bawah.
            </p>
          </div>
        ) : cart.length > 0 ? (
          <>
            <ul className="list-group list-group-flush mb-0">
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.productId)
                if (!product) return null
                return (
                  <CartItem
                    key={item.productId}
                    item={item}
                    product={product}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                )
              })}
            </ul>

            <div className="p-3 p-md-4 bg-light bg-opacity-50 border-top d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              <div>
                <div className="coffee-text-muted small">Total Pembayaran:</div>
                <div className="fs-5 fw-bold" style={{ color: 'var(--coffee-accent)' }}>
                  {formatRupiah(totalPrice)}
                </div>
              </div>

              <div className="d-flex gap-2 w-100 w-sm-auto justify-content-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearCart}
                  className="coffee-tap-target text-nowrap"
                  ariaLabel="Kosongkan seluruh isi keranjang"
                >
                  Kosongkan
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCheckout}
                  className="coffee-tap-target text-nowrap fw-semibold px-4"
                  ariaLabel="Lanjut ke proses pemesanan"
                >
                  Checkout Pesanan
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </aside>
  )
}

export default CartPanel
