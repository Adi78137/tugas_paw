/**
 * Utilitas Lokalisasi Bahasa Indonesia untuk Katalog Gadget
 * Berisi fungsi murni (tanpa React) untuk menerjemahkan nilai spesifikasi,
 * tag, dan ulasan DummyJSON ke dalam bahasa Indonesia lugas.
 * Setiap fungsi memiliki fallback ke teks asli bila nilai tidak dikenal.
 */

// Kamus tag nyata dari DummyJSON (kategori teknologi/gadget)
// Nama merek dibiarkan apa adanya sesuai nama aslinya
const TAG_DICTIONARY: Record<string, string> = {
  smartphones: 'ponsel cerdas',
  laptops: 'laptop',
  tablets: 'tablet',
  electronics: 'elektronik',
  'smart speakers': 'speaker pintar',
  'wireless earphones': 'earphone nirkabel',
  'over-ear headphones': 'headphone over-ear',
  'wireless chargers': 'pengisi daya nirkabel',
  chargers: 'pengisi daya',
  'power banks': 'power bank',
  smartwatches: 'jam tangan pintar',
  'phone accessories': 'aksesori ponsel',
  'camera accessories': 'aksesori kamera',
  'selfie accessories': 'aksesori swafoto',
  apple: 'apple',
  oppo: 'oppo',
  realme: 'realme',
  'samsung galaxy': 'samsung galaxy',
  vivo: 'vivo',
}

// Kamus terjemahan alami untuk semua ulasan unik DummyJSON pada kategori gadget
const REVIEW_COMMENT_DICTIONARY: Record<string, string> = {
  'Highly recommended!': 'Sangat direkomendasikan!',
  'Not as described!': 'Tidak sesuai deskripsi!',
  'Very satisfied!': 'Sangat puas!',
  'Disappointing product!': 'Produk mengecewakan!',
  'Excellent quality!': 'Kualitas istimewa!',
  'Great value for money!': 'Sangat sepadan dengan harganya!',
  'Would buy again!': 'Pasti akan beli lagi!',
  'Not worth the price!': 'Kurang sepadan dengan harganya!',
  'Great product!': 'Produk bagus!',
  'Poor quality!': 'Kualitas buruk!',
  'Very happy with my purchase!': 'Sangat senang dengan pembelian ini!',
  'Very pleased!': 'Sangat senang!',
  'Very dissatisfied!': 'Sangat tidak puas!',
  'Very unhappy with my purchase!': 'Sangat tidak puas dengan pembelian ini!',
  'Highly impressed!': 'Sangat terkesan!',
  'Fast shipping!': 'Pengiriman cepat!',
  'Would not recommend!': 'Tidak direkomendasikan!',
  'Very disappointed!': 'Sangat kecewa!',
  'Awesome product!': 'Produk luar biasa!',
  'Waste of money!': 'Buang-buang uang!',
  'Would not buy again!': 'Tidak akan beli lagi!',
}

export function localizeWarranty(text?: string): string {
  if (!text || typeof text !== 'string') return ''
  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  if (/^no\s+warranty$/i.test(lower)) {
    return 'Tanpa garansi'
  }
  if (/^lifetime\s+warranty$/i.test(lower)) {
    return 'Garansi seumur hidup'
  }

  const yearMatch = lower.match(/^(\d+)\s+years?\s+warranty$/i)
  if (yearMatch) {
    return `Garansi ${yearMatch[1]} tahun`
  }

  const monthMatch = lower.match(/^(\d+)\s+months?\s+warranty$/i)
  if (monthMatch) {
    return `Garansi ${monthMatch[1]} bulan`
  }

  const weekMatch = lower.match(/^(\d+)\s+weeks?\s+warranty$/i)
  if (weekMatch) {
    return `Garansi ${weekMatch[1]} minggu`
  }

  const dayMatch = lower.match(/^(\d+)\s+days?\s+warranty$/i)
  if (dayMatch) {
    return `Garansi ${dayMatch[1]} hari`
  }

  return trimmed
}

export function localizeShipping(text?: string): string {
  if (!text || typeof text !== 'string') return ''
  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  if (/^ships\s+overnight$/i.test(lower)) {
    return 'Dikirim semalam'
  }

  const rangeBusinessMatch = lower.match(
    /^ships\s+in\s+(\d+)\s*-\s*(\d+)\s+business\s+days$/i,
  )
  if (rangeBusinessMatch) {
    return `Dikirim dalam ${rangeBusinessMatch[1]}-${rangeBusinessMatch[2]} hari kerja`
  }

  const singleBusinessMatch = lower.match(
    /^ships\s+in\s+(\d+)\s+business\s+days?$/i,
  )
  if (singleBusinessMatch) {
    return `Dikirim dalam ${singleBusinessMatch[1]} hari kerja`
  }

  const rangeDayMatch = lower.match(/^ships\s+in\s+(\d+)\s*-\s*(\d+)\s+days$/i)
  if (rangeDayMatch) {
    return `Dikirim dalam ${rangeDayMatch[1]}-${rangeDayMatch[2]} hari`
  }

  const dayMatch = lower.match(/^ships\s+in\s+(\d+)\s+days?$/i)
  if (dayMatch) {
    return `Dikirim dalam ${dayMatch[1]} hari`
  }

  const weekMatch = lower.match(/^ships\s+in\s+(\d+)\s+weeks?$/i)
  if (weekMatch) {
    return `Dikirim dalam ${weekMatch[1]} minggu`
  }

  const monthMatch = lower.match(/^ships\s+in\s+(\d+)\s+months?$/i)
  if (monthMatch) {
    return `Dikirim dalam ${monthMatch[1]} bulan`
  }

  return trimmed
}

export function localizeReturn(text?: string): string {
  if (!text || typeof text !== 'string') return ''
  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  if (/^no\s+return\s+policy$/i.test(lower)) {
    return 'Tanpa retur'
  }

  const daysMatch = lower.match(/^(\d+)\s+days?\s+return\s+policy$/i)
  if (daysMatch) {
    return `Retur dalam ${daysMatch[1]} hari`
  }

  const monthsMatch = lower.match(/^(\d+)\s+months?\s+return\s+policy$/i)
  if (monthsMatch) {
    return `Retur dalam ${monthsMatch[1]} bulan`
  }

  return trimmed
}

export function localizeAvailability(text?: string): string {
  if (!text || typeof text !== 'string') return ''
  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  if (/^in\s+stock$/i.test(lower)) {
    return 'Tersedia'
  }
  if (/^low\s+stock$/i.test(lower)) {
    return 'Stok menipis'
  }
  if (/^out\s+of\s+stock$/i.test(lower)) {
    return 'Stok habis'
  }

  return trimmed
}

export function localizeTag(tag?: string): string {
  if (!tag || typeof tag !== 'string') return ''
  const trimmed = tag.trim()
  const lower = trimmed.toLowerCase()
  return TAG_DICTIONARY[lower] ?? trimmed
}

export function localizeReviewComment(comment?: string): string {
  if (!comment || typeof comment !== 'string') return ''
  const trimmed = comment.trim()
  return REVIEW_COMMENT_DICTIONARY[trimmed] ?? trimmed
}

