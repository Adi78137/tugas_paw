import { USD_TO_IDR } from './constants'

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function hitungHarga(amount: number, persenDiskon = 0): number {
  return persenDiskon > 0 ? amount * (1 - persenDiskon / 100) : amount
}

export function formatHarga(amount: number, persenDiskon = 0): string {
  const harga = hitungHarga(amount, persenDiskon)
  if (typeof harga !== 'number' || Number.isNaN(harga)) {
    return 'Rp0'
  }
  const idrValue = Math.round((harga * USD_TO_IDR) / 1000) * 1000
  return idrFormatter.format(idrValue)
}

export const formatRupiah = formatHarga
