export type CoffeeCategory = 'Biji' | 'Bubuk' | 'Alat Seduh'
export type FilterCategory = 'Semua' | CoffeeCategory

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

// Hanya menyimpan referensi produk dan jumlah; data produk diambil dari state App via productId
export interface CartItemData {
  productId: string
  quantity: number
}
