import { Question } from '../types';

export const QUESTIONS_BANK: Question[] = [
  // =========================================================================
  // BAGIAN 1: 15 SOAL PILIHAN GANDA TUNGGAL (Nomor 1 - 15)
  // =========================================================================
  {
    id: 1,
    type: 'single',
    topic: 'Dekomposisi',
    contextText: 'Ahmad dan timnya ingin membuat sebuah proyek animasi edukasi rambu lalu lintas di aplikasi Scratch. Sebelum mulai menyusun kode, mereka memecah proyek tersebut ke dalam tugas-tugas terpisah: membuat latar panggung jalan raya (backdrop), menggambar mobil dan lampu (sprite), membuat efek suara klakson, dan menyusun kode perintah pergantian lampu.',
    question: 'Tindakan memecah proyek animasi yang rumit menjadi bagian-bagian kecil yang lebih mudah dikerjakan secara mandiri merupakan penerapan pilar berpikir komputasional, yaitu...',
    options: [
      { key: 'A', text: 'Dekomposisi (Decomposition)' },
      { key: 'B', text: 'Pengenalan Pola (Pattern Recognition)' },
      { key: 'C', text: 'Abstraksi (Abstraction)' },
      { key: 'D', text: 'Debugging otomatis' }
    ],
    correctAnswer: 'A',
    explanation: 'Dekomposisi adalah proses memecah masalah, sistem, atau proyek yang besar dan kompleks menjadi komponen-komponen yang lebih kecil agar lebih mudah dikelola dan diselesaikan.'
  },
  {
    id: 2,
    type: 'single',
    topic: 'Pengenalan Pola',
    contextText: 'Ketika mengamati animasi karakter kucing yang sedang berjalan di layar Scratch, Siti melihat bahwa kostum karakter berganti secara berulang setiap 0.2 detik: kostum 1 -> kostum 2 -> kostum 1 -> kostum 2 secara berkesinambungan sehingga tercipta ilusi gerakan melangkah.',
    question: 'Kemampuan Siti mengenali kesamaan dan keteraturan gerakan yang berulang secara terus-menerus tersebut merupakan penerapan pilar...',
    options: [
      { key: 'A', text: 'Abstraksi' },
      { key: 'B', text: 'Pengenalan Pola (Pattern Recognition)' },
      { key: 'C', text: 'Dekomposisi panggung' },
      { key: 'D', text: 'Kompilasi kode' }
    ],
    correctAnswer: 'B',
    explanation: 'Pengenalan pola adalah kemampuan untuk menemukan kesamaan, keteraturan, atau tren yang berulang dalam data atau perilaku suatu sistem.'
  },
  {
    id: 3,
    type: 'single',
    topic: 'Abstraksi',
    contextText: 'Budi sedang merancang game sederhana "Mobil Menghindar Halangan". Pada sprite mobil, Budi hanya menggambar bentuk dasar badan mobil, kaca, dan empat roda. Budi sengaja tidak menggambar baut velg roda, nomor mesin, maupun kabel busi karena hal tersebut tidak mempengaruhi jalannya permainan.',
    question: 'Keputusan Budi untuk membuang rincian yang tidak penting dan hanya fokus pada karakteristik esensial dari mobil dalam berpikir komputasional disebut...',
    options: [
      { key: 'A', text: 'Dekomposisi' },
      { key: 'B', text: 'Abstraksi (Abstraction)' },
      { key: 'C', text: 'Algoritma perulangan' },
      { key: 'D', text: 'Pengenalan pola' }
    ],
    correctAnswer: 'B',
    explanation: 'Abstraksi adalah proses menyaring atau mengabaikan detail-detail yang tidak relevan/tidak penting, serta memusatkan perhatian pada informasi utama yang dibutuhkan untuk memecahkan masalah.'
  },
  {
    id: 4,
    type: 'single',
    topic: 'Algoritma',
    contextText: 'Berikut adalah instruksi gerakan karakter pada Scratch:\n1. Posisikan sprite di koordinat x: 0, y: 0.\n2. Maju sebanyak 10 langkah ke depan.\n3. Tunggu selama 1 detik.\n4. Putar ke kanan sebesar 90 derajat.\n5. Bunyikan suara "meow" hingga selesai.',
    question: 'Rangkaian langkah terstruktur, berurutan, dan logis yang disusun untuk mencapai tujuan tertentu seperti di atas disebut...',
    options: [
      { key: 'A', text: 'Algoritma (Algorithm Design)' },
      { key: 'B', text: 'Abstraksi' },
      { key: 'C', text: 'Dekomposisi' },
      { key: 'D', text: 'Pseudocode acak' }
    ],
    correctAnswer: 'A',
    explanation: 'Algoritma adalah susunan langkah-langkah logis, terurut, dan jelas untuk menyelesaikan suatu masalah atau menjalankan suatu proses dari awal hingga akhir.'
  },
  {
    id: 5,
    type: 'single',
    topic: 'Dekomposisi',
    contextText: 'Dalam merancang game "Pukul Tikus Tanah" (Whack-a-Mole) di Scratch, pemrogram membagi permasalahan menjadi: (1) Mekanisme kemunculan tikus dari lubang, (2) Penghitungan skor saat tikus diklik, dan (3) Penghitung waktu mundur permainan (timer).',
    question: 'Pembagian perancangan game ke dalam 3 modul kerja mandiri tersebut membuktikan pemanfaatan pilar...',
    options: [
      { key: 'A', text: 'Pengenalan Pola' },
      { key: 'B', text: 'Abstraksi' },
      { key: 'C', text: 'Dekomposisi' },
      { key: 'D', text: 'Evaluasi biner' }
    ],
    correctAnswer: 'C',
    explanation: 'Membagi keseluruhan game menjadi modul kemunculan, skor, dan timer merupakan proses dekomposisi.'
  },
  {
    id: 6,
    type: 'single',
    topic: 'Pengenalan Pola',
    contextText: 'Perhatikan susunan nilai bonus skor game berikut:\nLevel 1 = 10 poin\nLevel 2 = 20 poin\nLevel 3 = 40 poin\nLevel 4 = 80 poin\nSeorang siswa diminta memprogram skor bonus untuk Level 5 dengan mengikuti tren pola penggandaan nilai tersebut.',
    question: 'Berdasarkan pengenalan pola perlipatgandaan skor di atas, berapakah skor bonus untuk Level 5?',
    options: [
      { key: 'A', text: '100 poin' },
      { key: 'B', text: '120 poin' },
      { key: 'C', text: '160 poin' },
      { key: 'D', text: '200 poin' }
    ],
    correctAnswer: 'C',
    explanation: 'Polanya adalah nilai selalu dikalikan 2 pada level berikutnya: 10, 20, 40, 80, maka Level 5 = 80 × 2 = 160 poin.'
  },
  {
    id: 7,
    type: 'single',
    topic: 'Abstraksi',
    contextText: 'Saat membuat simulasi game labirin (maze runner), pemain hanya disajikan tampilan jalan lorong putih dan rintangan dinding hitam 2 dimensi. Programmer tidak memodelkan suhu udara di dalam labirin atau kelembaban udara.',
    question: 'Alasan programmer tidak menyertakan data suhu udara dalam game labirin sederhana tersebut adalah...',
    options: [
      { key: 'A', text: 'Menerapkan Abstraksi karena suhu udara tidak mempengaruhi aturan navigasi game' },
      { key: 'B', text: 'Menerapkan Dekomposisi karena labirin terlalu panjang' },
      { key: 'C', text: 'Karena Scratch tidak memiliki tombol stop' },
      { key: 'D', text: 'Karena algoritma perulangan tidak mendukung angka suhu' }
    ],
    correctAnswer: 'A',
    explanation: 'Abstraksi menyaring elemen yang tidak relevan dengan esensi permainan (seperti suhu atau kelembaban pada game 2D labirin) agar program lebih efisien dan fokus.'
  },
  {
    id: 8,
    type: 'single',
    topic: 'Algoritma',
    contextText: 'Pada pemrograman Scratch, terdapat blok kode: "if on edge, bounce" (jika menyentuh tepi panggung, maka memantul). Blok ini memastikan jika posisi sprite sudah mencapai batas panggung, arah geraknya akan dibalikkan.',
    question: 'Dalam konsep algoritma dasar, struktur penentuan langkah berdasarkan kondisi terpenuhi atau tidak terpenuhi tersebut dinamakan struktur...',
    options: [
      { key: 'A', text: 'Runtunan tunggal (Sequence)' },
      { key: 'B', text: 'Percabangan / Pemilihan kondisi (Selection / Branching)' },
      { key: 'C', text: 'Abstraksi data' },
      { key: 'D', text: 'Penghapusan sprite' }
    ],
    correctAnswer: 'B',
    explanation: 'Struktur percabangan (selection/branching) mengevaluasi suatu syarat (kondisi apakah menyentuh tepi), lalu mengeksekusi instruksi khusus jika syarat tersebut bernilai benar.'
  },
  {
    id: 9,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Ketika pertama kali membuka jendela Scratch 3.0, terdapat area jendela di sebelah kanan atas berukuran 480 × 360 piksel tempat sprite beraksi, bergerak, dan menampilkan seluruh hasil karya animasi atau game kalian.',
    question: 'Apakah nama area panggung pertunjukan hasil program pada antarmuka Scratch tersebut?',
    options: [
      { key: 'A', text: 'Stage (Panggung)' },
      { key: 'B', text: 'Scripts Area' },
      { key: 'C', text: 'Block Palette' },
      { key: 'D', text: 'Sound Editor' }
    ],
    correctAnswer: 'A',
    explanation: 'Stage adalah area layar atau panggung di pojok kanan atas Scratch tempat animasi dan game dijalankan serta menampilkan hasil interaksi sprite.'
  },
  {
    id: 10,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Secara default saat kalian membuka proyek baru di Scratch, selalu muncul gambar karakter kucing oranye di tengah panggung yang siap untuk diprogram gerakannya.',
    question: 'Objek, tokoh, gambar, atau karakter yang dapat diberi instruksi perintah di Scratch dinamakan...',
    options: [
      { key: 'A', text: 'Backdrop' },
      { key: 'B', text: 'Sprite' },
      { key: 'C', text: 'Canvas' },
      { key: 'D', text: 'Variable' }
    ],
    correctAnswer: 'B',
    explanation: 'Sprite adalah karakter, objek, atau gambar grafis di Scratch yang dapat dikontrol, dipindahkan, dan diprogram menggunakan blok kode.'
  },
  {
    id: 11,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Tepat di bagian atas Stage (Panggung) terdapat dua tombol kontrol utama. Salah satunya adalah ikon bendera berwarna hijau (Green Flag).',
    question: 'Apakah fungsi utama dari ikon Bendera Hijau (Green Flag) pada antarmuka Scratch?',
    options: [
      { key: 'A', text: 'Menghapus seluruh sprite yang ada di layar' },
      { key: 'B', text: 'Menyimpan proyek ke memori komputer' },
      { key: 'C', text: 'Memulai atau menjalankan skrip program yang telah disusun' },
      { key: 'D', text: 'Mengganti bahasa tampilan antarmuka' }
    ],
    correctAnswer: 'C',
    explanation: 'Bendera Hijau (Green Flag) berfungsi untuk menjalankan atau memulai eksekusi skrip kode yang diawali oleh blok kejadian "when green flag clicked".'
  },
  {
    id: 12,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Di sebelah kanan ikon Bendera Hijau terdapat tombol berbentuk lingkaran berwarna merah dengan gambar segi delapan di dalamnya (Red Stop Sign).',
    question: 'Apakah fungsi dari tombol lingkaran merah tersebut pada aplikasi Scratch?',
    options: [
      { key: 'A', text: 'Menghentikan seluruh skrip program yang sedang berjalan' },
      { key: 'B', text: 'Merekam suara dari mikrofon' },
      { key: 'C', text: 'Mempercepat putaran animasi' },
      { key: 'D', text: 'Mengunci komputer siswa' }
    ],
    correctAnswer: 'A',
    explanation: 'Tombol Stop Merah berfungsi untuk menghentikan seketika semua jalannya skrip, animasi, suara, dan perulangan program yang sedang aktif di Stage.'
  },
  {
    id: 13,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Bagian tengah jendela antarmuka Scratch adalah lembar kerja abu-abu yang paling luas. Di area inilah programmer menyusun, merangkai, dan menempelkan potongan-potongan blok perintah puzzle satu sama lain.',
    question: 'Apakah sebutan untuk lembar kerja perakitan blok kode di bagian tengah Scratch tersebut?',
    options: [
      { key: 'A', text: 'Scripts Area / Code Area (Area Skrip/Kode)' },
      { key: 'B', text: 'Stage Area' },
      { key: 'C', text: 'Sprite Pane' },
      { key: 'D', text: 'Costumes Library' }
    ],
    correctAnswer: 'A',
    explanation: 'Scripts Area (Code Area) adalah ruang kerja luas tempat programmer menaruh, menyusun, dan menghubungkan blok-blok instruksi kode pemrograman secara visual.'
  },
  {
    id: 14,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Di kolom paling kiri Scratch, terdapat menu vertikal yang menampilkan kelompok-kelompok blok kode berdasarkan kategori warna (Motion biru, Looks ungu, Sound merah muda, Events kuning, Control oranye, dsb.).',
    question: 'Bagian antarmuka tempat kumpulan blok perintah tersebut dinamakan...',
    options: [
      { key: 'A', text: 'Block Palette (Palet Blok)' },
      { key: 'B', text: 'Stage Window' },
      { key: 'C', text: 'Sprite Library' },
      { key: 'D', text: 'Backdrop List' }
    ],
    correctAnswer: 'A',
    explanation: 'Block Palette adalah panel menu di sisi kiri yang mengelompokkan dan menyediakan blok-blok kode pemrograman berdasarkan kategorinya.'
  },
  {
    id: 15,
    type: 'single',
    topic: 'Pengenalan Scratch',
    contextText: 'Di pojok kiri atas terdapat 3 tab utama: "Code", "Costumes", dan "Sounds". Jika seorang siswa ingin mengubah warna baju karakter kucing, mengedit gambar, atau menggambar pose baru, tab yang harus dipilih adalah...',
    question: 'Tab manakah yang digunakan untuk mengedit tampilan visual dan pose gambar suatu sprite?',
    options: [
      { key: 'A', text: 'Tab Costumes (Kostum)' },
      { key: 'B', text: 'Tab Sounds (Suara)' },
      { key: 'C', text: 'Tab Code (Kode)' },
      { key: 'D', text: 'Tab Variables' }
    ],
    correctAnswer: 'A',
    explanation: 'Tab Costumes menyediakan alat gambar (Paint Editor) untuk menggambar, mengedit bentuk, mengganti warna, dan membuat variasi pose kostum pada sprite.'
  },

  // =========================================================================
  // BAGIAN 2: 5 SOAL PILIHAN GANDA KOMPLEKS (Pilih lebih dari 1) (Nomor 16 - 20)
  // =========================================================================
  {
    id: 16,
    type: 'complex',
    topic: 'Dekomposisi',
    contextText: 'Seorang siswa SMP ingin merancang game "Penyelamat Ikan di Laut" menggunakan Scratch. Masalah utama yang dihadapi adalah bagaimana membuat game yang interaktif dan menyenangkan.',
    question: 'Pilihlah semua pernyataan berikut yang BENAR merupakan penerapan Dekomposisi dalam pembuatan game Scratch tersebut! (Jawaban benar lebih dari satu)',
    complexOptions: [
      { id: 'c1', text: 'Membagi pembuatan game menjadi: modul kontrol sprite penyelam, modul rintangan hiu, modul penambahan skor, dan modul tampilan akhir Game Over.' },
      { id: 'c2', text: 'Membuat satu blok kode raksasa yang menangani seluruh gerakan tanpa membedakan tugas tiap sprite.' },
      { id: 'c3', text: 'Mengidentifikasi kebutuhan aset visual secara terpisah: latar panggung laut (backdrop), karakter penyelam (sprite 1), dan karakter hiu (sprite 2).' },
      { id: 'c4', text: 'Membuat game tanpa perencanaan dan langsung menyusun kode secara acak.' }
    ],
    correctComplexAnswers: ['c1', 'c3'],
    explanation: 'Dekomposisi memecah proyek game menjadi modul-modul fungsi mandiri (kontrol, rintangan, skor, game over) dan membedah kebutuhan aset panggung serta sprite secara terstruktur.'
  },
  {
    id: 17,
    type: 'complex',
    topic: 'Pengenalan Scratch',
    contextText: 'Antarmuka jendela aplikasi Scratch 3.0 terdiri atas beberapa area utama yang saling terhubung untuk membangun suatu karya komputasi.',
    question: 'Manakah dari komponen-komponen berikut yang merupakan bagian antarmuka utama pada aplikasi Scratch 3.0? (Pilih semua jawaban yang benar)',
    complexOptions: [
      { id: 'c1', text: 'Stage (Panggung penampil hasil program)' },
      { id: 'c2', text: 'Scripts Area (Area kerja menyusun blok kode)' },
      { id: 'c3', text: 'Sprite Pane / Sprite List (Daftar informasi nama, posisi X-Y, ukuran, dan arah sprite)' },
      { id: 'c4', text: 'Compiler Terminal DOS (Layar hitam pengetikan baris teks bahasa C++)' }
    ],
    correctComplexAnswers: ['c1', 'c2', 'c3'],
    explanation: 'Stage, Scripts Area, dan Sprite Pane adalah bagian antarmuka utama Scratch 3.0. Scratch adalah visual block-based language, bukan terminal baris teks DOS/C++.'
  },
  {
    id: 18,
    type: 'complex',
    topic: 'Pengenalan Scratch',
    contextText: 'Blok perintah pada Block Palette Scratch dikelompokkan menurut kategori warna untuk mempermudah pengguna membedakan fungsinya.',
    question: 'Pilihlah pasangan kategori blok Scratch dengan fungsi kerjanya yang BENAR di bawah ini! (Pilih semua jawaban benar)',
    complexOptions: [
      { id: 'c1', text: 'Kategori Motion (Warna Biru): Berisi blok untuk menggerakkan sprite, mengatur posisi koordinat X dan Y, serta memutar arah hadap.' },
      { id: 'c2', text: 'Kategori Looks (Warna Ungu): Berisi blok untuk mengubah tampilan, mengganti kostum, memunculkan balon ucapan "say", dan efek visual.' },
      { id: 'c3', text: 'Kategori Events (Warna Kuning): Berisi blok pemicu kejadian seperti "when green flag clicked" atau "when this sprite clicked".' },
      { id: 'c4', text: 'Kategori Sound (Warna Merah Muda): Berisi blok untuk mematikan komputer dan merusak layar monitor.' }
    ],
    correctComplexAnswers: ['c1', 'c2', 'c3'],
    explanation: 'Motion (biru) mengatur gerak/koordinat, Looks (ungu) mengatur visual/kostum/ucapan, dan Events (kuning) memicu eksekusi kode. Kategori Sound mengatur audio/suara, bukan mematikan komputer.'
  },
  {
    id: 19,
    type: 'complex',
    topic: 'Algoritma',
    contextText: 'Kategori Control (Warna Oranye) pada Scratch memuat blok-blok algoritma dasar yang mengatur alur jalannya eksekusi program.',
    question: 'Manakah dari pernyataan berikut yang BENAR mengenai struktur kontrol algoritma pada Scratch? (Pilih semua jawaban benar)',
    complexOptions: [
      { id: 'c1', text: 'Blok "repeat [10]" menjalankan blok kode di dalamnya sebanyak 10 kali secara teratur (Perulangan tertentu / Loop).' },
      { id: 'c2', text: 'Blok "forever" menjalankan instruksi di dalamnya terus-menerus tanpa henti sampai tombol stop ditekan.' },
      { id: 'c3', text: 'Blok "if <...> then" hanya akan mengeksekusi instruksi di dalamnya jika syarat kondisi bernilai benar (Percabangan / Selection).' },
      { id: 'c4', text: 'Blok "wait [1] seconds" langsung menghapus proyek secara permanen dari komputer.' }
    ],
    correctComplexAnswers: ['c1', 'c2', 'c3'],
    explanation: 'Repeat, forever, dan if-then adalah implementasi algoritma perulangan dan percabangan pada Scratch. Wait 1 seconds berfungsi menjeda eksekusi selama 1 detik, bukan menghapus proyek.'
  },
  {
    id: 20,
    type: 'complex',
    topic: 'Abstraksi',
    contextText: 'Dalam berpikir komputasional, abstraksi memegang peranan krusial saat menyederhanakan ide dunia nyata menjadi animasi/game digital.',
    question: 'Manakah dari skenario berikut yang mencerminkan penerapan prinsip Abstraksi dengan tepat? (Pilih semua jawaban benar)',
    complexOptions: [
      { id: 'c1', text: 'Menggunakan satu variabel "Skor" berupa angka bulat sederhana untuk mewakili perolehan poin pemain dalam game Scratch.' },
      { id: 'c2', text: 'Membuat latar belakang Stage berupa gambar langit biru dan matahari kartun tanpa perlu menggambar jutaan partikel debu udara.' },
      { id: 'c3', text: 'Mewajibkan pemain game memasukkan seluruh nomor rekening bank orang tua untuk bisa menggerakkan sprite kucing.' },
      { id: 'c4', text: 'Menyederhanakan kontrol kemudi pesawat dalam game menjadi hanya dua tombol panah: Panah Atas untuk naik dan Panah Bawah untuk turun.' }
    ],
    correctComplexAnswers: ['c1', 'c2', 'c4'],
    explanation: 'Abstraksi menyederhanakan variabel skor, gambar latar langit esensial, dan simplifikasi tombol kemudi pesawat. Meminta nomor rekening bank bukanlah abstraksi yang relevan.'
  },

  // =========================================================================
  // BAGIAN 3: 5 SOAL BENAR / SALAH (Nomor 21 - 25)
  // =========================================================================
  {
    id: 21,
    type: 'true_false',
    topic: 'Dekomposisi',
    contextText: 'Evaluasilah pernyataan-pernyataan mengenai 4 Pilar Berpikir Komputasional berikut ini:',
    question: 'Tentukan apakah masing-masing pernyataan berikut bernilai Benar (B) atau Salah (S):',
    trueFalseItems: [
      { id: 'tf1', statement: 'Dekomposisi membantu pemrogram menyelesaikan masalah rumit dengan memecahnya menjadi bagian-bagian yang lebih kecil dan mandiri.', correctAnswer: true },
      { id: 'tf2', statement: 'Menerapkan abstraksi berarti menampilkan seluruh rincian detail tanpa ada satu pun yang disembunyikan atau disaring.', correctAnswer: false },
      { id: 'tf3', statement: 'Algoritma harus memiliki urutan langkah yang jelas, terstruktur, dan tidak bermakna ganda (ambigu).', correctAnswer: true }
    ],
    explanation: 'Dekomposisi memecah masalah jadi kecil (Benar). Abstraksi justru menyaring dan mengabaikan detail yang tidak penting (Salah). Algoritma wajib jelas dan terstruktur (Benar).'
  },
  {
    id: 22,
    type: 'true_false',
    topic: 'Pengenalan Scratch',
    contextText: 'Evaluasilah pernyataan mengenai Stage (Panggung) dan Backdrop pada aplikasi Scratch berikut:',
    question: 'Tentukan apakah masing-masing pernyataan berikut bernilai Benar (B) atau Salah (S):',
    trueFalseItems: [
      { id: 'tf1', statement: 'Stage adalah tempat ditampilkannya hasil animasi, game, dan gerakan sprite yang kita buat.', correctAnswer: true },
      { id: 'tf2', statement: 'Backdrop adalah gambar latar belakang yang terpasang pada Stage di Scratch.', correctAnswer: true },
      { id: 'tf3', statement: 'Stage sama sekali tidak bisa diberi blok kode program karena kode hanya bisa ditaruh di sprite.', correctAnswer: false }
    ],
    explanation: 'Stage adalah panggung penampil (Benar) dan backdrop adalah latarnya (Benar). Stage juga DAPAT diprogram kodenya (misal: mengganti background, memainkan musik latar) sehingga tf3 Salah.'
  },
  {
    id: 23,
    type: 'true_false',
    topic: 'Pengenalan Scratch',
    contextText: 'Evaluasilah pernyataan mengenai Sprite dan Tab Costumes pada aplikasi Scratch berikut:',
    question: 'Tentukan apakah masing-masing pernyataan berikut bernilai Benar (B) atau Salah (S):',
    trueFalseItems: [
      { id: 'tf1', statement: 'Dalam satu proyek Scratch, kita hanya boleh memiliki 1 sprite saja dan tidak bisa menambah sprite baru.', correctAnswer: false },
      { id: 'tf2', statement: 'Sebuah sprite dapat memiliki lebih dari satu kostum untuk menciptakan efek animasi bergerak ketika kostum berganti bergantian.', correctAnswer: true },
      { id: 'tf3', statement: 'Pengguna dapat menggambar sprite sendiri atau memilih gambar dari Sprite Library bawaan Scratch.', correctAnswer: true }
    ],
    explanation: 'Satu proyek Scratch dapat memiliki banyak sprite sekaligus (tf1 Salah). Sprite dapat memiliki banyak kostum untuk animasi (tf2 Benar) dan bisa digambar atau diambil dari library (tf3 Benar).'
  },
  {
    id: 24,
    type: 'true_false',
    topic: 'Pengenalan Scratch',
    contextText: 'Evaluasilah pernyataan mengenai kontrol eksekusi Green Flag dan tombol Stop Merah pada Scratch:',
    question: 'Tentukan apakah masing-masing pernyataan berikut bernilai Benar (B) atau Salah (S):',
    trueFalseItems: [
      { id: 'tf1', statement: 'Mengeklik ikon Bendera Hijau (Green Flag) akan mengaktifkan blok kode "when green flag clicked" untuk memulai jalannya program.', correctAnswer: true },
      { id: 'tf2', statement: 'Tombol Stop berwarna merah berfungsi menghentikan seluruh program yang sedang berjalan di Stage.', correctAnswer: true },
      { id: 'tf3', statement: 'Tombol Stop merah akan menghapus seluruh file proyek yang tersimpan di harddisk komputer.', correctAnswer: false }
    ],
    explanation: 'Bendera hijau memulai program (Benar), tombol stop menghentikan jalannya skrip (Benar), namun tombol stop tidak menghapus file dari harddisk (Salah).'
  },
  {
    id: 25,
    type: 'true_false',
    topic: 'Pengenalan Scratch',
    contextText: 'Evaluasilah pernyataan mengenai penyusunan blok kode pada Scripts Area aplikasi Scratch:',
    question: 'Tentukan apakah masing-masing pernyataan berikut bernilai Benar (B) atau Salah (S):',
    trueFalseItems: [
      { id: 'tf1', statement: 'Penyusunan kode di Scratch dilakukan dengan mengetikkan perintah bahasa mesin baris demi baris menggunakan keyboard.', correctAnswer: false },
      { id: 'tf2', statement: 'Scratch menggunakan sistem blok visual puzzle yang disusun dengan cara drag-and-drop (tarik dan tempel) ke Scripts Area.', correctAnswer: true },
      { id: 'tf3', statement: 'Urutan penempelan blok kode dari atas ke bawah menentukan urutan eksekusi perintah oleh komputer.', correctAnswer: true }
    ],
    explanation: 'Scratch menggunakan pemrograman visual berbasis blok puzzle secara drag-and-drop, bukan mengetik teks kode bahasa mesin (tf1 Salah, tf2 Benar). Urutan blok menentukan alur eksekusi (tf3 Benar).'
  },

  // =========================================================================
  // BAGIAN 4: 5 SOAL MENJODOHKAN (Nomor 26 - 30)
  // =========================================================================
  {
    id: 26,
    type: 'matching',
    topic: 'Dekomposisi',
    contextText: 'Jodohkan 4 Pilar Berpikir Komputasional di sebelah kiri dengan deskripsi pengertian kerjanya yang tepat di sebelah kanan!',
    question: 'Pasangkan pilar berpikir komputasional dengan deskripsi kerjanya:',
    matchingPremises: [
      { id: 'p1', premise: 'Dekomposisi (Decomposition)', correctMatchId: 'm1' },
      { id: 'p2', premise: 'Pengenalan Pola (Pattern Recognition)', correctMatchId: 'm2' },
      { id: 'p3', premise: 'Abstraksi (Abstraction)', correctMatchId: 'm3' },
      { id: 'p4', premise: 'Algoritma (Algorithm Design)', correctMatchId: 'm4' }
    ],
    matchingTargets: [
      { id: 'm1', text: 'Memecah persoalan rumit menjadi sub-bagian kecil yang lebih mudah diselesaikan' },
      { id: 'm2', text: 'Melihat kesamaan, tren, atau keteraturan berulang dari data dan pengalaman' },
      { id: 'm3', text: 'Menyaring dan mengabaikan informasi yang tidak penting untuk fokus pada esensi' },
      { id: 'm4', text: 'Menyusun urutan instruksi langkah demi langkah yang logis untuk solusi' }
    ],
    explanation: 'Dekomposisi = memecah masalah; Pola = mencari kesamaan; Abstraksi = fokus informasi esensial; Algoritma = urutan langkah logis.'
  },
  {
    id: 27,
    type: 'matching',
    topic: 'Pengenalan Scratch',
    contextText: 'Jodohkan nama bagian antarmuka utama Scratch di sebelah kiri dengan fungsi kerjanya di sebelah kanan!',
    question: 'Pasangkan bagian antarmuka Scratch dengan fungsinya:',
    matchingPremises: [
      { id: 'p1', premise: 'Stage (Panggung)', correctMatchId: 'm1' },
      { id: 'p2', premise: 'Scripts Area (Area Kode)', correctMatchId: 'm2' },
      { id: 'p3', premise: 'Block Palette (Palet Blok)', correctMatchId: 'm3' },
      { id: 'p4', premise: 'Sprite Pane (Panel Sprite)', correctMatchId: 'm4' }
    ],
    matchingTargets: [
      { id: 'm1', text: 'Tempat menampilkan hasil animasi, permainan, dan aksi gerak karakter' },
      { id: 'm2', text: 'Lembar kerja luas untuk merangkai dan menempelkan blok-blok kode puzzle' },
      { id: 'm3', text: 'Panel menu penyedia aneka kategori blok perintah warna-warni' },
      { id: 'm4', text: 'Tempat mengelola daftar sprite, melihat koordinat X-Y, ukuran, dan arah hadap' }
    ],
    explanation: 'Stage = layar penampil animasi; Scripts Area = tempat menyusun kode; Block Palette = penyedia blok perintah; Sprite Pane = info & daftar sprite.'
  },
  {
    id: 28,
    type: 'matching',
    topic: 'Pengenalan Scratch',
    contextText: 'Jodohkan Kategori Warna Blok Kode pada Scratch di sebelah kiri dengan contoh jenis perintahnya di sebelah kanan!',
    question: 'Pasangkan kategori blok kode Scratch dengan perintah yang dimuatnya:',
    matchingPremises: [
      { id: 'p1', premise: 'Motion (Warna Biru)', correctMatchId: 'm1' },
      { id: 'p2', premise: 'Looks (Warna Ungu)', correctMatchId: 'm2' },
      { id: 'p3', premise: 'Events (Warna Kuning)', correctMatchId: 'm3' },
      { id: 'p4', premise: 'Control (Warna Oranye)', correctMatchId: 'm4' }
    ],
    matchingTargets: [
      { id: 'm1', text: 'Blok move 10 steps, turn right 15 degrees, dan go to x y' },
      { id: 'm2', text: 'Blok say Hello!, switch costume to, dan change size by' },
      { id: 'm3', text: 'Blok when green flag clicked dan when key space pressed' },
      { id: 'm4', text: 'Blok wait 1 seconds, repeat 10, forever, dan if then' }
    ],
    explanation: 'Motion = gerak (move/turn); Looks = tampilan (say/costume); Events = pemicu kejadian (when flag clicked); Control = struktur alur (wait/repeat/forever/if).'
  },
  {
    id: 29,
    type: 'matching',
    topic: 'Pengenalan Scratch',
    contextText: 'Jodohkan Ikon atau Tombol Antarmuka Scratch di kolom kiri dengan kegunaannya di kolom kanan!',
    question: 'Pasangkan ikon antarmuka Scratch dengan fungsi kerjanya:',
    matchingPremises: [
      { id: 'p1', premise: 'Ikon Bendera Hijau (Green Flag)', correctMatchId: 'm1' },
      { id: 'p2', premise: 'Ikon Lingkaran Merah (Red Stop Sign)', correctMatchId: 'm2' },
      { id: 'p3', premise: 'Tab Costumes (Kostum)', correctMatchId: 'm3' },
      { id: 'p4', premise: 'Ikon Kepala Kucing bertanda "+"', correctMatchId: 'm4' }
    ],
    matchingTargets: [
      { id: 'm1', text: 'Memulai eksekusi skrip program yang telah dibuat' },
      { id: 'm2', text: 'Menghentikan seketika semua jalannya program dan suara' },
      { id: 'm3', text: 'Membuka Paint Editor untuk menggambar atau memodifikasi tampilan karakter' },
      { id: 'm4', text: 'Menambahkan sprite baru dari pustaka (Choose a Sprite)' }
    ],
    explanation: 'Bendera hijau = Start; Tombol merah = Stop; Tab Costumes = Paint editor pose sprite; Ikon kepala kucing + = Menambah sprite baru.'
  },
  {
    id: 30,
    type: 'matching',
    topic: 'Algoritma',
    contextText: 'Jodohkan aktivitas pembuatan proyek animasi di Scratch pada kolom kiri dengan pilar Berpikir Komputasional yang paling tepat di kolom kanan!',
    question: 'Pasangkan aktivitas pembuatan animasi Scratch dengan pilar Berpikir Komputasional yang relevan:',
    matchingPremises: [
      { id: 'p1', premise: 'Menuliskan urutan: saat bendera diklik -> jalan 20 langkah -> putar arah -> bunyikan bel', correctMatchId: 'm1' },
      { id: 'p2', premise: 'Membagi proyek menjadi pembuatan backdrop kota, sprite mobil, dan audio narasi', correctMatchId: 'm2' },
      { id: 'p3', premise: 'Menggunakan blok "forever" karena sprite sayap burung mengepak berulang setiap 0.1 detik', correctMatchId: 'm3' },
      { id: 'p4', premise: 'Menggambar mobil kartun sederhana tanpa menggambar baut roda atau nomor polisi', correctMatchId: 'm4' }
    ],
    matchingTargets: [
      { id: 'm1', text: 'Algoritma (Algorithm Design)' },
      { id: 'm2', text: 'Dekomposisi (Decomposition)' },
      { id: 'm3', text: 'Pengenalan Pola (Pattern Recognition)' },
      { id: 'm4', text: 'Abstraksi (Abstraction)' }
    ],
    explanation: 'Urutan instruksi = Algoritma; Membagi proyek jadi komponen = Dekomposisi; Gerakan berulang berkala = Pola; Mengabaikan detail rumit = Abstraksi.'
  }
];
