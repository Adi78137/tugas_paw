import { useState, type FormEvent } from 'react'

export interface NoteFormProps {
  onAddNote: (title: string, content: string) => void
}

export function NoteForm({ onAddNote }: NoteFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [touched, setTouched] = useState({ title: false, content: false })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const isTitleValid = title.trim().length >= 3
  const isContentValid = content.trim().length >= 10
  const isFormValid = isTitleValid && isContentValid

  const titleError =
    touched.title && !title.trim()
      ? 'Judul catatan wajib diisi.'
      : touched.title && title.trim().length < 3
        ? 'Judul catatan minimal 3 karakter.'
        : null

  const contentError =
    touched.content && !content.trim()
      ? 'Isi catatan wajib diisi.'
      : touched.content && content.trim().length < 10
        ? 'Isi catatan minimal 10 karakter.'
        : null

  const isTouched = touched.title || touched.content
  const isSubmitDisabled = isTouched && !isFormValid

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ title: true, content: true })

    if (!isFormValid) {
      return
    }

    onAddNote(title, content)
    setTitle('')
    setContent('')
    setTouched({ title: false, content: false })
    setSuccessMessage('Catatan pribadi berhasil disimpan!')

    setTimeout(() => {
      setSuccessMessage(null)
    }, 3500)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mb-4">
      {successMessage && (
        <div className="alert alert-success py-2 px-3 mb-3 small" role="alert">
          {successMessage}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="note-title-input" className="form-label fw-semibold">
          Judul Catatan <span className="text-danger">*</span>
        </label>
        <input
          id="note-title-input"
          type="text"
          className={`form-control ${titleError ? 'is-invalid' : ''}`}
          placeholder="Mis. Rencana pembelian / perbandingan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
        />
        {titleError && <div className="invalid-feedback">{titleError}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="note-content-input" className="form-label fw-semibold">
          Isi Catatan <span className="text-danger">*</span>
        </label>
        <textarea
          id="note-content-input"
          rows={3}
          className={`form-control ${contentError ? 'is-invalid' : ''}`}
          placeholder="Tuliskan catatan penting tentang gadget ini (min. 10 karakter)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
        />
        {contentError && <div className="invalid-feedback">{contentError}</div>}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitDisabled}
      >
        Simpan Catatan
      </button>
    </form>
  )
}

