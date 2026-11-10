# Katalog Kopi Nusantara

**Nama:** Adi Karunia  
**NIM:** 1247050127  
**Mata Kuliah:** Pengembangan Aplikasi Web — Pertemuan 7

---

## Teknologi

- React 19 + TypeScript
- Vite 6
- Bootstrap 5 (CDN via main.tsx)

---

## Fitur

- Katalog produk kopi dan alat seduh dengan kartu visual per tingkat sangrai
- Tambah dan hapus produk via formulir bervalidasi
- Cari produk berdasarkan nama atau asal daerah
- Filter berdasarkan kategori (Biji, Bubuk, Alat Seduh)
- Keranjang belanja: tambah, kurangi, hapus item dengan sinkronisasi stok
- Checkout dengan konfirmasi sukses inline (tidak mengembalikan stok)
- Tandai produk sebagai favorit

---

## Struktur `src/`

```
src/
├── assets/          # (kosong setelah cleanup)
├── components/
│   ├── Button.tsx
│   ├── CartItem.tsx
│   ├── CartPanel.tsx
│   ├── FilterBar.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ProductGrid.tsx
│   └── SearchBar.tsx
├── utils/
│   └── format.ts    # formatRupiah(angka)
├── App.tsx
├── index.css
├── main.tsx
└── types.ts
```

---

## Cara Menjalankan

```bash
npm install
npm run dev      # development server
npm run build    # production build → ../pertemuan7/
```

> Hasil build ditempatkan di folder `../pertemuan7/` sesuai konfigurasi `vite.config.ts`.
