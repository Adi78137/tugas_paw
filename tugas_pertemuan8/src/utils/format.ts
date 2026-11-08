const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatHarga(amount: number): string {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return '$0.00'
  }
  return usdFormatter.format(amount)
}

export const formatRupiah = formatHarga

