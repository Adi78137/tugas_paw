import type { Product, SortOption } from '../types/product'

export const DEFAULT_PAGE_SIZE = 8

export interface ProductQueryOptions {
  search?: string
  category?: string
  sortBy?: SortOption
  page?: number
  pageSize?: number
}

export interface ProductQueryResult {
  items: Product[]
  totalItems: number
  totalPages: number
  currentPage: number
}

export function filterProducts(
  products: Product[],
  search?: string,
  category?: string,
): Product[] {
  const query = search?.trim().toLowerCase()
  const selectedCategory = category?.trim().toLowerCase()

  return products.filter((product) => {
    if (selectedCategory && selectedCategory !== 'all') {
      if (product.category.toLowerCase() !== selectedCategory) {
        return false
      }
    }

    if (!query) {
      return true
    }

    const matchTitle = product.title.toLowerCase().includes(query)
    const matchBrand = product.brand
      ? product.brand.toLowerCase().includes(query)
      : false
    const matchTag = product.tags
      ? product.tags.some((tag) => tag.toLowerCase().includes(query))
      : false

    return matchTitle || matchBrand || matchTag
  })
}

export function sortProducts(
  products: Product[],
  sortBy?: SortOption,
): Product[] {
  const list = [...products]

  switch (sortBy) {
    case 'nama-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title))
    case 'nama-desc':
      return list.sort((a, b) => b.title.localeCompare(a.title))
    case 'harga-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'harga-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return list.sort((a, b) => b.rating - a.rating)
    default:
      return list
  }
}

export function queryProducts(
  products: Product[],
  options: ProductQueryOptions = {},
): ProductQueryResult {
  const {
    search,
    category,
    sortBy,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = options

  const filtered = filterProducts(products, search, category)
  const sorted = sortProducts(filtered, sortBy)

  const validPageSize = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE
  const totalItems = sorted.length
  const totalPages =
    totalItems === 0 ? 1 : Math.ceil(totalItems / validPageSize)
  const requestedPage = Number.isFinite(page) ? Math.floor(page) : 1
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages)

  const startIndex = (currentPage - 1) * validPageSize
  const items =
    totalItems === 0 ? [] : sorted.slice(startIndex, startIndex + validPageSize)

  return {
    items,
    totalItems,
    totalPages,
    currentPage,
  }
}

