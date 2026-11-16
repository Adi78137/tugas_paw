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

// Item keranjang menyimpan referensi produk; detailnya tetap berada di state App.
export interface CartItemData {
  productId: string
  quantity: number
}
