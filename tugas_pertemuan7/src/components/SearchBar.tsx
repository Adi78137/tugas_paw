import React from 'react'

// Props menerima teks pencarian aktif dan fungsi handler saat input berubah
export interface SearchBarProps {
  value: string
  onChange: (query: string) => void
  placeholder?: string
}

// Komponen input pencarian untuk menyaring kopi berdasarkan nama atau daerah asal
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Cari nama atau asal kopi...',
}) => {
  return (
    <div className="position-relative w-100">
      <input
        type="search"
        className="form-control coffee-input pe-5 py-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Cari produk kopi atau alat seduh"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="btn btn-sm coffee-text-muted position-absolute end-0 top-50 translate-middle-y me-2 p-1 border-0"
          aria-label="Hapus kata kunci pencarian"
          style={{ lineHeight: 1 }}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
