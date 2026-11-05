// Tipe data primitif: string untuk teks, number untuk angka, boolean untuk logika.
export type IDTugas = string
export type JumlahTugas = number
export type StatusAktif = boolean

// Interface untuk struktur data tugas kuliah.
export interface Tugas {
  id: string
  judul: string
  matkul: string
  deadline: string
  selesai: boolean
}

// Type alias dan union type untuk membatasi status pengerjaan.
export type Status = 'Belum Selesai' | 'Selesai'

// Tipe data array yang berisi kumpulan objek Tugas.
export type KumpulanTugas = Tugas[]

