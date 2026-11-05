import type { Tugas, Status } from '../types'

interface TaskListProps {
  daftarTugas: Tugas[]
  isLoading: boolean
  error: string | null
  onMuatUlang: () => void
}

export function TaskList({
  daftarTugas,
  isLoading,
  error,
  onMuatUlang,
}: TaskListProps) {
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
        {daftarTugas.map((tugas) => {
          // Menggunakan union type Status untuk representasi label status pengerjaan.
          const statusTugas: Status = tugas.selesai ? 'Selesai' : 'Belum Selesai'

          return (
            <li key={tugas.id} className="task-item">
              <div className="task-header">
                <h3 className="task-title">{tugas.judul}</h3>
                <span className="task-status">{statusTugas}</span>
              </div>
              <div className="task-meta">
                <p className="task-matkul">
                  <span className="meta-label">Mata Kuliah:</span> {tugas.matkul}
                </p>
                <p className="task-deadline">
                  <span className="meta-label">Batas Waktu:</span>{' '}
                  <time dateTime={tugas.deadline}>{tugas.deadline}</time>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

