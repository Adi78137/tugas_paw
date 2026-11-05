// Generics sederhana untuk membaca data bertipe T dari localStorage.
export function muatDariStorage<T>(kunci: string): T | null {
  try {
    const raw = localStorage.getItem(kunci)
    if (!raw) {
      return null
    }
    return JSON.parse(raw) as T
  } catch {
    throw new Error(`Gagal mengurai data dari penyimpanan dengan kunci: ${kunci}`)
  }
}

// Generics sederhana untuk menyimpan nilai bertipe T ke localStorage.
export function simpanKeStorage<T>(kunci: string, nilai: T): void {
  localStorage.setItem(kunci, JSON.stringify(nilai))
}

