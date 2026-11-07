import React, { useState } from 'react'
import type { CoffeeCategory, CoffeeProduct } from '../types'
import Button from './Button'

// Props menerima fungsi onAddProduct untuk mendaftarkan produk kopi baru ke state utama
export interface ProductFormProps {
  onAddProduct: (product: Omit<CoffeeProduct, 'id'>) => void
}

// Komponen form tambah produk; mengelola state lokal nilai field dan pesan kesalahan validasi
export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [nama, setNama] = useState('')
  const [asal, setAsal] = useState('')
  const [kategori, setKategori] = useState<CoffeeCategory>('Biji')
  const [tingkatSangrai, setTingkatSangrai] = useState('Medium')
  const [harga, setHarga] = useState('')
  const [stok, setStok] = useState('10')
  const [deskripsi, setDeskripsi] = useState('')
  const [catatanRasa, setCatatanRasa] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedNama = nama.trim()
    const trimmedAsal = asal.trim()
    const numericHarga = Number(harga)
    const numericStok = Number(stok)

    if (!trimmedNama || !trimmedAsal) {
      setErrorMessage('Nama produk dan daerah asal wajib diisi.')
      return
    }

    if (isNaN(numericHarga) || numericHarga <= 0) {
      setErrorMessage('Harga produk harus berupa angka lebih besar dari 0.')
      return
    }

    if (isNaN(numericStok) || numericStok < 0) {
      setErrorMessage('Stok harus berupa angka minimal 0.')
      return
    }

    onAddProduct({
      nama: trimmedNama,
      asal: trimmedAsal,
      kategori,
      tingkatSangrai: kategori === 'Alat Seduh' ? '-' : tingkatSangrai,
      harga: numericHarga,
      stok: numericStok,
      deskripsi: deskripsi.trim() || `Produk kopi asli dari ${trimmedAsal}.`,
      catatanRasa: catatanRasa.trim() || 'Khas Nusantara',
    })

    // Reset form
    setNama('')
    setAsal('')
    setKategori('Biji')
    setTingkatSangrai('Medium')
    setHarga('')
    setStok('10')
    setDeskripsi('')
    setCatatanRasa('')
    setErrorMessage('')
    setIsOpen(false)
  }

  return (
    <section className="card coffee-card p-3 p-md-4 mb-4" aria-labelledby="form-katalog-heading">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 id="form-katalog-heading" className="h5 fw-bold mb-0" style={{ color: 'var(--coffee-espresso)' }}>
            Tambah Produk Baru
          </h2>
          <p className="coffee-text-secondary small mb-0 mt-1">
            Daftarkan biji kopi, bubuk, atau perlengkapan seduh ke dalam katalog.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-nowrap tm-tap-target px-3"
          ariaLabel={isOpen ? 'Tutup form tambah produk' : 'Buka form tambah produk'}
        >
          {isOpen ? '✕ Tutup Form' : '+ Buka Form'}
        </Button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-top border-light-subtle" noValidate>
          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 small mb-3 border-0 rounded-2" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label htmlFor="kopi-nama" className="form-label coffee-label mb-1">
                Nama Produk <span className="text-danger">*</span>
              </label>
              <input
                id="kopi-nama"
                type="text"
                className="form-control coffee-input"
                placeholder="Contoh: Kintamani Bali Honey"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="kopi-asal" className="form-label coffee-label mb-1">
                Daerah Asal <span className="text-danger">*</span>
              </label>
              <input
                id="kopi-asal"
                type="text"
                className="form-control coffee-input"
                placeholder="Contoh: Kintamani, Bali"
                value={asal}
                onChange={(e) => {
                  setAsal(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                required
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="kopi-kategori" className="form-label coffee-label mb-1">
                Kategori
              </label>
              <select
                id="kopi-kategori"
                className="form-select coffee-input"
                value={kategori}
                onChange={(e) => setKategori(e.target.value as CoffeeCategory)}
              >
                <option value="Biji">Biji Kopi</option>
                <option value="Bubuk">Kopi Bubuk</option>
                <option value="Alat Seduh">Alat Seduh</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="kopi-sangrai" className="form-label coffee-label mb-1">
                Tingkat Sangrai
              </label>
              <select
                id="kopi-sangrai"
                className="form-select coffee-input"
                value={tingkatSangrai}
                onChange={(e) => setTingkatSangrai(e.target.value)}
                disabled={kategori === 'Alat Seduh'}
              >
                <option value="Light">Light</option>
                <option value="Light Medium">Light Medium</option>
                <option value="Medium">Medium</option>
                <option value="Medium Dark">Medium Dark</option>
                <option value="Dark">Dark</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="kopi-harga" className="form-label coffee-label mb-1">
                Harga (Rp) <span className="text-danger">*</span>
              </label>
              <input
                id="kopi-harga"
                type="number"
                min="1000"
                step="1000"
                className="form-control coffee-input"
                placeholder="Contoh: 85000"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="kopi-stok" className="form-label coffee-label mb-1">
                Jumlah Stok
              </label>
              <input
                id="kopi-stok"
                type="number"
                min="0"
                className="form-control coffee-input"
                placeholder="10"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="kopi-deskripsi" className="form-label coffee-label mb-1">
                Deskripsi Singkat
              </label>
              <input
                id="kopi-deskripsi"
                type="text"
                className="form-control coffee-input"
                placeholder="Kopi arabika proses basah dengan aroma harum..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="kopi-rasa" className="form-label coffee-label mb-1">
                Catatan Rasa (Tasting Notes)
              </label>
              <input
                id="kopi-rasa"
                type="text"
                className="form-control coffee-input"
                placeholder="Contoh: Jeruk manis, karamel, bunga melati"
                value={catatanRasa}
                onChange={(e) => setCatatanRasa(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex justify-content-end gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsOpen(false)}
                className="px-3 tm-tap-target"
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="px-4 fw-semibold tm-tap-target"
              >
                Simpan Produk
              </Button>
            </div>
          </div>
        </form>
      )}
    </section>
  )
}

export default ProductForm

