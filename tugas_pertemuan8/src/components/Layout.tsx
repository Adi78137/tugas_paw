import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

export function Layout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { favoriteIds } = useFavorites()

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand fw-bold"
            onClick={() => setIsNavOpen(false)}
          >
            Katalog Gadget
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            onClick={() => setIsNavOpen((prev) => !prev)}
            aria-controls="main-navbar"
            aria-expanded={isNavOpen}
            aria-label="Navigasi menu"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            id="main-navbar"
            className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                  }
                  onClick={() => setIsNavOpen(false)}
                >
                  Beranda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/katalog"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                  }
                  onClick={() => setIsNavOpen(false)}
                >
                  Katalog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/favorit"
                  className={({ isActive }) =>
                    `nav-link d-inline-flex align-items-center gap-1 ${
                      isActive ? 'active fw-semibold' : ''
                    }`
                  }
                  onClick={() => setIsNavOpen(false)}
                >
                  <span>Favorit</span>
                  {favoriteIds.length > 0 && (
                    <span className="badge rounded-pill bg-danger ms-1">
                      {favoriteIds.length}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-light border-top py-4 mt-auto">
        <div className="container text-center text-muted small">
          &copy; {new Date().getFullYear()} Katalog Gadget &bull; Adi Karunia
          (1247050127) &bull; Tugas Pertemuan 8
        </div>
      </footer>
    </div>
  )
}

