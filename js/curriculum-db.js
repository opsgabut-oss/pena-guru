// Database Kurikulum Merdeka SD/MI sesuai Kemendikdasmen No 13 Tahun 2025
// Memuat materi resmi Buku Teks Utama Kemendikbudristek/Kemendikdasmen serta Muatan Lokal Bahasa Jawa.

const CURRICULUM_DB = {
  "1": {
    "fase": "A",
    "subjects": [
      {
        "id": "indonesia",
        "title": "Bahasa Indonesia - Aku Bisa (Edisi Revisi)",
        "elemen": {
          "Menyimak": "Peserta didik mampu bersikap menjadi penyimak yang baik, memahami instruksi lisan sederhana, dan memaknai informasi dari teks lisan.",
          "Membaca & Memirsa": "Peserta didik mampu membaca kata-kata yang sering ditemui sehari-hari, dan memahami informasi dari bacaan bergambar.",
          "Berbicara & Mempresentasikan": "Peserta didik mampu berbicara dengan santun, mengekspresikan gagasan, dan menceritakan kembali suatu informasi.",
          "Menulis": "Peserta didik mampu menulis huruf, suku kata, kata, dan kalimat sederhana dengan sikap menulis yang benar."
        },
        "chapters": [
          { "no": 1, "title": "Bunyi Apa?", "jp": 42, "topics": ["Bunyi di Sekitar Kita (Bunyi Alam & Buatan)", "Mengenal Huruf Abjad (Vokal & Konsonan)", "Suku Kata bo- dan la-", "Membaca Kata Sederhana", "Menulis Nama Diri Sendiri"] },
          { "no": 2, "title": "Ayo Bermain!", "jp": 40, "topics": ["Permainan Tradisional & Modern", "Kosakata tentang Gerakan & Olahraga", "Mengenal Aturan dalam Bermain", "Kalimat Tanya dan Kalimat Perintah"] },
          { "no": 3, "title": "Awas Kuman!", "jp": 42, "topics": ["Mengenal Kuman & Cara Penyebarannya", "Kebersihan Tubuh (Cuci Tangan & Sikat Gigi)", "Mengenal Suku Kata ka-ke-ki-ko-ku", "Menulis Kalimat Sederhana dengan Huruf Kapital"] },
          { "no": 4, "title": "Aku Bisa!", "jp": 40, "topics": ["Mengenal Hobi dan Keterampilan Diri", "Membaca Grafik/Visual Sederhana", "Menyampaikan Pendapat di Depan Kelas", "Menulis Cerita Pendek tentang Hobi"] },
          { "no": 5, "title": "Teman Baru", "jp": 40, "topics": ["Mengenal Teman Baru di Kelas", "Sikap Sopan Saat Berkenalan", "Kosakata Mengenai Karakter Teman", "Menulis Kalimat Menggunakan Tanda Titik"] },
          { "no": 6, "title": "Berbeda itu Tak Apa", "jp": 40, "topics": ["Mengenal Keberagaman Karakter Fisik", "Sikap Toleransi dan Saling Menghargai", "Menggunakan Kata Hubung 'dan' Serta 'tetapi'", "Menceritakan Kerukunan Teman Sejawat"] },
          { "no": 7, "title": "Aku Ingin", "jp": 40, "topics": ["Kebutuhan vs Keinginan Sederhana", "Kosakata Belanja dan Uang", "Mengidentifikasi Alasan Memilih Sesuatu", "Menyusun Daftar Kebutuhan Sekolah"] },
          { "no": 8, "title": "Di Sekitar Rumah", "jp": 40, "topics": ["Mengenal Lingkungan Tetangga", "Denah Sederhana Arah Rumah", "Kebersihan Lingkungan Sekitar Rumah", "Menulis Kalimat Petunjuk Arah"] }
        ]
      },
      {
        "id": "matematika",
        "title": "Matematika",
        "elemen": {
          "Bilangan": "Peserta didik menunjukkan pemahaman bilangan cacah sampai 100, melakukan operasi penjumlahan dan pengurangan.",
          "Aljabar": "Peserta didik dapat menyelesaikan persamaan sederhana menggunakan gambar, pola gambar, dan pola bilangan.",
          "Pengukuran": "Peserta didik dapat membandingkan panjang dan berat benda secara langsung maupun tidak langsung.",
          "Geometri": "Peserta didik dapat mengenal berbagai bangun ruang dan bangun datar sederhana serta menyusunnya."
        },
        "chapters": [
          { "no": 1, "title": "Ayo Membilang sampai dengan 10", "jp": 24, "topics": ["Menghitung Benda 1 sampai 5", "Menghitung Benda 6 sampai 10", "Membandingkan Jumlah Benda (Lebih Banyak/Sedikit)", "Menulis Angka 0-10", "Pasangan Bilangan"] },
          { "no": 2, "title": "Penjumlahan dan Pengurangan", "jp": 24, "topics": ["Konsep Penjumlahan dengan Gambar", "Operasi Penjumlahan sampai 10", "Konsep Pengurangan dengan Gambar", "Operasi Pengurangan sampai 10", "Soal Cerita Sederhana"] },
          { "no": 3, "title": "Pengukuran Waktu dan Panjang", "jp": 22, "topics": ["Membaca Jam Analogi Sederhana", "Mengukur Panjang dengan Satuan Tidak Baku", "Membandingkan Panjang Benda secara Langsung"] },
          { "no": 4, "title": "Bentuk-Bentuk Bangun", "jp": 22, "topics": ["Mengenal Bangun Ruang (Balok, Kubus, Bola, Tabung)", "Mengenal Bangun Datar (Segitiga, Segiempat, Lingkaran)", "Mengelompokkan Benda Berdasarkan Bentuk"] },
          { "no": 5, "title": "Ayo Membilang sampai dengan 20", "jp": 22, "topics": ["Membaca & Menulis Bilangan 11-20", "Menentukan Nilai Tempat Puluhan & Satuan", "Mengurutkan Bilangan Belasan"] },
          { "no": 6, "title": "Penjumlahan dan Pengurangan Bersusun", "jp": 22, "topics": ["Penjumlahan dengan Menyimpan", "Pengurangan dengan Meminjam", "Menyelesaikan Masalah Penjumlahan di Rumah"] },
          { "no": 7, "title": "Ayo Membilang sampai dengan 100", "jp": 22, "topics": ["Membaca & Menulis Angka 21-100", "Nilai Tempat Puluhan & Satuan 2 Digit", "Membandingkan Bilangan dengan Simbol Lebih Besar/Kecil"] },
          { "no": 8, "title": "Berbagai Diagram", "jp": 22, "topics": ["Mengumpulkan Data Sederhana", "Menyajikan Data dalam Bentuk Tabel Gambar", "Membaca Diagram Gambar Sederhana"] }
        ]
      },
      {
        "id": "pancasila",
        "title": "Pendidikan Pancasila",
        "elemen": {
          "Pancasila": "Peserta didik mampu menyebutkan simbol dan sila-sila Pancasila, serta menceritakan hubungannya.",
          "Undang-Undang Dasar NKRI 1945": "Peserta didik mampu menyebutkan aturan di rumah dan di sekolah secara sederhana.",
          "Bhinneka Tunggal Ika": "Peserta didik mampu menyebutkan identitas dirinya dan karakteristik fisik temannya.",
          "Negara Kesatuan Republik Indonesia": "Peserta didik mampu menyebutkan contoh sikap menjaga persatuan dan gotong royong."
        },
        "chapters": [
          { "no": 1, "title": "Aku Cinta Pancasila", "jp": 36, "topics": ["Simbol Sila Pancasila (Bintang, Rantai, Beringin, Banteng, Padi Kapas)", "Bunyi Sila 1 sampai 5", "Hubungan Simbol dengan Nilai Pancasila", "Penerapan Pancasila dalam Keluarga"] },
          { "no": 2, "title": "Aku Anak yang Patuh Aturan", "jp": 36, "topics": ["Mengenal Aturan di Rumah", "Mengenal Aturan di Sekolah", "Manfaat Mematuhi Aturan", "Akibat Melanggar Aturan"] },
          { "no": 3, "title": "Ayo Memperkenalkan Diri dengan Sopan", "jp": 36, "topics": ["Menyebutkan Identitas Diri (Nama, Umur, Alamat)", "Mengenal Karakteristik Teman Sebaya", "Menghargai Perbedaan Karakter Teman", "Ungkapan Tolong dan Terima Kasih"] },
          { "no": 4, "title": "Aku Cinta Lingkungan Sekitar", "jp": 36, "topics": ["Menjaga Kebersihan Kelas dan Sekolah", "Menjaga Kebersihan Rumah", "Cara Memilah Sampah Sederhana", "Cinta Lingkungan Hidup"] },
          { "no": 5, "title": "Aku Suka Bergotong Royong", "jp": 36, "topics": ["Arti Gotong Royong", "Gotong Royong di Rumah (Membersihkan Kamar)", "Gotong Royong di Sekolah (Piket Kelas)", "Manfaat Bekerja Sama"] }
        ]
      },
      {
        "id": "pai",
        "title": "Pendidikan Agama Islam dan Budi Pekerti (PAI)",
        "elemen": {
          "Al-Qur'an dan Hadis": "Peserta didik mampu melafalkan, menghafal, dan memahami huruf hijaiyah serta surah pendek.",
          "Akidah": "Peserta didik mampu mengenal rukun iman dan Asmaul Husna secara sederhana.",
          "Akhlak": "Peserta didik mampu mempraktikkan akhlak mulia kepada orang tua, guru, dan teman.",
          "Fikih": "Peserta didik mampu memahami tata cara bersuci (wudu) dan salat fardu secara sederhana.",
          "Sejarah Peradaban Islam": "Peserta didik mampu memahami kisah keteladanan para nabi dan rasul secara sederhana."
        },
        "chapters": [
          { "no": 1, "title": "Aku Cinta Al-Qur'an", "jp": 15, "topics": ["Mengenal Huruf Hijaiyah dan Harakatnya", "Membaca Surah Al-Fatihah dengan Tartil", "Mengahafal Surah Al-Ikhlas", "Keutamaan Membaca Al-Qur'an"] },
          { "no": 2, "title": "Mengenal Rukun Iman", "jp": 15, "topics": ["Menghafal 6 Rukun Iman", "Perbedaan Iman dan Islam", "Penerapan Syahadatain"] },
          { "no": 3, "title": "Aku Suka Membaca Basmalah dan Hamdalah", "jp": 14, "topics": ["Membaca Basmalah Sebelum Mulai", "Membaca Hamdalah Setelah Selesai", "Adab Berdoa yang Baik"] },
          { "no": 4, "title": "Mengenal Rukun Islam", "jp": 14, "topics": ["Menghafal 5 Rukun Islam", "Kewajiban Zakat, Puasa, dan Haji", "Penerapan Rukun Islam dalam Kehidupan"] },
          { "no": 5, "title": "Nabi dan Rasul Panutanku", "jp": 14, "topics": ["Kisah Kelahiran Nabi Muhammad SAW", "Sikap Kasih Sayang Nabi kepada Umatnya", "Melafalkan Sholawat Nabi"] },
          { "no": 6, "title": "Al-Qur'an Pedoman Hidupku", "jp": 14, "topics": ["Membaca Surah Pendek Pilihan", "Hukum Tajwid Sederhana", "Menghormati Mushaf Al-Qur'an"] },
          { "no": 7, "title": "Kasih Sayang terhadap Sesama", "jp": 14, "topics": ["Hormat Kepada Orang Tua & Guru", "Saling Membantu Teman Kesulitan", "Menjenguk Teman Sakit", "Menghargai Hewan & Tanaman"] },
          { "no": 8, "title": "Aku Suka Berterima Kasih dan Disiplin", "jp": 15, "topics": ["Mengucapkan Terima Kasih kepada Sesama", "Menerapkan Disiplin Belajar", "Menghargai Waktu Luang"] },
          { "no": 9, "title": "Membiasakan Hidup Bersih", "jp": 14, "topics": ["Pengertian Bersuci (Thaharah)", "Tata Cara Berwudu dengan Tertib", "Mengenal Istinja & Kebersihan Tubuh"] },
          { "no": 10, "title": "Nabi Adam a.s. Manusia Pertama", "jp": 15, "topics": ["Penciptaan Nabi Adam a.s.", "Kisah Nabi Adam di Surga", "Perbuatan Salah & Taubat Nabi Adam"] }
        ]
      },
      {
        "id": "pjok",
        "title": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "elemen": {
          "Keterampilan Gerak": "Peserta didik mempraktikkan keterampilan gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pengetahuan Gerak": "Peserta didik memahami prosedur keterampilan gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pemanfaatan Gerak": "Peserta didik memahami prosedur menjaga kesehatan tubuh and kebugaran.",
          "Pengembangan Karakter": "Peserta didik menunjukkan perilaku bertanggung jawab, kerja sama, dan menghormati perbedaan."
        },
        "chapters": [
          { "no": 1, "title": "Aktivitas Pola Gerak Dasar Lokomotor", "jp": 18, "topics": ["Gerakan Berjalan (Ke Depan, Belakang, Samping)", "Gerakan Berlari dengan Berbagai Arah", "Gerakan Melompat dan Meloncat", "Kombinasi Gerak Lokomotor"] },
          { "no": 2, "title": "Aktivitas Pola Gerak Dasar Nonlokomotor", "jp": 18, "topics": ["Menekuk Lutut dan Siku", "Meliukkan Badan ke Kiri dan Kanan", "Meregangkan Otot Leher dan Lengan", "Memutar Kepala dan Pinggang"] },
          { "no": 3, "title": "Aktivitas Pola Gerak Dasar Manipulatif", "jp": 18, "topics": ["Melempar Bola Menggunakan Tangan Kanan/Kiri", "Menangkap Bola dengan Dua Tangan", "Menendang Bola ke Target", "Memukul Bola Kasti Sederhana"] },
          { "no": 4, "title": "Aktivitas Senam Lantai", "jp": 18, "topics": ["Keseimbangan Berdiri Satu Kaki", "Sikap Kapal Terbang", "Berguling di Atas Matras", "Melompati Rintangan Rendah"] },
          { "no": 5, "title": "Aktivitas Gerak Berirama", "jp": 18, "topics": ["Langkah Kaki Berirama Musik", "Ayunkan Lengan Sesuai Irama", "Senam Gembira Kelompok", "Ketukan Tempo Gerak"] },
          { "no": 6, "title": "Aktivitas Kebugaran Jasmani", "jp": 18, "topics": ["Latihan Kekuatan Otot Tangan (Push-up Dinding)", "Latihan Kelenturan Otot (Meliuk)", "Mengukur Denyut Nadi Sederhana", "Lari Cepat Jarak Pendek"] },
          { "no": 7, "title": "Aktivitas Air (Berenang)", "jp": 18, "topics": ["Pengenalan Air di Kolam Dangkal", "Gerakan Kaki Berpegangan di Pinggir Kolam", "Meluncur Sederhana", "Keselamatan di Sekitar Kolam Renang"] },
          { "no": 8, "title": "Kebersihan Diri dan Hidup Sehat", "jp": 18, "topics": ["Mencuci Tangan Sebelum Makan", "Mandi Dua Kali Sehari", "Memotong Kuku yang Panjang", "Memilih Jajanan yang Sehat"] }
        ]
      },
      {
        "id": "senirupa",
        "title": "Panduan Guru Seni Rupa",
        "elemen": {
          "Mengalami": "Peserta didik mampu mengamati, mengenali, dan mengidentifikasi unsur rupa di lingkungan sekitar.",
          "Menciptakan": "Peserta didik mampu memilih dan menggunakan bahan, alat, dan teknik seni rupa sederhana.",
          "Merefleksikan": "Peserta didik mampu menghargai karya seni rupa sendiri dan orang lain.",
          "Berpikir & Bekerja Artistik": "Peserta didik mampu bereksperimen dengan menggunakan aneka alat dan bahan."
        },
        "chapters": [
          { "no": 1, "title": "Seni di Sekitarku (Garis dan Warna)", "jp": 18, "topics": ["Mengamati Garis Alam (Lurus, Lengkung, Zig-zag)", "Mengenal Warna Primer (Merah, Kuning, Biru)", "Menggambar Bebas Menggunakan Berbagai Garis"] },
          { "no": 2, "title": "Menggambar Bentuk Geometris", "jp": 18, "topics": ["Menggambar Segitiga, Lingkaran, Persegi", "Menyusun Bentuk Geometris Menjadi Gambar Rumah/Mobil", "Mewarnai Karya Seni dengan Harmonis"] },
          { "no": 3, "title": "Kolase dari Bahan Alam", "jp": 18, "topics": ["Mengenal Seni Kolase", "Mengumpulkan Daun Kering dan Ranting", "Menempel Bahan Alam Membentuk Gambar Hewan", "Menjaga Kerapian Karya"] },
          { "no": 4, "title": "Membuat Karya Konstruksi 3D", "jp": 18, "topics": ["Mengenal Bangun Tiga Dimensi", "Membuat Model Rumah dari Kardus Bekas", "Mewarnai Model Rumah Konstruksi", "Mengapresiasi Karya Teman"] },
          { "no": 5, "title": "Membuat Pola Cetak Sederhana", "jp": 18, "topics": ["Mengenal Cetak Tinggi (Stempel)", "Bahan Alami untuk Cetakan (Pelepah Pisang)", "Mencetak Pola Berulang di Kertas"] },
          { "no": 6, "title": "Bermain dengan Warna", "jp": 18, "topics": ["Mengenal Warna Sekunder (Campuran Warna Primer)", "Melukis Gradasi Warna", "Menggunakan Media Basah (Cat Air)"] },
          { "no": 7, "title": "Tekstur dan Bentuk", "jp": 18, "topics": ["Mengenal Tekstur Kasar dan Halus", "Teknik Gosok Kertas di Atas Permukaan Tekstur", "Membuat Tekstur dari Pasir/Serbuk Kayu"] },
          { "no": 8, "title": "Pameran Karya Seni Rupa", "jp": 18, "topics": ["Mengorganisasi Karya Seni Sendiri", "Mengatur Display Karya di Kelas", "Mengapresiasi Hasil Karya Seni Teman Sekelas"] }
        ]
      },
      {
        "id": "english",
        "title": "Bahasa Inggris - My Next Words Grade 1",
        "elemen": {
          "Menyimak - Berbicara": "Peserta didik mampu merespons instruksi lisan kelas, mengekspresikan hobi, dan menyanyikan lagu anak-anak.",
          "Membaca - Memirsa": "Peserta didik mampu memahami teks deskriptif pendek bergambar tentang aktivitas sehari-hari.",
          "Menulis - Mempresentasikan": "Peserta didik mampu menulis kata/frasa bahasa Inggris sederhana tentang warna, angka, dan hewan."
        },
        "chapters": [
          { "no": 1, "title": "How are you?", "jp": 6, "topics": ["Greetings (Hello, Good Morning, How are you?)", "Responses to Greetings", "Classroom Interaction Phrases"] },
          { "no": 2, "title": "Hi, I am Kimi", "jp": 6, "topics": ["Introducing Names (I am Kimi/Cici)", "Asking for Names ('What is your name?')", "Dialogue: Meeting new friends at school"] },
          { "no": 3, "title": "My name is Joshua", "jp": 6, "topics": ["Introducing oneself using 'My name is...'", "Introducing friends using 'This is...'", "Polite expressions of introduction"] },
          { "no": 4, "title": "My number is ten", "jp": 6, "topics": ["Counting numbers 1 to 10", "Asking for numbers ('What is your number?')", "Dialogue: Spelling numbers out loud"] },
          { "no": 5, "title": "I have four books", "jp": 5, "topics": ["Using 'I have...' for objects", "Vocabulary of Classroom Items (Book, Pencil, Bag)", "Counting plural items"] },
          { "no": 6, "title": "My garden is colorful", "jp": 5, "topics": ["Vocabulary of colors (Red, Blue, Green, Yellow)", "Describing flower colors in the garden", "Using 'It is...' for colors"] },
          { "no": 7, "title": "It is a big circle", "jp": 5, "topics": ["Vocabulary of shapes (Circle, Square, Triangle)", "Describing shape sizes (Big & Small)", "Matching objects with shapes"] },
          { "no": 8, "title": "I have pencils", "jp": 5, "topics": ["Singular vs Plural objects (Pencil vs Pencils)", "Expressing ownership", "Asking for items ('May I borrow your...?')"] },
          { "no": 9, "title": "At Cici's farm", "jp": 5, "topics": ["Vocabulary of farm animals (Duck, Chicken, Cow, Horse)", "Expressing animals owned using 'have'", "Counting animals"] },
          { "no": 10, "title": "She is Cici and he is Made", "jp": 6, "topics": ["Using pronouns 'He is...' and 'She is...'", "Describing gender of friends", "Simple character introductions"] },
          { "no": 11, "title": "Aisyah's family", "jp": 6, "topics": ["Vocabulary of family members (Father, Mother, Brother, Sister)", "Describing family members", "Using pronouns 'He has...' and 'She has...'"] },
          { "no": 12, "title": "She has some fruits", "jp": 6, "topics": ["Vocabulary of fruits (Apple, Banana, Mango, Orange)", "Using 'has' and 'have' for fruits owned", "Expressing fruit descriptions"] },
          { "no": 13, "title": "I like fruits", "jp": 6, "topics": ["Expressing food preference using 'like' and 'likes'", "Dialogue: Stating favorite fruits", "Reviewing numbers, colors, and fruits together"] }
        ]
      },
      {
        "id": "jawa",
        "title": "Bahasa Jawa (Muatan Lokal)",
        "elemen": {
          "Menyimak (Ngrungokake)": "Peserta didik mampu menyimak, memahami, dan merespons instruksi lisan sederhana dalam bahasa Jawa (ngoko/krama).",
          "Membaca (Maca)": "Peserta didik mampu membaca kata-kata baru, memahami kalimat pendek, dan memaknai cerita bergambar berbahasa Jawa.",
          "Berbicara (Micara)": "Peserta didik mampu berbicara dengan santun sesuai unggah-ungguh basa Jawa (ngoko/krama) kepada guru dan teman.",
          "Menulis (Nulis)": "Peserta didik mampu menulis kata, kalimat pendek, dan aksara Jawa dasar legena secara benar."
        },
        "chapters": [
          { "no": 1, "title": "Aku (Perkenalan Diri)", "jp": 9, "topics": ["Tepangan / Kenalan nganggo Basa Ngoko", "Mengenal Perangan Awak (Suku, Astha, Sirah)", "Basa Krama Perangan Awak", "Nulis Jenenge Dhewe-dhewe"] },
          { "no": 2, "title": "Kasenenganku (Kesukaanku)", "jp": 9, "topics": ["Nyebutake Kesenengan / Hobi", "Dolanan Tradisional (Egrang, Kelereng)", "Nulis Ukara Kasenengan", "Tembang Dolanan Padhang Wulan"] },
          { "no": 3, "title": "Kegiatanku Saben Dina", "jp": 9, "topics": ["Kegiatan ing Omah (Resik-resik Omah)", "Kegiatan ing Sekolah (Sinau)", "Maca Wacana Kegiatanku", "Matur Nuwun lan Nyuwun Pangapunten"] },
          { "no": 4, "title": "Keluargaku lan Omahku", "jp": 9, "topics": ["Silsilah Kulawarga (Bapak, Ibu, Simbah)", "Ngurmati Wong Tuwa nganggo Basa Krama", "Ngenal Bagean Omah (Soko, Gentheng)", "Nulis Tembung Kulawarga"] },
          { "no": 5, "title": "Pengalamanku Sing Apik", "jp": 9, "topics": ["Cerita Pengalaman Plesir", "Maca Teks Crita Pengalaman", "Nulis Ukara Pengalaman Sederhana", "Nirukake Tokoh ing Crita"] },
          { "no": 6, "title": "Lingkungan Resik lan Sehat", "jp": 9, "topics": ["Resik-resik Kelas", "Mbuwang Larahan ing Panggone", "Maca Geguritan Tema Lingkungan", "Nulis Ukara Pakon Kebersihan"] },
          { "no": 7, "title": "Sato Ingon-Ingon (Kewan)", "jp": 9, "topics": ["Ngenal Jeneng Kewan (Kucing, Pitik, Sapi)", "Nyebutake Swara Kewan Ingon-ingon", "Cara Ngopeni Kewan kanthi Becik", "Maca Dongeng Fabel Kancil"] },
          { "no": 8, "title": "Tembang Dolanan Jawa", "jp": 9, "topics": ["Nembang Cublak-cublak Suweng", "Nyanyi Menthog-menthog", "Arti Moral Tembang Dolanan", "Dolanan Bebarengan ing Njaba Kelas"] }
        ]
      }
    ]
  },
  "2": {
    "fase": "A",
    "subjects": [
      {
        "id": "indonesia",
        "title": "Bahasa Indonesia - Keluargaku Unik (Edisi Revisi)",
        "elemen": {
          "Menyimak": "Peserta didik mampu memahami pesan lisan, informasi dari media audio, dan instruksi sederhana dalam konteks keluarga.",
          "Membaca & Memirsa": "Peserta didik mampu membaca kata-kata baru, memahami puisi anak, dan menceritakan kembali tokoh cerita.",
          "Berbicara & Mempresentasikan": "Peserta didik mampu menceritakan keunikan keluarganya, bertanya jawab dengan sopan, dan berdiskusi kelompok.",
          "Menulis": "Peserta didik mampu menulis paragraf deskriptif pendek tentang keluarga dengan tanda baca yang tepat."
        },
        "chapters": [
          { "no": 1, "title": "Mengenal Perasaan", "jp": 42, "topics": ["Kosakata Tentang Emosi (Takut, Marah, Senang, Sedih)", "Menceritakan Penyebab Munculnya Perasaan", "Menggunakan Kalimat Emosi yang Tepat", "Menulis Jurnal Perasaan Mingguan"] },
          { "no": 2, "title": "Menjaga Kesehatan", "jp": 40, "topics": ["Makanan Sehat vs Jajanan Kurang Sehat", "Kebersihan Gigi dan Mulut", "Membaca Teks Informasi Cara Cuci Tangan", "Menulis Paragraf Prosedur Sederhana"] },
          { "no": 3, "title": "Berhati-hati di Mana Saja", "jp": 42, "topics": ["Rambu Lalu Lintas dan Keselamatan di Jalan", "Menghindari Bahaya Listrik/Api di Rumah", "Menulis Kalimat Peringatan", "Membaca Cerita Fabel bertema Hati-hati"] },
          { "no": 4, "title": "Keluargaku Unik", "jp": 40, "topics": ["Mengenal Anggota Keluarga & Silsilah Keluarga", "Kosakata Hubungan Kekerabatan", "Kata Sifat untuk Menggambarkan Karakter", "Menulis Kalimat Menggunakan Tanda Titik & Koma"] },
          { "no": 5, "title": "Berteman dalam Keragaman", "jp": 40, "topics": ["Sikap Menghargai Perbedaan Fisik & Suku Teman", "Kosakata Keragaman Kebiasaan", "Membaca Nyaring Puisi Teman Baik", "Menulis Surat Persahabatan Sederhana"] },
          { "no": 6, "title": "Bijak Menggunakan Uang", "jp": 40, "topics": ["Mengenal Mata Uang Rupiah", "Konsep Menabung Sejak Dini", "Keinginan vs Kebutuhan Anak", "Membuat Celengan Kreatif dari Botol Bekas"] },
          { "no": 7, "title": "Sayang Lingkungan", "jp": 40, "topics": ["Mengurangi Sampah Plastik", "Kegiatan Kerja Bakti Kelas", "Menulis Paragraf Deskripsi Lingkungan Bersih", "Membaca Teks Dongeng Pelestarian Sungai"] },
          { "no": 8, "title": "Hobi yang Bermanfaat", "jp": 40, "topics": ["Menceritakan Hobi (Menggambar, Berkebun, Membaca)", "Mengidentifikasi Manfaat Hobi bagi Masa Depan", "Membaca Grafik Sederhana Minat Teman", "Menulis Cerita Pendek tentang Hobiku"] }
        ]
      },
      {
        "id": "matematika",
        "title": "Matematika",
        "elemen": {
          "Bilangan": "Peserta didik menunjukkan pemahaman bilangan cacah sampai 100, menentukan nilai tempat puluhan dan satuan, serta melakukan operasi penjumlahan dan pengurangan.",
          "Aljabar": "Peserta didik dapat mengidentifikasi pola bilangan membesar dan mengecil.",
          "Pengukuran": "Peserta didik dapat mengukur panjang dan berat benda menggunakan satuan baku (cm, m, kg, g).",
          "Geometri": "Peserta didik dapat mengidentifikasi unsur-unsur bangun datar (sisi, sudut, titik sudut)."
        },
        "chapters": [
          { "no": 1, "title": "Ayo Membilang sampai dengan 50", "jp": 24, "topics": ["Menulis dan Membaca Bilangan 21-50", "Menentukan Nilai Tempat (Puluhan & Satuan)", "Membandingkan Bilangan dengan Simbol (>, <, =)", "Pola Bilangan Sederhana"] },
          { "no": 2, "title": "Penjumlahan dan Pengurangan", "jp": 24, "topics": ["Penjumlahan Tanpa Menyimpan", "Pengurangan Tanpa Meminjam", "Strategi Menyelesaikan Soal Cerita Matematika"] },
          { "no": 3, "title": "Pengukuran Waktu dan Panjang", "jp": 22, "topics": ["Membaca Jam Analogi (Setengah/Seperempat Jam)", "Menghitung Durasi Hari/Bulan", "Mengukur Panjang Menggunakan Penggaris (cm)", "Mengukur Panjang Menggunakan Meteran Pita (m)"] },
          { "no": 4, "title": "Penjumlahan dan Pengurangan Bersusun", "jp": 22, "topics": ["Penjumlahan Bersusun dengan Menyimpan", "Pengurangan Bersusun dengan Meminjam", "Menghitung Estimasi Hasil Hitung Sederhana"] },
          { "no": 5, "title": "Pecahan", "jp": 22, "topics": ["Konsep Pecahan Setengah (1/2)", "Konsep Pecahan Sepertiga (1/3)", "Konsep Pecahan Seperempat (1/4)", "Mengarsir Gambar Sesuai Nilai Pecahan"] },
          { "no": 6, "title": "Bentuk-Bentuk Bangun", "jp": 22, "topics": ["Ciri-Ciri Bangun Datar (Sisi, Sudut, Titik Sudut)", "Segitiga, Segiempat, dan Lingkaran", "Menyusun Pola Gambar Berulang", "Mengurai Bangun Datar Gabungan"] },
          { "no": 7, "title": "Ayo Membilang sampai dengan 100", "jp": 22, "topics": ["Menulis dan Membaca Bilangan 51-100", "Nilai Tempat Ratusan, Puluhan, Satuan", "Mengurutkan Bilangan sampai 100"] },
          { "no": 8, "title": "Berbagai Diagram", "jp": 22, "topics": ["Mengelompokkan Data Berdasarkan Warna/Bentuk", "Membuat Tabel Frekuensi Sederhana", "Membaca Diagram Batang Bergambar"] }
        ]
      },
      {
        "id": "pancasila",
        "title": "Pendidikan Pancasila",
        "elemen": {
          "Pancasila": "Peserta didik mampu menerapkan nilai-nilai Pancasila di lingkungan sekolah dan rumah.",
          "Undang-Undang Dasar NKRI 1945": "Peserta didik mampu mematuhi kesepakatan kelas dan aturan bersama di sekolah.",
          "Bhinneka Tunggal Ika": "Peserta didik mampu menerima keberagaman sebagai anugerah Tuhan Yang Maha Esa.",
          "Negara Kesatuan Republik Indonesia": "Peserta didik mampu menyebutkan bagian wilayah NKRI secara sederhana (desa/kelurahan)."
        },
        "chapters": [
          { "no": 1, "title": "Pancasila di Sekitarku", "jp": 45, "topics": ["Penerapan Sila Pancasila di Rumah", "Penerapan Sila Pancasila di Sekolah", "Perilaku Gotong Royong dalam Kelas", "Simbol Hubungan Antar Sila"] },
          { "no": 2, "title": "Aturan di Rumah dan di Sekolah", "jp": 45, "topics": ["Mengenal Tata Tertib Sekolah & Rumah", "Manfaat Mematuhi Aturan", "Akibat Melanggar Kesepakatan Kelas", "Melaksanakan Piket Kelas dengan Tanggung Jawab"] },
          { "no": 3, "title": "Aku dan Temanku", "jp": 45, "topics": ["Mengenal Asal-Usul Daerah Teman Sekelas", "Keragaman Agama dan Rumah Ibadah", "Keragaman Karakter Fisik", "Sikap Toleransi Antar Siswa"] },
          { "no": 4, "title": "Aku Peduli Lingkungan", "jp": 45, "topics": ["Mengenal Batas Wilayah Desa/Kelurahan", "Kerukunan Warga RT/RW", "Cinta NKRI dan Simbol Garuda Pancasila", "Aksi Nyata Menjaga Kerukunan Kelas"] }
        ]
      },
      {
        "id": "pai",
        "title": "Pendidikan Agama Islam dan Budi Pekerti (PAI)",
        "elemen": {
          "Al-Qur'an dan Hadis": "Peserta didik melafalkan dan menghafal Surah-surah pendek pilihan dengan tartil.",
          "Akidah": "Peserta didik meyakini Asmaul Husna Al-Kholiq dan Al-Quddus.",
          "Akhlak": "Peserta didik membiasakan hidup bersih, tertib, dan menyayangi sesama makhluk hidup.",
          "Fikih": "Peserta didik mempraktikkan azan, ikamah, dan gerakan salat fardu.",
          "Sejarah Peradaban Islam": "Peserta didik meneladani kisah kepemimpinan nabi dan rasul secara sederhana."
        },
        "chapters": [
          { "no": 1, "title": "Ayo Belajar Al-Qur'an", "jp": 15, "topics": ["Membaca Surah An-Nas dengan Tartil", "Menghafal Surah An-Nas", "Memahami Kandungan Surah An-Nas", "Berlindung Hanya Kepada Allah"] },
          { "no": 2, "title": "Mengenal Asmaul Husna", "jp": 15, "topics": ["Arti Al-Kholiq (Maha Pencipta)", "Bukti Allah SWT Al-Kholiq", "Arti Al-Quddus (Maha Suci)", "Sikap Meneladani Al-Quddus (Menjaga Kebersihan)"] },
          { "no": 3, "title": "Perilaku Kasih Sayang", "jp": 14, "topics": ["Kasih Sayang Nabi Nuh a.s. marang Kewan", "Kisah Kebaikan Nabi Ibrahim a.s.", "Menerapkan Kasih Sayang di Sekolah", "Mencegah Perilaku Kasar"] },
          { "no": 4, "title": "Bersuci dan Berwudu", "jp": 14, "topics": ["Rukun-rukun Wudu", "Mempraktikkan Wudu dengan Benar", "Pengertian Bersuci dari Hadas Kecil"] },
          { "no": 5, "title": "Jalannya Salat Fardu", "jp": 14, "topics": ["Gerakan-gerakan Salat Fardu", "Membaca Bacaan Salat", "Sikap Tertib dalam Salat"] },
          { "no": 6, "title": "Senang Membaca Al-Qur'an", "jp": 14, "topics": ["Membaca Surah Al-Ashr", "Menghafal Surah Al-Ashr", "Kandungan Menghargai Waktu"] },
          { "no": 7, "title": "Mengenal Malaikat Allah", "jp": 14, "topics": ["Nama-Nama Malaikat yang Wajib Diketahui", "Tugas-Tugas Utama Malaikat", "Sikap Iman kepada Malaikat"] },
          { "no": 8, "title": "Perilaku Disiplin dan Jujur", "jp": 15, "topics": ["Disiplin Mengatur Waktu Belajar", "Jujur dalam Mengakui Kesalahan", "Menepati Janji Kepada Teman"] },
          { "no": 9, "title": "Kisah Nabi Nuh a.s.", "jp": 14, "topics": ["Dakwah Nabi Nuh Kepada Kaumnya", "Pembuatan Kapal Besar (Bahtera)", "Pelajaran Sabar Menghadapi Ujian"] },
          { "no": 10, "title": "Kisah Nabi Ibrahim a.s.", "jp": 15, "topics": ["Pencarian Kebenaran Nabi Ibrahim", "Keteguhan Iman Menghadapi Raja Namrud", "Mukjizat Tidak Hangus Terbakar Api"] }
        ]
      },
      {
        "id": "pjok",
        "title": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "elemen": {
          "Keterampilan Gerak": "Peserta didik mempraktikkan variasi gerak dasar lokomotor, non-lokomotor, dan manipulatif secara dinamis.",
          "Pengetahuan Gerak": "Peserta didik memahami prosedur variasi gerak dasar.",
          "Pemanfaatan Gerak": "Peserta didik mempraktikkan latihan kebugaran jasmani untuk menjaga kesehatan.",
          "Pengembangan Karakter": "Peserta didik menunjukkan sikap disiplin, percaya diri, dan kerja sama."
        },
        "chapters": [
          { "no": 1, "title": "Variasi Pola Gerak Dasar Lokomotor", "jp": 18, "topics": ["Melompat Rintangan Rendah", "Lari Zig-zag Melewati Corong", "Kombinasi Berjalan dan Berlari", "Gerakan Meloncat Berpasangan"] },
          { "no": 2, "title": "Variasi Pola Gerak Dasar Nonlokomotor", "jp": 18, "topics": ["Meliuk Mengikuti Simpai", "Menekuk Lutut Menirukan Katak", "Mengayun Lengan Memutar", "Peregangan Otot Pinggang"] },
          { "no": 3, "title": "Variasi Pola Gerak Dasar Manipulatif", "jp": 18, "topics": ["Melempar Bola Pantul", "Menangkap Bola Gulir Tanah", "Menggiring Bola dengan Kaki Bagian Dalam", "Menembak Bola ke Keranjang Sederhana"] },
          { "no": 4, "title": "Aktivitas Senam Lantai", "jp": 18, "topics": ["Berjalan di Atas Papan Titian", "Sikap Lilin dengan Bantuan", "Guling Depan Sederhana", "Meloncat di Tempat"] },
          { "no": 5, "title": "Aktivitas Gerak Berirama", "jp": 18, "topics": ["Senam Irama Menggunakan Gada", "Langkah Kaki Maju Mundur Berirama", "Kombinasi Ayunan Lengan Sesuai Tempo", "Kekompakan Gerakan Kelompok"] },
          { "no": 6, "title": "Aktivitas Kebugaran Jasmani", "jp": 18, "topics": ["Latihan Kelenturan Otot (Meliukkan Badan)", "Latihan Keseimbangan (Sikap Kapal Terbang)", "Latihan Kekuatan (Push-up Dinding)", "Latihan Kelincahan Kelompok"] },
          { "no": 7, "title": "Aktivitas Air (Berenang)", "jp": 18, "topics": ["Berjalan di Air dengan Pegangan", "Mengambil Benda di Dasar Kolam Dangkal", "Meluncur Menggunakan Papan Pelampung", "Aturan Bermain Air yang Aman"] },
          { "no": 8, "title": "Kebersihan Diri dan Pola Hidup Sehat", "jp": 18, "topics": ["Memilih Makanan Bergizi Seimbang", "Pentingnya Istirahat Cukup (Tidur)", "Kebersihan Pakaian dan Alas Kaki", "Menjaga Mata dari Layar Gadget"] }
        ]
      },
      {
        "id": "senirupa",
        "title": "Panduan Guru Seni Rupa",
        "elemen": {
          "Mengalami": "Peserta didik mengamati keindahan bentuk dan warna alam benda.",
          "Menciptakan": "Peserta didik mengekspresikan gagasan melalui lukisan atau kerajinan tangan.",
          "Merefleksikan": "Peserta didik mengapresiasi keunikan karya seni teman sekelas.",
          "Berpikir & Bekerja Artistik": "Peserta didik menggunakan bahan bekas untuk menciptakan karya seni."
        },
        "chapters": [
          { "no": 1, "title": "Menggambar Ekspresi Wajah", "jp": 18, "topics": ["Mengamati Ekspresi Wajah (Senang, Sedih, Marah)", "Proporsi Wajah Sederhana", "Menggambar Potret Diri dengan Warna Ekspresif"] },
          { "no": 2, "title": "Kolase dari Bahan Alam", "jp": 18, "topics": ["Mengenal Teknik Kolase", "Mengumpulkan Daun Kering, Ranting, dan Biji-bijian", "Membuat Kolase Hewan/Tumbuhan", "Mewarnai Background Kolase"] },
          { "no": 3, "title": "Membuat Pola Cetak Sederhana", "jp": 18, "topics": ["Mengenal Cetak Tinggi (Stempel)", "Bahan Alami untuk Cetakan (Pelepah Pisang, Kentang)", "Mencetak Pola Berulang di Kertas", "Membuat Hiasan Pembatas Buku"] },
          { "no": 4, "title": "Kerajinan Clay dari Tepung", "jp": 18, "topics": ["Membuat Adonan Clay Tepung", "Membentuk Miniatur Buah/Binatang", "Pemberian Warna Clay yang Menarik", "Mengeringkan Karya Seni Rupa"] },
          { "no": 5, "title": "Eksplorasi Tekstur dan Warna", "jp": 18, "topics": ["Membuat Gambar Bertekstur Menggunakan Gosokan Kertas", "Mengetahui Campuran Warna Sekunder", "Membuat Hiasan Dinding Sederhana"] },
          { "no": 6, "title": "Membuat Karya Konstruksi 3D", "jp": 18, "topics": ["Mengenal Bangun Tiga Dimensi", "Membuat Model Rumah dari Kardus Bekas", "Mewarnai Model Rumah Konstruksi"] },
          { "no": 7, "title": "Seni Dekoratif Motif Daerah", "jp": 18, "topics": ["Menggambar Pola Hiasan Tradisional", "Mewarnai Motif dengan Krayon/Pensil Warna", "Apresiasi Motif Batik Daerah"] },
          { "no": 8, "title": "Pameran Karya Seni Rupa", "jp": 18, "topics": ["Menyusun Laporan Karya Seni Sederhana", "Mengelompokkan Karya Lukis & Kriya", "Mengapresiasi Hasil Karya Teman Sekelas"] }
        ]
      },
      {
        "id": "english",
        "title": "Bahasa Inggris - My Next Words Grade 2",
        "elemen": {
          "Menyimak - Berbicara": "Peserta didik mampu merespons instruksi lisan kelas, mengekspresikan hobi, dan menyanyikan lagu anak-anak.",
          "Membaca - Memirsa": "Peserta didik mampu memahami teks deskriptif pendek bergambar tentang aktivitas sehari-hari.",
          "Menulis - Mempresentasikan": "Peserta didik mampu menulis kata/frasa bahasa Inggris sederhana tentang warna, angka, dan hewan."
        },
        "chapters": [
          { "no": 1, "title": "Do you like apples?", "jp": 8, "topics": ["Vocabulary of fruits (Apple, Strawberry, Grapes)", "Asking preferences ('Do you like...?')", "Dialogue: Stating likes and dislikes of fruits"] },
          { "no": 2, "title": "My father likes watermelon", "jp": 8, "topics": ["Describing other people's preferences ('He likes...')", "Vocabulary of family members", "Expressing fruit names owned by family members"] },
          { "no": 3, "title": "Where is my pen?", "jp": 7, "topics": ["Vocabulary of classroom items (Pen, Ruler, Eraser)", "Asking for object locations", "Simple dialogues of finding items"] },
          { "no": 4, "title": "How many books are there on the bookshelf?", "jp": 7, "topics": ["Numbers 11 to 20", "Concept of 'There is...' and 'There are...'", "Counting items in the classroom"] },
          { "no": 5, "title": "Where is my pencil?", "jp": 7, "topics": ["Prepositions of place (In, On, Under, Behind)", "Locating pencils and other stationery", "Dialogue: Asking about lost items"] },
          { "no": 6, "title": "It is my family", "jp": 7, "topics": ["Introducing family members (This is my mother)", "Simple family tree descriptions", "Dialogue: Describing family roles"] },
          { "no": 7, "title": "She is my sister", "jp": 7, "topics": ["Using pronouns 'He' and 'She'", "Describing characters of family members", "Polite expressions describing siblings"] },
          { "no": 8, "title": "The elephant is big", "jp": 7, "topics": ["Vocabulary of wild animals (Elephant, Lion, Tiger)", "Describing animal sizes (Big vs Small)", "Using adjectives for animals"] },
          { "no": 9, "title": "The giraffe is tall", "jp": 7, "topics": ["Describing animal heights (Tall vs Short)", "Vocabulary of animal attributes (Long neck, Tail)", "Making simple descriptive sentences"] },
          { "no": 10, "title": "Yummy fried chicken", "jp": 7, "topics": ["Vocabulary of foods and drinks (Fried chicken, Rice, Water)", "Expressing taste/appreciation ('Yummy', 'Delicious')", "Roleplay: Ordering food in a simple way"] }
        ]
      },
      {
        "id": "jawa",
        "title": "Bahasa Jawa (Muatan Lokal)",
        "elemen": {
          "Menyimak (Ngrungokake)": "Peserta didik mampu menyimak, memahami, dan merespons instruksi lisan sederhana dalam bahasa Jawa (ngoko/krama).",
          "Membaca (Maca)": "Peserta didik mampu membaca kata-kata baru, memahami kalimat pendek, dan memaknai cerita bergambar berbahasa Jawa.",
          "Berbicara (Micara)": "Peserta didik mampu berbicara dengan santun sesuai unggah-ungguh basa Jawa (ngoko/krama) kepada guru dan teman.",
          "Menulis (Nulis)": "Peserta didik mampu menulis kata, kalimat pendek, dan aksara Jawa dasar legena secara benar."
        },
        "chapters": [
          { "no": 1, "title": "Pandawa Lima (Tokoh Wayang)", "jp": 9, "topics": ["Ngenal Jeneng-Jeneng Pandhawa Lima", "Karakter utawa Watake Pandhawa", "Nulis Tembung Tokoh Wayang", "Maca Wacana Yudhistira lan Bima"] },
          { "no": 2, "title": "Dolanan ing Lingkungan", "jp": 9, "topics": ["Dolanan Tradisional Jamuran", "Kosa Kata Dolanan Bareng Konco", "Nulis Ukara Dolanan nganggo Basa Ngoko", "Tembang Dolanan Kidang Talun"] },
          { "no": 3, "title": "Tugasku Saben Dina", "jp": 9, "topics": ["Tugas ing Omah (Nyapu, Resik Kasur)", "Maca Wacana Resik-Resik Omah", "Matur Tulung marang Bapak/Ibu nganggo Krama", "Nulis Ukara Tugasku Saben Dina"] },
          { "no": 4, "title": "Kerukunan ing Sekolah", "jp": 9, "topics": ["Rukun marang Konco Kelas", "Basa Krama Matur marang Wong Tuwa nganggo Krama", "Nulis Tembung Krama Sederhana", "Tembang Dolanan Mentok-Mentok"] },
          { "no": 5, "title": "Plesir lan Wisata", "jp": 9, "topics": ["Crita Pengalaman Plesir menyang Kebun Binatang", "Ngenal Jeneng Papan Wisata ing Jawa Tengah", "Nulis Ukara Plesir", "Maca Geguritan Tema Plesir"] },
          { "no": 6, "title": "Ngopeni Kewan lan Tanduran", "jp": 9, "topics": ["Cara Nyiram Kembang ing Sekolah", "Ngopeni Kucing lan Pitik ing Omah", "Maca Teks Crita Dongeng Kancil lan Keyok", "Nulis Tembung Jeneng Tanduran"] },
          { "no": 7, "title": "Gotong Royong ing Desa", "jp": 9, "topics": ["Kerja Bakti ing Lingkungan RT/RW", "Tulung-Tinulung marang Tonggo", "Maca Wacana Gotong Royong", "Nulis Ukara Ajakan Kebersihan"] },
          { "no": 8, "title": "Dongeng Sato lan Tembang", "jp": 9, "topics": ["Maca Dongeng Kewan (Sato)", "Nembang Dolanan Suwe Ora Jamu", "Nulis Piwulang Luhur ing Dongeng", "Dolanan Bebarengan ing Lapangan"] }
        ]
      }
    ]
  },
  "3": {
    "fase": "B",
    "subjects": [
      {
        "id": "indonesia",
        "title": "Bahasa Indonesia - Kawan Seiring (Edisi Revisi)",
        "elemen": {
          "Menyimak": "Peserta didik mampu menganalisis informasi dan ide pokok dari teks lisan dan audio tentang pertemanan.",
          "Membaca & Memirsa": "Peserta didik mampu membaca teks narasi dengan lancar, mencari kata sulit dalam kamus, dan memahami teks instruksi.",
          "Berbicara & Mempresentasikan": "Peserta didik mampu mengemukakan pendapat secara logis, mempresentasikan laporan hasil wawancara.",
          "Menulis": "Peserta didik mampu menulis paragraf narasi dengan ejaan dan tanda baca yang tepat sesuai PUEBI."
        },
        "chapters": [
          { "no": 1, "title": "Kawan Seiring", "jp": 36, "topics": ["Membaca Cerita Pertemanan 'Kawan Seiring'", "Menentukan Unsur Intrinsik Cerita (Tokoh, Latar, Amanat)", "Kosakata tentang Sikap Bersahabat", "Menulis Paragraf Diskusi tentang Kerja Sama"] },
          { "no": 2, "title": "Bekerja Sama dalam Kelompok", "jp": 36, "topics": ["Laporan Wawancara Kerja Bakti Sekolah", "Mengenal Kalimat Aktif dan Kalimat Pasif", "Presentasi Kelompok dengan Percaya Diri", "Menulis Puisi tentang Sahabat"] },
          { "no": 3, "title": "Pengaruh Cuaca", "jp": 36, "topics": ["Mengenal Jenis Cuaca (Cerah, Mendung, Hujan)", "Dampak Cuaca terhadap Kegiatan Manusia", "Membaca Teks Eksplanasi Cuaca Ekstrem", "Menulis Paragraf Eksposisi tentang Cuaca"] },
          { "no": 4, "title": "Senym di Sekitar Kita", "jp": 36, "topics": ["Membaca Cerita Bergambar dengan Intonasi", "Mengidentifikasi Tokoh dalam Fabel Sederhana", "Kosakata tentang Nilai-Nilai Kebaikan Sosial", "Menulis Kalimat Tanya & Kalimat Perintah Resmi"] },
          { "no": 5, "title": "Mengenal Adat Istiadat", "jp": 36, "topics": ["Membaca Teks Deskripsi Upacara Adat Tradisional", "Kosakata Khusus Kebudayaan Daerah", "Mempresentasikan Makanan Khas Asal Daerah", "Menulis Paragraf Deskripsi Rumah Adat"] },
          { "no": 6, "title": "Bergotong Royong", "jp": 36, "topics": ["Pentingnya Kerja Sama di Lingkungan Warga", "Membaca Laporan Hasil Observasi Sederhana", "Diskusi Kelompok Mengenai Piket Sekolah", "Menulis Karangan Narasi Gotong Royong"] },
          { "no": 7, "title": "Sayang Hewan & Tumbuhan", "jp": 36, "topics": ["Membaca Teks Tuntunan Merawat Tanaman Hias", "Dongeng Legenda Perlindungan Hewan", "Menggunakan Awalan 'me-' dan 'di-' yang Benar", "Menulis Catatan Harian Observasi Tumbuhan"] },
          { "no": 8, "title": "Aku Cinta Indonesia", "jp": 36, "topics": ["Membaca Teks Biografi Pahlawan Nasional", "Kosakata Cinta Tanah Air", "Mempresentasikan Peta Wilayah Pulau Indonesia", "Menulis Harapan Anak Indonesia"] }
        ]
      },
      {
        "id": "matematika",
        "title": "Matematika",
        "elemen": {
          "Bilangan": "Peserta didik memahami bilangan cacah sampai 1.000, menentukan nilai tempat ribuan, ratusan, puluhan, satuan, serta melakukan operasi perkalian dan pembagian dasar.",
          "Aljabar": "Peserta didik menyelesaikan persamaan matematika sederhana berpola perkalian.",
          "Pengukuran": "Peserta didik dapat menentukan hubungan antar satuan waktu (jam, menit, detik) dan satuan luas.",
          "Geometri": "Peserta didik mengidentifikasi ciri-ciri segitiga dan segiempat berdasarkan panjang sisi dan besar sudut."
        },
        "chapters": [
          { "no": 1, "title": "Bilangan Cacah sampai 1.000", "jp": 30, "topics": ["Membaca & Menulis Bilangan Tiga Angka", "Nilai Tempat Ribuan, Ratusan, Puluhan, Satuan", "Membandingkan Bilangan Ratusan", "Operasi Penjumlahan & Pengurangan dengan Menyimpan"] },
          { "no": 2, "title": "Penjumlahan & Pengurangan Bersusun", "jp": 30, "topics": ["Penjumlahan Bersusun Pendek dengan 2 Kali Menyimpan", "Pengurangan Bersusun dengan Teknik Meminjam", "Sifat Asosiatif & Komutatif", "Soal Cerita Kompleks Kehidupan"] },
          { "no": 3, "title": "Perkalian dan Pembagian Bilangan", "jp": 30, "topics": ["Konsep Perkalian sebagai Penjumlahan Berulang", "Perkalian Bersusun Kebawah", "Konsep Pembagian sebagai Pengurangan Berulang", "Pembagian Bersusun (Porogapit) Sederhana", "Soal Cerita Matematika"] },
          { "no": 4, "title": "Pecahan Sederhana", "jp": 30, "topics": ["Mengenal Pecahan 1/2, 1/3, 1/4, dan 1/8", "Membandingkan Dua Pecahan Berpembilang Sama", "Membandingkan Dua Pecahan Berpenyebut Sama", "Penjumlahan Pecahan Berpenyebut Sama"] },
          { "no": 5, "title": "Pengukuran Waktu, Panjang, dan Berat", "jp": 30, "topics": ["Konversi Satuan Waktu (Jam, Menit, Detik)", "Mengukur Panjang dengan cm and m", "Mengukur Berat dengan kg, ons, dan gram", "Menyelesaikan Masalah Pengukuran Sehari-hari"] },
          { "no": 6, "title": "Geometri Bangun Datar dan Pola", "jp": 30, "topics": ["Ciri-Ciri Segitiga Sama Sisi & Segitiga Siku-Siku", "Sifat-Sifat Persegi dan Persegi Panjang", "Mengelompokkan Sudut Lancip, Siku-Siku, Tumpul", "Pola Geometris Berulang"] }
        ]
      },
      {
        "id": "pancasila",
        "title": "Pendidikan Pancasila",
        "elemen": {
          "Pancasila": "Peserta didik memahami makna lambang Garuda Pancasila dan perilaku cinta tanah air.",
          "Undang-Undang Dasar NKRI 1945": "Peserta didik mengidentifikasi hak dan kewajibannya di lingkungan sekolah and rumah.",
          "Bhinneka Tunggal Ika": "Peserta didik mengenal keragaman suku bangsa, bahasa, dan pakaian adat di Indonesia.",
          "Negara Kesatuan Republik Indonesia": "Peserta didik memahami batas wilayah kabupaten/kota secara sederhana."
        },
        "chapters": [
          { "no": 1, "title": "Aku Anak Indonesia", "jp": 45, "topics": ["Makna Garuda Pancasila", "Arti Simbol pada Tameng Garuda", "Sikap Kebanggaan sebagai Warga Negara", "Nilai Bhinneka Tunggal Ika"] },
          { "no": 2, "title": "Aturan di Lingkunanku", "jp": 45, "topics": ["Mengenal Aturan di Rumah & Sekolah", "Penerapan Hak Anak di Rumah", "Penerapan Kewajiban Anak di Sekolah", "Akibat Tidak Mematuhi Aturan Bersama"] },
          { "no": 3, "title": "Keragaman Budaya Negeriku", "jp": 45, "topics": ["Mengenal Pakaian Adat di Indonesia", "Mengenal Alat Musik Tradisional", "Sikap Menghargai Bahasa Daerah Lain", "Melestarikan Permainan Tradisional"] },
          { "no": 4, "title": "Kerjasama di Lingkunganku", "jp": 45, "topics": ["Gotong Royong di Lingkungan RT/RW", "Pentingnya Musyawarah dalam Memutuskan Masalah", "Kerjasama Kelompok di Kelas", "Sikap Peduli Terhadap Korban Bencana"] }
        ]
      },
      {
        "id": "pai",
        "title": "Pendidikan Agama Islam dan Budi Pekerti (PAI)",
        "elemen": {
          "Al-Qur'an dan Hadis": "Peserta didik melafalkan, menghafal, dan menulis Surah-surah pendek dengan tartil.",
          "Akidah": "Peserta didik meyakini Asmaul Husna Al-Wahhab dan Al-Khaliq.",
          "Akhlak": "Peserta didik mempraktikkan sikap rendah hati, jujur, dan pemaaf dalam kehidupan sehari-hari.",
          "Fikih": "Peserta didik memahami tata cara salat berjamaah dan berzikir setelah salat.",
          "Sejarah Peradaban Islam": "Peserta didik meneladani perjuangan dakwah nabi dan rasul secara sederhana."
        },
        "chapters": [
          { "no": 1, "title": "Indahnya Berakhlak Terpuji", "jp": 15, "topics": ["Sikap Rendah Hati (Tawadu)", "Sikap Jujur Terhindar dari Dosa", "Sikap Pemaaf Menjalin Silaturahmi", "Kisah Teladan Persahabatan Nabi"] },
          { "no": 2, "title": "Salat Berjamaah Lebih Utama", "jp": 15, "topics": ["Keutamaan Salat Berjamaah", "Syarat Menjadi Imam dan Makmum", "Tata Cara Salat Berjamaah", "Zikir dan Doa Setelah Salat"] },
          { "no": 3, "title": "Membaca Al-Qur'an dengan Benar", "jp": 14, "topics": ["Mengenal Huruf Hijaiyah Bersambung", "Membaca Surah Al-Kautsar", "Menghafal Surah Al-Kautsar", "Hukum Bacaan Mad Thabi'i Sederhana"] },
          { "no": 4, "title": "Asmaul Husna: Al-Wahhab & Al-Kabir", "jp": 14, "topics": ["Arti Al-Wahhab (Maha Pemberi Karunia)", "Bukti Allah Al-Wahhab", "Arti Al-Kabir (Maha Besar)", "Mengagungkan Kebesaran Allah"] },
          { "no": 5, "title": "Kisah Nabi Ibrahim a.s.", "jp": 14, "topics": ["Masa Kecil Nabi Ibrahim a.s.", "Dakwah Nabi Ibrahim Menghancurkan Berhala", "Mukjizat Nabi Ibrahim Tidak Hangus Dibakar", "Pelajaran Keteguhan Tauhid"] },
          { "no": 6, "title": "Iman Kepada Kitab-Kitab Allah", "jp": 14, "topics": ["Mengenal 4 Kitab Suci Allah", "Penerima Kitab-Kitab Allah", "Fungsi Kitab Suci bagi Kehidupan", "Membiasakan Membaca Al-Qur'an Saben Dina"] },
          { "no": 7, "title": "Perilaku Toleransi", "jp": 14, "topics": ["Menghargai Teman Berbeda Agama", "Sikap Saling Tolong Menolong Tanpa Membedakan", "Menjaga Ketenangan Rumah Ibadah Lain", "Kisah Toleransi Piagam Madinah"] },
          { "no": 8, "title": "Tata Cara Salat Duha & Tahajud", "jp": 15, "topics": ["Keutamaan Salat Sunah Duha", "Tata Cara & Niat Salat Duha", "Waktu Pelaksanaan Salat Tahajud", "Doa Setelah Salat Duha"] },
          { "no": 9, "title": "Kisah Nabi Ismail a.s.", "jp": 14, "topics": ["Kisah Kelahiran Nabi Ismail a.s.", "Ketaatan Nabi Ismail Terhadap Perintah Kurban", "Asal-Usul Sumur Zamzam", "Keteladanan Sikap Sabar Anak"] },
          { "no": 10, "title": "Menjaga Lisan dan Berbuat Baik", "jp": 15, "topics": ["Bahaya Berbohong & Menggunjing", "Membiasakan Berkata Baik atau Diam", "Sikap Hormat Kepada Orang Tua & Kerabat", "Pahala Amal Jariah Sederhana"] }
        ]
      },
      {
        "id": "pjok",
        "title": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "elemen": {
          "Keterampilan Gerak": "Peserta didik mempraktikkan keterampilan gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pengetahuan Gerak": "Peserta didik memahami prosedur keterampilan gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pemanfaatan Gerak": "Peserta didik memahami prosedur menjaga kesehatan tubuh dan kebugaran.",
          "Pengembangan Karakter": "Peserta didik menunjukkan perilaku bertanggung jawab, kerja sama, dan menghormati perbedaan."
        },
        "chapters": [
          { "no": 1, "title": "Kombinasi Pola Gerak Dasar Lokomotor", "jp": 18, "topics": ["Kombinasi Gerakan Berjalan dan Berlari", "Kombinasi Berlari dan Melompat", "Aktivitas Lompat Melewati Rintangan", "Permainan Bentengan"] },
          { "no": 2, "title": "Kombinasi Pola Gerak Dasar Nonlokomotor", "jp": 18, "topics": ["Kombinasi Gerakan Menekuk dan Memutar", "Meliukkan Badan Sambil Mengayun Lengan", "Latihan Bertumpu Satu Kaki", "Meregangkan Sendi Tubuh"] },
          { "no": 3, "title": "Kombinasi Pola Gerak Dasar Manipulatif", "jp": 18, "topics": ["Melempar Bola Pantul ke Sasaran", "Menangkap Bola Berbagai Arah", "Menendang Bola dengan Berbagai Bagian Kaki", "Menggiring Bola Melewati Rintangan"] },
          { "no": 4, "title": "Aktivitas Senam Lantai", "jp": 18, "topics": ["Sikap Kayang dengan Bantuan", "Guling Depan Terkendali", "Latihan Keseimbangan Berdiri di Balok Titian", "Melompati Peti Lompat Sederhana"] },
          { "no": 5, "title": "Aktivitas Gerak Berirama", "jp": 18, "topics": ["Langkah Kaki Berirama Ganda", "Ayun Lengan Bersilangan Sesuai Tempo", "Senam SKJ Kelompok Ceria", "Ketukan Tempo Irama Variatif"] },
          { "no": 6, "title": "Aktivitas Kebugaran Jasmani", "jp": 18, "topics": ["Latihan Kekuatan Otot Perut (Sit-up)", "Latihan Kelenturan Otot Pinggul", "Latihan Kelincahan Lari Bolak-balik (Shuttle Run)", "Mengukur Kebugaran Mandiri"] },
          { "no": 7, "title": "Aktivitas Air (Berenang)", "jp": 18, "topics": ["Pengenalan Bernapas di dalam Air", "Gerakan Tungkai Renang di Pinggir Kolam", "Meluncur dengan Bantuan Pelampung", "Keselamatan di Kolam Dangkal"] },
          { "no": 8, "title": "Kebersihan Diri dan Pola Hidup Sehat", "jp": 18, "topics": ["Mengenal Macam Penyakit Menular", "Pencegahan Penyakit dengan Hidup Bersih", "Pola Makan Sehat & Gizi Seimbang", "Istirahat Cukup & Menjaga Kebersihan Kamar"] }
        ]
      },
      {
        "id": "senirupa",
        "title": "Panduan Guru Seni Rupa",
        "elemen": {
          "Mengalami": "Peserta didik mampu mengamati, mengenali, dan mengidentifikasi unsur rupa di lingkungan sekitar.",
          "Menciptakan": "Peserta didik mampu memilih dan menggunakan bahan, alat, dan teknik seni rupa sederhana.",
          "Merefleksikan": "Peserta didik mampu menghargai karya seni rupa sendiri dan orang lain.",
          "Berpikir & Bekerja Artistik": "Peserta didik mampu bereksperimen dengan menggunakan aneka alat dan bahan."
        },
        "chapters": [
          { "no": 1, "title": "Bermain dengan Garis dan Bentuk", "jp": 18, "topics": ["Menggambar Pemandangan dengan Berbagai Garis", "Menggabungkan Garis dan Bidang Menjadi Objek Unik", "Menggambar Pola Hiasan Tradisional"] },
          { "no": 2, "title": "Eksplorasi Tekstur dan Warna", "jp": 18, "topics": ["Membuat Gambar Bertekstur Menggunakan Gosokan Kertas", "Mengetahui Campuran Warna Sekunder", "Membuat Hiasan Dinding Sederhana"] },
          { "no": 3, "title": "Membuat Karya 3D Miniatur", "jp": 18, "topics": ["Membuat Miniatur Hewan dari Plastisin/Clay", "Menyusun Kerajinan Berstruktur Kokoh", "Mewarnai Karya Miniatur", "Pameran Galeri Kelas"] },
          { "no": 4, "title": "Seni Dekoratif Motif Batik", "jp": 18, "topics": ["Menggambar Pola Batik Sederhana", "Mewarnai Batik dengan Pensil Warna/Krayon", "Membuat Desain Kertas Kado Sendiri", "Mengapresiasi Motif Daerah"] },
          { "no": 5, "title": "Seni Cetak Tinggi Sederhana", "jp": 18, "topics": ["Mengenal Konsep Cetak Tinggi (Stempel)", "Bahan Alami untuk Cetakan (Pelepah Pisang, Kentang)", "Mencetak Pola Berulang di Kertas"] },
          { "no": 6, "title": "Menggambar Rumah Impian", "jp": 18, "topics": ["Prinsip Proporsi dan Tata Letak Gambar", "Menggambar Detail Eksterior Rumah", "Pewarnaan Sesuai Gradasi Cahaya"] },
          { "no": 7, "title": "Eksplorasi Anyaman Kertas", "jp": 18, "topics": ["Mengenal Pola Anyaman Dasar (Pola Silang)", "Memotong Kertas Berwarna secara Presisi", "Menganyam Membentuk Keranjang Kecil"] },
          { "no": 8, "title": "Pameran Karya Seni Rupa", "jp": 18, "topics": ["Mengorganisasi Karya Seni Sendiri", "Mengatur Display Karya di Kelas", "Mengapresiasi Hasil Karya Seni Teman Sekelas"] }
        ]
      },
      {
        "id": "ipas",
        "title": "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
        "elemen": {
          "Pemahaman IPAS (Sains & Sosial)": "Peserta didik memahami siklus hidup makhluk hidup, wujud zat dan perubahannya, serta hubungan sosial kemasyarakatan di sekitarnya.",
          "Keterampilan Proses": "Peserta didik mengajukan pertanyaan secara kritis, merencanakan penyelidikan ilmiah sederhana, dan menarik kesimpulan berdasarkan bukti."
        },
        "chapters": [
          { "no": 1, "title": "Mari Kenali Hewan di Sekitar Kita", "jp": 27, "topics": ["Bagian Tubuh Hewan dan Fungsinya", "Pengelompokkan Hewan Berdasarkan Makanannya", "Tempat Hidup Hewan (Darat, Air, Keduanya)"] },
          { "no": 2, "title": "Ayo, Mengenal Siklus pada Makhluk Hidup", "jp": 27, "topics": ["Metamorfosis Sempurna (Kupu-kupu, Katak)", "Metamorfosis Tidak Sempurna (Belalang, Kecoak)", "Siklus Hidup Tumbuhan Berbiji", "Upaya Pelestarian Makhluk Hidup"] },
          { "no": 3, "title": "Hidup Bersama Alam", "jp": 27, "topics": ["Pencemaran Air, Tanah, dan Udara", "Pentingnya Reboisasi & Penghijauan", "Cara Mengurangi Sampah Plastik Rumah Tangga", "Membuat Kompos Sederhana"] },
          { "no": 4, "title": "Berkenalan dengan Energi", "jp": 27, "topics": ["Mengenal Energi Panas, Cahaya, Bunyi, Gerak", "Sumber-Sumber Energi di Bumi", "Transformasi Energi", "Manfaat Penghematan Energi Listrik"] },
          { "no": 5, "title": "Aku dan Lingkungan Sekitarku", "jp": 27, "topics": ["Mengenal Peta Daerah & Batas Wilayah", "Membaca Arah Mata Angin", "Menggambar Denah Sekolah"] },
          { "no": 6, "title": "Aku Bagian dari Masyarakat", "jp": 27, "topics": ["Kebutuhan Manusia sebagai Makhluk Sosial", "Interaksi dengan Tetangga Baru", "Sikap Toleransi Terhadap Perbedaan Agama"] },
          { "no": 7, "title": "Cerita dari Kampung Halaman", "jp": 27, "topics": ["Sejarah Singkat Daerah Tempat Tinggal", "Keanekaragaman Hayati di Daerahku", "Pemanfaatan SDA Unggulan Daerah"] },
          { "no": 8, "title": "Bentang Alam Indonesia", "jp": 27, "topics": ["Gunung, Dataran Tinggi, Dataran Rendah", "Lembah, Sungai, Danau, Pantai, Laut", "Upaya Pelestarian Bentang Alam"] }
        ]
      },
      {
        "id": "english",
        "title": "Bahasa Inggris - My Next Words Grade 3",
        "elemen": {
          "Menyimak - Berbicara": "Peserta didik mampu merespons instruksi lisan kelas, mengekspresikan hobi, dan menyanyikan lagu anak-anak.",
          "Membaca - Memirsa": "Peserta didik mampu memahami teks deskriptif pendek bergambar tentang aktivitas sehari-hari.",
          "Menulis - Mempresentasikan": "Peserta didik mampu menulis kata/frasa bahasa Inggris sederhana tentang warna, angka, dan hewan."
        },
        "chapters": [
          { "no": 1, "title": "I like Mi Aceh", "jp": 8, "topics": ["Vocabulary of traditional food (Mi Aceh, Bakso)", "Expressing food preferences using 'like' & 'likes'", "Dialogue: Stating favorite traditional foods"] },
          { "no": 2, "title": "I have fried chicken for breakfast", "jp": 8, "topics": ["Vocabulary of daily meals (Breakfast, Lunch, Dinner)", "Expressing foods eaten for breakfast", "Dialogue: Talking about morning meals"] },
          { "no": 3, "title": "I have lunch in the canteen", "jp": 7, "topics": ["Expressing lunch activities", "Vocabulary of canteen foods and drinks", "Dialogue: Asking friends where they have lunch"] },
          { "no": 4, "title": "Do you like swimming?", "jp": 7, "topics": ["Vocabulary of hobbies (Swimming, Reading, Cycling)", "Asking friends about hobbies ('Do you like...?')", "Dialogue: Stating sports preferences"] },
          { "no": 5, "title": "I like riding a bike on Sunday", "jp": 7, "topics": ["Vocabulary of days of the week", "Expressing weekend activities and hobbies", "Dialogue: Planning weekend play"] },
          { "no": 6, "title": "Is it the canteen?", "jp": 7, "topics": ["Vocabulary of school rooms (Canteen, Library, Classroom)", "Asking for school locations ('Is it the...?')", "Identifying school facilities"] },
          { "no": 7, "title": "My class is behind the office", "jp": 7, "topics": ["Using prepositions of place (Behind, Beside, In front of)", "Describing school building layout", "Dialogue: Giving simple school directions"] },
          { "no": 8, "title": "I drink orange juice in the canteen", "jp": 7, "topics": ["Vocabulary of school actions and drinks", "Simple present tense for school activities", "Dialogue: Describing recess activities"] },
          { "no": 9, "title": "My classroom is clean", "jp": 7, "topics": ["Adjectives for classrooms (Clean, Dirty, Neat, Messy)", "Describing class condition", "Dialogue: Asking to sweep/tidy up class"] },
          { "no": 10, "title": "There are twenty books on the shelf", "jp": 7, "topics": ["Numbers 21 to 50", "Plural count nouns in the classroom", "Using 'There are...' for classroom items"] }
        ]
      },
      {
        "id": "jawa",
        "title": "Bahasa Jawa (Muatan Lokal)",
        "elemen": {
          "Menyimak (Ngrungokake)": "Peserta didik mampu menyimak, memahami, dan merespons instruksi lisan sederhana dalam bahasa Jawa (ngoko/krama).",
          "Membaca (Maca)": "Peserta didik mampu membaca kata-kata baru, memahami kalimat pendek, dan memaknai cerita bergambar berbahasa Jawa.",
          "Berbicara (Micara)": "Peserta didik mampu berbicara dengan santun sesuai unggah-ungguh basa Jawa (ngoko/krama) kepada guru dan teman.",
          "Menulis (Nulis)": "Peserta didik mampu menulis kata, kalimat pendek, lan aksara Jawa dasar legena secara benar."
        },
        "chapters": [
          { "no": 1, "title": "Srawung lan Tetulung (Fabel)", "jp": 12, "topics": ["Maca Dongeng Fabel Semut lan Kupu", "Nirukake Watake Kewan Sing Becik", "Nulis Tembung Piwulang Luhur", "Pacelathon Tulung-Tinulung"] },
          { "no": 2, "title": "Pengalaman Nyenengake (Krama)", "jp": 12, "topics": ["Crita Pengalaman Plesir nganggo Krama Alus", "Matur marang Simbah/Ibu nganggo Krama", "Nulis Paragraf Pengalaman Nyenengake", "Tembang Dolanan Jaranan"] },
          { "no": 3, "title": "Wayang Werkudara lan Pandawa", "jp": 12, "topics": ["Tokoh Wayang Werkudara (Bima)", "Gaman lan Kasektene Werkudara", "Karakter Satria Pandhawa", "Nulis Jenenge Ratu Pandhawa"] },
          { "no": 4, "title": "Gotong Royong ing Sekolah", "jp": 12, "topics": ["Rukun lan Bekerja Sama ing Kelas", "Maca Teks Deskripsi Gotong Royong", "Nulis Ukara Ajak-Ajak Kebersihan", "Tembang Dolanan Gundhul Pacul"] },
          { "no": 5, "title": "Mangsa Rendheng lan Ketiga", "jp": 12, "topics": ["Ngenal Mangsa Rendheng lan Ketiga", "Dampak Alam (Banjir, Kekeringan)", "Nulis Ukara Laporan Kahanan Alam", "Maca Geguritan Tema Alam Jawa"] },
          { "no": 6, "title": "Aksara Jawa lan Tembang", "jp": 12, "topics": ["Nulis Aksara Legena (Ha Na Ca Ra Ka)", "Nulis Ukara Pendek nganggo Aksara Jawa", "Nembang Dolanan Sluku-sluku Bathok", "Apresiasi Sastra Jawa Sederhana"] }
        ]
      }
    ]
  },
  "4": {
    "fase": "B",
    "subjects": [
      {
        "id": "indonesia",
        "title": "Bahasa Indonesia - Lihat Sekitar (Edisi Revisi)",
        "elemen": {
          "Menyimak": "Peserta didik mampu memahami ide pokok, ide pendukung, dan pesan dari teks lisan.",
          "Membaca & Memirsa": "Peserta didik mampu memahami teks narasi dan informatif serta memaknai kosakata baru.",
          "Berbicara & Mempresentasikan": "Peserta didik mampu menyampaikan pendapat, berdiskusi, dan melakukan wawancara.",
          "Menulis": "Peserta didik mampu menulis teks narasi, deskripsi, dan prosedur dengan ejaan yang benar."
        },
        "chapters": [
          { "no": 1, "title": "Sudah Besar", "jp": 36, "topics": ["Membaca Teks Narasi 'Tak Muat Lagi'", "Kosakata Homonim & Makna Ganda", "Mengidentifikasi Tokoh dalam Cerita", "Menulis Paragraf Deskriptif Masa Kecil"] },
          { "no": 2, "title": "Di Bawah Atap", "jp": 36, "topics": ["Membaca Teks Informasi Tugas Keluarga", "Kosakata tentang Pekerjaan Rumah", "Menggunakan Kalimat Transitif & Intransitif", "Menulis Laporan Hasil Wawancara Anggota Keluarga"] },
          { "no": 3, "title": "Lihat Sekitar", "jp": 36, "topics": ["Membaca Rambu-Rambu & Petunjuk Jalan", "Kosakata tentang Transportasi & Keselamatan", "Kalimat Tanya, Perintah, & Larangan", "Menulis Petunjuk Arah Sederhana"] },
          { "no": 4, "title": "Meliuk dan Menerjang", "jp": 36, "topics": ["Membaca Teks Profil Olahraga Tradisional", "Kosakata tentang Gerakan & Tubuh", "Menggunakan Awalan 'me-' dan 'ber-'", "Menulis Cerita Pengalaman Mengikuti Lomba"] },
          { "no": 5, "title": "Bertukar atau Membayar", "jp": 36, "topics": ["Sejarah Sistem Barter & Uang", "Kosakata Keuangan & Kegiatan Jual Beli", "Menggunakan Kata Hubung Pertentangan", "Menulis Paragraf Eksposisi Cara Belanja Bijak"] },
          { "no": 6, "title": "Satu Titik di Peta", "jp": 36, "topics": ["Membaca Denah Wilayah & Arah Mata Angin", "Kosakata tentang Geografi & Lingkungan", "Menggunakan Majas Metafora Sederhana", "Menulis Deskripsi Keunikan Daerah Asal"] },
          { "no": 7, "title": "Asal-Usul", "jp": 36, "topics": ["Cerita Rakyat & Legenda Setempat", "Kosakata Arkais & Budaya Tradisional", "Menggunakan Konjungsi Hubungan Sebab-Akibat", "Menulis Ringkasan Cerita Rakyat Nusantara"] },
          { "no": 8, "title": "Sehatlah Ragaku", "jp": 36, "topics": ["Membaca Teks Tuntunan Kesehatan Anak", "Kosakata Zat Makanan & Pola Hidup Bersih", "Menggunakan Kalimat Persuasif & Slogan", "Membuat Poster Kampanye Sekolah Sehat"] }
        ]
      },
      {
        "id": "matematika",
        "title": "Matematika",
        "elemen": {
          "Bilangan": "Peserta didik dapat membaca, menulis, menentukan nilai tempat, serta membandingkan bilangan cacah sampai 10.000.",
          "Aljabar": "Peserta didik dapat mengidentifikasi pola gambar membesar dan mengecil serta pola bilangan.",
          "Pengukuran": "Peserta didik dapat mengukur luas dan volume menggunakan satuan baku dan tidak baku.",
          "Geometri": "Peserta didik dapat mengelompokkan bangun datar berdasarkan panjang sisi dan besar sudut."
        },
        "chapters": [
          { "no": 1, "title": "Bilangan Cacah sampai 10.000", "jp": 30, "topics": ["Membaca & Menulis Bilangan Cacah 4 Digit", "Nilai Tempat Ribuan, Ratusan, Puluhan, Satuan", "Komposisi dan Dekomposisi Bilangan", "Penjumlahan & Pengurangan Bilangan Cacah Besar", "Faktor dan Kelipatan"] },
          { "no": 2, "title": "Pecahan Senilai dan Campuran", "jp": 30, "topics": ["Mengenal Pecahan Senilai melalui Gambar", "Menyederhanakan Pecahan", "Mengubah Pecahan Biasa ke Pecahan Campuran", "Penjumlahan Pecahan Berpenyebut Sama"] },
          { "no": 3, "title": "Pola Gambar dan Pola Bilangan", "jp": 30, "topics": ["Mengidentifikasi Pola Gambar Membesar/Mengecil", "Melanjutkan Pola Bilangan Loncat", "Menyelesaikan Persamaan Aljabar Sederhana"] },
          { "no": 4, "title": "Pengukuran Luas dan Volume", "jp": 30, "topics": ["Menghitung Luas Bangun Datar mawi Satuan Baku", "Menghitung Volume dengan Kubus Satuan", "Hubungan Satuan Luas (cm2 dan m2)", "Mengukur Sudut dengan Busur Derajat"] },
          { "no": 5, "title": "Bangun Datar", "jp": 30, "topics": ["Mengelompokkan Segitiga Sesuai Sisi & Sudut", "Sifat-Sifat Jajargenjang, Trapesium, Layang-Layang", "Komposisi (Penyusunan) Bangun Datar", "Dekomposisi (Penguraian) Bangun Datar"] },
          { "no": 6, "title": "Piktogram dan Diagram Batang", "jp": 30, "topics": ["Mengumpulkan Data dengan Tally", "Menyajikan Data dalam Diagram Piktogram", "Membuat Diagram Batang Tegak & Mendatar", "Menganalisis Informasi dari Diagram Batang"] }
        ]
      },
      {
        "id": "pancasila",
        "title": "Pendidikan Pancasila",
        "elemen": {
          "Pancasila": "Peserta didik memahami makna lambang Garuda Pancasila dan perilaku cinta tanah air.",
          "Undang-Undang Dasar NKRI 1945": "Peserta didik mengidentifikasi hak dan kewajibannya di lingkungan sekolah dan rumah.",
          "Bhinneka Tunggal Ika": "Peserta didik mengenal keragaman suku bangsa, bahasa, dan pakaian adat di Indonesia.",
          "Negara Kesatuan Republik Indonesia": "Peserta didik memahami batas wilayah kabupaten/kota secara sederhana."
        },
        "chapters": [
          { "no": 1, "title": "Pancasila Sebagai Dasar Negara", "jp": 36, "topics": ["Sejarah Singkat Lahirnya Pancasila (BPUPKI)", "Fungsi Pancasila dalam Kehidupan Bernegara", "Penerapan Pancasila dalam Menyelesaikan Konflik", "Sikap Musyawarah Mufakat"] },
          { "no": 2, "title": "Norma dan Aturan Masyarakat", "jp": 36, "topics": ["Pengertian Norma (Agama, Kesusilaan, Kesopanan, Hukum)", "Contoh Penerapan Norma di Lingkungan Tetangga", "Sanksi Sosial bagi Pelanggar Norma", "Pentingnya Menjaga Ketertiban Umum"] },
          { "no": 3, "title": "Keragaman Suku dan Budaya", "jp": 36, "topics": ["Mengidentifikasi Suku Bangsa di Indonesia", "Apresiasi Tari Tradisional & Rumah Adat", "Sikap Menghargai Bahasa Daerah Lain", "Menjaga Persaudaraan Lintas Budaya"] },
          { "no": 4, "title": "Negaraku NKRI", "jp": 36, "topics": ["Mengenal Batas Wilayah NKRI secara Geografis", "Cinta Produk Dalam Negeri", "Sikap Menghargai Kedaulatan Negara Sederhana", "Keanekaragaman Hayati Kekayaan NKRI"] },
          { "no": 5, "title": "Gotong Royong dalam Kehidupan", "jp": 36, "topics": ["Arti Penting Gotong Royong di Sekolah", "Bentuk Gotong Royong di Lingkungan Rumah", "Kerjasama Mengatasi Masalah Sosial Sederhana", "Menumbuhkan Sikap Solidaritas Sosial"] }
        ]
      },
      {
        "id": "pai",
        "title": "Pendidikan Agama Islam dan Budi Pekerti (PAI)",
        "elemen": {
          "Al-Qur'an dan Hadis": "Peserta didik melafalkan, menghafal, dan menulis Surah-surah pendek dengan tartil.",
          "Akidah": "Peserta didik meyakini Asmaul Husna Allah SWT.",
          "Akhlak": "Peserta didik membiasakan akhlak terpuji dan menghindari akhlak tercela.",
          "Fikih": "Peserta didik memahami ketentuan salat Jumat, salat duha, salat tahajud, dan ketentuan khitan.",
          "Sejarah Peradaban Islam": "Peserta didik memahami kisah keteladanan para nabi dan kisah masuk Islamnya para sahabat."
        },
        "chapters": [
          { "no": 1, "title": "Mari Mengaji Surah Al-Hujurat", "jp": 15, "topics": ["Membaca Surah Al-Hujurat Ayat 13", "Hukum Bacaan Mad Sederhana", "Memahami Kandungan Menghargai Perbedaan", "Saling Mengenal (Ta'aruf) Lintas Suku"] },
          { "no": 2, "title": "Mengenal Asmaul Husna Allah SWT", "jp": 15, "topics": ["Makna Al-Basir (Maha Melihat)", "Makna Al-Adl (Maha Adil)", "Penerapan Sikap Jujur dan Adil dalam Kelas", "Merasakan Pengawasan Allah"] },
          { "no": 3, "title": "Kisah Nabi Ayub a.s.", "jp": 14, "topics": ["Nabi Ayub a.s. yang Sabar", "Cobaan Penyakit & Kehilangan Harta", "Kesetiaan Istri Nabi Ayub", "Pelajaran Moral Keteguhan Hati"] },
          { "no": 4, "title": "Ayo Salat Jumat dan Salat Sunah!", "jp": 14, "topics": ["Hukum & Syarat Salat Jumat", "Adab-Adab Sebelum Salat Jumat", "Salat Sunah Rawatib (Qobliyah & Ba'diyah)", "Praktek Salat Jumat Kelompok"] },
          { "no": 5, "title": "Menghormati Orang Tua & Guru", "jp": 14, "topics": ["Perintah Berbakti (Birrul Walidain)", "Sikap Santun Berbicara Kepada Guru", "Membantu Pekerjaan Orang Tua di Rumah", "Kisah Bakti Uwais Al-Qarni"] },
          { "no": 6, "title": "Iman Kepada Rasul-Rasul Allah", "jp": 14, "topics": ["Mengenal 25 Nama Nabi & Rasul", "Sifat Wajib Rasul (Siddiq, Amanah, Fathanah, Tabligh)", "Sifat Mustahil & Jaiz Rasul", "Kisah Keteladanan Nabi Muhammad"] },
          { "no": 7, "title": "Indahnya Menyebarkan Kedamaian", "jp": 14, "topics": ["Pentingnya Ukhuwah Islamiyah", "Menghindari Sikap Sombong & Hasad", "Menebarkan Senyuman & Tegur Sapa", "Menciptakan Kerukunan Antar Teman"] },
          { "no": 8, "title": "Ketentuan Khitan Sederhana", "jp": 15, "topics": ["Sejarah Perintah Khitan (Nabi Ibrahim)", "Tujuan Kesehatan Medis Khitan", "Hukum Khitan bagi Laki-laki/Perempuan", "Kebersihan Setelah Khitan"] },
          { "no": 9, "title": "Kisah Nabi Musa a.s.", "jp": 14, "topics": ["Masa Kecil Nabi Musa di Istana Firaun", "Mukjizat Tongkat Menjadi Ular", "Perjalanan Membelah Laut Merah", "Keberanian Membela Kebenaran"] },
          { "no": 10, "title": "Sikap Rendah Hati dan Sederhana", "jp": 15, "topics": ["Menghindari Perilaku Boros (Israf)", "Membiasakan Hidup Hemat", "Sikap Tawadhu di Depan Teman Miskin", "Manfaat Bersyukur Atas Nikmat"] }
        ]
      },
      {
        "id": "pjok",
        "title": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "elemen": {
          "Keterampilan Gerak": "Peserta didik mempraktikkan variasi dan kombinasi gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pengetahuan Gerak": "Peserta didik memahami variasi dan kombinasi gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pemanfaatan Gerak": "Peserta didik memahami prosedur kebugaran jasmani dan pemeliharaan kesehatan.",
          "Pengembangan Karakter": "Peserta didik menunjukkan tanggung jawab, disiplin, kerja sama, dan menghargai perbedaan."
        },
        "chapters": [
          { "no": 1, "title": "Kombinasi Gerak Dasar Permainan Bola", "jp": 18, "topics": ["Kombinasi Menggiring dan Menendang Bola", "Kombinasi Melempar dan Menangkap Bola Kasti", "Kerja Sama dalam Permainan Kasti", "Menangkap Bola Berbagai Ketinggian"] },
          { "no": 2, "title": "Aktivitas Kebugaran Jasmani", "jp": 18, "topics": ["Latihan Kelenturan Otot Pinggang & Bahu", "Latihan Kekuatan Otot Tungkai (Squat)", "Mencatat Hasil Tes Kebugaran Mandiri", "Latihan Daya Tahan Paru-Paru (Jogging 12 Menit)"] },
          { "no": 3, "title": "Gerak Dasar Atletik", "jp": 18, "topics": ["Teknik Lari Jarak Pendek (Sprint)", "Teknik Lompat Jauh Gaya Menggantung", "Teknik Lempar Turbo Sederhana", "Kombinasi Jalan dan Lari"] },
          { "no": 4, "title": "Seni Beladiri Pencak Silat", "jp": 18, "topics": ["Kuda-Kuda Pencak Silat (Tengah, Depan, Samping)", "Pukulan Depan & Pukulan Tegak", "Tangkisan Atas & Tangkisan Bawah", "Langkah Kiri Kanan Silat"] },
          { "no": 5, "title": "Aktivitas Senam Ketangkasan", "jp": 18, "topics": ["Guling Depan di Atas Matras secara Runtut", "Guling Belakang secara Aman", "Gerakan Loncat Harimau Modifikasi", "Melompati Peti Lompat"] },
          { "no": 6, "title": "Gerak Berirama Dinamis", "jp": 18, "topics": ["Langkah Kaki Silang Berirama Musik", "Kombinasi Ayunan Lengan Ganda", "Senam Kesegaran Jasmani (SKJ)", "Ketepatan Gerak dengan Tempo Lagu"] },
          { "no": 7, "title": "Aktivitas Renang Gaya Dada", "jp": 18, "topics": ["Gerakan Kaki Gaya Dada", "Gerakan Tangan Gaya Dada", "Teknik Pengambilan Napas Renang", "Kombinasi Gerak Renang Gaya Dada"] },
          { "no": 8, "title": "Kesehatan Reproduksi & NAPZA", "jp": 18, "topics": ["Mengenal Masa Pubertas (Perubahan Fisik)", "Cara Menjaga Kebersihan Organ Reproduksi", "Bahaya NAPZA bagi Kesehatan Remaja", "Menolak Tawaran Merokok/Minuman Keras"] }
        ]
      },
      {
        "id": "senirupa",
        "title": "Panduan Guru Seni Rupa",
        "elemen": {
          "Mengalami": "Peserta didik mengamati keindahan bentuk dan warna alam benda.",
          "Menciptakan": "Peserta didik mengekspresikan gagasan melalui lukisan atau kriya.",
          "Merefleksikan": "Peserta didik mengapresiasi keunikan karya seni teman sekelas.",
          "Berpikir & Bekerja Artistik": "Peserta didik menggunakan bahan bekas untuk menciptakan karya seni."
        },
        "chapters": [
          { "no": 1, "title": "Menggambar Rumah Tetangga", "jp": 12, "topics": ["Mengamati Tekstur Fisik Rumah di Sekitar", "Prinsip Proporsi dan Perspektif Dasar", "Menggambar Struktur Rumah dengan Pensil Warna"] },
          { "no": 2, "title": "Membuat Karya Cetak Tinggi Sederhana", "jp": 12, "topics": ["Mengenal Konsep Cetak Tinggi (Stempel)", "Memotong Pelepah Pisang / Kentang", "Mencetak Pola Rupa di Kertas Gambar"] },
          { "no": 3, "title": "Seni Dekoratif Hiasan Dinding", "jp": 12, "topics": ["Membuat Desain Gambar Hias Motif Flora", "Mewarnai dengan Teknik Gradasi", "Mengenal Prinsip Keseimbangan (Simetris/Asimetris)"] },
          { "no": 4, "title": "Anyaman Kertas 3D", "jp": 12, "topics": ["Mengenal Pola Anyaman Dasar (Pola Silang)", "Memotong Kertas Berwarna secara Presisi", "Menganyam Membentuk Keranjang Kecil"] },
          { "no": 5, "title": "Dekorasi dan Tekstur", "jp": 12, "topics": ["Mengenal Tekstur Alami dan Buatan", "Teknik Frottage (Menjiplak Tekstur)", "Membuat Karya Kolase Tekstur"] },
          { "no": 6, "title": "Membuat Topeng Karakter", "jp": 12, "topics": ["Merancang Topeng Kertas Tiga Dimensi", "Pewarnaan Karakter Topeng (Sabar, Marah)", "Menghias Topeng dengan Rumbai/Manik"] },
          { "no": 7, "title": "Membuat Maket Rumah Sederhana", "jp": 12, "topics": ["Merancang Skema Desain Rumah", "Memotong Karton Berdasarkan Pola", "Merakit Dinding dan Atap Maket"] },
          { "no": 8, "title": "Seni Cetak Tinggi dari Umbi", "jp": 12, "topics": ["Memotong Stempel dari Ubi/Kentang", "Mewarnai Cetakan dengan Tinta Cat Air", "Membentuk Gambar Berulang"] },
          { "no": 9, "title": "Desain Hiasan Kain Batik", "jp": 12, "topics": ["Mengenal Motif Batik Tradisional Nusantara", "Membuat Pola Batik Sederhana", "Pewarnaan Kain Menggunakan Pewarna Tekstil"] },
          { "no": 10, "title": "Kerajinan Boneka Kaus Kaki", "jp": 12, "topics": ["Memanfaatkan Kaus Kaki Bekas Bersih", "Mengisi Dakron/Kapas Membentuk Tubuh Boneka", "Menjahit Detal Mata & Rambut"] },
          { "no": 11, "title": "Kreasi Origami Tiga Dimensi", "jp": 12, "topics": ["Melipat Kertas Membentuk Origami Satwa", "Menyusun Karya Lipat dalam Komposisi 3D", "Mengapresiasi Kerajinan Lipat"] },
          { "no": 12, "title": "Pameran Karya Seni Kelas", "jp": 12, "topics": ["Mengatur Galeri Display Karya Seni Rupa", "Memberikan Label Nama Karya dan Penyusun", "Mengapresiasi Hasil Karya Seni Teman Sekelas"] }
        ]
      },
      {
        "id": "ipas",
        "title": "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
        "elemen": {
          "Pemahaman IPAS (Sains & Sosial)": "Peserta didik memahami wujud zat, gaya, energi, sejarah daerah, keragaman budaya, kegiatan ekonomi, dan norma masyarakat.",
          "Keterampilan Proses": "Peserta didik mengajukan pertanyaan secara kritis, merencanakan penyelidikan ilmiah sederhana, dan menarik kesimpulan berdasarkan bukti."
        },
        "chapters": [
          { "no": 1, "title": "Tumbuhan, Sumber Kehidupan di Bumi", "jp": 27, "topics": ["Bagian Tubuh Tumbuhan dan Fungsinya", "Proses Fotosintesis pada Daun Hijau", "Penyebaran Biji dan Penyerbukan Tumbuhan", "Pentingnya Tumbuhan bagi Ekosistem Bumi"] },
          { "no": 2, "title": "Wujud Zat dan Perubahannya", "jp": 27, "topics": ["Karakteristik Zat Padat, Cair, dan Gas", "Perubahan Wujud Zat (Mencair, Menguap, Menyublim)", "Perubahan Fisika vs Perubahan Kimia", "Simulasi Perubahan Wujud Air"] },
          { "no": 3, "title": "Gaya di Sekitar Kita", "jp": 27, "topics": ["Mengenal Gaya Otot, Gaya Gesek, Gaya Magnet", "Pengaruh Gaya Terhadap Benda (Gerak & Bentuk)", "Pemanfaatan Gaya Gesek dalam Kehidupan", "Membuat Percobaan Magnet Sederhana"] },
          { "no": 4, "title": "Mengubah Bentuk Energi", "jp": 27, "topics": ["Mengenal Macam Energi (Potensial, Kinetik, Panas)", "Hukum Kekekalan Energi", "Transformasi Energi (Listrik ke Panas/Bunyi)", "Membuat Model Perubahan Energi Sederhana"] },
          { "no": 5, "title": "Cerita Tentang Daerahku", "jp": 27, "topics": ["Sejarah Singkat Daerah Tempat Tinggal", "Keanekaragaman Hayati di Daerahku", "Pemanfaatan SDA Unggulan Daerah", "Menulis Laporan Asal-Usul Daerah"] },
          { "no": 6, "title": "Indonesiaku Kaya Budaya", "jp": 27, "topics": ["Keragaman Suku & Ras di Indonesia", "Bentuk-Bentuk Kebudayaan (Rumah Adat, Lagu)", "Sikap Toleransi Terhadap Perbedaan Budaya", "Melestarikan Warisan Kebudayaan Nasional"] },
          { "no": 7, "title": "Bagaimana Mendapatkan Kebutuhan Kita?", "jp": 27, "topics": ["Kebutuhan Primer, Sekunder, Tersier", "Kegiatan Ekonomi (Produksi, Distribusi, Konsumsi)", "Sejarah Uang dan Alat Tukar Tradisional", "Bijak dalam Berbelanja Sesuai Kebutuhan"] },
          { "no": 8, "title": "Membangun Masyarakat yang Beradab", "jp": 27, "topics": ["Peraturan Tertulis & Tidak Tertulis di Lingkungan", "Pentingnya Norma Kesusilaan & Kesopanan", "Hak dan Kewajiban Warga Negara", "Dengan hormat, Menyusun Kesepakatan Kelas"] }
        ]
      },
      {
        "id": "english",
        "title": "Bahasa Inggris - My Next Words Grade 4",
        "elemen": {
          "Menyimak - Berbicara": "Peserta didik mampu merespons instruksi lisan kelas, mengekspresikan hobi, dan menyanyikan lagu anak-anak.",
          "Membaca - Memirsa": "Peserta didik mampu memahami teks deskriptif pendek bergambar tentang aktivitas sehari-hari.",
          "Menulis - Mempresentasikan": "Peserta didik mampu menulis kata/frasa bahasa Inggris sederhana tentang warna, angka, dan hewan."
        },
        "chapters": [
          { "no": 1, "title": "What Are You Doing?", "jp": 6, "topics": ["Vocabulary of action verbs (Reading, Writing, Cooking)", "Using Present Continuous Tense ('I am reading')", "Dialogue: Asking what someone is doing"] },
          { "no": 2, "title": "There Are 67 English Books", "jp": 6, "topics": ["Numbers 50 to 100", "Singular vs Plural nouns in context", "Using 'There is...' and 'There are...' with numbers"] },
          { "no": 3, "title": "My Living Room is Beside The Kitchen", "jp": 6, "topics": ["Vocabulary of rooms in the house (Living room, Kitchen)", "Using prepositions of place (Beside, Between, Behind)", "Describing home layout"] },
          { "no": 4, "title": "Cici Cooks in The Kitchen", "jp": 6, "topics": ["Verbs related to home activities (Cooks, Cleans, Sleeps)", "Linking rooms with activities", "Dialogue: Talking about home routines"] },
          { "no": 5, "title": "Where is My Pencil?", "jp": 6, "topics": ["Vocabulary of stationery items", "Locating lost items using prepositions", "Asking for object positions"] },
          { "no": 6, "title": "The Stove is in The Kitchen", "jp": 6, "topics": ["Vocabulary of household appliances (Stove, Sofa, TV)", "Describing appliance locations in rooms", "Dialogue: Describing home interior"] },
          { "no": 7, "title": "I Can Make Fried Egg in The Kitchen", "jp": 6, "topics": ["Expressing ability using 'can' and 'cannot'", "Vocabulary of cooking activities", "Simple present tense for abilities"] },
          { "no": 8, "title": "Be On Time!", "jp": 6, "topics": ["Telling time (o'clock, half past, quarter past)", "Asking for time ('What time is it?')", "Dialogue: Making daily schedules"] },
          { "no": 9, "title": "I Go to School after Having Breakfast", "jp": 6, "topics": ["Vocabulary of daily schedules and routines", "Using sequence words (After, Before)", "Dialogue: Describing morning routines"] },
          { "no": 10, "title": "He Always Gets Up at 5 O'clock", "jp": 6, "topics": ["Adverbs of frequency (Always, Usually, Sometimes, Never)", "Simple present tense for routines", "Describing others' daily routines"] },
          { "no": 11, "title": "How Do You Go to School?", "jp": 6, "topics": ["Vocabulary of transportation modes (Bike, Car, Bus, Train)", "Asking how people travel", "Dialogue: Describing school travel"] },
          { "no": 12, "title": "He Goes to School by Bike", "jp": 6, "topics": ["Using prepositions of travel ('by bike', 'on foot')", "Describing travel methods of family and friends", "Reviewing time, transportation, and routines"] }
        ]
      },
      {
        "id": "jawa",
        "title": "Bahasa Jawa (Muatan Lokal)",
        "elemen": {
          "Menyimak (Ngrungokake)": "Peserta didik mampu menyimak, memahami, dan merespons instruksi lisan sederhana dalam bahasa Jawa (ngoko/krama).",
          "Membaca (Maca)": "Peserta didik mampu membaca kata-kata baru, memahami kalimat pendek, dan memaknai cerita bergambar berbahasa Jawa.",
          "Berbicara (Micara)": "Peserta didik mampu berbicara dengan santun sesuai unggah-ungguh basa Jawa (ngoko/krama) kepada guru dan teman.",
          "Menulis (Nulis)": "Peserta didik mampu menulis kata, kalimat pendek, dan aksara Jawa dasar legena secara benar."
        },
        "chapters": [
          { "no": 1, "title": "Guyub Rukun (Cerita Rakyat)", "jp": 12, "topics": ["Maca Crita Rakyat Asal-Usul Rawa Pening", "Nulis Piwulang Becik ing Crita Rakyat", "Pacelathon Guyub Rukun marang Kanca", "Tembang Macapat Maskumambang"] },
          { "no": 2, "title": "Kesenian lan Kabudayan Jawa", "jp": 12, "topics": ["Ngenal Gamelan Jawa (Saron, Gong, Kendhang)", "Cara Nabuh Gamelan kanthi Leres", "Maca Wacana Kesenian Tari Jawa", "Nulis Ukara Deskripsi Kesenian"] },
          { "no": 3, "title": "Unggah-Ungguh Basa (Pacelathon)", "jp": 12, "topics": ["Pacelathon mawi Basa Ngoko lan Krama", "Matur marang Wong Tuwa mawi Basa Krama Alus", "Nulis Teks Pacelathon Sederhana", "Uga-Ugi Unggah-Ungguh ing Omah"] },
          { "no": 4, "title": "Wayang Yudhistira lan Aksara Jawa", "jp": 12, "topics": ["Tokoh Wayang Prabu Yudhistira", "Karakter Utamane Yudhistira (Jujur)", "Nulis Aksara Jawa nganggo Sandhangan Wulu/Suku", "Maca Ukara Aksara Jawa Prasaja"] },
          { "no": 5, "title": "Ngruwat Lingkungan lan Bencana", "jp": 12, "topics": ["Maca Teks Laporan Bencana Banjir", "Nulis Ukara Cara Nyegah Banjir", "Pacelathon Jaga Kelestarian Lingkungan", "Geguritan Tema Ngruwat Bumi"] },
          { "no": 6, "title": "Geguritan lan Tembang Pocung", "jp": 12, "topics": ["Maca Geguritan kanthi Wirama lan Wiraga", "Nulis Geguritan Tema Sekolah", "Nembang Macapat Pocung", "Aturan Guru Gatra lan Guru Wilangan Tembang"] }
        ]
      }
    ]
  },
  "5": {
    "fase": "C",
    "subjects": [
      {
        "id": "indonesia",
        "title": "Bahasa Indonesia - Bergerak Bersama (Edisi Revisi)",
        "elemen": {
          "Menyimak": "Peserta didik mampu menganalisis informasi, ide pokok, dan gagasan dalam teks lisan.",
          "Membaca & Memirsa": "Peserta didik mampu membaca teks narasi, informatif, dan eksplanasi dengan kritis.",
          "Berbicara & Mempresentasikan": "Peserta didik mampu menyampaikan presentasi, berdiskusi, dan berpidato dengan santun.",
          "Menulis": "Peserta didik mampu menulis esai, teks deskripsi, surat, dan poster dengan tata bahasa yang benar."
        },
        "chapters": [
          { "no": 1, "title": "Aku yang Unik", "jp": 36, "topics": ["Membaca Teks Narasi 'Aku yang Unik'", "Kata Sifat untuk Menilai Karakter Seseorang", "Mengenal Antonim & Sinonim Kata Sifat", "Menulis Teks Deskripsi Profil Diri Sendiri"] },
          { "no": 2, "title": "Buku Jendela Dunia", "jp": 36, "topics": ["Unsur Intrinsik Cerita (Tokoh, Latar, Tema)", "Mengenal Majas Metafora, Personifikasi, Hiperbola", "Kalimat Langsung dan Kalimat Tidak Langsung", "Menulis Ringkasan Cerita Fiksi"] },
          { "no": 3, "title": "Hobi yang Bermanfaat", "jp": 36, "topics": ["Kosakata Tentang Hobi & Keterampilan", "Membaca Teks Prosedur Membuat Kerajinan", "Menulis Teks Prosedur Hobi Pribadi", "Mempresentasikan Langkah-Langkah Praktik"] },
          { "no": 4, "title": "Belajar Berwirausaha", "jp": 36, "topics": ["Kosakata Jual Beli dan Ekonomi", "Mengidentifikasi Alasan Memilih Wirausaha", "Membaca Teks Wawancara Pengusaha Sukses", "Menulis Rencana Bisnis Sederhana Kelompok"] },
          { "no": 5, "title": "Menjadi Warga Dunia", "jp": 36, "topics": ["Singkatan dan Akronim Resmi", "Mengidentifikasi Fakta dan Opini pada Iklan", "Cara Menulis Surel (Email) Kepada Teman", "Menulis Teks Eksplanasi Fenomena Teknologi"] },
          { "no": 6, "title": "Cinta Wilayahku", "jp": 36, "topics": ["Membaca Teks Deskripsi Destinasi Wisata", "Kosakata Keindahan Alam", "Menggunakan Majas Asosiasi", "Menulis Brosur Wisata Kuliner Daerah"] },
          { "no": 7, "title": "Sayangi Bumi", "jp": 36, "topics": ["Teks Eksplanasi Dampak Sampah Plastik", "Menyusun Ringkasan Teks Nonfiksi Bumi", "Menulis Surat Pembaca ke Redaksi Media", "Membuat Poster Kampanye Hemat Air"] },
          { "no": 8, "title": "Bergerak Bersama", "jp": 36, "topics": ["Membaca Teks Eksplanasi Proyek Kelompok", "Mengidentifikasi Argumen Pro dan Kontra", "Menulis Teks Eksposisi Pidato Ajakan Kerja Bakti", "Membuat Laporan Evaluasi Proyek Kelas"] }
        ]
      },
      {
        "id": "matematika",
        "title": "Matematika",
        "elemen": {
          "Bilangan": "Peserta didik dapat menyelesaikan operasi hitung pecahan dan bilangan cacah besar.",
          "Aljabar": "Peserta didik dapat mengidentifikasi kelipatan, faktor, KPK, dan FPB.",
          "Pengukuran": "Peserta didik dapat mengukur sudut menggunakan busur derajat secara akurat.",
          "Geometri": "Peserta didik dapat menghitung keliling dan luas daerah berbagai bangun datar."
        },
        "chapters": [
          { "no": 1, "title": "Bilangan Cacah sampai 100.000", "jp": 24, "topics": ["Nilai Tempat Bilangan Cacah Puluh Ribuan", "Membaca & Menulis Angka 5 Digit", "Membandingkan dan Mengurutkan Bilangan Besar", "Operasi Hitung Campuran Bilangan Cacah"] },
          { "no": 2, "title": "Kelipatan dan Faktor (KPK & FPB)", "jp": 24, "topics": ["Mencari Kelipatan Persekutuan Terkecil (KPK)", "Mencari Faktor Persekutuan Terbesar (FPB)", "Metode Pohon Faktor Sederhana", "Menyelesaikan Masalah Pembagian Barang Adil"] },
          { "no": 3, "title": "Bilangan Pecahan (Operasi Pecahan)", "jp": 22, "topics": ["Penjumlahan Pecahan Berbeda Penyebut (KPK)", "Pengurangan Pecahan Berbeda Penyebut", "Perkalian Pecahan dengan Bilangan Bulat", "Pembagian Pecahan dengan Bilangan Bulat", "Mengubah Pecahan ke Desimal"] },
          { "no": 4, "title": "Keliling Bangun Datar", "jp": 22, "topics": ["Keliling Segitiga Sama Sisi/Siku-Siku", "Keliling Jajargenjang & Layang-Layang", "Keliling Lingkaran Sederhana", "Soal Cerita Keliling Lapangan Sekolah"] },
          { "no": 5, "title": "Luas Daerah Bangun Datar", "jp": 22, "topics": ["Luas Segitiga Menggunakan Rumus", "Luas Jajargenjang (a x t)", "Luas Trapesium & Layang-Layang", "Menghitung Luas Gabungan Bangun Datar"] },
          { "no": 6, "title": "Sudut (Pengukuran Sudut)", "jp": 22, "topics": ["Mengenal Satuan Sudut Derajat", "Menggunakan Busur Derajat secara Akurat", "Menghitung Sudut Dalam Segitiga", "Menghitung Sudut Dalam Segiempat"] },
          { "no": 7, "title": "Membandingkan Ciri-Ciri Bangun Datar", "jp": 22, "topics": ["Ciri-Ciri Sisi Sejajar Jajargenjang", "Ciri-Ciri Sudut Siku-Siku Persegi Panjang", "Sifat Simetri Lipat & Simetri Putar", "Membuat Jaring-Jaring Bangun Ruang Kubus/Balok"] },
          { "no": 8, "title": "Data (Tabel dan Diagram Batang)", "jp": 22, "topics": ["Mengumpulkan Data Melalui Kuesioner Kelas", "Menyusun Tabel Frekuensi Data", "Menggambar Diagram Batang Vertikal", "Menganalisis Rata-Rata Data (Mean) Sederhana"] }
        ]
      },
      {
        "id": "pancasila",
        "title": "Pendidikan Pancasila",
        "elemen": {
          "Pancasila": "Peserta didik mampu menerapkan nilai-nilai Pancasila dalam memecahkan masalah sekolah.",
          "Undang-Undang Dasar NKRI 1945": "Peserta didik memahami hak dan kewajiban warga negara secara seimbang.",
          "Bhinneka Tunggal Ika": "Peserta didik mampu merancang aktivitas pelestarian keberagaman budaya.",
          "Negara Kesatuan Republik Indonesia": "Peserta didik memahami sejarah NKRI dan bela negara secara sederhana."
        },
        "chapters": [
          { "no": 1, "title": "Pancasila dalam Kehidupan", "jp": 36, "topics": ["Semangat Kebersamaan Tokoh Perumus Pancasila", "Komitmen Sila Pancasila dalam Keluarga", "Penerapan Pancasila dalam Menghadapi Bullying", "Meneladani Karakter Gotong Royong Pahlawan"] },
          { "no": 2, "title": "Hak dan Kewajiban Warga Negara", "jp": 36, "topics": ["Hak Warga Negara Mendapatkan Pendidikan Layak", "Kewajiban Mematuhi Peraturan Hukum", "Aksi Nyata Sadar Aturan di Sekolah & Masyarakat", "Keseimbangan Hak dan Kewajiban Anak"] },
          { "no": 3, "title": "Kebhinekaan Indonesia", "jp": 36, "topics": ["Keragaman Suku Bangsa Lintas Provinsi", "Kebudayaan Khas Daerah (Senjata, Rumah, Tari)", "Merancang Festival Budaya Sekolah Sederhana", "Sikap Toleransi Antarumat Beragama"] },
          { "no": 4, "title": "Menjaga Keutuhan NKRI", "jp": 36, "topics": ["Cinta Tanah Air & Bela Negara Sederhana", "Menghargai Produk-Produk Lokal Indonesia", "Peran Siswa Menjaga Persatuan NKRI", "Sejarah Singkat Proklamasi Kemerdekaan"] }
        ]
      },
      {
        "id": "pai",
        "title": "Pendidikan Agama Islam dan Budi Pekerti (PAI)",
        "elemen": {
          "Al-Qur'an dan Hadis": "Peserta didik melafalkan, menghafal, dan memahami hukum bacaan Al-Qur'an.",
          "Akidah": "Peserta didik meyakini hari akhir dan qada dan qadar.",
          "Akhlak": "Peserta didik menerapkan perilaku peduli sosial dan menghindari perilaku tercela.",
          "Fikih": "Peserta didik memahami ketentuan zakat, infak, sedekah, haji, dan umrah.",
          "Sejarah Peradaban Islam": "Peserta didik meneladani perjuangan nabi dan rasul di masa kejayaan Islam."
        },
        "chapters": [
          { "no": 1, "title": "Menyayangi Anak Yatim", "jp": 15, "topics": ["Membaca Surah Al-Ma'un dengan Tartil", "Memahami Kandungan Surah Al-Ma'un", "Perilaku Peduli Terhadap Anak Yatim", "Hadis Kasih Sayang Anak Yatim"] },
          { "no": 2, "title": "Beriman Kepada Hari Akhir", "jp": 15, "topics": ["Pengertian Hari Akhir (Kiamat)", "Tanda-Tanda Kiamat Sugra & Kubra", "Hikmah Beriman Kepada Hari Akhir", "Kewajiban Menjaga Amal Shalih"] },
          { "no": 3, "title": "Kisah Nabi Dawud a.s.", "jp": 14, "topics": ["Nabi Dawud a.s. yang Perkasa & Taat", "Mukjizat Melunakkan Besi & Kitab Zabur", "Keutamaan Puasa Daud", "Sikap Jujur & Berani Membela Keadilan"] },
          { "no": 4, "title": "Zakat, Infak, dan Sedekah", "jp": 14, "topics": ["Ketentuan Zakat Fitrah & Zakat Mal", "Perbedaan Infak dan Sedekah", "Orang yang Berhak Menerima Zakat (Mustahik)", "Hikmah Berbagi Sosial"] },
          { "no": 5, "title": "Sikap Tolong Menolong & Amanah", "jp": 14, "topics": ["Menolong Teman yang Terkena Musibah", "Mengembalikan Barang Teman yang Tertinggal", "Menjaga Rahasia Rahasia Kebaikan", "Menghindari Sifat Khianat"] },
          { "no": 6, "title": "Iman Kepada Qada dan Qadar", "jp": 14, "topics": ["Pengertian Qada (Ketentuan Sejak Zaman Azali)", "Pengertian Qadar (Perwujudan Takdir)", "Ikhtiar, Doa, dan Tawakal", "Menerima Ketentuan Allah dengan Ikhlas"] },
          { "no": 7, "title": "Menjaga Kedamaian dan Keharmonisan", "jp": 14, "topics": ["Menghindari Perilaku Adu Domba (Namimah)", "Menghindari Berprasangka Buruk (Su'udzon)", "Menghormati Perbedaan Pendapat Teman", "Sikap Lapang Dada dalam Diskusi"] },
          { "no": 8, "title": "Ketentuan Haji dan Umrah Sederhana", "jp": 15, "topics": ["Syarat Wajib Haji & Rukun Haji", "Perbedaan Haji dan Umrah", "Tata Cara Thawaf & Sa'i Sederhana", "Kisah Pengorbanan Keluarga Nabi Ibrahim"] },
          { "no": 9, "title": "Kisah Nabi Sulaiman a.s.", "jp": 14, "topics": ["Nabi Sulaiman a.s. Raja yang Bijaksana", "Mukjizat Berbicara dengan Hewan & Jin", "Kisah Ratu Balqis Menyerah Kepada Kebenaran", "Sikap Rendah Hati Meski Kaya Raya"] },
          { "no": 10, "title": "Menjaga Lingkungan Hidup Sehat", "jp": 15, "topics": ["Larangan Merusak Pohon & Sumber Air", "Menanam Pohon Niat Sedekah Oksigen", "Menghemat Air Bersih Saat Berwudu", "Menjaga Kebersihan Masjid/Sekolah"] }
        ]
      },
      {
        "id": "pjok",
        "title": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "elemen": {
          "Keterampilan Gerak": "Peserta didik mempraktikkan kombinasi gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pengetahuan Gerak": "Peserta didik memahami kombinasi gerak dasar lokomotor, non-lokomotor, dan manipulatif.",
          "Pemanfaatan Gerak": "Peserta didik memahami prosedur kebugaran jasmani dan pemeliharaan kesehatan.",
          "Pengembangan Karakter": "Peserta didik menunjukkan tanggung jawab, disiplin, kerja sama, dan menghargai perbedaan."
        },
        "chapters": [
          { "no": 1, "title": "Permainan Bola Besar (Sepak Bola)", "jp": 18, "topics": ["Teknik Mengumpan (Passing) dengan Kaki Dalam", "Teknik Mengontrol Bola (Control) dengan Sol Sepatu", "Bermain Sepak Bola Sederhana dengan Aturan Modifikasi", "Teknik Menembak Bola ke Gawang (Shooting)"] },
          { "no": 2, "title": "Daya Tahan Jantung dan Kebugaran", "jp": 18, "topics": ["Latihan Berlari Perlahan (Jogging) 12 Menit", "Latihan Lompat Tali (Skipping) Kontinu", "Mengukur Denyut Nadi Sebelum & Sesudah Latihan", "Menghitung Indeks Kebugaran Jasmani Mandiri"] },
          { "no": 3, "title": "Permainan Bola Kecil (Kasti)", "jp": 18, "topics": ["Teknik Melempar Bola Melambung & Mendatar", "Teknik Memukul Bola dengan Pemukul Kayu", "Teknik Menangkap Bola Melambung Tinggi", "Peraturan Modifikasi Kasti Ceria"] },
          { "no": 4, "title": "Atletik: Lompat Tinggi Gaya Dada", "jp": 18, "topics": ["Awalan Lompat Tinggi", "Tumpuan/Tolakan Kaki Terkuat", "Sikap Melayang di Atas Mistar", "Pendaratan di Matras Tebal"] },
          { "no": 5, "title": "Seni Bela Diri Pencak Silat", "jp": 18, "topics": ["Kombinasi Pola Langkah Kiri Kanan", "Tangkisan Luar & Tangkisan Dalam", "Hindaran Samping & Elakan Atas", "Peragaan Jurus Tunggal Sederhana"] },
          { "no": 6, "title": "Aktivitas Senam Lantai Ketangkasan", "jp": 18, "topics": ["Gerakan Lenting Tengkuk (Neck Spring)", "Gerakan Meroda (Cartwheel) dengan Runtut", "Gerakan Loncat Harimau secara Terkontrol", "Mencatat Evaluasi Gerak Teman Kelas"] },
          { "no": 7, "title": "Aktivitas Renang Gaya Bebas", "jp": 18, "topics": ["Gerakan Kaki Renang Gaya Bebas", "Ayun Lengan Gaya Bebas Berputar", "Teknik Pengambilan Napas Samping", "Praktek Berenang Jarak 15 Meter"] },
          { "no": 8, "title": "Bahaya Merokok, Minuman Keras, NAPZA", "jp": 18, "topics": ["Zat Chemical Berbahaya pada Rokok", "Dampak Buruk Alkohol terhadap Fungsi Tubuh", "Sanksi Hukum Penyalahgunaan NAPZA", "Kampanye Poster Sekolah Bebas Rokok"] }
        ]
      },
      {
        "id": "senirupa",
        "title": "Panduan Guru Seni Rupa",
        "elemen": {
          "Mengalami": "Peserta didik mengamati keindahan bentuk dan warna alam benda.",
          "Menciptakan": "Peserta didik mengekspresikan gagasan melalui lukisan atau kerajinan tangan.",
          "Merefleksikan": "Peserta didik mengapresiasi keunikan karya seni teman sekelas.",
          "Berpikir & Bekerja Artistik": "Peserta didik menggunakan bahan bekas untuk menciptakan karya seni."
        },
        "chapters": [
          { "no": 1, "title": "Menggambar Perspektif 1 Titik Hilang", "jp": 15, "topics": ["Mengenal Garis Horizon dan Titik Hilang", "Menggambar Koridor Kelas atau Jalan Raya", "Mewarnai Gambar dengan Efek Gelap Terang", "Proporsi Jarak Pohon Perspektif"] },
          { "no": 2, "title": "Seni Anyaman Tradisional", "jp": 15, "topics": ["Mengenal Berbagai Pola Anyaman (Silang Satu, Silang Dua)", "Membuat Anyaman Kertas Lipat", "Merancang Desain Wadah Anyaman Sederhana", "Apresiasi Kerajinan Anyaman Bambu"] },
          { "no": 3, "title": "Membuat Maket Rumah Adat", "jp": 14, "topics": ["Mengamati Struktur Rumah Adat Daerah", "Memotong Karton Tebal Berdasarkan Desain Skala", "Merakit Struktur Maket Menggunakan Lem", "Menghias Detal Ornamen Rumah Adat"] },
          { "no": 4, "title": "Seni Cetak Sablon Sederhana", "jp": 14, "topics": ["Mengenal Konsep Cetak Saring (Sablon)", "Memotong Pola Kertas Karton (Stencil)", "Mengaplikasikan Cat pada Kaos menggunakan Spons", "Mengeringkan Hasil Karya Sablon"] },
          { "no": 5, "title": "Eksplorasi Warna Monokrom", "jp": 14, "topics": ["Mengenal Konsep Lukisan Monokromatik", "Menggambar Objek dengan Efek Tint & Shade", "Mengapresiasi Lukisan Monokrom Teman"] },
          { "no": 6, "title": "Membuat Karya Relief dari Bubur Kertas", "jp": 14, "topics": ["Membuat Adonan Bubur Kertas Basah", "Menempel Bubur Kertas pada Triplek Sesuai Desain Sketsa", "Pewarnaan Relief Kertas yang Menarik"] },
          { "no": 7, "title": "Kreasi Gerabah Tanah Liat", "jp": 14, "topics": ["Teknik Pinch (Pijat Genggam) Tanah Liat", "Membuat Wadah/Vas Bunga Tradisional", "Mengeringkan dan Mewarnai Karya Gerabah"] },
          { "no": 8, "title": "Merancang Poster Kemanusiaan", "jp": 15, "topics": ["Merumuskan Pesan Sosial Kemanusiaan", "Membuat Layout Poster Berwarna Menarik", "Menggunakan Huruf/Tipografi yang Tegas"] },
          { "no": 9, "title": "Seni Kolase Kertas Warna", "jp": 14, "topics": ["Membuat Sketsa Gambar Objek", "Memotong & Menempel Serpihan Kertas Warna secara Rapi", "Menyusun Pola Harmonis"] },
          { "no": 10, "title": "Pameran Karya Seni Akhir Tahun", "jp": 15, "topics": ["Mengorganisasi Karya Seni Sendiri", "Mengatur Display Karya di Kelas", "Mengapresiasi Hasil Karya Seni Teman Sekelas"] }
        ]
      },
      {
        "id": "ipas",
        "title": "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
        "elemen": {
          "Pemahaman IPAS (Sains & Sosial)": "Peserta didik memahami cahaya, bunyi, ekosistem, bumi, sistem organ, dan geografi Indonesia.",
          "Keterampilan Proses": "Peserta didik mengajukan pertanyaan secara kritis, merencanakan penyelidikan ilmiah sederhana, dan menarik kesimpulan berdasarkan bukti."
        },
        "chapters": [
          { "no": 1, "title": "Cahaya dan Bunyi", "jp": 24, "topics": ["Sifat-Sifat Cahaya (Merambat Lurus, Menembus)", "Sifat-Sifat Bunyi (Merambat, Memantul)", "Bagian-Bagian Indra Penglihat (Mata)", "Bagian-Bagian Indra Pendengar (Telinga)"] },
          { "no": 2, "title": "Harmoni dalam Ekosistem", "jp": 24, "topics": ["Rantai Makanan dan Jaring-jaring Makanan", "Peran Produsen, Konsumen, dan Pengurai", "Dampak Perusakan Hutan bagi Ekosistem", "Keseimbangan Lingkungan"] },
          { "no": 3, "title": "Magnet dan Listrik", "jp": 22, "topics": ["Sifat-Sifat Magnet (Tarik-Menarik, Tolak)", "Energi Listrik Dinamis & Statis", "Pemanfaatan Listrik dalam Teknologi Rumah", "Membuat Bel Listrik Sederhana"] },
          { "no": 4, "title": "Bumi Kita Berubah", "jp": 22, "topics": ["Lapisan Bumi (Kerak, Mantel, Inti)", "Dampak Gempa Bumi dan Gunung Meletus", "Perubahan Bentuk Permukaan Bumi akibat Erosi", "Simulasi Siklus Air Panjang"] },
          { "no": 5, "title": "Sistem Organ Tubuh Manusia", "jp": 22, "topics": ["Sistem Pernapasan (Hidung, Paru-paru)", "Sistem Pencernaan (Mulut, Lambung, Usus)", "Sistem Peredaran Darah Manusia", "Penyakit Sistem Organ & Pencegahannya"] },
          { "no": 6, "title": "Indonesiaku Kaya Raya", "jp": 22, "topics": ["Letak Astronomis & Geografis Indonesia", "Potensi Sumber Daya Alam Maritim & Agraris", "Dampak Letak Geografis Terhadap Cuaca", "Menggambar Peta Indonesia Sederhana"] },
          { "no": 7, "title": "Daerahku Kebanggaanku", "jp": 22, "topics": ["Mengenal Sejarah Kebudayaan Daerah Setempat", "Tokoh Sejarah Pembawa Peradaban Daerah", "Aktivitas Ekonomi Keunggulan Kabupaten", "Menyusun Laporan Profil Daerah"] },
          { "no": 8, "title": "Proyek Belajar IPAS", "jp": 22, "topics": ["Merumuskan Masalah Ilmiah Sederhana", "Merancang Eksperimen Kelompok", "Mengumpulkan Data & Membuat Grafik", "Menyusun Laporan Percobaan Ilmiah Formal"] }
        ]
      },
      {
        "id": "english",
        "title": "Bahasa Inggris - My Next Words Grade 5",
        "elemen": {
          "Menyimak - Berbicara": "Peserta didik mampu merespons instruksi lisan kelas, mengekspresikan hobi, dan menyanyikan lagu anak-anak.",
          "Membaca - Memirsa": "Peserta didik mampu memahami teks deskriptif pendek bergambar tentang aktivitas sehari-hari.",
          "Menulis - Mempresentasikan": "Peserta didik mampu menulis kata/frasa bahasa Inggris sederhana tentang warna, angka, dan hewan."
        },
        "chapters": [
          { "no": 1, "title": "What Delicious Bakso!", "jp": 8, "topics": ["Vocabulary of food tastes (Sweet, Sour, Salty, Bitter)", "Stating taste preferences of foods", "Dialogue: Describing dinner experiences"] },
          { "no": 2, "title": "I Want an Ice Cream Cone", "jp": 8, "topics": ["Vocabulary of quantifying nouns ('a glass of', 'a plate of')", "Expressing quantities of foods ordered", "Roleplay: Buying snacks in the canteen"] },
          { "no": 3, "title": "How Much Is It?", "jp": 7, "topics": ["Numbers 50 to 100", "Asking for prices of items", "Dialogue: Simulating local market shopping"] },
          { "no": 4, "title": "I’ve Got a Stomachache", "jp": 7, "topics": ["Vocabulary of common health problems", "Expressing physical sicknesses", "Giving simple health recommendations"] },
          { "no": 5, "title": "What a Nice Skirt!", "jp": 7, "topics": ["Vocabulary of clothing items (Skirt, Shirt, Shoes)", "Describing clothing colors and conditions", "Dialogue: Commenting on friends' clothes"] },
          { "no": 6, "title": "Parts of Our Body That Work Together", "jp": 7, "topics": ["Vocabulary of body parts (Eyes, Nose, Shoulders)", "Describing physical functions of body parts", "Using verbs connected to body movements"] },
          { "no": 7, "title": "How Tall Are You?", "jp": 7, "topics": ["Adjectives for physical traits (Tall, Short, Fat, Thin)", "Asking for physical traits measurements", "Dialogue: Comparing heights with friends"] },
          { "no": 8, "title": "The Giraffe is Taller than the Deer", "jp": 7, "topics": ["Comparative adjectives grammar rule", "Comparing two animals on physical traits", "Writing comparative sentences"] },
          { "no": 9, "title": "The Elephant is the Biggest", "jp": 7, "topics": ["Superlative adjectives grammar rule", "Describing the highest quality animal in a group", "Writing superlative sentences"] },
          { "no": 10, "title": "I Like Playing Balap Karung", "jp": 7, "topics": ["Vocabulary of traditional games", "Vocabulary of months and dates", "Dialogue: Asking when events happen"] }
        ]
      },
      {
        "id": "jawa",
        "title": "Bahasa Jawa (Muatan Lokal)",
        "elemen": {
          "Menyimak (Ngrungokake)": "Peserta didik mampu menyimak, memahami, dan merespons instruksi lisan sederhana dalam bahasa Jawa (ngoko/krama).",
          "Membaca (Maca)": "Peserta didik mampu membaca kata-kata baru, memahami kalimat pendek, dan memaknai cerita bergambar berbahasa Jawa.",
          "Berbicara (Micara)": "Peserta didik mampu berbicara dengan santun sesuai unggah-ungguh basa Jawa (ngoko/krama) kepada guru dan teman.",
          "Menulis (Nulis)": "Peserta didik mampu menulis kata, kalimat pendek, dan aksara Jawa dasar legena secara benar."
        },
        "chapters": [
          { "no": 1, "title": "Dolanan Tradisional lan Pranata Sosial", "jp": 12, "topics": ["Maca Teks Deskripsi Dolanan Gobak Sodor", "Nulis Nilai Karakter ing Dolanan Tradisional", "Pacelathon Guyub Rukun marang Kanca", "Tembang Macapat Maskumambang"] },
          { "no": 2, "title": "Teks Narasi Lelakoning Urip (Nyata)", "jp": 12, "topics": ["Maca Teks Narasi Pengalaman Paling Lucu", "Nulis Ringkasan Teks Narasi Lelakoning Urip", "Mengidentifikasi Kosakata Serapan Basa Jawa", "Geguritan Tema Panguripan"] },
          { "no": 3, "title": "Gotong Royong ing Masyarakat", "jp": 12, "topics": ["Maca Wacana Gotong Royong Mbangun Gapura", "Nulis Ukara Ajakan Gotong Royong", "Basa Krama Alus Pacelathon marang Pak RT", "Tembang Macapat Mijil"] },
          { "no": 4, "title": "Ngopeni Lingkungan lan Peristiwa Alam", "jp": 12, "topics": ["Maca Teks Eksposisi Karusakan Lingkungan", "Nulis Ukara Cara Nyegah Karusakan Lingkungan", "Nyebutake Pahlawan Lingkungan ing Jawa", "Geguritan Tema Ngopeni Kali"] },
          { "no": 5, "title": "Wayang Karno Madeg Senopati", "jp": 12, "topics": ["Crita Wayang Karno Madeg Senopati", "Karakter Adipati Karno (Satria)", "Nulis Aksara Jawa nganggo Sandhangan lan Pasangan", "Maca Ukara Aksara Jawa mawi Pasangan"] },
          { "no": 6, "title": "Geguritan lan Tembang Maskumambang", "jp": 12, "topics": ["Maca Geguritan kanthi Wirama lan Wiraga", "Nulis Geguritan Tema Pendidikan", "Nembang Macapat Maskumambang", "Aturan Guru Gatra lan Guru Wilangan Tembang"] }
        ]
      },
      {
        "id": "koding",
        "title": "Koding dan Kecerdasan Artifisial (Edisi Revisi 2025)",
        "elemen": {
          "Algoritma dan Pemrograman": "Peserta didik memahami algoritma sederhana, urutan logis langkah-langkah penyelesaian masalah, dan pemrograman visual dasar.",
          "Berpikir Komputasional": "Peserta didik menerapkan konsep dekomposisi, pengenalan pola, abstraksi, dan algoritma sederhana dalam memecahkan masalah.",
          "Teknologi Informasi dan AI": "Peserta didik mengenal konsep dasar kecerdasan artifisial, cara kerja kecerdasan artifisial secara umum, serta etika keamanannya."
        },
        "chapters": [
          { "no": 1, "title": "Algoritma dan Pemrograman Visual (Scratch)", "jp": 24, "topics": ["Mengenal Algoritma & Urutan Langkah Logis", "Pengenalan Antarmuka Scratch (Sprite, Stage, Blocks)", "Membuat Animasi Bergerak Menggunakan Blok Kontrol", "Perulangan (Looping) dan Percabangan (If-Else) Dasar", "Proyek Game Sederhana: Menangkap Apel Jatuh"] },
          { "no": 2, "title": "Berpikir Komputasional Sehari-hari", "jp": 24, "topics": ["Dekomposisi (Memecah Masalah Besar Menjadi Kecil)", "Pengenalan Pola untuk Menyelesaikan Masalah", "Abstraksi (Mengabaikan Detail yang Tidak Penting)", "Algoritma Menjemur Pakaian / Menyeduh Teh"] },
          { "no": 3, "title": "Pengenalan Kecerdasan Artifisial (AI)", "jp": 24, "topics": ["Apa itu Kecerdasan Artifisial? (Perbedaan AI & Program Biasa)", "Bagaimana Mesin Belajar (Machine Learning) Dasar", "Penerapan AI di Kehidupan Sehari-hari (Rekomendasi Video, Deteksi Wajah)", "Etika dan Keamanan Penggunaan AI & Data Pribadi"] }
        ]
      }
    ]
  },
  "6": {
    "fase": "C",
    "subjects": [
      {
        "id": "indonesia",
        "title": "Bahasa Indonesia - Anak-anak yang Mengubah Dunia (Edisi Revisi)",
        "elemen": {
          "Menyimak": "Peserta didik mampu menganalisis informasi, ide pokok, dan gagasan dalam teks lisan.",
          "Membaca & Memirsa": "Peserta didik mampu membaca teks narasi, informatif, dan eksplanasi dengan kritis.",
          "Berbicara & Mempresentasikan": "Peserta didik mampu menyampaikan presentasi, berdiskusi, dan berpidato dengan santun.",
          "Menulis": "Peserta didik mampu menulis esai, teks deskripsi, surat, dan pidato dengan tata bahasa yang benar."
        },
        "chapters": [
          { "no": 1, "title": "Tokoh Dunia yang Inspiratif", "jp": 32, "topics": ["Membaca Teks Biografi Tokoh Pengubah Dunia", "Menemukan Kosakata Serapan Bahasa Asing", "Menganalisis Karakter Tokoh lewat Tindakannya", "Menulis Biografi Singkat Tokoh Setempat"] },
          { "no": 2, "title": "Melindungi Bumi dari Sampah Plastik", "jp": 32, "topics": ["Membaca Teks Opini Penggunaan Plastik Sekali Pakai", "Menyusun Argumen Logis Pro dan Kontra", "Menulis Surat Pembaca ke Media Massa", "Kampanye Poster Digital Bijak Plastik"] },
          { "no": 3, "title": "Menjelajahi Dunia Sains Populer", "jp": 32, "topics": ["Membaca Teks Artikel Ilmiah Populer", "Menjelaskan Arti Istilah Teknis dalam Wacana", "Menganalisis Hubungan Sebab Akibat Fenomena", "Menulis Artikel Opini Kebersihan Sekolah"] },
          { "no": 4, "title": "Jeda untuk Kemanusiaan", "jp": 32, "topics": ["Membaca Cerita Pendek bertema Empati Sosial", "Menemukan Majas Asosiasi dan Repetisi", "Menulis Naskah Drama Pendek tentang Toleransi", "Mempresentasikan Drama secara Kolaboratif"] },
          { "no": 5, "title": "Anak-Anak yang Mengubah Dunia", "jp": 32, "topics": ["Membaca Biografi Aktivis Cilik Internasional", "Mengidentifikasi Fakta dan Opini dalam Teks", "Cara Menulis Esai Persuasif Singkat", "Mempresentasikan Ide Kampanye Sosial"] },
          { "no": 6, "title": "Jasa-Jasa yang Terlupakan", "jp": 32, "topics": ["Membaca Teks Deskripsi Petugas Kebersihan Kota", "Kosakata Kehidupan Pekerja Informal", "Menulis Puisi Narasi bertema Pengabdian", "Apresiasi Karya Sastra Teman Kelompok"] },
          { "no": 7, "title": "Liburan Perpisahan", "jp": 32, "topics": ["Membaca Teks Narasi Rencana Kelulusan Sekolah", "Kosakata Masa Depan dan Cita-Cita", "Menulis Rencana Kegiatan Studi Tur Sekolah", "Kampanye Kebersihan Saat Berwisata"] },
          { "no": 8, "title": "Menuju Dunia Baru", "jp": 32, "topics": ["Membaca Cerpen Perpisahan Kelas VI", "Menggunakan Gaya Bahasa Sarkasme/Eufemisme", "Menulis Pidato Perpisahan Kelulusan Sekolah", "Laporan Hasil Penulisan Karya Kreatif"] }
        ]
      },
      {
        "id": "matematika",
        "title": "Matematika",
        "elemen": {
          "Bilangan": "Peserta didik dapat menyelesaikan operasi hitung bilangan bulat negatif.",
          "Aljabar": "Peserta didik dapat menyelesaikan teka-teki logika rasio dan kecepatan.",
          "Pengukuran": "Peserta didik menghitung luas permukaan bangun ruang gabungan.",
          "Geometri": "Peserta didik menganalisis hubungan antar sudut pada dua garis sejajar yang dipotong garis transversal."
        },
        "chapters": [
          { "no": 1, "title": "Bilangan Bulat Negatif", "jp": 28, "topics": ["Mengenal Bilangan Bulat Negatif dalam Kehidupan (Suhu, Kedalaman)", "Garis Bilangan Bulat", "Penjumlahan & Pengurangan Bilangan Bulat", "Perkalian & Pembagian Bilangan Bulat"] },
          { "no": 2, "title": "Rasio dan Kecepatan", "jp": 28, "topics": ["Konsep Rasio Sederhana", "Menghitung Jarak, Waktu, dan Kecepatan (J-W-K)", "Skala Peta dan Denah", "Soal Cerita Rasio Sehari-hari"] },
          { "no": 3, "title": "Kubus dan Balok (Volume & Luas Permukaan)", "jp": 26, "topics": ["Menghitung Volume Kubus", "Menghitung Volume Balok", "Menghitung Luas Permukaan Kubus/Balok", "Soal Cerita Volume Air Bak Mandi"] },
          { "no": 4, "title": "Peluang dan Pengolahan Data", "jp": 26, "topics": ["Mengenal Konsep Peluang Sederhana (Koin/Dadu)", "Menghitung Rata-Rata (Mean) Data Kelas", "Menentukan Nilai Tengah (Median) Data", "Menentukan Nilai Sering Muncul (Modus)"] },
          { "no": 5, "title": "Sistem Koordinat Cartesius Sederhana", "jp": 26, "topics": ["Mengenal Sumbu X lan Sumbu Y", "Menentukan Letak Titik Koordinat (X, Y)", "Menggambar Bangun Datar pada Bidang Koordinat", "Soal Cerita Menentukan Lokasi Peta"] },
          { "no": 6, "title": "Sudut dan Garis Sejajar", "jp": 26, "topics": ["Mengenal Sudut Berpelurus & Bertolak Belakang", "Hubungan Sudut pada Dua Garis Sejajar Dipotong Transversal", "Mengukur Sudut dengan Teknik Rumus", "Menggambar Sudut Menggunakan Alat"] }
        ]
      },
      {
        "id": "pancasila",
        "title": "Pendidikan Pancasila",
        "elemen": {
          "Pancasila": "Peserta didik mampu menerapkan nilai-nilai Pancasila dalam lingkup internasional.",
          "Undang-Undang Dasar NKRI 1945": "Peserta didik mampu merumuskan aturan kelas secara demokratis.",
          "Bhinneka Tunggal Ika": "Peserta didik mengenal kesenian dan budaya ASEAN serta toleransi.",
          "Negara Kesatuan Republik Indonesia": "Peserta didik memahami peranan Indonesia di dunia internasional."
        },
        "chapters": [
          { "no": 1, "title": "Hubungan Indonesia dengan ASEAN", "jp": 32, "topics": ["Sejarah Berdirinya ASEAN (Deklarasi Bangkok)", "Peran Penting Indonesia di Kawasan Asia Tenggara", "Bentuk Kerja Sama ASEAN di Bidang Pendidikan & Budaya", "Persatuan Antarnegara Kawasan ASEAN"] },
          { "no": 2, "title": "Perumusan Aturan Kelas Demokratis", "jp": 32, "topics": ["Mengadakan Musyawarah Kelas", "Merancang Kontrak Belajar Bersama", "Melaksanakan Kesepakatan dengan Tanggung Jawab Moral", "Sanksi Sosial bagi Pelanggar Aturan Kelas"] },
          { "no": 3, "title": "Persaudaraan Budaya Toleransi", "jp": 32, "topics": ["Apresiasi Kesenian Daerah Lintas Provinsi", "Toleransi Antaragama lan Rumah Ibadah", "Merancang Deklarasi Toleransi Sekolah", "Menolak Sikap Rasis & Diskriminasi Kelas"] },
          { "no": 4, "title": "Indonesia di Kancah Dunia", "jp": 32, "topics": ["Peran Aktif Indonesia dalam PBB", "Bantuan Kemanusiaan Internasional Indonesia", "Cinta Perdamaian Dunia Bebas Konflik", "Sikap Patriotisme Siswa Masa Kini"] }
        ]
      },
      {
        "id": "pai",
        "title": "Pendidikan Agama Islam dan Budi Pekerti (PAI)",
        "elemen": {
          "Al-Qur'an dan Hadis": "Peserta didik melafalkan, menghafal, dan memahami hukum bacaan Al-Qur'an.",
          "Akidah": "Peserta didik meyakini qada dan qadar Allah SWT.",
          "Akhlak": "Peserta didik menghindari perilaku tercela seperti hasad, ghibah, dan namimah.",
          "Fikih": "Peserta didik memahami ketentuan ibadah kurban dan zakat fitrah.",
          "Sejarah Peradaban Islam": "Peserta didik meneladani kisah nabi dan rasul di masa kelulusan sekolah."
        },
        "chapters": [
          { "no": 1, "title": "Indahnya Menghindari Perilaku Tercela", "jp": 13, "topics": ["Pengertian Dengki (Hasad) & Dampak Buruknya", "Menghindari Gosip (Ghibah) dalam Pergaulan", "Kisah Teladan Rasul Menghadapi Musuh", "Sikap Rendah Hati di Depan Teman"] },
          { "no": 2, "title": "Beriman Kepada Qada dan Qadar", "jp": 13, "topics": ["Pengertian Takdir Qada & Qadar", "Contoh Qada & Qadar dalam Kehidupan", "Sikap Ikhtiar dan Tawakal terhadap Takdir", "Hikmah Menerima Kenyataan dengan Lapang Dada"] },
          { "no": 3, "title": "Membaca Al-Qur'an Surah Al-Ma'idah", "jp": 13, "topics": ["Membaca Surah Al-Ma'idah Ayat 2-3", "Hukum Bacaan Idzhar & Ikhfa Sederhana", "Kandungan Tolong Menolong dalam Kebaikan", "Menolak Bekerjasama dalam Dosa"] },
          { "no": 4, "title": "Asmaul Husna: Al-Ghaffar & Al-Afuw", "jp": 13, "topics": ["Arti Al-Ghaffar (Maha Pengampun)", "Arti Al-Afuw (Maha Pemaaf)", "Penerapan Sikap Pemaaf Sesama Teman", "Memohon Ampun Hanya Kepada Allah"] },
          { "no": 5, "title": "Kisah Nabi Yunus a.s.", "jp": 12, "topics": ["Dakwah Nabi Yunus a.s. yang Ditolak", "Kisah Nabi Yunus di Dalam Perut Ikan", "Doa Taubat Nabi Yunus", "Keteladanan Sikap Tanggung Jawab Pemimpin"] },
          { "no": 6, "title": "Ketentuan Ibadah Kurban Sederhana", "jp": 13, "topics": ["Sejarah Ibadah Kurban (Nabi Ibrahim & Ismail)", "Hukum & Syarat Hewan Kurban", "Waktu Pelaksanaan Penyembelihan Kurban", "Pembagian Daging Kurban Kepada Fakir Miskin"] },
          { "no": 7, "title": "Menjaga Persaudaraan Sesama Muslim", "jp": 12, "topics": ["Konsep Ukhuwah Islamiyah", "Hak Muslim Terhadap Muslim Lainnya", "Menghindari Pertikaian Antar Kelompok", "Menciptakan Kerukunan Lingkungan Sekolah"] },
          { "no": 8, "title": "Zakat Fitrah Kewajiban Muslim", "jp": 13, "topics": ["Ketentuan Zakat Fitrah Menjelang Idul Fitri", "Takaran Zakat Fitrah Beras Baku", "Panitia Penerima Zakat Sekolah", "Pahala Membersihkan Jiwa dengan Zakat"] },
          { "no": 9, "title": "Kisah Nabi Zakaria a.s.", "jp": 13, "topics": ["Kisah Nabi Zakaria a.s. yang Sabar Menanti Keturunan", "Mukjizat Kelahiran Nabi Yahya a.s.", "Ketekunan Beribadah Nabi Zakaria", "Keteladanan Berdoa Tanpa Putus Asa"] },
          { "no": 10, "title": "Ketentuan Berpuasa Ramadan", "jp": 13, "topics": ["Hukum & Syarat Wajib Puasa Ramadan", "Hal-Hal yang Membatalkan Puasa", "Keutamaan Malam Lailatul Qadar", "Amalan Sunah di Bulan Ramadan"] }
        ]
      },
      {
        "id": "pjok",
        "title": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "elemen": {
          "Keterampilan Gerak": "Peserta didik mempraktikkan keterampilan gerak spesifik berbagai cabang olahraga.",
          "Pengetahuan Gerak": "Peserta didik memahami prosedur gerak spesifik berbagai cabang olahraga.",
          "Pemanfaatan Gerak": "Peserta didik mempraktikkan latihan kebugaran jasmani untuk peningkatan kesehatan.",
          "Pengembangan Karakter": "Peserta didik menunjukkan tanggung jawab, disiplin, kerja sama, dan menghargai perbedaan."
        },
        "chapters": [
          { "no": 1, "title": "Senam Lantai Sederhana", "jp": 16, "topics": ["Gerakan Guling Depan (Forward Roll)", "Gerakan Guling Belakang (Backward Roll)", "Gerakan Sikap Lilin Menjaga Keseimbangan", "Gerakan Loncat Harimau Terkontrol"] },
          { "no": 2, "title": "Bahaya Merokok dan Narkoba bagi Kesehatan", "jp": 16, "topics": ["Mengenal Zat Adiktif Berbahaya pada Rokok", "Dampak Buruk Narkoba terhadap Sistem Saraf", "Mengampanyekan Perilaku Hidup Sehat Tanpa Rokok", "Bahaya Minuman Keras bagi Organ Tubuh"] },
          { "no": 3, "title": "Permainan Bola Voli Spesifik", "jp": 16, "topics": ["Teknik Passing Bawah dengan Dua Tangan", "Teknik Passing Atas dengan Jari Terbuka", "Teknik Servis Bawah Bola Voli", "Permainan Voli Modifikasi Tim Ceria"] },
          { "no": 4, "title": "Gerak Dasar Seni Bela Diri", "jp": 16, "topics": ["Kuda-Kuda Depan & Kuda-Kuda Samping", "Pukulan Depan & Pukulan Silang", "Tangkisan Atas & Tangkisan Bawah", "Langkah Kaki Maju Mundur Silat"] },
          { "no": 5, "title": "Aktivitas Senam Alat Ketangkasan", "jp": 16, "topics": ["Lompat Melompati Peti Lompat Sederhana", "Gerakan Sikap Menggantung di Palang Tunggal", "Sikap Meroda dengan Benar", "Mencatat Evaluasi Gerak Teman Kelas"] },
          { "no": 6, "title": "Gerak Berirama Kombinasi Dinamis", "jp": 16, "topics": ["Langkah Kaki Berputar Berirama Musik", "Kombinasi Ayunan Lengan Samping Ganda", "Senam Kesehatan Jasmani (SKJ)", "Kekompakan Gerakan Irama Kelompok"] },
          { "no": 7, "title": "Penyelamatan di Aktivitas Air", "jp": 16, "topics": ["Cara Membantu Teman Kram di Air", "Menggunakan Alat Bantu Pelampung Darurat", "Gerakan Mengapung Menjaga Ketenangan", "Aturan Keselamatan Kolam Renang"] },
          { "no": 8, "title": "Kebersihan Alat Reproduksi Remaja", "jp": 16, "topics": ["Cara Membersihkan Organ Reproduksi secara Benar", "Memilih Celana Dalam yang Menyerap Keringat", "Bahaya Penyakit akibat Kurang Menjaga Kebersihan", "Perilaku Menolak Pelecehan Seksual Sederhana"] }
        ]
      },
      {
        "id": "senirupa",
        "title": "Panduan Guru Seni Rupa",
        "elemen": {
          "Mengalami": "Peserta didik mengamati keindahan bentuk dan warna alam benda.",
          "Menciptakan": "Peserta didik mengekspresikan gagasan melalui lukisan atau kerajinan tangan.",
          "Merefleksikan": "Peserta didik mengapresiasi keunikan karya seni teman sekelas.",
          "Berpikir & Bekerja Artistik": "Peserta didik menggunakan bahan bekas untuk menciptakan karya seni."
        },
        "chapters": [
          { "no": 1, "title": "Mengenal Ritme dan Kesatuan", "jp": 16, "topics": ["Mengamati Pola Berulang (Ritme) pada Kain Batik", "Menggambar Pola Berulang Menggunakan Cetakan", "Mewarnai Pola Ritmis dengan Keseimbangan Komposisi"] },
          { "no": 2, "title": "Membuat Karya Seni Kriya Fungsional", "jp": 16, "topics": ["Mengenal Karya Seni Kriya (Kotak Pensil, Gantungan Kunci)", "Membuat Desain Wadah Serbaguna dari Karton Bekas", "Menghias Seni Kriya dengan Pola Dekoratif"] },
          { "no": 3, "title": "Menggambar Pemandangan Perspektif 2 Titik Hilang", "jp": 16, "topics": ["Mengenal Titik Hilang Ganda Kiri & Kanan", "Sketsa Perspektif Gedung Sekolah dari Sudut", "Pewarnaan Efek Bayangan Gelap Terang", "Apresiasi Gambar Perspektif Teman"] },
          { "no": 4, "title": "Membuat Kerajinan Cetak Lilin Sederhana", "jp": 16, "topics": ["Mengenal Konsep Cetak Lilin (Batik Ikat)", "Mencairkan Lilin dengan Hati-Hati", "Menggambar Pola di Kain dengan Canting/Kuas", "Mewarnai Kain dengan Teknik Celup Hand-made"] },
          { "no": 5, "title": "Eksplorasi Patung Nusantara", "jp": 16, "topics": ["Mengenal Sejarah Patung Tradisional", "Membuat Model Patung dari Bahan Lunak (Sabun/Tanah Liat)", "Mengukir Detail Patung secara Manual"] },
          { "no": 6, "title": "Menggambar Poster Peduli Lingkungan", "jp": 16, "topics": ["Merumuskan Slogan Poster Lingkungan", "Layout dan Pewarnaan Poster Kontras", "Apresiasi Poster Hasil Kelompok Lain"] },
          { "no": 7, "title": "Membuat Miniatur Kendaraan", "jp": 16, "topics": ["Memotong Botol/Karton Bekas Sesuai Skema", "Merakit Roda dan Sumbu Kendaraan", "Menghias Kendaraan dengan Rasi Warna"] },
          { "no": 8, "title": "Pameran Seni Rupa Sekolah", "jp": 16, "topics": ["Mengorganisasi Karya Seni Sendiri", "Mengatur Display Pameran di Hall Sekolah", "Mengapresiasi Hasil Karya Seni Teman Sekelas"] }
        ]
      },
      {
        "id": "ipas",
        "title": "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
        "elemen": {
          "Pemahaman IPAS (Sains & Sosial)": "Peserta didik memahami tata surya, tata pemerintahan daerah/nasional, krisis energi, globalisasi, dan sejarah kemerdekaan Indonesia.",
          "Keterampilan Proses": "Peserta didik mengajukan pertanyaan secara kritis, merencanakan penyelidikan ilmiah sederhana, dan menarik kesimpulan berdasarkan bukti."
        },
        "chapters": [
          { "no": 1, "title": "Bumi dan Alam Semesta", "jp": 20, "topics": ["Sistem Tata Surya (Matahari, Planet, Asteroid)", "Rotasi Bumi & Akibatnya (Siang & Malam, Perbedaan Waktu)", "Revolusi Bumi & Akibatnya (Pergantian Musim)", "Mengenal Gerhana Bulan & Gerhana Matahari"] },
          { "no": 2, "title": "Menjelajahi Sistem Pemerintahan Indonesia", "jp": 20, "topics": ["Lembaga Eksekutif, Legislatif, Yudikatif", "Tugas dan Wewenang Presiden & DPR", "Peran Aktif Warga Negara dalam Demokrasi (Pemilu)", "Membuat Bagan Pemerintahan Daerah"] },
          { "no": 3, "title": "Listrik dan Energi Terbarukan", "jp": 20, "topics": ["Sistem Transmisi Energi Listrik PLN", "Pengenalan Panel Surya & Kincir Windu", "Eksperimen Pembuatan Generator Magnet", "Aksi Nyata Hemat Listrik di Sekolah"] },
          { "no": 4, "title": "Bumi Kita Berubah (Perubahan Iklim)", "jp": 20, "topics": ["Mekanisme Efek Rumah Kaca di Atmosfer", "Dampak Pemanasan Global terhadap Es Kutub", "Penyebab Kenaikan Suhu Permukaan Laut", "Upaya Mitigasi Perubahan Iklim Global"] },
          { "no": 5, "title": "Perjuangan Kemerdekaan RI", "jp": 20, "topics": ["Perlawanan Kerajaan Daerah Terhadap Penjajah", "Tokoh Pahlawan Pergerakan Nasional (Budi Utomo)", "Peristiwa Rengasdengklok & Proklamasi", "Sikap Mempertahankan Kemerdekaan Saben Dina"] },
          { "no": 6, "title": "Globalisasi dan Dampaknya", "jp": 20, "topics": ["Pengertian Globalisasi & Kemajuan Teknologi", "Dampak Positif & Negatif Globalisasi Budaya", "Cinta Produk Lokal Indonesia", "Sikap Bijak Menggunakan Media Sosial"] },
          { "no": 7, "title": "Kerjasama Dunia Internasional", "jp": 20, "topics": ["Hubungan Bilateral & Multilateral Indonesia", "Peran Indonesia di ASEAN & PBB", "Bentuk Kerjasama Pendidikan ASEAN", "Menjaga Kesejahteraan Lintas Negara"] },
          { "no": 8, "title": "Proyek Pelestarian Lingkungan", "jp": 20, "topics": ["Mengidentifikasi Masalah Pencemaran Sungai", "Merancang Alat Penyaring Air Sederhana", "Menghitung Keefektifan Alat Filter", "Dengan hormat, Menyusun Laporan Percobaan Ilmiah"] }
        ]
      },
      {
        "id": "english",
        "title": "Bahasa Inggris - My Next Words Grade 6",
        "elemen": {
          "Menyimak - Berbicara": "Peserta didik berkomunikasi lisan mengekspresikan kegiatan masa lampau dan petunjuk arah perjalanan.",
          "Membaca - Memirsa": "Peserta didik memahami teks instruksi resep masakan/manual alat elektronik.",
          "Menulis - Mempresentasikan": "Peserta didik merancang presentasi poster visual tentang pelestarian satwa liar."
        },
        "chapters": [
          { "no": 1, "title": "I studied last night, but my sister didn't", "jp": 6, "topics": ["Introduction to Past activities using regular verbs", "Constructing negative past sentences", "Dialogue: Comparing last night's study habits"] },
          { "no": 2, "title": "We went to a museum last week", "jp": 6, "topics": ["Vocabulary of historic places & activities", "Using irregular verbs (went, saw, ate)", "Dialogue: Recalling school study trips"] },
          { "no": 3, "title": "I was in Bali last week", "jp": 6, "topics": ["Using past to-be 'was' and 'were'", "Vocabulary of tourism sites", "Dialogue: Describing past holidays"] },
          { "no": 4, "title": "How did Cici feel yesterday?", "jp": 6, "topics": ["Vocabulary of feelings and emotions (Happy, Sad, Tired)", "Asking about past states of mind", "Using simple past adjectives"] },
          { "no": 5, "title": "What did you do yesterday?", "jp": 6, "topics": ["Asking what someone did in the past", "Constructing question forms of simple past", "Dialogue: Exchanging yesterday's activities"] },
          { "no": 6, "title": "My friend's experience", "jp": 6, "topics": ["Writing past descriptions of experiences", "Using conjunctions (Then, After that, Finally)", "Reading short narrative texts"] },
          { "no": 7, "title": "I will go to Bromo", "jp": 6, "topics": ["Introduction to Future plans using 'will'", "Vocabulary of scenic natural places", "Dialogue: Discussing future holiday plans"] },
          { "no": 8, "title": "I will go to Dufan", "jp": 6, "topics": ["Using 'will' for amusement park visits", "Vocabulary of theme park rides", "Dialogue: Expressing excitement about plans"] },
          { "no": 9, "title": "I will study at junior high school next year", "jp": 6, "topics": ["Describing future educational plans", "Vocabulary of school subjects", "Dialogue: Discussing dream secondary schools"] },
          { "no": 10, "title": "I want to be a pilot", "jp": 6, "topics": ["Vocabulary of future careers (Pilot, Doctor, Teacher)", "Expressing future ambitions using 'want to be'", "Dialogue: Exchanging dreams"] },
          { "no": 11, "title": "My dream", "jp": 4, "topics": ["Writing a short description of one's future dream", "Roleplaying future professions", "Reviewing past activities and future plans together"] }
        ]
      },
      {
        "id": "jawa",
        "title": "Bahasa Jawa (Muatan Lokal)",
        "elemen": {
          "Menyimak (Ngrungokake)": "Peserta didik mampu menyimak, memahami, lan merespons instruksi lisan sederhana dalam bahasa Jawa (ngoko/krama).",
          "Membaca (Maca)": "Peserta didik mampu membaca kata-kata baru, memahami kalimat pendek, dan memaknai cerita bergambar berbahasa Jawa.",
          "Berbicara (Micara)": "Peserta didik mampu berbicara dengan santun sesuai unggah-ungguh basa Jawa (ngoko/krama) kepada guru dan teman.",
          "Menulis (Nulis)": "Peserta didik mampu menulis kata, kalimat pendek, dan aksara Jawa dasar legena secara benar."
        },
        "chapters": [
          { "no": 1, "title": "Sesorah (Pidato Basa Jawa)", "jp": 11, "topics": ["Maca Teks Sesorah Perpisahan Kelas VI", "Perangan Sesorah (Surasa, Wasana, Purwaka)", "Praktek Sesorah kanthi Wirama lan Wirasa", "Nulis Teks Sesorah Tema Kelulusan"] },
          { "no": 2, "title": "Upacara Adat Jawa (Tradisi)", "jp": 11, "topics": ["Ngenal Upacara Adat Tedhak Siten / Sekaten", "Ubo Rampe ing Upacara Adat Jawa", "Maca Teks Deskripsi Upacara Adat", "Nulis Ukara Deskripsi Adat Jawa"] },
          { "no": 3, "title": "Wayang Gatotkaca lan Kepahlawanan", "jp": 11, "topics": ["Crita Wayang Gatotkaca Gugur", "Watak Kepahlawanan Gatotkaca (Gugur Bela Negara)", "Nulis Ukara Sifat-sifat Gatotkaca", "Tembang Macapat Pocung Piwulang Luhur"] },
          { "no": 4, "title": "Tembang Macapat Kinanthi", "jp": 10, "topics": ["Nembang Macapat Kinanthi", "Aturan Guru Gatra, Guru Lagu, lan Guru Wilangan", "Nulis Geguritan Tema Perpisahan Sekolah", "Nyimpulake Pitutur Luhur ing Tembang"] },
          { "no": 5, "title": "Nulis Aksara Jawa mawi Pasangan", "jp": 11, "topics": ["Nulis Aksara Jawa mawi Pasangan (Ka, Da, Ta, La)", "Maca Ukara Aksara Jawa mawi Pasangan", "Nulis Ukara Pasangan ing Papan Tulis", "Latihan Nyalin Teks Aksara Jawa menyang Latin"] },
          { "no": 6, "title": "Geguritan lan Crita Pengalaman", "jp": 10, "topics": ["Maca Geguritan Modern Tema Pamit Sekolah", "Nulis Crita Pengalaman Sing Paling Sedhih", "Nyusun Teks Cerita cekak Kelulusan Kelas VI", "Pacelathon Matur Nuwun marang Bapak/Ibu Guru"] }
        ]
      }
    ]
  }
};
