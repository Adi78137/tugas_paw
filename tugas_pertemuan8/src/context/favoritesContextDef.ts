import { createContext } from 'react'

export interface FavoritesContextType {
  favoriteIds: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
  clearFavorites: () => void
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null)

