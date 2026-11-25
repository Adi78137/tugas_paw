import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useGadgets } from '../hooks/useGadgets'
import { useFavorites } from '../hooks/useFavorites'
import { useDebounce } from '../hooks/useDebounce'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { GADGET_CATEGORIES } from '../utils/constants'
import { queryProducts } from '../utils/productQuery'
import type { SortOption } from '../types/product'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { EmptyState } from '../components/EmptyState'
import { SearchInput } from '../components/SearchInput'
import { SelectFilter } from '../components/SelectFilter'
import { ProductCard } from '../components/ProductCard'
import { Pagination } from '../components/Pagination'
import { CategoryChips } from '../components/CategoryChips'
import { ViewToggle } from '../components/ViewToggle'
import '../components/Catalog.css'

const SORT_OPTIONS = [
  { value: 'nama-asc', label: 'Nama (A - Z)' },
  { value: 'nama-desc', label: 'Nama (Z - A)' },
  { value: 'harga-asc', label: 'Harga (Termurah)' },
  { value: 'harga-desc', label: 'Harga (Termahal)' },
  { value: 'rating-desc', label: 'Rating Tertinggi' },
] as const

const VALID_SORT_VALUES = SORT_OPTIONS.map((opt) => opt.value)
const EMPTY_GADGETS: NonNullable<ReturnType<typeof useGadgets>['data']> = []

export function CatalogPage() {
  useDocumentTitle('Katalog Gadget')
  const location = useLocation()
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
  const [view, setView] = useState<'grid' | 'list'>('grid')
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

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.altKey || event.ctrlKey || event.metaKey) {
        return
      }

      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.matches('input, textarea, select, [contenteditable="true"]'))
      ) {
        return
      }

      event.preventDefault()
      document.getElementById('catalog-search')?.focus()
    }

    document.addEventListener('keydown', focusSearch)
    return () => document.removeEventListener('keydown', focusSearch)
  }, [])

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

  const allGadgets = gadgets ?? EMPTY_GADGETS
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allGadgets.length }
    for (const category of GADGET_CATEGORIES) counts[category] = 0
    for (const gadget of allGadgets) {
      counts[gadget.category] = (counts[gadget.category] ?? 0) + 1
    }
    return counts
  }, [allGadgets])
  const categoryCount = new Set(allGadgets.map((gadget) => gadget.category)).size
  const hasActiveFilters = Boolean(
    q || (kategori && kategori !== 'all') || urut !== 'nama-asc',
  )

  const { items, totalItems, totalPages, currentPage } = queryProducts(
    allGadgets,
    {
      search: q,
      category: kategori,
      sortBy: urut,
      page: hal,
      pageSize: 8,
    },
  )

  return (
    <div className="container kg-catalog-page">
      <header className="kg-page-head">
        <h1>Katalog Gadget</h1>
        <p>
          {error
            ? 'Jumlah gadget belum tersedia.'
            : loading
              ? 'Memuat jumlah gadget dan kategori.'
              : `${allGadgets.length} produk dari ${categoryCount} kategori`}
        </p>
      </header>

      <section className="kg-catalog-toolbar" aria-label="Cari dan filter produk">
        <div className="kg-toolbar-main">
          <div className="kg-search-wrap">
            <SearchInput
              id="catalog-search"
              label="Pencarian Gadget"
              value={searchInput}
              onChange={setSearchInput}
              placeholder="Cari judul, merek, atau tag..."
            />
            <kbd className="kg-search-shortcut" aria-hidden="true">/</kbd>
          </div>

          <div className="kg-catalog-controls">
            <SelectFilter
              id="catalog-sort-filter"
              label="Urutan"
              value={urut}
              onChange={(newSort) => updateUrlState({ urut: newSort, hal: 1 })}
              options={SORT_OPTIONS}
            />
            <ViewToggle value={view} onChange={setView} />
          </div>
        </div>

        <CategoryChips
          value={kategori}
          counts={categoryCounts}
          onChange={(newCategory) =>
            updateUrlState({ kategori: newCategory, hal: 1 })
          }
        />
      </section>

      {loading && <LoadingSpinner text="Memuat katalog gadget..." />}

      {error && (
        <ErrorMessage
          message={`Katalog gagal dimuat: ${error.message}. Periksa koneksi internet, lalu coba lagi.`}
          onRetry={refetch}
        />
      )}

      {!loading && !error && (
        <>
          {hasActiveFilters && (
            <div className="kg-results-summary">
              <p aria-live="polite">
                Menampilkan <strong>{totalItems}</strong> produk
                {q ? ` untuk kata kunci "${q}"` : ''}
              </p>
              <button type="button" onClick={handleReset}>
                Reset filter
              </button>
            </div>
          )}

          {items.length === 0 ? (
            <EmptyState
              title="Tidak ada gadget yang cocok"
              description="Kata kunci atau kategori ini tidak menemukan produk. Hapus pencarian dan filter untuk melihat seluruh katalog."
              actionLabel="Reset filter"
              onAction={handleReset}
            />
          ) : (
            <>
              <div
                className={`kg-product-grid${view === 'list' ? ' is-list' : ''}`}
              >
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={toggleFavorite}
                    layout={view}
                    catalogSearch={location.search}
                  />
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
