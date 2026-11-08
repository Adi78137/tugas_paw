import { apiFetch } from './api'
import { GADGET_CATEGORIES } from '../utils/constants'
import type { Product, ProductsResponse } from '../types/product'

export async function getAllGadgets(signal?: AbortSignal): Promise<Product[]> {
  const requests = GADGET_CATEGORIES.map((category) =>
    apiFetch<ProductsResponse>(
      `/products/category/${category}?limit=0`,
      signal,
    ),
  )

  const responses = await Promise.all(requests)
  return responses.flatMap((res) => res.products)
}

export async function getProductById(
  id: number | string,
  signal?: AbortSignal,
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, signal)
}

