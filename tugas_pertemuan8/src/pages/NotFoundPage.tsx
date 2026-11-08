import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Halaman Tidak Ditemukan')

  return (
    <div className="container py-5 text-center my-auto">
      <div className="py-5">
        <h1 className="display-1 fw-bold text-secondary">404</h1>
        <h2 className="h4 fw-bold mb-3">Halaman Tidak Ditemukan</h2>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
          Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau alamat
          URL yang dimasukkan salah.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-primary">
            Kembali ke Beranda
          </Link>
          <Link to="/katalog" className="btn btn-outline-secondary">
            Buka Katalog
          </Link>
        </div>
      </div>
    </div>
  )
}

