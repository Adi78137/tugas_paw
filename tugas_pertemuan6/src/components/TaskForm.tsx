import { useState, type FormEvent } from 'react'
import type { Tugas } from '../types'

interface TaskFormProps {
  onTambahTugas: (tugas: Tugas) => void
}

export function TaskForm({ onTambahTugas }: TaskFormProps) {
  const [judul, setJudul] = useState('')
  const [matkul, setMatkul] = useState('')
  const [deadline, setDeadline] = useState('')
  const [pesanError, setPesanError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const judulBersih = judul.trim()
    const matkulBersih = matkul.trim()
    const deadlineBersih = deadline.trim()

    if (!judulBersih || !matkulBersih || !deadlineBersih) {
      setPesanError('Semua kolom formulir wajib diisi sebelum menyimpan.')
      return
    }

    const tugasBaru: Tugas = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      judul: judulBersih,
      matkul: matkulBersih,
      deadline: deadlineBersih,
      selesai: false,
    }

    onTambahTugas(tugasBaru)
    setJudul('')
    setMatkul('')
    setDeadline('')
    setPesanError('')
  }

  return (
    <section className="form-section" aria-labelledby="form-heading">
      <h2 id="form-heading" className="section-title">
        Tambah Tugas Baru
      </h2>

      {pesanError && (
        <div className="alert-error" role="alert">
          {pesanError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-group">
          <label htmlFor="input-judul" className="form-label">
            Judul Tugas
          </label>
          <input
            id="input-judul"
            name="judul"
            type="text"
            className="form-input"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Contoh: Makalah Sistem Informasi"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-matkul" className="form-label">
            Mata Kuliah
          </label>
          <input
            id="input-matkul"
            name="matkul"
            type="text"
            className="form-input"
            value={matkul}
            onChange={(e) => setMatkul(e.target.value)}
            placeholder="Contoh: Pemrograman Aplikasi Web"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-deadline" className="form-label">
            Batas Waktu (Deadline)
          </label>
          <input
            id="input-deadline"
            name="deadline"
            type="date"
            className="form-input"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Tambah Tugas
          </button>
        </div>
      </form>
    </section>
  )
}

