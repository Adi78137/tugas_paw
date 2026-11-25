import { useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Tugas, Status } from '../types'

interface TaskItemProps {
  tugas: Tugas
  onEdit: (tugasDiedit: Tugas) => void
  onRequestHapus: (tugas: Tugas) => void
}

export function TaskItem({ tugas, onEdit, onRequestHapus }: TaskItemProps) {
  const [sedangEdit, setSedangEdit] = useState(false)
  const [judul, setJudul] = useState(tugas.judul)
  const [matkul, setMatkul] = useState(tugas.matkul)
  const [deadline, setDeadline] = useState(tugas.deadline)
  const [pesanError, setPesanError] = useState('')

  const handleMulaiEdit = () => {
    setJudul(tugas.judul)
    setMatkul(tugas.matkul)
    setDeadline(tugas.deadline)
    setPesanError('')
    setSedangEdit(true)
  }

  const handleBatalEdit = () => {
    setSedangEdit(false)
    setPesanError('')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleBatalEdit()
    }
  }

  const handleSimpanEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const judulBersih = judul.trim()
    const matkulBersih = matkul.trim()
    const deadlineBersih = deadline.trim()

    if (!judulBersih || !matkulBersih || !deadlineBersih) {
      setPesanError('Semua kolom wajib diisi.')
      return
    }

    onEdit({
      ...tugas,
      judul: judulBersih,
      matkul: matkulBersih,
      deadline: deadlineBersih,
    })
    setSedangEdit(false)
  }

  // Menggunakan type alias dan union type Status untuk menentukan status aktif dan transisinya.
  const statusTugas: Status = tugas.selesai ? 'Selesai' : 'Belum Selesai'

  const handleToggleStatus = () => {
    // Union type Status untuk menentukan nilai status berikutnya saat diubah.
    const statusBerikutnya: Status = tugas.selesai ? 'Belum Selesai' : 'Selesai'
    onEdit({
      ...tugas,
      selesai: statusBerikutnya === 'Selesai',
    })
  }

  if (sedangEdit) {
    return (
      <li className="task-item task-item-editing" onKeyDown={handleKeyDown}>
        <form onSubmit={handleSimpanEdit} className="edit-form" noValidate>
          <h4 className="edit-form-title">Edit Tugas</h4>

          {pesanError && (
            <div className="alert-error" role="alert">
              {pesanError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor={`edit-judul-${tugas.id}`} className="form-label">
              Judul Tugas
            </label>
            <input
              id={`edit-judul-${tugas.id}`}
              type="text"
              className="form-input"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`edit-matkul-${tugas.id}`} className="form-label">
              Mata Kuliah
            </label>
            <input
              id={`edit-matkul-${tugas.id}`}
              type="text"
              className="form-input"
              value={matkul}
              onChange={(e) => setMatkul(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`edit-deadline-${tugas.id}`} className="form-label">
              Batas Waktu (Deadline)
            </label>
            <input
              id={`edit-deadline-${tugas.id}`}
              type="date"
              className="form-input"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="item-actions">
            <button type="submit" className="btn-primary">
              Simpan Perubahan
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleBatalEdit}
            >
              Batal
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className={`task-item ${tugas.selesai ? 'task-item-completed' : ''}`}>
      <div className="task-header">
        <h3 className={`task-title ${tugas.selesai ? 'task-title-completed' : ''}`}>
          {tugas.judul}
        </h3>
        <button
          type="button"
          onClick={handleToggleStatus}
          className={`task-status-btn ${tugas.selesai ? 'status-selesai' : 'status-belum'}`}
          aria-pressed={tugas.selesai}
          aria-label={`Ubah status tugas ${tugas.judul}. Status saat ini: ${statusTugas}`}
          title="Klik untuk mengubah status tugas"
        >
          {statusTugas}
        </button>
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
      <div className="item-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleToggleStatus}
          aria-label={`Tandai tugas ${tugas.judul} sebagai ${tugas.selesai ? 'Belum Selesai' : 'Selesai'}`}
        >
          {tugas.selesai ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={handleMulaiEdit}
          aria-label={`Edit tugas ${tugas.judul}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-danger-outline"
          onClick={() => onRequestHapus(tugas)}
          aria-label={`Hapus tugas ${tugas.judul}`}
        >
          Hapus
        </button>
      </div>
    </li>
  )
}
