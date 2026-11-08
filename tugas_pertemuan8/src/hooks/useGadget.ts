import { useFetch, type UseFetchResult } from './useFetch'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'

export function useGadget(
  id: number | string | undefined | null,
): UseFetchResult<Product | null> {
  return useFetch<Product | null>(
    async (signal) => {
      if (id === undefined || id === null || id === '') {
        return null
      }
      return getProductById(id, signal)
    },
    [id],
  )
}

