import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

export function Layout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { favoriteIds } = useFavorites()

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100dvh' }}>
      <header className="kg-header">
        <div className="container">
          <div className="kg-header-row">
            <nav
              id="main-nav-links"
              aria-label="Navigasi Utama"
              className={`kg-nav${isNavOpen ? ' is-open' : ''}`}
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `kg-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsNavOpen(false)}
              >
                Beranda
              </NavLink>

              <NavLink
                to="/katalog"
                className={({ isActive }) =>
                  `kg-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsNavOpen(false)}
              >
                Katalog
              </NavLink>

              <NavLink
                to="/favorit"
                className={({ isActive }) =>
                  `kg-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsNavOpen(false)}
              >
                <span>Favorit</span>
                {favoriteIds.length > 0 && (
                  <span
                    className="kg-fav-badge"
                    aria-label={`${favoriteIds.length} item tersimpan`}
                  >
                    {favoriteIds.length}
                  </span>
                )}
              </NavLink>
            </nav>

            <Link
              to="/"
              className="kg-brand"
              onClick={() => setIsNavOpen(false)}
            >
              Katalog <span className="kg-brand-accent">Gadget</span>
            </Link>

            <div className="kg-header-end">
              <button
                type="button"
                className="kg-menu-toggle d-lg-none"
                onClick={() => setIsNavOpen((prev) => !prev)}
                aria-controls="main-nav-links"
                aria-expanded={isNavOpen}
                aria-label={
                  isNavOpen ? 'Tutup navigasi menu' : 'Buka navigasi menu'
                }
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="kg-footer mt-auto">
        <div className="container kg-footer-row">
          <p>
            Harga yang ditampilkan merupakan estimasi konversi ke Rupiah untuk
            keperluan referensi dan dapat berbeda dengan harga resmi di toko.
          </p>
          <p className="kg-footer-credit">
            Katalog Gadget • Adi Karunia
          </p>
        </div>
      </footer>
    </div>
  )
}
