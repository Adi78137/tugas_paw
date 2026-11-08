import { useContext } from 'react'
import {
  FavoritesContext,
  type FavoritesContextType,
} from '../context/favoritesContextDef'

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites harus digunakan di dalam FavoritesProvider')
  }
  return context
}

