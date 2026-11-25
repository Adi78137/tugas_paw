const DESKRIPSI_PRODUK: Record<number, string> = {
  78: 'MacBook Pro 14 Inch Space Grey adalah laptop bertenaga dan ramping dengan chip M1 Pro dari Apple untuk performa luar biasa serta layar Retina yang memukau.',
  79: 'Asus Zenbook Pro Dual Screen adalah laptop berperforma tinggi dengan dua layar yang memberi produktivitas dan fleksibilitas bagi profesional kreatif.',
  80: 'Huawei Matebook X Pro adalah laptop tipis dan stylish dengan layar sentuh resolusi tinggi, memberi pengalaman premium bagi pengguna yang sering bepergian.',
  81: 'Lenovo Yoga 920 adalah laptop konvertibel 2-in-1 dengan engsel fleksibel, sehingga bisa dipakai sebagai laptop atau tablet sesuai kebutuhan.',
  82: 'Dell XPS 13 9300 adalah laptop kompak dan bertenaga dengan layar InfinityEdge nyaris tanpa bingkai serta performa tinggi untuk beragam tugas.',
  99: 'Amazon Echo Plus adalah speaker pintar dengan kendali suara Alexa bawaan. Selain menghasilkan audio berkualitas premium, perangkat ini menjadi pusat kendali perangkat rumah pintar.',
  100: 'Apple AirPods menghadirkan pengalaman audio nirkabel yang praktis. Pemasangan yang mudah, kualitas suara yang baik, dan integrasi Siri membuatnya nyaman dipakai saat bepergian.',
  101: 'Apple AirPods Max Silver adalah headphone over-ear premium dengan kualitas audio tinggi, EQ adaptif, dan peredam bising aktif.',
  102: 'Apple AirPower Wireless Charger memudahkan pengisian daya perangkat Apple yang kompatibel secara nirkabel. Cukup letakkan perangkat di atas bantalan pengisi daya.',
  103: 'Apple HomePod Mini Cosmic Grey adalah speaker pintar kompak yang menghasilkan audio berkualitas dan terintegrasi dengan ekosistem Apple untuk kebutuhan rumah pintar.',
  104: 'Apple iPhone Charger adalah pengisi daya berkualitas tinggi yang dirancang untuk mengisi daya iPhone dengan cepat dan efisien, agar perangkat siap digunakan kapan saja.',
  105: 'Apple MagSafe Battery Pack adalah baterai tambahan yang ringkas dan praktis untuk iPhone yang mendukung MagSafe. Pemasangannya magnetis sehingga terpasang dengan aman.',
  106: 'Apple Watch Series 4 Gold adalah jam tangan pintar yang stylish dan canggih, dengan pemantau detak jantung, pelacakan kebugaran, dan layar Retina yang jernih.',
  107: 'Beats Flex Wireless Earphones menawarkan pengalaman audio yang nyaman dan fleksibel. Dengan earbud magnetis dan baterai hingga 12 jam, perangkat ini cocok untuk pemakaian harian.',
  108: 'iPhone 12 Silicone Case with MagSafe Plum adalah casing silikon pelindung dan stylish untuk iPhone 12. Teknologi MagSafe memudahkan pemasangan aksesori.',
  109: 'Monopod adalah aksesori kamera yang serbaguna untuk pengambilan gambar yang stabil dan dapat diatur. Cocok untuk swafoto, foto bersama, maupun video.',
  110: 'Selfie Lamp with iPhone adalah lampu LED portabel dan dapat diatur untuk membuat swafoto dan panggilan video lebih terang. Lampu ini dipasang pada iPhone agar hasil foto lebih baik.',
  111: 'Selfie Stick Monopod adalah tongkat swafoto yang dapat dipanjangkan dan dilipat untuk mengambil swafoto atau foto bersama. Perangkat ini kompatibel dengan smartphone maupun kamera.',
  112: 'TV Studio Camera Pedestal adalah sistem penopang kamera kelas profesional untuk pergerakan kamera yang halus dan presisi di studio. Cocok untuk kebutuhan siaran dan produksi.',
  121: "iPhone 5s adalah smartphone klasik yang dikenal dengan desain ringkas dan fitur canggih pada masanya. Meski tergolong model lama, perangkat ini masih menawarkan pengalaman pengguna yang andal.",
  122: 'iPhone 6 adalah smartphone yang stylish dan mumpuni dengan layar lebih besar serta performa yang ditingkatkan. Perangkat ini membawa fitur dan desain baru yang menjadikannya pilihan populer pada zamannya.',
  123: 'iPhone 13 Pro adalah smartphone unggulan dengan sistem kamera yang kuat, chip berperforma tinggi, dan layar menakjubkan. Perangkat ini menawarkan fitur canggih bagi pengguna yang menginginkan teknologi terbaik.',
  124: 'iPhone X adalah smartphone andalan dengan layar OLED tanpa bingkai, pengenalan wajah (Face ID), dan performa yang mengesankan. Model ini menjadi tonggak dalam desain dan inovasi iPhone.',
  125: 'Oppo A57 adalah smartphone kelas menengah dengan desain ramping dan fitur yang mumpuni. Perangkat ini menyeimbangkan performa dan harga yang terjangkau.',
  126: 'Oppo F19 Pro Plus adalah smartphone kaya fitur dengan fokus pada kemampuan kamera. Perangkat ini dibekali fitur fotografi canggih dan performa kuat untuk pengalaman premium.',
  127: 'Seri Oppo K1 menawarkan beragam smartphone dengan fitur dan spesifikasi berbeda. Dikenal karena desain modis dan performa andal, seri ini menjawab beragam kebutuhan pengguna.',
  128: 'Realme C35 adalah smartphone ramah anggaran dengan fitur-fitur pokok untuk kebutuhan sehari-hari. Perangkat ini menawarkan performa andal dan pengalaman yang mudah digunakan.',
  129: 'Realme X adalah smartphone kelas menengah dengan desain ramping dan layar yang mengesankan. Perangkat ini menyeimbangkan performa dan kemampuan kamera bagi pengguna yang mencari perangkat berkualitas.',
  130: 'Realme XT adalah smartphone kaya fitur dengan fokus pada teknologi kamera. Sensor kamera canggihnya menghasilkan foto dan video berkualitas tinggi bagi penggemar fotografi.',
  131: 'Samsung Galaxy S7 adalah smartphone andalan dengan desain ramping dan fitur canggih. Perangkat ini memiliki layar resolusi tinggi, kamera kuat, dan performa yang tangguh.',
  132: 'Samsung Galaxy S8 adalah smartphone premium dengan layar Infinity Display yang memukau. Perangkat ini dibekali kemampuan kamera canggih dan teknologi terbaru.',
  133: 'Samsung Galaxy S10 adalah perangkat andalan dengan layar Dynamic AMOLED, sistem kamera serbaguna, dan performa kuat. Model ini merepresentasikan inovasi teknologi smartphone.',
  134: 'Vivo S1 adalah smartphone kelas menengah yang stylish dengan perpaduan desain dan performa. Perangkat ini memiliki layar cerah, sistem kamera mumpuni, dan fungsi yang andal.',
  135: 'Vivo V9 adalah smartphone dengan desain ramping dan fokus pada hasil swafoto berkualitas tinggi. Perangkat ini memakai layar notch, kamera ganda, dan desain modern.',
  136: 'Vivo X21 adalah smartphone premium yang mengutamakan teknologi terbaru. Perangkat ini memiliki sensor sidik jari di layar, layar resolusi tinggi, dan kamera canggih.',
  159: 'iPad Mini 2021 Starlight adalah tablet kompak dan bertenaga dari Apple. Layar Retina, chip seri A yang kuat, dan desain rampingnya menghadirkan pengalaman tablet premium.',
  160: 'Samsung Galaxy Tab S8 Plus Grey adalah tablet Android berperforma tinggi. Layar AMOLED besar, prosesor kuat, dan dukungan S Pen membuatnya nyaman untuk produktivitas maupun hiburan.',
  161: 'Samsung Galaxy Tab White adalah tablet Android yang ramping dan serbaguna. Layar cerah, baterai tahan lama, dan beragam fiturnya mendukung banyak kebutuhan harian.',
}

export function localizeDescription(id: number): string {
  return (
    DESKRIPSI_PRODUK[id] ??
    'Deskripsi produk ini belum tersedia dalam bahasa Indonesia.'
  )
}
