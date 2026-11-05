import { useState, useEffect } from 'react'
import type { Tugas } from '../types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  daftarTugas: Tugas[]
  isLoading: boolean
  error: string | null
  onMuatUlang: () => void
  onEditTugas: (tugas: Tugas) => void
  onHapusTugas: (id: string) => void
}

export function TaskList({
  daftarTugas,
  isLoading,
  error,
  onMuatUlang,
  onEditTugas,
  onHapusTugas,
}: TaskListProps) {
  const [tugasAkanDihapus, setTugasAkanDihapus] = useState<Tugas | null>(null)

  useEffect(() => {
    if (!tugasAkanDihapus) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTugasAkanDihapus(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tugasAkanDihapus])

  const konfirmasiHapus = () => {
    if (tugasAkanDihapus) {
      onHapusTugas(tugasAkanDihapus.id)
      setTugasAkanDihapus(null)
    }
  }

  if (isLoading) {
    return (
      <section className="list-section" aria-labelledby="list-heading">
        <h2 id="list-heading" className="section-title">
          Daftar Tugas
        </h2>
        <div className="state-box state-loading" role="status">
          <p>Memuat daftar tugas dari penyimpanan...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="list-section" aria-labelledby="list-heading">
        <h2 id="list-heading" className="section-title">
          Daftar Tugas
        </h2>
        <div className="state-box state-error" role="alert">
          <p className="state-title">Terjadi Kesalahan</p>
          <p className="state-description">{error}</p>
          <button
            type="button"
            onClick={onMuatUlang}
            className="btn-secondary"
          >
            Coba Muat Ulang
          </button>
        </div>
      </section>
    )
  }

  if (daftarTugas.length === 0) {
    return (
      <section className="list-section" aria-labelledby="list-heading">
        <h2 id="list-heading" className="section-title">
          Daftar Tugas
        </h2>
        <div className="state-box state-empty">
          <p className="state-title">Belum ada tugas kuliah</p>
          <p className="state-description">
            Data tugas masih kosong. Gunakan formulir di atas untuk mencatat tugas baru.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="list-section" aria-labelledby="list-heading">
      <h2 id="list-heading" className="section-title">
        Daftar Tugas ({daftarTugas.length})
      </h2>
      <ul className="task-list">
        {daftarTugas.map((tugas) => (
          <TaskItem
            key={tugas.id}
            tugas={tugas}
            onEdit={onEditTugas}
            onRequestHapus={(t) => setTugasAkanDihapus(t)}
          />
        ))}
      </ul>

      {tugasAkanDihapus && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setTugasAkanDihapus(null)}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title" className="modal-title">
              Konfirmasi Hapus Tugas
            </h3>
            <p id="modal-desc" className="modal-desc">
              Apakah Anda yakin ingin menghapus tugas "{tugasAkanDihapus.judul}"? Data yang dihapus tidak dapat dipulihkan.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setTugasAkanDihapus(null)}
                autoFocus
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={konfirmasiHapus}
              >
                Hapus Tugas
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
