import { useFetch, type UseFetchResult } from './useFetch'
import { getAllGadgets } from '../services/productService'
import type { Product } from '../types/product'

export function useGadgets(): UseFetchResult<Product[]> {
  return useFetch<Product[]>((signal) => getAllGadgets(signal), [])
}

