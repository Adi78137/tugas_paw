# Daftar Tugas Kuliah

- Nama: Adi Karunia
- NIM: 1247050127
- Kelas: A
- Mata kuliah: Pengembangan Aplikasi Web, Pertemuan 6
- Website: https://adikarunia.my.id/pertemuan6/
- Repository: https://github.com/Adi78137/tugas_paw/tree/main/tugas_pertemuan6

Aplikasi ini dipakai untuk mencatat tugas kuliah. Pengguna bisa menambah, mengedit, menghapus, dan mengubah status tugas. Data disimpan di localStorage sehingga tetap ada setelah halaman dimuat ulang. Tampilan menyediakan kondisi memuat, kosong, dan error dengan tombol muat ulang.

## Teknologi

- React 19
- TypeScript 6
- Vite 8

## Proses Git yang dikerjakan

1. Branch

   Branch `feature/tambah-tugas` dibuat dari `main`. Perintah `git branch` menampilkan `feature/tambah-tugas` dan `main`.

2. Pull request

   PR #1 berjudul `tambah fitur daftar dan tambah tugas` dibuat dari `feature/tambah-tugas` ke `main`. Status awalnya Open.

3. Merge

   PR #1 kemudian di-merge ke `main`. Statusnya menjadi Merged.

4. Merge conflict

   Perintah `git merge feature/penjelasan` menghasilkan conflict di `tugas_pertemuan6/src/App.tsx`, tepatnya pada baris subjudul. Penanda `<<<<<<< HEAD`, `=======`, dan `>>>>>>> feature/penjelasan` muncul di berkas tersebut.

5. Penyelesaian conflict

   Baris subjudul dirapikan, lalu commit dengan pesan `resolve merge conflict subjudul di App.tsx` dibuat dan di-push ke GitHub. Riwayat percabangan dapat dibaca lewat `git log --oneline --graph`.

## Konsep yang dipakai

- Git dan GitHub: branch, merge, pull request, dan merge conflict dipakai untuk mengelola perubahan kode.
- npm: `package.json` mencatat dependensi dan skrip. `npm run dev` menyalakan server pengembangan, sedangkan `npm run build` menghasilkan berkas produksi.
- TypeScript: tipe primitif `string`, `number`, dan `boolean`, array `Tugas[]`, interface `Tugas`, union `Status`, serta generic `muatDariStorage<T>()` dipakai di aplikasi.
- Vite: `tsc` memeriksa tipe sebelum build, lalu Vite menggabungkan modul menjadi berkas statis. Nilai `base: './'` membuat hasil build bisa dibuka dari subfolder.

## Struktur `src/`

```
src/
├── components/
│   ├── Footer.tsx
│   ├── Penjelasan.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── utils/
│   └── storage.ts
├── App.tsx
├── App.css
├── index.css
├── main.tsx
├── types.ts
└── vite-env.d.ts
```

`App.tsx` menyimpan daftar tugas, status memuat, dan pesan error. `TaskForm` menambah tugas, `TaskList` menampilkan daftar sekaligus konfirmasi hapus, `TaskItem` mengedit dan mengubah status, `Penjelasan` merangkum konsep, dan `Footer` menutup halaman.

## Menjalankan

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

Hasil build masuk ke folder `../pertemuan6/` sesuai konfigurasi `vite.config.ts`.
