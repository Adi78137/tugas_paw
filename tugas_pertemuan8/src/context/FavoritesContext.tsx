import { useCallback, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  FavoritesContext,
  type FavoritesContextType,
} from './favoritesContextDef'

export interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    'gadget_favorites',
    [],
  )

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  )

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      )
    },
    [setFavoriteIds],
  )

  const clearFavorites = useCallback(() => {
    setFavoriteIds([])
  }, [setFavoriteIds])

  const value = useMemo<FavoritesContextType>(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favoriteIds, isFavorite, toggleFavorite, clearFavorites],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

