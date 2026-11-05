export function Penjelasan() {
  return (
    <section className="penjelasan-section" aria-labelledby="penjelasan-heading">
      <h2 id="penjelasan-heading" className="section-title">
        Penjelasan Konsep & Teknologi
      </h2>
      <p className="penjelasan-intro">
        Ringkasan konsep pengembangan perangkat lunak yang diterapkan pada aplikasi ini:
      </p>

      <div className="penjelasan-list">
        <details className="penjelasan-item" open>
          <summary className="penjelasan-summary">
            Git dan GitHub
          </summary>
          <div className="penjelasan-content">
            <ul className="penjelasan-points">
              <li>
                <strong>Branch:</strong> Cabang kerja mandiri untuk mengembangkan fitur baru secara terisolasi tanpa mengganggu kode utama.
              </li>
              <li>
                <strong>Merge:</strong> Proses penggabungan riwayat komit dari satu branch ke branch tujuan.
              </li>
              <li>
                <strong>Pull Request:</strong> Mekanisme peninjauan kode dan diskusi sebelum branch digabungkan ke cabang utama pada platform seperti GitHub.
              </li>
              <li>
                <strong>Merge Conflict:</strong> Kondisi saat dua branch mengubah baris kode yang sama, sehingga pengembang harus menyelesaikannya secara manual.
              </li>
            </ul>
          </div>
        </details>

        <details className="penjelasan-item">
          <summary className="penjelasan-summary">
            npm (Node Package Manager)
          </summary>
          <div className="penjelasan-content">
            <ul className="penjelasan-points">
              <li>
                <strong>package.json:</strong> Berkas manifes proyek yang mencatat metadata aplikasi, dependensi pustaka, dan perintah skrip eksekusi.
              </li>
              <li>
                <strong>scripts:</strong> Pintasan perintah terminal yang didefinisikan untuk mempermudah alur kerja, seperti <code>npm run dev</code> atau <code>npm run build</code>.
              </li>
              <li>
                <strong>dependencies vs devDependencies:</strong> Dependensi utama dibutuhkan saat aplikasi berjalan di lingkungan produksi (runtime, contohnya React), sedangkan dependensi dev hanya dipakai selama proses pengembangan (misalnya TypeScript, Vite, dan ESLint).
              </li>
              <li>
                <strong>Semantic Versioning (^ dan ~):</strong> Format penomoran versi MAJOR.MINOR.PATCH. Simbol caret (<code>^</code>) mengizinkan pembaruan minor dan patch yang kompatibel ke belakang, sedangkan simbol tilde (<code>~</code>) hanya mengizinkan pembaruan tingkat patch perbaikan kutu (bug).
              </li>
            </ul>
          </div>
        </details>

        <details className="penjelasan-item">
          <summary className="penjelasan-summary">
            TypeScript
          </summary>
          <div className="penjelasan-content">
            <ul className="penjelasan-points">
              <li>
                <strong>Primitive types:</strong> Tipe data mendasar bawaan seperti <code>string</code> untuk teks, <code>number</code> untuk angka, dan <code>boolean</code> untuk nilai kebenaran.
              </li>
              <li>
                <strong>Array:</strong> Tipe penampung sekumpulan data bertipe seragam, seperti <code>Tugas[]</code>.
              </li>
              <li>
                <strong>Interface:</strong> Kontrak bentuk objek yang dapat diperluas, mendefinisikan nama properti dan tipe data tiap field (seperti struktur <code>Tugas</code>).
              </li>
              <li>
                <strong>Type alias dan union type:</strong> Memberikan nama alias pada tipe data, serta memanfaatkan union (<code>|</code>) untuk membatasi opsi nilai, misalnya <code>type Status = 'Belum Selesai' | 'Selesai'</code>.
              </li>
              <li>
                <strong>Generics:</strong> Parameter tipe agar fungsi atau struktur data dapat digunakan ulang dengan tipe yang fleksibel dan tetap aman, contohnya <code>muatDariStorage&lt;T&gt;(kunci): T | null</code>.
              </li>
            </ul>
          </div>
        </details>

        <details className="penjelasan-item">
          <summary className="penjelasan-summary">
            Vite & Arsitektur Build
          </summary>
          <div className="penjelasan-content">
            <ul className="penjelasan-points">
              <li>
                <strong>Vite:</strong> Alat build frontend modern yang menggunakan modul ES native peramban untuk server pengembangan berkecepatan tinggi.
              </li>
              <li>
                <strong>Compiler (tsc):</strong> Bertugas memeriksa kesesuaian tipe data TypeScript (type check) secara menyeluruh sebelum proses build.
              </li>
              <li>
                <strong>Transpiler (esbuild):</strong> Mengubah kode TypeScript dan JSX menjadi JavaScript modern dengan performa tinggi pada fase pengembangan.
              </li>
              <li>
                <strong>Bundler (Rollup):</strong> Menggabungkan dan mengoptimasi seluruh modul menjadi berkas statis siap produksi saat menjalankan <code>npm run build</code>.
              </li>
            </ul>
          </div>
        </details>

        <details className="penjelasan-item">
          <summary className="penjelasan-summary">
            Environment Variables
          </summary>
          <div className="penjelasan-content">
            <ul className="penjelasan-points">
              <li>
                <strong>.env:</strong> Berkas lokal penyimpan nilai konfigurasi lingkungan yang tidak boleh dibagikan ke repositori publik.
              </li>
              <li>
                <strong>.env.example:</strong> Berkas templat dokumentasi berisi daftar nama variabel lingkungan yang dibutuhkan tanpa mencantumkan nilai rahasia.
              </li>
              <li>
                <strong>Awalan VITE_:</strong> Ketentuan khusus Vite agar variabel lingkungan dapat diakses di sisi peramban klien melalui <code>import.meta.env</code>. Variabel tanpa awalan ini dijaga tetap privat di sisi server tooling.
              </li>
              <li>
                <strong>Tidak untuk data rahasia:</strong> Kode frontend dikirim utuh ke peramban pengguna, sehingga seluruh variabel berawalan <code>VITE_</code> dapat dilihat oleh publik dan tidak boleh digunakan untuk menyimpan kata sandi atau kunci privat API.
              </li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  )
}

