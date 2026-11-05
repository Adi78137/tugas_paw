export function Footer() {
  const appName = import.meta.env.VITE_APP_NAME || 'Daftar Tugas Kuliah'
  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'

  return (
    <footer className="app-footer">
      <p className="footer-info">
        <span>{appName}</span>
        <span className="footer-separator" aria-hidden="true"> • </span>
        <span>Versi {appVersion}</span>
      </p>
    </footer>
  )
}

