import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
      ? `${title} - Katalog Gadget`
      : 'Katalog Gadget - Pertemuan 8'

    return () => {
      document.title = prevTitle
    }
  }, [title])
}

