export const GADGET_CATEGORIES = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
] as const

export type GadgetCategory = (typeof GADGET_CATEGORIES)[number]

export const CATEGORY_LABELS: Record<GadgetCategory, string> = {
  smartphones: 'Smartphone',
  laptops: 'Laptop',
  tablets: 'Tablet',
  'mobile-accessories': 'Aksesoris Ponsel',
}

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Semua Kategori' },
  ...GADGET_CATEGORIES.map((cat) => ({
    value: cat,
    label: CATEGORY_LABELS[cat],
  })),
] as const

