import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGadgets } from '../hooks/useGadgets'
import { useFavorites } from '../hooks/useFavorites'
import { useDebounce } from '../hooks/useDebounce'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { CATEGORY_OPTIONS } from '../utils/constants'
import { queryProducts } from '../utils/productQuery'
import type { SortOption } from '../types/product'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { EmptyState } from '../components/EmptyState'
import { SearchInput } from '../components/SearchInput'
import { SelectFilter } from '../components/SelectFilter'
import { ProductCard } from '../components/ProductCard'
import { Pagination } from '../components/Pagination'

const SORT_OPTIONS = [
  { value: 'nama-asc', label: 'Nama (A - Z)' },
  { value: 'nama-desc', label: 'Nama (Z - A)' },
  { value: 'harga-asc', label: 'Harga (Termurah)' },
  { value: 'harga-desc', label: 'Harga (Termahal)' },
  { value: 'rating-desc', label: 'Rating Tertinggi' },
] as const

const VALID_SORT_VALUES = SORT_OPTIONS.map((opt) => opt.value)

export function CatalogPage() {
  useDocumentTitle('Katalog Gadget')
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: gadgets, loading, error, refetch } = useGadgets()
  const { isFavorite, toggleFavorite } = useFavorites()

  const q = searchParams.get('q') || ''
  const kategori = searchParams.get('kategori') || 'all'
  const urutRaw = searchParams.get('urut') || 'nama-asc'
  const urut: SortOption = VALID_SORT_VALUES.includes(
    urutRaw as (typeof VALID_SORT_VALUES)[number],
  )
    ? (urutRaw as SortOption)
    : 'nama-asc'

  const halRaw = Number(searchParams.get('hal'))
  const hal = Number.isInteger(halRaw) && halRaw > 0 ? halRaw : 1

  const [searchInput, setSearchInput] = useState(q)
  const debouncedSearch = useDebounce(searchInput, 300)

  useEffect(() => {
    setSearchInput(q)
  }, [q])

  useEffect(() => {
    if (debouncedSearch !== q) {
      updateUrlState({ q: debouncedSearch, hal: 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const updateUrlState = (
    updates: Partial<{
      q: string
      kategori: string
      urut: string
      hal: number
    }>,
  ) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      const targetQ =
        updates.q !== undefined ? updates.q : prev.get('q') || ''
      const targetKategori =
        updates.kategori !== undefined
          ? updates.kategori
          : prev.get('kategori') || 'all'
      const targetUrut =
        updates.urut !== undefined
          ? updates.urut
          : prev.get('urut') || 'nama-asc'
      const targetHal =
        updates.hal !== undefined ? updates.hal : Number(prev.get('hal')) || 1

      if (targetQ.trim()) {
        next.set('q', targetQ.trim())
      } else {
        next.delete('q')
      }

      if (targetKategori && targetKategori !== 'all') {
        next.set('kategori', targetKategori)
      } else {
        next.delete('kategori')
      }

      if (targetUrut && targetUrut !== 'nama-asc') {
        next.set('urut', targetUrut)
      } else {
        next.delete('urut')
      }

      if (targetHal > 1) {
        next.set('hal', String(targetHal))
      } else {
        next.delete('hal')
      }

      return next
    })
  }

  const handleReset = () => {
    setSearchInput('')
    setSearchParams(new URLSearchParams())
  }

  const { items, totalItems, totalPages, currentPage } = queryProducts(
    gadgets ?? [],
    {
      search: q,
      category: kategori,
      sortBy: urut,
      page: hal,
      pageSize: 8,
    },
  )

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Katalog Gadget</h1>
        <p className="text-muted small">
          Temukan gadget sesuai kategori, spesifikasi, dan harga yang Anda
          inginkan.
        </p>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-5">
              <SearchInput
                id="catalog-search"
                label="Pencarian Gadget"
                value={searchInput}
                onChange={setSearchInput}
                placeholder="Cari judul, brand, atau tag..."
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
              <SelectFilter
                id="catalog-category-filter"
                label="Kategori"
                value={kategori}
                onChange={(newCat) =>
                  updateUrlState({ kategori: newCat, hal: 1 })
                }
                options={CATEGORY_OPTIONS}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-4">
              <SelectFilter
                id="catalog-sort-filter"
                label="Urutkan Berdasarkan"
                value={urut}
                onChange={(newSort) =>
                  updateUrlState({ urut: newSort, hal: 1 })
                }
                options={SORT_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner text="Memuat katalog gadget..." />}

      {error && (
        <ErrorMessage
          message={`Gagal memuat katalog: ${error.message}`}
          onRetry={refetch}
        />
      )}

      {!loading && !error && (
        <>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="text-muted small">
              Menampilkan <strong>{totalItems}</strong> produk
              {q ? ` untuk kata kunci "${q}"` : ''}
            </span>
            {(q || (kategori && kategori !== 'all') || urut !== 'nama-asc') && (
              <button
                type="button"
                className="btn btn-link btn-sm text-decoration-none p-0"
                onClick={handleReset}
              >
                Reset Filter
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyState
              title="Tidak ada gadget ditemukan"
              description="Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih."
              actionLabel="Reset Semua Filter"
              onAction={handleReset}
            />
          ) : (
            <>
              <div className="row g-4">
                {items.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                    <ProductCard
                      product={product}
                      isFavorite={isFavorite(product.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => updateUrlState({ hal: page })}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

