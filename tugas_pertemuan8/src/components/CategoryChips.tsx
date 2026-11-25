import { CATEGORY_LABELS, GADGET_CATEGORIES } from '../utils/constants'

export interface CategoryChipsProps {
  value: string
  counts: Record<string, number>
  onChange: (category: string) => void
}

export function CategoryChips({ value, counts, onChange }: CategoryChipsProps) {
  const categories = [
    { value: 'all', label: 'Semua' },
    ...GADGET_CATEGORIES.map((category) => ({
      value: category,
      label: CATEGORY_LABELS[category],
    })),
  ]

  return (
    <div className="kg-category-chips" role="group" aria-label="Kategori produk">
      {categories.map((category) => {
        const selected = value === category.value

        return (
          <button
            key={category.value}
            type="button"
            className={`kg-category-chip${selected ? ' is-active' : ''}`}
            aria-pressed={selected}
            onClick={() => onChange(category.value)}
          >
            <span>{category.label}</span>
            <span className="kg-category-count" aria-label={`${counts[category.value] ?? 0} produk`}>
              {counts[category.value] ?? 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
