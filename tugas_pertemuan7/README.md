# Katalog Kopi Nusantara

- Nama: Adi Karunia
- NIM: 1247050127
- Kelas: A
- Mata kuliah: Pengembangan Aplikasi Web, Pertemuan 7
- Website: https://www.adikarunia.my.id/pertemuan7/
- Repository: https://github.com/Adi78137/tugas_paw/tree/main/tugas_pertemuan7

Aplikasi ini menampilkan katalog biji kopi, kopi bubuk, dan alat seduh dari berbagai daerah di Indonesia. Fitur utamanya mencari produk, filter kategori, keranjang belanja, favorit, tambah produk, hapus produk, dan tampil atau sembunyikan detail. Nama dan NIM tampil permanen di header.

## Teknologi

- React 19 dan TypeScript
- Vite 8
- Bootstrap 5, diimpor lewat `src/main.tsx`

## 1. Komponen React

| Komponen | Fungsi |
| --- | --- |
| `Header` | Navbar berisi brand, tombol Katalog, tombol Keranjang dengan badge jumlah item, serta nama dan NIM |
| `Button` | Tombol reusable dengan varian primary, outline, danger, dan success |
| `SearchBar` | Input pencarian berdasarkan nama atau asal kopi |
| `FilterBar` | Tombol filter kategori, yaitu Semua, Biji, Bubuk, dan Alat Seduh, beserta jumlah produknya |
| `ProductGrid` | Menampilkan daftar produk dalam grid atau pesan saat hasil kosong |
| `ProductCard` | Kartu satu produk berisi harga, stok, favorit, detail, hapus, dan tambah ke keranjang |
| `ProductForm` | Form tambah produk baru dengan validasi |
| `CartPanel` | Panel keranjang berisi daftar item, total harga, kosongkan, dan checkout |
| `CartItem` | Satu baris item keranjang dengan tombol tambah, kurang, dan hapus |

`App` adalah komponen root yang merangkai komponen tersebut. `CartDrawer` mengelola panel keranjang agar bisa ditutup dengan Escape dan menjaga fokus keyboard. `CartToast` menampilkan notifikasi singkat setelah produk masuk keranjang. Fungsi format rupiah dipisah ke `src/utils/format.ts`.

## 2. Props

- `App` mengirim `products`, `favorites`, `onAddToCart`, `onToggleFavorite`, dan `onDelete` ke `ProductGrid`, lalu diteruskan ke tiap `ProductCard`. Status favorit dikirim sebagai prop `isFavorite`.
- `App` mengirim `activeFilter`, `counts`, dan `onChange` ke `FilterBar`. `SearchBar` menerima `value` dan `onChange`.
- `App` mengirim `cart`, `products`, `isOpen`, `onUpdateQuantity`, `onRemove`, `onClearCart`, dan `onCheckout` ke `CartPanel`. `CartPanel` meneruskan item dan produk ke `CartItem`.
- `Header` menerima `cartItemCount` dan `onToggleCart`.
- `Button` menerima `variant`, `size`, `onClick`, `disabled`, `ariaLabel`, dan `children`, sehingga satu komponen bisa dipakai di banyak tempat.
- Semua props diberi tipe lewat interface TypeScript.

## 3. State dengan useState

- Di `App`: `products`, `cart`, `favorites`, `searchQuery`, `selectedCategory`, `isCartOpen`, dan `toastMessage`.
- Di `ProductCard`: `showDetail` untuk membuka dan menutup deskripsi.
- Di `ProductForm`: nilai tiap field formulir, `isOpen`, dan `errorMessage`.
- Di `CartPanel`: `successMessage` untuk pesan sukses checkout.
- Data utama disimpan di `App`, sedangkan komponen anak menampilkan data dan memanggil callback. Pola ini disebut lifting state up.
- Item keranjang hanya menyimpan `productId` dan `quantity`. Detail produk diambil dari `products`, jadi tidak ada salinan data ganda.

## 4. Event handling

- `onClick` dipakai untuk tambah ke keranjang, tombol plus dan minus, hapus item, kosongkan keranjang, checkout, favorit, hapus produk, lihat detail, ganti filter, serta buka atau tutup keranjang dan formulir.
- `onChange` dipakai pada kolom pencarian dan semua input formulir sebagai controlled component.
- `onSubmit` pada formulir memakai `preventDefault()` dan validasi. Nama serta asal wajib diisi, harga harus lebih dari 0, dan stok tidak boleh negatif.

## 5. Conditional rendering

- Panel keranjang tampil hanya saat `isOpen` bernilai true, dan keranjang kosong punya tampilan tersendiri.
- Detail produk muncul atau hilang sesuai `showDetail`.
- Badge `Stok Habis` dan tombol nonaktif muncul saat stok 0.
- Pesan `Produk Kopi Tidak Ditemukan` muncul saat hasil cari atau filter kosong.
- Formulir tambah produk, pesan error validasi, pesan sukses checkout, dan tombol hapus pencarian tampil bersyarat.

## 6. List rendering

- `products.map()` dipakai di `ProductGrid`.
- `cart.map()` dipakai di `CartPanel`.
- `options.map()` dipakai di `FilterBar`.
- Semua daftar memakai `key` unik berupa `id`.

## 7. Fitur interaktif

- Cari produk berdasarkan nama atau daerah asal.
- Filter kategori beserta jumlah produk.
- Tambah ke keranjang, dengan stok yang berkurang dan kembali saat jumlah dikurangi atau item dihapus.
- Ubah jumlah dan hapus item keranjang.
- Checkout tanpa mengembalikan stok.
- Tandai produk sebagai favorit.
- Tambah produk lewat formulir bervalidasi.
- Hapus produk beserta referensinya di keranjang dan favorit.
- Tampil atau sembunyikan detail produk.

## Struktur `src/`

```
src/
├── components/
│   ├── Button.tsx
│   ├── CartDrawer.tsx
│   ├── CartItem.tsx
│   ├── CartPanel.tsx
│   ├── CartToast.tsx
│   ├── FilterBar.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ProductGrid.tsx
│   └── SearchBar.tsx
├── utils/
│   └── format.ts
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── types.ts
```

## Menjalankan

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

Hasil build masuk ke folder `../pertemuan7/` sesuai konfigurasi `vite.config.ts`.
