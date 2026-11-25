export const GADGET_CATEGORIES = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
] as const

export type GadgetCategory = (typeof GADGET_CATEGORIES)[number]

/**
 * Kurs konversi tetap perkiraan dari USD ke IDR.
 * Bukan harga resmi toko ritel Indonesia; data asli DummyJSON disediakan dalam mata uang USD.
 */
export const USD_TO_IDR = 18000

export const CATEGORY_LABELS: Record<GadgetCategory, string> = {
  smartphones: 'Smartphone',
  laptops: 'Laptop',
  tablets: 'Tablet',
  'mobile-accessories': 'Aksesoris Ponsel',
}

