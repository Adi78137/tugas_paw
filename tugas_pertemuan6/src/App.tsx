import { useState, useEffect } from 'react'
import type { Tugas } from './types'
import { muatDariStorage, simpanKeStorage } from './utils/storage'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { Penjelasan } from './components/Penjelasan'
import { Footer } from './components/Footer'
import './App.css'

// Kunci penyimpanan localStorage menggunakan tipe primitif string.
const STORAGE_KEY: string = 'daftar_tugas_kuliah'

function App() {
  // Array Tugas[] untuk menyimpan daftar seluruh tugas kuliah.
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([])

  // Tipe primitif boolean untuk menandai proses memuat data awal.
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Tipe primitif string atau null untuk menyimpan pesan kegagalan.
  const [error, setError] = useState<string | null>(null)

  const bacaPenyimpanan = () => {
    setIsLoading(true)
    setError(null)

    try {
      // Memanggil fungsi generics sederhana untuk memuat array bertipe Tugas[].
      const dataTersimpan = muatDariStorage<Tugas[]>(STORAGE_KEY)
      setDaftarTugas(dataTersimpan ?? [])
    } catch {
      setError('Gagal membaca data tugas dari penyimpanan lokal perangkat.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let aktif = true

    // Memuat data secara asynchronous untuk memastikan antarmuka siap dan menangani state loading.
    const timer = setTimeout(() => {
      if (!aktif) return

      try {
        const dataTersimpan = muatDariStorage<Tugas[]>(STORAGE_KEY)
        setDaftarTugas(dataTersimpan ?? [])
      } catch {
        setError('Gagal membaca data tugas dari penyimpanan lokal perangkat.')
      } finally {
        setIsLoading(false)
      }
    }, 150)

    return () => {
      aktif = false
      clearTimeout(timer)
    }
  }, [])

  const handleTambahTugas = (tugasBaru: Tugas) => {
    const listBaru: Tugas[] = [tugasBaru, ...daftarTugas]
    setDaftarTugas(listBaru)
    simpanKeStorage<Tugas[]>(STORAGE_KEY, listBaru)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Daftar Tugas Kuliah</h1>
        <p className="app-description">
          Catat tugas kuliah dan pantau statusnya.
        </p>
      </header>

      <main className="app-main">
        <TaskForm onTambahTugas={handleTambahTugas} />
        <TaskList
          daftarTugas={daftarTugas}
          isLoading={isLoading}
          error={error}
          onMuatUlang={bacaPenyimpanan}
        />
        <Penjelasan />
      </main>

      <Footer />
    </div>
  )
}

export default App
