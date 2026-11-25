import type { Note } from '../hooks/useNotes'

export interface NoteListProps {
  notes: Note[]
  onDeleteNote: (id: string) => void
}

export function NoteList({ notes, onDeleteNote }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-muted small">
        Belum ada catatan untuk gadget ini. Tulis perbandingan atau pengingat harga di atas.
      </p>
    )
  }

  return (
    <div className="d-flex flex-column gap-3">
      {notes.map((note) => (
        <article key={note.id} className="kg-note-card">
          <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
            <h3 className="kg-note-title">{note.title}</h3>
            <button
              type="button"
              className="kg-note-delete-btn"
              onClick={() => onDeleteNote(note.id)}
              aria-label={`Hapus catatan ${note.title}`}
            >
              Hapus
            </button>
          </div>
          <p className="kg-note-content mb-2">{note.content}</p>
          <div className="kg-note-date">{note.createdAt}</div>
        </article>
      ))}
    </div>
  )
}

