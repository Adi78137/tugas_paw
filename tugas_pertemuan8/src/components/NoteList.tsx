import type { Note } from '../hooks/useNotes'

export interface NoteListProps {
  notes: Note[]
  onDeleteNote: (id: string) => void
}

export function NoteList({ notes, onDeleteNote }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-muted small fst-italic">
        Belum ada catatan pribadi untuk gadget ini.
      </p>
    )
  }

  return (
    <div className="d-flex flex-column gap-3">
      {notes.map((note) => (
        <div key={note.id} className="card shadow-sm border">
          <div className="card-body">
            <div className="d-flex align-items-start justify-content-between mb-2">
              <h4 className="h6 card-title fw-bold mb-0">{note.title}</h4>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm py-0 px-2"
                onClick={() => onDeleteNote(note.id)}
                aria-label={`Hapus catatan ${note.title}`}
              >
                Hapus
              </button>
            </div>
            <p className="card-text small text-secondary mb-2 whitespace-pre-wrap">
              {note.content}
            </p>
            <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
              {note.createdAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

