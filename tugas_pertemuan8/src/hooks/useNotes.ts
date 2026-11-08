import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

export function useNotes(productId: number | string | undefined) {
  const storageKey = productId
    ? `gadget_notes_${productId}`
    : 'gadget_notes_temp'
  const [notes, setNotes] = useLocalStorage<Note[]>(storageKey, [])

  const addNote = useCallback(
    (title: string, content: string) => {
      const newNote: Note = {
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      }
      setNotes((prev) => [newNote, ...prev])
    },
    [setNotes],
  )

  const deleteNote = useCallback(
    (noteId: string) => {
      setNotes((prev) => prev.filter((note) => note.id !== noteId))
    },
    [setNotes],
  )

  return {
    notes: productId ? notes : [],
    addNote,
    deleteNote,
  }
}

