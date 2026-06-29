const fs = require('fs');

const file = "C:/Users/SDN WEDUSAN/.gemini/antigravity/scratch/deep-learning-modul-ajar/js/curriculum-db.js";
let content = fs.readFileSync(file, 'utf8');

// The elements for Pendidikan Agama Kristen (Kurikulum Merdeka)
const elemenKristen = {
  "Allah Berkarya": "Peserta didik memahami Allah menciptakan, memelihara, dan menyelamatkan manusia serta alam semesta.",
  "Manusia dan Nilai-nilai Kristiani": "Peserta didik memahami diri sebagai ciptaan Allah yang istimewa, mempraktikkan kasih, pengampunan, dan kejujuran.",
  "Gereja dan Masyarakat Majemuk": "Peserta didik memahami perannya di gereja dan menunjukkan sikap toleran dalam masyarakat majemuk.",
  "Alam dan Lingkungan Hidup": "Peserta didik menunjukkan tanggung jawab merawat dan melestarikan alam ciptaan Tuhan."
};

const chaptersKristen = {
  "1": [
    { "no": 1, "title": "Aku Istimewa Ciptaan Tuhan", "jp": 12, "topics": ["Diriku Unik dan Istimewa", "Kejadian 1:27 Manusia Gambar Allah", "Saling Menghargai Perbedaan Fisik", "Mengucap Syukur atas Diriku"] },
    { "no": 2, "title": "Bersyukur atas Anggota Tubuhku", "jp": 12, "topics": ["Mata untuk Melihat Kebaikan", "Mulut untuk Memuji Tuhan", "Telinga untuk Mendengar Nasihat", "Tanganku untuk Menolong Sesama"] },
    { "no": 3, "title": "Aku Merawat Tubuhku", "jp": 12, "topics": ["Tubuhku Bait Roh Kudus", "Cara Merawat Kesehatan Tubuh", "Makanan Bergizi dan Istirahat", "Menolak Perilaku Merusak Diri"] },
    { "no": 4, "title": "Aku Sayang Keluargaku", "jp": 12, "topics": ["Keluarga Berkat Terindah", "Menghormati Orang Tua (Sila ke-5 Alkitab)", "Membantu Pekerjaan Rumah Sederhana", "Kerukunan Kakak dan Adik"] },
    { "no": 5, "title": "Mengasihi Teman dan Guru", "jp": 12, "topics": ["Teman Bermain di Rumah dan Sekolah", "Sikap Menghargai Guru", "Berbagi Mainan dan Makanan", "Menyelesaikan Perselisihan dengan Damai"] },
    { "no": 6, "title": "Bersyukur untuk Alam Semesta", "jp": 12, "topics": ["Matahari, Bulan, dan Bintang", "Merawat Tanaman Pot di Rumah", "Menjaga Kebersihan Sumber Air", "Tindakan Sederhana Membuang Sampah"] }
  ],
  "2": [
    { "no": 1, "title": "Keluargaku Pemberian Tuhan", "jp": 12, "topics": ["Peran Ayah, Ibu, dan Anak", "Kisah Rut dan Naomi (Kasih Keluarga)", "Saling Mendoakan dalam Keluarga", "Bersyukur untuk Kakek dan Nenek"] },
    { "no": 2, "title": "Hidup Rukun di Rumah", "jp": 12, "topics": ["Arti Hidup Rukun Mazmur 133", "Menghindari Pertengkaran Rumah", "Membantu Anggota Keluarga Sakit", "Berbagi Tugas Secara Adil"] },
    { "no": 3, "title": "Mengasihi Teman Sekolah", "jp": 12, "topics": ["Berteman Tanpa Pilih Kasih", "Menolong Teman yang Terjatuh", "Menjenguk Teman Kelas yang Sakit", "Mengucapkan Kata Maaf dan Terima Kasih"] },
    { "no": 4, "title": "Aku Rajin Beribadah", "jp": 12, "topics": ["Pentingnya Ibadah Sekolah Minggu", "Berdoa Sebelum Makan dan Tidur", "Membaca Alkitab Setiap Hari", "Memuji Tuhan dengan Nyanyian Gembira"] },
    { "no": 5, "title": "Mengasihi Sesama yang Berbeda", "jp": 12, "topics": ["Toleransi Antar Umat Beragama", "Menghormati Perayaan Hari Raya Teman", "Keragaman Suku Bangsa di Indonesia", "Bekerjasama Tanpa Membeda-bedakan"] },
    { "no": 6, "title": "Merawat Lingkungan Sekolah", "jp": 12, "topics": ["Menjaga Kebersihan Halaman Sekolah", "Merawat Kebun dan Taman Sekolah", "Menghemat Penggunaan Air Bersih", "Tanggung Jawab Melestarikan Alam"] }
  ],
  "3": [
    { "no": 1, "title": "Indahnya Ciptaan Tuhan", "jp": 12, "topics": ["Kisah Penciptaan Hari 1-6 Kejadian 1", "Tuhan Menjadikan Segalanya Amat Baik", "Menjaga Keindahan Alam Sekitar", "Mensyukuri Ragam Hewan dan Tumbuhan"] },
    { "no": 2, "title": "Tuhan Memelihara Hidupku", "jp": 12, "topics": ["Pemeliharaan Tuhan bagi Manusia", "Tuhan Memberi Makanan dan Pakaian", "Mengatasi Rasa Kuatir Khotbah di Bukit", "Tuhan Melindungi di Waktu Bahaya"] },
    { "no": 3, "title": "Aku Membutuhkan Orang Lain", "jp": 12, "topics": ["Manusia sebagai Makhluk Sosial", "Saling Melengkapi Antar Teman", "Kerjasama Kelompok di Kelas", "Pentingnya Komunitas Gereja"] },
    { "no": 4, "title": "Menolong Sesama yang Lemah", "jp": 12, "topics": ["Kisah Orang Samaria yang Murah Hati", "Peduli pada Anak Yatim dan Fakir", "Menolong Teman yang Mengalami Musibah", "Mengorbankan Waktu untuk Kebaikan"] },
    { "no": 5, "title": "Mengucap Syukur dalam Segala Hal", "jp": 12, "topics": ["Sikap Bersyukur 1 Tesalonika 5:18", "Bersyukur Saat Senang maupun Sedih", "Menghindari Sikap Mengeluh", "Berbagi Sukacita dengan Sesama"] },
    { "no": 6, "title": "Merawat Kelestarian Air dan Udara", "jp": 12, "topics": ["Manfaat Air dan Udara bagi Kehidupan", "Mencegah Pencemaran Sungai", "Menanam Pohon untuk Udara Bersih", "Menjaga Kelestarian Ciptaan Tuhan"] }
  ],
  "4": [
    { "no": 1, "title": "Setara Ciptaan Allah", "jp": 12, "topics": ["Kejadian 1:26-27 Laki-laki & Perempuan", "Menghargai Kesetaraan Gender di Kelas", "Tugas Bersama Tanpa Sekat Gender", "Saling Melengkapi Ciptaan Allah"] },
    { "no": 2, "title": "Berharga di Mata Tuhan", "jp": 12, "topics": ["Mengenal Talenta Diri Matius 25", "Mengembangkan Potensi Diri secara Positif", "Menghargai Keunikan Talenta Orang Lain", "Menggunakan Talenta untuk Memuliakan Allah"] },
    { "no": 3, "title": "Allah Gembalaku yang Baik", "jp": 12, "topics": ["Mazmur 23 Tuhan Gembalaku", "Merasa Aman dalam Perlindungan Tuhan", "Tuhan Menuntun ke Jalan yang Benar", "Pemulihan Jiwa di Saat Sulit"] },
    { "no": 4, "title": "Yesus Mengasihi Semua Orang", "jp": 12, "topics": ["Yesus Menyembuhkan Orang Sakit", "Yesus Memberkati Anak-anak Kecil", "Mengasihi Musuh Lukas 6:27", "Tindakan Kasih Nyata Sehari-hari"] },
    { "no": 5, "title": "Melayani dengan Segenap Hati", "jp": 12, "topics": ["Pengertian Ibadah Roma 12:1", "Melayani Sekolah Minggu/Gereja", "Membantu Teman Tanpa Mengharapkan Pujian", "Kerja Keras sebagai Pelayanan"] },
    { "no": 6, "title": "Merawat Kebersihan Bumi", "jp": 12, "topics": ["Bumi sebagai Rumah Bersama", "Mengurangi Penggunaan Plastik Sekali Pakai", "Gerakan Memilah Sampah Kelompok", "Aksi Nyata Hijaukan Lingkungan"] }
  ],
  "5": [
    { "no": 1, "title": "Keluargaku dan Sekolahku", "jp": 12, "topics": ["Kehadiran Tuhan dalam Keluarga", "Sekolah sebagai Tempat Belajar & Bertumbuh", "Saling Mendukung Anggota Keluarga", "Menghormati Otoritas Sekolah"] },
    { "no": 2, "title": "Yesus Kristus Juru Selamat", "jp": 12, "topics": ["Karya Penyelamatan Yesus di Salib", "Kematian dan Kebangkitan Yesus", "Menerima Kasih Keselamatan Tuhan", "Menjadi Pengikut Kristus yang Setia"] },
    { "no": 3, "title": "Pribadi yang Mengalami Pemulihan", "jp": 12, "topics": ["Konsep Pertobatan dan Kelahiran Baru", "Meninggalkan Kebiasaan Buruk", "Bertumbuh dalam Buah Roh Galatia 5:22", "Kedewasaan Berpikir Anak Kristen"] },
    { "no": 4, "title": "Berteman Baik dengan Semua Orang", "jp": 12, "topics": ["Menjalin Persahabatan Sejati Amsal 17:17", "Menjaga Rahasia dan Kepercayaan Sahabat", "Toleransi Antar Umat Beragama di Lingkungan", "Mengatasi Bullying dengan Kasih Kristus"] },
    { "no": 5, "title": "Allah yang Pengampun", "jp": 12, "topics": ["Kisah Pengampunan Yusuf kepada Saudaranya", "Pentingnya Mengampuni Sesama Matius 18:22", "Mendamaikan Teman yang Berselisih", "Meminta Maaf secara Tulus"] },
    { "no": 6, "title": "Melestarikan Satwa dan Tumbuhan", "jp": 12, "topics": ["Kepedulian terhadap Kepunahan Satwa", "Melindungi Hutan sebagai Paru-Paru Dunia", "Menyayangi Hewan Peliharaan", "Tanggung Jawab Ekologis Kristen"] }
  ],
  "6": [
    { "no": 1, "title": "Allah Menyertai Langkahku", "jp": 12, "topics": ["Penyertaan Tuhan dalam Suka & Duka", "Kisah Yusuf di Mesir (Tuhan Menyertai)", "Mengandalkan Tuhan dalam Ujian Sekolah", "Menyerahkan Masa Depan kepada Tuhan"] },
    { "no": 2, "title": "Menggunakan Waktu dengan Bijak", "jp": 12, "topics": ["Segala Sesuatu Ada Waktunya Pengkhotbah 3", "Membuat Jadwal Harian Secara Teratur", "Menghindari Sikap Menunda Pekerjaan", "Waktu Berkualitas Bersama Keluarga"] },
    { "no": 3, "title": "Menghormati Otoritas dan Pemimpin", "jp": 12, "topics": ["Tunduk pada Pemerintah Roma 13", "Mentaati Peraturan Lalu Lintas", "Menghormati Keputusan Pemimpin Kelas", "Berdoa untuk Bangsa dan Negara"] },
    { "no": 4, "title": "Hidup sebagai Anak Terang", "jp": 12, "topics": ["Efesus 5:8 Hidup sebagai Anak Terang", "Menolak Kejujuran Palsu (Menyontek)", "Berkata Benar dan Jujur", "Menjadi Teladan Kebaikan Bagi Teman"] },
    { "no": 5, "title": "Gereja di Tengah Masyarakat Majemuk", "jp": 12, "topics": ["Menjadi Saksi Kristus yang Damai", "Pelayanan Kasih Lintas Suku/Agama", "Kerjasama Bakti Sosial Kemasyarakatan", "Menjaga Kerukunan Umat Beragama"] },
    { "no": 6, "title": "Bumi Sehat, Masa Depan Cerah", "jp": 12, "topics": ["Perubahan Iklim dan Peran Anak Kristen", "Gaya Hidup Ramah Lingkungan (Zero Waste)", "Hemat Energi di Rumah dan Sekolah", "Mewariskan Bumi yang Lestari"] }
  ]
};

// We will parse the CURRICULUM_DB from curriculum-db.js
// Since it is declared as const CURRICULUM_DB = { ... }, we can parse it as JS
const vm = require('vm');
const context = {};
vm.createContext(context);
vm.runInContext(content + "\n;this.db = CURRICULUM_DB;", context);

const db = context.db;

// Add Pendidikan Agama Kristen to each class
for (const kelas in db) {
  const subjects = db[kelas].subjects;
  // Check if kristen already exists, if not, add it
  const exists = subjects.some(s => s.id === "kristen");
  if (!exists) {
    subjects.push({
      id: "kristen",
      title: "Pendidikan Agama Kristen dan Budi Pekerti",
      elemen: elemenKristen,
      chapters: chaptersKristen[kelas]
    });
    console.log(`Added kristen to Kelas ${kelas}`);
  }
}

// Write the updated database back to the file
const newContent = "const CURRICULUM_DB = " + JSON.stringify(db, null, 2) + ";\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = CURRICULUM_DB;\n}\n";
fs.writeFileSync(file, newContent, 'utf8');
console.log("Database successfully updated!");
