import React from 'react'
import Button from './Button'

export interface HeaderProps {
  cartItemCount: number
  onToggleCart: () => void
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onToggleCart }) => {
  return (
    <header className="sticky-top coffee-navbar mb-4 py-2 py-sm-3">
      <div className="container coffee-header-inner">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="coffee-mark" aria-hidden="true">K</span>
              <h1 className="coffee-wordmark mb-0">
                Katalog Kopi Nusantara
              </h1>
            </div>
            <p className="coffee-text-secondary small mb-0 mt-1">
              Nikmat kopi pilihan memang selalu punya cara tersendiri untuk menghidupkan suasana dan mengawali hari.
            </p>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2 gap-sm-3 mt-2 mt-sm-0 w-100 w-sm-auto justify-content-between justify-content-sm-end">
            <nav className="d-flex gap-2" aria-label="Navigasi katalog">
              <Button
                variant="outline"
                size="sm"
                href="#katalog"
                className="text-nowrap coffee-tap-target px-3"
                ariaLabel="Navigasi ke daftar produk kopi"
              >
                Katalog
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onToggleCart}
                className="text-nowrap coffee-tap-target px-3 d-flex align-items-center gap-2"
                ariaLabel={`Keranjang belanja, ${cartItemCount} item`}
              >
                <span>Keranjang</span>
                <span key={cartItemCount} className="badge bg-white text-dark rounded-pill px-2 py-1 small fw-bold cart-count">
                  {cartItemCount}
                </span>
              </Button>
            </nav>

            <div className="coffee-student-info text-start text-sm-end ps-sm-3">
              <div className="fw-semibold small text-nowrap" style={{ color: 'var(--coffee-espresso)' }}>
                Adi Karunia
              </div>
              <div className="coffee-text-muted font-monospace" style={{ fontSize: '0.75rem' }}>
                NIM: 1247050127
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
