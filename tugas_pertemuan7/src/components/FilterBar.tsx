import React from 'react'
import type { FilterCategory } from '../types'
import Button from './Button'

// Props menerima kategori aktif, fungsi pengubah kategori, dan jumlah produk per kategori
export interface FilterBarProps {
  activeFilter: FilterCategory
  onChange: (category: FilterCategory) => void
  counts: Record<FilterCategory, number>
}

// Opsi kategori untuk pemetaan tombol filter
interface FilterOption {
  value: FilterCategory
  label: string
}

// Komponen bar filter kategori produk; di HP tampil sebagai grid 2x2 rata dan di desktop 1 baris
export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onChange,
  counts,
}) => {
  const options: FilterOption[] = [
    { value: 'Semua', label: 'Semua' },
    { value: 'Biji', label: 'Biji Kopi' },
    { value: 'Bubuk', label: 'Kopi Bubuk' },
    { value: 'Alat Seduh', label: 'Alat Seduh' },
  ]

  return (
    <div
      className="w-100 w-sm-auto align-self-start"
      role="group"
      aria-label="Filter kategori produk kopi"
    >
      <div className="row g-2 g-sm-1 row-cols-2 row-cols-sm-auto">
        {options.map((option) => {
          const count = counts[option.value] ?? 0
          const isActive = activeFilter === option.value

          return (
            <div key={option.value} className="col">
              <Button
                variant={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onChange(option.value)}
                className="w-100 px-3 fw-medium coffee-tap-target text-nowrap"
                ariaLabel={`Filter kategori ${option.label}`}
              >
                {option.label} ({count})
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilterBar
