import React from 'react'
import type { FilterCategory } from '../types'
import Button from './Button'

export interface FilterBarProps {
  activeFilter: FilterCategory
  onChange: (category: FilterCategory) => void
  counts: Record<FilterCategory, number>
}

interface FilterOption {
  value: FilterCategory
  label: string
}

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
      className="filter-scroll w-100 w-sm-auto align-self-start"
      role="group"
      aria-label="Filter kategori produk kopi"
    >
      <div className="filter-options d-flex gap-2">
        {options.map((option) => {
          const count = counts[option.value] ?? 0
          const isActive = activeFilter === option.value

          return (
            <div key={option.value} className="filter-option">
              <Button
                variant={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onChange(option.value)}
                className="px-3 fw-medium coffee-tap-target text-nowrap"
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
