import { Question } from '../types';

export const QUESTIONS_BANK: Question[] = [
  {
    id: 1,
    topic: 'Dekomposisi',
    contextText: 'Pak Budi seorang guru Informatika ingin mengajak siswa kelas 7 membuat proyek website sederhana profil sekolah. Karena proyek tersebut terasa sangat besar dan rumit bagi pemula, Pak Budi meminta siswa membagi proyek tersebut menjadi bagian-bagian kecil: mengumpulkan foto, menulis profil guru, menyusun jadwal pelajaran, dan membuat halaman kontak.',
    question: 'Tindakan memecah masalah yang kompleks atau besar menjadi bagian-bagian yang lebih kecil dan lebih mudah dikelola seperti yang dilakukan siswa di atas merupakan penerapan dari pilar berpikir komputasional yaitu...',
    options: [
      { key: 'A', text: 'Dekomposisi (Decomposition)' },
      { key: 'B', text: 'Pengenalan Pola (Pattern Recognition)' },
      { key: 'C', text: 'Abstraksi (Abstraction)' },
      { key: 'D', text: 'Algoritma (Algorithm Design)' }
    ],
    correctAnswer: 'A',
    explanation: 'Dekomposisi adalah proses memecah masalah atau sistem yang rumit menjadi bagian-bagian yang lebih kecil sehingga lebih mudah dipahami dan diselesaikan.'
  },
  {
    id: 2,
    topic: 'Pengenalan Pola',
    contextText: 'Setiap pagi, Danu mencatat suhu udara di laboratorium komputer: Senin 24°C, Selasa 25°C, Rabu 24°C, Kamis 25°C, dan Jumat 24°C. Danu memperhatikan bahwa suhu selalu berkisar antara 24°C hingga 25°C saat pendingin ruangan dinyalakan pada level 2.',
    question: 'Kemampuan Danu melihat kesamaan atau kecenderungan data yang berulang tersebut dalam berpikir komputasional disebut...',
    options: [
      { key: 'A', text: 'Abstraksi' },
      { key: 'B', text: 'Pengenalan Pola (Pattern Recognition)' },
      { key: 'C', text: 'Dekomposisi' },
      { key: 'D', text: 'Debugging' }
    ],
    correctAnswer: 'B',
    explanation: 'Pengenalan pola adalah kemampuan mengenali kesamaan, keteraturan, tren, atau pola yang muncul dari data atau masalah sebelumnya.'
  },
  {
    id: 3,
    topic: 'Abstraksi',
    contextText: 'Ketika kalian membuka aplikasi Google Maps untuk mencari rute perjalanan dari rumah ke SMP Negeri terdekat, aplikasi hanya menampilkan nama jalan utama, arah belokan, dan perkiraan waktu tempuh. Aplikasi tidak menampilkan warna cat setiap rumah atau jenis pohon di pinggir jalan.',
    question: 'Mengapa Google Maps menyembunyikan detail seperti warna cat rumah dan hanya menampilkan informasi penting perjalanan? Konsep berpikir komputasional apa yang diterapkan?',
    options: [
      { key: 'A', text: 'Dekomposisi, karena membagi peta per kecamatan' },
      { key: 'B', text: 'Abstraksi, karena menyaring detail yang tidak penting dan fokus pada informasi utama' },
      { key: 'C', text: 'Algoritma, karena mobil berjalan sesuai rute' },
      { key: 'D', text: 'Pengenalan pola, karena semua jalan berwarna abu-abu' }
    ],
    correctAnswer: 'B',
    explanation: 'Abstraksi adalah proses menyaring atau membuang rincian yang tidak penting dan hanya mempertahankan informasi penting yang relevan untuk memecahkan masalah.'
  },
  {
    id: 4,
    topic: 'Algoritma',
    contextText: 'Rani ingin membuat resep teh manis hangat untuk tamu sekolah. Langkah-langkahnya:\n1. Rebus air hingga mendidih.\n2. Masukkan kantong teh ke dalam cangkir.\n3. Tuangkan air panas ke dalam cangkir.\n4. Tambahkan 2 sendok teh gula pasir.\n5. Aduk hingga gula larut sempurna.\n6. Sajikan selagi hangat.',
    question: 'Urutan langkah-langkah logis dan terstruktur yang disusun Rani untuk menyelesaikan pekerjaan tersebut dinamakan...',
    options: [
      { key: 'A', text: 'Algoritma' },
      { key: 'B', text: 'Abstraksi' },
      { key: 'C', text: 'Dekomposisi' },
      { key: 'D', text: 'Pseudocode acak' }
    ],
    correctAnswer: 'A',
    explanation: 'Algoritma adalah langkah-langkah terurut, logis, dan terencana untuk menyelesaikan suatu permasalahan atau mencapai suatu tujuan.'
  },
  {
    id: 5,
    topic: 'Dekomposisi',
    contextText: 'Sebuah robot vacuum cleaner dirancang untuk membersihkan ruangan kelas. Saat mulai bekerja, sistem robot membagi tugas: (1) Deteksi batas dinding, (2) Deteksi kotoran di lantai, (3) Jalankan motor penyedot, (4) Kembali ke docking stasiun saat baterai lemah.',
    question: 'Pembagian kerja sistem robot ke dalam 4 modul fungsi tersebut merupakan contoh nyata dari...',
    options: [
      { key: 'A', text: 'Pengenalan Pola' },
      { key: 'B', text: 'Abstraksi' },
      { key: 'C', text: 'Dekomposisi' },
      { key: 'D', text: 'Perulangan tanpa henti' }
    ],
    correctAnswer: 'C',
    explanation: 'Dekomposisi memecah sistem kompleks robot vacuum cleaner menjadi sub-sistem yang lebih terorganisir.'
  },
  {
    id: 6,
    topic: 'Pengenalan Pola',
    contextText: 'Perhatikan deret bilangan berikut:\n3, 6, 12, 24, 48, ...\nSeorang siswa diminta menentukan angka berikutnya dengan menemukan pola perubahan antar bilangan.',
    question: 'Berdasarkan pola yang kalian kenali, berapakah angka berikutnya pada deret tersebut?',
    options: [
      { key: 'A', text: '72' },
      { key: 'B', text: '96' },
      { key: 'C', text: '84' },
      { key: 'D', text: '60' }
    ],
    correctAnswer: 'B',
    explanation: 'Polanya adalah setiap bilangan dikalikan 2 (3*2=6, 6*2=12, 12*2=24, 24*2=48, 48*2=96).'
  },
  {
    id: 7,
    topic: 'Abstraksi',
    contextText: 'Seorang dokter anak mendengarkan detak jantung pasien menggunakan stetoskop, mengukur suhu tubuh pasien dengan termometer, dan menanyakan keluhan rasa sakit. Dokter tidak perlu tahu hobi pasien atau merk sepatu yang sedang dipakai pasien.',
    question: 'Sikap dokter yang hanya fokus pada data kesehatan vital pasien dan mengabaikan informasi merk sepatu atau hobi adalah contoh...',
    options: [
      { key: 'A', text: 'Abstraksi' },
      { key: 'B', text: 'Dekomposisi' },
      { key: 'C', text: 'Algoritma' },
      { key: 'D', text: 'Instruksi' }
    ],
    correctAnswer: 'A',
    explanation: 'Dokter melakukan abstraksi dengan mengabaikan atribut yang tidak relevan (sepatu, hobi) dan mempertahankan informasi esensial (suhu, detak jantung, keluhan).'
  },
  {
    id: 8,
    topic: 'Algoritma',
    contextText: 'Perhatikan instruksi berikut:\nLangkah 1: Ambil buku di atas meja.\nLangkah 2: Buka halaman 25.\nLangkah 3: Jika pada halaman 25 terdapat gambar Monas, catat judul gambar tersebut.\nLangkah 4: Jika tidak ada gambar Monas, balik ke halaman berikutnya dan ulangi pemeriksaan hingga ditemukan.',
    question: 'Instruksi yang memuat syarat "Jika... maka..." seperti di atas dalam algoritma disebut dengan struktur...',
    options: [
      { key: 'A', text: 'Runtunan (Sequence)' },
      { key: 'B', text: 'Percabangan / Pemilihan (Branching/Selection)' },
      { key: 'C', text: 'Penyimpanan data (Storage)' },
      { key: 'D', text: 'Pengacakan (Randomizer)' }
    ],
    correctAnswer: 'B',
    explanation: 'Struktur percabangan (selection) digunakan ketika langkah yang diambil tergantung pada suatu kondisi/syarat tertentu (benar atau salah).'
  },
  {
    id: 9,
    topic: 'Representasi Data',
    contextText: 'Di dunia komputer, semua data digital (teks, gambar, audio) pada akhirnya disimpan dan diproses dalam bentuk sistem bilangan biner yang hanya terdiri atas dua simbol angka, yaitu 0 dan 1 (saklar mati atau hidup).',
    question: 'Berapakah nilai desimal dari bilangan biner 1010₂?',
    options: [
      { key: 'A', text: '8' },
      { key: 'B', text: '10' },
      { key: 'C', text: '12' },
      { key: 'D', text: '14' }
    ],
    correctAnswer: 'B',
    explanation: '1010₂ = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰) = 8 + 0 + 2 + 0 = 10.'
  },
  {
    id: 10,
    topic: 'Representasi Data',
    contextText: 'Seorang siswa ingin mengubah bilangan desimal 13 menjadi bilangan biner untuk dimasukkan ke modul simulasi logika komputer.',
    question: 'Bentuk representasi bilangan biner dari 13 adalah...',
    options: [
      { key: 'A', text: '1101₂' },
      { key: 'B', text: '1011₂' },
      { key: 'C', text: '1110₂' },
      { key: 'D', text: '1001₂' }
    ],
    correctAnswer: 'A',
    explanation: '13 = 8 + 4 + 1 = (1×2³) + (1×2²) + (0×2¹) + (1×2⁰) = 1101₂.'
  },
  {
    id: 11,
    topic: 'Dekomposisi',
    contextText: 'Di laboratorium komputer SMP, ada 3 komputer yang tidak dapat terhubung ke internet. Teknisi sekolah membagi pemeriksaan menjadi:\n1. Cek kabel LAN dan colokan RJ45.\n2. Cek konfigurasi IP Address pada Windows.\n3. Cek lampu indikator pada Switch/Hub.\n4. Cek sambungan modem ke ISP.',
    question: 'Strategi teknisi sekolah memeriksa masalah koneksi internet langkah demi langkah pada komponen-komponennya menerapkan pilar...',
    options: [
      { key: 'A', text: 'Dekomposisi' },
      { key: 'B', text: 'Representasi String' },
      { key: 'C', text: 'Abstraksi Peta' },
      { key: 'D', text: 'Pengurutan Bubble' }
    ],
    correctAnswer: 'A',
    explanation: 'Teknisi mengurai masalah koneksi internet yang luas menjadi bagian-bagian perangkat fisik, pengaturan IP, switch, dan modem.'
  },
  {
    id: 12,
    topic: 'Pengenalan Pola',
    contextText: 'Seorang siswa mengamati lampu lalu lintas (traffic light) di perempatan jalan:\n- Merah menyala selama 40 detik\n- Kuning menyala selama 4 detik\n- Hijau menyala selama 30 detik\nSiklus ini berulang terus menerus sepanjang hari.',
    question: 'Jika saat ini lampu hijau baru saja mati dan berganti kuning, maka lampu apa yang akan menyala 4 detik berikutnya?',
    options: [
      { key: 'A', text: 'Lampu Hijau lagi' },
      { key: 'B', text: 'Lampu Merah' },
      { key: 'C', text: 'Lampu Kuning berkedip' },
      { key: 'D', text: 'Semua lampu padam' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan pola standar siklus lampu lalu lintas, setelah lampu kuning selesai menyala, lampu merah akan menyala.'
  },
  {
    id: 13,
    topic: 'Abstraksi',
    contextText: 'Toko Buku "Cerdas Pintar" membuat sistem basis data buku. Informasi yang dicatat petugas perpustakaan: Judul Buku, Pengarang, Tahun Terbit, Jumlah Halaman, dan Kategori Rak. Petugas tidak mencatat jenis font yang dipakai di dalam buku atau ketebalan kertas per lembar.',
    question: 'Keputusan hanya mencatat informasi pokok buku dan tidak mencatat ketebalan kertas adalah prinsip...',
    options: [
      { key: 'A', text: 'Abstraksi' },
      { key: 'B', text: 'Algoritma percabangan' },
      { key: 'C', text: 'Pengenalan Pola' },
      { key: 'D', text: 'Kompilasi' }
    ],
    correctAnswer: 'A',
    explanation: 'Abstraksi memilih atribut esensial (Judul, Pengarang, Tahun) dan mengabaikan atribut teknis minor yang tidak dibutuhkan sistem perpustakaan.'
  },
  {
    id: 14,
    topic: 'Algoritma',
    contextText: 'Seorang bebras (berang-berang) ingin menyeberangi sungai melewati batu loncatan bernomor 1 sampai 5. Aturannya:\n- Mulai dari batu 1.\n- Setiap melompat, ia hanya boleh maju 1 langkah atau 2 langkah ke depan.\n- Batu nomor 3 licin dan tidak boleh diinjak.',
    question: 'Berapakah rute lompatan paling sedikit (minimum lompatan) yang bisa dilalui bebras dari batu 1 sampai ke batu 5 tanpa menginjak batu 3?',
    options: [
      { key: 'A', text: '2 kali lompatan (1 -> 2 -> 4 -> 5 tidak mungkin, yang benar: 1 -> 2 lalu 2 -> 4 lalu 4 -> 5 = 3 lompatan)' },
      { key: 'B', text: '3 kali lompatan (1 -> 2 -> 4 -> 5)' },
      { key: 'C', text: '4 kali lompatan (1 -> 2 -> 3 -> 4 -> 5)' },
      { key: 'D', text: '5 kali lompatan' }
    ],
    correctAnswer: 'B',
    explanation: 'Karena batu 3 tidak boleh diinjak, lompatan pertama dari 1 ke 2 (1 langkah), dari 2 melompat 2 langkah ke 4 (melewati 3), lalu dari 4 melompat 1 langkah ke 5. Total 3 lompatan.'
  },
  {
    id: 15,
    topic: 'Representasi Data',
    contextText: 'Sebuah gambar hitam-putih sederhana berukuran 4x4 piksel direpresentasikan dengan kode biner: 0 untuk piksel putih dan 1 untuk piksel hitam. Jika baris pertama memiliki gambar: [Hitam, Putih, Hitam, Putih].',
    question: 'Bagaimanakah representasi kode biner untuk baris pertama tersebut?',
    options: [
      { key: 'A', text: '1 0 1 0' },
      { key: 'B', text: '0 1 0 1' },
      { key: 'C', text: '1 1 0 0' },
      { key: 'D', text: '0 0 1 1' }
    ],
    correctAnswer: 'A',
    explanation: 'Hitam = 1, Putih = 0. Urutan: Hitam, Putih, Hitam, Putih direpresentasikan sebagai 1 0 1 0.'
  },
  {
    id: 16,
    topic: 'Algoritma',
    contextText: 'Terdapat 5 siswa dengan tinggi badan acak yang berdiri di depan kelas: 145 cm, 160 cm, 140 cm, 155 cm, 150 cm. Guru ingin mengurutkan mereka dari yang paling pendek ke yang paling tinggi.',
    question: 'Proses mengurutkan data dari nilai terkecil ke terbesar dalam ilmu komputasi dinamakan...',
    options: [
      { key: 'A', text: 'Searching (Pencarian)' },
      { key: 'B', text: 'Sorting - Ascending (Pengurutan Menaik)' },
      { key: 'C', text: 'Sorting - Descending (Pengurutan Menurun)' },
      { key: 'D', text: 'Filtering (Penyaringan)' }
    ],
    correctAnswer: 'B',
    explanation: 'Sorting Ascending adalah proses menyusun elemen data dari nilai terkecil ke nilai terbesar.'
  },
  {
    id: 17,
    topic: 'Dekomposisi',
    contextText: 'Di era digital, konsep Berpikir Komputasional (Computational Thinking) bukan berarti berpikir seperti robot atau komputer, melainkan...',
    question: 'Pernyataan yang paling tepat mendefinisikan Berpikir Komputasional adalah...',
    options: [
      { key: 'A', text: 'Menghafal semua bahasa pemrograman komputer seperti C++, Python, dan Java' },
      { key: 'B', text: 'Metode memecahkan masalah dengan menerapkan teknik dan konsep yang biasa digunakan ilmuwan komputer' },
      { key: 'C', text: 'Kemampuan merakit komponen motherboard dan CPU komputer dengan cepat' },
      { key: 'D', text: 'Memperbaiki layar monitor komputer yang rusak secara mandiri' }
    ],
    correctAnswer: 'B',
    explanation: 'Computational Thinking adalah proses berpikir untuk merumuskan persoalan dan solusinya secara efektif dengan prinsip-prinsip ilmu komputer.'
  },
  {
    id: 18,
    topic: 'Pengenalan Pola',
    contextText: 'Virus spam email seringkali memiliki ciri-ciri serupa: judul mengandung kata "Selamat Anda Menang Hadiah", pengirim menggunakan alamat aneh, dan meminta mengklik tautan mencurigakan. Sistem filter email Google mengenali ciri-ciri ini dan otomatis memindahkannya ke folder Spam.',
    question: 'Prinsip kerja sistem filter email dalam mengenali ciri-ciri penipuan tersebut merupakan contoh penerapan...',
    options: [
      { key: 'A', text: 'Pengenalan Pola (Pattern Recognition)' },
      { key: 'B', text: 'Dekomposisi Hardware' },
      { key: 'C', text: 'Abstraksi Gambar' },
      { key: 'D', text: 'Konversi Biner' }
    ],
    correctAnswer: 'A',
    explanation: 'Filter spam mempelajari pola dan kesamaan ciri dari ribuan email penipuan untuk mendeteksi email baru yang memiliki pola serupa.'
  },
  {
    id: 19,
    topic: 'Algoritma',
    contextText: 'Andi mencari buku berjudul "Petualangan Si Kancil" di rak perpustakaan sekolah yang berisi 100 buku yang sudah terurut rapi menurut abjad A sampai Z. Alih-alih memeriksa dari buku pertama sampai akhir satu per satu, Andi langsung membuka bagian tengah rak berhuruf "M", lalu mengarahkan pencarian ke sisi kanan karena huruf "P" berada setelah "M".',
    question: 'Metode pencarian cerdas yang membagi dua ruang pencarian tersebut dalam konsep algoritma dikenal dengan istilah...',
    options: [
      { key: 'A', text: 'Linear Search (Pencarian Berurutan)' },
      { key: 'B', text: 'Binary Search (Pencarian Biner)' },
      { key: 'C', text: 'Random Search (Pencarian Acak)' },
      { key: 'D', text: 'Stack LIFO' }
    ],
    correctAnswer: 'B',
    explanation: 'Binary Search adalah algoritma pencarian pada data terurut dengan membagi data menjadi dua bagian berulang-ulang sampai data ditemukan.'
  },
  {
    id: 20,
    topic: 'Abstraksi',
    contextText: 'Berikut adalah empat pilar utama dalam Berpikir Komputasional (Computational Thinking) yang dipelajari di kelas 7 SMP:\n(1) Dekomposisi\n(2) Pengenalan Pola\n(3) Abstraksi\n(4) Algoritma',
    question: 'Jika kamu diminta membuat model simulasi tata surya sederhana dari plastisin di kelas, lalu kamu hanya membuat matahari dan 8 planet utama tanpa membuat jutaan asteroid kecil dan debu antariksa, maka kamu sedang menerapkan pilar...',
    options: [
      { key: 'A', text: 'Dekomposisi' },
      { key: 'B', text: 'Pengenalan Pola' },
      { key: 'C', text: 'Abstraksi' },
      { key: 'D', text: 'Algoritma' }
    ],
    correctAnswer: 'C',
    explanation: 'Membuat model dengan hanya memasukkan objek penting (matahari dan 8 planet) dan mengabaikan jutaan asteroid kecil merupakan proses Abstraksi.'
  }
];
