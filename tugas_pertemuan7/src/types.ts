// Tipe kategori kopi dan opsi filter
export type CoffeeCategory = 'Biji' | 'Bubuk' | 'Alat Seduh'
export type FilterCategory = 'Semua' | CoffeeCategory

// Struktur data satu produk kopi atau alat seduh
export interface CoffeeProduct {
  id: string
  nama: string
  asal: string
  kategori: CoffeeCategory
  tingkatSangrai: string
  harga: number
  deskripsi: string
  catatanRasa: string
  stok: number
}

// Struktur data item di dalam keranjang belanja
export interface CartItemData {
  product: CoffeeProduct
  quantity: number
}
