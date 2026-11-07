import { useState } from 'react'
import type { CartItemData, CoffeeProduct, FilterCategory } from './types'
import Header from './components/Header'
import ProductForm from './components/ProductForm'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'

// Data awal produk kopi nusantara dan peralatan seduh
const INITIAL_PRODUCTS: CoffeeProduct[] = [
  {
    id: '1',
    nama: 'Gayo Aceh Specialty',
    asal: 'Aceh Tengah',
    kategori: 'Biji',
    tingkatSangrai: 'Medium',
    harga: 95000,
    stok: 12,
    deskripsi: 'Kopi arabika dataran tinggi Gayo dengan proses full-washed menghasilkan aroma rempah dan rasa manis seimbang.',
    catatanRasa: 'Cokelat hitam, karamel, aroma rempah',
  },
  {
    id: '2',
    nama: 'Toraja Sapan Premium',
    asal: 'Toraja Utara',
    kategori: 'Biji',
    tingkatSangrai: 'Medium Dark',
    harga: 105000,
    stok: 8,
    deskripsi: 'Ditanam di lereng pegunungan Sapan, memiliki kekentalan penuh dan aftertaste herbal yang kaya.',
    catatanRasa: 'Herbal, kacang sangrai, gula kelapa',
  },
  {
    id: '3',
    nama: 'Kintamani Bali Honey',
    asal: 'Bangli, Bali',
    kategori: 'Biji',
    tingkatSangrai: 'Light Medium',
    harga: 88000,
    stok: 15,
    deskripsi: 'Karakter buah citrus segar khas Kintamani yang diproses dengan metode madu (honey process).',
    catatanRasa: 'Jeruk manis, bunga melati, madu',
  },
  {
    id: '4',
    nama: 'Flores Bajawa Halus',
    asal: 'Ngada, NTT',
    kategori: 'Bubuk',
    tingkatSangrai: 'Medium',
    harga: 82000,
    stok: 14,
    deskripsi: 'Bubuk kopi arabika organik dari tanah vulkanik Flores dengan profil rasa manis gurih.',
    catatanRasa: 'Cokelat susu, tembakau manis, vanila',
  },
  {
    id: '5',
    nama: 'Java Preanger Puntang',
    asal: 'Bandung, Jawa Barat',
    kategori: 'Bubuk',
    tingkatSangrai: 'Light Medium',
    harga: 78000,
    stok: 10,
    deskripsi: 'Kopi legendaris Priangan dari Gunung Puntang, aroma harum bunga dengan keasaman segar.',
    catatanRasa: 'Buah plum, peach, teh hitam',
  },
  {
    id: '6',
    nama: 'Mandailing Estate Robusta',
    asal: 'Mandailing Natal, Sumut',
    kategori: 'Bubuk',
    tingkatSangrai: 'Dark',
    harga: 75000,
    stok: 20,
    deskripsi: 'Karakter kuat dan mantap dengan tingkat keasaman rendah, sangat cocok untuk kopi tubruk atau es kopi.',
    catatanRasa: 'Cokelat pekat, malt, aroma kayu manis',
  },
  {
    id: '7',
    nama: 'Papua Wamena Organik',
    asal: 'Lembah Baliem, Papua',
    kategori: 'Biji',
    tingkatSangrai: 'Medium',
    harga: 110000,
    stok: 6,
    deskripsi: 'Tumbuh liar tanpa pupuk sintetis di lembah pedalaman Papua, menyajikan kelembutan rasa istimewa.',
    catatanRasa: 'Floral, jeruk bali, sentuhan kayu manis',
  },
  {
    id: '8',
    nama: 'Manual Dripper V60 Keramik',
    asal: 'Bandung, Jawa Barat',
    kategori: 'Alat Seduh',
    tingkatSangrai: '-',
    harga: 125000,
    stok: 5,
    deskripsi: 'Dripper keramik spiral ukuran 02 untuk ekstraksi seduhan pour-over yang bersih dan jernih.',
    catatanRasa: 'Kapasitas 1-4 cangkir kopi',
  },
  {
    id: '9',
    nama: 'Hand Coffee Grinder Stainless',
    asal: 'Jakarta',
    kategori: 'Alat Seduh',
    tingkatSangrai: '-',
    harga: 175000,
    stok: 7,
    deskripsi: 'Penggiling kopi manual dengan mata pisau keramik presisi dan bodi baja tahan karat.',
    catatanRasa: 'Pengaturan tingkat gilingan presisi',
  },
]

// Komponen utama aplikasi; mengelola state produk, keranjang, favorit, pencarian, dan filter
function App() {
  const [products, setProducts] = useState<CoffeeProduct[]>(INITIAL_PRODUCTS)
  const [cart, setCart] = useState<CartItemData[]>([])
  const [favorites, setFavorites] = useState<string[]>(['1', '3'])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('Semua')
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Hitung jumlah item total dalam keranjang untuk badge di header
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Tambah produk ke keranjang belanja dan kurangi stok produk
  const handleAddToCart = (productToCart: CoffeeProduct) => {
    if (productToCart.stok <= 0) return

    // Kurangi stok di katalog produk
    setProducts((prev) =>
      prev.map((p) => (p.id === productToCart.id ? { ...p, stok: p.stok - 1 } : p)),
    )

    // Perbarui keranjang belanja
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productToCart.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === productToCart.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                product: { ...item.product, stok: item.product.stok - 1 },
              }
            : item,
        )
      }
      return [...prev, { product: { ...productToCart, stok: productToCart.stok - 1 }, quantity: 1 }]
    })

    // Buka panel keranjang otomatis agar pengguna melihat item masuk
    setIsCartOpen(true)
  }

  // Ubah kuantitas item dalam keranjang (delta: +1 atau -1)
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    const cartItem = cart.find((item) => item.product.id === productId)
    const product = products.find((p) => p.id === productId)
    if (!cartItem) return

    if (delta > 0) {
      // Periksa apakah stok produk masih ada
      if (!product || product.stok <= 0) return

      // Kurangi stok produk, tambah jumlah di keranjang
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stok: p.stok - 1 } : p)),
      )
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
    } else if (delta < 0) {
      // Kembalikan 1 stok ke katalog produk
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stok: p.stok + 1 } : p)),
      )

      if (cartItem.quantity <= 1) {
        // Hapus dari keranjang jika jumlah menjadi 0
        setCart((prev) => prev.filter((item) => item.product.id !== productId))
      } else {
        setCart((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        )
      }
    }
  }

  // Hapus item dari keranjang dan kembalikan seluruh kuantitas ke stok produk
  const handleRemoveFromCart = (productId: string) => {
    const cartItem = cart.find((item) => item.product.id === productId)
    if (cartItem) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stok: p.stok + cartItem.quantity } : p)),
      )
      setCart((prev) => prev.filter((item) => item.product.id !== productId))
    }
  }

  // Kosongkan seluruh isi keranjang dan pulihkan stok semua produk
  const handleClearCart = () => {
    setProducts((prev) => {
      const restored = [...prev]
      cart.forEach((cartItem) => {
        const idx = restored.findIndex((p) => p.id === cartItem.product.id)
        if (idx !== -1) {
          restored[idx] = {
            ...restored[idx],
            stok: restored[idx].stok + cartItem.quantity,
          }
        }
      })
      return restored
    })
    setCart([])
  }

  // Toggle status favorit suatu produk
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  // Tambah produk baru dari formulir
  const handleAddProduct = (newProduct: Omit<CoffeeProduct, 'id'>) => {
    const productWithId: CoffeeProduct = {
      ...newProduct,
      id: Date.now().toString(),
    }
    setProducts((prev) => [productWithId, ...prev])
  }

  // Hapus produk dari katalog, keranjang, dan daftar favorit
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  // Logika pencarian dan filter kategori gabungan
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Semua' ? true : p.kategori === selectedCategory

    const matchesSearch =
      normalizedQuery === '' ||
      p.nama.toLowerCase().includes(normalizedQuery) ||
      p.asal.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesSearch
  })

  // Hitung jumlah produk per kategori untuk filter bar
  const categoryCounts: Record<FilterCategory, number> = {
    Semua: products.length,
    Biji: products.filter((p) => p.kategori === 'Biji').length,
    Bubuk: products.filter((p) => p.kategori === 'Bubuk').length,
    'Alat Seduh': products.filter((p) => p.kategori === 'Alat Seduh').length,
  }

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: 'var(--coffee-bg)' }}>
      {/* Header Sticky dengan badge keranjang dan data mahasiswa */}
      <Header
        cartItemCount={totalCartCount}
        onToggleCart={() => setIsCartOpen((prev) => !prev)}
      />

      <main className="container" style={{ maxWidth: '1100px' }}>
        {/* Panel Keranjang Belanja */}
        <CartPanel
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemove={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />

        {/* Formulir Tambah Produk Baru */}
        <ProductForm onAddProduct={handleAddProduct} />

        {/* Area Kendali: Pencarian & Filter Kategori */}
        <section id="katalog" className="card coffee-card p-3 p-md-4 mb-4" aria-labelledby="katalog-heading">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-1">
              <h2 id="katalog-heading" className="h5 fw-bold mb-0 text-nowrap" style={{ color: 'var(--coffee-espresso)' }}>
                Katalog Produk Kopi
              </h2>
              <span className="coffee-text-secondary small">
                Menampilkan {filteredProducts.length} dari {products.length} produk
              </span>
            </div>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari nama atau asal kopi..."
            />

            <FilterBar
              activeFilter={selectedCategory}
              onChange={setSelectedCategory}
              counts={categoryCounts}
            />
          </div>
        </section>

        {/* Grid Produk Kopi */}
        <ProductGrid
          products={filteredProducts}
          favorites={favorites}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteProduct}
          hasActiveSearchOrFilter={normalizedQuery !== '' || selectedCategory !== 'Semua'}
        />
      </main>
    </div>
  )
}

export default App
