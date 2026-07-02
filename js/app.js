// Application Core - Deep Learning Modul Ajar Generator
// Sesuai dengan Permendikdasmen No 13 Tahun 2025

// State global aplikasi
const state = {
  selectedClass: "5", // Default Kelas 5 (fokus Koding & AI)
  selectedSubjectId: "koding", 
  selectedSemester: "1", // Default Semester 1 (Ganjil)
  selectedChapterIdx: 0,
  selectedMeetingNum: 1,
  activeTab: "modulajar", // Default tab Modul Ajar
  teacherProfile: {
    namaGuru: "M. Irfan, S.Pd.",
    nip: "19940812 202305 1 002",
    namaSekolah: "SD Negeri Karangmangu 01",
    tahunAjaran: "2025/2026",
    kepalaSekolah: "Hj. Sumarsih, M.Pd.",
    nipKepala: "19720315 199603 2 001",
    kota: "Karangmangu"
  },
  // Cache dokumen yang telah disunting oleh guru
  editedDocuments: {}
};

// Inisialisasi Aplikasi setelah DOM dimuat
document.addEventListener("DOMContentLoaded", () => {
  initDropdowns();
  initProfileDisplay();
  initTabs();
  initEventListeners();
  renderWorkspace();
});

// Setup Dropdown Pilihan Kelas & Mapel
function initDropdowns() {
  const classSelect = document.getElementById("select-kelas");
  const subjectSelect = document.getElementById("select-mapel");
  const chapterSelect = document.getElementById("select-bab");
  const meetingSelect = document.getElementById("select-pertemuan");

  // Populate Classes 1-6
  classSelect.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const opt = document.createElement("option");
    opt.value = i.toString();
    opt.textContent = `Kelas ${i}`;
    if (i.toString() === state.selectedClass) opt.selected = true;
    classSelect.appendChild(opt);
  }

  updateSubjectDropdown();
  updateChapterDropdown();
  updateMeetingDropdown();
}

function updateSubjectDropdown() {
  const subjectSelect = document.getElementById("select-mapel");
  const classData = CURRICULUM_DB[state.selectedClass];
  
  subjectSelect.innerHTML = "";
  classData.subjects.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub.id;
    opt.textContent = sub.title;
    if (sub.id === state.selectedSubjectId) opt.selected = true;
    subjectSelect.appendChild(opt);
  });
}

function updateChapterDropdown() {
  const chapterSelect = document.getElementById("select-bab");
  const subData = getActiveSubjectData();
  
  chapterSelect.innerHTML = "";
  if (subData && subData.chapters) {
    const half = Math.ceil(subData.chapters.length / 2);
    const startIdx = state.selectedSemester === "1" ? 0 : half;
    const endIdx = state.selectedSemester === "1" ? half : subData.chapters.length;
    
    for (let idx = startIdx; idx < endIdx; idx++) {
      const ch = subData.chapters[idx];
      if (!ch) continue;
      const opt = document.createElement("option");
      opt.value = idx.toString();
      opt.textContent = `Bab ${ch.no}: ${ch.title}`;
      if (idx === state.selectedChapterIdx) opt.selected = true;
      chapterSelect.appendChild(opt);
    }
  }
}

function updateMeetingDropdown() {
  const meetingSelect = document.getElementById("select-pertemuan");
  const chData = getActiveChapterData();
  
  meetingSelect.innerHTML = "";
  if (chData && chData.topics) {
    chData.topics.forEach((topic, idx) => {
      const num = idx + 1;
      const opt = document.createElement("option");
      opt.value = num.toString();
      opt.textContent = `Pertemuan ${num} (Topik: ${topic.substring(0, 25)}...)`;
      if (num === state.selectedMeetingNum) opt.selected = true;
      meetingSelect.appendChild(opt);
    });
  }
}

// Helpers untuk mengambil data kurikulum aktif
function getActiveSubjectData() {
  const classData = CURRICULUM_DB[state.selectedClass];
  return classData.subjects.find(s => s.id === state.selectedSubjectId) || classData.subjects[0];
}

function getActiveChapterData() {
  const subData = getActiveSubjectData();
  return subData.chapters[state.selectedChapterIdx] || subData.chapters[0];
}

function getActiveTopicName() {
  const chData = getActiveChapterData();
  return chData.topics[state.selectedMeetingNum - 1] || chData.topics[0] || "Topik Pembelajaran";
}

// Inisialisasi Tampilan Profil Guru & Pre-fill Input Setup Panel
function initProfileDisplay() {
  document.getElementById("profile-guru-nama").textContent = state.teacherProfile.namaGuru;
  document.getElementById("profile-guru-sekolah").textContent = state.teacherProfile.namaSekolah;
  
  // Pre-fill input fields pada setup card di kiri
  document.getElementById("setup-nama-guru").value = state.teacherProfile.namaGuru;
  document.getElementById("setup-nip-guru").value = state.teacherProfile.nip;
  document.getElementById("setup-sekolah").value = state.teacherProfile.namaSekolah;
  document.getElementById("setup-kota").value = state.teacherProfile.kota || "Karangmangu";
  document.getElementById("setup-tahun-ajaran").value = state.teacherProfile.tahunAjaran;
  document.getElementById("setup-nama-kepsek").value = state.teacherProfile.kepalaSekolah;
  document.getElementById("setup-nip-kepsek").value = state.teacherProfile.nipKepala;
}

// Inisialisasi Tab Navigasi
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeTab = btn.dataset.tab;
      renderWorkspace();
    });
  });
}

// Setup Event Listeners untuk Interaksi Form
function initEventListeners() {
  // Listener perubahan Semester
  document.getElementById("select-semester").addEventListener("change", (e) => {
    state.selectedSemester = e.target.value;
    const half = Math.ceil(getActiveSubjectData().chapters.length / 2);
    state.selectedChapterIdx = state.selectedSemester === "1" ? 0 : half;
    state.selectedMeetingNum = 1;
    
    updateChapterDropdown();
    updateMeetingDropdown();
    renderWorkspace();
  });

  document.getElementById("select-kelas").addEventListener("change", (e) => {
    state.selectedClass = e.target.value;
    const classData = CURRICULUM_DB[state.selectedClass];
    state.selectedSubjectId = classData.subjects[0].id;
    const half = Math.ceil(classData.subjects[0].chapters.length / 2);
    state.selectedChapterIdx = state.selectedSemester === "1" ? 0 : half;
    state.selectedMeetingNum = 1;
    
    updateSubjectDropdown();
    updateChapterDropdown();
    updateMeetingDropdown();
    renderWorkspace();
  });

  document.getElementById("select-mapel").addEventListener("change", (e) => {
    state.selectedSubjectId = e.target.value;
    const half = Math.ceil(getActiveSubjectData().chapters.length / 2);
    state.selectedChapterIdx = state.selectedSemester === "1" ? 0 : half;
    state.selectedMeetingNum = 1;
    
    updateChapterDropdown();
    updateMeetingDropdown();
    renderWorkspace();
  });

  document.getElementById("select-bab").addEventListener("change", (e) => {
    state.selectedChapterIdx = parseInt(e.target.value);
    state.selectedMeetingNum = 1;
    
    updateMeetingDropdown();
    renderWorkspace();
  });

  document.getElementById("select-pertemuan").addEventListener("change", (e) => {
    state.selectedMeetingNum = parseInt(e.target.value);
    renderWorkspace();
  });

  // Sinkronisasi input setup panel kiri secara real-time
  const bindRealtimeSetupInput = (id, stateKey) => {
    document.getElementById(id).addEventListener("input", (e) => {
      state.teacherProfile[stateKey] = e.target.value;
      if (stateKey === "namaGuru") {
        document.getElementById("profile-guru-nama").textContent = e.target.value;
      }
      if (stateKey === "namaSekolah") {
        document.getElementById("profile-guru-sekolah").textContent = e.target.value;
      }
      renderWorkspace();
    });
  };

  bindRealtimeSetupInput("setup-nama-guru", "namaGuru");
  bindRealtimeSetupInput("setup-nip-guru", "nip");
  bindRealtimeSetupInput("setup-sekolah", "namaSekolah");
  bindRealtimeSetupInput("setup-kota", "kota");
  bindRealtimeSetupInput("setup-tahun-ajaran", "tahunAjaran");
  bindRealtimeSetupInput("setup-nama-kepsek", "kepalaSekolah");
  bindRealtimeSetupInput("setup-nip-kepsek", "nipKepala");

  // Tombol Profil Edit
  document.getElementById("btn-edit-profil").addEventListener("click", openProfileModal);
  
  const modalCancelBtns = document.querySelectorAll("#modal-cancel");
  modalCancelBtns.forEach(btn => btn.addEventListener("click", closeProfileModal));
  document.getElementById("modal-save").addEventListener("click", saveProfileModal);

  // Tombol Ekspor
  document.getElementById("btn-cetak-pdf").addEventListener("click", () => {
    const title = `${state.activeTab.toUpperCase()}_Kelas_${state.selectedClass}_${state.selectedSubjectId}_P${state.selectedMeetingNum}`;
    Exporter.triggerPrint("workspace-sheet", title);
  });

  document.getElementById("btn-unduh-word").addEventListener("click", () => {
    const title = `${state.activeTab.toUpperCase()}_Kelas_${state.selectedClass}_${state.selectedSubjectId}_P${state.selectedMeetingNum}`;
    Exporter.exportToWord("workspace-sheet", title);
  });
}

// Modal Profil
function openProfileModal() {
  document.getElementById("input-nama-guru").value = state.teacherProfile.namaGuru;
  document.getElementById("input-nip-guru").value = state.teacherProfile.nip;
  document.getElementById("input-sekolah").value = state.teacherProfile.namaSekolah;
  document.getElementById("input-kota").value = state.teacherProfile.kota || "Karangmangu";
  document.getElementById("input-tahun-ajaran").value = state.teacherProfile.tahunAjaran;
  document.getElementById("input-nama-kepsek").value = state.teacherProfile.kepalaSekolah;
  document.getElementById("input-nip-kepsek").value = state.teacherProfile.nipKepala;
  document.getElementById("profile-modal").style.display = "flex";
}

function closeProfileModal() {
  document.getElementById("profile-modal").style.display = "none";
}

function saveProfileModal() {
  state.teacherProfile.namaGuru = document.getElementById("input-nama-guru").value;
  state.teacherProfile.nip = document.getElementById("input-nip-guru").value;
  state.teacherProfile.namaSekolah = document.getElementById("input-sekolah").value;
  state.teacherProfile.kota = document.getElementById("input-kota").value;
  state.teacherProfile.tahunAjaran = document.getElementById("input-tahun-ajaran").value;
  state.teacherProfile.kepalaSekolah = document.getElementById("input-nama-kepsek").value;
  state.teacherProfile.nipKepala = document.getElementById("input-nip-kepsek").value;
  
  // Sinkronisasi balik ke input panel kiri
  initProfileDisplay();
  closeProfileModal();
  showToast("Profil Berhasil Diperbarui!");
  renderWorkspace();
}

// Tampilkan Toast Feedback
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:16px;height:16px;">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Sinkronisasi Perubahan Sunting Guru
function bindEditableEvents() {
  const editables = document.querySelectorAll(".editable-content");
  editables.forEach(el => {
    el.setAttribute("contenteditable", "true");
    el.addEventListener("blur", () => {
      const docKey = `${state.selectedClass}_${state.selectedSubjectId}_${state.selectedChapterIdx}_${state.selectedMeetingNum}_${state.activeTab}`;
      const elementId = el.dataset.field;
      
      if (!state.editedDocuments[docKey]) {
        state.editedDocuments[docKey] = {};
      }
      state.editedDocuments[docKey][elementId] = el.innerHTML;
    });
  });
}

// Mengambil Cache Edit Jika Ada
function getCachedContent(field, defaultVal) {
  const docKey = `${state.selectedClass}_${state.selectedSubjectId}_${state.selectedChapterIdx}_${state.selectedMeetingNum}_${state.activeTab}`;
  if (state.editedDocuments[docKey] && state.editedDocuments[docKey][field] !== undefined) {
    return state.editedDocuments[docKey][field];
  }
  return defaultVal;
}

// Helper to generate highly topic-specific Questions, LKPD tasks, and Rubrics dynamically
function getTopicSpecificQA(subjectId, topicName) {
  const topicLower = (topicName || "").toLowerCase();
  const subLower = (subjectId || "").toLowerCase();
  
  // Clean topicName for rendering (remove brackets/extra symbols)
  const cleanTopic = topicName.replace(/[\[\]]/g, "");

  const res = {
    questions: [],
    lkpdExercises: "",
    rubricExercises: "",
    kunciJawaban: ""
  };

  // Helper to get random item nouns for math/science
  const items = ["kelereng", "buku tulis", "pensil warna", "kancing baju", "stik es krim"];
  const item = items[Math.floor(cleanTopic.length % items.length)];

  if (subLower.includes("matematika")) {
    if (topicLower.includes("pecahan") || topicLower.includes("bagi") || topicLower.includes("pembagian") || topicLower.includes("persepuluh") || topicLower.includes("persen")) {
      res.questions = [
        `Apa arti dari pembagian pecahan senilai dalam topik "${cleanTopic}" dan mengapa melipat kertas lipat bisa membuktikannya?`,
        `Jika sepotong kue dipotong menjadi 6 bagian sama besar untuk dibagikan secara adil, berapakah nilai pecahan untuk 2 potongan kue tersebut?`,
        `Bagaimana cara membuktikan bahwa pecahan 2/4 nilainya setara dengan pecahan 1/2?`
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Mengamati Pecahan dengan Kertas Lipat</b><br>
        1. Lipatlah kertas origamimu menjadi 4 bagian sama besar. Arsir 2 bagian. Berapa bagian pecahan yang diarsir?<br>A. 1/4<br>B. 2/4 (atau 1/2)<br>C. 3/4</p>
        <p>2. Jika Helen memotong satu buah melon menjadi 8 bagian, lalu membagikannya kepada 4 teman secara adil, berapakah potongan melon yang diterima masing-masing anak?<br>A. 2 potongan<br>B. 3 potongan<br>C. 4 potongan</p>
        <p><b>D. Tantangan 2: Soal Cerita Uraian</b><br>
        Tuliskan contoh pembagian makanan secara adil yang menerapkan konsep "${cleanTopic}" yang pernah kamu lakukan di rumah bersama saudaramu!</p>
      `;
      res.rubricExercises = `
        <p>1. Tentukan pecahan paling sederhana dari 4/8!<br>A. 1/2<br>B. 1/4<br>C. 3/4</p>
        <p>2. Slamet mempunyai selembar roti, lalu memotongnya menjadi 6 bagian. Roti tersebut diberikan kepada teman sebanyak 2 bagian. Berapa sisa roti Slamet dalam bentuk pecahan?<br>A. 2/6<br>B. 4/6<br>C. 5/6</p>
        <p>3. Gambarkan arsiran lingkaran untuk menunjukkan bentuk pecahan 3/4!</p>
      `;
      res.kunciJawaban = `
        1. A (1/2) - Skor: 30<br>
        2. B (4/6) - Skor: 30<br>
        3. Gambar lingkaran terbagi 4 bagian sama besar dengan 3 bagian diarsir - Skor: 40
      `;
    } else if (topicLower.includes("10.000") || topicLower.includes("digit") || topicLower.includes("ribuan") || (topicLower.includes("cacah") && !topicLower.includes("100"))) {
      res.questions = [
        `Jika kalian membeli jus mangga di warung seharga Rp7.350, bagaimana cara kalian mengeja nama bilangan tersebut?`,
        `Mengapa angka nol (0) di tengah bilangan seperti 5.091 tidak dieja kata "nol"? Tuliskan cara bacanya!`,
        `Puncak Gunung Semeru tingginya 3.676 meter. Bagaimana cara kita menuliskan lambang angka tersebut?`
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Mengamati Nilai Tempat Belanja</b><br>
        Slamet membeli biskuit di warung seharga Rp7.350,00. Slamet membayar menggunakan selembar uang pecahan Rp9.500,00 dan menerima kembalian sebesar Rp2.150,00.</p>
        <p>1. Tentukan nilai tempat angka 7.350:<br>Ribuan = 7, Ratusan = 3, Puluhan = 5, Satuan = 0.<br>
        Cara Membaca Bilangan 7.350 adalah: <i>Tujuh Ribu Tiga Ratus Lima Puluh Rupiah</i>.</p>
        <p>2. Tentukan nilai tempat angka 2.150:<br>Ribuan = 2, Ratusan = 1, Puluhan = 5, Satuan = 0.<br>
        Cara Membaca Bilangan 2.150 adalah: <i>Dua Ribu Seratus Lima Puluh Rupiah</i>.</p>
      `;
      res.rubricExercises = `
        <p>1. Lambang bilangan 5.091 dibaca...<br>A. Lima ribu sembilan puluh satu<br>B. Lima ribu sembilan ratus satu<br>C. Lima ribu nol ratus sembilan puluh satu</p>
        <p>2. Lambang bilangan 1.206 dibaca...<br>A. Seribu dua ratus enam<br>B. Satu ribu dua ratus enam<br>C. Seribu dua puluh enam</p>
        <p>3. Jarak dari minimarket ke rumah Helen adalah tiga ribu dua ratus delapan puluh enam meter. Tuliskan lambang bilangannya!</p>
      `;
      res.kunciJawaban = `
        1. A (Lima ribu sembilan puluh satu) - Skor: 30<br>
        2. A (Seribu dua ratus enam) - Skor: 30<br>
        3. Lambang angka: 3.286 - Skor: 40
      `;
    } else if (topicLower.includes("tambah") || topicLower.includes("jumlah") || topicLower.includes("penjumlahan") || topicLower.includes("kurang") || topicLower.includes("selisih") || topicLower.includes("pengurangan")) {
      res.questions = [
        `Sebutkan contoh transaksi belanja di warung terdekat yang menerapkan penjumlahan dan pengurangan!`,
        `Bagaimana cara mudah menjumlahkan bilangan bersusun dengan teknik menyimpan jika nilainya lebih dari 9?`,
        `Jika kamu memiliki 15 butir kelereng dan memberikan 7 butir kepada temanmu, berapa sisa kelerengmu saat ini?`
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Operasi Bilangan</b><br>
        1. Kakak memiliki 25 butir ${item}, lalu dibelikan Ayah lagi sebanyak 17 butir. Berapakah jumlah total ${item} Kakak?<br>A. 40 butir<br>B. 42 butir<br>C. 45 butir</p>
        <p>2. Di atas piring terdapat 32 kue. Setelah dimakan bersama-sama, tersisa 15 kue di piring. Berapa jumlah kue yang telah dimakan?<br>A. 17 kue<br>B. 18 kue<br>C. 20 kue</p>
        <p><b>D. Tantangan 2: Soal Cerita Uraian</b><br>
        Tuliskan cara penyelesaian bersusun untuk menghitung 48 + 25 secara rapi!</p>
      `;
      res.rubricExercises = `
        <p>1. Hitunglah hasil dari 56 - 29 bersusun!<br>A. 27<br>B. 28<br>C. 37</p>
        <p>2. Tentukan nilai tempat angka 7 pada bilangan 73!<br>A. Satuan<br>B. Puluhan<br>C. Ratusan</p>
        <p>3. Ani membeli pensil seharga Rp3.000 dan buku seharga Rp5.000. Jika ia membayar dengan uang Rp10.000, berapakah kembalian yang diterima Ani?</p>
      `;
      res.kunciJawaban = `
        1. A (27) - Skor: 30<br>
        2. B (Puluhan) - Skor: 30<br>
        3. Total belanja Rp8.000, kembalian Rp10.000 - Rp8.000 = Rp2.000 - Skor: 40
      `;
    } else if (topicLower.includes("kali") || topicLower.includes("perkalian")) {
      res.questions = [
        "Mengapa perkalian sering disebut sebagai penjumlahan yang berulang?",
        `Bagaimana susunan baris dan kolom (matriks stik es krim) membantu kita menghitung perkalian bertema "${cleanTopic}"?`,
        "Berapakah hasil dari 6 dikalikan dengan 4?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Kelompok Perkalian</b><br>
        1. Ubahlah penjumlahan berulang 5 + 5 + 5 + 5 ke dalam bentuk perkalian!<br>A. 3 x 5<br>B. 4 x 5<br>C. 5 x 5</p>
        <p>2. Ada 4 kotak mainan di meja. Setiap kotak berisi 8 mobil-mobilan. Berapa jumlah total mobil-mobilan tersebut?<br>A. 28 mobil<br>B. 32 mobil<br>C. 36 mobil</p>
        <p><b>D. Tantangan 2: Soal Uraian</b><br>
        Gambarkan susunan grid bintang berukuran 3 baris x 5 kolom, lalu tentukan hasil perkaliannya!</p>
      `;
      res.rubricExercises = `
        <p>1. Berapakah hasil dari 7 x 6?<br>A. 42<br>B. 48<br>C. 54</p>
        <p>2. Jika 9 x 3 = 27, tentukan bentuk penjumlahan berulangnya!<br>A. 9+9+9<br>B. 3+3+3+3+3+3+3+3+3<br>C. A dan B benar</p>
        <p>3. Paman membeli 5 kantong plastik jeruk. Setiap kantong berisi 12 buah jeruk. Hitunglah jumlah total jeruk yang dibeli Paman!</p>
      `;
      res.kunciJawaban = `
        1. A (42) - Skor: 30<br>
        2. C (A dan B benar secara matematis) - Skor: 30<br>
        3. 5 x 12 = 60 buah jeruk - Skor: 40
      `;
    } else if (topicLower.includes("bangun") || topicLower.includes("geometri") || topicLower.includes("datar") || topicLower.includes("ruang") || topicLower.includes("sudut")) {
      res.questions = [
        "Sebutkan 3 benda nyata di dalam ruang kelas kita yang berbentuk persegi panjang!",
        "Apa perbedaan utama antara bangun datar segitiga dengan segiempat?",
        "Bagaimana cara kita membuat sudut siku-siku menggunakan lipatan kertas?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Mengamati Bentuk Bangun</b><br>
        1. Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku disebut...<br>A. Persegi panjang<br>B. Persegi<br>C. Segitiga</p>
        <p>2. Di bawah ini benda nyata yang permukaannya berbentuk lingkaran adalah...<br>A. Permukaan buku tulis<br>B. Roda sepeda<br>C. Atap rumah segitiga</p>
        <p><b>D. Tantangan 2: Soal Uraian</b><br>
        Gambarkan bangun segitiga sama sisi dan tandai letak ketiga sudutnya secara jelas!</p>
      `;
      res.rubricExercises = `
        <p>1. Jumlah sudut yang dimiliki oleh bangun segitiga adalah...<br>A. 3 sudut<br>B. 4 sudut<br>C. 5 sudut</p>
        <p>2. Bangun ruang yang memiliki bentuk seperti kotak sepatu disebut...<br>A. Kubus<br>B. Balok<br>C. Bola</p>
        <p>3. Sebutkan nama-nama bangun ruang yang membentuk benda jam dinding bulat, kaleng susu cair, dan buah jeruk!</p>
      `;
      res.kunciJawaban = `
        1. A (3 sudut) - Skor: 30<br>
        2. B (Balok) - Skor: 30<br>
        3. Jam dinding (Lingkaran/Tabung), Kaleng susu (Tabung), Buah jeruk (Bola) - Skor: 40
      `;
    } else if (topicLower.includes("ukur") || topicLower.includes("panjang") || topicLower.includes("berat") || topicLower.includes("volume") || topicLower.includes("jam") || topicLower.includes("waktu") || topicLower.includes("uang")) {
      res.questions = [
        "Mengapa kita membutuhkan penggaris standar daripada jengkal tangan untuk mengukur meja?",
        "Bagaimana cara membaca jarum panjang dan pendek pada jam dinding?",
        "Sebutkan pecahan uang rupiah mainan yang nilainya setara dengan satu lembar uang Rp10.000!"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Mengukur Dimensi</b><br>
        1. Jika panjang pensilmu adalah 14 cm and panjang penghapusmu adalah 5 cm, berapakah selisih panjang keduanya?<br>A. 8 cm<br>B. 9 cm<br>C. 19 cm</p>
        <p>2. Jarum pendek jam menunjuk angka 9 dan jarum panjang menunjuk angka 12. Jam tersebut menunjukkan pukul...<br>A. 09.00<br>B. 12.00<br>C. 12.09</p>
        <p><b>D. Tantangan 2: Soal Uraian</b><br>
        Gambarkan jarum jam dinding analog untuk menunjukkan waktu pukul 04.30 sore!</p>
      `;
      res.rubricExercises = `
        <p>1. Satuan panjang baku yang biasanya tertera pada penggaris sekolah adalah...<br>A. Kilogram (kg)<br>B. Sentimeter (cm)<br>C. Meter (m)</p>
        <p>2. Ani memiliki uang 2 lembar Rp5.000. Uang Ani setara dengan...<br>A. 1 lembar Rp10.000<br>B. 5 lembar Rp2.000<br>C. Pilihan A dan B benar</p>
        <p>3. Hitunglah total berat belanjaan Ibu jika Ibu membeli 2 kg beras dan 3 kg gula pasir di warung tetangga!</p>
      `;
      res.kunciJawaban = `
        1. B (Sentimeter) - Skor: 30<br>
        2. C (A dan B benar) - Skor: 30<br>
        3. 2 kg + 3 kg = 5 kg total berat belanjaan Ibu - Skor: 40
      `;
    } else {
      // Heuristic Fallback for Mathematics
      res.questions = [
        `Bagaimana konsep matematika tentang "${cleanTopic}" membantu kita memecahkan masalah sehari-hari secara adil?`,
        "Mengapa kita harus menggambarkan pola visual terlebih dahulu sebelum menuliskan simbol formal perhitungan matematika?",
        "Bagaimana caramu membuktikan bahwa hasil pengerjaan kelompokmu sudah benar?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Studi Kasus Toko Kelontong</b><br>
        Helen membeli perlengkapan belajar di toko alat tulis. Ia melihat data harga barang dan menyusun kelompok benda untuk menghitung konsep "${cleanTopic}".</p>
        <p>1. Di meja ada 12 buah ${item}. Budi mengambil 5 buah. Berapa sisa ${item} yang ada di meja sekarang?<br>A. 5 buah<br>B. 7 buah<br>C. 8 buah</p>
        <p>2. Dari penyusunan stik hitung di atas, lambang bilangan yang tepat untuk hasil akhirnya adalah...<br>A. Angka 7<br>B. Angka 12<br>C. Angka 5</p>
        <p><b>D. Tantangan 2: Soal Cerita Uraian</b><br>
        Tuliskan satu contoh bagaimana kamu menerapkan konsep "${cleanTopic}" ini ketika beraktivitas di rumah!</p>
      `;
      res.rubricExercises = `
        <p>1. Selesaikan persoalan matematika terkait "${cleanTopic}" yang telah dipelajari dengan jujur!<br>A. Hasil benar dan runtut<br>B. Hasil salah<br>C. Meniru pekerjaan teman</p>
        <p>2. Sebutkan satu manfaat mempelajari materi ini dalam kegiatan jual beli di pasar tradisional!</p>
      `;
      res.kunciJawaban = `
        1. A (Hasil benar dan runtut) - Skor: 50<br>
        2. Membantu menghitung kembalian uang belanja agar tidak salah - Skor: 50
      `;
    }
  }
  else if (subLower.includes("koding")) {
    if (topicLower.includes("algoritma") || topicLower.includes("langkah logis")) {
      res.questions = [
        "Apa pengertian algoritma dalam koding dan mengapa urutannya tidak boleh tertukar?",
        "Sebutkan contoh algoritma sederhana yang kamu lakukan sebelum makan siang!",
        "Apa yang terjadi jika urutan langkah menyalakan laptop diacak?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Algoritma Runtun</b><br>
        1. Urutan langkah sistematis untuk menyelesaikan masalah disebut...<br>A. Variabel<br>B. Algoritma<br>C. Loop</p>
        <p>2. Susunlah algoritma membuat teh manis berikut: (1) Seduh teh, (2) Tuang air panas, (3) Masukkan gula, (4) Aduk rata. Urutan yang logis adalah...<br>A. 2-1-3-4<br>B. 3-2-1-4<br>C. 1-2-3-4</p>
        <p><b>D. Tantangan 2: Diagram Alir Mandiri</b><br>
        Tuliskan algoritma mencuci tangan kelompokmu menggunakan kata-kata singkat terurut!</p>
      `;
      res.rubricExercises = `
        <p>1. Mengapa algoritma koding harus disusun secara logis dan terstruktur?<br>A. Supaya komputer tidak bingung dan tidak eror<br>B. Supaya komputer bisa berpikir sendiri tanpa kode<br>C. Supaya tampilan komputer penuh warna</p>
        <p>2. Manakah algoritma yang benar untuk masuk kelas pagi?<br>A. Bel berbunyi -> berbaris -> bersalaman -> masuk kelas<br>B. Masuk kelas -> bersalaman -> bel berbunyi -> berbaris</p>
        <p>3. Buatlah bagan alir (flowchart) sederhana dari algoritma menyalakan lampu kamar tidur!</p>
      `;
      res.kunciJawaban = `
        1. A (Supaya komputer tidak bingung) - Skor: 30<br>
        2. A (Bel berbunyi -> berbaris -> bersalaman -> masuk kelas) - Skor: 30<br>
        3. Gambar diagram alir terurut (Mulai -> Klik Saklar -> Lampu Menyala -> Selesai) - Skor: 40
      `;
    } else if (topicLower.includes("antarmuka") || topicLower.includes("scratch") || topicLower.includes("sprite") || topicLower.includes("stage")) {
      res.questions = [
        "Di bagian antarmuka mana kita dapat melihat jalannya program animasi koding (Stage/Block Palette)?",
        "Apa kegunaan dari Sprite List pada editor Scratch?",
        "Bagaimana cara kita menambahkan background/latar belakang baru di Stage?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Bagian Scratch</b><br>
        1. Karakter atau objek gambar yang bisa dikode dan digerakkan di Scratch disebut...<br>A. Backdrop<br>B. Sprite<br>C. Stage</p>
        <p>2. Tempat berkumpulnya kumpulan blok kode perintah seperti Gerakan, Tampilan, dan Suara disebut...<br>A. Script Area<br>B. Block Palette<br>C. Sprite List</p>
      `;
      res.rubricExercises = `
        <p>1. Area kerja tempat kita menata dan menyatukan blok-blok kode Scratch disebut...<br>A. Script Area<br>B. Stage<br>C. File Menu</p>
        <p>2. Jika kita ingin menghapus sprite kucing bawaan Scratch, tombol gambar apa yang harus diklik pada Sprite List?<br>A. Tombol Tong Sampah<br>B. Tombol Tambah<br>C. Tombol Mata</p>
        <p>3. Sebutkan fungsi dari tombol bendera hijau (Green Flag) dan tombol lingkaran merah (Red Stop) pada editor Scratch!</p>
      `;
      res.kunciJawaban = `
        1. A (Script Area) - Skor: 30<br>
        2. A (Tong Sampah) - Skor: 30<br>
        3. Bendera Hijau untuk menjalankan program koding, Lingkaran Merah untuk menghentikan program - Skor: 40
      `;
    } else if (topicLower.includes("ulang") || topicLower.includes("loop") || topicLower.includes("cabang") || topicLower.includes("jika") || topicLower.includes("if") || topicLower.includes("else")) {
      res.questions = [
        "Apa perbedaan blok \"ulangi 10 kali\" dengan blok \"selamanya\" di Scratch?",
        "Kapan kita harus menggunakan logika percabangan \"jika-maka (if-else)\" dalam koding?",
        "Bagaimana cara mencegah sprite keluar dari pinggir layar menggunakan logika perulangan?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Logika Koding</b><br>
        1. Blok kode yang digunakan untuk mengulang suatu perintah secara terus-menerus adalah...<br>A. Ulangi 10<br>B. Selamanya (Forever)<br>C. Jika (If)</p>
        <p>2. Blok koding yang dijalankan apabila suatu kondisi terpenuhi (misal menyentuh rintangan) menggunakan blok...<br>A. Gerakan<br>B. Tampilan<br>C. Jika... Maka (If... Then)</p>
      `;
      res.rubricExercises = `
        <p>1. Manakah blok kode Sensor yang dipasang di dalam blok IF untuk mendeteksi warna rintangan?<br>A. Menyentuh warna (...) ?<br>B. Katakan hello!<br>C. Mainkan suara</p>
        <p>2. Apa yang terjadi jika kita memasang perintah 'berputar 15 derajat' di dalam blok 'selamanya'?<br>A. Sprite diam saja<br>B. Sprite berputar terus-menerus tanpa henti<br>C. Sprite menghilang dari layar</p>
        <p>3. Gambarkan susunan blok kode sederhana untuk membuat Sprite bergerak maju 10 langkah berulang selamanya!</p>
      `;
      res.kunciJawaban = `
        1. A (Menyentuh warna) - Skor: 30<br>
        2. B (Sprite berputar terus-menerus) - Skor: 30<br>
        3. Gambar blok [selamanya] membungkus blok [gerak 10 langkah] - Skor: 40
      `;
    } else {
      // Heuristic Fallback for Koding
      res.questions = [
        `Apa tujuan utama dari proyek koding bertema "${cleanTopic}" yang kita buat di Scratch hari ini?`,
        `Bagaimana logika variabel atau perulangan membantumu mengefisiensikan program "${cleanTopic}" ini?`,
        "Bagaimana caramu menguji (testing) dan men-debug bug agar game buatan kelompokmu bisa berjalan sukses?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Perancangan Proyek Koding</b><br>
        1. Langkah awal sebelum mengetik di perangkat digital Scratch adalah merancang alur logika menggunakan...<br>A. Coreldraw saja<br>B. Flowchart visual atau sketsa gambar alur<br>C. Langsung mematikan komputer</p>
        <p>2. Menemukan kesalahan logika pada blok kode program dan memperbaikinya disebut...<br>A. Coding<br>B. Debugging<br>C. Compilation</p>
      `;
      res.rubricExercises = `
        <p>1. Tuliskan susunan blok koding Scratch yang kelompokmu gunakan untuk merancang proyek "${cleanTopic}"!</p>
        <p>2. Apa fungsi tombol Bendera Hijau (Green Flag) pada program Scratch?</p>
      `;
      res.kunciJawaban = `
        1. Susunan blok logis Scratch (misal Event clicked, Control forever/if) - Skor: 50<br>
        2. Memulai jalannya kode program yang telah disusun - Skor: 50
      `;
    }
  }
  else if (subLower.includes("ipas")) {
    if (topicLower.includes("cahaya") || topicLower.includes("cermin") || topicLower.includes("optik") || topicLower.includes("pantul")) {
      res.questions = [
        "Sebutkan 4 sifat cahaya yang telah kamu buktikan melalui praktikum senter hari ini!",
        "Mengapa bayangan kita bisa terbentuk ketika berdiri di depan cermin datar?",
        "Apa contoh peristiwa pembiasan cahaya yang bisa kita temui di rumah?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Sifat Cahaya</b><br>
        1. Senter yang diarahkan ke gelas bening membuktikan bahwa cahaya dapat...<br>A. Dibiaskan<br>B. Menembus benda bening<br>C. Dipantulkan</p>
        <p>2. Pensil yang dimasukkan ke dalam gelas berisi air jernih tampak seperti patah. Hal ini karena sifat cahaya...<br>A. Merambat lurus<br>B. Dapat diuraikan<br>C. Dapat dibiaskan</p>
      `;
      res.rubricExercises = `
        <p>1. Manakah di bawah ini yang merupakan sumber cahaya alami terbesar di bumi?<br>A. Lampu neon<br>B. Senter baterai<br>C. Matahari</p>
        <p>2. Peristiwa terbentuknya pelangi di langit setelah hujan membuktikan bahwa cahaya dapat...<br>A. Diuraikan (Dispersi)<br>B. Merambat lurus<br>C. Menembus karton gelap</p>
        <p>3. Jelaskan mengapa kita tidak bisa melihat benda di dalam kotak kardus tertutup rapat yang gelap tanpa lubang!</p>
      `;
      res.kunciJawaban = `
        1. C (Matahari) - Skor: 30<br>
        2. A (Diuraikan) - Skor: 30<br>
        3. Karena tidak ada cahaya yang merambat masuk ke kotak dan memantul ke mata kita - Skor: 40
      `;
    } else if (topicLower.includes("magnet") || topicLower.includes("kutub") || topicLower.includes("tarik")) {
      res.questions = [
        "Apa yang terjadi jika dua kutub magnet yang sama didekatkan satu sama lain?",
        "Sebutkan 3 jenis logam nyata yang dapat ditarik dengan kuat oleh magnet!",
        "Di mana saja gaya magnet diterapkan pada benda-benda rumah tangga (seperti kulkas)?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Gaya Magnet</b><br>
        1. Ujung magnet yang memiliki gaya tarik paling kuat disebut...<br>A. Sisi luar<br>B. Kutub magnet<br>C. Garis magnet</p>
        <p>2. Benda di bawah ini yang dapat ditarik dengan kuat oleh magnet adalah...<br>A. Paku besi dan klip kertas logam<br>B. Penghapus karet dan daun kering<br>C. Gelas plastik dan pensil kayu</p>
      `;
      res.rubricExercises = `
        <p>1. Jika kutub Utara (U) magnet didekatkan dengan kutub Selatan (S) magnet lainnya, yang terjadi adalah...<br>A. Saling tolak-menolak<br>B. Saling tarik-menarik<br>C. Diam saja</p>
        <p>2. Jenis bahan yang sama sekali tidak dapat ditarik oleh gaya magnet disebut bahan...<br>A. Magnetik (Feromagnetik)<br>B. Non-magnetik<br>C. Elektromagnetik</p>
        <p>3. Tuliskan hasil pengamatan praktikum kelompokmu ketika magnet didekatkan ke peniti logam dibandingkan ke penggaris plastik!</p>
      `;
      res.kunciJawaban = `
        1. B (Saling tarik-menarik) - Skor: 30<br>
        2. B (Non-magnetik) - Skor: 30<br>
        3. Peniti logam menempel kuat karena bersifat feromagnetik, penggaris plastik tidak menempel - Skor: 40
      `;
    } else if (topicLower.includes("tumbuh") || topicLower.includes("daun") || topicLower.includes("akar") || topicLower.includes("tanaman") || topicLower.includes("fotosintesis")) {
      res.questions = [
        "Apa fungsi utama dari akar bagi kelangsungan hidup tumbuhan?",
        "Sebutkan zat apa saja yang dibutuhkan oleh tumbuhan hijau untuk melakukan proses fotosintesis!",
        "Mengapa warna daun pada umumnya berwarna hijau?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Bagian Tumbuhan</b><br>
        1. Bagian tumbuhan yang berfungsi sebagai tempat berlangsungnya proses fotosintesis (membuat makanan) adalah...<br>A. Akar<br>B. Daun (Klorofil)<br>C. Batang</p>
        <p>2. Zat hijau daun yang berfungsi menyerap cahaya matahari dalam fotosintesis disebut...<br>A. Stomata<br>B. Klorofil<br>C. Oksigen</p>
      `;
      res.rubricExercises = `
        <p>1. Gas yang dihasilkan oleh tumbuhan dari proses fotosintesis dan dihirup oleh manusia adalah...<br>A. Karbondioksida<br>B. Oksigen<br>C. Nitrogen</p>
        <p>2. Tumbuhan menyerap air dan unsur hara dari dalam tanah menggunakan...<br>A. Bunga<br>B. Batang<br>C. Akar</p>
        <p>3. Tuliskan 3 cara nyata merawat tanaman hias di pot kelas agar tidak layu dan tumbuh subur!</p>
      `;
      res.kunciJawaban = `
        1. B (Oksigen) - Skor: 30<br>
        2. C (Akar) - Skor: 30<br>
        3. Menyiram air secara teratur, memberi pupuk tanah, menaruh di tempat yang cukup sinar matahari - Skor: 40
      `;
    } else {
      // Heuristic Fallback for IPAS
      res.questions = [
        `Berdasarkan praktikum tadi, apa faktor utama yang menyebabkan fenomena sains "${cleanTopic}" dapat terjadi?`,
        `Sebutkan 2 contoh nyata penerapan atau keberadaan konsep "${cleanTopic}" di sekitar lingkungan rumahmu!`,
        `Apa dampak negatif yang terjadi bagi kehidupan manusia jika proses "${cleanTopic}" mengalami kerusakan atau gangguan?`
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Lembar Observasi Sains</b><br>
        Lakukan penyelidikan atau diskusi kelompok mengenai topik "${cleanTopic}".</p>
        <p>1. Fenomena alam atau interaksi sosial bertema "${cleanTopic}" membuktikan bahwa...<br>A. Segala sesuatu di alam terikat hubungan sebab-akibat yang nyata<br>B. Alam semesta bekerja secara kebetulan belaka<br>C. Kehidupan tidak dipengaruhi hukum fisika/biologi</p>
        <p>2. Sikap terbaik untuk menyikapi kelestarian lingkungan terkait konsep ini adalah...<br>A. Merusak ekosistem<br>B. Ikut memelihara, menjaga kebersihan, dan melestarikan lingkungan sekitar<br>C. Masa bodoh</p>
      `;
      res.rubricExercises = `
        <p>1. Tuliskan hasil pengamatan atau kesimpulan kelompokmu mengenai proses terjadinya "${cleanTopic}"!</p>
        <p>2. Berikan 1 usulan tindakan nyata sederhana untuk memecahkan masalah terkait topik ini di sekolah!</p>
      `;
      res.kunciJawaban = `
        1. Penjelasan logis proses ilmiah/sosial materi terkait - Skor: 50<br>
        2. Usulan solusi logis pelestarian alam/sosial - Skor: 50
      `;
    }
  }
  else if (subLower.includes("pancasila")) {
    if (topicLower.includes("simbol") || topicLower.includes("lambang") || topicLower.includes("sila")) {
      res.questions = [
        "Sebutkan 5 simbol sila yang tertera pada perisai burung Garuda Pancasila secara berurutan!",
        "Apa makna dari simbol pohon beringin pada sila ketiga Pancasila?",
        "Sebutkan contoh penerapan sila ke-1 Pancasila saat kamu berada di rumah!"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Simbol Pancasila</b><br>
        1. Lambang dari Sila Pertama Pancasila (Ketuhanan Yang Maha Esa) adalah...<br>A. Rantai Emas<br>B. Bintang Emas<br>C. Kepala Banteng</p>
        <p>2. Simbol Padi dan Kapas melambangkan sila kelima Pancasila yang berbunyi...<br>A. Persatuan Indonesia<br>B. Keadilan Sosial bagi Seluruh Rakyat Indonesia<br>C. Kemanusiaan yang Adil dan Beradab</p>
      `;
      res.rubricExercises = `
        <p>1. Simbol rantai emas yang saling berkaitan melambangkan sila ke...<br>A. Dua (2)<br>B. Tiga (3)<br>C. Empat (4)</p>
        <p>2. Semboyan negara \"Bhinneka Tunggal Ika\" tertulis pada pita yang dicengkeram oleh kaki burung...<br>A. Rajawali<br>B. Garuda Pancasila<br>C. Merpati</p>
        <p>3. Tuliskan bunyi Sila ke-4 Pancasila secara lengkap dan benar!</p>
      `;
      res.kunciJawaban = `
        1. A (Dua) - Skor: 30<br>
        2. B (Garuda Pancasila) - Skor: 30<br>
        3. Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan - Skor: 40
      `;
    } else if (topicLower.includes("gotong") || topicLower.includes("kerja") || topicLower.includes("sama") || topicLower.includes("bakti")) {
      res.questions = [
        "Apa arti dari gotong royong dan mengapa ia sangat penting bagi bangsa Indonesia?",
        "Sebutkan contoh gotong royong yang biasa dilakukan di sekolah saat piket kelas!",
        "Apa akibatnya jika semua orang bersikap egois dan tidak mau bekerja sama?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Gotong Royong</b><br>
        1. Manakah di bawah ini contoh sikap gotong royong di lingkungan masyarakat?<br>A. Kerja bakti membersihkan selokan desa<br>B. Mengerjakan ujian sekolah bersama-sama<br>C. Membuang sampah di sungai</p>
        <p>2. Gotong royong membuat pekerjaan berat menjadi...<br>A. Lebih berat<br>B. Lebih ringan dan cepat selesai<br>C. Terhambat</p>
      `;
      res.rubricExercises = `
        <p>1. Piket kelas membersihkan ruang kelas secara bersama-sama merupakan bentuk gotong royong di...<br>A. Sekolah<br>B. Rumah<br>C. Pasar</p>
        <p>2. Nilai luhur gotong royong sesuai dengan pengamalan Pancasila sila ke...<br>A. Sila 1<br>B. Sila 3 dan 5<br>C. Sila 2</p>
        <p>3. Ceritakan pengalaman gotong royong membersihkan rumah yang pernah kamu lakukan bersama keluargamu!</p>
      `;
      res.kunciJawaban = `
        1. A (Sekolah) - Skor: 30<br>
        2. B (Sila 3 dan 5) - Skor: 30<br>
        3. Cerita pengalaman logis membantu menyapu/merapikan rumah - Skor: 40
      `;
    } else {
      // Heuristic Fallback for Pancasila
      res.questions = [
        `Bagaimana cara kita mengamalkan nilai moral bertema "${cleanTopic}" di lingkungan sekolah?`,
        "Mengapa mematuhi norma sosial dan kesepakatan kelas membuat hidup kita aman dan diawasi?",
        "Sebutkan contoh perilaku melanggar tata tertib yang harus kita hindari demi kebaikan bersama!"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Sikap Karakter Luhur</b><br>
        1. Penerapan nilai karakter luhur Pancasila bertema "${cleanTopic}" di kelas ditunjukkan dengan sikap...<br>A. Saling menyayangi, menghargai perbedaan, dan bergotong royong<br>B. Mengejek teman yang memiliki kekurangan fisik<br>C. Berbohong kepada guru</p>
        <p>2. Apabila ada teman kelompokmu kesulitan merapikan peralatan kerja kelompok, sikap pancasilais yang tepat adalah...<br>A. Menertawakannya<br>B. Membantu dengan tulus secara gotong royong<br>C. Melaporkan ke guru agar dihukum</p>
      `;
      res.rubricExercises = `
        <p>1. Tuliskan 3 aturan tata tertib yang berlaku di kelasmu saat jam pelajaran berlangsung secara jelas!</p>
        <p>2. Mengapa semboyan Bhinneka Tunggal Ika sangat penting bagi persatuan seluruh rakyat Indonesia?</p>
      `;
      res.kunciJawaban = `
        1. Tiga aturan sekolah logis (tenang menyimak, minta izin saat keluar, tidak gaduh) - Skor: 50<br>
        2. Karena mempersatukan keberagaman suku, ras, dan agama di Indonesia - Skor: 50
      `;
    }
  }
  else if (subLower.includes("kristen") || subLower.includes("pai")) {
    // Heuristic Fallback for Religion
    res.questions = [
      `Bagaimana cara kita mempraktikkan teladan firman Tuhan/hadis bertema "${cleanTopic}" di lingkungan rumah kita?`,
      "Sebutkan adab berdoa/beribadah yang sopan, tenang, dan bersungguh-sungguh di hadapan Tuhan!",
      "Mengapa kita harus mengasihi semua orang dan senang memaafkan kesalahan teman dengan tulus?"
    ];
    res.lkpdExercises = `
      <p><b>C. Tantangan 1: Penerapan Karakter Iman</b><br>
      1. Tindakan nyata bersyukur atas keluarga dan kehidupan pemberian Tuhan di rumah bertema "${cleanTopic}" adalah...<br>A. Menuruti nasihat orang tua dan rajin beribadah/belajar<br>B. Bermain game dan membantah orang tua<br>C. Malas bangun pagi</p>
      <p>2. Sikap sopan saat berdoa bersama di kelas adalah...<br>A. Mengobrol dengan teman sebangku<br>B. Menundukkan kepala, melipat tangan/tertib, hening, dan fokus penuh kesadaran<br>C. Berteriak-teriak</p>
    `;
    res.rubricExercises = `
      <p>1. Tuliskan doa pendek hasil karyamu sendiri sebagai wujud terima kasih atas berkat hari ini!</p>
      <p>2. Sebutkan satu teladan moral yang bisa kamu petik dari kisah keagamaan bertema "${cleanTopic}"!</p>
    `;
    res.kunciJawaban = `
      1. Doa syukur tulus dan sopan - Skor: 50<br>
      2. Keteladanan moral logis yang sesuai - Skor: 50
    `;
  }
  else { // Languages / default (indonesia, english, jawa, pjok, senirupa)
    if (topicLower.includes("baca") || topicLower.includes("nyaring") || topicLower.includes("buku") || topicLower.includes("cerita")) {
      res.questions = [
        "Mengapa membaca nyaring membantu kita melatih artikulasi suara dan kepercayaan diri?",
        "Sebutkan tokoh utama dan watak karakternya dalam cerita yang kita baca tadi!",
        "Bagaimana caramu menceritakan kembali kisah cerita tadi kepada adikmu di rumah secara menarik?"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Membaca Pemahaman</b><br>
        1. Membaca dengan lafal, artikulasi yang jelas, dan suara lantang terdengar disebut membaca...<br>A. Senyap<br>B. Nyaring<br>C. Cepat</p>
        <p>2. Sikap yang baik saat mendengarkan teman membacakan cerita di depan kelas adalah...<br>A. Menyimak secara tertib dan menghargai<br>B. Ramai sendiri<br>C. Menggambar di buku tulis</p>
      `;
      res.rubricExercises = `
        <p>1. Tokoh protagonis dalam sebuah cerita adalah tokoh yang berwatak...<br>A. Jahat<br>B. Baik<br>C. Lucu</p>
        <p>2. Tanda baca yang digunakan untuk mengakhiri kalimat berita/pernyataan adalah tanda...<br>A. Tanya (?)<br>B. Titik (.)<br>C. Seru (!)</p>
        <p>3. Tuliskan pesan moral yang terdapat dalam kisah cerita anak yang kamu baca hari ini!</p>
      `;
      res.kunciJawaban = `
        1. B (Baik) - Skor: 30<br>
        2. B (Titik) - Skor: 30<br>
        3. Amanat moral yang logis (misal: rukun dengan teman, jujur) - Skor: 40
      `;
    } else {
      // Universal Heuristic Fallback for Languages/Art/Sports
      res.questions = [
        `Dari aktivitas pembelajaran materi "${cleanTopic}" hari ini, apa kesimpulan atau pelajaran utama yang wajib kita terapkan?`,
        `Mengapa kita harus menyusun rancangan visual (gambar/peta pikiran) terlebih dahulu sebelum mengerjakan proyek "${cleanTopic}"?`,
        "Sebutkan contoh sikap santun dalam mengomunikasikan ide atau gerakan di depan kelas!"
      ];
      res.lkpdExercises = `
        <p><b>C. Tantangan 1: Pemahaman Konseptual Terstruktur</b><br>
        1. Menyusun kalimat atau gerakan fisik secara teratur bertema "${cleanTopic}" melatih kita untuk...<br>A. Berpikir runtut, kreatif, dan sistematis<br>B. Mengerjakan tugas asal-asalan<br>C. Menyalin pekerjaan orang lain</p>
        <p>2. Sikap kerja sama gotong royong kelompok saat menyelesaikan tugas "${cleanTopic}" ditunjukkan dengan...<br>A. Bertengkar memperebutkan spidol warna<br>B. Saling berbagi tugas secara adil dan ramah membantu rekan kesulitan<br>C. Diam saja tidak ikut berdiskusi</p>
      `;
      res.rubricExercises = `
        <p>1. Tuliskan 3 kosakata atau istilah utama yang kamu pelajari terkait materi "${cleanTopic}" hari ini!</p>
        <p>2. Ceritakan bagaimana caramu menerapkan keterampilan dari materi ini saat beraktivitas di rumah!</p>
      `;
      res.kunciJawaban = `
        1. 3 istilah tepat terkait topik - Skor: 50<br>
        2. Cerita penerapan logis di rumah - Skor: 50
      `;
    }
  }
  
  return res;
}

// ----------------------------------------------------
// DYNAMIC KOMPONEN INTI GENERATOR (Referensi Buku Paket)
// Menghasilkan TP, Pemahaman Bermakna, Pertanyaan Pemantik
// yang detail dan kontekstual per topik per mapel.
// ----------------------------------------------------
function getKomponenInti(subjectId, topicName) {
  const t = (topicName || "").toLowerCase();
  const sub = (subjectId || "").toLowerCase();
  const clean = topicName.replace(/[\[\]]/g, "");

  let tp = "";
  let meaningful = "";
  let pemantik = "";

  // ===================== MATEMATIKA =====================
  if (sub.includes("matematika")) {
    if (t.includes("10.000") || t.includes("digit") || t.includes("ribuan") || (t.includes("cacah") && !t.includes("100") && !t.includes("ratus ribu") && !t.includes("juta"))) {
      // Kelas 4
      tp = `<ol>
        <li>Melalui aktivitas permainan kartu bilangan, peserta didik mampu <b>membaca bilangan cacah sampai 10.000</b> dengan benar dan mandiri.</li>
        <li>Melalui analisis studi kasus harga barang dan data geografis, peserta didik mampu <b>menuliskan lambang bilangan cacah sampai 10.000</b> secara tepat.</li>
      </ol>`;
      meaningful = `Kemampuan membaca dan menulis bilangan ribuan sangat krusial agar peserta didik dapat memeriksa kembalian uang belanja, memahami jarak antar tempat, serta membaca data informasi publik berbasis angka dengan teliti.`;
      pemantik = `<ol>
        <li>"Jika kalian membeli jus mangga di minimarket dan melihat label harga tertulis angka 6.750, bagaimana cara kalian mengejanya?"</li>
        <li>"Pernahkah kalian mendengar bahwa puncak Gunung Semeru itu tingginya tiga ribu enam ratus tujuh puluh enam meter? Bagaimana cara kita menuliskan angka tersebut?"</li>
      </ol>`;
    } else if (t.includes("100.000") || t.includes("ratus ribu") || t.includes("juta") || t.includes("cacah besar")) {
      // Kelas 5-6
      tp = `<ol>
        <li>Melalui pengamatan infografis populasi penduduk atau wilayah, peserta didik mampu <b>membaca dan menyajikan bilangan cacah besar</b> hingga ratusan ribu/jutaan secara benar.</li>
        <li>Melalui simulasi perencanaan anggaran sekolah, peserta didik mampu <b>membandingkan dan mengurutkan nominal bilangan besar</b> dengan teliti.</li>
      </ol>`;
      meaningful = `Pemahaman bilangan cacah besar membantu siswa mencerna statistik global (seperti jumlah penduduk kota, kapasitas stadion olahraga) dan merancang anggaran keuangan berskala besar di kehidupan nyata.`;
      pemantik = `<ol>
        <li>"Jika sebuah stadion sepak bola diisi penuh oleh 85.432 penonton, bagaimana cara kita membaca angka tersebut agar semua orang paham?"</li>
        <li>"Mana yang lebih besar antara anggaran pembangunan taman kota sebesar Rp750.000 atau Rp705.000? Bagaimana kalian membandingkannya?"</li>
      </ol>`;
    } else if (t.includes("pecahan") || t.includes("senilai") || t.includes("campuran") || t.includes("desimal") || t.includes("persen")) {
      // Kelas 4-6
      tp = `<ol>
        <li>Melalui kegiatan membagi makanan konkret atau melipat kertas, peserta didik mampu <b>mengidentifikasi bentuk pecahan biasa, senilai, dan desimal</b> dengan tepat.</li>
        <li>Melalui diskusi kelompok, peserta didik mampu <b>mengubah pecahan biasa menjadi pecahan campuran, desimal, atau persen</b> secara akurat.</li>
      </ol>`;
      meaningful = `Konsep pecahan, desimal, dan persen membantu kita membagi barang secara adil, menghitung diskon belanja di swalayan (misal 20% OFF), serta menakar resep makanan secara presisi.`;
      pemantik = `<ol>
        <li>"Jika Ibu memotong sebuah martabak manis menjadi 8 bagian sama besar, dan kamu memakan 3 bagian, bagaimana kamu menuliskan bagian martabak yang sudah dimakan dalam bentuk pecahan?"</li>
        <li>"Ketika di toko mainan tertulis diskon 50%, apa hubungannya dengan pecahan setengah (1/2) bagian?"</li>
      </ol>`;
    } else if (t.includes("luas") || t.includes("volume") || t.includes("sudut") || t.includes("panjang") || t.includes("lebar")) {
      // Kelas 3-6
      tp = `<ol>
        <li>Melalui kegiatan pengukuran permukaan meja atau lantai kelas, peserta didik mampu <b>menghitung luas bangun datar</b> menggunakan satuan baku secara mandiri.</li>
        <li>Melalui praktikum mengisi kubus kecil ke dalam wadah, peserta didik mampu <b>menentukan volume bangun ruang</b> secara tepat.</li>
      </ol>`;
      meaningful = `Keterampilan mengukur luas dan volume sangat penting saat menentukan jumlah keramik lantai yang harus dibeli, kapasitas air dalam bak mandi, atau menata letak barang di dalam kardus kemasan.`;
      pemantik = `<ol>
        <li>"Jika Ayah ingin memasang ubin di kamarmu yang berukuran 3 meter x 3 meter, bagaimana cara kita mengetahui jumlah ubin yang dibutuhkan?"</li>
        <li>"Bagaimana cara kita mengetahui air di dalam botol ini lebih banyak daripada air di dalam gelas tanpa menumpahkannya?"</li>
      </ol>`;
    } else if (t.includes("pola") || t.includes("bilangan loncat") || t.includes("barisan")) {
      // Kelas 1-4
      tp = `<ol>
        <li>Melalui pengamatan pola gambar konkret, peserta didik mampu <b>menemukan aturan pola berulang dan melanjutkannya</b> secara mandiri.</li>
        <li>Melalui permainan angka loncat, peserta didik mampu <b>melanjutkan pola barisan bilangan</b> secara tepat.</li>
      </ol>`;
      meaningful = `Mengenali pola membantu kita memprediksi urutan kejadian, seperti jadwal piket, perulangan motif kain batik tradisional, dan memecahkan teka-teki logika berpikir.`;
      pemantik = `<ol>
        <li>"Perhatikan ubin kelas kita yang berwarna-warni. Adakah pola susunan warna yang berulang?"</li>
        <li>"Jika kita memiliki deret angka: 3, 6, 9, 12, ..., angka berapa yang muncul berikutnya setelah 12? Apa aturan yang kamu gunakan?"</li>
      </ol>`;
    } else if (t.includes("penjumlahan") || t.includes("pengurangan") || t.includes("tambah") || t.includes("kurang")) {
      // Kelas 1-3
      tp = `<ol>
        <li>Melalui simulasi transaksi uang saku harian, peserta didik mampu <b>menyelesaikan penjumlahan dan pengurangan bilangan cacah</b> secara runtut dan mandiri.</li>
        <li>Melalui permainan papan angka, peserta didik mampu <b>menghitung hasil operasi hitung campuran sederhana</b> secara tepat.</li>
      </ol>`;
      meaningful = `Operasi tambah-kurang adalah bekal utama bertransaksi belanja sehari-hari di kantin sekolah atau pasar, serta menghitung sisa persediaan barang milik kita.`;
      pemantik = `<ol>
        <li>"Jika kamu diberi uang saku Rp5.000 oleh Ibu, lalu membeli es krim seharga Rp2.000, berapa sisa uang kembalian yang harus kamu terima?"</li>
        <li>"Ada 8 pensil di atas mejamu. Jika 3 pensil dipinjam oleh teman sebangkumu, berapa pensil yang tersisa di mejamu?"</li>
      </ol>`;
    } else if (t.includes("perkalian") || t.includes("pembagian") || t.includes("kali") || t.includes("bagi")) {
      // Kelas 2-4
      tp = `<ol>
        <li>Melalui pengelompokan benda konkret, peserta didik mampu <b>memahami konsep perkalian</b> sebagai penjumlahan berulang secara mandiri.</li>
        <li>Melalui aktivitas membagi permen sama banyak, peserta didik mampu <b>menyelesaikan operasi pembagian</b> sebagai pengurangan berulang secara adil.</li>
      </ol>`;
      meaningful = `Perkalian dan pembagian mempercepat kita dalam menghitung barang kelompok besar secara efisien, serta membagi makanan atau mainan secara merata kepada teman-teman.`;
      pemantik = `<ol>
        <li>"Ibu membawa 4 kantong plastik apel. Setiap kantong berisi 5 apel. Bagaimana cara cepat mengetahui jumlah seluruh apel tanpa menghitungnya satu per satu?"</li>
        <li>"Jika kamu memiliki 12 permen cokelat dan ingin membaginya sama rata kepada 3 teman dekatmu, berapa permen yang didapatkan oleh masing-masing anak?"</li>
      </ol>`;
    } else if (t.includes("nilai tempat") || t.includes("puluhan") || t.includes("ratusan") || t.includes("satuan")) {
      // Kelas 1-2
      tp = `<ol>
        <li>Melalui penggunaan sedotan ikat kelompok, peserta didik mampu <b>menentukan nilai tempat puluhan dan satuan</b> secara visual dengan tepat.</li>
        <li>Melalui pembacaan lambang bilangan dua angka, peserta didik mampu <b>menuliskan dekomposisi nilai tempat</b> secara mandiri.</li>
      </ol>`;
      meaningful = `Memahami nilai tempat puluhan dan satuan memudahkan kita dalam membaca harga jajanan kantin dan menghitung jumlah koleksi kartu mainan secara teratur.`;
      pemantik = `<ol>
        <li>"Pada angka 25, angka manakah yang bertugas sebagai puluhan dan angka mana yang bertugas sebagai satuan?"</li>
        <li>"Jika kita mengikat 10 sedotan menjadi satu ikat, dan kita punya 3 ikat sedotan serta 4 sedotan lepas, berapa total sedotan kita?"</li>
      </ol>`;
    } else {
      // Fallback Matematika
      tp = `<ol>
        <li>Melalui pemecahan masalah kontekstual dan diskusi kelompok, peserta didik mampu <b>menganalisis konsep dasar tentang ${clean}</b> secara logis dan mandiri.</li>
        <li>Melalui pengerjaan lembar kerja terstruktur, peserta didik mampu <b>menyelesaikan permasalahan numerasi terkait ${clean}</b> secara tepat.</li>
      </ol>`;
      meaningful = `Konsep dasar <b>${clean}</b> melatih logika berpikir kita agar lebih teliti, teratur, dan mampu mengambil keputusan numerik secara rasional di kehidupan sehari-hari.`;
      pemantik = `<ol>
        <li>"Menurut pendapatmu, mengapa kita perlu memahami materi ${clean} ini? Di manakah konsep ini akan kamu pakai dalam kehidupanmu?"</li>
        <li>"Dapatkah kamu memberikan satu contoh penerapan konsep ${clean} saat kamu sedang bermain bersama teman-teman?"</li>
      </ol>`;
    }
  }
  // ===================== BAHASA INDONESIA =====================
  else if (sub.includes("indonesia") && !sub.includes("ipas")) {
    if (t.includes("bunyi") || t.includes("abjad") || t.includes("suku kata") || t.includes("huruf vokal")) {
      // Kelas 1
      tp = `<ol>
        <li>Melalui kegiatan mendengarkan rekaman suara alam, peserta didik mampu <b>membedakan bunyi alam dan bunyi buatan</b> dengan teliti.</li>
        <li>Melalui permainan kartu huruf, peserta didik mampu <b>menyusun suku kata sederhana</b> menjadi kata nama benda di sekitar dengan benar.</li>
      </ol>`;
      meaningful = `Mengenal bunyi dan huruf abjad adalah kunci utama agar kita bisa membaca buku dongeng yang menarik, menulis nama diri sendiri, serta mengomunikasikan keinginan kita dengan jelas kepada guru dan orang tua.`;
      pemantik = `<ol>
        <li>"Pernahkah kalian mendengar bunyi gemercik air hujan atau klakson motor di depan rumah? Bunyi mana yang berasal dari alam dan mana yang buatan manusia?"</li>
        <li>"Huruf apakah yang mengawali nama panggilan kalian masing-masing? Mari kita sebutkan satu per satu!"</li>
      </ol>`;
    } else if (t.includes("baca") || t.includes("nyaring") || t.includes("dongeng") || t.includes("cerita")) {
      // Kelas 2-4
      tp = `<ol>
        <li>Melalui kegiatan membaca nyaring bersama, peserta didik mampu <b>membaca teks naratif dengan lafal dan intonasi yang tepat</b> serta penuh percaya diri.</li>
        <li>Melalui diskusi isi cerita, peserta didik mampu <b>mengidentifikasi tokoh-tokoh beserta wataknya</b> dalam dongeng secara mandiri.</li>
      </ol>`;
      meaningful = `Membaca cerita membantu kita memetik pelajaran moral berharga (akhlak) dari perilaku tokoh cerita, serta melatih kemampuan bertutur kata secara santun di depan umum.`;
      pemantik = `<ol>
        <li>"Siapa tokoh cerita dongeng yang paling kalian sukai? Mengapa kalian menyukainya? Sifat baik apa yang bisa kita tiru darinya?"</li>
        <li>"Mengapa kita perlu mengatur nada suara (intonasi) saat membacakan sebuah cerita untuk teman-teman kita?"</li>
      </ol>`;
    } else if (t.includes("wawancara") || t.includes("laporan") || t.includes("surat") || t.includes("diskusi")) {
      // Kelas 4-6
      tp = `<ol>
        <li>Melalui simulasi wawancara terpadu, peserta didik mampu <b>merumuskan daftar pertanyaan wawancara menggunakan kata tanya ADiKSiMBa</b> secara tepat.</li>
        <li>Melalui penulisan surat pribadi/resmi, peserta didik mampu <b>menulis laporan hasil wawancara atau surat</b> dengan struktur bahasa Indonesia yang baku.</li>
      </ol>`;
      meaningful = `Keterampilan berwawancara dan menulis surat melatih kita berkomunikasi secara formal, santun, dan mampu menggali informasi berharga dari narasumber di luar lingkungan sekolah.`;
      pemantik = `<ol>
        <li>"Jika kalian diberi kesempatan untuk mewawancarai Kepala Sekolah kita, pertanyaan menarik apa yang paling ingin kalian ajukan?"</li>
        <li>"Bagaimana cara menuliskan bagian pembuka surat izin sakit yang sopan untuk dikirimkan kepada wali kelasmu?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui kegiatan membaca kritis dan berdiskusi, peserta didik mampu <b>menemukan informasi penting dari bacaan bertema ${clean}</b> secara tepat.</li>
        <li>Melalui praktik menulis mandiri, peserta didik mampu <b>mengekspresikan gagasan kreatif menggunakan ejaan bahasa Indonesia yang disempurnakan (EYD)</b>.</li>
      </ol>`;
      meaningful = `Kemampuan berbahasa Indonesia yang baik memudahkan kita memahami instruksi tertulis, menyampaikan isi kepala secara runut, dan menghargai karya sastra luhur bangsa.`;
      pemantik = `<ol>
        <li>"Ketika kamu membaca teks tentang ${clean}, bagian manakah yang paling menarik perhatianmu? Mengapa?"</li>
        <li>"Mengapa penggunaan tanda baca titik (.) dan koma (,) sangat penting dalam penulisan kalimat kita?"</li>
      </ol>`;
    }
  }
  // ===================== IPAS (IPA-IPS) =====================
  else if (sub.includes("ipas") || sub.includes("ipa") || sub.includes("ips")) {
    if (t.includes("cahaya") || t.includes("cermin") || t.includes("optik") || t.includes("pantul")) {
      // Kelas 4-5
      tp = `<ol>
        <li>Melalui eksperimen menggunakan senter dan cermin, peserta didik mampu <b>membuktikan sifat-sifat cahaya (merambat lurus, dipantulkan, dibiaskan)</b> secara langsung.</li>
        <li>Melalui diskusi kelompok, peserta didik mampu <b>menganalisis prinsip kerja alat optik sederhana</b> seperti lup atau periskop dengan tepat.</li>
      </ol>`;
      meaningful = `Memahami sifat cahaya menjelaskan mengapa kita bisa bercermin, bagaimana pelangi terbentuk setelah hujan, dan pentingnya kaca spion kendaraan untuk keselamatan berkendara sehari-hari.`;
      pemantik = `<ol>
        <li>"Mengapa sendok yang diletakkan di dalam gelas berisi air jernih terlihat patah atau bengkok? Sifat cahaya manakah yang bekerja?"</li>
        <li>"Bagaimana cermin kecil pada spion mobil/motor membantu pengemudi melihat objek besar di belakangnya?"</li>
      </ol>`;
    } else if (t.includes("organ") || t.includes("tubuh") || t.includes("napas") || t.includes("cerna") || t.includes("darah")) {
      // Kelas 5-6
      tp = `<ol>
        <li>Melalui pengamatan torso atau gambar organ, peserta didik mampu <b>menjelaskan sistem pernapasan dan pencernaan manusia</b> beserta fungsinya dengan rinci.</li>
        <li>Melalui pembuatan poster kesehatan, peserta didik mampu <b>merumuskan langkah-langkah pencegahan penyakit organ tubuh</b> secara mandiri.</li>
      </ol>`;
      meaningful = `Mengenal anatomi tubuh sendiri menumbuhkan rasa syukur dan kepedulian untuk menjaga kesehatan dengan mengonsumsi makanan bergizi serta menghindari rokok dan polusi.`;
      pemantik = `<ol>
        <li>"Ke mana perginya nasi goreng yang kita makan pagi tadi? Bagaimana tubuh kita menyerap sari makanan tersebut?"</li>
        <li>"Mengapa napas kita terasa terengah-engah setelah berlari kencang di lapangan? Apa yang terjadi di dalam paru-paru kita?"</li>
      </ol>`;
    } else if (t.includes("fotosintesis") || t.includes("tumbuh") || t.includes("daun") || t.includes("akar")) {
      // Kelas 3-4
      tp = `<ol>
        <li>Melalui pengamatan tanaman di halaman sekolah, peserta didik mampu <b>mengidentifikasi bagian-bagian tumbuhan dan fungsinya</b> secara mandiri.</li>
        <li>Melalui eksperimen menutup daun dengan kertas timah, peserta didik mampu <b>menjelaskan peran fotosintesis dalam menghasilkan oksigen</b> bagi makhluk hidup.</li>
      </ol>`;
      meaningful = `Tumbuhan hijau adalah paru-paru bumi yang menyuplai oksigen yang kita hirup, serta menjadi penyedia pangan utama bagi manusia dan hewan di ekosistem.`;
      pemantik = `<ol>
        <li>"Mengapa tanaman yang jarang disiram dan tidak terkena sinar matahari di dalam rumah lama-kelamaan akan layu dan mati?"</li>
        <li>"Dapatkah kalian bayangkan apa yang akan terjadi dengan seluruh makhluk hidup di bumi jika tidak ada tumbuhan hijau satu pun?"</li>
      </ol>`;
    } else if (t.includes("sejarah") || t.includes("pahlawan") || t.includes("kerajaan") || t.includes("candi")) {
      // Kelas 4-6
      tp = `<ol>
        <li>Melalui telaah peta sejarah, peserta didik mampu <b>mengidentifikasi peninggalan kerajaan Hindu, Buddha, dan Islam di Indonesia</b> secara kronologis.</li>
        <li>Melalui diskusi tokoh pahlawan daerah, peserta didik mampu <b>meneladani sikap patriotisme dan rela berkorban</b> dalam kehidupan berbangsa.</li>
      </ol>`;
      meaningful = `Mempelajari sejarah bangsa memperkokoh rasa cinta tanah air, mengajarkan nilai perjuangan, dan menghargai keragaman situs cagar budaya sebagai identitas nasional.`;
      pemantik = `<ol>
        <li>"Apakah di sekitar tempat tinggalmu terdapat situs bersejarah seperti candi, makam kuno, atau monumen perjuangan? Kisah apa yang ada di baliknya?"</li>
        <li>"Mengapa para pahlawan bangsa dahulu bersedia gugur demi merebut kemerdekaan Indonesia? Nilai apa yang bisa kita tiru di sekolah?"</li>
      </ol>`;
    } else if (t.includes("kuman") || t.includes("sehat") || t.includes("bersih") || t.includes("sakit")) {
      // Kelas 1-2
      tp = `<ol>
        <li>Melalui kegiatan simulasi memakai glitter/tepung, peserta didik mampu <b>mempraktikkan cara mencuci tangan 6 langkah WHO</b> secara mandiri.</li>
        <li>Melalui pengamatan gambar kebersihan diri, peserta didik mampu <b>membedakan kebiasaan sehat dan tidak sehat</b> dengan tepat.</li>
      </ol>`;
      meaningful = `Kebiasaan hidup bersih sejak dini melindungi kita dari kuman penyebab sakit perut dan flu, serta menjaga tubuh kita tetap bugar untuk belajar dan bermain setiap hari.`;
      pemantik = `<ol>
        <li>"Mengapa kita harus mencuci tangan menggunakan sabun setelah selesai bermain di luar rumah atau sebelum makan?"</li>
        <li>"Bagaimana kuman yang ukurannya sangat kecil dan tidak terlihat bisa membuat perut kita terasa sakit?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui observasi lapangan dan diskusi terarah, peserta didik mampu <b>menjelaskan fenomena sains/sosial terkait ${clean}</b> secara ilmiah dan kontekstual.</li>
        <li>Melalui penyusunan infografis sederhana, peserta didik mampu <b>menyajikan keterkaitan fenomena ${clean} terhadap kelestarian alam dan kesejahteraan masyarakat</b>.</li>
      </ol>`;
      meaningful = `Mempelajari fenomena <b>${clean}</b> melatih kecakapan inkuiri siswa untuk berpikir kritis, mencintai lingkungan hidup, serta peduli terhadap kondisi sosial masyarakat sekitar.`;
      pemantik = `<ol>
        <li>"Pernahkah kalian mengamati fenomena ${clean} di lingkungan sekitar rumah atau sekolah? Apa yang ada di pikiran kalian saat melihatnya?"</li>
        <li>"Bagaimana peran aktif kita sebagai anak sekolah untuk mendukung dampak positif dari materi ${clean} di lingkungan kita?"</li>
      </ol>`;
    }
  }
  // ===================== PANCASILA =====================
  else if (sub.includes("pancasila")) {
    if (t.includes("sila") || t.includes("garuda") || t.includes("lambang") || t.includes("simbol")) {
      tp = `<ol>
        <li>Melalui pengamatan burung Garuda Pancasila, peserta didik mampu <b>mengidentifikasi lambang sila Pancasila</b> secara tepat dan berurutan.</li>
        <li>Melalui bermain peran drama pendek, peserta didik mampu <b>menunjukkan contoh perilaku sehari-hari yang mengamalkan sila-sila Pancasila</b>.</li>
      </ol>`;
      meaningful = `Pancasila adalah pemersatu keberagaman suku dan agama di Indonesia, memandu kita untuk hidup rukun, adil, toleran, dan bergotong royong di lingkungan sekolah maupun rumah.`;
      pemantik = `<ol>
        <li>"Perhatikan simbol kepala banteng dan pohon beringin pada dada burung Garuda. Sila keberapakah yang mereka lambangkan? Apa maknanya?"</li>
        <li>"Bagaimana sikap kita apabila melihat teman kelas yang terjatuh dari sepeda? Pengamalan sila Pancasila keberapakah itu?"</li>
      </ol>`;
    } else if (t.includes("hak") || t.includes("kewajiban") || t.includes("aturan") || t.includes("tanggung jawab")) {
      tp = `<ol>
        <li>Melalui diskusi tata tertib kelas, peserta didik mampu <b>membedakan hak dan kewajiban anak</b> di sekolah dan di rumah secara mandiri.</li>
        <li>Melalui pembuatan jadwal piket mandiri, peserta didik mampu <b>melaksanakan kewajiban piket kelas secara bertanggung jawab</b>.</li>
      </ol>`;
      meaningful = `Keseimbangan antara hak dan kewajiban mendidik kita menjadi pribadi yang disiplin, bertanggung jawab, menghormati privasi orang lain, dan menciptakan ketertiban bersama.`;
      pemantik = `<ol>
        <li>"Sebagai anak, kalian berhak mendapatkan kasih sayang dan ruang belajar yang nyaman. Lalu, apa kewajiban yang harus kalian berikan kepada orang tua?"</li>
        <li>"Mengapa di sekolah dipasang aturan tidak boleh membuang sampah sembarangan? Aturan ini melindungi hak siapa?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui refleksi diri dan studi kasus sosial, peserta didik mampu <b>mengidentifikasi penerapan nilai Pancasila terkait ${clean}</b> dalam kehidupan bernegara.</li>
        <li>Melalui aksi nyata di kelas, peserta didik mampu <b>mempraktikkan karakter profil pelajar Pancasila</b> (mandiri, bergotong royong, berkebinekaan global) bertema ${clean}.</li>
      </ol>`;
      meaningful = `Mempelajari nilai-nilai <b>${clean}</b> menumbuhkan karakter nasionalis yang beradab, berjiwa toleran, mengutamakan persatuan, dan siap berkolaborasi demi kebaikan bersama.`;
      pemantik = `<ol>
        <li>"Bagaimana cara kita menunjukkan sikap toleransi ketika mendiskusikan materi ${clean} bersama teman-teman yang berbeda pendapat?"</li>
        <li>"Apa yang akan terjadi di sekolah apabila nilai luhur ${clean} tidak kita terapkan dalam kehidupan sehari-hari?"</li>
      </ol>`;
    }
  }
  // ===================== PAI (AGAMA ISLAM) =====================
  else if (sub.includes("pai")) {
    if (t.includes("wudhu") || t.includes("tayamum") || t.includes("shalat") || t.includes("salat") || t.includes("ibadah")) {
      tp = `<ol>
        <li>Melalui praktik langsung dengan bimbingan guru, peserta didik mampu <b>memperagakan tata cara bersuci (wudhu/tayamum) dan gerakan shalat</b> secara berurutan.</li>
        <li>Melalui hafalan bacaan shalat, peserta didik mampu <b>melafalkan bacaan shalat lima waktu</b> dengan makhraj yang benar.</li>
      </ol>`;
      meaningful = `Shalat adalah tiang agama Islam yang mengajarkan kebersihan diri (melalui wudhu), kedisiplinan menghargai waktu, serta ketenangan batin untuk mendekatkan diri kepada Allah SWT.`;
      pemantik = `<ol>
        <li>"Mengapa kita wajib membasuh wajah dan tangan sebelum menghadap Allah SWT saat shalat? Apa hikmah kebersihannya?"</li>
        <li>"Bagaimana perasaanmu setelah melaksanakan shalat lima waktu secara tepat waktu dan berjamaah di masjid?"</li>
      </ol>`;
    } else if (t.includes("asmaul") || t.includes("sifat") || t.includes("allah") || t.includes("iman")) {
      tp = `<ol>
        <li>Melalui lantunan nasyid, peserta didik mampu <b>menghafal Asmaul Husna</b> beserta terjemahannya secara mandiri.</li>
        <li>Melalui diskusi kisah teladan nabi, peserta didik mampu <b>meniru sifat kasih sayang (Ar-Rahman) dan kejujuran</b> di kehidupan sehari-hari.</li>
      </ol>`;
      meaningful = `Mengenal Asmaul Husna menumbuhkan rasa cinta yang mendalam kepada Allah SWT, serta membimbing akhlak kita agar menjadi anak yang penyayang, jujur, dan pemaaf.`;
      pemantik = `<ol>
        <li>"Allah bersifat Al-Basir (Maha Melihat). Apakah kita tetap bisa berbohong ketika tidak ada orang lain di sekitar kita? Siapa yang melihat kita?"</li>
        <li>"Bagaimana caramu membuktikan rasa sayang kepada hewan peliharaanmu sebagai wujud meneladani sifat Ar-Rahman?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui kajian ayat Al-Qur'an dan hadits teladan, peserta didik mampu <b>memahami ajaran Islam terkait ${clean}</b> secara baik dan benar.</li>
        <li>Melalui pembiasaan akhlakul karimah, peserta didik mampu <b>mengamalkan adab islami bertema ${clean}</b> dalam interaksi sosial sehari-hari.</li>
      </ol>`;
      meaningful = `Memahami konsep <b>${clean}</b> mendekatkan diri kita pada tuntunan syariat Islam demi keselamatan dunia dan akhirat, serta memperindah akhlak kita di hadapan sesama manusia.`;
      pemantik = `<ol>
        <li>"Bagaimana ajaran Rasulullah SAW mengajari kita bersikap sopan santun yang berkaitan dengan materi ${clean}?"</li>
        <li>"Sebutkan satu contoh perilaku baik sehari-hari di rumah yang mencerminkan pemahamanmu tentang ${clean}!"</li>
      </ol>`;
    }
  }
  // ===================== KODING =====================
  else if (sub.includes("koding")) {
    if (t.includes("algoritma") || t.includes("langkah logis")) {
      tp = `<ol>
        <li>Melalui permainan menyusun kartu instruksi, peserta didik mampu <b>menyusun algoritma sederhana</b> berupa urutan langkah logis untuk menyelesaikan tugas harian secara runtut.</li>
        <li>Melalui simulasi 'Robot dan Programmer', peserta didik mampu <b>membuktikan pentingnya urutan langkah</b> yang benar dalam menjalankan perintah.</li>
      </ol>`;
      meaningful = `Algoritma adalah fondasi berpikir komputasional yang kita gunakan setiap hari tanpa disadari, seperti mengikuti resep masakan (langkah demi langkah), mengikuti prosedur cuci tangan yang benar, atau menyusun strategi permainan agar bisa menang.`;
      pemantik = `<ol>
        <li>"Bayangkan kamu ingin membuat segelas teh manis. Coba sebutkan langkah-langkahnya dari awal sampai akhir. Apa yang terjadi jika urutan langkahnya ditukar?"</li>
        <li>"Mengapa GPS di handphone orang tuamu bisa menemukan rute tercepat ke suatu tempat? Apakah itu menggunakan algoritma?"</li>
      </ol>`;
    } else if (t.includes("scratch") || t.includes("antarmuka") || t.includes("sprite") || t.includes("stage")) {
      tp = `<ol>
        <li>Melalui eksplorasi langsung aplikasi Scratch, peserta didik mampu <b>mengidentifikasi bagian-bagian antarmuka</b> (Stage, Sprite List, Block Palette, Script Area) secara mandiri.</li>
        <li>Melalui praktik drag-and-drop blok perintah, peserta didik mampu <b>membuat program sederhana</b> yang menggerakkan Sprite di layar.</li>
      </ol>`;
      meaningful = `Mengenal antarmuka Scratch mempersiapkan siswa menjadi kreator digital yang mampu membuat animasi, game interaktif, dan cerita digital sendiri, bukan sekadar menjadi pengguna pasif teknologi.`;
      pemantik = `<ol>
        <li>"Tahukah kalian bahwa game-game yang kalian mainkan di komputer semuanya dibuat menggunakan kode program? Apakah kalian ingin bisa membuat game sendiri?"</li>
        <li>"Perhatikan layar Scratch ini. Menurutmu, di area mana kita menempatkan blok-blok perintah agar karakter kucing bisa bergerak?"</li>
      </ol>`;
    } else if (t.includes("loop") || t.includes("ulang") || t.includes("perulangan")) {
      tp = `<ol>
        <li>Melalui simulasi gerakan berulang, peserta didik mampu <b>memahami konsep perulangan (loop)</b> dan membedakan 'ulangi N kali' dengan 'selamanya'.</li>
        <li>Melalui pembuatan animasi Scratch, peserta didik mampu <b>menerapkan blok perulangan</b> untuk mengefisiensikan kode program.</li>
      </ol>`;
      meaningful = `Perulangan adalah konsep yang kita temui setiap hari: detak jantung berulang, jarum jam berputar terus-menerus, dan lagu yang dimainkan berulang di playlist. Dalam koding, perulangan menghemat waktu karena kita tidak perlu menulis perintah yang sama berulang kali.`;
      pemantik = `<ol>
        <li>"Bayangkan kamu diminta menggambar 100 bintang di kertas. Apakah kamu akan menggambar satu per satu, atau adakah cara yang lebih cepat dan efisien?"</li>
        <li>"Apa perbedaan antara 'ulangi 5 kali' dan 'ulangi selamanya' dalam kehidupan nyata? Berikan contohnya!"</li>
      </ol>`;
    } else if (t.includes("cabang") || t.includes("kondisi") || t.includes("if") || t.includes("jika")) {
      tp = `<ol>
        <li>Melalui permainan logika "Jika-Maka", peserta didik mampu <b>memahami konsep percabangan (if-else)</b> sebagai pengambilan keputusan dalam program.</li>
        <li>Melalui pembuatan game sederhana di Scratch, peserta didik mampu <b>menerapkan blok percabangan</b> untuk membuat program yang responsif terhadap kondisi tertentu.</li>
      </ol>`;
      meaningful = `Logika percabangan adalah dasar pengambilan keputusan yang kita lakukan setiap hari: "Jika hujan, bawa payung; jika tidak, pakai topi." Dalam teknologi, logika ini digunakan oleh mesin ATM, lampu lalu lintas otomatis, dan asisten virtual.`;
      pemantik = `<ol>
        <li>"Apa yang kalian lakukan setiap pagi sebelum berangkat sekolah: jika cuaca panas, memakai topi; jika cuaca hujan, memakai jas hujan. Apakah itu contoh logika percabangan?"</li>
        <li>"Bagaimana cara membuat karakter Scratch yang bisa berhenti bergerak ketika menyentuh dinding tepi layar?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui praktik proyek koding bertema <b>${clean}</b>, peserta didik mampu merancang dan menyusun blok kode program secara logis dan terstruktur.</li>
        <li>Melalui proses debugging bersama, peserta didik mampu menemukan dan memperbaiki kesalahan logika pada program <b>${clean}</b> secara mandiri.</li>
      </ol>`;
      meaningful = `Keterampilan berpikir komputasional bertema <b>${clean}</b> melatih siswa untuk memecah masalah besar menjadi langkah-langkah kecil, berpikir logis, dan menciptakan solusi kreatif — kemampuan yang dibutuhkan di era digital masa depan.`;
      pemantik = `<ol>
        <li>"Apa langkah pertama yang harus kita lakukan sebelum mulai menulis kode program di komputer? Mengapa perencanaan (flowchart) itu penting?"</li>
        <li>"Pernahkah program yang kamu buat mengalami error (bug)? Apa yang kamu rasakan dan bagaimana cara kamu memperbaikinya?"</li>
      </ol>`;
    }
  }
  // ===================== PJOK (PENJASORKES) =====================
  else if (sub.includes("pjok") || sub.includes("olahraga")) {
    if (t.includes("senam") || t.includes("irama") || t.includes("gerak") || t.includes("tempo")) {
      tp = `<ol>
        <li>Melalui senam kesegaran jasmani terpadu, peserta didik mampu <b>melakukan gerak dasar lokomotor dan manipulatif sesuai irama musik</b> dengan kompak.</li>
        <li>Melalui latihan berulang, peserta didik mampu <b>menjaga keseimbangan dan kelenturan tubuh</b> sesuai ketukan tempo musik senam.</li>
      </ol>`;
      meaningful = `Senam irama menjaga kelenturan otot tubuh, melatih koordinasi otak-otot motorik, serta membiasakan kita untuk hidup bugar dan riang gembira melalui olahraga.`;
      pemantik = `<ol>
        <li>"Bagaimana perasaan kalian saat melakukan gerakan melompat dan melambaikan tangan secara serentak mengikuti ketukan musik yang riang?"</li>
        <li>"Mengapa kita perlu melakukan peregangan otot (pemanasan) terlebih dahulu agar tidak mengalami kram atau cedera saat senam?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui praktik peragaan teknik di lapangan, peserta didik mampu <b>mempraktikkan gerak dasar spesifik dalam materi ${clean}</b> secara benar dan aman.</li>
        <li>Melalui permainan tim kolaboratif, peserta didik mampu <b>menunjukkan sportivitas, kejujuran, dan kerja sama kelompok</b> yang solid.</li>
      </ol>`;
      meaningful = `Aktivitas fisik bertema <b>${clean}</b> memupuk kebugaran organ jantung, memperkuat otot-otot tubuh, serta melatih mental tangguh, disiplin, dan sportivitas pantang menyerah.`;
      pemantik = `<ol>
        <li>"Dapatkah kalian menyebutkan gerakan dasar apa saja yang paling penting dipraktikkan dalam olahraga ${clean}?"</li>
        <li>"Bagaimana sikap kita sebagai olahragawan yang baik apabila tim kita belum berhasil memenangkan pertandingan hari ini?"</li>
      </ol>`;
    }
  }
  // ===================== SENI RUPA / SENI MUSIK =====================
  else if (sub.includes("senirupa") || sub.includes("seni") || sub.includes("musik")) {
    if (t.includes("gambar") || t.includes("sketsa") || t.includes("warna") || t.includes("lukis") || t.includes("kolase")) {
      tp = `<ol>
        <li>Melalui pengamatan alam sekitar sekolah, peserta didik mampu <b>mengidentifikasi kombinasi warna, garis, dan tekstur seni rupa</b> secara mandiri.</li>
        <li>Melalui pembuatan karya menggambar ekspresif, peserta didik mampu <b>menghasilkan lukisan/sketsa kreatif</b> yang mencerminkan imajinasinya secara indah.</li>
      </ol>`;
      meaningful = `Seni rupa ekspresif melatih kepekaan rasa estetika (keindahan), menyalurkan emosi positif lewat goresan warna, dan memicu daya kreativitas mendesain objek visual.`;
      pemantik = `<ol>
        <li>"Warna-warna apa saja yang menurut kalian paling cocok dipadukan untuk menggambarkan suasana matahari terbit di pegunungan?"</li>
        <li>"Bagaimana tekstur permukaan daun kering membantu kita membuat karya kolase atau jiplakan gambar yang unik?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui apresiasi seni dan praktik berkarya, peserta didik mampu <b>mengenal teknik dan keindahan karya seni rupa bertema ${clean}</b> secara kreatif.</li>
        <li>Melalui pameran apresiasi kelas, peserta didik mampu <b>memberikan ulasan positif dan membangun atas karya seni milik temannya</b>.</li>
      </ol>`;
      meaningful = `Mempelajari seni rupa bertema <b>${clean}</b> menumbuhkan apresiasi kebudayaan lokal, melatih ketelitian motorik halus tangan, serta menumbuhkan rasa bangga atas karya orisinal ciptaan sendiri.`;
      pemantik = `<ol>
        <li>"Bahan bekas atau bahan alam apa saja di sekitar rumahmu yang bisa kita daur ulang menjadi pajangan seni bertema ${clean}?"</li>
        <li>"Mengapa setiap orang memiliki cara menggambar yang berbeda-beda meskipun objek gambar yang dilihat sama? Di manakah letak keunikannya?"</li>
      </ol>`;
    }
  }
  // ===================== KRISTEN =====================
  else if (sub.includes("kristen")) {
    if (t.includes("kasih") || t.includes("yesus") || t.includes("tuhan") || t.includes("doa")) {
      tp = `<ol>
        <li>Melalui pembacaan kisah Alkitab, peserta didik mampu <b>menceritakan teladan kasih Yesus Kristus</b> dan menjelaskan maknanya bagi kehidupan sehari-hari.</li>
        <li>Melalui doa dan refleksi bersama, peserta didik mampu <b>mengungkapkan rasa syukur</b> kepada Tuhan atas berkat keluarga, kesehatan, dan persahabatan.</li>
      </ol>`;
      meaningful = `Kasih adalah hukum utama ajaran Kristiani: "Kasihilah sesamamu manusia seperti dirimu sendiri." Memahami kasih Kristus membantu kita bersikap pengampun, murah hati, dan peduli terhadap sesama — terutama mereka yang membutuhkan pertolongan.`;
      pemantik = `<ol>
        <li>"Tuhan Yesus mengajarkan kita untuk mengasihi semua orang, bahkan musuh kita. Menurutmu, mengapa hal itu sangat sulit namun sangat penting?"</li>
        <li>"Sebutkan satu hal yang kamu syukuri hari ini. Bagaimana cara kamu mengucapkan terima kasih kepada Tuhan atas berkat tersebut?"</li>
      </ol>`;
    } else {
      tp = `<ol>
        <li>Melalui pembacaan Firman Tuhan dan diskusi kelompok, peserta didik mampu <b>memahami nilai-nilai iman Kristen</b> yang terkandung dalam materi ${clean}.</li>
        <li>Melalui refleksi doa pribadi, peserta didik mampu <b>menerapkan teladan moral Alkitab</b> terkait ${clean} dalam pergaulan sehari-hari dengan sesama.</li>
      </ol>`;
      meaningful = `Mempelajari <b>${clean}</b> dalam perspektif iman Kristen membantu peserta didik bertumbuh dalam karakter yang mencerminkan buah Roh: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, dan penguasaan diri.`;
      pemantik = `<ol>
        <li>"Pelajaran berharga apa yang bisa kita petik dari kisah Alkitab tentang ${clean} untuk diterapkan di sekolah dan rumah?"</li>
        <li>"Bagaimana kamu bisa menjadi berkat bagi teman-temanmu melalui nilai-nilai yang terkandung dalam materi ${clean}?"</li>
      </ol>`;
    }
  }
  // ===================== BAHASA INGGRIS =====================
  else if (sub.includes("english") || sub.includes("inggris")) {
    tp = `<ol>
      <li>Through interactive games and flashcards, students are able to <b>identify and pronounce English vocabulary</b> about ${clean} correctly.</li>
      <li>Through pair dialogues, students are able to <b>practice speaking simple English phrases</b> in daily life situations with confidence.</li>
    </ol>`;
    meaningful = `Learning English opens a window to communicate globally, understand international technology, read guidance on toys, and share our culture with friends from other countries.`;
    pemantik = `<ol>
      <li>"Do you know the English word for items in your pencil case? What is the English of 'buku' and 'pensil'?"</li>
      <li>"Why do you think learning English is cool and fun for your future travel plans?"</li>
    </ol>`;
  }
  // ===================== BAHASA JAWA =====================
  else if (sub.includes("jawa")) {
    tp = `<ol>
      <li>Melalui kegiatan maos lan mirengaken pacelathon, peserta didik mampu <b>mahami unggah-ungguh basa Jawa (Ngoko lan Krama)</b> kanthi bener.</li>
      <li>Melalui praktik micara, peserta didik mampu <b>nggunakake basa Jawa krama alus</b> nalika matur marang bapak/ibu guru utawa wong tuwa kanthi sopan santun.</li>
    </ol>`;
    meaningful = `Basa Jawa lan unggah-ungguh mulang kita tata krama lan budi pekerti luhur kanggo ngajeni wong sing luwih tuwa, minangka warisan kabudayan sing kudu diuri-uri.`;
    pemantik = `<ol>
      <li>"Kapan awake dhewe nggunakake basa Jawa ngoko lan kapan kudu nggunakake basa Jawa krama?"</li>
      <li>"Kepriye carane matur 'kula badhe dhateng wingking' marang Ibu Guru kanthi sopan lan trep?"</li>
    </ol>`;
  }
  // ===================== FALLBACK UNIVERSAL =====================
  else {
    tp = `<ol>
      <li>Melalui kegiatan pembelajaran aktif, diskusi kelompok, dan penugasan terstruktur, peserta didik mampu <b>mengidentifikasi konsep esensial terkait ${clean}</b> secara mandiri dan kritis.</li>
      <li>Melalui penyajian karya kreatif, peserta didik mampu <b>menyimplukan keterkaitan materi ${clean} dengan kehidupan nyata sehari-hari</b>.</li>
    </ol>`;
    meaningful = `Materi <b>${clean}</b> memberikan wawasan penting untuk membimbing nalar kritis siswa, kepedulian sosial, serta melatih kemandirian dalam memecahkan persoalan sehari-hari.`;
    pemantik = `<ol>
      <li>"Apakah kalian pernah mendengar atau melihat topik ${clean} di media atau obrolan keluarga? Apa yang kalian ketahui?"</li>
      <li>"Bagaimana materi ${clean} ini bisa membantu kalian menjadi pribadi yang lebih bijak, disiplin, atau kreatif?"</li>
    </ol>`;
  }

  return { tp, meaningful, pemantik };
}

// ----------------------------------------------------
// DYNAMIC SUBJECT MAPPING ENGINE (Permendikdasmen No 13/2025)
// ----------------------------------------------------
function getSubjectDetails(subjectId, topicName) {
  // Tentukan kategori mata pelajaran berdasarkan ID
  let category = "indonesia";
  if (subjectId.includes("matematika")) category = "matematika";
  else if (subjectId.includes("koding")) category = "koding";
  else if (subjectId.includes("pjok")) category = "pjok";
  else if (subjectId.includes("senirupa")) category = "senirupa";
  else if (subjectId.includes("pai")) category = "pai";
  else if (subjectId.includes("pancasila")) category = "pancasila";
  else if (subjectId.includes("ipas")) category = "ipas";
  else if (subjectId.includes("english")) category = "english";
  else if (subjectId.includes("jawa")) category = "jawa";

  const details = {
    tp: "",
    meaningful: "",
    pemantik: "",
    mindful: "",
    meaningfulAct: "",
    joyfulAct: "",
    langkahPendahuluan: "",
    langkahInti: "",
    langkahPenutup: "",
    asesmenFormatif: "",
    asesmenSumatif: "",
    refleksiGuru: `
      <div style="background-color: #f8faf9; padding: 15px; border-radius: 8px; border: 1px solid #d2e4e1; margin-top: 15px;">
        <p class="fw-bold" style="color: #0b5e56; margin-bottom: 8px; font-weight: bold;">🤔 Refleksi Guru setelah Pembelajaran Topik: ${topicName}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; color: #0b5e56; font-size:10pt; font-weight: bold;">Pertanyaan Refleksi</th>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; color: #0b5e56; font-size:10pt; width: 30%; font-weight: bold;">Catatan Guru</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">1. Apakah aktivitas Mindful (Teknik STOP) berhasil menenangkan dan memfokuskan emosi belajar siswa sebelum masuk ke materi ${topicName}?</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">2. Apakah siswa dapat menangkap koneksi kehidupan nyata (Meaningful) dari materi ${topicName} dalam kehidupan sehari-hari mereka?</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">3. Apakah game kolaboratif (Joyful) berjalan tertib dan membangkitkan kebahagiaan belajar siswa?</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">4. Apa saja kesulitan atau miskonsepsi siswa pada materi ${topicName} yang perlu diperbaiki pada pertemuan berikutnya?</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    refleksiSiswa: `
      <div style="background-color: #f8faf9; padding: 15px; border-radius: 8px; border: 1px solid #d2e4e1; margin-top: 15px;">
        <p class="fw-bold" style="color: #0b5e56; margin-bottom: 8px; font-weight: bold;">😊 Refleksi Siswa Ceria (Diisi oleh Siswa) - Topik: ${topicName}</p>
        <p style="font-size: 10.5pt; color: #2b3a38; margin-bottom: 10px;">Gambarlah emotikon senyum (😊) atau sedih (😢) di kolom jawaban sesuai dengan perasaanmu ya!</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; color: #0b5e56; font-size:10pt; font-weight: bold;">Pernyataan Refleksi Siswa</th>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; color: #0b5e56; font-size:10pt; width: 30%; text-align:center; font-weight: bold;">Perasaanku</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">1. Aku merasa tenang dan siap belajar setelah melakukan peregangan napas (Teknik STOP).</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align:center;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">2. Aku sekarang mengerti mengapa materi ${topicName} penting dan berguna untuk kehidupanku di rumah atau sekolah.</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align:center;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">3. Aku sangat senang bermain game kelompok bersama teman-teman hari ini.</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align:center;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-size:9.5pt;">4. Bagian materi mana dari ${topicName} yang paling ingin kamu pelajari lebih lanjut? Tuliskan:</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    bahanAjarText: "",
    lkpdContent: "",
    rubricContent: "",
    praktikPedagogis: "",
    kemitraanPembelajaran: "",
    lingkunganPembelajaran: "",
    pemanfaatanDigital: ""
  };

  // Default values for new fields (Desain Pembelajaran)
  details.praktikPedagogis = `Pendidik menggunakan pendekatan pembelajaran mendalam (Deep Learning) melalui praktik berkesadaran (Mindful), pembelajaran kontekstual relevan (Meaningful), serta kolaborasi aktif yang menyenangkan (Joyful). Proses pembelajaran berpusat pada murid (Student-Centered) menggunakan metode diskusi kelompok, penemuan terbimbing, atau bermain peran (role play).`;
  
  details.lingkunganPembelajaran = `Memanfaatkan lingkungan ruang kelas yang aman dan ramah anak (seperti pengaturan meja belajar berkelompok) serta lingkungan sekitar sekolah (halaman, perpustakaan, atau kebun sekolah) guna merangsang partisipasi aktif dan keingintahuan siswa.`;

  switch (category) {
    case "matematika":
      details.tp = `Mengidentifikasi, menghitung, dan menerapkan konsep matematika tentang <b>${topicName}</b> dalam memecahkan masalah numerik sehari-hari secara logis.`;
      details.meaningful = `Kemampuan berhitung dan pemecahan masalah numerik <b>${topicName}</b> membantu kita mengelola waktu, merencanakan keuangan, dan berpikir rasional dalam kehidupan.`;
      details.pemantik = `
        <ol>
          <li>Bagaimana konsep <b>${topicName}</b> ini membantu kita membagi mainan atau makanan secara adil dengan teman kita?</li>
          <li>Di mana saja kamu pernah melihat penerapan konsep <b>${topicName}</b> ini saat bermain di luar rumah?</li>
          <li>Apa yang akan terjadi jika pedagang di pasar salah menghitung angka dalam konsep <b>${topicName}</b>?</li>
        </ol>
      `;
      details.mindful = `
        Guru menyapa anak-anak dengan senyuman hangat, lalu mengajak mereka melakukan <b>Teknik STOP Ketenangan Numerasi</b>:<br>
        Anak-anak duduk santai, memejamkan mata, membuang napas perlahan untuk meredakan rasa cemas terhadap matematika, serta menyiapkan otak fokus pada keindahan logika angka.
      `;
      details.meaningfulAct = `
        Anak-anak secara aktif menghubungkan konsep <b>${topicName}</b> dengan aktivitas nyata seperti simulasi menghitung jumlah kelereng kelompok, mengukur panjang meja kelas secara nyata, atau menjumlahkan harga jajanan favorit di kantin.
      `;
      details.joyfulAct = `
        <b>Bermain Estafet Angka Ceria:</b><br>
        Anak-anak berlomba menyusun kartu angka dan memecahkan teka-teki logika <b>${topicName}</b> dalam kelompok kecil secara bergotong royong dengan penuh tawa gembira.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa anak-anak dengan senyuman ceria dan hangat, menanyakan kabar perasaan mereka pagi ini.<br>
        2. Mengajak anak-anak berdiri tegak untuk meregangkan otot badan sambil menyanyikan lagu numerasi yang riang.<br>
        3. Guru menunjukkan benda konkret (seperti buah atau kancing baju) di depan kelas untuk memicu rasa penasaran anak-anak tentang materi <b>${topicName}</b>.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Guru mengajak anak-anak mengamati gambar visual menarik atau memegang benda nyata di meja mereka untuk mengeksplorasi konsep <b>${topicName}</b>.<br>
        2. <b>Menalar & Menyelidiki</b>: Anak-anak berdiskusi interaktif dengan guru mengenai cara menghitung atau menerapkan <b>${topicName}</b> secara praktis di kehidupan sehari-hari.<br>
        3. <b>Berkolaborasi (Joyful)</b>: Anak-anak berkelompok memecahkan tantangan kartu angka <b>${topicName}</b> secara bergotong royong menggunakan papan kerja kelompok yang penuh warna.<br>
        4. <b>Mempresentasikan</b>: Perwakilan kelompok maju ke depan kelas dengan percaya diri menjelaskan hasil diskusinya dengan bahasa anak yang polos dan jujur.<br>
        5. Guru memberikan pelukan apresiasi, tepuk tangan salut, serta meluruskan konsep yang keliru secara lembut dan ramah.
      `;
      details.langkahPenutup = `
        1. Guru bersama anak-anak menyimpulkan konsep hitung <b>${topicName}</b> yang telah dipelajari dengan cara yang menyenangkan.<br>
        2. Melakukan refleksi perasaan: 'Siapa yang hari ini merasa matematika itu seru dan menyenangkan?'.<br>
        3. Guru membagikan lembar Asesmen Mandiri untuk dikerjakan secara jujur.<br>
        4. Kelas ditutup dengan doa bersama dan salam hangat.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur kesiapan emosi belajar matematika anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi keaktifan anak dalam berdiskusi kelompok memecahkan soal matematika.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji pemahaman tertulis mandiri (kognitif) terkait <b>${topicName}</b> (soal terlampir pada modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Membaca & Memahami Konsep Matematika!</h3>
        <p>Belajar matematika itu asyik, menantang, dan sangat berguna untuk kehidupan kita sehari-hari. Hari ini kita akan mendalami materi tentang <b>${topicName}</b>. Angka dan logika matematika membantu kita mengerti bagaimana dunia ini bekerja secara teratur.</p>
        
        <p><b>Mengapa Materi Ini Sangat Penting?</b></p>
        <p>Konsep <b>${topicName}</b> mengajarkan kita untuk berpikir secara logis, kritis, dan sistematis. Dalam kehidupan sehari-hari, kita menggunakan konsep ini tanpa kita sadari. Misalnya, ketika kita mengukur panjang meja belajar, menghitung kembalian uang jajan di kantin, membagi kue secara adil dengan adik, atau memperkirakan waktu perjalanan dari rumah ke sekolah agar tidak terlambat.</p>
        
        <p><b>Konsep Kunci yang Harus Dipahami:</b></p>
        <ul>
          <li><b>Definisi Utama:</b> Memahami arti dan fungsi dari ${topicName} serta bagaimana hubungannya dengan angka lainnya.</li>
          <li><b>Pola dan Logika:</b> Menemukan pola hitung atau visual untuk mempermudah pengerjaan.</li>
          <li><b>Penerapan Praktis:</b> Menggunakan hitungan ini dalam situasi nyata, seperti transaksi jual beli, pembagian barang, atau pengukuran dimensi objek fisik.</li>
        </ul>

        <p><b>Langkah-Langkah Memahami Soal Matematika:</b></p>
        <ol>
          <li><b>Pahami Soal dengan Seksama:</b> Bacalah soal cerita atau instruksi secara perlahan. Cari tahu informasi apa yang diberikan (diketahui) dan apa yang ditanyakan.</li>
          <li><b>Gunakan Alat Bantu Visual/Konkret:</b> Jika merasa kesulitan membayangkan angka, gunakan benda di sekitarmu seperti kelereng, lidi, kertas lipat, atau gambar arsiran untuk membantu visualisasimu.</li>
          <li><b>Tuliskan Langkah Kerja:</b> Biasakan menuliskan langkah pengerjaan secara runtut (diketahui, ditanyakan, cara penyelesaian, dan kesimpulan akhir) agar tidak ada hitungan yang terlewat.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fakta Menarik Matematika:</b> Tahukah kamu bahwa pola matematika dapat ditemukan di alam semesta? Kelopak bunga, bentuk cangkang kerang, hingga formasi bintang di langit mengikuti pola geometri dan bilangan tertentu yang sangat indah. Sinau matematika adalah cara kita mengagumi keteraturan alam ciptaan Tuhan!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Tantangan Matematika Ceria</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Memahami konsep ${topicName} dengan memecahkan soal cerita bergambar menggunakan bantuan benda konkret.</p>
          
          <p><b>B. Langkah Kerja Kelompok:</b><br>
          1. Siapkan lidi atau kancing baju yang sudah dibagikan guru.<br>
          2. Diskusikan soal-soal di bawah ini bersama teman sekelompokmu secara rukun.<br>
          3. Tuliskan jawaban akhirmu dengan rapi di kolom yang disediakan.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Jika kita menerapkan ${topicName} pada 5 kelereng ditambah 3 kelereng, maka jumlah kelereng kita adalah...<br>A. 7 kelereng<br>B. 8 kelereng<br>C. 9 kelereng</p>
          <p>2. Bangun datar yang memiliki 3 sudut dan 3 sisi yang kita temui saat belajar ${topicName} disebut...<br>A. Segitiga<br>B. Persegi<br>C. Lingkaran</p>
          
          <p><b>D. Tantangan 2: Pertanyaan Uraian</b><br>
          Tuliskan 1 contoh bagaimana kamu menerapkan konsep ${topicName} ini ketika berada di rumah!</p>
          
          <p><b>E. Tantangan 3: Aktivitas Mewarnai Kelompok</b><br>
          Gambarkan bentuk pecahan setengah (1/2) dari sebuah pizza berbentuk lingkaran di bawah ini, lalu warnailah menggunakan pensil warna kesukaanmu!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p><b>Kerjakan soal-soal di bawah ini secara jujur dan teliti ya anak-anak hebat!</b></p>
          <p>1. Selesaikan operasi hitung ${topicName} berikut: 15 dikurangi 7 adalah...<br>A. 7<br>B. 8<br>C. 9</p>
          <p>2. Tentukan nilai tempat angka 8 pada bilangan 84 dalam konsep ${topicName}!<br>A. Satuan<br>B. Puluhan<br>C. Ratusan</p>
          <p>3. Ibu memiliki 10 buah apel. Apel tersebut dibagikan sama banyak kepada Kakak dan Adik. Berapakah jumlah apel yang diterima masing-masing anak? Tuliskan cara menghitungnya!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (8)</b> - Skor: 30<br>
          2. <b>B (Puluhan)</b> - Skor: 30<br>
          3. <b>Masing-masing mendapat 5 apel (10 dibagi 2 = 5)</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN SIKAP & KINERJA</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Kerapian Perhitungan</b></td>
                <td>Langkah pengerjaan runtut, jawaban 100% benar</td>
                <td>Jawaban benar tapi langkah kurang lengkap</td>
                <td>Langkah acak-acakan dan jawaban salah</td>
              </tr>
              <tr>
                <td><b>Kemandirian Belajar</b></td>
                <td>Mampu menyelesaikan seluruh soal mandiri tanpa menyontek</td>
                <td>Menyelesaikan soal dengan sedikit arahan guru</td>
                <td>Belum mampu mengerjakan soal secara mandiri</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "koding":
      details.tp = `Siswa mampu memahami, mempraktikkan, dan merancang proyek koding visual atau berpikir komputasional tentang <b>${topicName}</b> secara mandiri dan kritis.`;
      details.meaningful = `Pemrograman dan berpikir komputasional membantu kita memecahkan masalah besar secara logis, serta membuka peluang berinovasi teknologi masa depan.`;
      details.pemantik = `
        <ol>
          <li>Bagaimana cara komputer memahami instruksi yang kita susun lewat koding <b>${topicName}</b>?</li>
          <li>Apa yang membedakan program biasa dengan sistem kecerdasan artifisial (AI) dalam konsep <b>${topicName}</b>?</li>
          <li>Mengapa penting untuk berdiskusi kelompok saat memecahkan kesalahan koding (bug) yang rumit?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP Ketenangan Algoritma</b>:<br>
        Siswa menutup mata, mengatur napas lambat untuk merilekskan ketegangan logika komputer, serta memfokuskan mental pada urutan logika instruksi koding yang rapi.
      `;
      details.meaningfulAct = `
        Siswa menyusun algoritma urutan langkah logis menyeduh susu manis atau menyeberang jalan secara aman sebelum menulis kode instruksi komputer terkait <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Game Robot dan Programmer:</b><br>
        Siswa berpasangan, satu menjadi robot yang bergerak mengikuti instruksi koding visual (maju 2 langkah, belok kanan) dari temannya secara ceria.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa anak-anak dengan sapaan hangat: 'Halo para calon penemu masa depan!'.<br>
        2. Guru mengajak anak-anak berdiri melakukan tepuk koding gembira untuk meningkatkan fokus belajar.<br>
        3. Guru melakukan apersepsi dengan menunjukkan karakter robot Scratch di layar untuk mengenalkan topik <b>${topicName}</b>.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Guru mengajak anak-anak mengamati simulasi visual blok koding <b>${topicName}</b> di proyektor kelas secara antusias.<br>
        2. <b>Menalar & Menyelidiki</b>: Anak-anak secara kritis menalar alur logika apa yang akan terjadi jika blok perintah koding <b>${topicName}</b> diubah atau disusun berbeda.<br>
        3. <b>Berkolaborasi (Joyful)</b>: Anak-anak secara berpasangan/kelompok bergotong royong menyusun blok koding kartu visual <b>${topicName}</b> di atas meja kerja mereka.<br>
        4. <b>Mempresentasikan</b>: Perwakilan kelompok memperagakan gerakan 'Robot' di depan kelas mengikuti alur algoritma <b>${topicName}</b> hasil rancangan kelompoknya.<br>
        5. Guru memberikan apresiasi tinggi berupa tepuk salut koding dan meluruskan konsep logika (debugging) secara ramah.
      `;
      details.langkahPenutup = `
        1. Guru dan anak-anak mengevaluasi bersama tentang logika yang salah (debugging) pada materi <b>${topicName}</b>.<br>
        2. Refleksi perasaan: 'Apakah belajar logika koding hari ini seru?'.<br>
        3. Guru membagikan lembar Asesmen Mandiri.<br>
        4. Kelas ditutup dengan doa bersama.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur kesiapan emosi belajar logika teknologi anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi kerja sama kelompok memecahkan error/bug pemrograman Scratch.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji hasil logika koding secara mandiri terkait konsep <b>${topicName}</b> (soal terlampir pada modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Menjadi Penjelajah Teknologi Masa Depan!</h3>
        <p>Selamat datang di dunia koding dan kecerdasan artifisial! Hari ini kita akan mempelajari topik seru, yaitu <b>${topicName}</b>. Dengan menguasai teknologi ini, kamu bukan hanya menjadi penonton, melainkan menjadi pencipta teknologi masa depan.</p>
        
        <p><b>Apa itu Koding dan AI?</b></p>
        <p>Koding adalah proses memberikan instruksi kepada komputer menggunakan bahasa yang dipahami oleh mesin. Komputer sebenarnya tidak cerdas; mereka hanya sangat cepat menjalankan perintah kita. Agar komputer bisa membantu kita, kita harus menyusun urutan langkah-langkah pemecahan masalah secara logis yang disebut **Algoritma**. Sementara itu, **Kecerdasan Artifisial (AI)** adalah teknologi yang membuat komputer bisa belajar dari contoh-contoh data seperti cara manusia belajar, bukan hanya mengikuti perintah kaku.</p>
        
        <p><b>Prinsip Berpikir Komputasional (Computational Thinking):</b></p>
        <ul>
          <li><b>Dekomposisi:</b> Memecah masalah besar (seperti membuat game) menjadi bagian-bagian kecil yang lebih mudah dikerjakan (membuat karakter bergerak, membuat skor, dll).</li>
          <li><b>Pengenalan Pola:</b> Menemukan kesamaan cara memecahkan masalah yang pernah ditemui sebelumnya.</li>
          <li><b>Abstraksi:</b> Fokus pada hal-hal penting saja dan mengabaikan detail yang tidak berguna.</li>
          <li><b>Algoritma:</b> Menyusun instruksi langkah demi langkah secara urut untuk menyelesaikan tugas.</li>
        </ul>

        <p><b>Cara Membuat Program dan Mengatasi Error (Debugging):</b></p>
        <ol>
          <li><b>Rancang Logikanya Terlebih Dahulu:</b> Gunakan diagram alir atau gambar sebelum mulai menyusun blok kode di Scratch.</li>
          <li><b>Tumpuk Blok Perintah dengan Benar:</b> Pastikan alur blok koding visual saling menyambung dengan logika yang masuk akal (misalnya: 'jika menyentuh warna merah, kurangi poin').</li>
          <li><b>Uji Coba Berulang Kali:</b> Jalankan programmu secara berkala. Jika program tidak berjalan semestinya, periksa blok perintah satu per satu untuk menemukan letak kesalahannya (debugging).</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fakta Menarik AI:</b> Kecerdasan Artifisial (AI) digunakan dalam berbagai aplikasi sehari-hari yang sering kamu gunakan, seperti deteksi wajah di kamera ponsel, penyaring pesan spam di email, hingga sistem rekomendasi video di YouTube! Namun ingat, etika dan privasi data pribadi harus selalu dijaga saat berinteraksi dengan AI.
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Penjelajah Koding & AI</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Siswa mampu merancang urutan langkah logis (algoritma) koding sederhana tentang ${topicName} secara berkelompok.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Bekerjalah bersama teman sekelompokmu secara kompak.<br>
          2. Diskusikan bagaimana menggerakkan Sprite sesuai instruksi di bawah.<br>
          3. Tuliskan jawabanmu pada kotak yang tersedia.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Urutan langkah logis untuk menyelesaikan suatu masalah dalam koding disebut...<br>A. Algoritma<br>B. Bug<br>C. Loop</p>
          <p>2. Koding visual Scratch menggunakan media berupa...<br>A. Tulisan kode teks rumit<br>B. Blok perintah bergambar yang bisa ditempel/ditumpuk<br>C. Tombol angka kalkulator</p>
          
          <p><b>D. Tantangan 2: Isian Singkat</b><br>
          Jika karakter kucing (Sprite) di programmu tidak mau melompat, proses mencari letak kesalahan logika koding tersebut dinamakan...</p>
          
          <p><b>E. Tantangan 3: Praktik Algoritma</b><br>
          Tuliskan 4 langkah berurutan untuk memprogram Sprite agar berjalan maju 10 langkah, lalu berputar ke kanan 90 derajat!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p><b>Selesaikan tantangan koding di bawah ini secara jujur dan mandiri ya!</b></p>
          <p>1. Istilah kesalahan atau error dalam urutan koding dinamakan...<br>A. Sprite<br>B. Bug<br>C. Script</p>
          <p>2. Di dalam Scratch, untuk membuat suatu gerakan berulang tanpa henti, kita menggunakan blok...<br>A. Forever (Selamanya)<br>B. Move (Gerak)<br>C. When clicked (Ketika diklik)</p>
          <p>3. Mengapa kita perlu memecah masalah besar menjadi bagian-bagian kecil (Dekomposisi) saat memprogram AI? Berikan 1 contoh sederhananya!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Bug)</b> - Skor: 30<br>
          2. <b>A (Forever)</b> - Skor: 30<br>
          3. <b>Agar masalah lebih mudah diselesaikan. Contoh: Sebelum memprogram robot berjalan, kita pecah menjadi memprogram kaki kiri maju, lalu kaki kanan maju.</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN LOGIKA & KREATIVITAS</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Logika Algoritma</b></td>
                <td>Urutan langkah koding 100% logis dan tanpa bug</td>
                <td>Urutan langkah logis tapi ada 1 bug kecil</td>
                <td>Logika acak dan program tidak jalan (error)</td>
              </tr>
              <tr>
                <td><b>Problem Solving</b></td>
                <td>Mampu melakukan debugging bug koding secara mandiri</td>
                <td>Mampu mendeteksi bug dengan bantuan petunjuk guru</td>
                <td>Belum mampu menemukan letak error koding</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "pjok":
      details.tp = `Mengidentifikasi, mempraktikkan, dan memelihara keterampilan fisik serta gerak dasar spesifik tentang <b>${topicName}</b> dengan aman dan menjunjung tinggi sportivitas.`;
      details.meaningful = `Tubuh yang aktif bergerak, sehat, dan bugar melalui aktivitas <b>${topicName}</b> meningkatkan stamina fisik, disiplin diri, serta kualitas hidup.`;
      details.pemantik = `
        <ol>
          <li>Mengapa kita wajib melakukan pemanasan sebelum mempraktikkan gerakan <b>${topicName}</b>?</li>
          <li>Bagaimana perasaan badanmu setelah berkeringat secara sehat saat berolahraga <b>${topicName}</b>?</li>
          <li>Bagaimana sikap yang baik ketika kelompok bermain kita mengalami kekalahan dalam olahraga?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (Peregangan Bernapas)</b>:<br>
        Siswa berdiri tegak, merentangkan tangan, melakukan peregangan otot leher secara perlahan dikombinasikan dengan menarik napas dalam-dalam untuk meredakan ketegangan fisik.
      `;
      details.meaningfulAct = `
        Siswa mempraktikkan gerakan dasar olahraga ini secara rutin sebagai kebiasaan bermain sehat yang aman bersama teman di rumah terkait materi <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Permainan Dinamis Kelompok:</b><br>
        Siswa bermain game gerak gembira modifikasi gerakan <b>${topicName}</b> dengan aturan sederhana yang memacu tawa sehat.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa kelas di lapangan dengan ceria, memimpin doa, dan memeriksa kerapian pakaian olahraga anak-anak.<br>
        2. Melakukan peregangan fisik ringan yang dikemas sebagai permainan interaktif yang seru.<br>
        3. Guru menjelaskan pentingnya olahraga hari ini untuk menjaga kebugaran jasmani.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami</b>: Guru memperagakan teknik dasar gerakan <b>${topicName}</b> dengan benar di depan lapangan kelas.<br>
        2. <b>Menalar & Mencoba (Meaningful)</b>: Anak-anak berdiskusi dan menanyakan bagian gerakan mana dari <b>${topicName}</b> yang membutuhkan keseimbangan tubuh.<br>
        3. <b>Berkolaborasi (Joyful)</b>: Anak-anak secara berpasangan atau kelompok berlatih gerakan dasar <b>${topicName}</b> secara gotong royong dan saling mendukung.<br>
        4. <b>Kompetisi Sehat</b>: Mengadakan lomba gerak estafet atau permainan modifikasi berbasis olahraga <b>${topicName}</b>.<br>
        5. Guru memberikan apresiasi tos gembira, pujian sportivitas, serta mengoreksi posisi tubuh yang salah secara aman.
      `;
      details.langkahPenutup = `
        1. Melakukan gerakan pendinginan (cooling down) bersama sambil menyanyi lagu santai.<br>
        2. Refleksi: 'Siapa yang ototnya terasa lebih kuat hari ini?'.<br>
        3. Membagikan lembar Asesmen Mandiri kognitif.<br>
        4. Mengingatkan anak-anak untuk minum air putih yang cukup dan mencuci tangan.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur tingkat kebugaran dan kesiapan fisik anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi ketepatan koordinasi gerak dan sikap sportivitas siswa.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji kinerja mempraktikkan gerak dasar olahraga bertarget dengan lembar penilaian diri mandiri.
      `;
      details.bahanAjarText = `
        <h3>Ayo Sehat, Bugar, dan Gembira Bersama!</h3>
        <p>Olahraga secara teratur adalah investasi terbaik untuk kesehatan dan kekuatan tubuh kita. Hari ini kita mempraktikkan keterampilan gerak dasar terkait materi <b>${topicName}</b>. Tubuh yang aktif bergerak akan membuat pikiran menjadi lebih segar dan bersemangat.</p>
        
        <p><b>Pentingnya Aktivitas Fisik Bagi Tubuh:</b></p>
        <p>Aktivitas fisik dalam <b>${topicName}</b> membantu melatih kekuatan otot, kelenturan persendian, koordinasi keseimbangan, serta daya tahan jantung dan paru-paru. Saat berolahraga, tubuh memproduksi hormon endorfin yang membuat kita merasa bahagia dan tenang, serta meningkatkan fokus belajar kita di kelas.</p>
        
        <p><b>Langkah-Langkah Keselamatan dalam Berolahraga:</b></p>
        <ol>
          <li><b>Pemanasan (Warm Up):</b> Wajib dilakukan sebelum berolahraga untuk mempersiapkan otot dan meningkatkan detak jantung secara bertahap demi mencegah kram dan cedera tubuh.</li>
          <li><b>Ikuti Petunjuk Gerak:</b> Perhatikan posisi kaki, tangan, dan pandangan mata sesuai petunjuk guru agar gerakan efisien, seimbang, dan aman bagi diri sendiri serta orang lain.</li>
          <li><b>Pendinginan (Cool Down):</b> Lakukan gerakan peregangan ringan dan atur napas setelah berolahraga agar detak jantung kembali normal dan mencegah penumpukan asam laktat di otot yang menyebabkan pegal-pegal.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Pola Hidup Bersih dan Sehat (PHBS):</b> Jangan lupa untuk selalu mencuci tangan dengan sabun, mandi secara bersih setelah selesai berolahraga untuk membersihkan keringat, dan minum air putih yang cukup agar tubuh terhindar dari kuman penyakit dan dehidrasi!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Evaluasi Jasmani Sehat</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Pembelajaran:</b><br>
          Mampu mengidentifikasi gerakan lokomotor dan non-lokomotor pada aktivitas ${topicName} secara benar.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Jawablah pertanyaan di bawah ini secara mandiri.<br>
          2. Diskusikan dengan teman kelompokmu mengapa kita harus bersikap sportif dalam olahraga.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Gerakan di bawah ini yang termasuk gerak lokomotor (berpindah tempat) saat bermain ${topicName} adalah...<br>A. Meliukkan badan ke samping<br>B. Berlari mengejar bola<br>C. Menekuk lutut di tempat</p>
          <p>2. Sebelum melakukan gerakan inti ${topicName}, kita harus melakukan... agar otot tidak cedera.<br>A. Pendinginan<br>B. Pemanasan<br>C. Tidur</p>
          
          <p><b>D. Tantangan 2: Uraian Singkat</b><br>
          Tuliskan apa manfaat utama melakukan pendinginan setelah selesai melakukan olahraga ${topicName}!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p>1. Manakah gerakan di bawah ini yang termasuk kategori gerak non-lokomotor?<br>A. Berlari cepat<br>B. Menekuk siku tangan di tempat<br>C. Melompat rintangan</p>
          <p>2. Sikap yang mencerminkan sportivitas saat bermain olahraga ${topicName} di sekolah adalah...<br>A. Marah ketika kalah bermain<br>B. Bersalaman dengan lawan setelah selesai bermain<br>C. Bermain curang agar menang</p>
          <p>3. Jelaskan mengapa kita harus mencuci tangan dan kaki menggunakan sabun setelah berolahraga ${topicName}!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Menekuk siku)</b> - Skor: 30<br>
          2. <b>B (Bersalaman dengan lawan)</b> - Skor: 30<br>
          3. <b>Untuk menghilangkan kotoran, kuman, dan keringat yang menempel di badan agar terhindar dari gatal kulit dan penyakit.</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN KINERJA GERAK</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Koordinasi Gerak</b></td>
                <td>Melakukan teknik gerak dengan posisi kaki, tangan, dan keseimbangan sempurna</td>
                <td>Melakukan gerak dengan seimbang tapi posisi tangan kurang tepat</td>
                <td>Gerakan tidak seimbang dan tidak sesuai arahan</td>
              </tr>
              <tr>
                <td><b>Sportivitas</b></td>
                <td>Menunjukkan sikap menghargai teman, taat aturan, dan menerima hasil skor</td>
                <td>Mampu bermain tertib tapi kadang mengeluh</td>
                <td>Bermain kasar atau tidak patuh aturan olahraga</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "senirupa":
      details.tp = `Mengidentifikasi, mengeksplorasi, dan menciptakan karya seni rupa visual bertema <b>${topicName}</b> menggunakan berbagai bahan secara kreatif dan ekspresif.`;
      details.meaningful = `Seni mengasah sensitivitas keindahan kita terhadap alam sekitar, melatih motorik halus, serta memberi kebebasan mengekspresikan emosi secara visual.`;
      details.pemantik = `
        <ol>
          <li>Bagaimana warna primer dicampur dapat menghasilkan warna baru dalam karya seni rupa <b>${topicName}</b>?</li>
          <li>Bentuk rupa apa saja yang paling sering kamu temui di halaman sekolah yang menginspirasi <b>${topicName}</b>?</li>
          <li>Bagaimana kita bisa menggunakan bahan bekas untuk membuat benda seni rupa yang indah bertema <b>${topicName}</b>?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (Seni Hening)</b>:<br>
        Siswa menutup mata 1 menit, mendengarkan suara sekitar, lalu membayangkan coretan visual kreatif berdasarkan suara tersebut sebelum membuat karya seni.
      `;
      details.meaningfulAct = `
        Siswa memanfaatkan bahan alam di sekitar sekolah seperti daun kering atau kerikil untuk kolase seni rupa bertema keindahan alam terkait <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Aktivitas Gambar Estafet:</b><br>
        Menggambar kolaboratif di mana setiap anak menyumbang satu garis secara bergantian hingga membentuk gambar utuh yang unik bertema <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa kelas dengan menunjukkan contoh karya seni rupa <b>${topicName}</b> yang penuh warna di depan kelas.<br>
        2. Mengajak anak-anak berdiri melakukan tepuk seni gembira.<br>
        3. Guru mengenalkan konsep dasar unsur garis dan bentuk yang akan digunakan untuk membuat karya hari ini.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Anak-anak mengamati unsur garis, bentuk, dan tekstur pada contoh karya seni rupa <b>${topicName}</b> yang disajikan.<br>
        2. <b>Menalar & Mendesain</b>: Anak-anak berdiskusi dengan guru mengenai teknik mencampur warna atau menempel bahan alam untuk tema <b>${topicName}</b>.<br>
        3. <b>Mencipta Karya (Joyful)</b>: Anak-anak secara mandiri menuangkan imajinasi kreatif mereka untuk menggambar atau membuat karya rupa <b>${topicName}</b>.<br>
        4. <b>Pameran Galeri Kelas</b>: Anak-anak memajang hasil karya mereka di atas meja kelas, lalu berkeliling mengagumi karya teman-teman sekelasnya secara sopan.<br>
        5. Guru memberikan bintang penghargaan, pelukan hangat, dan masukan positif atas kerapian karya siswa.
      `;
      details.langkahPenutup = `
        1. Guru bersama anak-anak menyimpulkan teknik pembuatan karya seni rupa <b>${topicName}</b>.<br>
        2. Refleksi perasaan: 'Siapa yang merasa bangga dengan hasil karya seninya hari ini?'.<br>
        3. Membagikan soal Asesmen Mandiri.<br>
        4. Mengajak anak-anak merapikan meja belajar dan mencuci tangan bersama.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur emosi kreatif awal siswa sebelum berkarya.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi tanggung jawab merapikan kembali alat gambar dan orisinalitas ide karya.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Evaluasi hasil karya produk seni rupa bertema <b>${topicName}</b> menggunakan rubrik penilaian estetika.
      `;
      details.bahanAjarText = `
        <h3>Ayo Berekspresi dan Berkarya Seni!</h3>
        <p>Dunia seni rupa adalah ruang kebebasan bagi imajinasi dan kreativitasmu yang tanpa batas. Hari ini kita mempelajari dan mempraktikkan karya seni tentang <b>${topicName}</b>. Melalui coretan garis, permainan warna, dan susunan bentuk, kamu bisa menuangkan keindahan di sekitarmu.</p>
        
        <p><b>Mengenal Unsur Seni Rupa:</b></p>
        <p>Karya seni rupa yang indah tersusun dari unsur-unsur dasar berikut:</p>
        <ul>
          <li><b>Garis (Line):</b> Coretan panjang yang bisa berbentuk lurus, lengkung, patah-patah, spiral, atau zig-zag untuk membentuk objek.</li>
          <li><b>Warna (Color):</b> Terdiri dari warna primer (merah, kuning, biru) yang jika dicampur akan menghasilkan warna sekunder (hijau, ungu, jingga).</li>
          <li><b>Bentuk (Shape):</b> Bidang datar dua dimensi (geometris seperti kotak dan lingkaran, atau organik/bebas) serta bangun tiga dimensi (memiliki volume).</li>
          <li><b>Tekstur (Texture):</b> Sifat permukaan benda yang bisa diraba atau dirasakan, seperti kasar, halus, licin, tajam, atau bergelombang.</li>
        </ul>
        
        <p><b>Tips Membuat Karya Seni yang Menarik:</b></p>
        <p>Gunakan prinsip keseimbangan dan kesatuan. Jangan takut untuk bereksperimen mencampur warna baru atau menggunakan bahan daur ulang (seperti koran bekas, kardus, atau daun kering) untuk memperkaya tekstur karyamu. Apresiasilah karya temanmu dengan cara menghormati keunikan goresan mereka karena seni bersifat subjektif.</p>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fakta Menarik Seni Rupa:</b> Seni kolase pertama kali dikembangkan oleh seniman terkenal dunia, Pablo Picasso! Kita bisa membuat karya kolase yang indah hanya dengan memanfaatkan dedaunan kering, kelopak bunga layu, dan ranting yang bertebaran di halaman sekolah kita.
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Sketsa Seni Rupa Ceria</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Siswa terampil mencampur warna primer dan menggambar bentuk kreatif sesuai tema ${topicName}.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Siapkan pensil, krayon, atau cat air milikmu.<br>
          2. Diskusikan dengan teman kelompokmu kombinasi warna apa yang paling cocok untuk gambar ${topicName}.<br>
          3. Buatlah sketsa halus terlebih dahulu menggunakan pensil.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Manakah di bawah ini yang merupakan contoh warna primer (dasar)?<br>A. Hijau<br>B. Merah<br>C. Ungu</p>
          <p>2. Jika kita mencampurkan warna kuning dengan warna biru, maka akan menghasilkan warna...<br>A. Jingga<br>B. Hijau<br>C. Cokelat</p>
          
          <p><b>D. Tantangan 2: Praktik Warna</b><br>
          Warnailah kotak kosong di bawah ini dengan campuran warna merah dan kuning secara merata menggunakan krayon!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p>1. Contoh unsur seni rupa yang berbentuk coretan panjang dari satu titik ke titik lain disebut...<br>A. Bidang<br>B. Garis<br>C. Tekstur</p>
          <p>2. Bahan alam manakah yang dapat kita gunakan untuk membuat karya seni kolase ${topicName}?<br>A. Daun kering dan ranting<br>B. Botol plastik bekas<br>C. Kaleng seng</p>
          <p>3. Tuliskan 3 macam ekspresi wajah yang biasa kita gambar saat belajar seni rupa!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Garis)</b> - Skor: 30<br>
          2. <b>A (Daun kering dan ranting)</b> - Skor: 30<br>
          3. <b>Ekspresi Senang (Tersenyum), Sedih (Menangis/Cemberut), dan Marah (Alis melengkung)</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN KARYA PRODUK</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Kreativitas Warna</b></td>
                <td>Menggunakan kombinasi pencampuran warna yang harmonis dan orisinal</td>
                <td>Pilihan warna menarik tetapi kurang bervariasi</td>
                <td>Pewarnaan acak dan tidak selesai</td>
              </tr>
              <tr>
                <td><b>Kerapian Karya</b></td>
                <td>Karya bersih, lem menempel kuat, dan tidak ada coretan di luar sketsa</td>
                <td>Karya menempel cukup kuat tapi ada sedikit noda lem</td>
                <td>Karya kotor dan tidak tertata rapi</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "pai":
      details.tp = `Memahami, menghayati, dan mempraktikkan kisah keteladanan rasul, nilai akhlak mulia, serta tata cara peribadatan tentang <b>${topicName}</b> secara tertib.`;
      details.meaningful = `Mengamalkan ajaran agama membiasakan diri kita untuk selalu bersikap jujur, amanah, pemaaf, dan tolong-menolong kepada sesama makhluk hidup.`;
      details.pemantik = `
        <ol>
          <li>Mengapa Allah SWT sangat menyukai hambanya yang bersikap jujur dan pemaaf dalam materi <b>${topicName}</b>?</li>
          <li>Bagaimana rasa hatimu setelah selesai berdoa atau berwudu dengan tenang terkait materi <b>${topicName}</b>?</li>
          <li>Apa contoh perbuatan baik yang paling mudah kamu lakukan kepada teman kelas hari ini?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (Zikir Hening)</b>:<br>
        Siswa duduk tenang, memejamkan mata, memusatkan fokus kalbu untuk merenungi nikmat tuhan secara khusyuk dan relaks.
      `;
      details.meaningfulAct = `
        Siswa menceritakan tindakan nyata membantu teman kelas atau memaafkan kesalahan kecil orang lain di sekolah terkait <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Game Estafet Kisah Teladan:</b><br>
        Siswa menyampaikan pesan keteladanan moral/kisah rasul secara berantai dalam kelompok dengan suasana riang bertema <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa kelas dengan salam Islami hangat, berdoa, dan membaca surat pendek Al-Qur'an bersama anak-anak.<br>
        2. Melakukan meditasi tenang 'Zikir Hening' untuk memfokuskan emosi anak-anak.<br>
        3. Guru menyampaikan apersepsi berupa dongeng akhlak terpuji yang relevan dengan <b>${topicName}</b>.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Anak-anak menyimak kisah keteladanan nabi atau pelafalan huruf hijaiyah/ayat terkait <b>${topicName}</b> secara tertib.<br>
        2. <b>Menalar & Diskusi</b>: Anak-anak berdiskusi kelompok mengenai nilai moral terpuji apa yang bisa diteladani dari bahasan <b>${topicName}</b>.<br>
        3. <b>Simulasi Praktik (Joyful)</b>: Anak-anak mempraktikkan langsung gerakan wudu/salat, cara berdoa, atau bermain peran (roleplay) bersikap santun secara gotong royong.<br>
        4. <b>Mempresentasikan</b>: Anak-anak memperagakan bacaan atau sikap Islami hasil kerja kelompoknya di depan kelas dengan santun.<br>
        5. Guru memberikan pelukan rohani, pujian akhlak mulia, serta mengarahkan cara beribadah yang benar secara ramah.
      `;
      details.langkahPenutup = `
        1. Guru membimbing anak-anak merumuskan kesimpulan moral pelajaran hari ini tentang <b>${topicName}</b>.<br>
        2. Guru memotivasi anak-anak dengan menantang mereka melakukan 1 tindakan kebaikan di rumah hari ini.<br>
        3. Membagikan lembar kerja Asesmen Mandiri.<br>
        4. Kelas ditutup dengan doa kafaratul majlis bersama-sama.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur tingkat ketenangan rohani anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi kedisiplinan dan kesantunan anak selama melakukan gerakan simulasi ibadah.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji tertulis pemahaman akhlak mulia atau tata cara ibadah terkait <b>${topicName}</b> (soal terlampir pada modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Menjadi Anak Sholih yang Berakhlak Mulia!</h3>
        <p>Mempelajari ajaran agama adalah tuntunan utama hidup kita agar selamat di dunia dan akhirat. Hari ini materi pembelajaran kita adalah tentang <b>${topicName}</b>. Setiap ajaran Islam bertujuan mendidik hati kita agar selalu dekat kepada Allah SWT dan berbuat baik kepada sesama manusia.</p>
        
        <p><b>Memahami Nilai Karakter Islami (Akhlakul Karimah):</b></p>
        <p>Melalui bahasan <b>${topicName}</b>, kita diajarkan untuk meneladani akhlak mulia para nabi dan rasul. Sikap jujur (shiddiq), dapat dipercaya (amanah), santun, toleran, suka memaafkan, dan gemar menolong adalah cerminan dari keimanan yang kokoh di dalam dada seorang mukmin.</p>
        
        <p><b>Penerapan Praktis dalam Keseharian:</b></p>
        <ol>
          <li><b>Adab Menuntut Ilmu:</b> Biasakan selalu berdoa sebelum memulai belajar agar ilmu yang didapat menjadi berkah, serta mintalah izin dengan sopan saat ingin berbicara.</li>
          <li><b>Adab Hubungan Sosial:</b> Berbicaralah dengan lemah lembut dan sopan kepada orang tua dan guru, serta sayangi teman-temanmu tanpa membeda-bedakan latar belakang mereka.</li>
          <li><b>Adab Ibadah:</b> Lakukan ibadah bersuci (wudu) dan salat fardu dengan gerakan yang tertib serta penuh khusyuk demi melatih ketenangan batiniah dan disiplin waktu.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Pesan Kebaikan Sabda Rasul:</b> Rasulullah SAW bersabda bahwa orang mukmin yang paling sempurna imannya adalah yang paling baik akhlaknya. Dari sini, mari kita berkomitmen untuk melakukan minimal satu kebaikan nyata bagi orang-orang di sekitar kita hari ini!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Cerdas Berakhlak Terpuji</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Memahami nilai keteladanan moral dan tata cara ibadah ${topicName} dalam kehidupan sehari-hari.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Jawablah soal-soal di bawah ini dengan berdiskusi bersama teman sebangkumu.<br>
          2. Warnailah kolom pilihan ganda yang menurutmu merupakan jawaban paling benar.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Meneladani sifat pemaaf Allah SWT dapat kita wujudkan dengan cara...<br>A. Membalas kesalahan teman dengan amarah<br>B. Memaafkan kesalahan teman dengan tulus<br>C. Menjauhi teman yang meminta maaf</p>
          <p>2. Sebelum mendirikan ibadah salat, kita diwajibkan untuk bersuci menggunakan air bersih yang dinamakan...<br>A. Wudu<br>B. Mandi<br>C. Istinja</p>
          
          <p><b>D. Tantangan 2: Uraian Singkat</b><br>
          Tuliskan 3 adab mulia yang harus kamu lakukan sebelum makan bersama keluarga!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p>1. Asmaul Husna Al-Kholiq artinya Allah Maha...<br>A. Pemurah<br>B. Penyayang<br>C. Pencipta</p>
          <p>2. Gerakan salat yang dilakukan dengan cara membungkukkan badan dan meletakkan kedua telapak tangan di lutut dinamakan...<br>A. Sujud<br>B. Rukuk<br>C. Takbiratul Ihram</p>
          <p>3. Mengapa kita wajib berbicara santun dan lemah lembut kepada orang tua kita di rumah? Berikan 1 contoh kalimatnya!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>C (Maha Pencipta)</b> - Skor: 30<br>
          2. <b>B (Rukuk)</b> - Skor: 30<br>
          3. <b>Karena orang tua adalah yang merawat kita dengan penuh kasih sayang, dan berbakti kepada mereka adalah perintah Allah. Contoh: 'Ibu, kula nyuwun izin medal sekolah.'</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN AKHLAK & IBADAH</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Sikap Kesantunan</b></td>
                <td>Konsisten berbicara santun dan menunjukkan adab Islami di kelas</td>
                <td>Berbicara santun namun kadang kurang tertib di dalam kelas</td>
                <td>Sering berteriak atau berkata kurang sopan di kelas</td>
              </tr>
              <tr>
                <td><b>Gerakan Ibadah</b></td>
                <td>Melakukan seluruh gerakan ibadah (wudu/salat) secara runtut dan tertib</td>
                <td>Gerakan ibadah runtut tetapi kurang tertib posisi badannya</td>
                <td>Belum hafal urutan gerakan ibadah</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "pancasila":
      details.tp = `Mengidentifikasi, memahami, dan mempraktikkan penerapan nilai-nilai Pancasila serta mematuhi norma sosial terkait <b>${topicName}</b> di sekolah dan masyarakat secara demokratis.`;
      details.meaningful = `Pendidikan Pancasila melatih kita menjadi warga negara yang bertanggung jawab, toleran terhadap perbedaan, serta cinta tanah air.`;
      details.pemantik = `
        <ol>
          <li>Mengapa kelas kita perlu melakukan musyawarah dalam konsep <b>${topicName}</b>?</li>
          <li>Apa contoh nyata keberagaman fisik atau suku teman yang kamu temui dalam bahasan <b>${topicName}</b>?</li>
          <li>Bagaimana cara menjaga kerukunan di kelas yang memiliki banyak perbedaan terkait <b>${topicName}</b>?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (Cinta Tanah Air)</b>:<br>
        Siswa duduk tegak, meletakkan tangan di dada kiri, merasakan detak jantung, dan menyadari persaudaraan sebangsa se-tanah air secara hikmat.
      `;
      details.meaningfulAct = `
        Siswa mendiskusikan pembagian regu piket kelas yang adil dan disepakati bersama secara demokratis terkait <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Aktivitas Koin Musyawarah:</b><br>
        Siswa mensimulasikan diskusi penyelesaian konflik kelas dengan menyalurkan koin hak bicara secara teratur terkait <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa kelas, memimpin doa, lalu mengajak anak-anak berdiri tegak menyanyikan lagu Garuda Pancasila dengan semangat nasionalisme.<br>
        2. Melakukan Teknik STOP kebangsaan untuk menenangkan pikiran.<br>
        3. Guru menyampaikan apersepsi dengan bercerita tentang keindahan gotong royong dan kaitannya dengan <b>${topicName}</b>.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Anak-anak mengamati gambar simbol Pancasila atau slide norma kehidupan bertema <b>${topicName}</b> secara antusias.<br>
        2. <b>Menalar & Diskusi</b>: Guru memandu anak-anak berdiskusi secara interaktif mengenai hak, kewajiban, dan norma terkait <b>${topicName}</b>.<br>
        3. <b>Mensimulasikan (Joyful)</b>: Anak-anak secara berkelompok bermain peran (roleplay) mensimulasikan penerapan nilai musyawarah Pancasila secara rukun.<br>
        4. <b>Mempresentasikan</b>: Setiap perwakilan kelompok mempresentasikan hasil kesepakatan kelompoknya di depan kelas dengan suara lantang.<br>
        5. Guru memberikan pelukan kebangsaan, pujian atas toleransi antar kelompok, dan memperkuat nilai persatuan.
      `;
      details.langkahPenutup = `
        1. Guru bersama anak-anak menarik kesimpulan mengenai pentingnya mengamalkan Pancasila dalam bahasan <b>${topicName}</b>.<br>
        2. Refleksi diri: 'Siapa yang hari ini merasa bangga menjadi anak Indonesia yang rukun?'.<br>
        3. Membagikan lembar Asesmen Mandiri.<br>
        4. Kelas diakhiri dengan doa penutup.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur rasa cinta tanah air awal pada anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi toleransi berpendapat siswa selama musyawarah kelompok berlangsung.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Soal tertulis mandiri menguji pemahaman hak, kewajiban, dan norma Pancasila terkait <b>${topicName}</b> (soal terlampir di modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Menjadi Warga Negara Pancasila yang Hebat!</h3>
        <p>Pancasila adalah dasar negara, pandangan hidup, dan jiwa bangsa Indonesia. Hari ini kita mempelajari materi penting mengenai <b>${topicName}</b>. Memahami nilai-nilai kebangsaan melatih kita menjadi warga negara yang cerdas, bertanggung jawab, dan cinta tanah air.</p>
        
        <p><b>Mengapa Nilai Pancasila Harus Diamalkan?</b></p>
        <p>Indonesia adalah negara kepulauan yang sangat luas dengan keragaman suku, bahasa, adat istiadat, dan agama. Tanpa nilai persatuan yang tertuang dalam Pancasila, bangsa kita bisa mudah terpecah belah. Oleh karena itu, kita harus mengamalkan semboyan **Bhinneka Tunggal Ika** (Berbeda-beda tetapi tetap satu) dalam keseharian kita.</p>
        
        <p><b>Pilar Nilai Kebangsaan yang Kita Pelajari:</b></p>
        <ul>
          <li><b>Gotong Royong:</b> Sikap bekerja bersama-sama demi kepentingan umum tanpa mengharapkan pamrih pribadi. Gotong royong meringankan pekerjaan berat dan mempererat kebersamaan warga kelas maupun masyarakat.</li>
          <li><b>Musyawarah Mufakat:</b> Berdiskusi secara damai, tertib, dan demokratis untuk mengambil keputusan bersama. Kita harus menghargai pendapat orang lain meskipun berbeda dengan pendapat kita sendiri.</li>
          <li><b>Norma & Tata Tertib:</b> Aturan tertulis maupun tidak tertulis yang disepakati bersama untuk dipatuhi demi menciptakan keamanan, ketertiban, dan keadilan sosial dalam kehidupan bermasyarakat.</li>
        </ul>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fakta Menarik Garuda Pancasila:</b> Tahukah kamu lambang negara kita mencerminkan kekuatan dan kemerdekaan? Jumlah bulu pada sayap berjumlah 17, ekor 8, pangkal ekor 19, dan leher 45, yang melambangkan hari Proklamasi Kemerdekaan Indonesia tanggal 17 Agustus 1945!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Cerdas Ber-Pancasila</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Pembelajaran:</b><br>
          Memahami hak, kewajiban, dan penerapan Pancasila dalam materi ${topicName}.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Amati gambar simbol sila Pancasila yang dipasang di dinding kelas.<br>
          2. Diskusikan dengan teman kelompokmu mengenai tugas gotong royong yang ada di lembar kerja ini.<br>
          3. Selesaikan tantangan ini secara rukun.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Simbol sila ke-3 Pancasila (Persatuan Indonesia) adalah...<br>A. Rantai Mas<br>B. Pohon Beringin<br>C. Kepala Banteng</p>
          <p>2. Sesuatu yang wajib kita kerjakan dengan penuh rasa tanggung jawab disebut...<br>A. Hak<br>B. Kewajiban<br>C. Aturan</p>
          
          <p><b>D. Tantangan 2: Uraian Singkat</b><br>
          Tuliskan 2 contoh kewajiban penting yang harus kamu patuhi saat sedang belajar di dalam kelas!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p>1. Contoh sikap pengamalan sila ke-2 Pancasila di lingkungan sekolah adalah...<br>A. Memilih-milih teman bermain<br>B. Menolong teman yang terjatuh di lapangan<br>C. Membuang sampah di laci meja</p>
          <p>2. Menjaga ketertiban kelas saat guru sedang menjelaskan materi pelajaran termasuk... siswa.<br>A. Hak<br>B. Kewajiban<br>C. Hadiah</p>
          <p>3. Sebutkan bunyi sila ke-4 Pancasila dan berikan 1 contoh penerapannya di lingkungan kelasmu!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Menolong teman yang terjatuh)</b> - Skor: 30<br>
          2. <b>B (Kewajiban)</b> - Skor: 30<br>
          3. <b>Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan. Contoh penerapan: Melakukan musyawarah untuk menentukan ketua kelas.</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN NASIONALISME & KARAKTER</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Sikap Toleransi</b></td>
                <td>Menghargai pendapat teman dan tidak memaksakan kehendak saat diskusi</td>
                <td>Mampu berdiskusi tetapi masih sering memotong pembicaraan teman</td>
                <td>Egois dan tidak menghargai pendapat orang lain</td>
              </tr>
              <tr>
                <td><b>Pemahaman Kewajiban</b></td>
                <td>Menjelaskan hak, kewajiban, dan norma kelas dengan analisis kritis</td>
                <td>Memahami perbedaan hak dan kewajiban secara sederhana</td>
                <td>Belum memahami kewajibannya sebagai siswa</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "english":
      details.tp = `Students are able to understand, speak, read, and write basic English words/dialogues about <b>${topicName}</b> confidently and cooperatively.`;
      details.meaningful = `Learning English enables us to communicate globally and make friends from different countries in our future.`;
      details.pemantik = `
        <ol>
          <li>How do you greet your teacher and friends in English when learning about <b>${topicName}</b>?</li>
          <li>What English words do you know that relate to the topic of <b>${topicName}</b>?</li>
          <li>Why is it fun to practice speaking English words about <b>${topicName}</b> with your classmates?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (English Mindful Listening)</b>:<br>
        Students close their eyes, take deep breaths, and focus on listening to simple English words about <b>${topicName}</b> whispered quietly.
      `;
      details.meaningfulAct = `
        Students practice simple daily conversations like introducing names, colors, or school objects in English related to <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>English Action Songs:</b><br>
        Students sing English kids action songs (e.g. "If You're Happy and You Know It") accompanied by creative body movements and vocabulary of <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. The teacher greets the students warmly in English: 'Good morning, class! How are you today?'.<br>
        2. Inviting students to stand up and sing a simple English action song to warm up the classroom atmosphere.<br>
        3. The teacher shows flashcards related to <b>${topicName}</b> to spark student curiosity.
      `;
      details.langkahInti = `
        1. <b>Listening & Repeating (Meaningful)</b>: Students listen to the teacher pronounce vocabulary related to <b>${topicName}</b> and repeat it together confidently.<br>
        2. <b>Analyzing & Practicing</b>: Students analyze word spellings and practice short dialogue phrases about <b>${topicName}</b> in pairs.<br>
        3. <b>Collaborating (Joyful)</b>: In small groups, students play a matching game using flashcards and pictures of <b>${topicName}</b> cooperatively.<br>
        4. <b>Speaking Up</b>: Representative groups role-play simple dialogues in front of the class using confident pronunciation.<br>
        5. The teacher gives 'Super!' awards, thumbs up, and gently guides students on correct pronunciation.
      `;
      details.langkahPenutup = `
        1. The teacher and students summarize the English vocabulary learned today about <b>${topicName}</b>.<br>
        2. Reflexion: 'Who is feeling happy to speak English today?'.<br>
        3. The teacher distributes the independent Assessment worksheet.<br>
        4. Closing with prayer.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> English anxiety check to measure student confidence.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observation of student pronunciation clarity and active participation in flashcard games.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji pemahaman kosakata tertulis mandiri terkait <b>${topicName}</b> (soal terlampir pada modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Let's Learn English Happily!</h3>
        <p>English is a global language that helps us communicate with people all around the world. Today, we are studying about <b>${topicName}</b>. Learning a new language is like opening a door to a new world of friendship and knowledge!</p>
        
        <p><b>Why is this topic useful for you?</b></p>
        <p>By understanding vocabulary and expressions about <b>${topicName}</b>, you can introduce yourself, describe objects, talk about animals, express your feelings, or tell what you like to do. It builds your global communication skills and boosts your self-confidence from an early age.</p>
        
        <p><b>Core Concepts We Learn Today:</b></p>
        <ul>
          <li><b>Pronunciation:</b> Saying English words with correct sounds and intonation.</li>
          <li><b>Simple Greetings:</b> Using daily phrases like "Good morning", "How are you?", and "Thank you".</li>
          <li><b>Word Association:</b> Matching English words with actual pictures or objects in the classroom.</li>
        </ul>

        <p><b>Tips to Speak English Confidently:</b></p>
        <ol>
          <li><b>Listen and Repeat:</b> Pay close attention to how the teacher pronounces words and try to copy the sounds exactly.</li>
          <li><b>Do Not Be Afraid of Making Mistakes:</b> Making mistakes is a natural part of learning any new language. Keep trying!</li>
          <li><b>Practice Daily:</b> Try using simple English phrases with your friends, such as greeting them during school breaks.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fun Fact:</b> Did you know that English is spoken by over 1.5 billion people worldwide? Practicing even just three simple words every day will make you an excellent English speaker in the future!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: English is Fun!</h3>
          <p class="text-center" style="color:var(--primary);">Topic: ${topicName}</p>
          
          <p><b>A. Learning Objective:</b><br>
          Students are able to identify and write simple English words related to ${topicName} correctly.</p>
          
          <p><b>B. Activity Steps:</b><br>
          1. Open your workbook and prepare your pencil.<br>
          2. Discuss the dialogue below with your chairmate.<br>
          3. Write your answer clearly.</p>
          
          <p><b>C. Challenge 1: Multiple Choice</b><br>
          1. Complete the dialogue:<br>A: Good morning! How are you?<br>B: Good morning! I am .........., thank you.<br>A. Blue<br>B. Fine<br>C. Morning</p>
          <p>2. What is the English word for "Buku"?<br>A. Pencil<br>B. Ruler<br>C. Book</p>
          
          <p><b>D. Challenge 2: Matching Words</b><br>
          Draw a line to match the English word with its correct Indonesian meaning:<br>
          <b>Book</b> -> (ðŸ“– Buku / âœï¸ Pensil)<br>
          <b>Apple</b> -> (ðŸŽ Apel / ðŸŒ Pisang)</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">INDEPENDENT ASSESSMENT SHEET & SCORING RUBRIC</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Topic: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. INDEPENDENT WRITTEN TEST (FOR STUDENTS)</h4>
          <p><b>Please answer these simple English questions honestly and independently!</b></p>
          <p>1. What is the English word for the number "Sepuluh"?<br>A. Nine<br>B. Ten<br>C. Eight</p>
          <p>2. If you want to say goodbye to your friend, you say...<br>A. Good morning<br>B. Goodbye<br>C. Thank you</p>
          <p>3. Write down a simple English sentence to introduce your name to a new classmate!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. ANSWER KEY & SCORING SYSTEM</h4>
          <p>1. <b>B (Ten)</b> - Score: 30<br>
          2. <b>B (Goodbye)</b> - Score: 30<br>
          3. <b>"Hello, my name is [Student Name]." or "Hi, I am [Student Name]."</b> - Score: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Final Score Calculation:</b> Score = (Earned Score / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. SPEAKING & WRITING RUBRIC</h4>
          <table>
            <thead>
              <tr>
                <th>Assessment Aspect</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Pronunciation</b></td>
                <td>Pronounces vocabulary clearly with correct accent</td>
                <td>Pronounces vocabulary with minor mistakes</td>
                <td>Refuses to speak or incorrect pronunciation</td>
              </tr>
              <tr>
                <td><b>Confidence</b></td>
                <td>Speaks English confidently in front of the class</td>
                <td>Speaks English but looks shy or hesitant</td>
                <td>Needs constant encouragement to speak</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "ipas":
      details.tp = `Mengamati, menganalisis, dan mendeskripsikan fenomena alamiah/sosial terkait <b>${topicName}</b> secara ilmiah dan peduli lingkungan.`;
      details.meaningful = `Memahami IPAS membantu kita melestarikan ekosistem, mensyukuri nikmat organ tubuh, serta menghargai kebudayaan daerah kita.`;
      details.pemantik = `
        <ol>
          <li>Bagaimana tumbuhan dan hewan saling melengkapi dalam rantai makanan dalam bahasan <b>${topicName}</b>?</li>
          <li>Mengapa benda padat bisa berubah wujud menjadi cair atau gas dalam suhu tertentu terkait <b>${topicName}</b>?</li>
          <li>Apa yang akan terjadi jika salah satu organ tubuh kita tidak berfungsi dengan baik dalam materi <b>${topicName}</b>?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (Koneksi Semesta)</b>:<br>
        Siswa memejamkan mata, bernapas teratur, mendengarkan keheningan alam, dan menyadari keberadaan dirinya di bumi secara damai.
      `;
      details.meaningfulAct = `
        Siswa mengamati struktur daun tanaman di halaman sekolah secara langsung atau memegang denyut nadi sendiri terkait <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Game Aliran Energi Ekosistem:</b><br>
        Siswa memegang papan nama peran ekosistem (rumput, kelinci, elang) dan memperagakan aliran makanan menggunakan tali bertema <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa anak-anak dengan ceria, lalu memperlihatkan alat peraga eksperimen sederhana (seperti gelas berisi air dan es batu, atau daun segar) untuk materi <b>${topicName}</b>.<br>
        2. Melakukan Teknik STOP Koneksi Semesta untuk menenangkan suasana kelas.<br>
        3. Apersepsi: Tanya jawab tentang fenomena alam sehari-hari yang berkaitan dengan <b>${topicName}</b>.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Anak-anak mengamati gambar/video simulasi ilmiah atau memegang langsung objek pengamatan materi <b>${topicName}</b>.<br>
        2. <b>Menalar & Merancang Eksperimen</b>: Guru memandu anak-anak merumuskan dugaan sementara (hipotesis) mengenai apa yang akan terjadi dalam eksperimen <b>${topicName}</b>.<br>
        3. <b>Bereksperimen & Kolaborasi (Joyful)</b>: Anak-anak secara berkelompok melakukan percobaan sains sederhana terkait <b>${topicName}</b> secara aktif dan gotong royong.<br>
        4. <b>Mempresentasikan Data</b>: Setiap kelompok memaparkan data hasil pengamatannya di depan kelas dengan percaya diri menggunakan papan diagram kelompok.<br>
        5. Guru memberikan bintang sains, tepuk apresiasi penemu, serta meluruskan konsep ilmiah secara lembut.
      `;
      details.langkahPenutup = `
        1. Guru bersama anak-anak menyimpulkan fakta ilmiah dari percobaan materi <b>${topicName}</b>.<br>
        2. Refleksi cinta lingkungan: 'Bagaimana cara kita bersyukur atas anugerah alam ini?'.<br>
        3. Membagikan lembar Asesmen Mandiri sains.<br>
        4. Berdoa bersama dan merapikan alat laboratorium kelas.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Mengukur ketertarikan anak terhadap ilmu sains.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi keterampilan proses ilmiah, pencatatan data eksperimen secara jujur.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji pemahaman konsep ilmiah tertulis mandiri terkait <b>${topicName}</b> (soal terlampir pada modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Menjelajahi Alam dan Masyarakat Kita!</h3>
        <p>Ilmu Pengetahuan Alam dan Sosial (IPAS) membantu kita memahami bagaimana alam bekerja dan bagaimana manusia hidup bermasyarakat. Hari ini kita mempelajari materi ilmiah tentang <b>${topicName}</b>. Melalui sains, kita bisa memecahkan berbagai teka-teki alam yang menakjubkan.</p>
        
        <p><b>Pokok Bahasan dan Pentingnya Materi IPAS:</b></p>
        <p>Materi <b>${topicName}</b> mengajak kita melakukan pengamatan kritis (observasi) dan penyelidikan sederhana. Memahami IPAS membantu kita melestarikan ekosistem di sekitar kita, mensyukuri kehebatan fungsi organ tubuh manusia, serta menghargai kebudayaan dan perjuangan pahlawan daerah kita dalam membangun peradaban sosial.</p>
        
        <p><b>Langkah Penyelidikan Ilmiah (Sains):</b></p>
        <ol>
          <li><b>Mengamati (Observasi):</b> Menggunakan indra penglihat, pendengar, peraba, or alat ukur untuk mengumpulkan fakta kejadian secara riil.</li>
          <li><b>Membuat Prediksi (Hipotesis):</b> Menduga jawaban ilmiah sementara atas peristiwa yang sedang diamati sebelum dibuktikan lewat percobaan.</li>
          <li><b>Bereksperimen:</b> Melakukan percobaan kelompok secara terkontrol dan mencatat data hasil pengamatan secara jujur.</li>
          <li><b>Menarik Kesimpulan:</b> Menyusun kesimpulan logis berdasarkan data riil hasil eksperimen kelompok untuk menjawab pertanyaan ilmiah.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fakta Menarik Semesta:</b> Tumbuhan hijau adalah produsen utama oksigen di bumi melalui proses fotosintesis! Tanpa adanya hutan dan tumbuhan hijau yang menyerap karbon dioksida dan melepaskan oksigen, makhluk hidup lain di bumi tidak akan memiliki udara untuk bernapas.
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Penyelidik IPAS Cilik</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Mengidentifikasi fenomena perubahan zat atau rantai makanan terkait ${topicName} melalui observasi nyata.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Bekerjalah bersama kelompokmu secara tertib dan aman.<br>
          2. Lakukan eksperimen sederhana sesuai arahan guru.<br>
          3. Catat hasil pengamatan secara jujur pada tabel laporan kelompok.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Proses perubahan wujud benda dari cair menjadi gas dalam konsep ${topicName} dinamakan...<br>A. Membeku<br>B. Menguap<br>C. Menyublim</p>
          <p>2. Organ tubuh manakah yang berfungsi untuk memompa darah ke seluruh tubuh?<br>A. Paru-paru<br>B. Jantung<br>C. Lambung</p>
          
          <p><b>D. Tantangan 2: Uraian Pengamatan</b><br>
          Jelaskan apa yang terjadi jika air yang dipanaskan terus-menerus menguap dalam eksperimen ${topicName}!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p>1. Di dalam ekosistem, hewan pemakan tumbuhan (herbivora) bertindak sebagai...<br>A. Produsen<br>B. Konsumen Tingkat I<br>C. Pengurai</p>
          <p>2. Gaya tarik-menarik yang terjadi pada magnet ketika ujung kutub yang berbeda didekatkan adalah...<br>A. Saling menolak<br>B. Saling menarik<br>C. Diam saja</p>
          <p>3. Jelaskan fungsi utama akar pada tumbuhan yang kamu ketahui dalam kaitannya dengan pelestarian alam!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Konsumen Tingkat I)</b> - Skor: 30<br>
          2. <b>B (Saling menarik)</b> - Skor: 30<br>
          3. <b>Menyerap air dan zat hara dari dalam tanah serta memperkokoh berdirinya tumbuhan agar tanah tidak mudah longsor.</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN PROSES SAINS</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Penyelidikan Ilmiah</b></td>
                <td>Merumuskan hipotesis dan kesimpulan logis berdasarkan data pengamatan riil</td>
                <td>Mampu menyimpulkan tetapi datanya kurang lengkap</td>
                <td>Kesimpulan salah dan tidak mencatat data</td>
              </tr>
              <tr>
                <td><b>Kepedulian Lingkungan</b></td>
                <td>Menjaga kebersihan meja kerja dan membuang sisa eksperimen dengan tertib</td>
                <td>Membersihkan meja setelah diarahkan oleh guru</td>
                <td>Meninggalkan meja kerja dalam kondisi kotor berantakan</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case "jawa":
      details.tp = `Mengidentifikasi, memahami, dan mempraktikkan keterampilan berbahasa Jawa lisan/tulis tentang <b>${topicName}</b> sesuai unggah-ungguh basa secara santun.`;
      details.meaningful = `Sinau basa Jawa lan unggah-ungguh mbantu kita nguri-uri kabudayan luhur, ngurmati wong tuwa mawi basa krama, lan njaga kerukunan sesama.`;
      details.pemantik = `
        <ol>
          <li>Kenging menapa kita kedah ngendika mawi basa krama alus dhumateng bapak, ibu, lan guru ngenani materi <b>${topicName}</b>?</li>
          <li>Dolanan tradisional Jawa menapa ingkang paling koksenengi ing omah lan ana hubungane karo <b>${topicName}</b>?</li>
          <li>Sebutaken tembang dolanan Jawa ingkang natÃ© koktembangaken bebarengan konco ing materi <b>${topicName}</b>!</li>
        </ol>
      `;
      details.mindful = `
        Guru ngajak siswa nindakake <b>Teknik STOP (Ngenepake Rasa)</b>:<br>
        Siswa lungguh kanthi santai, merem sak menit, ngrasakake ketenangan batin, lan nyiapake pamikir kanggo sinau kabudayan Jawa kanthi tulus.
      `;
      details.meaningfulAct = `
        Siswa latihan pacelathon (percakapan) prasaja mawi basa krama alus marang guru utawa wong tuwa kanggo njaluk idi palilah (izin) ngenani materi <b>${topicName}</b>.
      `;
      details.joyfulAct = `
        <b>Game Nembang lan Njoged:</b><br>
        Siswa nembang dolanan (kayata 'Sluku-sluku Bathok' utawa 'Mentok-mentok') sinambi obah awak lan dolanan bareng kanthi bungah ngenani <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. Guru ngucapake salam pambuka mawi basa Jawa grapyak lan ndedonga bebarengan.<br>
        2. Nindakake Teknik STOP Ngenepake Rasa kanggo nentremake batin lan konsentrasi.<br>
        3. Apersepsi: Nembang dolanan bareng (kayata 'Menthok-menthok') sinambi guyon gembira lan nyenggol materi <b>${topicName}</b>.
      `;
      details.langkahInti = `
        1. <b>Mengalami (Maca & Ngrungokake)</b>: Bocah-bocah ngrungokake dongeng utawa maca teks pacelathon ngenani <b>${topicName}</b> kanthi tulus lan seneng.<br>
        2. <b>Menalar (Naliti Unggah-Ungguh)</b>: Bocah-bocah takon marang guru babagan bedane tembung ngoko lan krama alus ing materi <b>${topicName}</b>.<br>
        3. <b>Pacelathon Kolaboratif (Joyful)</b>: Bocah-bocah berkelompok latihan pacelathon (percakapan) nggunakake unggah-ungguh basa <b>${topicName}</b> karo kancane.<br>
        4. <b>Micara (Presentasi)</b>: Perwakilan kelompok maju ing ngarep kelas mamerake pacelathon mawi basa krama alus sing santun.<br>
        5. Guru menehi pujian 'Jempolan!', lan mbenerake basa krama sing isih kurang trep kanthi welas asih.
      `;
      details.langkahPenutup = `
        1. Guru lan bocah-bocah nyimpulake pitutur luhur crita lan unggah-ungguh ngenani <b>${topicName}</b>.<br>
        2. Refleksi: 'Kepiye rasane sinau basa Jawa lan nembang dolanan bebarengan?'.<br>
        3. Guru mbingbing pengerjaan Gladhi Mandiri (Asesmen Mandiri).<br>
        4. Ndedonga panutup.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Kesiapan mental lan pangerten basa krama awal anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi kasopanan lan kedisiplinan siswa nalika matur mawi basa krama.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Gladhi mandiri nyalin basa ngoko dadi krama alus utawa nulis aksara Jawa (soal wonten ing modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Sinau Basa lan Kabudayan Jawa Kang Adi Luhung!</h3>
        <p>Basa Jawa iku sugih lan ngemot piwulang luhur ngenani tata krama utawa unggah-ungguh. Dina iki kita bakal nyinaoni materi ngenani <b>${topicName}</b>. Kanthi sinau basa Jawa, kita bisa nguri-uri (melestarikan) warisan leluhur lan gladhi (berlatih) unggah-ungguh basa sing bener.</p>
        
        <p><b>Unggah-Ungguh Basa Jawa Kang Utama:</b></p>
        <p>Basa Jawa dipÃ©rang dadi pirang-pirang undha-usuk, nanging sing paling utama lan wajib dingerteni yaiku:</p>
        <ul>
          <li><b>Basa Ngoko:</b> Digunakake kanggo omong-omongan marang kanca sakpantaran (seumur) utawa marang wong sing luwih enom. Basa ngoko nggambarake rasa akrab.</li>
          <li><b>Basa Krama (Krama Alus):</b> Digunakake kanggo matur marang wong sing luwih tuwa utawa kurmat (Bapak, Ibu, Simbah, lan Guru) minangka wujud sopan santun lan ngajeni.</li>
        </ul>
        
        <p><b>Cara Nerapake Unggah-Ungguh ing Padintenan (Sehari-hari):</b></p>
        <ol>
          <li>Yen ditimbali (dipanggil) bapak/ibu guru utawa wong tuwa, mangsuli mawi tembung: <i>"Kula..."</i> utawa <i>"Dalem..."</i>, aja nganggo tembung <i>"Opo?"</i> utawa <i>"Hah?"</i> amarga kurang sopan.</li>
          <li>Yen arep liwat ing ngarepe wong tuwa kang lagi lungguh utawa ngadeg, kudu ndhungkluk sithik lan matur: <i>"Nyuwun sewu..."</i> utawa <i>"Ndherek langkung..."</i> sinambi ngesorake tangan tengen.</li>
          <li>Yen diwenehi barang utawa dibantu dening wong liya, biasakna matur: <i>"Matur nuwun..."</i> mawi praupan (wajah) kang bungah.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Piwulang Becik (Pitutur Luhur):</b> Kabudayan Jawa ngajari kita dadi wong sing <i>"andhap asor"</i> (rendah hati) lan ngurmati sesama. Kanthi nggunakake basa krama sing bener lan nembang dolanan Jawa, kita wis melu njaga lestarine kabudayan bangsa kita!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Wasis Basa Jawa</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Siswa wasis bedakake basa Ngoko lan basa Krama ngenani ${topicName} kanthi trep.</p>
          
          <p><b>B. Langkah Pengerjaan:</b><br>
          1. Garapan iki didiskusikake karo kanca sak kelompokmu.<br>
          2. Wangsulan ditulis kanthi rapi lan nggunakake unggah-ungguh sing bener.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Simbah nembe kemawon rawuh saking peken. Tembung <i>"rawuh"</i> tegese yaiku...<br>A. Lunga<br>B. Teka / Datang<br>C. Tuku</p>
          <p>2. Yen ditimbali Bapak utawa Ibu guru ing kelas, wangsulan sing bener yaiku...<br>A. Kula / Dalem<br>B. Opo to?<br>C. Yo sak sedelok</p>
          
          <p><b>D. Tantangan 2: Salin Basa</b><br>
          Salinen ukara ngoko iki dadi krama alus: "Ibu mangan sega saiki."<br>
          Wangsulan: ................................................................</p>
          
          <p><b>E. Tantangan 3: Praktik Tembang</b><br>
          Tembangkan bebarengan kelompokmu tembang dolanan 'Mentok-Mentok' mawi wirama sing bener lan gerak obah awak sing lucu!</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR GLADHI MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. GLADHI MANDIRI (SOAL EVALUASI SISWA)</h4>
          <p><b>Wangsulana pitakon ing ngisor iki kanthi jujur lan mandiri!</b></p>
          <p>1. Tembung 'sirah' yen dikramake alus dadi...<br>A. Mustaka<br>B. Rikma<br>C. Grana</p>
          <p>2. Gatekna ukara iki: "Simbah nembe lara untu." Kramane untu yaiku...<br>A. Netra<br>B. Waja<br>C. Talingan</p>
          <p>3. Tulisna tuladha ukara krama alus yen kowe arep nyuwun duit marang ibumu kanggo tuku buku tulis!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>A (Mustaka)</b> - Skor: 30<br>
          2. <b>B (Waja)</b> - Skor: 30<br>
          3. <b>"Ibu, kula nyuwun arta kagem tumbas buku tulis."</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN UNGGAH-UNGGUH & BAUSASTRA</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Unggah-Ungguh Basa</b></td>
                <td>Matur nggunakake krama alus kanthi trep lan sopan marang guru lan wong tuwa</td>
                <td>Matur nggunakake krama alus nanging isih campur basa ngoko</td>
                <td>Matur mawi basa ngoko kasar marang wong tuwa utawa guru</td>
              </tr>
              <tr>
                <td><b>Pangerten Kosakata</b></td>
                <td>Mampu njawab arti tembung krama lan ngoko kanthi 100% bener</td>
                <td>Mampu njawab tegese tembung nanging ana kesalahan 1 utawa 2</td>
                <td>Kesalahan njawab tembung krama luwih saka 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    default: // Bahasa Indonesia (indonesia)
      details.tp = `Memahami, membaca, dan menulis kosakata baru terkait <b>${topicName}</b> serta menuangkan gagasan secara terstruktur dan percaya diri.`;
      details.meaningful = `Kemampuan berkomunikasi bahasa Indonesia yang baik membantu kita menyampaikan pendapat secara jelas, mempererat pertemanan, dan menghargai karya tulis.`;
      details.pemantik = `
        <ol>
          <li>Bagaimana kata-kata yang kita ucapkan memengaruhi perasaan orang lain dalam bahasan <b>${topicName}</b>?</li>
          <li>Mengapa tanda baca seperti titik (.) sangat penting saat kita membaca sebuah paragraf tentang <b>${topicName}</b>?</li>
          <li>Pernahkah kamu menceritakan mimpimu kepada teman kelompokmu terkait materi <b>${topicName}</b>?</li>
        </ol>
      `;
      details.mindful = `
        Guru mengajak siswa melakukan <b>Teknik STOP (Fokus Kata)</b>:<br>
        Siswa duduk santai, memejamkan mata, mendengarkan keheningan ruangan kelas, lalu membuka mata dengan tenang siap membaca nyaring secara fokus.
      `;
      details.meaningfulAct = `
        Siswa mengaitkan topik <b>${topicName}</b> dengan percakapan sehari-hari bersama orang tua di rumah atau menulis cerita pendek.
      `;
      details.joyfulAct = `
        <b>Game Bisik Berantai:</b><br>
        Siswa menyampaikan pesan kalimat deskripsi pendek secara berantai dengan nada bisik perlahan agar melatih pendengaran teliti terkait <b>${topicName}</b>.
      `;
      details.langkahPendahuluan = `
        1. Guru menyapa anak-anak dengan riang gembira, menanyakan buku cerita favorit yang dibaca di rumah.<br>
        2. Guru melakukan meditasi tenang 'Fokus Kata' untuk menenangkan emosi anak-anak.<br>
        3. Apersepsi: Guru menampilkan gambar sampul buku cerita yang bertema <b>${topicName}</b> untuk memancing anak-anak menebak jalan ceritanya.
      `;
      details.langkahInti = `
        1. <b>Mengamati & Mengalami (Meaningful)</b>: Anak-anak membaca nyaring teks cerita/biografi pendek bertema <b>${topicName}</b> dengan intonasi riang.<br>
        2. <b>Menalar & Diskusi</b>: Anak-anak berdiskusi kelompok mencari arti kosakata baru/kata sulit dalam kamus terkait <b>${topicName}</b>.<br>
        3. <b>Mencipta Tulisan (Joyful)</b>: Anak-anak bergotong royong menulis paragraf deskripsi pendek bertema <b>${topicName}</b> menggunakan tanda baca yang tepat.<br>
        4. <b>Mempresentasikan</b>: Setiap anak bergantian membacakan hasil tulisannya di depan kelompoknya dengan percaya diri.<br>
        5. Guru memberikan tepuk bintang literasi, pelukan hangat, serta mengoreksi ejaan huruf kapital secara ramah.
      `;
      details.langkahPenutup = `
        1. Guru bersama anak-anak menyimpulkan amanat moral dari teks cerita <b>${topicName}</b>.<br>
        2. Refleksi perasaan: 'Siapa yang hari ini merasa lebih pandai menulis cerita?'.<br>
        3. Guru membagikan lembar Asesmen Mandiri literasi.<br>
        4. Berdoa bersama.
      `;
      details.asesmenFormatif = `
        <b>1. Asesmen Diagnostik (Non-Kognitif):</b> Kesiapan mental membaca nyaring anak.<br>
        <b>2. Asesmen Formatif (Proses):</b> Observasi ketepatan ejaan PUEBI dan intonasi membaca siswa selama kegiatan berkelompok.
      `;
      details.asesmenSumatif = `
        <b>Asesmen Sumatif:</b> Uji literasi tertulis mandiri berupa analisis cerita dan melengkapi kalimat rumpang terkait <b>${topicName}</b> (soal terlampir di modul Asesmen).
      `;
      details.bahanAjarText = `
        <h3>Ayo Membaca Nyaring & Menulis Kreatif!</h3>
        <p>Bahasa Indonesia adalah bahasa persatuan yang sangat penting kita kuasai dengan baik dan benar. Hari ini kita mempelajari kosakata dan teks cerita bertema <b>${topicName}</b>. Kemampuan berbahasa membantu kita menyampaikan ide secara jelas, memperluas wawasan, dan menghargai karya sastra.</p>
        
        <p><b>Mengapa Membaca itu Penting Bagi Otak Kita?</b></p>
        <p>Membaca adalah gerbang utama ilmu pengetahuan. Melalui wacana bertema <b>${topicName}</b>, kita melatih konsentrasi, memahami jalan cerita, mengenal karakter tokoh-tokoh inspiratif, dan memperkaya perbendaharaan kosakata baru. Kosakata yang luas sangat membantu kita saat menyusun paragraf deskripsi, menulis puisi, atau berpidato di depan banyak orang.</p>
        
        <p><b>Aturan Penting Kebahasaan (PUEBI/EYD):</b></p>
        <ul>
          <li><b>Tanda Baca Utama:</b> Gunakan tanda titik (.) untuk mengakhiri kalimat berita, tanda koma (,) untuk jeda rincian benda, dan tanda tanya (?) khusus di akhir kalimat tanya.</li>
          <li><b>Huruf Kapital:</b> Wajib digunakan di awal kalimat, untuk nama orang, nama kota/negara, hari/bulan, serta nama Tuhan dan agama.</li>
          <li><b>Ejaan & Suku Kata:</b> Rangkirlah suku kata secara benar sesuai kaidah kamus resmi Bahasa Indonesia agar maksud tulisanmu mudah dipahami pembaca.</li>
        </ul>

        <p><b>Langkah-Langkah Menulis Cerita yang Seru:</b></p>
        <ol>
          <li><b>Tentukan Ide dan Tokoh:</b> Tentukan siapa tokoh utamanya, watak tokoh tersebut (baik, ceria, dll), dan latar tempat cerita berlangsung.</li>
          <li><b>Buat Alur Sederhana:</b> Tuliskan permulaan cerita, masalah yang dialami tokoh, dan bagaimana masalah tersebut diselesaikan secara menarik (resolusi).</li>
          <li><b>Baca dan Perbaiki:</b> Setelah selesai menulis, bacalah kembali ceritamu secara mandiri atau mintalah guru mengecek kesesuaian tanda bacanya.</li>
        </ol>
        
        <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
          <b>Fakta Menarik Bahasa Indonesia:</b> Tahukah kamu bahwa Bahasa Indonesia diserap dari Bahasa Melayu dan saat ini memiliki lebih dari 120.000 kosakata resmi di KBBI? Kosakata kita terus berkembang dengan menyerap kata-kata indah dari berbagai bahasa daerah di Nusantara!
        </div>
      `;
      details.lkpdContent = `
        <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0;">LKPD: Cerdas Berbahasa Indonesia</h3>
          <p class="text-center" style="color:var(--primary);">Materi: ${topicName}</p>
          
          <p><b>A. Tujuan Aktivitas:</b><br>
          Siswa mampu mengidentifikasi ejaan yang benar dan melengkapi cerita rumpang terkait ${topicName} secara berkelompok.</p>
          
          <p><b>B. Langkah Kerja:</b><br>
          1. Bacalah teks cerita pendek bertema ${topicName} di bawah ini bersama teman kelompokmu.<br>
          2. Diskusikan arti kosakata sulit yang ditandai tebal.<br>
          3. Tuliskan jawaban akhirmu dengan rapi.</p>
          
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Penulisan nama orang di bawah ini yang menggunakan huruf kapital secara benar adalah...<br>A. budi pergi ke semarang<br>B. Budi pergi ke Semarang<br>C. Budi pergi ke semarang</p>
          <p>2. Susunlah suku kata acak berikut menjadi kata yang benar: <b>bo - la</b><br>A. Labo<br>B. Bola<br>C. Loba</p>
          
          <p><b>D. Tantangan 2: Melengkapi Kalimat</b><br>
          Lengkapilah kalimat rumpang berikut dengan kata yang tepat:<br>
          "Setiap pagi, Kakak selalu ......... buku cerita di teras rumah agar ilmunya bertambah."</p>
        </div>
      `;
      details.rubricContent = `
        <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px;">
          <h3 class="text-center" style="margin-top:0; color: var(--primary);">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
          <p class="text-center" style="color:var(--text-muted); font-size:12px;">Materi: ${topicName}</p>
          
          <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (DIKERJAKAN MANDIRI OLEH SISWA)</h4>
          <p><b>Kerjakan soal-soal uji literasi di bawah ini secara mandiri dan jujur!</b></p>
          <p>1. Tanda baca yang digunakan untuk mengakhiri sebuah kalimat berita/pernyataan adalah...<br>A. Tanda Tanya (?)<br>B. Tanda Titik (.)<br>C. Tanda Seru (!)</p>
          <p>2. manakah penulisan kalimat di bawah ini yang paling tertib dan tepat ejaannya?<br>A. adik suka makan pisang Ambon.<br>B. Adik suka makan pisang ambon.<br>C. adik Suka Makan pisang Ambon.</p>
          <p>3. Tuliskan sebuah kalimat sederhana bertema rasa syukurmu terhadap bimbingan gurumu di sekolah menggunakan huruf kapital yang benar!</p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Tanda Titik)</b> - Skor: 30<br>
          2. <b>B (Adik suka makan pisang ambon.)</b> - Skor: 30<br>
          3. <b>"Saya sangat bersyukur atas bimbingan Ibu Guru di sekolah."</b> - Skor: 40</p>
          <p style="background-color: var(--primary-light); padding: 10px; border-radius: 4px; font-size: 11px;">
            <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
          </p>
          
          <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK ASESMEN LITERASI MEMBACA & MENULIS</h4>
          <table>
            <thead>
              <tr>
                <th>Aspek Penilaian</th>
                <th>Sangat Baik (Skor 4)</th>
                <th>Baik (Skor 3)</th>
                <th>Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Membaca Nyaring</b></td>
                <td>Membaca dengan intonasi yang lancar, ekspresif, dan tanda baca tepat</td>
                <td>Membaca lancar tetapi kurang ekspresi wajahnya</td>
                <td>Membaca terbata-bata dan tidak memperhatikan titik koma</td>
              </tr>
              <tr>
                <td><b>Menulis Kalimat</b></td>
                <td>Menulis kalimat dengan ejaan huruf kapital dan tanda titik 100% tepat</td>
                <td>Menulis kalimat benar tetapi lupa membubuhkan tanda titik di akhir</td>
                <td>Banyak kesalahan huruf kapital dan tulisan sulit dibaca</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
  }

  // Map kemitraanPembelajaran and pemanfaatanDigital based on category
  if (category === "matematika") {
    details.kemitraanPembelajaran = `Kemitraan dengan orang tua untuk mendukung latihan numerasi praktis di rumah (misal: menghitung uang kembalian) dan kolaborasi antar guru kelas.`;
    details.pemanfaatanDigital = `Laptop guru, portal Rumah Belajar (https://rumah.pendidikan.go.id/) untuk media pembelajaran interaktif, Interactive Flat Panel (IFP) kelas untuk coretan angka digital, Proyektor, serta alat peraga konkrit/aplikasi matematika sekolah.`;
  } else if (category === "koding") {
    details.kemitraanPembelajaran = `Kemitraan dengan pranata komputer sekolah, orang tua untuk pendampingan screen time sehat di rumah, serta komunitas pengembang Scratch.`;
    details.pemanfaatanDigital = `Laptop/Komputer siswa di laboratorium, Proyektor, software Scratch Desktop (offline), portal belajar digital (https://rumah.pendidikan.go.id/), serta Interactive Flat Panel (IFP) untuk demonstrasi visual logika koding.`;
  } else if (category === "pjok") {
    details.kemitraanPembelajaran = `Kemitraan dengan guru kelas, orang tua dalam pemantauan aktivitas fisik harian anak, serta petugas Puskesmas terdekat untuk pemeriksaan kesehatan berkala.`;
    details.pemanfaatanDigital = `Laptop, Proyektor kelas, portal Rumah Belajar (https://rumah.pendidikan.go.id/) untuk materi kebugaran, Speaker Bluetooth luar ruangan (outdoor) untuk senam/tembang, serta video panduan peragaan gerak dasar olahraga.`;
  } else if (category === "senirupa") {
    details.kemitraanPembelajaran = `Kemitraan dengan seniman/pengrajin lokal dan orang tua dalam penyediaan bahan alam daur ulang yang aman untuk prakarya anak.`;
    details.pemanfaatanDigital = `Laptop, Proyektor untuk menampilkan galeri seni visual dan referensi karya di portal Rumah Belajar (https://rumah.pendidikan.go.id/), Interactive Flat Panel (IFP) sebagai kanvas digital interaktif kelas, serta kamera handphone guru untuk dokumentasi karya siswa.`;
  } else if (category === "pai") {
    details.kemitraanPembelajaran = `Kemitraan dengan guru kelas lainnya, guru mengaji TPQ desa, dan orang tua untuk pembiasaan ibadah harian serta akhlak mulia anak di rumah.`;
    details.pemanfaatanDigital = `Laptop, Speaker aktif kelas untuk memutar murattal Al-Qur'an, Proyektor, video kisah nabi dari portal Rumah Belajar (https://rumah.pendidikan.go.id/), serta Interactive Flat Panel (IFP) untuk praktik menulis huruf hijaiyah digital.`;
  } else if (category === "pancasila") {
    details.kemitraanPembelajaran = `Kemitraan dengan orang tua dalam pembiasaan gotong royong dan toleransi di keluarga, serta kolaborasi dengan tokoh masyarakat setempat.`;
    details.pemanfaatanDigital = `Laptop, Proyektor untuk pemutaran film animasi karakter Pancasila, portal Rumah Belajar (https://rumah.pendidikan.go.id/) untuk simulasi nilai Pancasila, serta Interactive Flat Panel (IFP) kelas untuk pengisian teka-teki nilai Pancasila secara interaktif.`;
  } else if (category === "ipas") {
    details.kemitraanPembelajaran = `Kemitraan dengan pengelola kebun sekolah, petugas kebersihan sekolah, orang tua untuk eksplorasi lingkungan rumah, serta dinas pelestarian alam setempat.`;
    details.pemanfaatanDigital = `Laptop, Proyektor untuk menayangkan video dokumenter alam/sosial, video edukasi ipas di portal Rumah Belajar (https://rumah.pendidikan.go.id/), mikroskop digital terhubung laptop, serta Interactive Flat Panel (IFP) untuk menyusun diagram rantai makanan.`;
  } else if (category === "english") {
    details.kemitraanPembelajaran = `Kemitraan dengan komunitas/guru bahasa Inggris luar kelas, serta orang tua untuk pembiasaan dialog bahasa Inggris sederhana di rumah.`;
    details.pemanfaatanDigital = `Laptop, Speaker aktif untuk mendengarkan pelafalan (listening), Proyektor, materi audio di portal Rumah Belajar (https://rumah.pendidikan.go.id/), serta Interactive Flat Panel (IFP) untuk game pencocokan kosakata secara interaktif.`;
  } else if (category === "jawa") {
    details.kemitraanPembelajaran = `Kemitraan dengan sesepuh/budayawan lokal setempat, serta orang tua dalam melatih unggah-ungguh basa Jawa krama alus di lingkungan keluarga.`;
    details.pemanfaatanDigital = `Laptop, Speaker aktif untuk memutar tembang dolanan/gamelan Jawa, Proyektor, portal Rumah Belajar (https://rumah.pendidikan.go.id/) untuk e-book materi bahasa Jawa, serta Interactive Flat Panel (IFP) kelas untuk latihan menulis Aksara Jawa secara digital.`;
  } else { // indonesia
    details.kemitraanPembelajaran = `Kemitraan dengan pustakawan sekolah/desa setempat, serta orang tua untuk gerakan literasi gemar membaca nyaring di rumah.`;
    details.pemanfaatanDigital = `Laptop, Proyektor untuk menampilkan buku cerita elektronik (e-book), modul literasi di portal Rumah Belajar (https://rumah.pendidikan.go.id/), Speaker aktif untuk menyimak pembacaan dongeng, serta Interactive Flat Panel (IFP) untuk menyusun kalimat acak.`;
  }

  // Override tp, meaningful, pemantik with rich, textbook-quality content from getKomponenInti
  const komponenInti = getKomponenInti(subjectId, topicName);
  if (komponenInti.tp) details.tp = komponenInti.tp;
  if (komponenInti.meaningful) details.meaningful = komponenInti.meaningful;
  if (komponenInti.pemantik) details.pemantik = komponenInti.pemantik;

  details.bahanAjarText = generateDetailedBahanAjarText(category, topicName, subjectId);
  details.lkpdContent = generateDetailedLkpd(category, topicName, subjectId);
  details.rubricContent = generateDetailedAsesmen(category, topicName, subjectId);
  return details;
}

// ----------------------------------------------------
// DYNAMIC COMPREHENSIVE BAHAN AJAR GENERATOR
// ----------------------------------------------------
function generateDetailedBahanAjarText(category, topicName, subjectId) {
  const lowTopic = topicName.toLowerCase();
  
  if (category === "matematika") {
    let mainExplanation = "";
    if (lowTopic.includes("10.000") || lowTopic.includes("digit") || lowTopic.includes("ribuan") || (lowTopic.includes("cacah") && !lowTopic.includes("100"))) {
      mainExplanation = `
        <p><b>A. Membaca Bilangan Cacah Ribuan:</b></p>
        <p>Bilangan cacah yang memiliki empat angka dinamakan bilangan ribuan. Untuk membaca bilangan tersebut dengan benar, kita harus melihat posisinya dari kiri ke kanan menggunakan aturan nilai tempat sebagai berikut:</p>
        <ol>
          <li><b>Angka Pertama (Paling Kiri):</b> Menunjukkan nilai Ribuan, dibaca dengan menambahkan kata "Ribu" di belakang angka tersebut.</li>
          <li><b>Angka Kedua:</b> Menunjukkan nilai Ratusan, dibaca dengan menambahkan kata "Ratus" di belakang angka tersebut.</li>
          <li><b>Angka Ketiga:</b> Menunjukkan nilai Puluhan, dibaca dengan menambahkan kata "Puluh" di belakang angka tersebut.</li>
          <li><b>Angka Keempat (Paling Kanan):</b> Menunjukkan nilai Satuan, cukup dibaca angkanya saja.</li>
        </ol>
        <p><i>Contoh Kasus (Jarak Jalan):</i> Jarak dari rumah Helen ke minimarket adalah 3.286 meter.</p>
        <ul>
          <li>Angka 3 menempati posisi Ribuan &rarr; Dibaca: Tiga Ribu</li>
          <li>Angka 2 menempati posisi Ratusan &rarr; Dibaca: Dua Ratus</li>
          <li>Angka 8 menempati posisi Puluhan &rarr; Dibaca: Delapan Puluh</li>
          <li>Angka 6 menempati posisi Satuan &rarr; Dibaca: Enam</li>
          <li>Maka, <b>3.286</b> dibaca: <i>"Tiga Ribu Dua Ratus Delapan Puluh Enam"</i>.</li>
        </ul>
        
        <p><b>B. Aturan Khusus Angka Nol (0) dan Angka Satu (1):</b></p>
        <ul>
          <li><b>Aturan Angka Nol (0):</b> Jika menemukan angka nol (0) di posisi ratusan, puluhan, atau satuan, maka posisi tersebut TIDAK PERLU DIBACA.
            <ul>
              <li><i>Contoh 1 (Speedometer motor):</i> 5.091 dibaca <i>"Lima Ribu Sembilan Puluh Satu"</i> (ratusan dilewati).</li>
              <li><i>Contoh 2:</i> 7.003 dibaca <i>"Tujuh Ribu Tiga"</i>.</li>
              <li><i>Contoh 3:</i> 6.570 dibaca <i>"Enam Ribu Lima Ratus Tujuh Puluh"</i>.</li>
            </ul>
          </li>
          <li><b>Aturan Angka Satu (1) di Posisi Ribuan:</b> Jika angka pertama (paling kiri) adalah angka 1, maka tidak dibaca "Satu Ribu", melainkan wajib dibaca "Seribu".
            <ul>
              <li><i>Contoh:</i> 1.025 dibaca <i>"Seribu Dua Puluh Lima"</i>.</li>
            </ul>
          </li>
        </ul>

        <p><b>C. Menuliskan Lambang Bilangan Cacah:</b></p>
        <p>Untuk menuliskan angka dari nama bilangan lisan, kita tentukan angka pengisinya secara bertahap dari ribuan hingga satuan.</p>
        <p><i>Contoh Kasus Puncak Mahameru (Gunung Semeru):</i> Puncak Gunung Semeru memiliki ketinggian tiga ribu enam ratus tujuh puluh enam meter di atas permukaan laut. Cara menulis angkanya:</p>
        <ul>
          <li>Kata "tiga ribu" &rarr; Tulis angka 3 di posisi paling depan.</li>
          <li>Kata "enam ratus" &rarr; Tulis angka 6 setelah angka 3.</li>
          <li>Kata "tujuh puluh" &rarr; Tulis angka 7 setelah angka 6.</li>
          <li>Kata "enam" &rarr; Tulis angka 6 di posisi paling belakang.</li>
          <li>Maka lambang bilangannya ditulis: <b>3.676</b>.</li>
        </ul>
      `;
    } else if (lowTopic.includes("hitung") || lowTopic.includes("bilangan 1 sampai 5") || lowTopic.includes("angka 0-10") || lowTopic.includes("bilangan sampai")) {
      mainExplanation = `
        <p><b>A. Mengenal Konsep Bilangan & Angka:</b></p>
        <p>Bilangan adalah konsep abstrak yang digunakan untuk menyatakan kuantitas atau banyaknya suatu benda. Lambang bilangan (seperti 1, 2, 3, dst.) adalah simbol tertulis yang kita pakai untuk menuliskan kuantitas tersebut. Untuk menguasai bilangan, kita harus memahami tiga hubungan utama:</p>
        <ul>
          <li><b>Kuantitas Nyata:</b> Jumlah fisik benda yang dapat kita raba dan hitung satu per satu (contoh: 3 buah jeruk).</li>
          <li><b>Lambang Bilangan:</b> Simbol angka tertulis yang kita gunakan (contoh: angka 3).</li>
          <li><b>Nama Bilangan:</b> Kata lisan yang kita ucapkan saat membaca angka tersebut (contoh: kata "tiga").</li>
        </ul>
        <p>Untuk bilangan yang lebih besar (seperti puluhan atau ratusan), kita mengenal konsep **Nilai Tempat**. Setiap angka dalam bilangan memiliki rumahnya masing-masing. Misalnya pada angka <b>47</b>, angka 4 berada di rumah **Puluhan** (bernilai 40) dan angka 7 berada di rumah **Satuan** (bernilai 7).</p>
        
        <p><b>B. Tabel Nilai Tempat & Cara Membaca Lambang Bilangan:</b></p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; text-align: center;">Lambang</th>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; text-align: center;">Nama Bilangan</th>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; text-align: left;">Analisis Nilai Tempat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center; font-weight: bold;">25</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Dua Puluh Lima</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;">2 Puluhan (20) + 5 Satuan (5)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center; font-weight: bold;">68</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Enam Puluh Delapan</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;">6 Puluhan (60) + 8 Satuan (8)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center; font-weight: bold;">100</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Seratus</td>
              <td style="border: 1px solid #a9c2be; padding: 8px;">1 Ratusan (100) + 0 Puluhan + 0 Satuan</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (lowTopic.includes("penjumlahan") || lowTopic.includes("pengurangan") || lowTopic.includes("tambah") || lowTopic.includes("kurang") || lowTopic.includes("hitung cepat")) {
      mainExplanation = `
        <p><b>A. Konsep Dasar Penjumlahan & Pengurangan:</b></p>
        <p>Penjumlahan dan pengurangan adalah dua konsep operasi hitung dasar berlawanan (invers) yang selalu kita gunakan dalam kehidupan sehari-hari:</p>
        <ul>
          <li><b>Penjumlahan (+):</b> Proses menggabungkan dua atau lebih kumpulan objek menjadi satu kesatuan utuh. Hasil akhir dari penjumlahan akan bertambah banyak.
          <br><i>Contoh:</i> Di piring ada 4 pisang, ibu menaruh 3 pisang lagi. Maka total pisang adalah 4 + 3 = 7 buah.</li>
          <li><b>Pengurangan (-):</b> Proses mengambil sebagian objek dari kumpulan awal. Hasil akhir dari pengurangan akan tersisa lebih sedikit.
          <br><i>Contoh:</i> Kamu punya 8 pensil, lalu 3 pensil dipinjamkan ke teman. Maka sisa pensilmu adalah 8 - 3 = 5 buah.</li>
        </ul>
        
        <p><b>B. Teknik Menghitung Bersusun (Menyimpan dan Meminjam):</b></p>
        <ol style="line-height: 1.6;">
          <li><b>Penjumlahan Bersusun (Menyimpan):</b> Jika hasil penjumlahan kolom satuan lebih dari 9 (misal 5 + 8 = 13), tuliskan angka 3 di bawah, lalu simpan angka 1 puluhan di atas kolom puluhan.</li>
          <li><b>Pengurangan Bersusun (Meminjam):</b> Jika angka satuan yang dikurangi lebih kecil dari pengurang (misal 2 dikurangi 7), pinjamlah 1 puluhan dari kolom puluhan sebelah kiri. Angka 2 akan berubah menjadi 12 (10 + 2), lalu lakukan pengurangan: 12 - 7 = 5.</li>
        </ol>
      `;
    } else if (lowTopic.includes("kali") || lowTopic.includes("bagi") || lowTopic.includes("perkalian") || lowTopic.includes("pembagian")) {
      mainExplanation = `
        <p><b>A. Konsep Perkalian dan Pembagian Dasar:</b></p>
        <p>Perkalian dan pembagian merupakan bentuk operasi hitung tingkat lanjut yang saling berhubungan erat:</p>
        <ul>
          <li><b>Perkalian (x):</b> Penjumlahan berulang dari bilangan yang sama secara konsisten.
          <br><i>Contoh:</i> Operasi <b>3 x 4</b> artinya ada 3 kelompok, di mana setiap kelompok berisi 4 benda. Ditulis: 4 + 4 + 4 = 12.</li>
          <li><b>Pembagian (:):</b> Pengurangan berulang sampai habis (nol) atau pembagian kelompok benda sama banyak (adil) kepada beberapa penerima.
          <br><i>Contoh:</i> Operasi <b>10 : 2</b> artinya 10 kelereng dibagi rata ke 2 orang anak. Masing-masing anak akan menerima 5 kelereng (10 - 2 - 2 - 2 - 2 - 2 = 0, dilakukan 5 kali pengurangan).</li>
        </ul>
        
        <p><b>B. Tips Belajar Tabel Perkalian:</b></p>
        <p>Mulailah dengan menghafalkan perkalian angka mudah seperti perkalian 2 (pola bilangan genap), perkalian 5 (pola berakhiran 5 atau 0), dan perkalian 10. Menguasai perkalian dasar akan sangat membantu dalam pembagian bersusun (Porogapit) di kelas yang lebih tinggi.</p>
      `;
    } else if (lowTopic.includes("pecahan") || lowTopic.includes("setengah") || lowTopic.includes("sepertiga") || lowTopic.includes("seperempat")) {
      mainExplanation = `
        <p><b>A. Mengenal Konsep Pecahan Sederhana:</b></p>
        <p>Pecahan adalah bilangan yang menyatakan bagian dari sesuatu yang utuh. Jika sebuah benda utuh dibagi menjadi beberapa bagian yang **sama besar**, maka setiap bagian tersebut memiliki nilai pecahan:</p>
        <ul>
          <li><b>Pecahan Setengah (1/2):</b> Satu benda utuh dibagi menjadi 2 bagian sama besar. Masing-masing bagian bernilai 1/2.
          <br><i>Contoh Nyata:</i> Membagi sebuah pizza bulat menjadi dua bagian sama besar untuk kakak dan adik.</li>
          <li><b>Pecahan Sepertiga (1/3):</b> Satu benda utuh dibagi menjadi 3 bagian sama besar. Masing-masing bagian bernilai 1/3.
          <br><i>Contoh Nyata:</i> Memotong sebatang cokelat menjadi tiga bagian sama panjang untuk tiga orang teman.</li>
          <li><b>Pecahan Seperempat (1/4):</b> Satu benda utuh dibagi menjadi 4 bagian sama besar. Masing-masing bagian bernilai 1/4.
          <br><i>Contoh Nyata:</i> Melipat selembar kertas gambar persegi menjadi empat bagian sama besar.</li>
        </ul>
        <p>Pada pecahan <b>1/2</b>, angka 1 di atas disebut **Pembilang** (menyatakan bagian yang diambil), dan angka 2 di bawah disebut **Penyebut** (menyatakan jumlah seluruh bagian yang sama besar).</p>
      `;
    } else if (lowTopic.includes("bangun") || lowTopic.includes("geometri") || lowTopic.includes("ruang") || lowTopic.includes("datar") || lowTopic.includes("segitiga") || lowTopic.includes("persegi") || lowTopic.includes("lingkaran")) {
      mainExplanation = `
        <p><b>A. Mengenal Bangun Datar dan Bangun Ruang (Geometri):</b></p>
        <p>Geometri mempelajari berbagai bentuk dua dimensi (bangun datar) dan tiga dimensi (bangun ruang) di sekitar kita:</p>
        <ul>
          <li><b>Bangun Datar (Dua Dimensi):</b> Bangun rata yang dibatasi oleh garis lurus atau lengkung, hanya memiliki panjang dan lebar (tidak memiliki tebal/volume).
            <ul>
              <li><b>Segitiga:</b> Memiliki 3 sisi, 3 sudut, dan 3 titik sudut. Contoh: Potongan pizza, rambu lalu lintas segitiga.</li>
              <li><b>Persegi (Segi Empat):</b> Memiliki 4 sisi yang sama panjang, 4 sudut siku-siku, dan 4 titik sudut. Contoh: Ubin lantai, papan catur.</li>
              <li><b>Persegi Panjang:</b> Memiliki 4 sisi (sisi berhadapan sama panjang), 4 sudut siku-siku. Contoh: Papan tulis, pintu kelas.</li>
              <li><b>Lingkaran:</b> Hanya memiliki 1 sisi melengkung yang saling bertemu, tidak memiliki sudut. Contoh: Roda sepeda, koin uang logam.</li>
            </ul>
          </li>
          <li><b>Bangun Ruang (Tiga Dimensi):</b> Bangun yang memiliki ruang/volume, dibatasi oleh sisi-sisi bangun datar.
            <ul>
              <li><b>Kubus:</b> Dibatasi oleh 6 sisi persegi sama besar. Contoh: Dadu permainan, kotak kado persegi.</li>
              <li><b>Balok:</b> Dibatasi oleh persegi panjang. Contoh: Kotak susu, lemari kelas, kardus pasta gigi.</li>
              <li><b>Bola:</b> Memiliki permukaan melengkung sempurna tanpa sudut. Contoh: Bola sepak, buah jeruk.</li>
              <li><b>Tabung:</b> Memiliki alas dan tutup berbentuk lingkaran yang sejajar. Contoh: Celengan kaleng, gelas minum.</li>
            </ul>
          </li>
        </ul>
      `;
    } else if (lowTopic.includes("jam") || lowTopic.includes("waktu") || lowTopic.includes("panjang") || lowTopic.includes("ukur") || lowTopic.includes("berat")) {
      mainExplanation = `
        <p><b>A. Pengukuran Panjang, Berat, dan Waktu:</b></p>
        <p>Mengukur adalah membandingkan nilai suatu besaran objek menggunakan alat ukur standar (satuan baku) agar hasilnya seragam dan dapat dipercaya:</p>
        <ul>
          <li><b>Mengukur Panjang:</b> Menggunakan alat ukur seperti Penggaris (dalam centimeter / cm) atau Meteran Pita (dalam meter / m). <i>1 meter = 100 centimeter</i>.</li>
          <li><b>Mengukur Berat:</b> Menggunakan timbangan untuk mengetahui massa benda dalam kilogram (kg) atau gram (g). <i>1 kilogram = 1000 gram</i>.</li>
          <li><b>Membaca Jam Analog:</b> Wajah jam analog dibagi menjadi 12 bagian angka. Jarum pendek menunjuk **Jam**, jarum panjang menunjuk **Menit**, dan jarum merah menunjuk **Detik**.</li>
        </ul>
        <p>Membaca jam setengah atau seperempat jam berarti melihat jarum panjang menunjuk ke angka 6 (setengah jam / 30 menit) atau menunjuk ke angka 3 atau 9 (seperempat jam / 15 atau 45 menit).</p>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Pembahasan Konsep Matematika:</b></p>
        <p>Pembelajaran topik <b>${topicName}</b> bertujuan melatih kita berpikir logis, runtut, dan analitis. Melalui pemecahan masalah numerik, kita dilatih untuk mengelompokkan data yang diketahui, merumuskan kalimat matematika yang tepat, melakukan perhitungan secara teliti, serta mengambil kesimpulan logis.</p>
        <p><b>B. Kunci Keberhasilan Belajar Matematika:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Memahami Konsep Dasar:</b> Pahami konsep di balik angka sebelum menghafalkan rumus pintas.</li>
          <li><b>Latihan Rutin:</b> Banyak berlatih mengerjakan variasi soal untuk mempertajam logika penyelesaian.</li>
          <li><b>Menghubungkan dengan Kehidupan:</b> Cari tahu bagaimana konsep matematika ${topicName} ini digunakan saat berbelanja, membagi barang, atau mengukur ruangan.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Belajar Matematika: ${topicName}</h3>
      <p>Matematika adalah ilmu tentang logika, pola, dan perhitungan yang sangat menyenangkan. Hari ini kita akan membahas secara mendalam materi tentang <b>${topicName}</b>. Dengan memahami materi ini, kamu akan lebih mudah menyelesaikan berbagai masalah hitung praktis di sekolah maupun di rumah.</p>
      
      ${mainExplanation}

      <p><b>B. Contoh Soal & Pembahasan Kontekstual:</b></p>
      <div style="background-color: #f7faf9; padding: 12px 15px; border: 1px solid #d2e4e1; border-radius: 6px; margin: 10px 0; font-size: 13px;">
        <b>Soal Cerita Sehari-hari:</b><br>
        Budi membawa 12 buah kelereng dari rumah. Di sekolah, ia bermain bersama kawan-kawannya dan berhasil menang sebanyak 5 buah kelereng. Berapa jumlah kelereng Budi sekarang?<br><br>
        <b>Langkah Pembahasan:</b><br>
        1. <b>Diketahui:</b> Kelereng awal = 12 buah; Kelereng menang = 5 buah.<br>
        2. <b>Ditanyakan:</b> Jumlah kelereng Budi sekarang.<br>
        3. <b>Operasi Hitung:</b> Karena menang, jumlahnya bertambah (Penjumlahan): 12 + 5 = 17.<br>
        4. <b>Kesimpulan:</b> Jadi, kelereng Budi sekarang berjumlah 17 buah.
      </div>

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Makna Matematika:</b> Mengapa kita belajar Matematika? Angka membantu kita mengagumi keteraturan alam semesta ciptaan Tuhan. Kelopak bunga, bentuk kerang, hingga susunan bintang di langit mengikuti aturan matematika yang sangat indah. Belajar numerasi adalah belajar menghargai keteraturan tersebut!
      </div>
    `;
  }

  if (category === "indonesia") {
    let mainExplanation = "";
    if (lowTopic.includes("bunyi") || lowTopic.includes("suara")) {
      mainExplanation = `
        <p><b>A. Mengenal Suara & Bunyi di Sekitar Kita:</b></p>
        <p>Semua suara yang kita dengar setiap hari berasal dari benda yang bergetar. Bunyi-bunyian ini dibagi menjadi dua kelompok besar:</p>
        <ul>
          <li><b>Bunyi Alam:</b> Bunyi yang dihasilkan secara alami oleh alam, cuaca, atau makhluk hidup ciptaan Tuhan tanpa campur tangan manusia.
          <br><i>Contoh:</i> Suara hujan (tik-tik-tik), suara petir (dhuarr), suara angin (wuuush), suara anjing menggonggong (guk-guk), suara burung bernyanyi (cicit-cuit).</li>
          <li><b>Bunyi Buatan:</b> Bunyi yang sengaja dibuat oleh manusia menggunakan benda, kendaraan, atau alat musik.
          <br><i>Contoh:</i> Klakson motor (telet-telet), pluit ditiup (prit-prit), gitar dipetik (jreng-jreng), bel sepeda (kring-kring), ketukan pintu (tok-tok).</li>
        </ul>
      `;
    } else if (lowTopic.includes("huruf") || lowTopic.includes("abjad") || lowTopic.includes("suku kata") || lowTopic.includes("membaca")) {
      mainExplanation = `
        <p><b>A. Mengenal Huruf Abjad & Suku Kata:</b></p>
        <p>Bahasa tulis disusun oleh 26 huruf abjad dari A sampai Z. Huruf-huruf ini dibagi menjadi dua jenis utama:</p>
        <ul>
          <li><b>Huruf Vokal (Huruf Hidup):</b> Huruf yang memberi nyawa pada kata agar berbunyi bersih. Terdiri dari 5 huruf: <b>a, i, u, e, o</b>.</li>
          <li><b>Huruf Konsonan (Huruf Mati):</b> Huruf selain huruf vokal, berjumlah 21 huruf: <b>b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z</b>.</li>
        </ul>
        <p>Ketika kita menggabungkan huruf konsonan dengan huruf vokal, maka terbentuklah **Suku Kata**.
        <br><i>Contoh:</i> Huruf konsonan <b>b</b> digabung dengan huruf vokal <b>u</b> menjadi suku kata <b>bu</b>. Huruf konsonan <b>k</b> digabung dengan huruf vokal <b>u</b> menjadi suku kata <b>ku</b>. Suku kata <b>bu</b> dan <b>ku</b> digabung menjadi kata <b>buku</b>!</p>
      `;
    } else if (lowTopic.includes("kuman") || lowTopic.includes("sehat") || lowTopic.includes("bersih") || lowTopic.includes("tubuh")) {
      mainExplanation = `
        <p><b>A. Kebersihan Tubuh & Menghalau Kuman Penyakit:</b></p>
        <p>Kuman adalah makhluk hidup sangat kecil yang tidak terlihat oleh mata biasa. Kuman menyukai tempat kotor, berdebu, dan tangan yang jarang dicuci. Jika kuman masuk ke dalam tubuh (melalui makanan yang dipegang tangan kotor), kita bisa terserang penyakit seperti sakit perut, flu, atau cacingan.</p>
        <p><b>Langkah Praktis Menjaga Kebersihan Diri:</b></p>
        <ol style="line-height: 1.6;">
          <li><b>Cuci Tangan dengan Sabun:</b> Selalu mencuci tangan dengan air bersih mengalir dan sabun selama 20 detik sebelum makan dan setelah memegang mainan atau keluar dari toilet.</li>
          <li><b>Menggosok Gigi:</b> Gosok gigi minimal dua kali sehari, pagi setelah sarapan dan malam sebelum tidur untuk mencegah kuman pemakan gigi berlubang.</li>
          <li><b>Mandi Teratur:</b> Mandi dua kali sehari pagi dan sore hari menggunakan sabun mandi bersih agar kuman di badan hilang.</li>
        </ol>
      `;
    } else if (lowTopic.includes("perasaan") || lowTopic.includes("emosi") || lowTopic.includes("karakter") || lowTopic.includes("sifat")) {
      mainExplanation = `
        <p><b>A. Mengenal Jenis Perasaan dan Emosi:</b></p>
        <p>Setiap hari, kita pasti merasakan berbagai jenis perasaan atau emosi. Emosi adalah hal yang wajar dan dialami oleh semua manusia. Beberapa jenis emosi dasar antara lain:</p>
        <ul>
          <li><b>Senang:</b> Dirasakan saat mendapatkan kabar baik, hadiah, atau bermain bersama teman. Ditandai dengan wajah tersenyum lebar.</li>
          <li><b>Sedih:</b> Dirasakan saat kehilangan mainan, terjatuh, atau berpisah dengan orang tua. Ditandai dengan wajah cemberut atau menangis.</li>
          <li><b>Marah:</b> Dirasakan saat merasa terganggu, diperlakukan tidak adil, atau ada hal yang berjalan tidak sesuai keinginan. Ditandai dengan alis mengkerut.</li>
          <li><b>Takut:</b> Dirasakan saat menemui situasi baru yang menyeramkan atau membahayakan. Ditandai dengan detak jantung berdebar kencang.</li>
        </ul>
        <p>Kita harus belajar mengekspresikan emosi dengan cara yang baik, misalnya menceritakan perasaan kita secara jujur kepada orang tua atau guru secara santun tanpa merusak barang atau menyakiti orang lain.</p>
      `;
    } else if (lowTopic.includes("uang") || lowTopic.includes("menabung") || lowTopic.includes("belanja") || lowTopic.includes("kebutuhan") || lowTopic.includes("ingin")) {
      mainExplanation = `
        <p><b>A. Kebutuhan vs Keinginan & Pentingnya Menabung:</b></p>
        <p>Dalam kehidupan sehari-hari, kita memerlukan berbagai barang untuk bertahan hidup dan bermain. Barang-barang ini dibagi menjadi:</p>
        <ul>
          <li><b>Kebutuhan:</b> Sesuatu yang **harus** dipenuhi untuk kelangsungan hidup. Jika tidak dipenuhi, kita akan mengalami kesulitan.
          <br><i>Contoh:</i> Makanan bergizi, pakaian sekolah, air bersih, tempat tinggal, buku pelajaran.</li>
          <li><b>Keinginan:</b> Sesuatu yang **ingin** kita miliki untuk menambah kesenangan, tetapi tidak mengancam kelangsungan hidup jika tidak ada.
          <br><i>Contoh:</i> Mainan robot baru, es krim rasa cokelat, sepatu bermerek mahal, gadget model terbaru.</li>
        </ul>
        <p><b>Bijak Menggunakan Uang:</b> Kita harus mendahulukan membeli barang kebutuhan sebelum membeli barang keinginan. Sisa uang jajan sebaiknya disisihkan untuk dimasukkan ke celengan (**Menabung Sejak Dini**) guna membeli barang penting di masa depan.</p>
      `;
    } else if (lowTopic.includes("lingkungan") || lowTopic.includes("sampah") || lowTopic.includes("kebersihan sekolah") || lowTopic.includes("piket")) {
      mainExplanation = `
        <p><b>A. Sayang Lingkungan & Memilah Sampah Sederhana:</b></p>
        <p>Lingkungan yang bersih adalah kunci hidup sehat dan nyaman. Menjaga kebersihan sekolah dan rumah merupakan tanggung jawab bersama. Salah satu cara merawat bumi adalah dengan memilah sampah:</p>
        <ul>
          <li><b>Sampah Organik (Mudah Membusuk):</b> Berasal dari sisa makhluk hidup. Sampah ini bisa diolah menjadi pupuk kompos tanaman.
          <br><i>Contoh:</i> Sisa makanan, kulit buah, daun-daun kering yang gugur di halaman.</li>
          <li><b>Sampah Anorganik (Sulit Membusuk):</b> Sampah buatan manusia yang membutuhkan waktu ratusan tahun untuk terurai. Sampah ini sebaiknya didaur ulang.
          <br><i>Contoh:</i> Botol plastik bekas, kaleng susu, bungkus jajanan plastik, kertas/kardus bekas.</li>
        </ul>
        <p>Mari budayakan membuang sampah pada tempatnya dan memisahkan jenis sampah agar kelas kita terhindar dari lalat, bau menyengat, dan penyebaran penyakit!</p>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Pembahasan Pembelajaran Bahasa Indonesia:</b></p>
        <p>Materi <b>${topicName}</b> membantu kita menguasai kemampuan literasi dasar. Kita diajak untuk menyimak cerita dengan saksama, membaca dengan intonasi lancar, berbicara secara sopan di depan kelas, serta menuliskan kata dan kalimat dengan ejaan yang rapi dan benar.</p>
        <p><b>B. Keterampilan Literasi yang Dilatih:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Menyimak & Memahami:</b> Melatih konsentrasi dalam mendengarkan informasi penting dari guru atau teman sebaya.</li>
          <li><b>Membaca & Memirsa:</b> Mengidentifikasi gagasan pokok, memahami alur cerita, serta memperkaya kosakata dari teks tertulis.</li>
          <li><b>Berbicara & Menulis:</b> Mengekspresikan pendapat secara runtut, menceritakan pengalaman pribadi dengan percaya diri, serta menulis kalimat terstruktur menggunakan tanda baca yang benar.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Belajar Bahasa Indonesia: ${topicName}</h3>
      <p>Bahasa Indonesia adalah bahasa persatuan yang indah. Hari ini kita akan membahas secara mendalam mengenai topik <b>${topicName}</b>. Mempelajari bahasa membantu kita mengekspresikan pikiran dengan baik dan memahami orang lain secara santun.</p>
      
      ${mainExplanation}

      <p><b>B. Contoh Latihan Literasi:</b></p>
      <div style="background-color: #f7faf9; padding: 12px 15px; border: 1px solid #d2e4e1; border-radius: 6px; margin: 10px 0; font-size: 13px;">
        <b>Latihan Membaca & Menulis Suku Kata:</b><br>
        Bacalah kata di bawah ini dengan lantang, lalu uraikan suku katanya di buku tulismu!<br>
        1. <b>Buku</b> = bu - ku<br>
        2. <b>Bola</b> = bo - la<br>
        3. <b>Kuman</b> = ku - man<br>
        4. <b>Mandi</b> = man - di
      </div>

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Nilai Literasi:</b> Buku adalah jendela dunia. Dengan membaca secara tekun setiap hari, wawasan kita akan semakin luas, imajinasi kita berkembang, dan kita akan tumbuh menjadi anak yang cerdas serta berbudi pekerti luhur!
      </div>
    `;
  }

  if (category === "koding") {
    let mainExplanation = "";
    if (lowTopic.includes("scratch") || lowTopic.includes("visual") || lowTopic.includes("pemrograman")) {
      mainExplanation = `
        <p><b>A. Dasar Pemrograman Visual dengan Scratch:</b></p>
        <p>Scratch adalah media pemrograman visual interaktif yang dirancang untuk membantu pemula membuat game, animasi, dan cerita interaktif secara kreatif tanpa perlu menghafal baris kode teks yang rumit. Di Scratch, kita menulis kode dengan menyusun blok-blok berwarna layaknya mainan lego.</p>
        <p><b>Jenis-Jenis Blok Kode Penting di Scratch:</b></p>
        <ul>
          <li><b>Events (Kuning):</b> Untuk memicu program berjalan (misal: <i>"when green flag clicked"</i>).</li>
          <li><b>Motion (Biru):</b> Untuk menggerakkan Sprite (karakter) di layar (misal: <i>"move 10 steps"</i>).</li>
          <li><b>Looks (Ungu):</b> Mengatur kostum, balon teks, atau efek grafis (misal: <i>"say Hello!"</i>).</li>
          <li><b>Control (Jingga):</b> Mengatur jalannya alur logika seperti perulangan (<i>"forever"</i>) atau kondisi (<i>"if-then"</i>).</li>
        </ul>
      `;
    } else if (lowTopic.includes("artifisial") || lowTopic.includes(" ai ") || lowTopic.includes("ai") || lowTopic.includes("cerdas")) {
      mainExplanation = `
        <p><b>A. Mengenal Kecerdasan Artifisial (AI):</b></p>
        <p>Kecerdasan Artifisial (AI) atau Artificial Intelligence adalah teknologi komputer yang meniru kecerdasan manusia agar mesin dapat belajar, mengenali suara/wajah, mengambil keputusan, atau memprediksi sesuatu secara cerdas.</p>
        <p><b>Perbedaan Komputer Biasa dengan AI:</b></p>
        <p>Komputer biasa hanya memproses perintah yang sangat kaku yang sudah diprogram sebelumnya (jika A maka jalankan B). Sementara AI dapat **belajar dari kumpulan data** (Machine Learning). Misalnya, jika kita berulang kali memberikan foto kucing kepada AI, AI akan mengenali pola fisik kucing (telinga segitiga, kumis, bulu halus) sehingga kelak ketika diberikan foto hewan acak, AI dapat memprediksi sendiri apakah hewan tersebut kucing atau bukan.</p>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Berpikir Komputasional (Computational Thinking):</b></p>
        <p>Computational thinking adalah metode pemecahan masalah yang digunakan pemrogram sebelum menyusun koding. Metode ini terdiri dari 4 pilar utama:</p>
        <ol>
          <li><b>Dekomposisi:</b> Memecah masalah besar (seperti membuat game) menjadi bagian kecil (lompat, jalan).</li>
          <li><b>Pengenalan Pola:</b> Mencari kesamaan cara menyelesaikan masalah yang pernah dihadapi.</li>
          <li><b>Abstraksi:</b> Fokus pada hal-hal penting saja dan mengabaikan detail yang tidak berguna.</li>
          <li><b>Algoritma:</b> Menyusun instruksi langkah demi langkah secara urut untuk menyelesaikan tugas.</li>
        </ol>
      `;
    }

    return `
      <h3>Ayo Belajar Koding & Kecerdasan Artifisial: ${topicName}</h3>
      <p>Koding dan AI adalah keterampilan masa depan yang melatih kita berpikir logis, kreatif, dan analitis. Hari ini kita membahas materi penting: <b>${topicName}</b>. Mari kita pelajari konsep dan alurnya untuk merancang karya teknologi ciptaan kita sendiri!</p>
      
      ${mainExplanation}

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Etika & Pemanfaatan AI:</b> Teknologi AI seperti pengenal wajah, asisten suara, dan rekomendasi video sangat membantu kehidupan kita. Namun, gunakan teknologi ini secara bijak, bertanggung jawab, dan tetap lindungi data pribadi kalian di dunia internet!
      </div>
    `;
  }

  if (category === "jawa") {
    let mainExplanation = "";
    if (lowTopic.includes("perkenalan") || lowTopic.includes("tepangan") || lowTopic.includes("awak")) {
      mainExplanation = `
        <p><b>A. Tepangan lan Perangan Awak (Unggah-Ungguh Basa):</b></p>
        <p>Unggah-ungguh basa mujudake cara micara sing bener lan sopan kanggo ngajeni wong liya. Nalika micara karo guru utawa wong tuwa, awake dhewe kudu nggunakake Krama Inggil. Tuladha prabedan Basa Ngoko lan Krama Inggil perangan awak:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; text-align: center;">Perangan Awak</th>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; text-align: center;">Basa Ngoko (Kanggo Kanca)</th>
              <th style="border: 1px solid #a9c2be; padding: 8px; background-color: #eaf4f3; text-align: center;">Krama Inggil (Kanggo Guru/Wong Tuwa)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-weight: bold; text-align:center;">Kepala</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Sirah</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Mustaka</td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-weight: bold; text-align:center;">Tangan</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Tangan</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Asta</td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-weight: bold; text-align:center;">Kaki</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Sikil</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Ampeyan</td>
            </tr>
            <tr>
              <td style="border: 1px solid #a9c2be; padding: 8px; font-weight: bold; text-align:center;">Mata</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Mripat</td>
              <td style="border: 1px solid #a9c2be; padding: 8px; text-align: center;">Paningal</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (lowTopic.includes("dolanan") || lowTopic.includes("tembang") || lowTopic.includes("lagu") || lowTopic.includes("nyanyi")) {
      mainExplanation = `
        <p><b>A. Tembang Dolanan lan Dolanan Tradisional Jawa:</b></p>
        <p>Tembang dolanan yaiku tembang Jawa sing kerep dinyanyikake bocah-bocah nalika dolanan bebarengan ing latar. Tembang iki nduweni pitutur luhur utawa piwulang moral sing becik kanggo urip padintenan:</p>
        <ul>
          <li><b>Dolanan Tradisional:</b> Dolanan sing nggunakake alat prasaja lan nglatih kekompakan. Tuladha: Jamuran, Egrang, Kelereng, Bekelan, lan Gobak Sodor.</li>
          <li><b>Tembang Dolanan Ceria:</b>
            <ul>
              <li><b>Cublak-Cublak Suweng:</b> Nglatih bocah-bocah supaya ora tamak/srakah lan tansah nggunakake ati nurani ing urip.</li>
              <li><b>Menthog-Menthog:</b> Piwulang moral supaya awake dhewe ora dadi bocah kesed sing seneng turu wae lan wegah nyambut gawe.</li>
              <li><b>Padhang Wulan:</b> Ngajak kanca-kanca syukur marang Gusti sing wis menehi keendahan wengi sing padhang lan rukun dolanan ing latar.</li>
            </ul>
          </li>
        </ul>
      `;
    } else if (lowTopic.includes("kulawarga") || lowTopic.includes("keluarga") || lowTopic.includes("bapak") || lowTopic.includes("ibu") || lowTopic.includes("simbah")) {
      mainExplanation = `
        <p><b>A. Silsilah Kulawarga & Ngurmati Wong Tuwa:</b></p>
        <p>Kulawarga utawa keluarga iku wong-wong sing manggon bareng ing omah kita. Ing kabudayan Jawa, awake dhewe kudu ngerti sebutan silsilah kulawarga lan ngomong kanthi sopan santun:</p>
        <ul>
          <li><b>Sebutan Silsilah:</b>
            <br>- <b>Bapak / Ibu:</b> Wong tuwa kandung sing ngopeni awake dhewe.
            <br>- <b>Simbah / Eyang:</b> Bapak utawa ibune bapak/ibu awake dhewe.
            <br>- <b>Kangmas / Mbakyu:</b> Sedulur sing luwih tuwa (Kakak laki-laki/perempuan).
            <br>- <b>Adhi / Ndhuk / Le:</b> Sedulur utawa bocah sing luwih enom (Adik).
          </li>
          <li><b>Unggah-Ungguh Basa marang Wong Tuwa:</b> Nalika matur marang bapak, ibu, lan simbah, awake dhewe kudu nggunakake **Basa Krama Alus** minangka wujud bekti lan pakurmatan. Tuladha: <i>"Bapak nembe sare"</i> (bukan "Bapak lagi turu").</li>
        </ul>
      `;
    } else if (lowTopic.includes("kewan") || lowTopic.includes("sato") || lowTopic.includes("pitik") || lowTopic.includes("kucing") || lowTopic.includes("sapi")) {
      mainExplanation = `
        <p><b>A. Sato Ingon-Ingon (Hewan Peliharaan) lan Swarane:</b></p>
        <p>Ing sakiwa tengene awake dhewe, akeh kewan utawa sato ingon-ingon sing kudu dijaga lan ditresnani kanthi becik. Saben kewan nduweni swara lan panganan sing beda-beda:</p>
        <ul>
          <li><b>Kucing:</b> Swarane *ngeong-ngeong*, seneng mangan iwak lan kudu diwenehi papan turu sing resik.</li>
          <li><b>Pitik (Ayam):</b> Pitik jago swarane *kukuruyuk*, pitik babon *petok-petok*. Pitik ngasilake endhog lan daging sing sehat kanggo dipangan.</li>
          <li><b>Sapi / Kebo:</b> Swarane *moh-moh*, seneng mangan suket ijo, lan ngasilake susu segar sing sehat.</li>
        </ul>
        <p><b>Cara Ngopeni Kewan:</b> Kewan kudu diwenehi pangan lan ombe sing cukup saben dina, dikandani kanthi resik, lan ora kena disiksa utawa dilarani, amarga kewan uga makhluk ciptaan Gusti.</p>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Nguri-Uri Budaya Jawa:</b></p>
        <p>Sinau Basa Jawa lan tembang dolanan iku penting banget supaya awake dhewe dadi bocah sing nduweni tata krama, andhap asor, lan ngerti budi pekerti. Liwat pasinaon <b>${topicName}</b>, awake dhewe dilatih mirengake crita, maca ukara Jawa, lan micara kanthi santun.</p>
        <p><b>B. Pitutur Luhur ing Pasinaon Jawa:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Andhap Asor:</b> Tansah andhap asor (rendah hati) lan ora sombong marang kanca lan wong liya.</li>
          <li><b>Tata Krama:</b> Ngerti carane matur lan tumindak sing sopan marang wong sing luwih tuwa (unggah-ungguh basa).</li>
          <li><b>Gotong Royong:</b> Rukun karo kanca lan seneng tetulung marang sapa wae sing butuhake pitulungan.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Sinau Basa Jawa: ${topicName}</h3>
      <p>Basa Jawa minangka basa ibu sing kebak nilai sopan santun. Dina iki awake dhewe bakal nyinaoni babagan <b>${topicName}</b>. Ayo sinau kanthi bungah lan prigel!</p>
      
      ${mainExplanation}

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Budi Pekerti:</b> Wong Jawa iku nduweni sipat andhap asor lan tansah ngajeni wong sing luwih tuwa. Ayo kululinakake matur nggunakake Basa Krama sing alus marang bapak lan ibu ing omah!
      </div>
    `;
  }

  if (category === "ipas") {
    let mainExplanation = "";
    
    if (lowTopic.includes("cahaya")) {
      mainExplanation = `
        <p><b>A. Apa itu Cahaya?</b></p>
        <p>Cahaya adalah salah satu bentuk energi berupa gelombang elektromagnetik kasat mata yang dapat ditangkap oleh indra penglihat kita (mata). Tanpa adanya cahaya, dunia ini akan menjadi gelap gulita dan kita tidak akan bisa melihat keindahan warna-warni benda di sekitar kita. Sumber cahaya terbesar di bumi kita adalah **Matahari**, disusul oleh lampu, lilin, senter, dan api.</p>
        
        <p><b>B. Sifat-Sifat Cahaya & Contoh Penerapannya:</b></p>
        <p>Berdasarkan buku ajar IPAS Kelas 5, cahaya memiliki sifat-sifat khusus yang unik dan dapat kita buktikan secara ilmiah:</p>
        
        <ol style="margin-bottom: 15px; padding-left: 20px; line-height: 1.6;">
          <li style="margin-bottom: 8px;">
            <b>Cahaya Merambat Lurus:</b>
            <br>Cahaya akan selalu merambat lurus dari sumbernya selama merambat melalui medium yang sama.
            <br><i>Contoh Nyata:</i> Cahaya matahari yang masuk menerobos celah ventilasi jendela rumah terlihat membentuk garis-garis lurus, lampu sorot mobil di malam hari, atau berkas sinar senter di ruangan gelap.
            <br><i>Uji Coba:</i> Letakkan tiga lembar karton berlubang secara sejajar di depan nyala lilin. Jika ketiga lubang sejajar lurus, kita dapat melihat nyala lilin. Namun, jika salah satu karton digeser sedikit saja sehingga tidak sejajar, nyala lilin akan langsung hilang dari pandangan kita.
          </li>
          <li style="margin-bottom: 8px;">
            <b>Cahaya Menembus Benda Bening:</b>
            <br>Cahaya dapat melewati benda yang transparan (tembus pandang). Sebaliknya, jika cahaya mengenai benda yang gelap/tidak tembus pandang (opaque) seperti dinding, kayu, atau tubuh kita, cahaya akan terhalang dan membentuk **Bayangan** di belakang benda tersebut.
            <br><i>Contoh Nyata:</i> Kaca jendela rumah yang jernih membiarkan sinar matahari menerangi ruangan kelas, air kolam yang jernih membuat kita bisa melihat kerikil di dasarnya, atau cahaya senter yang menembus plastik mika transparan.
          </li>
          <li style="margin-bottom: 8px;">
            <b>Cahaya Dapat Dipantulkan (Refleksi):</b>
            <br>Pemantulan terjadi ketika cahaya mengenai permukaan benda yang tidak tembus cahaya, lalu cahaya tersebut memantul kembali ke mata kita. Pada permukaan yang sangat rata dan mengilap seperti cermin datar, terjadi pemantulan teratur.
            <br><i>Contoh Nyata:</i> Kita dapat melihat bayangan diri kita sendiri di depan cermin datar saat merapikan seragam sekolah, atau bayangan pepohonan yang terpantul jernih di atas permukaan air danau yang tenang.
          </li>
          <li style="margin-bottom: 8px;">
            <b>Cahaya Dapat Dibiaskan atau Dibelokkan (Refraksi):</b>
            <br>Pembelokan cahaya terjadi ketika arah rambat cahaya melewati dua medium (zat perantara) yang memiliki kerapatan berbeda, misalnya dari udara ke air jernih.
            <br><i>Contoh Nyata:</i> Pensil yang kita masukkan ke dalam gelas berisi air jernih akan terlihat patah atau bengkok dari luar, atau dasar kolam renang jernih yang terlihat jauh lebih dangkal daripada kedalaman aslinya.
          </li>
          <li style="margin-bottom: 8px;">
            <b>Cahaya Dapat Diuraikan (Dispersi):</b>
            <br>Cahaya putih (seperti cahaya matahari) sebenarnya merupakan gabungan dari berbagai macam warna cahaya (merah, jingga, kuning, hijau, biru, nila, ungu). Cahaya putih ini dapat diuraikan saat melewati media pembias tertentu.
            <br><i>Contoh Nyata:</i> Terbentuknya **Pelangi** setelah hujan. Butiran air hujan di udara berfungsi sebagai prisma alami yang membias dan menguraikan cahaya matahari menjadi spektrum warna pelangi yang sangat indah.
          </li>
        </ol>

        <p><b>C. Aktivitas Eksperimen Sederhana Mandiri di Rumah:</b></p>
        <p>Ambillah sebuah senter dan carilah tiga benda berbeda di rumahmu: (1) gelas kaca bening, (2) buku tulis tebal, dan (3) lembar plastik kresek berwarna hitam. Sorotkan senter ke masing-masing benda tersebut secara bergantian di depan dinding. Amati benda mana yang meneruskan cahaya hingga ke dinding, dan benda mana yang menghasilkan bayangan gelap paling pekat. Catatlah hasil eksperimen sederhanamu!</p>
      `;
    } else if (lowTopic.includes("bunyi")) {
      mainExplanation = `
        <p><b>A. Apa itu Bunyi?</b></p>
        <p>Bunyi adalah getaran yang merambat sebagai gelombang mekanik melalui zat perantara (medium) hingga ditangkap oleh indra pendengar kita (telinga). Sumber bunyi adalah segala macam benda yang bergetar. Misalnya senar gitar yang dipetik, pita suara kita saat berbicara, atau gong yang dipukul.</p>
        
        <p><b>B. Sifat-Sifat Bunyi & Media Perambatannya:</b></p>
        <p>Berdasarkan materi IPAS, bunyi memiliki sifat-sifat penting berikut:</p>
        <ol style="margin-bottom: 15px; padding-left: 20px; line-height: 1.6;">
          <li style="margin-bottom: 8px;">
            <b>Bunyi Memerlukan Medium untuk Merambat:</b>
            <br>Bunyi tidak bisa merambat di ruang hampa udara (seperti di luar angkasa) karena tidak ada partikel zat perantara. Bunyi merambat melalui tiga jenis medium:
            <ul>
              <li><b>Medium Gas (Udara):</b> Kita dapat mendengar suara teman berbicara atau kicauan burung karena bunyi merambat melalui udara di sekitar kita.</li>
              <li><b>Medium Padat:</b> Bunyi merambat paling cepat melalui benda padat. <i>Contoh:</i> Menempelkan telinga ke permukaan meja kayu lalu mengetuk meja tersebut di ujung lainnya, atau permainan telepon kaleng dengan tali kasur.</li>
              <li><b>Medium Cair:</b> Bunyi dapat merambat di dalam air. <i>Contoh:</i> Dua batu yang diketukkan di dalam bak air jernih akan terdengar bunyinya dari luar, atau lumba-lumba yang berkomunikasi di dalam laut.</li>
            </ul>
          </li>
          <li style="margin-bottom: 8px;">
            <b>Bunyi Dapat Dipantulkan:</b>
            <br>Ketika bunyi mengenai penghalang keras seperti dinding semen, tebing batu, atau gua, gelombang bunyi akan memantul kembali. Ada dua jenis pantulan bunyi:
            <ul>
              <li><b>Gema:</b> Bunyi pantul yang terdengar jelas *setelah* bunyi asli selesai diucapkan. Biasanya terjadi di lereng gunung atau lembah luas karena jarak pemantulnya jauh.</li>
              <li><b>Gaung (Kerdam):</b> Bunyi pantul yang datang bersamaan dengan bunyi asli sehingga bunyi asli menjadi tidak jelas/terganggu. Biasanya terjadi di ruangan tertutup seperti bioskop atau aula kelas.</li>
            </ul>
          </li>
        </ol>
      `;
    } else if (lowTopic.includes("fotosintesis")) {
      mainExplanation = `
        <p><b>A. Apa itu Fotosintesis?</b></p>
        <p>Berbeda dengan manusia dan hewan yang harus mencari makanan, tumbuhan hijau memiliki kemampuan unik untuk membuat makanannya sendiri melalui proses kimia yang disebut **Fotosintesis**. Proses ini terjadi di dalam daun hijau yang memiliki zat warna bernama **Klorofil** (zat hijau daun).</p>
        
        <p><b>B. Bahan-Bahan & Rumus Fotosintesis:</b></p>
        <p>Untuk melakukan fotosintesis, tumbuhan membutuhkan empat bahan utama dari alam:</p>
        <ol style="margin-bottom: 15px; padding-left: 20px; line-height: 1.6;">
          <li><b>Air (H2O):</b> Diserap oleh rambut akar tumbuhan dari dalam tanah, lalu dialirkan naik ke daun melalui pembuluh kayu (xilem) di batang.</li>
          <li><b>Karbondioksida (CO2):</b> Gas sisa pernapasan manusia/hewan dan asap kendaraan yang melayang di udara. Gas ini diserap oleh daun melalui lubang pernapasan kecil bernama **Stomata**.</li>
          <li><b>Klorofil:</b> Zat hijau daun yang berfungsi sebagai penangkap energi cahaya matahari.</li>
          <li><b>Cahaya Matahari:</b> Sumber energi utama untuk memicu reaksi kimia pembentukan makanan.</li>
        </ol>
        
        <p><b>Reaksi Fotosintesis:</b></p>
        <div style="background-color:#eaf4f3; padding:12px; border-radius:6px; font-weight:bold; text-align:center; font-size:12px; border: 1px solid #a9c2be; margin: 15px 0;">
          Air + Karbondioksida &nbsp; ➔ (dengan bantuan Cahaya & Klorofil) ➔ &nbsp; Glukosa (Makanan) + Oksigen
        </div>
        <p><b>Hasil Fotosintesis:</b></p>
        <ul>
          <li><b>Glukosa (Zat Makanan):</b> Diedarkan ke seluruh tubuh tumbuhan oleh pembuluh tapis (floem) untuk pertumbuhan, buah, bunga, atau cadangan makanan di umbi/akar.</li>
          <li><b>Oksigen (O2):</b> Gas segar yang dilepaskan ke udara bebas melalui stomata untuk kita bernapas setiap hari.</li>
        </ul>
      `;
    } else if (lowTopic.includes("wujud") || lowTopic.includes("zat") || lowTopic.includes("gas") || lowTopic.includes("cair") || lowTopic.includes("padat")) {
      mainExplanation = `
        <p><b>A. Tiga Wujud Zat (Materi):</b></p>
        <p>Zat atau materi adalah segala sesuatu yang menempati ruang dan memiliki massa. Di bumi kita, semua benda dikelompokkan ke dalam tiga wujud utama:</p>
        <ul>
          <li><b>Zat Padat:</b> Memiliki bentuk tetap dan volume tetap, tidak berubah mengikuti wadahnya karena partikelnya tersusun sangat rapat. Contoh: Batu, kayu, penggaris besi, meja tulis.</li>
          <li><b>Zat Cair:</b> Memiliki volume tetap, namun bentuknya selalu berubah mengikuti wadah yang ditempatinya. Contoh: Air jernih, sirup manis, minyak goreng, susu cair.</li>
          <li><b>Zat Gas:</b> Memiliki bentuk dan volume yang selalu berubah memenuhi seluruh ruang wadahnya karena partikelnya bebas bergerak. Contoh: Udara dalam balon, uap air mendidih, asap pembakaran.</li>
        </ul>
        
        <p><b>B. Perubahan Wujud Zat:</b></p>
        <p>Wujud zat dapat berubah jika menerima panas (dipanaskan) atau melepaskan panas (didinginkan):</p>
        <ol style="margin-bottom: 15px; padding-left: 20px; line-height: 1.6;">
          <li><b>Mencair (Padat ke Cair):</b> Menerima panas. Contoh: Es batu ditaruh di luar ruangan menjadi air, cokelat meleleh dipanaskan.</li>
          <li><b>Membeku (Cair ke Padat):</b> Melepaskan panas. Contoh: Air dimasukkan ke freezer menjadi es batu padat.</li>
          <li><b>Menguap (Cair ke Gas):</b> Menerima panas. Contoh: Air mendidih mengeluarkan uap air, jemuran basah menjadi kering terkena sinar matahari.</li>
          <li><b>Mengembun (Gas ke Cair):</b> Melepaskan panas. Contoh: Butiran air di luar gelas berisi es batu, atau embun pagi di daun-daun luar rumah.</li>
          <li><b>Menyublim (Padat ke Gas):</b> Menerima panas. Contoh: Kapur barus (kamper) di lemari yang lama-lama habis mengecil dan wangi gas.</li>
          <li><b>Mengkristal / Deposisi (Gas ke Padat):</b> Melepaskan panas. Contoh: Pembuatan es kering, atau terbentuknya salju di awan dingin.</li>
        </ol>
      `;
    } else if (lowTopic.includes("tata surya") || lowTopic.includes("planet") || lowTopic.includes("bumi") || lowTopic.includes("rotasi")) {
      mainExplanation = `
        <p><b>A. Mengenal Sistem Tata Surya Kita:</b></p>
        <p>Tata surya adalah susunan benda langit yang terdiri dari sebuah bintang besar bernama **Matahari** sebagai pusatnya, serta delapan planet dan benda langit lainnya (seperti bulan, asteroid, komet) yang mengorbit mengelilingi matahari akibat gaya gravitasi.</p>
        <p>Kedelapan planet tersebut secara berurutan dari yang terdekat dengan matahari adalah: **Merkurius, Venus, Bumi (tempat tinggal kita), Mars, Jupiter (planet terbesar), Saturnus (planet bercincin indah), Uranus, dan Neptunus**.</p>
        
        <p><b>B. Rotasi dan Revolusi Bumi:</b></p>
        <p>Bumi kita melakukan dua gerakan perputaran secara bersamaan setiap saat:</p>
        <ul>
          <li><b>Rotasi Bumi (Berputar pada Porosnya):</b> Bumi berputar pada poros kemiringannya sendiri. Satu kali putaran penuh membutuhkan waktu **24 Jam** (1 hari).
            <br><i>Akibat Rotasi Bumi:</i> Terjadinya **Siang dan Malam** (siang pada bagian menghadap matahari, malam pada bagian sebaliknya), terjadinya gerak semu harian matahari, serta perbedaan zona waktu.</li>
          <li><b>Revolusi Bumi (Mengelilingi Matahari):</b> Bumi bergerak mengelilingi matahari dalam lintasan elips (orbit). Satu kali revolusi penuh membutuhkan waktu **365,25 hari** (1 tahun).
            <br><i>Akibat Revolusi Bumi:</i> Terjadinya **Pergantian Musim** (musim kemarau/hujan di Indonesia, atau musim semi/panas/gugur/dingin di belahan utara/selatan), terjadinya gerak semu tahunan matahari, dan perubahan rasi bintang yang terlihat di langit malam.</li>
        </ul>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Pembahasan Ilmu Pengetahuan Alam dan Sosial (IPAS):</b></p>
        <p>Materi <b>${topicName}</b> mengajak kita mengamati lingkungan sekitar secara kritis. Melalui metode sains sederhana, kita dilatih untuk mengamatai fenomena fisik, merumuskan hipotesis, melakukan eksperimen terkontrol, serta menarik kesimpulan ilmiah berdasarkan bukti nyata untuk mengagumi keajaiban ekosistem bumi kita.</p>
      `;
    }

    return `
      <h3>Ayo Membaca & Memahami Pembelajaran IPAS: ${topicName}</h3>
      <p>Ilmu Pengetahuan Alam dan Sosial (IPAS) membantu kita menyingkap keajaiban alam dan kehidupan kemasyarakatan. Hari ini kita membahas topik menarik: <b>${topicName}</b>. Mari kita pelajari bersama secara mendalam!</p>
      
      ${mainExplanation}

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Makna Sains (IPAS):</b> Mempelajari sains mengajarkan kita untuk tidak sekadar percaya begitu saja, melainkan membuktikan segala sesuatu melalui pengamatan jujur dan eksperimen nyata. Mari tumbuhkan rasa ingin tahu kalian untuk kemajuan bangsa!
      </div>
    `;
  }

  if (category === "pancasila") {
    let mainExplanation = "";
    if (lowTopic.includes("perumus") || lowTopic.includes("tokoh") || lowTopic.includes("bpupki") || lowTopic.includes("sejarah")) {
      mainExplanation = `
        <p><b>A. Sejarah Perumusan Pancasila & Sidang BPUPKI:</b></p>
        <p>Pancasila sebagai dasar negara dirumuskan melalui proses musyawarah yang panjang oleh para pendiri bangsa dalam sidang BPUPKI (Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia). Tiga tokoh utama yang mengusulkan rumusan dasar negara adalah:</p>
        <ul>
          <li><b>Moh. Yamin:</b> Mengusulkan gagasan lisan dan tertulis mengenai dasar negara yang mencakup peri kebangsaan, peri kemanusiaan, peri ketuhanan, peri kerakyatan, dan kesejahteraan rakyat.</li>
          <li><b>Soepomo:</b> Menekankan konsep negara persatuan (integralistik) dan kekeluargaan di antara warga negara.</li>
          <li><b>Soekarno:</b> Menyampaikan pidato pada tanggal 1 Juni 1945 yang memperkenalkan nama "Pancasila" sebagai dasar negara Indonesia merdeka.</li>
        </ul>
        <p><b>Semangat Kebersamaan dan Menghargai Perbedaan:</b> Para perumus Pancasila menunjukkan teladan mulia berupa sikap toleransi, kerendahan hati, dan komitmen tinggi untuk menghargai perbedaan pendapat demi tercapainya persatuan dan kemerdekaan bangsa Indonesia.</p>
      `;
    } else if (lowTopic.includes("bullying") || lowTopic.includes("perundungan") || lowTopic.includes("intimidasi")) {
      mainExplanation = `
        <p><b>A. Menghadapi Perundungan (Bullying) dengan Nilai Pancasila:</b></p>
        <p>Perundungan atau bullying adalah tindakan tidak terpuji yang menyakiti fisik, verbal, atau psikologis seseorang secara sengaja dan berulang. Sebagai pelajar Pancasila, kita wajib menolak segala bentuk perundungan dengan menerapkan nilai-nilai Pancasila:</p>
        <ul>
          <li><b>Sila ke-2 (Kemanusiaan yang Adil dan Beradab):</b> Mengajarkan kita untuk saling menghormati harkat dan martabat sesama manusia. Menyakiti atau mengejek teman bertentangan dengan nilai kemanusiaan. Kita harus memperlakukan semua orang dengan kasih sayang dan keadilan.</li>
          <li><b>Sila ke-3 (Persatuan Indonesia):</b> Mengajarkan kita untuk menjaga kerukunan dan persatuan. Tindakan bullying dapat merusak hubungan pertemanan dan memecah belah persatuan di sekolah. Kita harus merangkul semua teman tanpa membeda-bedakan.</li>
        </ul>
        <p><b>Cara Menghadapi Perundungan:</b> Jangan takut untuk melaporkan tindakan bullying kepada guru atau orang tua, hindari membalas dengan kekerasan, dan jadilah penolong bagi teman yang mengalami intimidasi.</p>
      `;
    } else if (lowTopic.includes("keluarga") || lowTopic.includes("rumah") || lowTopic.includes("komitmen")) {
      mainExplanation = `
        <p><b>A. Penerapan Nilai Pancasila di Lingkungan Keluarga:</b></p>
        <p>Keluarga adalah lingkungan pertama tempat kita belajar mempraktikkan nilai-nilai luhur Pancasila. Penerapan komitmen sila ke-1 sampai ke-5 di rumah meliputi:</p>
        <ul>
          <li><b>Sila 1:</b> Berdoa bersama sebelum makan atau beribadah bersama anggota keluarga sebagai wujud ketaatan kepada Tuhan Yang Maha Esa.</li>
          <li><b>Sila 2:</b> Menyayangi dan membantu adik yang sedang belajar, serta menghormati orang tua dengan berbicara sopan.</li>
          <li><b>Sila 3:</b> Menjaga kerukunan antaranggota keluarga, tidak bertengkar dengan saudara, dan menunjukkan rasa cinta terhadap rumah sendiri.</li>
          <li><b>Sila 4:</b> Mengadakan musyawarah keluarga untuk menentukan tujuan liburan atau pembagian tugas merapikan rumah.</li>
          <li><b>Sila 5:</b> Melaksanakan pembagian tugas rumah secara adil dan seimbang sesuai dengan kemampuan masing-masing anggota keluarga, serta berhemat.</li>
        </ul>
      `;
    } else if (lowTopic.includes("simbol") || lowTopic.includes("sila") || lowTopic.includes("pancasila") || lowTopic.includes("lambang")) {
      mainExplanation = `
        <p><b>A. Mengenal Simbol dan Sila Pancasila:</b></p>
        <p>Pancasila adalah dasar negara Indonesia. Lambang Pancasila berbentuk Burung Garuda yang gagah. Di dada Burung Garuda terdapat perisai yang memuat lima simbol sila Pancasila:</p>
        <ul>
          <li><b>Sila 1 (Bintang Emas):</b> Ketuhanan Yang Maha Esa. Mengajarkan kita untuk taat beribadah dan menghormati agama kawan lain.</li>
          <li><b>Sila 2 (Rantai Emas):</b> Kemanusiaan yang Adil dan Beradab. Mengajarkan kita untuk saling menyayangi, tidak memilih kawan, dan sopan kepada sesama.</li>
          <li><b>Sila 3 (Pohon Beringin):</b> Persatuan Indonesia. Mengajarkan kita mencintai tanah air, mencintai produk lokal, dan rukun di tengah keberagaman.</li>
          <li><b>Sila 4 (Kepala Banteng):</b> Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan. Mengajarkan kita untuk bermusyawarah/berdiskusi kelompok secara damai saat mengambil keputusan.</li>
          <li><b>Sila 5 (Padi dan Kapas):</b> Keadilan Sosial bagi Seluruh Rakyat Indonesia. Mengajarkan kita untuk adil membagi tugas, hemat, dan menghargai karya kawan.</li>
        </ul>
      `;
    } else if (lowTopic.includes("aturan") || lowTopic.includes("patuh") || lowTopic.includes("hukum") || lowTopic.includes("tertib")) {
      mainExplanation = `
        <p><b>A. Aturan di Rumah dan di Sekolah:</b></p>
        <p>Aturan adalah tata tertib yang dibuat untuk ditaati agar hidup kita menjadi teratur, aman, dan damai. Aturan ada di mana saja:</p>
        <ul>
          <li><b>Aturan di Rumah:</b> Merapikan tempat tidur setelah bangun tidur, membantu orang tua (menyapu, mencuci piring), berbicara sopan kepada bapak/ibu, dan belajar malam secara teratur.</li>
          <li><b>Aturan di Sekolah:</b> Datang tepat waktu sebelum bel masuk berbunyi, memakai seragam sekolah dengan rapi dan lengkap, memperhatikan saat guru menjelaskan, dan membuang sampah pada tempatnya.</li>
        </ul>
        <p>Jika kita mematuhi aturan, lingkungan menjadi bersih, aman, dan rukun. Sebaliknya, melanggar aturan akan mendatangkan sanksi dan membuat suasana tidak nyaman.</p>
      `;
    } else if (lowTopic.includes("gotong royong") || lowTopic.includes("kerjasama") || lowTopic.includes("bantuan") || lowTopic.includes("bantu") || lowTopic.includes("piket")) {
      mainExplanation = `
        <p><b>A. Semangat Gotong Royong & Kerja Sama:</b></p>
        <p>Gotong royong adalah bekerja bersama-sama dengan orang lain untuk menyelesaikan suatu pekerjaan demi kepentingan bersama tanpa mengharapkan upah/pamrih pribadi. Sikap gotong royong merupakan kepribadian asli bangsa Indonesia yang tertuang dalam Pancasila:</p>
        <ul>
          <li><b>Gotong Royong di Rumah:</b> Bekerja sama membersihkan halaman rumah pada hari Minggu, menyapu ruang tamu bersama adik, atau membantu ibu menyiapkan makan malam di dapur.</li>
          <li><b>Gotong Royong di Sekolah:</b> Melakukan piket kebersihan kelas sesuai jadwal kelompok, bekerja sama mendesain mading kelas, atau membantu teman merapikan buku perpustakaan.</li>
        </ul>
        <p>Manfaat gotong royong sangat besar, antara lain membuat pekerjaan yang berat menjadi terasa lebih ringan, mempercepat selesainya tugas kelompok, serta memupuk rasa persaudaraan dan persatuan antar sesama teman.</p>
      `;
    } else if (lowTopic.includes("keragaman") || lowTopic.includes("beda") || lowTopic.includes("toleransi") || lowTopic.includes("identitas") || lowTopic.includes("suku") || lowTopic.includes("karakteristik")) {
      mainExplanation = `
        <p><b>A. Menghargai Keberagaman dan Sikap Toleransi:</b></p>
        <p>Indonesia memiliki keragaman masyarakat yang sangat kaya. Keberagaman adalah anugerah dari Tuhan Yang Maha Esa yang membuat bangsa kita indah. Bentuk-bentuk keberagaman di sekolah meliputi:</p>
        <ul>
          <li><b>Keragaman Fisik & Karakteristik:</b> Ada teman yang bertubuh tinggi atau pendek, rambut lurus atau keriting, kulit terang atau gelap, serta memiliki hobi yang berbeda-beda.</li>
          <li><b>Keragaman Asal-usul & Agama:</b> Teman kelas berasal dari berbagai daerah/suku bangsa yang berbeda dan memeluk agama/keyakinan yang berbeda pula.</li>
        </ul>
        <p><b>Sikap Toleransi (Saling Menghargai):</b> Kita wajib berteman dengan siapa saja tanpa membeda-bedakan fisik, suku, atau agama. Saling menghargai perbedaan akan menciptakan suasana belajar yang damai, rukun, dan menyenangkan di kelas.</p>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Memahami Nilai-Nilai Karakter Pelajar Pancasila:</b></p>
        <p>Pembelajaran topik <b>${topicName}</b> membimbing kita untuk menerapkan pilar-pilar penting pembentuk karakter Pelajar Pancasila yang mulia dalam kehidupan sehari-hari di rumah, sekolah, maupun di lingkungan masyarakat.</p>
        <p><b>B. Enam Dimensi Profil Pelajar Pancasila:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Beriman & Bertakwa:</b> Taat beribadah dan menghargai keyakinan orang lain secara santun.</li>
          <li><b>Berkebinekaan Global:</b> Mencintai budaya sendiri serta menghormati keberagaman budaya nusantara dan dunia.</li>
          <li><b>Gotong Royong:</b> Terbiasa berkolaborasi secara rukun dalam menyelesaikan masalah kelompok.</li>
          <li><b>Mandiri & Bernalar Kritis:</b> Bertanggung jawab atas proses belajar sendiri dan mampu menyaring informasi secara kritis.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Belajar Pendidikan Pancasila: ${topicName}</h3>
      <p>Pancasila adalah pemersatu bangsa kita. Hari ini kita membahas topik penting: <b>${topicName}</b>. Mempelajari Pancasila menuntun kita menjadi anak yang berakhlak mulia, rukun, dan cinta tanah air.</p>
      
      ${mainExplanation}
 
      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Penerapan Pancasila:</b> Mari kita buktikan kecintaan kita pada Pancasila dengan selalu membantu teman yang kesulitan tanpa membeda-bedakan, menyapa dengan senyuman santun, serta rukun dengan siapa saja!
      </div>
    `;
  }

  if (category === "pjok") {
    let mainExplanation = "";
    if (lowTopic.includes("lokomotor") || lowTopic.includes("gerak") || lowTopic.includes("manipulatif")) {
      mainExplanation = `
        <p><b>A. Tiga Gerak Dasar dalam Olahraga:</b></p>
        <p>Keterampilan gerak tubuh kita dikelompokkan ke dalam tiga kategori gerak dasar utama:</p>
        <ul>
          <li><b>Gerak Lokomotor (Pindah Tempat):</b> Gerakan memindahkan seluruh tubuh dari satu posisi ke posisi lain.
            <br><i>Contoh:</i> Berjalan maju/mundur, berlari cepat ke depan, melompat rintangan, meloncat ke samping.</li>
          <li><b>Gerak Non-Lokomotor (Tanpa Pindah Tempat):</b> Gerakan menggerakkan bagian tubuh tertentu tanpa berpindah posisi tempat tinggal.
            <br><i>Contoh:</i> Meliukkan badan ke kiri/kanan, menekuk lutut, memutar leher/bahu, meregangkan lengan.</li>
          <li><b>Gerak Manipulatif (Menggunakan Alat/Benda):</b> Gerakan memanipulasi atau memainkan suatu objek luar menggunakan anggota tubuh (tangan/kaki).
            <br><i>Contoh:</i> Melempar bola kasti, menangkap bola dengan dua tangan, menendang bola ke gawang, memukul kok bulutangkis.</li>
        </ul>
      `;
    } else if (lowTopic.includes("sehat") || lowTopic.includes("bersih") || lowTopic.includes("kuku") || lowTopic.includes("makan")) {
      mainExplanation = `
        <p><b>A. Menjaga Kebersihan Diri dan Pola Hidup Sehat:</b></p>
        <p>Olahraga akan lebih bermanfaat jika diimbangi dengan kebiasaan hidup bersih dan sehat setiap hari:</p>
        <ul>
          <li><b>Mencuci Tangan:</b> Selalu mencuci tangan menggunakan sabun sebelum menyentuh makanan agar kuman mati.</li>
          <li><b>Mandi dan Keramas:</b> Mandi minimal 2 kali sehari setelah beraktivitas agar kotoran dan keringat tidak menyumbat pori-pori kulit.</li>
          <li><b>Memotong Kuku:</b> Kuku panjang adalah sarang kuman. Potonglah kuku tangan dan kaki secara berkala.</li>
          <li><b>Jajanan Sehat:</b> Pilihlah makanan bergizi (bersih, tertutup rapat) dan hindari makanan pewarna mencolok atau pengawet berlebih.</li>
        </ul>
      `;
    } else if (lowTopic.includes("senam") || lowTopic.includes("keseimbangan") || lowTopic.includes("matras") || lowTopic.includes("titian") || lowTopic.includes("lilin")) {
      mainExplanation = `
        <p><b>A. Aktivitas Senam Lantai & Latihan Keseimbangan:</b></p>
        <p>Senam lantai adalah latihan fisik menggunakan gerakan tubuh yang dilakukan di atas matras. Aktivitas ini sangat baik untuk melatih kekuatan otot, kelenturan persendian, serta keseimbangan statis maupun dinamis:</p>
        <ul>
          <li><b>Latihan Keseimbangan Statis (Diam di Tempat):</b>
            <br>- <b>Sikap Lilin:</b> Berbaring telentang, mengangkat kedua kaki tegak lurus ke atas dengan pinggang ditopang kedua tangan untuk melatih otot perut dan leher.
            <br>- <b>Sikap Kapal Terbang:</b> Berdiri satu kaki, membungkukkan badan ke depan, dan merentangkan kedua tangan ke samping untuk melatih konsentrasi dan kekuatan kaki tumpu.
          </li>
          <li><b>Latihan Keseimbangan Dinamis (Bergerak):</b>
            <br>- <b>Berjalan di Papan Titian:</b> Berjalan perlahan di atas balok kayu sempit tanpa terjatuh untuk melatih koordinasi motorik mata dan kaki.
            <br>- <b>Guling Depan (Roll Depan):</b> Menggulingkan badan ke depan di atas matras diawali dengan tengkuk menyentuh alas terlebih dahulu demi keselamatan leher.
          </li>
        </ul>
      `;
    } else if (lowTopic.includes("irama") || lowTopic.includes("ritmik") || lowTopic.includes("berirama") || lowTopic.includes("musik")) {
      mainExplanation = `
        <p><b>A. Aktivitas Gerak Berirama (Senam Ritmik):</b></p>
        <p>Gerak berirama adalah rangkaian gerakan senam bebas yang dilakukan dengan iringan musik, ketukan tempo, atau hitungan suara secara teratur. Gerak ritmik melatih keselarasan gerak motorik dengan tempo ketukan:</p>
        <ul>
          <li><b>Unsur-Unsur Utama:</b> Kelenturan tubuh, kesinambungan gerakan (kontinuitas), dan ketepatan gerak kaki/tangan dengan tempo musik yang mengiringi.</li>
          <li><b>Variasi Langkah Kaki & Ayunan Lengan:</b> Melangkah maju mundur, melangkah ke samping kanan kiri, mengayunkan lengan ke atas bawah secara melingkar, serta memutar badan seirama ketukan musik.</li>
        </ul>
        <p>Manfaat senam irama antara lain melatih kesehatan jantung, mengembangkan daya tahan fisik, serta memupuk kerja sama kelompok dan rasa gembira saat bergerak bersama teman.</p>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Keterampilan Gerak & Kesehatan Tubuh:</b></p>
        <p>Pembelajaran materi <b>${topicName}</b> bertujuan melatih kekuatan otot, kelenturan sendi, keseimbangan tubuh, serta kedisiplinan kerja sama tim. Tubuh yang aktif bergerak secara teratur akan terhindar dari berbagai penyakit dan membuat pikiran kita tetap segar ceria.</p>
        <p><b>B. Aturan Menjaga Kebugaran Tubuh:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Istirahat yang Cukup:</b> Tidur minimal 8 jam sehari sangat penting bagi pertumbuhan dan pemulihan energi fisik anak.</li>
          <li><b>Konsumsi Air Putih:</b> Biasakan minum minimal 8 gelas air putih sehari agar tubuh tidak mengalami kekurangan cairan (dehidrasi) setelah lelah bergerak.</li>
          <li><b>Olahraga Teratur:</b> Lakukan aktivitas fisik ringan atau bermain di luar rumah minimal 30 menit sehari demi menjaga kelenturan persendian tubuh.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Belajar Penjasorkes (PJOK): ${topicName}</h3>
      <p>Dalam tubuh yang sehat terdapat jiwa yang kuat (*Men sana in corpore sano*). Hari ini kita mendalami materi: <b>${topicName}</b>. Dari gerakan pemanasan yang menyenangkan hingga latihan fisik dengan gembira!</p>
      
      ${mainExplanation}
 
      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Tips Keselamatan Olahraga:</b> Selalu patuhi instruksi guru saat melakukan gerakan fisik. Lakukan peregangan otot secara benar di awal pembelajaran untuk menghindari cedera kaki/tangan!
      </div>
    `;
  }

  if (category === "senirupa") {
    let mainExplanation = "";
    if (lowTopic.includes("warna") || lowTopic.includes("garis") || lowTopic.includes("bentuk") || lowTopic.includes("rupa")) {
      mainExplanation = `
        <p><b>A. Unsur-Unsur Rupa: Garis, Warna, dan Bentuk:</b></p>
        <p>Seni rupa disusun oleh berbagai unsur dasar rupa yang dikombinasikan secara kreatif:</p>
        <ul>
          <li><b>Garis:</b> Goresan kuas atau pensil yang memiliki dimensi memanjang. Macam-macam garis: garis lurus (kesan kaku/tegak), garis lengkung (kesan luwes), garis zig-zag (kesan dinamis/tajam), garis spiral.</li>
          <li><b>Warna Primer:</b> Warna dasar yang tidak dapat dibuat dari campuran warna lain. Terdiri dari **Merah, Kuning, dan Biru**.</li>
          <li><b>Warna Sekunder:</b> Warna campuran dari dua warna primer. Contoh: Hijau (kuning + biru), Jingga (merah + kuning), Ungu (merah + biru).</li>
          <li><b>Bentuk Geometris:</b> Bentuk teratur seperti Segitiga, Lingkaran, Persegi, Kubus, dan Tabung.</li>
        </ul>
      `;
    } else if (lowTopic.includes("kolase") || lowTopic.includes("tempel") || lowTopic.includes("alam") || lowTopic.includes("karya")) {
      mainExplanation = `
        <p><b>A. Membuat Karya Seni Kolase dari Bahan Alam:</b></p>
        <p>Kolase adalah teknik menempelkan berbagai macam bahan (seperti kertas, kain, biji-bijian, atau daun kering) pada permukaan gambar untuk membentuk suatu karya seni yang memiliki tekstur unik.</p>
        <p><b>Bahan-Bahan yang Digunakan:</b> Daun kering beraneka warna, ranting pohon kecil, biji kacang hijau, beras warna-warni, serta lem kertas yang kuat.</p>
        <p><b>Langkah Pembuatan:</b> Buatlah sketsa hewan/pemandangan menggunakan pensil pada kertas gambar, gunting daun kering sesuai pola sketsa, oleskan lem tipis-tipis, lalu tempelkan bahan alam satu per satu hingga menutupi seluruh sketsa secara rapi.</p>
      `;
    } else if (lowTopic.includes("ekspresi") || lowTopic.includes("sketsa") || lowTopic.includes("gambar") || lowTopic.includes("wajah") || lowTopic.includes("potret")) {
      mainExplanation = `
        <p><b>A. Menggambar Ekspresi Wajah & Membuat Sketsa Halus:</b></p>
        <p>Wajah manusia dapat mengekspresikan berbagai perasaan secara visual. Menggambar ekspresi wajah melatih sensitivitas kita dalam menangkap detail emosi:</p>
        <ul>
          <li><b>Proporsi Wajah Sederhana:</b> Letak mata berada di tengah kepala, hidung berada di antara mata dan dagu, sedangkan mulut berada di bawah hidung. Telinga terletak sejajar dengan mata hingga hidung.</li>
          <li><b>Detail Ekspresi Emosi Dasar:</b>
            <br>- <b>Senang:</b> Mulut melengkung ke atas (tersenyum) dan kelopak mata sedikit menyipit riang.
            <br>- <b>Sedih:</b> Mulut melengkung ke bawah (cemberut) dan ada tetesan air mata.
            <br>- <b>Marah:</b> Kedua ujung alis ditarik mendekat ke bawah membentuk sudut tajam di dahi.
          </li>
        </ul>
        <p><b>Membuat Sketsa:</b> Gambar sketsa awal menggunakan coretan pensil tipis secara halus agar mudah dihapus atau diperbaiki jika terjadi kekeliruan proporsi.</p>
      `;
    } else if (lowTopic.includes("3d") || lowTopic.includes("konstruksi") || lowTopic.includes("miniatur") || lowTopic.includes("clay") || lowTopic.includes("dimensi")) {
      mainExplanation = `
        <p><b>A. Membuat Karya Konstruksi 3D dan Kerajinan Clay:</b></p>
        <p>Karya seni tiga dimensi (3D) memiliki panjang, lebar, tinggi, serta volume ruang nyata yang dapat kita lihat dari berbagai arah pandang:</p>
        <ul>
          <li><b>Seni Konstruksi:</b> Merakit bahan-bahan keras atau bekas menjadi sebuah model struktur baru yang kokoh dan indah.
          <br><i>Contoh:</i> Membuat miniatur rumah adat atau gedung sekolah dari kotak kardus bekas, stik es krim, dan tusuk sate.</li>
          <li><b>Kerajinan Clay (Adonan Tepung):</b> Membentuk objek menggunakan adonan lunak elastis yang terbuat dari campuran tepung terigu, tepung tapioka, lem putih, dan pewarna makanan.
          <br><i>Cara Membentuk:</i> Memijat, meremas, memilin, dan memotong adonan clay menjadi bentuk buah-buahan kecil, miniatur binatang, atau gantungan kunci kreatif.</li>
        </ul>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Mengeksplorasi Kreativitas Seni Rupa:</b></p>
        <p>Pembelajaran seni rupa topik <b>${topicName}</b> melatih kepekaan estetik mata kita, mengasah keterampilan motorik halus tangan saat memegang alat lukis/lem, serta membangun imajinasi kreatif untuk mengagumi keindahan harmoni warna di lingkungan sekitar kita.</p>
        <p><b>B. Teknik Menghasilkan Karya Estetik:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Keseimbangan (Balance):</b> Atur objek gambar agar tersebar secara proporsional di seluruh area kertas gambar.</li>
          <li><b>Kesatuan (Unity):</b> Padukan warna latar belakang dengan objek utama secara serasi agar lukisan terlihat menyatu indah.</li>
          <li><b>Kebersihan Karya:</b> Jaga kebersihan lembar gambar dari coretan pensil yang tidak perlu dan pastikan lem menempel rapi.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Belajar Seni Rupa Kreatif: ${topicName}</h3>
      <p>Seni adalah cara kita mengekspresikan keindahan perasaan dan ide kreatif kita. Hari ini kita mendalami materi tentang: <b>${topicName}</b>. Ayo siapkan alat-alat gambarmu secara tertib!</p>
      
      ${mainExplanation}

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Apresiasi Seni:</b> Tidak ada karya seni yang salah. Hargailah keunikan gambarmu sendiri dan berikan pujian santun kepada karya teman sekelasmu sebagai bentuk saling menghargai!
      </div>
    `;
  }

  if (category === "pai") {
    let mainExplanation = "";
    if (lowTopic.includes("wudu") || lowTopic.includes("salat") || lowTopic.includes("suci")) {
      mainExplanation = `
        <p><b>A. Tata Cara Bersuci (Wudu) dan Salat Fardhu:</b></p>
        <p>Islam sangat mencintai kesucian dan kebersihan. Sebelum melaksanakan salat fardhu, kita wajib melakukan bersuci menggunakan air bersih mengalir yang disebut **Wudu**.</p>
        <p><b>Rukun-Rukun Berwudu secara Tertib:</b></p>
        <ol style="line-height: 1.6;">
          <li>Niat berwudu membasuh muka.</li>
          <li>Membasuh kedua tangan hingga ke siku.</li>
          <li>Mengusap sebagian rambut kepala.</li>
          <li>Membasuh kedua kaki hingga ke mata kaki secara tertib/berurutan.</li>
        </ol>
        <p>Salat fardhu dilakukan 5 kali sehari: **Subuh (2 rakaat), Dzuhur (4 rakaat), Ashar (4 rakaat), Maghrib (3 rakaat), dan Isya (4 rakaat)**. Gerakan salat harus dilakukan dengan tenang dan khusyuk (*tuma'ninah*).</p>
      `;
    } else if (lowTopic.includes("iman") || lowTopic.includes("islam") || lowTopic.includes("asmaul")) {
      mainExplanation = `
        <p><b>A. Rukun Iman, Rukun Islam, dan Asmaul Husna:</b></p>
        <p>Pilar utama keyakinan kita sebagai muslim terdiri dari:</p>
        <ul>
          <li><b>6 Rukun Iman:</b> Iman kepada Allah SWT, Malaikat-Nya, Kitab-Kitab-Nya, Rasul-Rasul-Nya, Hari Kiamat, serta Qada dan Qadar.</li>
          <li><b>5 Rukun Islam:</b> Mengucapkan Dua Kalimat Syahadat, Mendirikan Salat Fardhu, Membayar Zakat, Menjalankan Ibadah Puasa Ramadhan, serta Menunaikan Ibadah Haji bagi yang mampu.</li>
          <li><b>Asmaul Husna (Nama Baik Allah):</b>
            <ul>
              <li><b>Ar-Rahman:</b> Allah Maha Pengasih kepada seluruh makhluk di bumi.</li>
              <li><b>Ar-Rahim:</b> Allah Maha Penyayang khusus kepada orang-orang yang beriman.</li>
              <li><b>Al-Khaliq:</b> Allah Maha Pencipta seluruh alam semesta.</li>
              <li><b>Al-Quddus:</b> Allah Maha Suci dari segala kekurangan.</li>
            </ul>
          </li>
        </ul>
      `;
    } else if (lowTopic.includes("akhlak") || lowTopic.includes("jujur") || lowTopic.includes("puji") || lowTopic.includes("pemaaf") || lowTopic.includes("kasih") || lowTopic.includes("sayang")) {
      mainExplanation = `
        <p><b>A. Perilaku Terpuji (Akhlakul Karimah) & Sifat Mulia:</b></p>
        <p>Akhlak mulia adalah perilaku baik yang diajarkan oleh Rasulullah SAW untuk kita terapkan dalam berinteraksi dengan sesama makhluk hidup:</p>
        <ul>
          <li><b>Jujur (Shiddiq):</b> Berkata apa adanya sesuai kenyataan riil dan tidak berbohong. Jujur mendatangkan ketenangan hati dan dipercaya orang lain.
          <br><i>Contoh:</i> Tidak mencontek saat ujian, mengakui kesalahan saat memecahkan vas bunga.</li>
          <li><b>Pemaaf:</b> Berlapang dada memaafkan kesalahan orang lain tanpa ada rasa dendam di hati.
          <br><i>Contoh:</i> Memaafkan teman yang tidak sengaja menyenggol badan kita hingga terjatuh saat bermain.</li>
          <li><b>Kasih Sayang:</b> Menyayangi sesama manusia, hewan peliharaan, dan tanaman di lingkungan sekitar.
          <br><i>Contoh:</i> Membantu adik belajar, menyiram bunga layu, menyuapi kucing liar yang kelaparan.</li>
        </ul>
      `;
    } else if (lowTopic.includes("nabi") || lowTopic.includes("kisah") || lowTopic.includes("rasul")) {
      mainExplanation = `
        <p><b>A. Kisah Keteladanan Moral Para Nabi dan Rasul:</b></p>
        <p>Nabi dan Rasul adalah utusan Allah SWT yang memiliki sifat maksum (terjaga dari dosa) untuk mendidik umat manusia ke jalan kebenaran. Kita wajib meneladani keteguhan moral mereka:</p>
        <ul>
          <li><b>Nabi Adam a.s.:</b> Mengajarkan kita untuk segera bertaubat, mengakui kesalahan secara jujur, dan memohon ampunan Allah SWT jika berbuat khilaf.</li>
          <li><b>Nabi Nuh a.s.:</b> Mengajarkan ketabahan, kesabaran dalam berdakwah, serta kasih sayang merawat hewan saat membuat bahtera penyelamat.</li>
          <li><b>Nabi Ibrahim a.s.:</b> Mengajarkan keteguhan tauhid (keimanan), keberanian menegakkan kebenaran melawan kezaliman, serta ketaatan mutlak kepada perintah Allah SWT.</li>
          <li><b>Nabi Muhammad SAW:</b> Utusan terakhir (Khatamul Anbiya) yang diutus untuk menyempurnakan akhlak mulia kemanusiaan. Memiliki gelar **Al-Amin** (yang tepercaya).</li>
        </ul>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Pembelajaran Pendidikan Agama Islam & Budi Pekerti:</b></p>
        <p>Materi <b>${topicName}</b> membimbing kita untuk mengenal keagungan syariat Islam, meneladani akhlak mulia para nabi dan rasul (seperti sifat jujur, amanah, pemaaf, dan menyayangi sesama makhluk hidup), serta melatih pembiasaan ibadah harian secara ikhlas dan tertib.</p>
        <p><b>B. Kunci Hidup Berkah Islami:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Taat Beribadah:</b> Menjaga salat fardu tepat waktu guna melatih kedisiplinan dan kebersihan jiwa dari dosa.</li>
          <li><b>Berbakti Kepada Orang Tua (Birrul Walidain):</b> Berbicara lemah lembut, membantu pekerjaan rumah, serta selalu mendoakan keselamatan mereka.</li>
          <li><b>Adab Menuntut Ilmu:</b> Berdoa sebelum belajar dan mendengarkan penjelasan guru secara takzim/sopan di kelas.</li>
        </ul>
      `;
    }

    return `
      <h3>Ayo Belajar Pendidikan Agama Islam (PAI): ${topicName}</h3>
      <p>Menuntut ilmu adalah kewajiban suci bagi setiap muslim. Hari ini kita mendalami materi tentang: <b>${topicName}</b>. Semoga Allah SWT memudahkan kita untuk memahaminya dan mengamalkannya dalam perilaku sehari-hari.</p>
      
      ${mainExplanation}
 
      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 Akhlak Mulia:</b> Kebersihan dan kesucian lahiriah dari wudu harus diimbangi dengan kesucian batiniah (seperti berkata jujur, menjauhi perilaku sombong, dan rajin menolong teman).
      </div>
    `;
  }

  if (category === "english") {
    let mainExplanation = "";
    if (lowTopic.includes("greeting") || lowTopic.includes("introduce") || lowTopic.includes("name")) {
      mainExplanation = `
        <p><b>A. Greetings and Introductions:</b></p>
        <p>Learning English helps us connect with friends worldwide! When meeting someone for the first time, we use polite greetings and introduce ourselves clearly:</p>
        <ul>
          <li><b>Greetings (Kata Sapaan):</b> "Hello!", "Good morning" (Selamat pagi), "Good afternoon" (Selamat siang/sore), "Good evening" (Selamat malam).</li>
          <li><b>Self-Introduction (Perkenalan Diri):</b>
            <br>- <i>"What is your name?"</i> (Siapa namamu?)
            <br>- <i>"My name is Budi."</i> (Nama saya Budi.)
            <br>- <i>"How old are you?"</i> (Berapa umurmu?)
            <br>- <i>"I am seven years old."</i> (Saya berumur tujuh tahun.)
            <br>- <i>"Nice to meet you!"</i> (Senang bertemu denganmu!)
          </li>
        </ul>
      `;
    } else if (lowTopic.includes("school") || lowTopic.includes("thing") || lowTopic.includes("classroom") || lowTopic.includes("pencil") || lowTopic.includes("bag") || lowTopic.includes("book") || lowTopic.includes("desk")) {
      mainExplanation = `
        <p><b>A. Vocabulary: School Things & Classroom Objects:</b></p>
        <p>There are many interesting objects we can find in our classroom. Let's learn their English names so we can use them in daily conversations:</p>
        <ul>
          <li><b>Pencil:</b> Pensil (used for writing and drawing).</li>
          <li><b>Book:</b> Buku (used for reading and writing notes).</li>
          <li><b>Eraser:</b> Penghapus (used to clean pencil marks).</li>
          <li><b>Ruler:</b> Penggaris (used to draw straight lines).</li>
          <li><b>Bag / Backpack:</b> Tas (used to carry our books and stationeries).</li>
          <li><b>Desk and Chair:</b> Meja dan Kursi (where we sit and study comfortably).</li>
        </ul>
        <p><b>B. Simple Phrases:</b></p>
        <ul>
          <li><i>"May I borrow your pencil, please?"</i> (Bolehkah saya meminjam pensilmu?)</li>
          <li><i>"Sure, here it is."</i> (Tentu, ini dia.)</li>
          <li><i>"Thank you!" - "You are welcome."</i> (Terima kasih! - Sama-sama.)</li>
        </ul>
      `;
    } else if (lowTopic.includes("family") || lowTopic.includes("father") || lowTopic.includes("mother") || lowTopic.includes("parent") || lowTopic.includes("brother") || lowTopic.includes("sister")) {
      mainExplanation = `
        <p><b>A. Vocabulary: My Beloved Family Members:</b></p>
        <p>We live together with our family members at home. Let's learn how to call them in English:</p>
        <ul>
          <li><b>Father:</b> Ayah (heads the family and guides us).</li>
          <li><b>Mother:</b> Ibu (nurtures and cares for us with love).</li>
          <li><b>Brother:</b> Saudara laki-laki (older brother = kakak laki-laki, younger brother = adik laki-laki).</li>
          <li><b>Sister:</b> Saudara perempuan (older sister = kakak perempuan, younger sister = adik perempuan).</li>
          <li><b>Grandfather and Grandmother:</b> Kakek dan Nenek (our parents' father and mother).</li>
          <li><b>Parents:</b> Orang tua (Father and Mother).</li>
        </ul>
        <p><b>B. Describing Our Family:</b></p>
        <ul>
          <li><i>"This is my father. His name is Mr. Joko."</i> (Ini ayah saya. Nama beliau Pak Joko.)</li>
          <li><i>"I love my mother. She is very kind."</i> (Saya sayang ibu saya. Beliau sangat baik.)</li>
          <li><i>"How many brothers or sisters do you have?"</i> (Berapa banyak saudara laki-laki atau perempuan yang kamu miliki?)</li>
        </ul>
      `;
    } else if (lowTopic.includes("animal") || lowTopic.includes("pet") || lowTopic.includes("cat") || lowTopic.includes("dog") || lowTopic.includes("bird") || lowTopic.includes("fish")) {
      mainExplanation = `
        <p><b>A. Vocabulary: Animals Around Us (Pets and Wild Animals):</b></p>
        <p>Animals are beautiful creatures of God. Let's learn their names and how they sound in English:</p>
        <ul>
          <li><b>Cat:</b> Kucing (says <i>"meow-meow"</i> and loves to play).</li>
          <li><b>Dog:</b> Anjing (says <i>"woof-woof"</i> and is very loyal).</li>
          <li><b>Bird:</b> Burung (can fly high and sing sweet songs).</li>
          <li><b>Fish:</b> Ikan (swims gracefully in water or aquariums).</li>
          <li><b>Rabbit:</b> Kelinci (hops around and loves eating carrots).</li>
          <li><b>Cow and Goat:</b> Sapi dan Kambing (farm animals that eat grass).</li>
        </ul>
        <p><b>B. Simple Sentences:</b></p>
        <ul>
          <li><i>"Do you have a pet?"</i> (Apakah kamu punya hewan peliharaan?)</li>
          <li><i>"Yes, I have a cat. Its name is Whiskers."</i> (Ya, saya punya seekor kucing. Namanya Whiskers.)</li>
          <li><i>"The bird is flying in the sky."</i> (Burung itu sedang terbang di langit.)</li>
        </ul>
      `;
    } else {
      mainExplanation = `
        <p><b>A. Vocabulary Expansion:</b></p>
        <p>In this unit about <b>${topicName}</b>, we expand our English vocabulary and practice listening, speaking, reading, and writing skills. Let's learn some useful terms and expressions related to this topic:</p>
        <ul>
          <li><b>Vocabulary Building:</b> We learn how to name objects, identify actions, and describe situations related to <b>${topicName}</b> in correct English.</li>
          <li><b>Pronunciation:</b> Practice pronouncing each word clearly, paying attention to vowels, consonants, and word stress.</li>
          <li><b>Contextual Use:</b> Try to construct short, simple sentences using our new vocabulary to talk about ourselves and our surroundings.</li>
        </ul>
        <p><b>B. Daily Conversation Snippets:</b></p>
        <ul>
          <li><i>"What is this?" - "This is a ${topicName}."</i> (Apa ini? - Ini adalah ${topicName}.)</li>
          <li><i>"Can you show me?" - "Yes, of course."</i> (Bisakah kamu tunjukkan pada saya? - Ya, tentu saja.)</li>
          <li><i>"Let's practice together!"</i> (Mari kita berlatih bersama!)</li>
        </ul>
      `;
    }

    return `
      <h3>Let's Learn English: ${topicName}</h3>
      <p>Hello students! English is a global language that is very fun to learn. Today we are going to study: <b>${topicName}</b>. Let's practice speaking English together with confidence!</p>
      
      ${mainExplanation}

      <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
        <b>💡 English Practice:</b> Don't be afraid of making mistakes when speaking English! Practice makes perfect. Try greeting your English teacher and classmates in English today!
      </div>
    `;
  }

  // Default fallback for other local muatan lokal or special subjects
  return `
    <h3>Ayo Membaca & Memahami Pembelajaran: ${topicName}</h3>
    <p>Belajar materi <b>${topicName}</b> melatih wawasan, kepekaan sosial, nilai-nilai karakter Pancasila, serta keterampilan hidup kita. Mari kita telaah topik ini secara mendalam!</p>
    
    <p><b>A. Mengapa Pembelajaran Ini Sangat Penting?</b></p>
    <p>Materi <b>${topicName}</b> mengajarkan kita aturan, kebiasaan baik, dan cara berinteraksi secara harmonis dengan lingkungan sekitar kita. Melalui pemahaman yang kuat, kita tidak hanya menghafal materi di atas kertas, tetapi juga dapat mempraktikkannya secara nyata di kehidupan sehari-hari (di rumah, sekolah, maupun masyarakat).</p>
    
    <p><b>B. Poin-Poin Inti yang Harus Dipahami:</b></p>
    <ul>
      <li><b>Konsep Utama:</b> Mengetahui fakta penting, istilah kunci, serta alur gagasan dari materi ${topicName}.</li>
      <li><b>Implementasi Nyata:</b> Menghubungkan teori pembelajaran dengan aktivitas sehari-hari kita secara rasional.</li>
      <li><b>Pengembangan Karakter:</b> Menerapkan sikap jujur, gotong royong, mandiri, dan bernalar kritis dari proses belajar ini.</li>
    </ul>

    <div style="background-color: var(--primary-light); padding: 15px; border-left: 5px solid var(--primary); border-radius: 6px; margin: 15px 0; font-size: 13px; line-height: 1.5;">
      <b>💡 Refleksi Karakter:</b> Mempelajari <b>${topicName}</b> mengarahkan kita menjadi Profil Pelajar Pancasila yang tangguh, berakhlak mulia, dan siap berkontribusi positif bagi nusa dan bangsa!
    </div>
  `;
}
// ----------------------------------------------------
// DYNAMIC COMPREHENSIVE LKPD GENERATOR
// ----------------------------------------------------
function generateDetailedLkpd(category, topicName, subjectId) {
  const lowTopic = topicName.toLowerCase();
  const meetingNum = state.selectedMeetingNum || 1;
  const qa = getTopicSpecificQA(subjectId, topicName);
  let lkpdHtml = "";
  let subTitle = `LKPD: Tantangan Belajar`;
  let desc = `Topik: ${topicName} (Pertemuan ${meetingNum})`;

  if (category === "matematika") {
    subTitle = "LKPD: Tantangan Matematika Ceria";
    
    // Level 1: Specific Subtopic Matching
    if (lowTopic.includes("10.000") || lowTopic.includes("digit") || lowTopic.includes("ribuan") || (lowTopic.includes("cacah") && !lowTopic.includes("100"))) {
      subTitle = "LEMBAR KERJA PESERTA DIDIK (LKPD)";
      desc = `Mata Pelajaran: Matematika | Materi: Bilangan Cacah sampai 10.000`;
      lkpdHtml = `
        <p><b>A. Petunjuk Diskusi Kelompok:</b><br>
        1. Siapkan paket kertas karton berukuran 10x10 cm yang telah disediakan guru.<br>
        2. Tuliskan angka 0 s.d 9 menggunakan spidol warna di setiap kertas hingga membentuk kartu bilangan.<br>
        3. Selesaikan persoalan tantangan belanja di bawah ini dengan berdiskusi bersama.</p>
        
        <p><b>B. Tantangan Kelompok: Kasus Belanja Slamet</b><br>
        Slamet membeli biskuit dan beberapa makanan ringan di warung Ibu Helen seharga Rp7.350,00. Slamet membayar menggunakan selembar uang pecahan Rp9.500,00. Dari pembayaran tersebut, Slamet menerima uang kembalian sebesar Rp2.150,00.</p>
        
        <p>1. Susunlah angka-angka yang membentuk harga makanan ringan Slamet (7.350) ke dalam tabel nilai tempat berikut:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0; text-align: center;">
          <thead>
            <tr style="background-color: var(--primary-light); color: var(--primary);">
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Ribuan</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Ratusan</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Puluhan</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Satuan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
            </tr>
          </tbody>
        </table>
        <p>Cara Membaca Bilangan 7.350 adalah:<br>
        <b>Jawaban:</b> ...........................................................................................................................................................</p>
        
        <p>2. Susunlah nominal kembalian uang Slamet (2.150) ke dalam tabel nilai tempat berikut:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0; text-align: center;">
          <thead>
            <tr style="background-color: var(--primary-light); color: var(--primary);">
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Ribuan</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Ratusan</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Puluhan</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; width: 25%;">Satuan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
              <td style="border: 1px solid var(--border-color); padding: 12px; font-weight: bold; font-size: 14px;">.....</td>
            </tr>
          </tbody>
        </table>
        <p>Cara Membaca Bilangan 2.150 adalah:<br>
        <b>Jawaban:</b> ...........................................................................................................................................................</p>
        
        <p><b>C. Tantangan Menulis Bilangan (Geografi Indonesia):</b><br>
        Bacalah teks berikut dengan teliti bersama kelompokmu!<br>
        <i>"Indonesia adalah wilayah yang kaya akan gunung berapi aktif. Salah satu gunung yang terkenal adalah Gunung Sinabung di Pulau Sumatra yang memiliki ketinggian dua ribu empat ratus enam puluh meter di atas permukaan laut. Selain itu, ada pula Gunung Rinjani di Pulau Lombok yang menjulang setinggi tiga ribu tujuh ratus dua puluh enam meter di atas permukaan laut."</i></p>
        
        <p>Bantulah Badan Geologi untuk menuliskan lambang angka ketinggian gunung tersebut:<br>
        - Ketinggian Gunung Sinabung (dua ribu empat ratus  enam puluh) ditulis angkanya = <b>........................ meter</b><br>
        - Ketinggian Gunung Rinjani (tiga ribu tujuh ratus dua puluh enam) ditulis angkanya = <b>........................ meter</b></p>
      `;
    } else if (lowTopic.includes("1 sampai 5") || lowTopic.includes("1-5")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Menghitung dan menuliskan lambang bilangan 1 sampai 5 menggunakan benda konkret.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Ambil kancing baju yang diberikan guru.<br>2. Hitung jumlahnya (1 hingga 5).<br>3. Tuliskan lambang bilangannya.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Gambar di samping menunjukkan 3 buah apel. Lambang bilangannya adalah...<br>A. 2<br>B. 3<br>C. 4<br><br>
        2. Bilangan setelah angka 4 adalah...<br>A. 3<br>B. 5<br>C. 2</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Gambarlah bintang sebanyak 5 buah di dalam kotak jawabanmu!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Carilah benda di kelas yang jumlahnya tepat 2 buah, tunjukkan ke gurumu!</p>
      `;
    } else if (lowTopic.includes("6 sampai 10") || lowTopic.includes("6-10")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Menghitung dan menuliskan lambang bilangan 6 sampai 10.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Kumpulkan stik es krim sebanyak 10 buah.<br>2. Hitung kelompok stik 6, 7, 8, 9, dan 10.<br>3. Tuliskan angkanya dengan rapi.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Angka setelah 8 dan sebelum 10 adalah...<br>A. 7<br>B. 9<br>C. 6<br><br>
        2. Hitung jumlah jari pada dua tangan kita yang mengepal kecuali ibu jari kiri (jumlah 9). Lambang angkanya...<br>A. 8<br>B. 9<br>C. 10</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan urutan angka mundur dari 10 sampai 6!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Kumpulkan 8 pensil dari anggota kelompokmu, susun melingkar di atas meja!</p>
      `;
    } else if (lowTopic.includes("membandingkan") || lowTopic.includes("lebih banyak") || lowTopic.includes("lebih sedikit")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Membandingkan jumlah dua kelompok benda menggunakan istilah "lebih banyak", "lebih sedikit", atau "sama banyak".</p>
        <p><b>B. Langkah Kerja:</b><br>1. Kelompokkan stik es krim: Kelompok A berisi 5 stik, Kelompok B berisi 3 stik.<br>2. Bandingkan kedua kelompok tersebut.<br>3. Tuliskan kesimpulannya.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Kotak A berisi 7 kelereng. Kotak B berisi 9 kelereng. Maka Kotak A... dari Kotak B.<br>A. Lebih banyak<br>B. Lebih sedikit<br>C. Sama banyak<br><br>
        2. Kumpulan 4 buah buku ... dengan 4 buah pensil.<br>A. Lebih banyak<br>B. Lebih sedikit<br>C. Sama banyak</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Jika Kelompok C memiliki 8 buah kelereng dan Kelompok D memiliki 5 buah kelereng, kelompok manakah yang lebih sedikit? Mengapa?</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Bandingkan jumlah sepatu kelompokmu dengan kelompok sebelah. Catat kelompok mana yang sepatunya lebih banyak!</p>
      `;
    } else if (lowTopic.includes("menulis angka") || lowTopic.includes("lambang bilangan")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Menulis lambang bilangan dan nama bilangan secara benar.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Amati cara guru menulis angka di papan tulis.<br>2. Tebalkan angka yang ada di lembar tugas.<br>3. Tuliskan nama bilangannya.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Lambang bilangan dari nama bilangan "Delapan" adalah...<br>A. 6<br>B. 8<br>C. 9<br><br>
        2. Nama bilangan untuk angka "0" adalah...<br>A. Nol<br>B. Satu<br>C. Kosong</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan nama bilangan dari angka 7, 3, dan 10!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Bermain tebak angka: Satu anak menulis angka di punggung temannya, teman tersebut menebak angkanya!</p>
      `;
    } else if (lowTopic.includes("pasangan")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Menemukan pasangan bilangan (number bonds) yang membentuk angka tertentu.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Siapkan 5 butir kancing.<br>2. Bagilah 5 kancing tersebut ke dalam 2 wadah berbeda.<br>3. Temukan berbagai kombinasi pasangan angka.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Pasangan bilangan yang membentuk angka 5 adalah...<br>A. 2 dan 3<br>B. 1 dan 3<br>C. 4 dan 2<br><br>
        2. Jika satu bagian adalah 3, dan bagian lainnya adalah 4, maka jumlahnya adalah...<br>A. 6<br>B. 7<br>C. 8</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Lengkapi titik-titik berikut: Angka 6 dapat terbentuk dari pasangan 4 dan ...</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Diskusikan dengan kelompokmu semua pasangan angka yang dapat membentuk bilangan 10!</p>
      `;
    } else {
      // Level 2: Meeting Index Falling back (for Matematika)
      lkpdHtml = qa.lkpdExercises;
    }
  } else if (category === "indonesia") {
    subTitle = "LKPD: Literasi Bahasa Indonesia";
    
    // Level 1: Specific Subtopic Matching
    if (lowTopic.includes("bunyi alam") || lowTopic.includes("bunyi buatan") || lowTopic.includes("bunyi apa")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Mengidentifikasi bunyi alam dan bunyi buatan di lingkungan sekitar sekolah.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Pejamkan matamu selama 1 menit (Teknik STOP).<br>2. Dengarkan baik-baik semua suara.<br>3. Tuliskan 1 contoh bunyi alam dan 1 contoh bunyi buatan yang kamu dengar.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Suara petir menyambar merupakan contoh bunyi...<br>A. Buatan<br>B. Alam<br>C. Musik<br><br>
        2. Bunyi "kring-kring-kring" dari sepeda termasuk bunyi...<br>A. Alam<br>B. Buatan<br>C. Kewan</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Bagaimanakah tiruan suara kucing mengeong? Tuliskan kata tiruan suaranya!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Peragakan bunyi buatan menggunakan benda-benda yang ada di dalam kelas secara bergotong royong!</p>
      `;
    } else if (lowTopic.includes("huruf abjad") || lowTopic.includes("vokal") || lowTopic.includes("konsonan")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Membedakan huruf vokal dan huruf konsonan dalam suku kata.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Amati huruf-huruf abjad A sampai Z.<br>2. Klasifikasikan huruf vokal (a, i, u, e, o) dan konsonan.<br>3. Tuliskan pada kolom yang tepat.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Huruf di bawah ini yang merupakan huruf vokal adalah...<br>A. b<br>B. o<br>C. k<br><br>
        2. Pada kata "BOLA", huruf konsonannya adalah...<br>A. B dan L<br>B. O dan A<br>C. B dan O</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Sebutkan 5 huruf vokal secara lengkap dan berurutan!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Susunlah nama kelompokmu menggunakan huruf vokal berwarna merah dan konsonan berwarna biru!</p>
      `;
    } else if (lowTopic.includes("suku kata") || lowTopic.includes("bo-") || lowTopic.includes("la-")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Membaca dan merangkai suku kata awalan 'bo-' dan 'la-' menjadi kata bermakna.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Siapkan kartu suku kata 'bo', 'la', 'ca', 'bi'.<br>2. Rangkailah suku kata tersebut menjadi sebuah kata.<br>3. Bacalah kata tersebut dengan nyaring.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Suku kata 'bo-' jika digabung dengan suku kata 'la-' akan menjadi kata...<br>A. Buka<br>B. Bola<br>C. Bulu<br><br>
        2. Gambar "Botol" memiliki suku kata awal yaitu...<br>A. bo-<br>B. ba-<br>C. be-</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan 3 kata benda yang diawali dengan suku kata 'la-'!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Lomba menyusun suku kata acak menjadi nama-nama buah bersama teman kelompokmu!</p>
      `;
    } else if (lowTopic.includes("menulis nama")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Menuliskan nama diri sendiri dengan ejaan huruf kapital yang benar di awal nama.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Tuliskan nama panggilanmu dengan rapi.<br>2. Gunakan huruf kapital untuk huruf pertama namamu.<br>3. Hitung jumlah huruf dalam namamu.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Penulisan nama diri yang benar menggunakan huruf kapital di awal adalah...<br>A. budi<br>B. Budi<br>C. buDi<br><br>
        2. Mengapa huruf pertama nama orang harus ditulis dengan huruf kapital?<br>A. Agar terlihat indah<br>B. Sesuai dengan aturan tata bahasa Indonesia yang benar<br>C. Biar mudah dibaca dari jauh</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan nama lengkapmu sendiri beserta nama teman sebangkumu dengan huruf kapital di awal kata secara tepat!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Tuliskan nama-nama seluruh anggota kelompokmu pada lembar kertas kerja besar, lalu hiaslah dengan gambar bunga/bintang!</p>
      `;
    } else if (lowTopic.includes("kuman") || lowTopic.includes("cuci tangan")) {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Memahami cara menghalau kuman penyakit dengan mencuci tangan menggunakan sabun secara benar.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Amati gambar 6 langkah mencuci tangan bersih.<br>2. Diskusikan pentingnya mencuci tangan sebelum makan.<br>3. Urutkan langkah mencuci tangan di lembar kerja.</p>
        <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
        1. Kuman penyakit sangat menyukai tangan kita yang...<br>A. Bersih dan wangi<br>B. Kotor dan berdebu<br>C. Basah karena sabun<br><br>
        2. Mencuci tangan yang aman sebaiknya menggunakan air bersih yang...<br>A. Menggenang di ember<br>B. Mengalir deras dan memakai sabun<br>C. Berwarna keruh</p>
        <p><b>D. Tantangan 2: Uraian</b><br>Sebutkan 2 waktu penting di mana kita wajib mencuci tangan kita!</p>
        <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Praktikkan langkah mencuci tangan bersih secara berurutan di wastafel sekolah bersama teman sekelompokmu!</p>
      `;
    } else {
      // Level 2: Meeting Index Falling back (for Indonesia)
      lkpdHtml = qa.lkpdExercises;
    }
  } else {
    // Other subjects (Pancasila, PAI, IPAS, PJOK, Senirupa, English, Jawa, Koding)
    subTitle = `LKPD: Aktivitas Pembelajaran`;
    desc = `Topik: ${topicName} (Pertemuan ${meetingNum})`;

    if (category === "pancasila") {
      subTitle = "LKPD: Pengamalan Nilai Pancasila";
      if (lowTopic.includes("simbol") || lowTopic.includes("sila")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Mengidentifikasi simbol sila Pancasila dan bunyinya secara tepat.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Amati gambar Garuda Pancasila.<br>2. Pasangkan simbol (bintang, pohon beringin, rantai, kepala banteng, padi kapas) dengan sila yang tepat.<br>3. Tuliskan hasil diskusimu.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Simbol sila pertama Pancasila adalah...<br>A. Rantai<br>B. Bintang<br>C. Pohon beringin<br><br>
          2. Pohon beringin melambangkan sila ke-...<br>A. 2<br>B. 3<br>C. 4</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan bunyi sila kedua Pancasila dengan lengkap!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Susunlah puzzle gambar lambang negara burung Garuda bersama kelompokmu!</p>
        `;
      } else if (lowTopic.includes("aturan") || lowTopic.includes("patuh")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Memahami aturan di rumah dan di sekolah secara patuh.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Diskusikan aturan apa saja yang ada di kelasmu.<br>2. Bedakan mana perilaku mematuhi aturan dan melanggar aturan.<br>3. Catat di tabel.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Datang ke sekolah tepat waktu sebelum bel masuk berbunyi merupakan aturan di...<br>A. Rumah<br>B. Sekolah<br>C. Pasar<br><br>
          2. Membuang sampah pada tempatnya membuat kelas menjadi...<br>A. Kotor<br>B. Bersih dan sehat<br>C. Bising</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan 2 aturan penting yang wajib kamu patuhi saat berada di rumahmu!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Bermain peran (drama singkat) mematuhi aturan kelas (misal: meminjam pensil teman dengan izin) bersama kelompokmu!</p>
        `;
      } else {
        // Meeting fallback for Pancasila
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "pai") {
      subTitle = "LKPD: Pendidikan Agama Islam & Budi Pekerti";
      if (lowTopic.includes("nabi") || lowTopic.includes("rasul")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Meneladani akhlak mulia kasih sayang nabi Muhammad SAW.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Simak cerita kisah kelahiran Nabi Muhammad SAW.<br>2. Diskusikan perilaku kasih sayang Nabi kepada anak yatim.<br>3. Tuliskan perilaku terpuji nabi yang bisa kamu terapkan.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Nabi Muhammad SAW lahir di kota...<br>A. Madinah<br>B. Makkah<br>C. Mesir<br><br>
          2. Salah satu akhlak mulia Nabi adalah bersikap jujur, sehingga diberi gelar...<br>A. Al-Farabi<br>B. Al-Amin<br>C. Al-Kindi</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan satu contoh bagaimana kamu menunjukkan kasih sayang kepada kedua orang tuamu di rumah!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Melafalkan sholawat nabi bersama-sama secara bergotong royong dengan khusyuk!</p>
        `;
      } else if (lowTopic.includes("wudu") || lowTopic.includes("bersuci")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Mengurutkan tata cara wudu secara runtut dan benar sebelum salat.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Perhatikan peragaan berwudu oleh guru.<br>2. Urutkan gambar urutan wudu (membasuh wajah, membasuh tangan, membasuh kaki, dll).<br>3. Tuliskan nomor urutannya.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Berwudu bertujuan untuk menghilangkan hadas...<br>A. Besar<br>B. Kecil<br>C. Sedang<br><br>
          2. Gerakan wudu setelah membasuh telapak tangan dan berkumur adalah membasuh...<br>A. Kaki<br>B. Hidung (menghirup air)<br>C. Rambut</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan lafal niat wudu secara lengkap beserta artinya!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Praktik wudu di keran air sekolah secara bergiliran dengan pengawasan guru!</p>
        `;
      } else {
        // Meeting fallback for PAI
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "ipas") {
      subTitle = "LKPD: Saintis Cilik (IPAS)";
      if (lowTopic.includes("hewan") || lowTopic.includes("tumbuhan") || lowTopic.includes("foto sintesis")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Menganalisis bagian tubuh tumbuhan/hewan dan fungsinya secara kritis.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Ambillah satu daun tanaman di luar kelas secara hati-hati.<br>2. Amati urat daun dan bagian-bagian daun tersebut.<br>3. Gambar dan tuliskan nama bagian daun tersebut di kolom kerja.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Bagian tumbuhan yang berfungsi untuk melakukan fotosintesis (membuat makanan sendiri) adalah...<br>A. Akar<br>B. Daun (karena klorofil)<br>C. Bunga<br><br>
          2. Organ penyerap air dari dalam tanah pada tumbuhan adalah...<br>A. Akar<br>B. Batang<br>C. Daun</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Jelaskan proses fotosintesis pada daun hijau dan sebutkan apa saja hasilnya bagi makhluk hidup lain!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Menanam biji kacang hijau di media kapas basah dalam kelompok. Amati dan catat pertumbuhannya setiap hari!</p>
        `;
      } else if (lowTopic.includes("cahaya") || lowTopic.includes("bunyi")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Membuktikan sifat-sifat cahaya (merambat lurus, menembus benda bening, dibiaskan) melalui eksperimen.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Siapkan senter, gelas kaca berisi air, dan pensil.<br>2. Masukkan pensil ke dalam gelas air, amati dari samping.<br>3. Catat hasil pengamatan eksperimen.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Pensil yang dimasukkan ke dalam air tampak bengkok/patah merupakan bukti sifat cahaya dapat...<br>A. Merambat lurus<br>B. Dibiaskan/dibelokkan<br>C. Dipantulkan<br><br>
          2. Benda di bawah ini yang dapat ditembus oleh cahaya senter dengan mudah adalah...<br>A. Buku tulis tebal<br>B. Gelas kaca bening<br>C. Papan tulis kayu</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Bagaimana proses terbentuknya pelangi di langit setelah hujan reda? Jelaskan hubungannya dengan cahaya!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Lakukan percobaan bayangan menggunakan senter dan jari tangan kelompokmu. Ukur panjang bayangan pada jarak senter yang berbeda!</p>
        `;
      } else {
        // Meeting fallback for IPAS
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "pjok") {
      subTitle = "LKPD: Kebugaran dan Aktivitas Jasmani";
      if (lowTopic.includes("lokomotor")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Melakukan gerak dasar lokomotor (berjalan, berlari, melompat) dengan koordinasi tubuh yang baik.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Lakukan pemanasan peregangan dinamis.<br>2. Berlarilah lurus sejauh 10 meter, lalu melompat sejauh mungkin.<br>3. Lakukan dengan diawasi guru olahraga.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Contoh gerakan lokomotor (gerakan berpindah tempat) adalah...<br>A. Memutar kepala<br>B. Berlari ke depan<br>C. Menekuk lutut<br><br>
          2. Saat mendarat setelah melompat, posisi lutut kaki kita sebaiknya...<br>A. Mengeper/menekuk lentur<br>B. Kaku tegak lurus<br>C. Melayang</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan 3 macam variasi gerakan berjalan yang kamu ketahui!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Lakukan lomba lari estafet antar kelompok dengan menjaga kekompakan tim secara gembira!</p>
        `;
      } else if (lowTopic.includes("manipulatif")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Mempraktikkan gerak manipulatif melempar dan menangkap bola secara berpasangan.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Ambil bola kasti bersama pasangan kelompokmu.<br>2. Berdirilah berhadapan sejauh 3 meter.<br>3. Lemparkan bola dengan tangan kanan, teman menangkap dengan dua tangan secara konsisten.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Gerak yang melibatkan penguasaan terhadap suatu objek benda disebut...<br>A. Lokomotor<br>B. Non-lokomotor<br>C. Manipulatif<br><br>
          2. Menendang bola ke arah gawang sepak bola menggunakan kaki termasuk gerakan...<br>A. Manipulatif<br>B. Lokomotor<br>C. Non-lokomotor</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Bagaimana posisi kedua telapak tangan yang benar saat bersiap menangkap bola melambung?</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Latihan melempar bola sasaran (merobohkan susunan kaleng bertumpuk) secara bergantian dalam kelompok!</p>
        `;
      } else {
        // Meeting fallback for PJOK
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "senirupa") {
      subTitle = "LKPD: Seni Rupa Kreatif";
      if (lowTopic.includes("garis") || lowTopic.includes("lukis")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Menggambar berbagai jenis garis (garis lurus, lengkung, patah-patah, bergelombang) menjadi gambar pemandangan.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Siapkan pensil gambar dan kertas gambar.<br>2. Gambar garis lengkung untuk bukit, garis lurus untuk jalan, dan garis gelombang untuk awan.<br>3. Tunjukkan garis tersebut pada karyamu.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Garis yang melambangkan keluwesan dan kelembutan adalah garis...<br>A. Tegak lurus vertikal<br>B. Lengkung/gelombang<br>C. Patah-patah tajam<br><br>
          2. Pagar rumah biasanya digambar menggunakan garis...<br>A. Melingkar bulat<br>B. Lurus vertikal sejajar<br>C. Berliku-liku</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Sebutkan 3 jenis garis dasar yang sering digunakan dalam seni rupa beserta gambarnya!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Buatlah pola garis bersama di atas kertas panjang (spanduk kertas kelas) menggunakan spidol warna-warni secara kreatif!</p>
        `;
      } else if (lowTopic.includes("kolase") || lowTopic.includes("potong")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Membuat karya seni kolase dua dimensi menggunakan dedaunan kering yang berguguran di sekolah.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Kumpulkan daun-daun kering di halaman sekolah secara bergotong royong.<br>2. Gambar pola binatang di atas kertas gambarmu.<br>3. Gunting daun sesuai bentuk pola, oleskan lem, lalu tempel daun dengan rapi.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Menempel potongan dedaunan kering di atas pola kertas dinamakan teknik...<br>A. Anyaman<br>B. Kolase<br>C. Relief<br><br>
          2. Perekat yang digunakan agar daun menempel kuat pada kertas gambar adalah...<br>A. Air jernih<br>B. Lem kertas/lem kayu putih yang tidak beracun<br>C. Minyak goreng</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Mengapa daun yang digunakan untuk kolase sebaiknya daun kering, bukan daun basah segar?</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Kerjakan kolase raksasa bertema "Pohon Impian Kelompok" menggunakan dedaunan kering aneka warna!</p>
        `;
      } else {
        // Meeting fallback for Seni Rupa
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "english") {
      subTitle = "LKPD: Fun English Activity";
      if (lowTopic.includes("greeting") || lowTopic.includes("meet")) {
        lkpdHtml = `
          <p><b>A. Learning Objectives:</b><br>Introduce yourself and greet friends politely in English.</p>
          <p><b>B. Procedures:</b><br>1. Look at the English greeting cards.<br>2. Pronounce: "Good morning", "Hello", "How are you?".<br>3. Write down a simple introduction dialog.</p>
          <p><b>C. Challenge 1: Multiple Choice</b><br>
          1. What is the correct English greeting when you meet a teacher at 8:00 AM?<br>A. Good evening<br>B. Good morning<br>C. Good night<br><br>
          2. Complete the greeting: "Hello, my name is Budi. Nice to ... you."<br>A. meet<br>B. look<br>C. speak</p>
          <p><b>D. Challenge 2: Essay</b><br>Write a short response to: "How are you today?"</p>
          <p><b>E. Challenge 3: Group Activity</b><br>Practice introducing your friends to other group mates in English using polite language!</p>
        `;
      } else if (lowTopic.includes("school") || lowTopic.includes("class")) {
        lkpdHtml = `
          <p><b>A. Learning Objectives:</b><br>Identify and spell the names of school objects in the classroom.</p>
          <p><b>B. Procedures:</b><br>1. Point to objects in your classroom (ruler, pen, book, table).<br>2. Spell the name of the objects in English.<br>3. Write the names on the worksheet.</p>
          <p><b>C. Challenge 1: Multiple Choice</b><br>
          1. What is "penggaris" in English?<br>A. Ruler<br>B. Eraser<br>C. Pencil case<br><br>
          2. Spell the word for "buku tulis" correctly...<br>A. B-O-O-K<br>B. P-E-N-C-I-L<br>C. B-A-G</p>
          <p><b>D. Challenge 2: Essay</b><br>Write 3 English names of objects that you keep inside your school bag!</p>
          <p><b>E. Challenge 3: Group Activity</b><br>Play a guessing game: Blindfold a friend, let them touch a school object and guess its English name!</p>
        `;
      } else {
        // Meeting fallback for English
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "jawa") {
      subTitle = "LKPD: Sinau Basa Jawa Ceria";
      if (lowTopic.includes("krama") || lowTopic.includes("unggah-ungguh")) {
        lkpdHtml = `
          <p><b>A. Ancas Piwulang:</b><br>Mraktekake pacelathon ngoko lan krama alus marang wong tuwa utawa guru.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Waca pacelathon pamit sekolah ing papan tulis.<br>2. Praktekake pacelathon kasebut karo kancamu.<br>3. Tulisake tembung krama alus ing lembar tugas.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Nalika matur marang Bapak utawa Ibu ing omah, awake dhewe kudu nggunakake basa...<br>A. Ngoko kasar<br>B. Krama alus<br>C. Basa Inggris<br><br>
          2. Basa kramane tembung "mangan" kanggo wong tuwa yaiku...<br>A. Nedha<br>B. Dhahar<br>C. Turu</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Salinlah ukara iki dadi krama alus: "Ibu lara untu."!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Praktek pamit mangkat sekolah kanthi sopan lan ngaras (mencium) astane wong tuwa ing ngarep kelas!</p>
        `;
      } else if (lowTopic.includes("dongeng") || lowTopic.includes("fabel")) {
        lkpdHtml = `
          <p><b>A. Ancas Piwulang:</b><br>Mangerteni isi crita dongeng dolanan (fabel) lan njupuk pitutur luhure.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Rungokake crita dongeng kancil lan baya kang diwaca guru.<br>2. Rembugen watak-watak paraga (tokoh) ing dongeng.<br>3. Tulisake pitutur luhur kang bisa ditiru.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Dongeng kancil lan baya nuduhake menawa kancil iku kewan kang...<br>A. Kesed lan turu wae<br>B. Cerdik lan akeh akal<br>C. Wedi banyu<br><br>
          2. Watak paraga baya ing crita kasebut yaiku...<br>A. Gampang diapusi<br>B. Senang tetulung<br>C. Pinter nembang</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tulisna pitutur luhur/pesan moral saka crita dongeng kancil kang kokpahami!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Bermain peran paraga kancil lan baya ing ngarep kelas karo kelompokmu kanthi gembira!</p>
        `;
      } else {
        // Meeting fallback for Jawa
        lkpdHtml = qa.lkpdExercises;
      }
    } else if (category === "koding") {
      subTitle = "LKPD: Logika Koding & AI";
      if (lowTopic.includes("algoritma") || lowTopic.includes("logika")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Menyusun algoritma langkah-langkah logis untuk menyelesaikan masalah sehari-hari secara sistematis.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Pahami urutan acak langkah menyalakan komputer.<br>2. Susun kembali urutan tersebut secara berurutan logis.<br>3. Tuliskan di lembar tugas.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Urutan langkah-langkah logis dan teratur untuk menyelesaikan suatu masalah disebut...<br>A. Variabel<br>B. Algoritma<br>C. Loop<br><br>
          2. Urutan algoritma membuat segelas teh manis setelah merebus air adalah...<br>A. Memasukkan teh celup dan gula ke dalam gelas, lalu tuang air hangat<br>B. Meminum langsung tehnya<br>C. Membuang air rebusan</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Tuliskan algoritma sederhana minimal 3 langkah bagi seorang robot agar bisa menyapu lantai kelas dengan bersih!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Susunlah algoritma langkah bermain "Ular Tangga" secara detail dan logis bersama teman kelompokmu!</p>
        `;
      } else if (lowTopic.includes("scratch") || lowTopic.includes("blok")) {
        lkpdHtml = `
          <p><b>A. Tujuan Aktivitas:</b><br>Mengenal fungsi blok perintah Scratch untuk menggerakkan Sprite.</p>
          <p><b>B. Langkah Kerja:</b><br>1. Amati tampilan lembar kerja Scratch Desktop offline.<br>2. Hubungkan blok perintah "move 10 steps" dan "turn right" dengan gerak karakter kucing.<br>3. Tuliskan hasilnya.</p>
          <p><b>C. Tantangan 1: Pilihan Ganda</b><br>
          1. Blok perintah berwarna kuning "when green flag clicked" berfungsi untuk...<br>A. Mengubah warna latar belakang<br>B. Memulai program ketika bendera hijau diklik<br>C. Menghentikan program langsung<br><br>
          2. Untuk membuat Sprite berbicara di layar Scratch, blok yang digunakan adalah...<br>A. "move 10 steps"<br>B. "say Hello for 2 seconds"<br>C. "play sound Meow"</p>
          <p><b>D. Tantangan 2: Uraian</b><br>Jelaskan apa kegunaan dari blok perintah "forever" dalam loop Scratch!</p>
          <p><b>E. Tantangan 3: Aktivitas Kelompok</b><br>Gambar rancangan Sprite (tokoh game) dan Backdrop (latar belakang) impian kelompokmu di kertas gambar, lalu jelaskan logikanya!</p>
        `;
      } else {
        // Meeting fallback for Koding
        lkpdHtml = qa.lkpdExercises;
      }
    } else {
      lkpdHtml = `
        <p><b>A. Tujuan Aktivitas:</b><br>Memahami materi secara mendalam melalui pemecahan tantangan kontekstual.</p>
        <p><b>B. Langkah Kerja:</b><br>1. Baca rangkuman materi dengan saksama.<br>2. Selesaikan soal evaluasi kognitif secara mandiri.<br>3. Kerjakan proyek refleksi kelompok bersama teman sebangku.</p>
        ${qa.lkpdExercises}
      `;
    }
  }

  return `
    <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h3 class="text-center" style="margin-top:0; color: var(--primary); text-transform: uppercase;">${subTitle}</h3>
      <p class="text-center" style="color:var(--text-muted); font-size:13px; font-style:italic;">${desc}</p>
      <hr style="border: 1px solid var(--primary-light); margin-bottom: 20px;">
      ${lkpdHtml}
    </div>
  `;
}

// ----------------------------------------------------
// DYNAMIC COMPREHENSIVE ASESMEN & RUBRIC GENERATOR
// ----------------------------------------------------
function generateDetailedAsesmen(category, topicName, subjectId) {
  const lowTopic = topicName.toLowerCase();
  const meetingNum = state.selectedMeetingNum || 1;
  const qa = getTopicSpecificQA(subjectId, topicName);
  let testQuestions = "";
  let rubricTable = "";
  let subTitle = `RUBRIK ASESMEN PEMBELAJARAN`;
  let desc = `Materi: ${topicName} (Pertemuan ${meetingNum})`;

  if (category === "matematika") {
    subTitle = "LEMBAR ASESMEN & RUBRIK PENILAIAN MATEMATIKA";
    if (lowTopic.includes("10.000") || lowTopic.includes("digit") || lowTopic.includes("ribuan") || (lowTopic.includes("cacah") && !lowTopic.includes("100"))) {
      subTitle = "INSTRUMEN ASESMEN MATEMATIKA";
      desc = `Materi: Bilangan Cacah sampai 10.000 | Kelas IV`;
      testQuestions = `
        <h4 style="margin-top: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. ASESMEN SEBELUM BELAJAR (DIAGNOSTIK LISAN)</h4>
        <p>1. <i>"Anak-anak, jika Ibu memberikan uang jajan sebesar angka 250, bagaimana kita membacanya?"</i><br>
        2. <i>"Jika tertulis lambang bilangan 895, manakah angka yang menduduki nilai tempat ratusan?"</i></p>

        <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. ASESMEN AKHIR BELAJAR (SUMATIF MANDIRI)</h4>
        <p><b>KATEGORI A: MEMBACA BILANGAN</b><br>
        Tuliskan nama atau cara membaca dari lambang bilangan cacah di bawah ini dengan tepat!</p>
        <p>1. Lambang bilangan <b>5.091</b> dibaca:<br>
        ......................................................................................................................................................</p>
        <p>2. Lambang bilangan <b>1.206</b> dibaca:<br>
        ......................................................................................................................................................</p>
        <p>3. Lambang bilangan <b>6.002</b> dibaca:<br>
        ......................................................................................................................................................</p>

        <p><b>KATEGORI B: MENJODOHKAN (Tarik Garis)</b><br>
        Tariklah garis lurus yang menghubungkan lambang bilangan di sisi kiri dengan nama pembacaan yang tepat di sisi kanan!</p>
        <div style="display: flex; justify-content: space-between; max-width: 500px; margin: 15px 0; font-family: monospace;">
          <div>
            &bull; 2.903<br>
            &bull; 2.145<br>
            &bull; 6.002<br>
            &bull; 9.045
          </div>
          <div>
            &bull; Dua ribu seratus empat puluh lima<br>
            &bull; Enam ribu dua<br>
            &bull; Sembilan ribu empat puluh lima<br>
            &bull; Dua ribu sembilan ratus tiga
          </div>
        </div>

        <p><b>KATEGORI C: SOAL CERITA</b></p>
        <p>1. Putu baru saja pulang berlibur dari pulau Bali dan membeli oleh-oleh gantungan kunci khas sebanyak "lima puluh lima" buah. Tuliskan lambang bilangan dari jumlah gantungan kunci yang dibeli oleh Putu tersebut!<br>
        <b>Jawaban:</b> ........................................................</p>
        <p>2. Jarak dari minimarket ke rumah Helen adalah tiga ribu dua ratus delapan puluh enam meter. Tuliskan lambang bilangan yang menunjukkan jarak rumah Helen tersebut!<br>
        <b>Jawaban:</b> ........................................................</p>
        
        <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p><b>A. Membaca Bilangan:</b><br>
        1. Lima ribu sembilan puluh satu (Skor 15)<br>
        2. Seribu dua ratus enam (Skor 15)<br>
        3. Enam ribu dua (Skor 15)</p>
        <p><b>B. Menjodohkan:</b><br>
        - 2.903 &rarr; Dua ribu sembilan ratus tiga (Skor 10)<br>
        - 2.145 &rarr; Dua ribu seratus empat puluh lima (Skor 10)<br>
        - 6.002 &rarr; Enam ribu dua (Skor 10)<br>
        - 9.045 &rarr; Sembilan ribu empat puluh lima (Skor 10)</p>
        <p><b>C. Soal Cerita:</b><br>
        1. Lambang angka: 55 (Skor 10)<br>
        2. Lambang angka: 3.286 (Skor 10)</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Total Skor Maksimal = 100. Nilai = Total Skor.
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Membaca Bilangan s.d 10.000</b></td>
          <td>Mampu membaca bilangan cacah 4 digit termasuk yang mengandung angka 0 dengan sangat lancar dan tepat.</td>
          <td>Mampu membaca bilangan cacah 4 digit tetapi sesekali mengeja angka 0 (misal: "nol ratus").</td>
          <td>Belum mampu membaca bilangan cacah 4 digit secara mandiri.</td>
        </tr>
        <tr>
          <td><b>Menulis Lambang Bilangan</b></td>
          <td>Sangat terampil mengubah nama bilangan lisan ke dalam lambang angka secara tepat tanpa kekeliruan posisi.</td>
          <td>Dapat menuliskan lambang angka tetapi terdapat kesalahan penulisan angka nol di tengah.</td>
          <td>Belum dapat merumuskan lambang angka bilangan ribuan secara tepat.</td>
        </tr>
      `;
    } else if (lowTopic.includes("1 sampai 5") || lowTopic.includes("1-5")) {
      testQuestions = `
        <p>1. Berapakah jumlah gambar buah apel di bawah ini?<br>
        \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E<br>
        A. 2<br>B. 3<br>C. 5</p>
        <p>2. Angka manakah yang melambangkan bilangan 'empat'?<br>
        A. 3<br>B. 4<br>C. 5</p>
        <p>3. Hitunglah banyak jari tangan kananmu yang tegak jika ibu jari dan kelingking ditekuk! Tuliskan lambang bilangannya!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (3)</b> - Skor: 30<br>
        2. <b>B (4)</b> - Skor: 30<br>
        3. <b>3 jari</b> - Skor: 40</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Pemahaman Bilangan 1-5</b></td>
          <td>Mampu menghitung jumlah objek nyata dari 1 sampai 5 secara konsisten tanpa kesalahan.</td>
          <td>Mampu menghitung objek 1 sampai 5 tetapi sesekali salah menyebutkan lambang bilangan.</td>
          <td>Kesulitan menghitung kumpulan objek di bawah 5 secara mandiri.</td>
        </tr>
        <tr>
          <td><b>Kemampuan Menulis Angka</b></td>
          <td>Menulis lambang bilangan 1-5 secara benar, terbaca, dan proporsional.</td>
          <td>Menulis lambang bilangan 1-5 dengan bentuk terbalik atau kurang rapi tetapi terbaca.</td>
          <td>Belum mampu menuliskan lambang bilangan 1-5 dengan benar.</td>
        </tr>
      `;
    } else if (lowTopic.includes("6 sampai 10") || lowTopic.includes("6-10")) {
      testQuestions = `
        <p>1. Lambang bilangan dari nama bilangan 'delapan' adalah...<br>
        A. 6<br>B. 8<br>C. 10</p>
        <p>2. Hitung jumlah segitiga berikut: \u25B2 \u25B2 \u25B2 \u25B2 \u25B2 \u25B2 \u25B2. Ada berapa jumlahnya?<br>
        A. 6<br>B. 7<br>C. 8</p>
        <p>3. Di meja ada 6 buku. Guru meletakkan 3 buku lagi di meja tersebut. Berapa jumlah buku di meja sekarang? Tuliskan lambang bilangan dan nama bilangannya!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (8)</b> - Skor: 30<br>
        2. <b>B (7)</b> - Skor: 30<br>
        3. <b>9 (Sembilan)</b> - Skor: 40</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Pemahaman Bilangan 6-10</b></td>
          <td>Mampu menghitung jumlah objek nyata dari 6 sampai 10 secara konsisten dan tepat.</td>
          <td>Mampu menghitung objek 6 sampai 10 tetapi terdapat kesalahan minor pada kelompok bilangan besar.</td>
          <td>Kesulitan membilang kumpulan benda di atas 5 secara mandiri.</td>
        </tr>
        <tr>
          <td><b>Korespondensi Satu-ke-Satu</b></td>
          <td>Sangat konsisten mencocokkan setiap objek dengan bilangan yang tepat saat membilang benda nyata.</td>
          <td>Kadang terlewat atau menghitung satu objek dua kali saat jumlah benda mendekati 10.</td>
          <td>Belum menguasai konsep korespondensi satu-ke-satu saat membilang benda.</td>
        </tr>
      `;
    } else if (lowTopic.includes("membandingkan") || lowTopic.includes("lebih banyak") || lowTopic.includes("lebih sedikit")) {
      testQuestions = `
        <p>1. Kumpulan A berisi 8 kelereng, sedangkan kumpulan B berisi 6 kelereng. Kalimat pembanding yang tepat adalah...<br>
        A. Kumpulan A lebih sedikit dari kumpulan B<br>
        B. Kumpulan A lebih banyak dari kumpulan B<br>
        C. Kumpulan A sama banyak dengan kumpulan B</p>
        <p>2. Manakah bilangan yang nilainya lebih sedikit dari 7?<br>
        A. 5<br>B. 8<br>C. 9</p>
        <p>3. Di piring merah ada 5 pisang. Di piring biru ada 8 pisang. Piring manakah yang berisi buah lebih banyak? Berikan penjelasan singkat!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (Kumpulan A lebih banyak dari kumpulan B)</b> - Skor: 30<br>
        2. <b>A (5)</b> - Skor: 30<br>
        3. <b>Piring biru (8 pisang lebih banyak daripada 5 pisang)</b> - Skor: 40</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Konsep Perbandingan</b></td>
          <td>Mampu membandingkan dua kelompok benda dan bilangan dengan istilah pembanding secara tepat.</td>
          <td>Mampu membandingkan benda konkret tetapi bingung saat membandingkan lambang bilangan abstrak.</td>
          <td>Belum memahami arti istilah "lebih banyak", "lebih sedikit", atau "sama banyak".</td>
        </tr>
        <tr>
          <td><b>Kemampuan Analisis</b></td>
          <td>Dapat menunjukkan perbedaan kuantitas dan menjelaskan alasan logis di balik perbandingan bilangan.</td>
          <td>Dapat mengidentifikasi kelompok yang lebih besar namun kesulitan memberikan penjelasan logis.</td>
          <td>Belum mampu melakukan analisis perbandingan kuantitas benda.</td>
        </tr>
      `;
    } else if (lowTopic.includes("menulis angka") || lowTopic.includes("lambang bilangan")) {
      testQuestions = `
        <p>1. Nama bilangan dari lambang bilangan '9' adalah...<br>
        A. Tujuh<br>B. Delapan<br>C. Sembilan</p>
        <p>2. Tuliskan lambang bilangan dari nama bilangan 'nol' dan 'sepuluh'!<br>
        A. 0 dan 10<br>B. 1 dan 10<br>C. 0 dan 9</p>
        <p>3. Tebalkan dan salin kembali dengan rapi urutan lambang bilangan berikut di lembar jawabanmu: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>C (Sembilan)</b> - Skor: 30<br>
        2. <b>A (0 dan 10)</b> - Skor: 30<br>
        3. <b>Menuliskan angka 1-10 secara berurutan dan rapi</b> - Skor: 40</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Ketepatan Bentuk Angka</b></td>
          <td>Menuliskan seluruh angka 0-10 dengan arah guratan yang benar, proporsional, dan tidak terbalik.</td>
          <td>Menuliskan angka 0-10 tetapi masih ada angka yang terbalik (misalnya angka 5 atau 3).</td>
          <td>Belum menguasai guratan dan bentuk penulisan lambang bilangan dasar.</td>
        </tr>
        <tr>
          <td><b>Kerapian Penulisan</b></td>
          <td>Tulisan sangat bersih, konsisten mengikuti garis panduan buku, dan tertata rapi.</td>
          <td>Tulisan cukup rapi dan terbaca, meskipun ukuran angka tidak seragam.</td>
          <td>Tulisan acak-acakan dan sulit diidentifikasi lambang bilangannya.</td>
        </tr>
      `;
    } else if (lowTopic.includes("pasangan")) {
      testQuestions = `
        <p>1. Pasangan bilangan (number bonds) yang membentuk bilangan 6 adalah...<br>
        A. 2 dan 3<br>B. 4 dan 2<br>C. 5 dan 2</p>
        <p>2. Jika bilangan 10 dipecah menjadi dua bagian, dan salah satu bagiannya adalah 7, berapakah bagian lainnya?<br>
        A. 2<br>B. 3<br>C. 4</p>
        <p>3. Di sebuah dahan pohon ada 8 burung. Sebagian burung terbang dan sebagian lagi tetap diam. Tuliskan 3 alternatif pasangan burung yang terbang dan yang diam!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (4 dan 2)</b> - Skor: 30<br>
        2. <b>B (3)</b> - Skor: 30<br>
        3. <b>Alternatif: (1 & 7), (2 & 6), (3 & 5), (4 & 4) - Tuliskan 3 alternatif secara tepat</b> - Skor: 40</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Konsep Dekomposisi Bilangan</b></td>
          <td>Memahami konsep part-whole (bagian-keseluruhan) dan menemukan kombinasi pasangan bilangan secara mandiri.</td>
          <td>Mampu melengkapi pasangan bilangan tetapi butuh bantuan media konkret untuk bilangan di atas 5.</td>
          <td>Belum memahami konsep penguraian bilangan menjadi bagian-bagian.</td>
        </tr>
        <tr>
          <td><b>Penyelesaian Masalah</b></td>
          <td>Mampu menemukan lebih dari dua alternatif pasangan bilangan dengan benar dan cepat.</td>
          <td>Hanya mampu memberikan satu alternatif pasangan bilangan untuk angka yang diminta.</td>
          <td>Kesulitan melengkapi titik-titik pasangan bilangan dasar.</td>
        </tr>
      `;
    } else if (lowTopic.includes("penjumlahan") || lowTopic.includes("pengurangan") || lowTopic.includes("tambah") || lowTopic.includes("kurang") || lowTopic.includes("hitung cepat")) {
      if (meetingNum === 1) {
        testQuestions = `
          <p>1. Hasil dari penjumlahan sederhana 5 + 3 adalah...<br>A. 7<br>B. 8<br>C. 9</p>
          <p>2. Ada 4 kelereng merah dan 4 kelereng biru. Berapa jumlah kelereng seluruhnya?<br>A. 6<br>B. 8<br>C. 10</p>
          <p>3. Di piring ada 6 biskuit. Adik memakan 2 biskuit tersebut. Berapakah biskuit yang tersisa di piring? Gambarkan dan tulis kalimat matematikanya!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (8)</b> - Skor: 30<br>
          2. <b>B (8)</b> - Skor: 30<br>
          3. <b>4 biskuit (6 - 2 = 4)</b> - Skor: 40</p>
        `;
      } else if (meetingNum === 2) {
        testQuestions = `
          <p>1. Hasil dari penjumlahan bersusun pendek 12 + 6 adalah...<br>A. 17<br>B. 18<br>C. 19</p>
          <p>2. Pak Tani memanen 18 buah tomat. Ternyata ada 5 buah tomat yang busuk. Berapakah tomat yang masih bagus?<br>A. 12 buah<br>B. 13 buah<br>C. 14 buah</p>
          <p>3. Kerjakan operasi hitung pengurangan berikut dengan cara mencoret gambar: 15 - 4 = ... Tuliskan langkah pengerjaanmu!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (18)</b> - Skor: 30<br>
          2. <b>B (13 buah)</b> - Skor: 30<br>
          3. <b>11 (Langkah: 15 - 4 = 11)</b> - Skor: 40</p>
        `;
      } else {
        testQuestions = `
          <p>1. Hasil penjumlahan bersusun dengan teknik menyimpan 17 + 8 adalah...<br>A. 24<br>B. 25<br>C. 26</p>
          <p>2. Hasil pengurangan bersusun dengan teknik meminjam 23 - 6 adalah...<br>A. 17<br>B. 18<br>C. 19</p>
          <p>3. Toko buku memiliki persediaan 35 buku gambar. Hari ini terjual 17 buku. Berapakah buku gambar yang tersisa? Kerjakan dengan cara pengurangan bersusun panjang beserta langkah meminjamnya!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (25)</b> - Skor: 30<br>
          2. <b>A (17)</b> - Skor: 30<br>
          3. <b>18 buku (35 - 17 = 18. Langkah: 5 pinjam 1 puluhan jadi 15; 15 - 7 = 8; sisa puluhan 2; 2 - 1 = 1. Hasil 18)</b> - Skor: 40</p>
        `;
      }
      rubricTable = `
        <tr>
          <td><b>Pemahaman Konsep Operasi</b></td>
          <td>Menguasai konsep penjumlahan/pengurangan bersusun dan teknik menyimpan/meminjam secara benar.</td>
          <td>Mampu menyelesaikan penjumlahan/pengurangan tetapi salah pada teknik menyimpan/meminjam.</td>
          <td>Belum memahami konsep penjumlahan/pengurangan dasar.</td>
        </tr>
        <tr>
          <td><b>Ketelitian Hitung</b></td>
          <td>Menghitung dengan sangat telily, hasil perhitungan 100% akurat.</td>
          <td>Hasil akhir perhitungan terdapat sedikit kesalahan minor karena kurang teliti.</td>
          <td>Banyak melakukan kesalahan hitung karena terburu-buru.</td>
        </tr>
      `;
    } else if (lowTopic.includes("kali") || lowTopic.includes("bagi") || lowTopic.includes("perkalian") || lowTopic.includes("pembagian")) {
      if (meetingNum === 1) {
        testQuestions = `
          <p>1. Operasi perkalian 3 x 4 jika ditulis sebagai penjumlahan berulang adalah...<br>A. 3 + 3 + 3 + 3<br>B. 4 + 4 + 4<br>C. 3 + 4</p>
          <p>2. Ada 3 piring, setiap piring berisi 5 buah jeruk. Berapa banyak jeruk semuanya?<br>A. 12<br>B. 15<br>C. 18</p>
          <p>3. Udin memiliki 12 kelereng yang ingin dibagikan secara merata kepada 3 orang temannya. Berapa banyak kelereng yang diterima setiap anak? Tuliskan pengurangan berulangnya!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (4 + 4 + 4)</b> - Skor: 30<br>
          2. <b>B (15)</b> - Skor: 30<br>
          3. <b>4 kelereng (12 - 3 - 3 - 3 - 3 = 0, pengurangan dilakukan 4 kali)</b> - Skor: 40</p>
        `;
      } else {
        testQuestions = `
          <p>1. Berapakah hasil dari perkalian bersusun 24 x 3?<br>A. 62<br>B. 72<br>C. 82</p>
          <p>2. Hasil dari pembagian bersusun (porogapit) 84 : 4 adalah...<br>A. 21<br>B. 22<br>C. 23</p>
          <p>3. Di gudang ada 96 buah buku yang akan dikemas ke dalam 6 kardus dengan jumlah sama banyak. Berapakah jumlah buku dalam setiap kardus? Tuliskan langkah pembagian bersusunnya!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (72)</b> - Skor: 30<br>
          2. <b>A (21)</b> - Skor: 30<br>
          3. <b>16 buku (96 : 6 = 16. Langkah: 9:6=1 sisa 3; turunkan 6 jadi 36; 36:6=6; hasil 16)</b> - Skor: 40</p>
        `;
      }
      rubricTable = `
        <tr>
          <td><b>Logika Perkalian/Pembagian</b></td>
          <td>Memahami perkalian sebagai penjumlahan berulang dan pembagian sebagai pengurangan berulang secara utuh.</td>
          <td>Mampu menghitung hasil perkalian/pembagian tetapi kesulitan menjelaskan konsep dasarnya.</td>
          <td>Belum menguasai tabel perkalian dan pembagian dasar.</td>
        </tr>
        <tr>
          <td><b>Pemecahan Masalah</b></td>
          <td>Mampu menganalisis soal cerita dan merumuskan kalimat matematikanya secara tepat.</td>
          <td>Sering keliru menentukan apakah soal cerita harus dikalikan atau dibagi.</td>
          <td>Kesulitan memahami maksud soal cerita matematika.</td>
        </tr>
      `;
    } else if (lowTopic.includes("pecahan") || lowTopic.includes("setengah") || lowTopic.includes("sepertiga") || lowTopic.includes("seperempat")) {
      if (meetingNum === 1) {
        testQuestions = `
          <p>1. Gambar pizza diarsir 1 bagian dari 4 bagian yang sama besar menyatakan nilai pecahan...<br>A. 1/2<br>B. 1/4<br>C. 3/4</p>
          <p>2. Lambang pecahan sepertiga ditulis...<br>A. 1/3<br>B. 3/1<br>C. 1/2</p>
          <p>3. Jika sebuah melon dibagi menjadi 2 bagian yang sama besar, berapakah nilai pecahan masing-masing bagian? Tuliskan dan gambarkan melon tersebut!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (1/4)</b> - Skor: 30<br>
          2. <b>A (1/3)</b> - Skor: 30<br>
          3. <b>1/2 (setengah)</b> - Skor: 40</p>
        `;
      } else {
        testQuestions = `
          <p>1. Pada pecahan 3/5, angka 3 berkedudukan sebagai...<br>A. Pembilang<br>B. Penyebut<br>C. Sisa pembagian</p>
          <p>2. Pecahan yang senilai dengan 1/2 adalah...<br>A. 2/4<br>B. 1/3<br>C. 2/3</p>
          <p>3. Ibu memiliki sebuah kue bolu besar. Kue tersebut dipotong menjadi 8 bagian yang sama besar. Jika Kakak memakan 3 bagian kue tersebut, berapakah sisa pecahan kue Ibu sekarang?</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>A (Pembilang)</b> - Skor: 30<br>
          2. <b>A (2/4)</b> - Skor: 30<br>
          3. <b>5/8 (kue sisa = 8/8 - 3/8 = 5/8)</b> - Skor: 40</p>
        `;
      }
      rubricTable = `
        <tr>
          <td><b>Konsep Pembilang & Penyebut</b></td>
          <td>Sangat memahami fungsi pembilang sebagai bagian yang diambil dan penyebut sebagai pembagi keseluruhan.</td>
          <td>Mampu membaca pecahan tetapi sering terbalik membedakan istilah pembilang dan penyebut.</td>
          <td>Belum memahami konsep pecahan sebagai bagian dari benda utuh.</td>
        </tr>
        <tr>
          <td><b>Visualisasi Pecahan</b></td>
          <td>Mampu menggambar dan mengidentifikasi pecahan dari gambar yang diarsir secara presisi.</td>
          <td>Mampu mengidentifikasi pecahan gambar tetapi gambarnya sendiri kurang proporsional.</td>
          <td>Tidak mampu menggambar pecahan dengan ukuran bagian yang adil/sama besar.</td>
        </tr>
      `;
    } else if (lowTopic.includes("bangun") || lowTopic.includes("geometri") || lowTopic.includes("ruang") || lowTopic.includes("datar")) {
      if (meetingNum === 1) {
        testQuestions = `
          <p>1. Bangun datar yang memiliki 3 sudut dan 3 sisi adalah...<br>A. Persegi<br>B. Segitiga<br>C. Lingkaran</p>
          <p>2. Ciri utama dari bangun datar lingkaran adalah...<br>A. Memiliki 4 sudut siku-siku<br>B. Hanya memiliki 1 sisi lengkung tanpa sudut<br>C. Memiliki 3 titik sudut</p>
          <p>3. Gambarlah bangun persegi panjang dan sebutkan jumlah sisi serta sudutnya secara tepat!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>B (Segitiga)</b> - Skor: 30<br>
          2. <b>B (Hanya memiliki 1 sisi lengkung...)</b> - Skor: 30<br>
          3. <b>4 sisi (2 pasang sejajar sama panjang) dan 4 sudut siku-siku</b> - Skor: 40</p>
        `;
      } else {
        testQuestions = `
          <p>1. Bangun ruang yang dibatasi oleh 6 sisi berbentuk persegi yang sama besar adalah...<br>A. Kubus<br>B. Balok<br>C. Tabung</p>
          <p>2. Botol minum dan celengan kaleng merupakan contoh nyata dari benda berbentuk dasar...<br>A. Kubus<br>B. Tabung<br>C. Kerucut</p>
          <p>3. Sebutkan 3 benda di kelas atau di rumahmu yang memiliki bentuk dasar bangun ruang balok secara tepat!</p>
          
          <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
          <p>1. <b>A (Kubus)</b> - Skor: 30<br>
          2. <b>B (Tabung)</b> - Skor: 30<br>
          3. <b>Kotak tisu, lemari es, kardus pasta gigi (kebijaksanaan guru)</b> - Skor: 40</p>
        `;
      }
      rubricTable = `
        <tr>
          <td><b>Klasifikasi Bentuk</b></td>
          <td>Mampu membedakan ciri-ciri bangun datar dan bangun ruang dengan benar dan memberikan contoh riil.</td>
          <td>Mampu menyebutkan nama bangun tetapi terdapat kesalahan pada analisis sifat/cirinya.</td>
          <td>Sering tertukar antara bangun datar dan bangun ruang.</td>
        </tr>
        <tr>
          <td><b>Kemampuan Spasial</b></td>
          <td>Memiliki imajinasi spasial yang sangat baik saat menggambarkan jaring-jaring atau bentuk bangun.</td>
          <td>Mampu menggambarkan bangun dengan bantuan penggaris tetapi kurang rapi.</td>
          <td>Kesulitan menggambarkan bentuk bangun geometri dasar secara mandiri.</td>
        </tr>
      `;
    } else {
      // Matematika general meeting-level fallback
      testQuestions = qa.rubricExercises + `
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>${qa.kunciJawaban}</p>
      `;
      rubricTable = `
        <tr>
          <td><b>Pemahaman Konsep</b></td>
          <td>Sangat memahami konsep dasar materi secara mendalam dan mampu menjelaskan/menerapkannya secara tepat.</td>
          <td>Memahami konsep dasar materi tetapi masih melakukan sedikit kesalahan penafsiran.</td>
          <td>Belum menguasai kompetensi dasar dari topik yang dipelajari.</td>
        </tr>
      `;
    }

    return `
      <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h3 class="text-center" style="margin-top:0; color: var(--primary); text-transform: uppercase;">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
        <p class="text-center" style="color:var(--text-muted); font-size:12px; font-style:italic;">Materi: ${topicName} (Pertemuan ${meetingNum})</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (INDIVIDU)</h4>
        <p><b>Kerjakan soal-soal di bawah ini secara jujur dan mandiri ya!</b></p>
        ${testQuestions}
        
        <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK OBSERVASI SIKAP & KINERJA SISWA</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;">
          <thead>
            <tr style="background-color: #f2f7f6;">
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Aspek Penilaian</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Sangat Baik (Skor 4)</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Baik (Skor 3)</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Perlu Bimbingan (Skor 1)</th>
            </tr>
          </thead>
          <tbody>
            ${rubricTable}
          </tbody>
        </table>
      </div>
    `;
  }

  if (category === "indonesia") {
    subTitle = "LEMBAR ASESMEN & RUBRIK LITERASI BAHASA INDONESIA";
    if (lowTopic.includes("bunyi alam") || lowTopic.includes("bunyi buatan") || lowTopic.includes("bunyi apa")) {
      testQuestions = `
        <p>1. Suara rintik air hujan "tik-tik-tik" di atas genteng termasuk bunyi...<br>
        A. Buatan<br>B. Alam<br>C. Alat musik</p>
        <p>2. Bunyi klakson mobil "tin-tin!" sengaja dibuat oleh manusia, maka disebut...<br>
        A. Bunyi alam<br>B. Bunyi buatan<br>C. Bunyi hewan</p>
        <p>3. Sebutkan 2 contoh bunyi alam yang biasa terdengar saat terjadi hujan deras di malam hari!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (Alam)</b> - Skor: 30<br>
        2. <b>B (Bunyi buatan)</b> - Skor: 30<br>
        3. <b>Contoh: Suara guntur (dhuarr), suara angin kencang (wuss-wuss)</b> - Skor: 40</p>
        <p style="background-color: var(--primary-light); padding: 8px; border-radius: 4px; font-size: 11px;">
          <b>Pedoman Nilai Akhir:</b> Nilai = (Skor diperoleh / 100) * 100
        </p>
      `;
      rubricTable = `
        <tr>
          <td><b>Kemampuan Menyimak</b></td>
          <td>Mampu membedakan dan menirukan berbagai jenis bunyi di sekitar dengan sangat akurat.</td>
          <td>Mampu mengelompokkan jenis bunyi tetapi terdapat sedikit kekeliruan kecil pada bunyi buatan.</td>
          <td>Kesulitan mengidentifikasi asal bunyi-bunyian di sekitar.</td>
        </tr>
        <tr>
          <td><b>Kerapian Menulis</b></td>
          <td>Menuliskan jawaban dengan rapi, huruf tegak bersih, sesuai garis buku.</td>
          <td>Menuliskan jawaban dengan terbaca tetapi spasi antar kata masih belum konsisten.</td>
          <td>Tulisan sangat sulit dibaca dan banyak coretan tinta.</td>
        </tr>
      `;
    } else if (lowTopic.includes("huruf abjad") || lowTopic.includes("vokal") || lowTopic.includes("konsonan")) {
      testQuestions = `
        <p>1. Huruf-huruf di bawah ini yang merupakan huruf vokal (huruf hidup) adalah...<br>
        A. b, c, d, f<br>B. a, i, u, e, o<br>C. x, y, z</p>
        <p>2. Manakah huruf konsonan pada kata "MEJA"?<br>
        A. E dan A<br>B. M dan J<br>C. M dan E</p>
        <p>3. Lingkarilah huruf vokal dan hitung jumlah huruf konsonan pada kata "SEKOLAH"!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (a, i, u, e, o)</b> - Skor: 30<br>
        2. <b>B (M dan J)</b> - Skor: 30<br>
        3. <b>Huruf vokal: E, O, A. Jumlah konsonan: 4 (S, K, L, H)</b> - Skor: 40</p>
      `;
      rubricTable = `
        <tr>
          <td><b>Mengenal Huruf</b></td>
          <td>Menguasai seluruh huruf abjad dan mampu mengklasifikasikan vokal/konsonan secara tepat.</td>
          <td>Mengenal huruf tetapi sesekali tertukar antara huruf konsonan b dan d atau p dan q.</td>
          <td>Belum lancar melafalkan huruf-huruf abjad dasar.</td>
        </tr>
        <tr>
          <td><b>Fonik & Ejaan</b></td>
          <td>Mampu mengeja bunyi huruf secara benar dan menyalinnya tanpa huruf yang tertinggal.</td>
          <td>Mampu menyalin kata tetapi terkadang ada satu huruf yang tertinggal dalam penulisan.</td>
          <td>Mengalami kesulitan mengeja suara huruf konsonan.</td>
        </tr>
      `;
    } else if (lowTopic.includes("suku kata") || lowTopic.includes("bo-") || lowTopic.includes("la-")) {
      testQuestions = `
        <p>1. Suku kata 'bo-' jika digabung dengan suku kata 'la-' membentuk kata...<br>
        A. Buku<br>B. Bola<br>C. Baju</p>
        <p>2. Apakah suku kata awal dari kata benda "Buku"?<br>
        A. bu-<br>B. ku-<br>C. ba-</p>
        <p>3. Susunlah suku kata acak berikut agar membentuk kata yang bermakna: <b>ri - la</b> dan <b>to - bot</b>!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (Bola)</b> - Skor: 30<br>
        2. <b>A (bu-)</b> - Skor: 30<br>
        3. <b>LARI dan BOTOL</b> - Skor: 40</p>
      `;
      rubricTable = `
        <tr>
          <td><b>Suku Kata & Rangkaian Kata</b></td>
          <td>Sangat lancar merangkai suku kata terbuka (CV) menjadi kata benda konkret yang bermakna.</td>
          <td>Mampu membaca suku kata tetapi ragu-ragu saat merangkai kata dengan konsonan ganda.</td>
          <td>Belum bisa merangkai suku kata sederhana secara mandiri.</td>
        </tr>
        <tr>
          <td><b>Pelafalan (Artikulasi)</b></td>
          <td>Melafalkan suku kata bo-, bi-, bu-, la-, li-, lu- dengan artikulasi mulut yang jelas dan keras.</td>
          <td>Membaca dengan benar tetapi suara terlalu lirih atau kurang percaya diri.</td>
          <td>Kesulitan melafalkan bunyi konsonan tertentu (misal huruf L atau R).</td>
        </tr>
      `;
    } else if (lowTopic.includes("menulis nama")) {
      testQuestions = `
        <p>1. Penulisan nama diri yang benar menggunakan huruf kapital di awal nama adalah...<br>
        A. syafira putri<br>B. Syafira Putri<br>C. syafira Putri</p>
        <p>2. Huruf kapital wajib digunakan untuk menulis huruf pertama pada...<br>
        A. Nama orang dan awal kalimat<br>B. Setiap kata benda di tengah kalimat<br>C. Hanya nama makanan saja</p>
        <p>3. Tuliskan nama lengkap gurumu dan nama teman sebangkumu dengan kaidah penggunaan huruf kapital yang benar!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (Syafira Putri)</b> - Skor: 30<br>
        2. <b>A (Nama orang dan awal kalimat)</b> - Skor: 30<br>
        3. <b>Penulisan nama dengan huruf kapital di awal kata (Kebijaksanaan guru)</b> - Skor: 40</p>
      `;
      rubricTable = `
        <tr>
          <td><b>Penggunaan Huruf Kapital</b></td>
          <td>Konsisten menerapkan huruf kapital untuk nama diri dan awal kalimat secara tepat.</td>
          <td>Mengetahui teori huruf kapital tetapi terkadang lupa menerapkannya saat menulis cepat.</td>
          <td>Belum bisa membedakan bentuk huruf kapital dan huruf kecil dalam penulisan.</td>
        </tr>
        <tr>
          <td><b>Kerapian Buku Tugas</b></td>
          <td>Tulisan tegak lurus, bersih tanpa coretan, dan sangat mudah dibaca oleh guru.</td>
          <td>Tulisan cukup rapi dan terbaca, ada satu atau dua coretan tipis bekas penghapus.</td>
          <td>Tulisan sangat acak-acakan dan banyak noda tinta di lembar tugas.</td>
        </tr>
      `;
    } else if (lowTopic.includes("kuman") || lowTopic.includes("cuci tangan")) {
      testQuestions = `
        <p>1. Kuman penyakit yang menempel di tangan kotor dapat dibasmi dengan mencuci tangan menggunakan...<br>
        A. Air putih biasa saja<br>B. Air bersih mengalir dan sabun<br>C. Tisu basah wangi</p>
        <p>2. Mengapa kita wajib membiasakan diri mencuci tangan sebelum makan?<br>
        A. Agar makanan terasa lebih manis<br>B. Mencegah kuman ikut tertelan ke dalam perut yang dapat menyebabkan sakit<br>C. Agar kuku terlihat mengkilap</p>
        <p>3. Tuliskan minimal 3 langkah dari gerakan mencuci tangan bersih yang telah kamu praktikkan!</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>1. <b>B (Air bersih mengalir dan sabun)</b> - Skor: 30<br>
        2. <b>B (Mencegah kuman ikut tertelan...)</b> - Skor: 30<br>
        3. <b>Membasuh telapak tangan, sela-sela jari, kuku-kuku jari, dan membilas dengan air mengalir (Kebijaksanaan guru)</b> - Skor: 40</p>
      `;
      rubricTable = `
        <tr>
          <td><b>Pemahaman Kebersihan Diri</b></td>
          <td>Memahami konsep penularan kuman dan pentingnya cuci tangan untuk kesehatan secara logis.</td>
          <td>Bisa menyebutkan langkah cuci tangan tetapi kurang memahami alasan di balik pembiasaan hidup bersih.</td>
          <td>Belum mengerti hubungan kebersihan tangan dengan kesehatan pencernaan.</td>
        </tr>
        <tr>
          <td><b>Keterampilan Motorik Halus</b></td>
          <td>Mampu menirukan dan memperagakan 6 langkah cuci tangan dengan koordinasi gerak yang sangat baik.</td>
          <td>Memperagakan cuci tangan tetapi terburu-buru dan ada langkah yang terlewat.</td>
          <td>Memerlukan bimbingan penuh saat mempraktikkan cuci tangan bersih.</td>
        </tr>
      `;
    } else {
      // Bahasa Indonesia general meeting-level fallback
      testQuestions = qa.rubricExercises + `
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
        <p>${qa.kunciJawaban}</p>
      `;
      rubricTable = `
        <tr>
          <td><b>Pemahaman Konsep</b></td>
          <td>Sangat memahami konsep dasar materi secara mendalam dan mampu menjelaskan/menerapkannya secara tepat.</td>
          <td>Memahami konsep dasar materi tetapi masih melakukan sedikit kesalahan penafsiran.</td>
          <td>Belum menguasai kompetensi dasar dari topik yang dipelajari.</td>
        </tr>
      `;
    }

    return `
      <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h3 class="text-center" style="margin-top:0; color: var(--primary); text-transform: uppercase;">LEMBAR ASESMEN MANDIRI & RUBRIK PENILAIAN</h3>
        <p class="text-center" style="color:var(--text-muted); font-size:12px; font-style:italic;">Materi: ${topicName} (Pertemuan ${meetingNum})</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (INDIVIDU)</h4>
        <p><b>Kerjakan soal-soal di bawah ini secara jujur dan mandiri ya!</b></p>
        ${testQuestions}
        
        <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK OBSERVASI SIKAP & KINERJA SISWA</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;">
          <thead>
            <tr style="background-color: #f2f7f6;">
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Aspek Penilaian</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Sangat Baik (Skor 4)</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Baik (Skor 3)</th>
              <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Perlu Bimbingan (Skor 1)</th>
            </tr>
          </thead>
          <tbody>
            ${rubricTable}
          </tbody>
        </table>
      </div>
    `;
  }

  // Fallbacks for other subjects (Pancasila, PAI, IPAS, PJOK, Senirupa, English, Jawa, Koding)
  let task1 = qa.rubricExercises + `
    <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">II. KUNCI JAWABAN & PEDOMAN PENSKORAN</h4>
    <p>${qa.kunciJawaban}</p>
  `;
  let rubRows = `
    <tr>
      <td><b>Pemahaman Konsep</b></td>
      <td>Sangat memahami konsep dasar materi secara mendalam dan mampu menjelaskan/menerapkannya secara tepat.</td>
      <td>Memahami konsep dasar materi tetapi masih melakukan sedikit kesalahan penafsiran.</td>
      <td>Belum menguasai kompetensi dasar dari topik yang dipelajari.</td>
    </tr>
    <tr>
      <td><b>Kemandirian Tugas</b></td>
      <td>Mengerjakan tugas secara mandiri, jujur, penuh konsentrasi, dan mengumpulkan tepat waktu.</td>
      <td>Mengerjakan tugas mandiri tetapi mudah teralihkan konsentrasinya oleh keadaan sekitar.</td>
      <td>Selalu meminta bantuan penuh dari orang lain untuk menyelesaikan tugas sederhana.</td>
    </tr>
  `;


  return `
    <div style="border: 1px solid var(--border-color); padding: 20px; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h3 class="text-center" style="margin-top:0; color: var(--primary); text-transform: uppercase;">${subTitle}</h3>
      <p class="text-center" style="color:var(--text-muted); font-size:12px; font-style:italic;">${desc}</p>
      
      <h4 style="margin-top: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">I. SOAL ASESMEN MANDIRI (INDIVIDU)</h4>
      <p><b>Kerjakan soal-soal di bawah ini secara jujur dan mandiri ya!</b></p>
      ${task1}
      
      <h4 style="margin-top: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">III. RUBRIK OBSERVASI SIKAP & KINERJA SISWA</h4>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;">
        <thead>
          <tr style="background-color: #f2f7f6;">
            <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Aspek Penilaian</th>
            <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Sangat Baik (Skor 4)</th>
            <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Baik (Skor 3)</th>
            <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left; width: 25%;">Perlu Bimbingan (Skor 1)</th>
          </tr>
        </thead>
        <tbody>
          ${rubRows}
        </tbody>
      </table>
    </div>
  `;
}// ----------------------------------------------------
// CORE RENDER WORKSPACE: Tab Route Dispatcher
// ----------------------------------------------------
function renderWorkspace() {
  const sheet = document.getElementById("workspace-sheet");
  const subData = getActiveSubjectData();
  const chData = getActiveChapterData();
  const topicName = getActiveTopicName();
  const classFase = CURRICULUM_DB[state.selectedClass].fase;
  
  if (state.activeTab === "promes") {
    sheet.classList.add("landscape-sheet");
  } else {
    sheet.classList.remove("landscape-sheet");
  }
  
  let contentHtml = "";

  switch (state.activeTab) {
    case "prota":
      contentHtml = compileProta(subData, classFase);
      break;
    case "promes":
      contentHtml = compilePromes(subData, classFase);
      break;
    case "cptpatp":
      contentHtml = compileCpTpAtp(subData, classFase);
      break;
    case "modulajar":
      contentHtml = compileModulAjar(subData, chData, topicName, classFase);
      break;
    case "bahanajar":
      contentHtml = compileBahanAjar(subData, chData, topicName);
      break;
    case "lkpd":
      contentHtml = compileLkpd(subData, chData, topicName);
      break;
    case "asesmen":
      contentHtml = compileAsesmen(subData, chData, topicName);
      break;
    case "kktp":
      contentHtml = compileKKTP(subData, chData, topicName);
      break;
    case "eraport":
      contentHtml = compileERaport(subData, classFase);
      break;
  }

  sheet.innerHTML = contentHtml;
  bindEditableEvents();
  initCheckboxInteractivity();
}

// ----------------------------------------------------
// UTILITIES: JP Splitter (Permendikdasmen No 13/2025)
// ----------------------------------------------------
function getJpSplit(subjectId, totalJp) {
  // Mata pelajaran pilihan (Koding dan Bahasa Inggris) serta muatan lokal (Bahasa Jawa) tidak memiliki alokasi wajib kokurikuler (100% intra)
  if (subjectId === "koding" || subjectId === "english" || subjectId === "jawa") {
    return {
      intra: totalJp,
      kokur: 0,
      total: totalJp
    };
  }
  
  // Mata pelajaran utama dipecah ~80% intrakurikuler dan ~20% kokurikuler
  const intra = Math.round(totalJp * 0.8);
  const kokur = totalJp - intra;
  return {
    intra: intra,
    kokur: kokur,
    total: totalJp
  };
}

// ----------------------------------------------------
// RENDER TEMPLATES: PROTA (Program Tahunan)
// ----------------------------------------------------
function compileProta(subData, fase) {
  const headers = compileHeaderIdentitas("PROGRAM TAHUNAN (PROTA)");
  let rowsHtml = "";
  let totalIntra = 0;
  let totalKokur = 0;
  let totalJp = 0;
  
  subData.chapters.forEach((ch, idx) => {
    const split = getJpSplit(subData.id, ch.jp);
    totalIntra += split.intra;
    totalKokur += split.kokur;
    totalJp += split.total;
    
    // Tentukan semester bab: paruh pertama masuk Sem 1 (I), paruh kedua Sem 2 (II)
    const chSemester = idx < Math.ceil(subData.chapters.length / 2) ? "I" : "II";
    
    rowsHtml += `
      <tr>
        <td class="text-center" style="width: 50px;">${chSemester}</td>
        <td class="text-center" style="width: 50px;">${ch.no}</td>
        <td>${ch.title}</td>
        <td>
          <ul>
            ${ch.topics.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </td>
        <td class="text-center" style="width: 80px;">${split.intra} JP</td>
        <td class="text-center" style="width: 80px;">${split.kokur} JP</td>
        <td class="text-center fw-bold" style="width: 80px;">${split.total} JP</td>
        <td class="text-center" style="width: 100px;">${chSemester === "I" ? "Juli - Des" : "Jan - Jun"}</td>
      </tr>
    `;
  });

  return `
    ${headers}
    <p class="text-muted" style="margin-bottom: 12px; font-size:12px;">* Alokasi JP dipecah menjadi Intrakurikuler dan Kokurikuler sesuai dengan Permendikdasmen No 13 Tahun 2025.</p>
    <table>
      <thead>
        <tr>
          <th style="width: 50px;">Smt</th>
          <th style="width: 50px;">Bab</th>
          <th>Judul Bab / Materi Pokok</th>
          <th>Topik Pembelajaran</th>
          <th style="width: 80px;">Intra</th>
          <th style="width: 80px;">Kokur</th>
          <th style="width: 80px;">Total JP</th>
          <th style="width: 100px;">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
        <tr style="background-color: #fafdfc;">
          <td colspan="4" class="fw-bold text-center">TOTAL ALOKASI WAKTU TAHUNAN</td>
          <td class="text-center fw-bold" style="color: var(--primary);">${totalIntra} JP</td>
          <td class="text-center fw-bold" style="color: var(--meaningful);">${totalKokur} JP</td>
          <td class="text-center fw-bold" style="color: var(--primary);">${totalJp} JP</td>
          <td>Efektif Kelas</td>
        </tr>
      </tbody>
    </table>
    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: PROMES (PROGRAM SEMESTER)
// ----------------------------------------------------
function compilePromes(subData, fase) {
  const headers = compileHeaderIdentitas("PROGRAM SEMESTER (PROMES)");
  const isSem1 = state.selectedSemester === "1";
  const months = isSem1
    ? ["Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    : ["Januari", "Februari", "Maret", "April", "Mei", "Juni"];

  const weekStatus = isSem1
    ? ["mpls","mpls","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","pas","libur","libur"]
    : ["eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","eff","ujian","ujian","eff","eff","eff","eff","eff","eff","eff","eff","pat","mpls","libur"];

  const effWeekIndices = [];
  weekStatus.forEach((s, i) => { if (s === "eff") effWeekIndices.push(i); });
  const totalEffWeeks = effWeekIndices.length;

  const half = Math.ceil(subData.chapters.length / 2);
  const activeChapters = isSem1 ? subData.chapters.slice(0, half) : subData.chapters.slice(half);

  const totalJpAll = activeChapters.reduce((sum, ch) => sum + (ch.jp || 0), 0);
  let chapWeekAssignments = [];
  let cursor = 0;
  activeChapters.forEach((ch, idx) => {
    let wks = Math.round((ch.jp || 0) / Math.max(totalJpAll, 1) * totalEffWeeks);
    if (wks < 1) wks = 1;
    if (idx === activeChapters.length - 1) wks = Math.max(1, totalEffWeeks - cursor);
    chapWeekAssignments.push({ start: cursor, end: cursor + wks - 1 });
    cursor += wks;
  });

  let monthHeaders = "";
  months.forEach(m => {
    monthHeaders += `<th colspan="4" style="font-size:10px;padding:6px 4px;font-weight:bold;text-align:center;background-color:#eaf4f3;color:#0b5e56;">${m}</th>`;
  });
  let subHeaders = "";
  for (let i = 0; i < 6; i++) {
    for (let w = 1; w <= 4; w++) {
      subHeaders += `<th style="font-size:9px;padding:4px 2px;text-align:center;background-color:#f7faf9;color:#576d6a;font-weight:500;">${w}</th>`;
    }
  }

  let colGroupHtml = `<colgroup><col style="width:40px;"><col style="width:250px;"><col style="width:45px;"><col style="width:45px;"><col style="width:45px;">`;
  for (let i = 0; i < 24; i++) colGroupHtml += `<col style="width:24px;">`;
  colGroupHtml += `</colgroup>`;

  function getWeekBg(st) {
    if (st === "mpls") return "#fff3cd";
    if (st === "pas" || st === "ujian" || st === "pat") return "#fde8e8";
    if (st === "libur") return "#e0e0e0";
    return "#f0fff4";
  }

  let keteranganCells = "";
  for (let c = 0; c < 24; c++) {
    const st = weekStatus[c];
    const bg = getWeekBg(st);
    let lbl = "";
    if (st === "mpls") lbl = "M";
    else if (st === "pas" || st === "pat") lbl = "P";
    else if (st === "ujian") lbl = "U";
    else if (st === "libur") lbl = "L";
    keteranganCells += `<td class="text-center" style="font-size:9px;padding:3px 1px;background-color:${bg};font-weight:bold;color:#555;vertical-align:middle;">${lbl}</td>`;
  }
  const keteranganRow = `
    <tr>
      <td colspan="2" style="font-size:10px;padding:4px 8px;font-style:italic;font-weight:bold;background-color:#fffbf0;color:#7d6608;">Keterangan</td>
      <td colspan="3" style="font-size:9px;padding:4px;background-color:#fffbf0;color:#7d6608;text-align:center;">M=MPLS &nbsp; P/U=PAS/Ujian &nbsp; L=Libur</td>
      ${keteranganCells}
    </tr>`;

  let rowsHtml = "";
  let totalIntra = 0, totalKokur = 0, totalJpSum = 0;
  activeChapters.forEach((ch, idx) => {
    const split = getJpSplit(subData.id, ch.jp);
    totalIntra += parseInt(split.intra) || 0;
    totalKokur += parseInt(split.kokur) || 0;
    totalJpSum += parseInt(split.total) || 0;
    const assign = chapWeekAssignments[idx];

    let checks = "";
    for (let c = 0; c < 24; c++) {
      const st = weekStatus[c];
      const bg = getWeekBg(st);
      if (st !== "eff") {
        checks += `<td style="background-color:${bg};padding:6px 2px;"></td>`;
      } else {
        const effPos = effWeekIndices.indexOf(c);
        const ticked = (effPos >= assign.start && effPos <= assign.end);
        checks += `<td class="text-center" style="font-size:11px;padding:6px 2px;color:#0b5e56;font-weight:bold;vertical-align:middle;background-color:#f0fff4;">${ticked ? "\u2713" : ""}</td>`;
      }
    }

    rowsHtml += `
      <tr>
        <td class="text-center" style="font-size:11px;padding:6px 4px;vertical-align:middle;">${ch.no}</td>
        <td style="font-size:11px;padding:6px 8px;vertical-align:middle;text-align:left;line-height:1.4;">${ch.title}</td>
        <td class="text-center" style="font-size:11px;padding:6px 4px;vertical-align:middle;">${split.intra}</td>
        <td class="text-center" style="font-size:11px;padding:6px 4px;vertical-align:middle;">${split.kokur}</td>
        <td class="text-center fw-bold" style="font-size:11px;padding:6px 4px;vertical-align:middle;color:#0b5e56;">${split.total}</td>
        ${checks}
      </tr>`;
  });

  const totalRow = `
    <tr style="background-color:#eaf4f3;font-weight:bold;">
      <td colspan="2" style="font-size:11px;padding:8px;text-align:right;color:#0b5e56;">JUMLAH TOTAL JP:</td>
      <td class="text-center" style="font-size:11px;padding:8px 4px;color:#0b5e56;">${totalIntra}</td>
      <td class="text-center" style="font-size:11px;padding:8px 4px;color:#0b5e56;">${totalKokur}</td>
      <td class="text-center" style="font-size:11px;padding:8px 4px;color:#0b5e56;">${totalJpSum}</td>
      <td colspan="24" style="font-size:10px;padding:8px;color:#576d6a;text-align:center;">Minggu Efektif: <b>${totalEffWeeks}</b> minggu dari 24 minggu kalender semester</td>
    </tr>`;

  return `
    ${headers}
    <p class="text-muted" style="margin-bottom:4px;font-size:12px;font-style:italic;">* Distribusi JP sesuai kalender akademik ${state.teacherProfile.tahunAjaran} dan Permendikdasmen No. 13/2025.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;font-size:11px;">
      <span style="background:#fff3cd;padding:2px 8px;border-radius:4px;border:1px solid #d4a017;"><b>M</b> = MPLS</span>
      <span style="background:#fde8e8;padding:2px 8px;border-radius:4px;border:1px solid #c0392b;"><b>P/U</b> = PAS/Ujian</span>
      <span style="background:#e0e0e0;padding:2px 8px;border-radius:4px;border:1px solid #999;"><b>L</b> = Libur</span>
      <span style="background:#f0fff4;padding:2px 8px;border-radius:4px;border:1px solid #0b5e56;color:#0b5e56;font-weight:bold;">\u2713 = Minggu Efektif</span>
    </div>
    <div style="overflow-x:auto;width:100%;">
      <table style="width:100%;min-width:1000px;table-layout:fixed;border-collapse:collapse;margin:8px 0;">
        ${colGroupHtml}
        <thead>
          <tr>
            <th rowspan="2" style="font-size:10px;padding:6px 4px;text-align:center;vertical-align:middle;background-color:#eaf4f3;color:#0b5e56;font-weight:bold;">Bab</th>
            <th rowspan="2" style="font-size:10px;padding:6px 8px;text-align:left;vertical-align:middle;background-color:#eaf4f3;color:#0b5e56;font-weight:bold;">Materi Pokok</th>
            <th rowspan="2" style="font-size:10px;padding:6px 4px;text-align:center;vertical-align:middle;background-color:#eaf4f3;color:#0b5e56;font-weight:bold;">Intra</th>
            <th rowspan="2" style="font-size:10px;padding:6px 4px;text-align:center;vertical-align:middle;background-color:#eaf4f3;color:#0b5e56;font-weight:bold;">Kokur</th>
            <th rowspan="2" style="font-size:10px;padding:6px 4px;text-align:center;vertical-align:middle;background-color:#eaf4f3;color:#0b5e56;font-weight:bold;">Total</th>
            ${monthHeaders}
          </tr>
          <tr>${subHeaders}</tr>
        </thead>
        <tbody>
          ${keteranganRow}
          ${rowsHtml}
          ${totalRow}
        </tbody>
      </table>
    </div>
    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: CP, TP, ATP
// ----------------------------------------------------
function compileCpTpAtp(subData, fase) {
  const headers = compileHeaderIdentitas("CAPAIAN, TUJUAN, DAN ALUR TUJUAN PEMBELAJARAN (ATP)");
  let elementsHtml = "";

  Object.entries(subData.elemen).forEach(([elName, elDesc], idx) => {
    // Generate TPs based on subject database topics
    const ch = subData.chapters[idx] || subData.chapters[0];
    const tps = ch.topics.map((t, tIdx) => {
      return `TP ${ch.no}.${tIdx + 1}: Siswa mampu ${t.toLowerCase()} secara kritis dan mandiri.`;
    });

    elementsHtml += `
      <div style="margin-top: 15px; border: 1px solid var(--border-color); border-radius: 8px; padding: 15px;">
        <div style="background-color: var(--primary-light); color: var(--primary); padding: 6px 12px; border-radius: 4px; font-weight: bold; margin-bottom: 8px;">
          Elemen: ${elName}
        </div>
        <p class="fw-bold" style="font-size: 13px; margin-bottom: 10px;">Capaian Elemen:</p>
        <p style="font-style: italic; font-size: 13px; margin-bottom: 12px; color: var(--text-muted);">${elDesc}</p>
        
        <p class="fw-bold" style="font-size: 13px; margin-bottom: 6px;">Tujuan Pembelajaran & Alur Rencana:</p>
        <table style="margin-top: 5px;">
          <thead>
            <tr>
              <th style="width: 100px;">Kode ATP</th>
              <th>Deskripsi Tujuan Pembelajaran (TP)</th>
              <th style="width: 90px; text-align: center;">Kelas/Smt</th>
              <th style="width: 90px; text-align: center;">JP</th>
            </tr>
          </thead>
          <tbody>
            ${tps.map((tp, tIdx) => `
              <tr>
                <td class="text-center fw-bold">ATP.${state.selectedClass}.${ch.no}.${tIdx + 1}</td>
                <td>${tp}</td>
                <td class="text-center">${state.selectedClass} / I</td>
                <td class="text-center">${Math.ceil(ch.jp / ch.topics.length)} JP</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  });

  return `
    ${headers}
    <h2>Capaian Fase ${fase}</h2>
    <p>Pada akhir Fase ${fase}, siswa sekolah dasar memiliki kompetensi akademik yang terstruktur sesuai dengan target capaian bidang studi ${subData.title}.</p>
    ${elementsHtml}
    ${compileTandaTangan()}
  `;
}

// Helper to get highly specific physical/concrete activities based on topic keywords
function getConcreteActivity(category, topicName) {
  const topicLower = (topicName || "").toLowerCase();
  
  if (category === "matematika") {
    if (topicLower.includes("pecahan") || topicLower.includes("bagi") || topicLower.includes("pembagian")) {
      return `Peserta didik secara aktif melipat kertas origami berwarna menjadi beberapa bagian sama besar, mengguntingnya, lalu membagikannya ke anggota kelompok untuk mendemonstrasikan konsep pecahan senilai atau operasi pembagian secara fisik.`;
    }
    if (topicLower.includes("tambah") || topicLower.includes("jumlah") || topicLower.includes("penjumlahan")) {
      return `Peserta didik secara aktif menggabungkan beberapa kumpulan stik es krim atau kelereng dari wadah kelompok yang berbeda di atas meja, lalu menghitung total jumlah gabungannya secara konkret satu per satu.`;
    }
    if (topicLower.includes("kurang") || topicLower.includes("selisih") || topicLower.includes("pengurangan")) {
      return `Peserta didik secara fisik mengambil sejumlah kelereng dari wadah utama di meja kelompok, membagikannya kepada teman kelompok lain, lalu menghitung sisa kelereng yang tersisa di wadah awal.`;
    }
    if (topicLower.includes("kali") || topicLower.includes("perkalian")) {
      return `Peserta didik menyusun stik es krim ke dalam susunan baris dan kolom yang sama banyak (matriks/grid) di atas meja kelompok, lalu menghitung total stik secara cepat untuk memahami konsep dasar perkalian secara fisik.`;
    }
    if (topicLower.includes("bangun") || topicLower.includes("geometri") || topicLower.includes("datar") || topicLower.includes("ruang") || topicLower.includes("sudut") || topicLower.includes("segitiga") || topicLower.includes("lingkaran")) {
      return `Peserta didik meraba tepi benda-benda nyata di kelas (seperti permukaan meja, buku, jam dinding) atau merangkai sedotan plastik menggunakan benang kasur menjadi model bangun datar atau bangun ruang secara nyata.`;
    }
    if (topicLower.includes("ukur") || topicLower.includes("panjang") || topicLower.includes("lebar") || topicLower.includes("tinggi") || topicLower.includes("berat")) {
      return `Peserta didik menggunakan pita meteran kain, penggaris kayu, atau timbangan mainan untuk mengukur langsung panjang meja belajar, tinggi badan teman, atau berat buku tulis secara berpasangan.`;
    }
    if (topicLower.includes("volume") || topicLower.includes("isi") || topicLower.includes("debit") || topicLower.includes("kapasitas")) {
      return `Peserta didik menuangkan air secara langsung menggunakan gelas ukur berskala ke dalam berbagai wadah botol plastik kosong dengan bentuk berbeda untuk membandingkan kapasitas volume secara riil.`;
    }
    if (topicLower.includes("uang") || topicLower.includes("rupiah") || topicLower.includes("belanja") || topicLower.includes("harga")) {
      return `Peserta didik mensimulasikan transaksi jual beli menggunakan uang mainan kertas dan koin serta barang-barang di kelas (alat tulis) untuk menghitung total belanjaan dan kembalian secara langsung.`;
    }
    if (topicLower.includes("waktu") || topicLower.includes("jam") || topicLower.includes("menit") || topicLower.includes("detik")) {
      return `Peserta didik memutar jarum jam pada model jam dinding mainan dari kertas karton tebal untuk menunjukkan waktu aktivitas harian (jam bangun tidur, jam sekolah) secara berpasangan.`;
    }
    return `Peserta didik secara aktif mengeksplorasi dan memanipulasi objek nyata di meja mereka (seperti mengelompokkan lidi, melipat kertas pecahan, atau mengukur dengan jengkal tangan) guna mendalami materi <b>${topicName}</b> secara langsung.`;
  }
  
  if (category === "koding") {
    if (topicLower.includes("ulang") || topicLower.includes("loop") || topicLower.includes("selamanya")) {
      return `Peserta didik melakukan gerakan fisik tepuk tangan sebanyak 5 kali secara berulang mengikuti pola ketukan 'Loop 5 Kali' yang tertulis pada papan tulis instruksi koding fisik kelompok.`;
    }
    if (topicLower.includes("cabang") || topicLower.includes("jika") || topicLower.includes("if") || topicLower.includes("else")) {
      return `Peserta didik memainkan game 'Jika-Maka' fisik: Jika guru mengangkat bendera merah maka siswa harus berdiri tegap, jika guru mengangkat bendera hijau maka siswa harus duduk rileks.`;
    }
    if (topicLower.includes("variabel") || topicLower.includes("data") || topicLower.includes("skor")) {
      return `Peserta didik menggunakan kotak kardus kosong berlabel 'Wadah Skor' dan memasukkan/mengeluarkan bola tenis ke dalamnya untuk melambangkan penambahan dan pengurangan nilai variabel secara fisik.`;
    }
    return `Peserta didik menyusun kartu fisik (koding tanpa komputer/unplugged) berupa kartu perintah arah (maju, belok, lompat) secara manual di lantai kelas untuk mensimulasikan langkah algoritma secara fisik.`;
  }

  if (category === "ipas") {
    if (topicLower.includes("cahaya") || topicLower.includes("optik") || topicLower.includes("cermin") || topicLower.includes("pantul")) {
      return `Peserta didik menyalakan senter di ruang kelas yang redup, lalu mengarahkannya ke cermin datar, gelas bening berisi air, dan kertas karton tebal untuk membuktikan sifat cahaya merambat lurus, menembus benda bening, dan memantul.`;
    }
    if (topicLower.includes("magnet") || topicLower.includes("tarik") || topicLower.includes("kutub")) {
      return `Peserta didik memegang magnet batang lalu mendekatkannya ke berbagai benda di sekitar kelas (paku besi, klip kertas plastik, daun, penghapus karet, kayu) untuk membuktikan gaya tarik magnet secara berkelompok.`;
    }
    if (topicLower.includes("air") || topicLower.includes("hujan") || topicLower.includes("siklus") || topicLower.includes("uap") || topicLower.includes("awan")) {
      return `Peserta didik menuangkan air hangat ke dalam mangkuk kaca tebal, menutupnya dengan plastik wrap bening, lalu menaruh es batu di atas plastik wrap untuk mengamati proses kondensasi (tetesan air hujan mini) di bawah plastik secara langsung.`;
    }
    if (topicLower.includes("bunyi") || topicLower.includes("suara") || topicLower.includes("getar") || topicLower.includes("telinga")) {
      return `Peserta didik memetik senar karet gelang yang diregangkan pada kotak tisu kosong dengan berbagai tingkat ketegangan untuk mendengarkan perbedaan tinggi-rendah nada bunyi akibat getaran karet.`;
    }
    if (topicLower.includes("tumbuh") || topicLower.includes("daun") || topicLower.includes("akar") || topicLower.includes("batang") || topicLower.includes("bunga") || topicLower.includes("tanaman")) {
      return `Peserta didik mengamati langsung tanaman pot kecil yang dibawa ke kelas, menggunakan kaca pembesar (lup) untuk melihat serat daun, batang, dan struktur akar tanaman secara detail.`;
    }
    if (topicLower.includes("gaya") || topicLower.includes("gesek") || topicLower.includes("gravitasi") || topicLower.includes("dorong") || topicLower.includes("tarik")) {
      return `Peserta didik menggelindingkan bola mainan di atas permukaan lantai ubin yang licin dibandingkan di atas karpet berbulu kasar untuk membandingkan pengaruh gaya gesek secara langsung.`;
    }
    if (topicLower.includes("listrik") || topicLower.includes("baterai") || topicLower.includes("kabel") || topicLower.includes("saklar")) {
      return `Peserta didik merangkai baterai kecil, kabel tembaga, dan lampu bohlam mini menjadi sirkuit tertutup dan terbuka untuk mengamati aliran arus listrik secara langsung.`;
    }
    if (topicLower.includes("peta") || topicLower.includes("atlas") || topicLower.includes("globe") || topicLower.includes("wilayah") || topicLower.includes("geografi")) {
      return `Peserta didik membuka atlas fisik atau bola dunia (globe), lalu menggunakan benang kasur untuk mengukur jarak relatif antar pulau atau menemukan koordinat wilayah secara berkelompok.`;
    }
    if (topicLower.includes("ekonomi") || topicLower.includes("jual") || topicLower.includes("beli") || topicLower.includes("pasar") || topicLower.includes("kebutuhan") || topicLower.includes("uang")) {
      return `Peserta didik menyusun kartu bergambar barang kebutuhan (seperti beras, obat) dan barang keinginan (seperti mainan, PS5) secara bergotong-royong di papan klasifikasi kelompok.`;
    }
    return `Peserta didik melakukan eksperimen fisik atau observasi lapangan langsung (seperti meraba daun, mendekatkan magnet ke paku, atau mengamati interaksi di halaman sekolah) mengenai materi terkait secara berkelompok.`;
  }

  if (category === "pancasila") {
    if (topicLower.includes("perumus") || topicLower.includes("tokoh") || topicLower.includes("kebersamaan") || topicLower.includes("bpupki") || topicLower.includes("sejarah")) {
      return 'Peserta didik melakukan simulasi bermain peran (role-play) sidang perumusan Pancasila dengan membagi peran sebagai tokoh bangsa seperti Ir. Soekarno, Moh. Yamin, dan Dr. Soepomo untuk mendiskusikan nilai kebersamaan dan musyawarah mufakat secara langsung.';
    }
    if (topicLower.includes("gotong") || topicLower.includes("kerja") || topicLower.includes("sama") || topicLower.includes("bakti")) {
      return `Peserta didik mensimulasikan aktivitas kerja bakti di kelas (seperti membagi tugas menyapu, merapikan buku, dan membersihkan papan tulis) secara langsung untuk mempraktikkan gotong royong secara berkelompok.`;
    }
    if (topicLower.includes("lambang") || topicLower.includes("garuda") || topicLower.includes("simbol") || topicLower.includes("sila")) {
      return `Peserta didik menyusun potongan puzzle gambar Garuda Pancasila dan mencocokkan simbol sila Pancasila (bintang, rantai, pohon beringin, banteng, padi kapas) pada karton secara berkelompok.`;
    }
    if (topicLower.includes("aturan") || topicLower.includes("norma") || topicLower.includes("tata") || topicLower.includes("tertib")) {
      return `Peserta didik bermain peran (role-play) mempraktikkan sikap tertib sekolah (seperti berbaris sebelum masuk kelas, menaruh sepatu di rak, menyapa guru) secara berpasangan.`;
    }
    return `Peserta didik menyusun gambar pilihan perilaku baik (patuh aturan, toleransi, musyawarah) di papan kerja kelompok untuk mengklasifikasikan nilai-nilai moral terkait <b>${topicName}</b>.`;
  }

  if (category === "pjok") {
    return `Peserta didik berbaris di lapangan dan mempraktikkan langsung gerakan jasmani (seperti berlari zig-zag, melompati rintangan kardus bekas, atau mengoper bola tenis) secara aktif bergantian sesuai panduan gerak <b>${topicName}</b>.`;
  }

  if (category === "senirupa") {
    return `Peserta didik memanipulasi alat dan media fisik seni rupa (seperti mencampur warna cat air, meremas playdough/tanah liat, menggunting kertas kolase) untuk merancang karya rupa kreatif bertema <b>${topicName}</b>.`;
  }

  if (category === "pai") {
    if (topicLower.includes("wudhu") || topicLower.includes("salat") || topicLower.includes("shalat") || topicLower.includes("ibadah")) {
      return `Peserta didik memperagakan langsung tata cara wudhu atau gerakan salat menggunakan media sajadah/poster urutan ibadah secara berpasangan di kelas secara runtut.`;
    }
    return `Peserta didik mensimulasikan perilaku terpuji (akhlak mulia kepada orang tua/teman) lewat bermain peran drama pendek di depan kelas bertema <b>${topicName}</b>.`;
  }

  if (category === "kristen") {
    if (topicLower.includes("alkitab") || topicLower.includes("baca") || topicLower.includes("nas") || topicLower.includes("firman")) {
      return `Peserta didik membuka Alkitab fisik berkelompok, mencari pasal/ayat yang ditentukan, lalu membaca bergantian dengan menunjuk teks secara teratur demi melatih literasi Alkitab.`;
    }
    if (topicLower.includes("doa") || topicLower.includes("ibadah") || topicLower.includes("syukur")) {
      return `Peserta didik memperagakan adab berdoa kristiani yang baik (sikap duduk tenang, melipat tangan, dan memejamkan mata) secara hening dan khusyuk secara bergotong-royong.`;
    }
    if (topicLower.includes("ciptaan") || topicLower.includes("penciptaan") || topicLower.includes("alam") || topicLower.includes("bumi")) {
      return `Peserta didik menyusun gambar urutan penciptaan hari ke-1 sampai ke-6 secara runtut pada lembar karton kelompok secara aktif dan bergotong-royong.`;
    }
    return `Peserta didik melakukan simulasi bermain peran (roleplay) keteladanan tokoh Alkitab atau menyusun kartu gambar tindakan kasih bertema <b>${topicName}</b> secara aktif.`;
  }

  // Languages / Default Fallback
  if (topicLower.includes("baca") || topicLower.includes("nyaring") || topicLower.includes("buku") || topicLower.includes("cerita")) {
    return `Peserta didik memegang buku cerita bergambar besar, membaca bergantian kata demi kata dengan menunjuk teks menggunakan telunjuk tangan secara teratur demi melatih artikulasi nyaring.`;
  }
  if (topicLower.includes("tulis") || topicLower.includes("karang") || topicLower.includes("huruf") || topicLower.includes("kata") || topicLower.includes("kalimat")) {
    return `Peserta didik meraba huruf timbul dari kertas pasir (sandpaper letters) atau menyusun kartu suku kata fisik berwarna menjadi satu kalimat utuh di atas meja kelompok.`;
  }
  if (topicLower.includes("bicara") || topicLower.includes("wawancara") || topicLower.includes("diskusi") || topicLower.includes("tanya") || topicLower.includes("pendapat")) {
    return `Peserta didik bermain peran melakukan wawancara berpasangan menggunakan telepon kaleng mainan yang dihubungkan dengan benang kasur untuk melatih intonasi suara dan kepercayaan diri.`;
  }
  return `Peserta didik melakukan simulasi konkret (seperti menyusun kartu kata fisik bergambar, bermain peran komunikatif tematik, atau memanipulasi media huruf/bahasa) secara aktif bertema <b>${topicName}</b>.`;
}

// Helper to get detailed topic-specific descriptions for Deep Learning stages
function getLangkahInstruksional(subjectId, topicName) {
  let category = "indonesia";
  if (subjectId.includes("matematika")) category = "matematika";
  else if (subjectId.includes("koding")) category = "koding";
  else if (subjectId.includes("pjok")) category = "pjok";
  else if (subjectId.includes("senirupa")) category = "senirupa";
  else if (subjectId.includes("pai")) category = "pai";
  else if (subjectId.includes("kristen")) category = "kristen";
  else if (subjectId.includes("pancasila")) category = "pancasila";
  else if (subjectId.includes("ipas")) category = "ipas";
  else if (subjectId.includes("english")) category = "english";
  else if (subjectId.includes("jawa")) category = "jawa";

  const qa = getTopicSpecificQA(subjectId, topicName);
  const data = {
    pendahuluan1: "",
    pendahuluan2: "",
    pendahuluan3: "",
    tahap1: "",
    tahap2: "",
    tahap3: "",
    tahap4: "",
    tahap5: "",
    penutup1: "",
    penutup2: "",
    penutup3: ""
  };

  switch (category) {
    case "matematika":
      data.pendahuluan1 = `Guru mengondisikan kesiapan mental belajar kelas dengan mengajak siswa duduk tegap dan memandu teknik pernapasan kesadaran (tarik napas dalam 4 detik, tahan 2 detik, lalu hembuskan perlahan) sebanyak 3 kali secara hening untuk memusatkan emosi positif belajar. Dilanjutkan dengan berdoa bersama dipimpin ketua kelas, memeriksa kerapian pakaian, menjaga kebersihan kelas, serta menanyakan perasaan emosional siswa hari ini secara ramah.`;
      data.pendahuluan2 = `Guru menghubungkan materi dengan pengalaman kontekstual siswa di kehidupan sehari-hari: 'Anak-anak hebat, pernahkah kalian memotong kue ulang tahun untuk dibagikan secara adil ke teman-teman? Atau mengelompokkan mainan kelereng di rumah? Hari ini kita akan belajar matematika tentang "${topicName}" agar kita bisa mengukur, menghitung, dan membagi objek nyata secara tepat, adil, dan objektif dalam kehidupan sehari-hari!'`;
      data.pendahuluan3 = `Guru menjelaskan target capaian pembelajaran hari ini yaitu memahami cara kerja logika "${topicName}". Alur kegiatan menyenangkan yang akan dilalui meliputi eksplorasi manipulatif objek berkelompok, visualisasi gambar sketsa konsep, merumuskan simbol matematis, serta diakhiri dengan kuis interaktif berhadiah bintang prestasi yang ramah anak.`;
      
      data.tahap1 = `Peserta didik dihadapkan pada situasi tidak lengkap atau teka-teki konkret bermasalah di depan kelas. Guru memperlihatkan alat peraga nyata atau wadah berisi barang acak, lalu mengajukan pertanyaan pemantik: 'Jika kita ingin menyortir dan menghitung kumpulan objek fisik ini untuk memecahkan konsep "${topicName}" secara paling efektif and adil, bagaimana langkah logis awal yang harus kita lakukan?'. Siswa dipancing untuk berpikir kritis tanpa langsung diberi tahu rumusnya.`;
      data.tahap2 = getConcreteActivity("matematika", topicName);
      data.tahap3 = `Peserta didik menuangkan hasil manipulasi konkret di atas ke dalam bentuk lembar kerja visual (representasi gambar). Setiap kelompok menggambar arsiran lingkaran/persegi untuk pecahan, melukis sketsa diagram batang berwarna, atau menata tabel visual data terkait "${topicName}" pada kertas karton kelompok agar konsepnya terlihat jelas secara visual.`;
      data.tahap4 = `Peserta didik dibimbing untuk menerjemahkan representasi visual tersebut menjadi simbol abstrak formal matematika. Siswa menuliskan angka resmi, merumuskan persamaan operasi hitung (seperti tanda tambah [+], kurang [-], pecahan, atau rumus keliling/luas), serta melabeli simbol matematis yang merepresentasikan materi "${topicName}" secara akurat.`;
      data.tahap5 = `Perwakilan dari setiap kelompok mempresentasikan proses berpikir kelompoknya di depan kelas. Siswa menjelaskan secara verbal dan logis bagaimana mereka memproses benda konkret hingga menemukan formulasi matematika "${topicName}". Kelompok lain memberikan tanggapan berupa apresiasi atau pertanyaan kritis konstruktif, dilanjutkan dengan penguatan dan validasi konsep oleh guru.`;
      
      data.penutup1 = `Siswa bersama guru melakukan refleksi perasaan belajar dengan mengajukan pertanyaan pemandu: 'Aktivitas eksplorasi bagian mana yang paling menantang dan memicu rasa ingin tahumu tentang "${topicName}" hari ini? Karakter baik (seperti gotong royong dan kejujuran) apa saja yang sudah kita terapkan?'`;
      data.penutup2 = `Guru melakukan asesmen spontan lisan dengan mengajukan 3 pertanyaan pemahaman cepat secara acak:<br>
      1. '${qa.questions[0] || 'Bagaimana cara menyelesaikan perhitungan matematika ini secara teliti?'}'<br>
      2. '${qa.questions[1] || 'Sebutkan 1 contoh penerapan materi matematika ini dalam kegiatanmu sehari-hari di rumah!'}'<br>
      3. '${qa.questions[2] || 'Mengapa pengerjaan secara runtut membantu mencegah kekeliruan berhitung?'}'`;
      data.penutup3 = `Guru memberikan tindak lanjut tugas rumah kontekstual sederhana: 'Cari dan catatlah 2 benda atau kegiatan di rumahmu yang menerapkan prinsip hitung "${topicName}".' Pembelajaran ditutup dengan doa syukur bersama dan yel-yel penyemangat kelas secara ceria.`;
      break;

    case "kristen":
      data.pendahuluan1 = `Guru mengondisikan kesiapan mental belajar siswa dengan bernyanyi lagu rohani gembira (seperti 'Setinggi-tingginya Langit' atau 'Hari Ini Kurasa Bahagia') bersama-sama secara ceria, dilanjutkan berdoa pembuka dipimpin salah satu siswa, serta absensi kehadiran siswa dengan sapaan hangat.`;
      data.pendahuluan2 = `Guru menghubungkan materi dengan iman Kristen sehari-hari: 'Anak-anak terkasih, tahukah kalian bahwa setiap kita diciptakan secara unik, dikasihi, dan dipelihara oleh Tuhan setiap hari? Hari ini kita belajar materi "${topicName}" agar kita bisa mensyukuri kasih setia Allah dan menjadi saluran berkat bagi keluarga serta teman-teman di sekitar kita!'`;
      data.pendahuluan3 = `Guru memaparkan alur aktivitas seru hari ini: menyanyi gerakan bersama, menyusun urutan peristiwa Alkitab, berdiskusi kelompok merawat alam ciptaan, menulis komitmen kasih Kristen, dan ditutup dengan doa syukur bersama.`;
      
      data.tahap1 = `Peserta didik dihadapkan pada paparan cerita Alkitab bergambar atau pembacaan nats firman Tuhan bertema "${topicName}". Guru mengajukan pertanyaan pemantik: 'Dari firman Tuhan ini, teladan atau pesan kasih apa yang ingin Tuhan ajarkan kepada kita untuk dilakukan hari ini?'.`;
      data.tahap2 = getConcreteActivity("kristen", topicName);
      data.tahap3 = `Peserta didik menuangkan pesan cerita Alkitab di atas dalam lembar kerja visual berkelompok. Mereka menggambar ilustrasi kisah Alkitab, mewarnai gambar alam ciptaan, atau menyusun poster visual bertema "${topicName}" secara kreatif.`;
      data.tahap4 = `Peserta didik dibimbing merumuskan kalimat doa syukur tertulis atau komitmen janji iman Kristen (seperti janji membantu orang tua, rukun dengan saudara) terkait materi "${topicName}" secara mandiri di buku tulis masing-masing.`;
      data.tahap5 = `Setiap kelompok bergantian mempresentasikan poster visual atau membacakan kalimat komitmen kasih bertema "${topicName}" di depan kelas. Murid lain memberikan apresiasi dan guru memberikan konfirmasi teologis serta penguatan firman Tuhan.`;
      
      data.penutup1 = `Siswa bersama guru melakukan refleksi iman: 'Bagian nats firman Tuhan mana yang paling menyentuh hatimu hari ini tentang "${topicName}"? Sikap kasih apa yang akan kamu praktikkan setelah keluar dari kelas ini?'`;
      data.penutup2 = `Guru melakukan asesmen spontan lisan dengan mengajukan 3 pertanyaan pemahaman Alkitab secara cepat:<br>
      1. '${qa.questions[0] || 'Bagaimana cara kita mempraktikkan ajaran kasih/moral yang kita pelajari hari ini di rumah?'}'<br>
      2. '${qa.questions[1] || 'Sebutkan adab berdoa/beribadah yang baik dan sopan di hadapan Tuhan?'}'<br>
      3. '${qa.questions[2] || 'Mengapa kita harus saling mengampuni kesalahan teman kita dengan tulus?'}'`;
      data.penutup3 = `Guru memberikan tugas rumah mandiri: 'Tuliskan satu doa pendek ucapan syukur terkait materi hari ini dan doakan bersama orang tuamu malam nanti.' Kelas ditutup dengan menyanyi dan doa syafaat penutup oleh guru.`;
      break;

    case "koding":
      data.pendahuluan1 = `Guru mengondisikan kesiapan belajar siswa dengan mengajak memejamkan mata dan melakukan peregangan otot leher dan jari tangan secara hening. Siswa diarahkan memfokuskan mental pada ketenangan logika berpikir guna mempersiapkan pemecahan masalah algoritma. Dilanjutkan dengan doa pembuka dipimpin salah satu siswa, absensi kehadiran, dan sapaan penyemangat 'Halo para penemu masa depan!'.`;
      data.pendahuluan2 = `Guru memberikan apersepsi pentingnya koding: 'Anak-anak hebat, tahukah kalian bahwa game interaktif dan animasi robot dibuat menggunakan susunan perintah logika komputer? Hari ini kita akan belajar merancang logika koding bertema "${topicName}" agar kita memiliki kemampuan berpikir komputasional yang runtut dan kreatif dalam menciptakan teknologi!'`;
      data.pendahuluan3 = `Guru menyampaikan bahwa alur belajar hari ini dikemas dalam bentuk permainan 'unplugged coding' (gerak fisik koding tanpa komputer), menyusun peta visual alir program (flowchart), mempraktikkan koding langsung di perangkat digital, dan diakhiri pameran karya koding kelompok.`;
      
      data.tahap1 = `Peserta didik mengamati jalannya demonstrasi game Scratch atau program simulasi bertema "${topicName}" di proyektor kelas. Guru sengaja menyisipkan kesalahan logika (bug) sehingga sprite bergerak acak atau macet. Siswa ditantang menganalisis secara kritis: 'Mengapa program koding ini tidak berjalan sesuai instruksi dan bagian logika mana yang bermasalah?'.`;
      data.tahap2 = getConcreteActivity("koding", topicName);
      data.tahap3 = `Peserta didik berkolaborasi menggambar bagan alir (flowchart) visual atau menempelkan potongan visual blok kode Scratch pada lembar kerja kelompok. Mereka merancang alur logika jalannya sprite dan struktur perulangan (loops/conditional) terkait "${topicName}" sebelum mengetik di komputer.`;
      data.tahap4 = `Peserta didik membuka komputer/tablet kelompok dan menyusun blok koding resmi yang sesungguhnya di editor Scratch berdasarkan flowchart visual yang telah mereka sepakati. Siswa mengetikkan nilai koordinat, menyisipkan variabel, dan menyempurnakan struktur kode program "${topicName}".`;
      data.tahap5 = `Kelompok mendemonstrasikan program koding "${topicName}" mereka yang sudah berhasil berjalan bebas dari bug di depan kelas menggunakan proyektor. Mereka menjelaskan alur logika algoritma yang dipakai dan bagaimana cara mereka men-debug program jika terjadi error. Siswa lain dipandu untuk menguji coba program tersebut.`;
      
      data.penutup1 = `Siswa merefleksikan emosi belajar mereka: 'Bagaimana perasaanmu saat program kodingmu pertama kali mengalami error (bug), dan apa pelajaran kesabaran yang kamu dapatkan hingga program koding buatanmu berhasil berjalan sukses?'`;
      data.penutup2 = `Guru memberikan asesmen spontan lisan dengan menampilkan potongan gambar susunan blok kode Scratch di proyektor, lalu mengajukan 3 pertanyaan:<br>
      1. '${qa.questions[0] || 'Jika blok perintah Scratch ini dijalankan, ke arah mana sprite komputer kita akan bergeser?'}'<br>
      2. '${qa.questions[1] || 'Apa fungsi dari variabel/perulangan yang baru saja kita pasang pada kode tersebut?'}'<br>
      3. '${qa.questions[2] || 'Bagaimana caramu menghentikan program jika sprite mengalami looping tanpa henti?'}'`;
      data.penutup3 = `Guru memberikan tugas tindak lanjut: 'Modifikasi proyek koding kalian dengan menambahkan efek suara interaktif atau warna background baru di rumah.' Kelas ditutup dengan berdoa bersama dan mematikan komputer secara tertib.`;
      break;

    case "ipas":
      data.pendahuluan1 = `Guru memimpin teknik pemusatan fokus kesadaran alamiah (mindful listening) dengan mengajak siswa memejamkan mata secara rileks selama 1 menit dan mendengarkan suara alam di luar kelas (kicau burung, embusan angin) dengan khusyuk untuk menyatu dengan alam. Dilanjutkan berdoa syukur bersama, memeriksa kebersihan laci meja, dan mengabsen siswa dengan menanyakan kabar kesehatan mereka.`;
      data.pendahuluan2 = `Guru menghubungkan materi dengan realitas kehidupan sosial dan alam: 'Anak-anak, pernahkah kalian melihat air hujan menguap? Atau mengamati bagaimana benda di sekitar kita bergerak jatuh? Hari ini kita akan menjelajah fenomena tentang "${topicName}" agar kita bisa menjaga kelestarian bumi dan memahami hukum alam ciptaan Tuhan secara bijaksana!'`;
      data.pendahuluan3 = `Guru memaparkan alur petualangan belajar hari ini yang sangat menyenangkan: melakukan penyelidikan eksperimen sains mandiri di laboratorium/halaman sekolah, menggambar siklus/proses alam secara visual, merumuskan kesimpulan teoretis ilmiah, dan membuat poster hasil observasi kelompok.`;
      
      data.tahap1 = `Peserta didik disuguhkan suatu fenomena sains riil di depan kelas (seperti mendemonstrasikan es batu mencair di dalam air hangat, menyorotkan cahaya senter ke permukaan gelap, atau memperlihatkan tanaman layu) yang berkaitan erat dengan materi "${topicName}". Guru memandu siswa merumuskan pertanyaan penyelidikan kritis.`;
      data.tahap2 = getConcreteActivity("ipas", topicName);
      data.tahap3 = `Peserta didik mencatat data observasi dan menuangkannya ke dalam representasi gambar visual. Mereka melukis diagram siklus hidup, menggambar arah perambatan cahaya, atau membuat peta pikiran (mind map) proses ekosistem bertema "${topicName}" pada kertas kerja karton besar kelompok.`;
      data.tahap4 = `Peserta didik dibimbing merumuskan kesimpulan ilmiah dari data gambar tersebut dan mendefinisikan konsep sains secara formal (seperti menuliskan istilah ilmiah konduksi, evaporasi, fotosintesis, atau interaksi sosial) yang menjelaskan materi "${topicName}".`;
      data.tahap5 = `Setiap kelompok mempresentasikan poster hasil eksperimen ilmiah "${topicName}" mereka di depan kelas dengan percaya diri. Mereka menguraikan alur sebab-akibat fenomena alam yang diteliti, menjawab pertanyaan kritis kelompok lain, serta menerima penjelasan konseptual penegasan dari guru.`;
      
      data.penutup1 = `Siswa merefleksikan kepedulian lingkungan mereka dengan menjawab pertanyaan: 'Setelah memahami konsep "${topicName}" ini, tindakan nyata apa yang bisa kamu lakukan untuk menjaga kelestarian alam atau lingkungan sosial di sekitarmu?'`;
      data.penutup2 = `Guru memberikan asesmen spontan lisan berupa 3 pertanyaan konsep teoretis secara cepat:<br>
      1. '${qa.questions[0] || 'Berdasarkan praktikum tadi, apa faktor utama yang menyebabkan fenomena alam ini terjadi?'}'<br>
      2. '${qa.questions[1] || 'Sebutkan 2 contoh nyata penerapan atau keberadaan konsep ini di sekitar lingkungan rumahmu?'}'<br>
      3. '${qa.questions[2] || 'Apa dampak negatif yang terjadi bagi kehidupan manusia jika proses alam ini terganggu?'}'`;
      data.penutup3 = `Guru memberikan penugasan rumah pengamatan mandiri: 'Diskusikan bersama orang tuamu, catat 3 perilaku positif di rumah yang mendukung kelestarian konsep hari ini.' Pembelajaran ditutup dengan doa syukur bersama dan salam hangat.`;
      break;

    default: // Bahasa Indonesia, English, Jawa, Pancasila, PJOK, Seni Rupa, PAI
      data.pendahuluan1 = `Guru memimpin pembukaan kelas dengan mengajak siswa duduk melingkar, menarik napas panjang secara teratur untuk merasakan detak jantung dan bersyukur atas nikmat kesehatan (mindful breathing). Dilanjutkan dengan berdoa bersama dipimpin salah satu siswa, absensi siswa dengan menanyakan kabar emosional serta memberikan senyuman ramah guna membangun emosi belajar yang harmonis.`;
      data.pendahuluan2 = `Guru memberikan gambaran kontekstual yang relevan: 'Anak-anak hebat, kemampuan mengekspresikan gagasan, membaca, memahami nilai budi pekerti, dan merancang karya kreatif terkait "${topicName}" sangat penting bagi kehidupan kita agar kita tumbuh menjadi pribadi yang berakhlak mulia, toleran, cerdas, serta terampil berkomunikasi di masyarakat.'`;
      data.pendahuluan3 = `Guru menjelaskan alur aktivitas seru hari ini yaitu bermain peran (role-play), menyusun urutan kartu kata fisik, menggambar peta visual jalinan ide, menuliskan karya deskriptif mandiri, serta diakhiri dengan pameran karya kelompok yang menyenangkan.`;
      
      data.tahap1 = `Peserta didik dihadapkan pada paparan cerita menarik, poster gambar tematik, atau pemutaran rekaman suara kontekstual bertema "${topicName}". Guru memotong alur cerita di tengah jalan dan meminta siswa memprediksi akhir kisah secara kreatif guna merangsang kesadaran dan rasa penasaran awal.`;
      data.tahap2 = getConcreteActivity(category, topicName);
      data.tahap3 = `Peserta didik menuangkan hasil praktik fisik tersebut ke dalam bentuk representasi visual seperti menggambar ilustrasi alur cerita (storyboard), sketsa pola langkah gerak, atau peta konsep kosakata bertema "${topicName}" pada kertas kerja kelompok.`;
      data.tahap4 = `Peserta didik menerjemahkan alur visual tersebut menjadi bentuk konseptual tertulis. Siswa merumuskan paragraf deskriptif utuh, menyusun kalimat dialog resmi yang santun, atau menuliskan kesimpulan nilai moral terkait "${topicName}" dengan bahasa baku.`;
      data.tahap5 = `Perwakilan murid menyajikan hasil karya tulisan, membacakan dialog buatan kelompok, atau mendemonstrasikan gerakan fisik bertema "${topicName}" di depan kelas secara bergantian. Mereka menerima umpan balik positif dari teman, serta mendapatkan konfirmasi kebahasaan/perilaku dari guru.`;
      
      data.penutup1 = `Siswa mengevaluasi keberhasilan kerja sama kelompok mereka serta merefleksikan nilai-nilai kebaikan materi "${topicName}" dalam pembentukan karakter perilaku sopan santun sehari-hari.`;
      data.penutup2 = `Guru melakukan kuis lisan spontan berupa 3 pertanyaan pemahaman cepat secara acak:<br>
      1. '${qa.questions[0] || 'Dari aktivitas pembelajaran hari ini, apa kesimpulan atau amanat utama yang wajib kita terapkan?'}'<br>
      2. '${qa.questions[1] || 'Mengapa kita harus menyusun rancangan visual (gambar) terlebih dahulu sebelum menulis karya utuh?'}'<br>
      3. '${qa.questions[2] || 'Sebutkan contoh sikap santun dalam mengomunikasikan ide atau pendapat terkait materi ini kepada orang lain!'}'`;
      data.penutup3 = `Guru memberikan tugas tindak lanjut sederhana: 'Praktikkan nilai budi pekerti atau keterampilan yang telah dipelajari hari ini di lingkungan rumahmu, lalu mintalah tanda tangan orang tuamu sebagai bukti.' Kegiatan diakhiri dengan doa penutup bersama.`;
      break;
  }

  return data;
}

// ----------------------------------------------------
// RENDER TEMPLATES: MODUL AJAR (DEEP LEARNING MODEL)
// ----------------------------------------------------
function compileModulAjar(subData, chData, topicName, fase) {
  const headers = compileHeaderIdentitas("MODUL AJAR KURIKULUM MERDEKA");
  const details = getSubjectDetails(subData.id, topicName);
  const inst = getLangkahInstruksional(subData.id, topicName);
  
  // Custom contents depending on selections or edit cache
  const tp = getCachedContent("tp", details.tp);
  const pemahamanBermakna = getCachedContent("pemahamanBermakna", details.meaningful);
  const pemantik = getCachedContent("pemantik", details.pemantik);
  
  const langkahPendahuluan1 = getCachedContent("langkahPendahuluan1", inst.pendahuluan1);
  const langkahPendahuluan2 = getCachedContent("langkahPendahuluan2", inst.pendahuluan2);
  const langkahPendahuluan3 = getCachedContent("langkahPendahuluan3", inst.pendahuluan3);
  
  const langkahInti1 = getCachedContent("langkahInti1", inst.tahap1);
  const langkahInti2 = getCachedContent("langkahInti2", inst.tahap2);
  const langkahInti3 = getCachedContent("langkahInti3", inst.tahap3);
  const langkahInti4 = getCachedContent("langkahInti4", inst.tahap4);
  const langkahInti5 = getCachedContent("langkahInti5", inst.tahap5);

  const langkahPenutup1 = getCachedContent("langkahPenutup1", inst.penutup1);
  const langkahPenutup2 = getCachedContent("langkahPenutup2", inst.penutup2);
  const langkahPenutup3 = getCachedContent("langkahPenutup3", inst.penutup3);

  const waktuPendahuluan = getCachedContent("waktuPendahuluan", "10");
  const waktuInti = getCachedContent("waktuInti", "50");
  const waktuPenutup = getCachedContent("waktuPenutup", "10");

  // Checkbox values for 8 dimensions (matching the "[X]" format in the PDF)
  const isIman = getDimensiChecked("iman", subData.id, topicName);
  const isKewargaan = getDimensiChecked("kewargaan", subData.id, topicName);
  const isKritis = getDimensiChecked("kritis", subData.id, topicName);
  const isKreativitas = getDimensiChecked("kreativitas", subData.id, topicName);
  const isKolaborasi = getDimensiChecked("kolaborasi", subData.id, topicName);
  const isKemandirian = getDimensiChecked("kemandirian", subData.id, topicName);
  const isKesehatan = getDimensiChecked("kesehatan", subData.id, topicName);
  const isKomunikasi = getDimensiChecked("komunikasi", subData.id, topicName);

  const checkboxIman = isIman ? "[X]" : "[ &nbsp;]";
  const checkboxKewargaan = isKewargaan ? "[X]" : "[ &nbsp;]";
  const checkboxKritis = isKritis ? "[X]" : "[ &nbsp;]";
  const checkboxKreativitas = isKreativitas ? "[X]" : "[ &nbsp;]";
  const checkboxKolaborasi = isKolaborasi ? "[X]" : "[ &nbsp;]";
  const checkboxKemandirian = isKemandirian ? "[X]" : "[ &nbsp;]";
  const checkboxKesehatan = isKesehatan ? "[X]" : "[ &nbsp;]";
  const checkboxKomunikasi = isKomunikasi ? "[X]" : "[ &nbsp;]";

  // Create dynamic HTML listing only selected dimensions
  let selectedDplHtml = "";
  const selectedDplList = [];
  if (isIman) selectedDplList.push({ key: "iman", idx: 1, name: "Keimanan dan Ketakwaan terhadap Tuhan YME", ind: "Membiasakan doa pembuka/penutup, bersyukur atas keteraturan ilmu, dan berakhlak mulia.", val: checkboxIman });
  if (isKewargaan) selectedDplList.push({ key: "kewargaan", idx: 2, name: "Kewargaan", ind: "Menghargai keberagaman teman, berpartisipasi menjaga ketertiban, dan taat aturan kelas.", val: checkboxKewargaan });
  if (isKritis) selectedDplList.push({ key: "kritis", idx: 3, name: "Penalaran Kritis", ind: "Mengajukan pertanyaan, menganalisis hubungan konsep, memproses data literasi/numerasi.", val: checkboxKritis });
  if (isKreativitas) selectedDplList.push({ key: "kreativitas", idx: 4, name: "Kreativitas", ind: "Berperilaku produktif, melahirkan gagasan/karya asli, atau mencari alternatif solusi.", val: checkboxKreativitas });
  if (isKolaborasi) selectedDplList.push({ key: "kolaborasi", idx: 5, name: "Kolaborasi", ind: "Bekerja sama dalam kelompok, membagi peran secara adil, dan peka sosial.", val: checkboxKolaborasi });
  if (isKemandirian) selectedDplList.push({ key: "kemandirian", idx: 6, name: "Kemandirian", ind: "Mengatur diri sendiri, bertanggung jawab atas tugasnya, dan beradaptasi pada tantangan.", val: checkboxKemandirian });
  if (isKesehatan) selectedDplList.push({ key: "kesehatan", idx: 7, name: "Kesehatan", ind: "Menjaga kebugaran fisik, mengelola emosi belajar, dan menjaga kebersihan lingkungan.", val: checkboxKesehatan });
  if (isKomunikasi) selectedDplList.push({ key: "komunikasi", idx: 8, name: "Komunikasi", ind: "Menyimak instruksi, menggunakan simbol/bahasa matematis yang tepat saat berpendapat.", val: checkboxKomunikasi });

  if (selectedDplList.length > 0) {
    selectedDplHtml = `
      <div style="background-color: #f8faf9; padding: 12px 15px; border-radius: 8px; border: 1px solid #d2e4e1; margin-bottom: 20px;">
        <ul style="margin: 0; padding-left: 0; list-style: none;">
          ${selectedDplList.map(d => `
            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;">
              <span class="interactive-checkbox" data-dimensi="${d.key}" style="cursor:pointer; font-weight: bold; color: #0b5e56; font-size: 13px; font-family: monospace; white-space: nowrap; display: inline-block; min-width: 32px; text-align: center; user-select: none;">${d.val}</span>
              <div>
                <b style="color: #0b5e56;">${d.idx}. ${d.name}</b><br>
                <span style="font-size: 10px; color: #576d6a; font-style: italic;">Indikator: ${d.ind}</span>
              </div>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  } else {
    selectedDplHtml = `
      <div style="background-color: #f8faf9; padding: 12px 15px; border-radius: 8px; border: 1px solid #d2e4e1; margin-bottom: 20px; text-align: center; font-style: italic; color: #576d6a; font-size: 13px;">
        [Belum ada dimensi Profil Lulusan yang dipilih. Ceklis pada menu setup sebelah kiri]
      </div>
    `;
  }

  // Generate Rubrik Penilaian Sikap (Otomatis) rows based on checked dimensions
  let rubrikSikapRows = "";
  const selectedDimensions = [];
  if (isIman) selectedDimensions.push({ name: "Keimanan & Ketaqwaan", desc4: "Membiasakan doa, bersyukur, & berakhlak mulia secara konsisten mandiri.", desc3: "Berdoa & bersyukur dengan bimbingan berkala.", desc2: "Perlu diingatkan untuk berdoa khusyuk.", desc1: "Belum menunjukkan pembiasaan berdoa." });
  if (isKewargaan) selectedDimensions.push({ name: "Kewargaan", desc4: "Sangat toleran, aktif menjaga ketertiban, & taat aturan kelas.", desc3: "Menghargai teman & tertib dengan pengawasan.", desc2: "Kadang melanggar aturan tata tertib kelas.", desc1: "Belum peduli aturan & keberagaman teman." });
  if (isKritis) selectedDimensions.push({ name: "Penalaran Kritis", desc4: "Menyelesaikan soal dengan strategi fleksibel/efisien serta mampu menjelaskan alasannya.", desc3: "Menggunakan strategi logis, runtut, namun membutuhkan sedikit konfirmasi lisan.", desc2: "Menjawab benar secara prosedural hafalan namun belum bisa mengurai prosesnya.", desc1: "Belum mampu mengidentifikasi komponen masalah utama." });
  if (isKreativitas) selectedDimensions.push({ name: "Kreativitas", desc4: "Sangat produktif, melahirkan gagasan orisinal, & alternatif solusi inovatif.", desc3: "Mampu membuat karya/gagasan baru yang cukup menarik.", desc2: "Gagasan masih meniru contoh yang sudah ada.", desc1: "Belum memunculkan ide kreatif mandiri." });
  if (isKolaborasi) selectedDimensions.push({ name: "Kolaborasi", desc4: "Bekerja sama sangat baik, membagi peran adil, & peka sosial tinggi.", desc3: "Bekerja sama aktif dalam kelompok dengan tertib.", desc2: "Cenderung pasif dalam kerja kelompok.", desc1: "Belum bersedia berbagi peran kelompok." });
  if (isKemandirian) selectedDimensions.push({ name: "Kemandirian", desc4: "Mengatur diri sendiri dengan matang, tanggung jawab penuh atas tugas.", desc3: "Menyelesaikan tugas mandiri dengan pengawasan umum.", desc2: "Butuh dorongan konstan untuk memulai tugas.", desc1: "Belum mandiri menyelesaikan tugas individu." });
  if (isKesehatan) selectedDimensions.push({ name: "Kesehatan", desc4: "Menjaga kebugaran prima, regulasi emosi belajar sangat baik, & menjaga kebersihan.", desc3: "Mengelola emosi belajar & tertib membuang sampah.", desc2: "Kadang terpengaruh emosi negatif saat belajar.", desc1: "Belum peduli kebersihan & kebugaran diri." });
  if (isKomunikasi) selectedDimensions.push({ name: "Komunikasi", desc4: "Menyimak instruksi dengan saksama & menggunakan simbol/bahasa matematis tepat.", desc3: "Menyimak & menyampaikan pendapat dengan bahasa santun.", desc2: "Kurang fokus menyimak pendapat orang lain.", desc1: "Belum terampil mengemukakan pendapat santun." });

  // Fallback if no dimension is selected
  if (selectedDimensions.length === 0) {
    selectedDimensions.push({
      name: "Penalaran Kritis",
      desc4: "Menyelesaikan soal dengan strategi fleksibel/efisien serta mampu menjelaskan alasannya.",
      desc3: "Menggunakan strategi logis, runtut, namun membutuhkan sedikit konfirmasi lisan.",
      desc2: "Menjawab benar secara prosedural hafalan namun belum bisa mengurai prosesnya.",
      desc1: "Belum mampu mengidentifikasi komponen masalah utama."
    });
  }

  rubrikSikapRows = selectedDimensions.map(d => `
    <tr>
      <td style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt;"></td>
      <td style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; font-weight: bold; color: #0b5e56;">${d.name}</td>
      <td style="border: 1px solid #a9c2be; padding: 6px; font-size: 9pt; color: #1f2f2c;">${d.desc4}</td>
      <td style="border: 1px solid #a9c2be; padding: 6px; font-size: 9pt; color: #1f2f2c;">${d.desc3}</td>
      <td style="border: 1px solid #a9c2be; padding: 6px; font-size: 9pt; color: #1f2f2c;">${d.desc2}</td>
      <td style="border: 1px solid #a9c2be; padding: 6px; font-size: 9pt; color: #1f2f2c;">${d.desc1}</td>
    </tr>
  `).join("");

  return `
    <div style="text-align: center; margin-bottom: 25px;">
      <h2 style="font-size: 18px; font-weight: bold; color: #0b5e56; margin: 0; text-transform: uppercase;">MODUL AJAR KURIKULUM MERDEKA</h2>
      <p style="font-size: 13px; color: #576d6a; margin: 5px 0 0 0;">Pendekatan Pembelajaran Mendalam (Deep Learning)</p>
    </div>

    <h2 style="font-size: 14px; border-bottom: 2px solid #0b5e56; padding-bottom: 4px; color: #0b5e56; margin-top: 20px;">I. INFORMASI UMUM</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px;">
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="width: 25%; font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Nama Penyusun</td>
        <td style="width: 2%; padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;" class="editable-content" data-field="namaGuru">${state.teacherProfile.namaGuru}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Institusi</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;" class="editable-content" data-field="namaSekolah">${state.teacherProfile.namaSekolah}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Tahun</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;" class="editable-content" data-field="tahunAjaran">${state.teacherProfile.tahunAjaran}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Jenjang / Kelas</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;">Sekolah Dasar (SD) / Kelas ${state.selectedClass}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Fase</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;">Fase ${fase}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Mata Pelajaran</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;">${subData.title}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Elemen Konten</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;">${chData.title}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Alokasi Waktu</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;">2 JP (2 x 35 Menit)</td>
      </tr>
      <tr style="border-bottom: 1px solid #eaf4f3;">
        <td style="font-weight: bold; padding: 6px 0; font-size: 13px; color: #2b3a38;">• Moda & Model Pembelajaran</td>
        <td style="padding: 6px 0; font-size: 13px;">:</td>
        <td style="padding: 6px 0; font-size: 13px;">Tatap Muka / Perencanaan Pembelajaran Mendalam (Deep Learning)</td>
      </tr>
    </table>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">A. Kompetensi Awal (Materi Prasyarat)</h3>
    <div style="background-color: #f8faf9; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2ecea; font-size: 13px; line-height: 1.5; color: #2b3a38;" class="editable-content" data-field="kompetensiAwal">
      Peserta didik telah memiliki pemahaman prasyarat dasar sebelum memasuki materi <b>${topicName}</b>, termasuk pengenalan konsep penunjang, kemampuan bernalar awal, serta kesiapan mental belajar secara kolaboratif.
    </div>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">B. Sarana dan Prasarana</h3>
    <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #2b3a38;">
      <li><b>Media & Alat Peraga Konkret:</b> Laptop, proyektor, papan tulis, alat peraga manipulatif konkret penunjang visualisasi konsep, serta pemanfaatan portal pembelajaran digital resmi melalui <a href="https://rumah.pendidikan.go.id/" target="_blank" style="color:#0b5e56; text-decoration:underline; font-weight:bold;">https://rumah.pendidikan.go.id/</a>.</li>
      <li><b>Sumber Belajar:</b> Buku Panduan Guru dan Buku Siswa Kemendikdasmen RI ${state.teacherProfile.tahunAjaran}, modul pembelajaran pendukung, serta LKPD berbasis aktivitas konkret.</li>
    </ul>

    <h2 style="font-size: 14px; border-bottom: 2px solid #0b5e56; padding-bottom: 4px; color: #0b5e56; margin-top: 25px;">II. INTEGRASI 8 DIMENSI PROFIL LULUSAN (DPL)</h2>
    
    ${selectedDplHtml}


    <h2 style="font-size: 14px; border-bottom: 2px solid #0b5e56; padding-bottom: 4px; color: #0b5e56; margin-top: 25px;">III. KOMPONEN INTI</h2>
    
    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">A. Tujuan Pembelajaran (TP)</h3>
    <div style="background-color: #f8faf9; padding: 12px; border-radius: 6px; border: 1px solid #e2ecea; font-size: 13px; line-height: 1.6; color: #2b3a38;" class="editable-content" data-field="tp">
      1. Melalui pendekatan Konkret-Gambar-Abstrak (KGA), peserta didik mampu ${tp.replace(/^1\.\s*|2\.\s*/g, '') || `mengidentifikasi dan menjelaskan konsep ${topicName} secara visual dan logis.`}<br>
      2. Melalui pemecahan masalah (Problem-Based), peserta didik mampu memecahkan masalah kontekstual nyata terkait <b>${topicName}</b> secara mandiri dan kritis.
    </div>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">B. Pemahaman Bermakna (Pembelajaran Bermakna)</h3>
    <div style="background-color: #f8faf9; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2ecea; font-size: 13px; line-height: 1.5; color: #2b3a38;" class="editable-content" data-field="pemahamanBermakna">
      ${pemahamanBermakna}
    </div>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">C. Pertanyaan Pemantik (Memicu Rasa Ingin Tahu)</h3>
    <div style="background-color: #f8faf9; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2ecea; font-size: 13px; line-height: 1.5; color: #2b3a38;" class="editable-content" data-field="pemantik">
      ${pemantik}
    </div>

    <h2 style="font-size: 14px; border-bottom: 2px solid #0b5e56; padding-bottom: 4px; color: #0b5e56; margin-top: 25px;">IV. SINTAKS LANGKAH PEMBELAJARAN MENDALAM (DEEP LEARNING)</h2>
    
    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">1. Kegiatan Pendahuluan (<span class="editable-content" data-field="waktuPendahuluan">${waktuPendahuluan}</span> Menit)</h3>
    <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #2b3a38;">
      <li><b>Pembukaan Berkesadaran (Mindful):</b> <span class="editable-content" data-field="langkahPendahuluan1">${langkahPendahuluan1}</span></li>
      <li><b>Apersepsi & Motivasi Kontekstual (Meaningful):</b> <span class="editable-content" data-field="langkahPendahuluan2">${langkahPendahuluan2}</span></li>
      <li><b>Penyampaian Target (Joyful):</b> <span class="editable-content" data-field="langkahPendahuluan3">${langkahPendahuluan3}</span></li>
    </ul>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">2. Kegiatan Inti (<span class="editable-content" data-field="waktuInti">${waktuInti}</span> Menit)</h3>
    <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #2b3a38;">
      <li>
        <b>Tahap 1: Orientasi Masalah & Stimulasi Nyata (Berkesadaran)</b>
        <div class="editable-content" data-field="langkahInti1" style="margin-left: 15px; color: #555;">${langkahInti1}</div>
      </li>
      <li style="margin-top: 6px;">
        <b>Tahap 2: Pembelajaran Konkret (Manipulasi Objek)</b>
        <div class="editable-content" data-field="langkahInti2" style="margin-left: 15px; color: #555;">${langkahInti2}</div>
      </li>
      <li style="margin-top: 6px;">
        <b>Tahap 3: Pembelajaran Gambar (Representasi Visual)</b>
        <div class="editable-content" data-field="langkahInti3" style="margin-left: 15px; color: #555;">${langkahInti3}</div>
      </li>
      <li style="margin-top: 6px;">
        <b>Tahap 4: Pembelajaran Abstrak (Simbolisasi Matematis)</b>
        <div class="editable-content" data-field="langkahInti4" style="margin-left: 15px; color: #555;">${langkahInti4}</div>
      </li>
      <li style="margin-top: 6px;">
        <b>Tahap 5: Berbagi Gagasan & Evaluasi (Komunikasi/Kolaborasi)</b>
        <div class="editable-content" data-field="langkahInti5" style="margin-left: 15px; color: #555;">${langkahInti5}</div>
      </li>
    </ul>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">3. Kegiatan Penutup (<span class="editable-content" data-field="waktuPenutup">${waktuPenutup}</span> Menit)</h3>
    <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #2b3a38;">
      <li><b>Refleksi Berlapis (As Learning):</b> <span class="editable-content" data-field="langkahPenutup1">${langkahPenutup1}</span></li>
      <li><b>Asesmen Spontan:</b> <span class="editable-content" data-field="langkahPenutup2">${langkahPenutup2}</span></li>
      <li><b>Tindak Lanjut & Penutup:</b> <span class="editable-content" data-field="langkahPenutup3">${langkahPenutup3}</span></li>
    </ul>

    <h2 style="font-size: 14px; border-bottom: 2px solid #0b5e56; padding-bottom: 4px; color: #0b5e56; margin-top: 25px;">V. SISTEM ASESMEN PENDIDIKAN MENDALAM</h2>
    <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #2b3a38;">
      <li><b>Asesmen Awal (Diagnostik):</b> Menilai kesiapan kompetensi prasyarat dasar sebelum siklus pembelajaran topik dimulai.</li>
      <li><b>Asesmen Formatif (For/As Learning):</b> Menggunakan catatan anekdot, lembar observasi partisipasi diskusi, serta rubrik perkembangan karakter dimensi profil lulusan selama kegiatan inti.</li>
      <li><b>Asesmen Sumatif (Of Learning):</b> Evaluasi akhir berupa kuis objektif pemahaman materi, penugasan masalah non-rutin, atau unjuk karya proyek di akhir bab.</li>
    </ol>

    <h2 style="font-size: 14px; border-bottom: 2px solid #0b5e56; padding-bottom: 4px; color: #0b5e56; margin-top: 25px;">VI. LAMPIRAN OPERASIONAL</h2>
    
    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">A. Lembar Kerja Peserta Didik (LKPD)</h3>
    <div style="background-color: #f8faf9; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2ecea; font-size: 13px; line-height: 1.5; color: #2b3a38; font-style: italic;">
      * Lampiran LKPD tersedia pada menu tab terpisah, berisi format kolom identitas kelompok, eksplorasi KGA berbasis manipulasi benda nyata, ruang sketsa gambar visual, serta ruang perumusan simbol/bahasa resmi.
    </div>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">B. Ringkasan Bahan Ajar</h3>
    <div style="background-color: #f8faf9; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2ecea; font-size: 13px; line-height: 1.5; color: #2b3a38; font-style: italic;">
      * Ringkasan materi lengkap untuk literasi numerasi pendukung siswa tersedia di tab menu Bahan Ajar.
    </div>

    <h3 style="font-size: 13px; font-weight: bold; color: #0b5e56; margin-top: 15px; margin-bottom: 5px;">C. Instrumen & Rubrik Penilaian Sikap (Otomatis)</h3>
    <div style="overflow-x: auto; width: 100%; margin-top: 8px;">
      <table style="width: 100%; border-collapse: collapse; min-width: 700px;">
        <thead>
          <tr style="background-color: #eaf4f3;">
            <th style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; color: #0b5e56; font-weight: bold; text-align: left;">Nama Peserta Didik</th>
            <th style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; color: #0b5e56; font-weight: bold; text-align: left; width: 150px;">Dimensi DPL Pilihan</th>
            <th style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; color: #0b5e56; font-weight: bold; text-align: left;">Skor 4 (Sangat Berkembang)</th>
            <th style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; color: #0b5e56; font-weight: bold; text-align: left;">Skor 3 (Berkembang)</th>
            <th style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; color: #0b5e56; font-weight: bold; text-align: left;">Skor 2 (Mulai Berkembang)</th>
            <th style="border: 1px solid #a9c2be; padding: 6px; font-size: 9.5pt; color: #0b5e56; font-weight: bold; text-align: left;">Skor 1 (Belum Berkembang)</th>
          </tr>
        </thead>
        <tbody>
          ${rubrikSikapRows}
        </tbody>
      </table>
    </div>

    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: BAHAN AJAR
// ----------------------------------------------------
function compileBahanAjar(subData, chData, topicName) {
  const headers = compileHeaderIdentitas("BAHAN AJAR / RINGKASAN MATERI");
  const details = getSubjectDetails(subData.id, topicName);
  const textUtama = getCachedContent("bahanAjarText", details.bahanAjarText);

  return `
    ${headers}
    <div style="margin-top: 15px;">
      <!-- Komponen 1: Judul Bahan Ajar -->
      <div style="border-bottom: 2px solid #0b5e56; padding-bottom: 8px; margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #0b5e56; margin: 0;">
          JUDUL: BAHAN AJAR MANDIRI - ${topicName.toUpperCase()}
        </h2>
      </div>

      <!-- Komponen 2: Petunjuk Belajar -->
      <div style="background-color: #eaf4f3; padding: 12px 15px; border-radius: 8px; border-left: 4px solid #0b5e56; margin-bottom: 20px; font-size: 13px;">
        <h4 style="margin: 0 0 6px 0; color: #0b5e56; font-weight: 600; display: flex; align-items: center; gap: 6px;">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;stroke-width:2.5;fill:none;color:#0b5e56;"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          PETUNJUK BELAJAR UNTUK SISWA
        </h4>
        <ol style="margin: 0; padding-left: 18px; line-height: 1.5; color: #1f2f2c;">
          <li>Bacalah bagian Materi Pokok di bawah ini dengan tenang dan saksama.</li>
          <li>Tandai kata kunci penting, istilah baru, atau ringkasan menarik yang kamu temukan.</li>
          <li>Apabila ada penjelasan yang kurang dipahami, silakan berdiskusi dengan teman sebangku atau langsung bertanya kepada Guru secara santun.</li>
          <li>Setelah memahami materi, cobalah kerjakan tantangan atau soal latihan mandiri yang disediakan di akhir halaman.</li>
        </ol>
      </div>

      <!-- Komponen 3: Materi Pokok -->
      <div style="margin-top: 10px;">
        <h4 style="color: #0b5e56; margin-bottom: 12px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; border-bottom: 1px dashed rgba(11, 94, 86, 0.12); padding-bottom: 5px;">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;stroke-width:2.5;fill:none;color:#0b5e56;"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          MATERI POKOK (SUBSTANSI)
        </h4>
        <div class="editable-content" data-field="bahanAjarText">${textUtama}</div>
      </div>
    </div>
    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: LKPD (Lembar Kerja Peserta Didik)
// ----------------------------------------------------
function compileLkpd(subData, chData, topicName) {
  const headers = compileHeaderIdentitas("LEMBAR KERJA PESERTA DIDIK (LKPD)");
  const details = getSubjectDetails(subData.id, topicName);
  const lkpdContent = getCachedContent("lkpdContent", details.lkpdContent);

  return `
    ${headers}
    <div class="editable-content" data-field="lkpdContent">${lkpdContent}</div>
    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: ASESMEN
// ----------------------------------------------------
function compileAsesmen(subData, chData, topicName) {
  const headers = compileHeaderIdentitas("RUBRIK ASESMEN PEMBELAJARAN");
  const details = getSubjectDetails(subData.id, topicName);
  const rubricContent = getCachedContent("rubricContent", details.rubricContent);

  return `
    ${headers}
    <div class="editable-content" data-field="rubricContent">${rubricContent}</div>
    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: KKTP (Kriteria Ketercapaian Tujuan Pembelajaran)
// ----------------------------------------------------
function compileKKTP(subData, chData, topicName) {
  const headers = compileHeaderIdentitas("KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)");
  const details = getSubjectDetails(subData.id, topicName);
  const tp = getCachedContent("tp", details.tp);
  
  let category = "indonesia";
  if (subData.id.includes("matematika")) category = "matematika";
  else if (subData.id.includes("koding")) category = "koding";
  else if (subData.id.includes("pjok")) category = "pjok";
  else if (subData.id.includes("senirupa")) category = "senirupa";
  else if (subData.id.includes("pai")) category = "pai";
  else if (subData.id.includes("kristen")) category = "kristen";
  else if (subData.id.includes("pancasila")) category = "pancasila";
  else if (subData.id.includes("ipas")) category = "ipas";
  else if (subData.id.includes("english")) category = "english";
  else if (subData.id.includes("jawa")) category = "jawa";

  let rubrikHtml = "";
  
  if (category === "matematika") {
    rubrikHtml = `
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: var(--primary-light); color: var(--primary);">
            <th style="width: 25%;">Kriteria / Aspek Asesmen</th>
            <th style="width: 18%;">Baru Berkembang (0 - 60)</th>
            <th style="width: 18%;">Layak (61 - 70)</th>
            <th style="width: 18%;">Cakap (71 - 85)</th>
            <th style="width: 21%;">Mahir (86 - 100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold">Pemahaman Konsep dan Rumus</td>
            <td>Belum mampu memahami konsep dasar <b>${topicName}</b> dan salah dalam menggunakan rumus dasar.</td>
            <td>Mampu memahami konsep dasar <b>${topicName}</b> namun masih sering keliru dalam perhitungan rumus.</td>
            <td>Memahami konsep <b>${topicName}</b> dengan baik dan mampu menyelesaikan operasi hitung secara tepat.</td>
            <td>Sangat menguasai konsep <b>${topicName}</b>, mampu menganalisis hubungan konsep, dan menyelesaikan soal rumit dengan cepat.</td>
          </tr>
          <tr>
            <td class="fw-bold">Manipulasi Objek Nyata (Konkret)</td>
            <td>Belum terampil memanipulasi stik, kertas, atau alat peraga fisik untuk mendalami <b>${topicName}</b>.</td>
            <td>Mampu menggunakan alat peraga konkret untuk <b>${topicName}</b> namun memerlukan bimbingan guru secara intensif.</td>
            <td>Terampil memanipulasi alat peraga konkret secara mandiri untuk mengilustrasikan <b>${topicName}</b>.</td>
            <td>Sangat mahir memanipulasi alat peraga konkret, bahkan mampu membimbing teman sekelompok mendalami <b>${topicName}</b>.</td>
          </tr>
          <tr>
            <td class="fw-bold">Representasi Visual (Gambar)</td>
            <td>Belum mampu menuangkan hasil praktik fisik menjadi sketsa gambar, tabel, atau arsiran visual.</td>
            <td>Mampu menggambar diagram atau pola visual sederhana terkait <b>${topicName}</b> namun kurang rapi atau kurang lengkap.</td>
            <td>Mampu menyusun diagram, sketsa visual, atau peta konsep <b>${topicName}</b> secara rapi dan tepat.</td>
            <td>Sangat mahir menyajikan representasi visual yang kreatif, detail, and informatif mengenai <b>${topicName}</b>.</td>
          </tr>
          <tr>
            <td class="fw-bold">Simbolisasi Abstrak</td>
            <td>Belum mampu menerjemahkan gambar visual menjadi lambang bilangan, angka, atau persamaan matematika formal.</td>
            <td>Mampu menuliskan angka atau persamaan formal matematika dasar dari <b>${topicName}</b> dengan bantuan petunjuk.</td>
            <td>Mampu merumuskan simbol dan persamaan matematika formal dari <b>${topicName}</b> secara mandiri dan akurat.</td>
            <td>Sangat mahir menghubungkan simbol-simbol abstrak formal matematika dan merumuskan kesimpulan teoretis secara mandiri.</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (category === "koding") {
    rubrikHtml = `
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: var(--primary-light); color: var(--primary);">
            <th style="width: 25%;">Kriteria / Aspek Asesmen</th>
            <th style="width: 18%;">Baru Berkembang (0 - 60)</th>
            <th style="width: 18%;">Layak (61 - 70)</th>
            <th style="width: 18%;">Cakap (71 - 85)</th>
            <th style="width: 21%;">Mahir (86 - 100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold">Logika Algoritma Koding</td>
            <td>Belum memahami runtutan logika langkah perintah untuk memprogram <b>${topicName}</b>.</td>
            <td>Memahami logika dasar <b>${topicName}</b> namun sering keliru menyusun runtutan urutan perintah.</td>
            <td>Mampu menyusun logika langkah instruksi koding <b>${topicName}</b> secara runtut dan sistematis.</td>
            <td>Sangat menguasai logika algoritma koding, mampu mengoptimalkan efisiensi blok kode secara mandiri.</td>
          </tr>
          <tr>
            <td class="fw-bold">Praktik Unplugged Koding (Game Fisik)</td>
            <td>Belum terampil mengikuti instruksi kartu arah atau bertindak sebagai robot koding fisik.</td>
            <td>Mampu memainkan peran programmer/robot fisik dengan bimbingan dan koreksi guru.</td>
            <td>Mampu mensimulasikan logika langkah <b>${topicName}</b> secara fisik menggunakan kartu arah secara mandiri.</td>
            <td>Sangat terampil memandu teman dan menciptakan rintangan logika koding fisik yang kreatif secara mandiri.</td>
          </tr>
          <tr>
            <td class="fw-bold">Peta Alir Visual (Flowchart)</td>
            <td>Belum mampu merancang flowchart visual untuk menggambarkan alur program.</td>
            <td>Mampu menggambar bagan flowchart sederhana namun alurnya masih ada yang terputus atau salah arah.</td>
            <td>Mampu menggambar flowchart visual alur program <b>${topicName}</b> secara lengkap, rapi, dan tepat.</td>
            <td>Sangat mahir merancang bagan alur program yang kompleks, rapi, dan menyertakan simbol percabangan/perulangan dengan benar.</td>
          </tr>
          <tr>
            <td class="fw-bold">Implementasi Kode & Debugging</td>
            <td>Belum mampu menyusun blok kode Scratch atau mendeteksi error (bug) dalam program.</td>
            <td>Mampu menyusun blok koding digital Scratch namun memerlukan bantuan intensif untuk men-debug bug.</td>
            <td>Mampu menyusun program digital <b>${topicName}</b> di komputer/tablet dan men-debug error minor secara mandiri.</td>
            <td>Sangat mahir mengimplementasikan koding Scratch yang kompleks dan bersih dari bug secara mandiri dan cepat.</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (category === "ipas") {
    rubrikHtml = `
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: var(--primary-light); color: var(--primary);">
            <th style="width: 25%;">Kriteria / Aspek Asesmen</th>
            <th style="width: 18%;">Baru Berkembang (0 - 60)</th>
            <th style="width: 18%;">Layak (61 - 70)</th>
            <th style="width: 18%;">Cakap (71 - 85)</th>
            <th style="width: 21%;">Mahir (86 - 100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold">Pemahaman Konsep Ilmiah</td>
            <td>Belum memahami konsep ilmiah/sosial dasar terkait fenomena <b>${topicName}</b>.</td>
            <td>Mampu menyebutkan definisi dasar <b>${topicName}</b> namun belum memahami hubungan sebab-akibat fenomena tersebut.</td>
            <td>Memahami hubungan sebab-akibat proses ilmiah/sosial <b>${topicName}</b> secara tepat dan logis.</td>
            <td>Sangat mendalam memahami konsep, mampu mengaitkannya dengan fenomena global, serta memberi solusi kritis.</td>
          </tr>
          <tr>
            <td class="fw-bold">Eksperimen / Observasi Fisik</td>
            <td>Belum terampil menggunakan alat praktikum (termometer, magnet, lup) atau melakukan pengamatan.</td>
            <td>Mampu melakukan praktikum/observasi mengenai <b>${topicName}</b> namun masih canggung dan kurang teliti.</td>
            <td>Terampil melakukan praktikum ilmiah secara mandiri, aman, dan teliti bersama kelompok.</td>
            <td>Sangat mahir melakukan observasi mandiri, memimpin tim eksperimen, and memecahkan masalah praktikum secara kreatif.</td>
          </tr>
          <tr>
            <td class="fw-bold">Pencatatan Data & Visualisasi</td>
            <td>Belum mampu menuliskan hasil pengamatan ke dalam tabel, diagram, atau peta konsep visual.</td>
            <td>Mampu mencatat hasil pengamatan tetapi diagram/tabel visual yang dibuat kurang rapi atau datanya kurang lengkap.</td>
            <td>Mampu merekam data pengamatan secara akurat dan menyajikannya dalam tabel/diagram visual yang rapi.</td>
            <td>Sangat terampil menyajikan infografis, diagram alir, atau mind map yang artistik dan informatif dari hasil data.</td>
          </tr>
          <tr>
            <td class="fw-bold">Rumusan Kesimpulan & Komunikasi</td>
            <td>Belum mampu menarik kesimpulan dari eksperimen dan pasif saat presentasi di kelas.</td>
            <td>Mampu merumuskan kesimpulan sederhana dan membacakannya saat presentasi dengan intonasi datar.</td>
            <td>Mampu merumuskan kesimpulan ilmiah secara formal, menjelaskan sebab-akibat, and mempresentasikannya secara percaya diri.</td>
            <td>Sangat mahir mengomunikasikan hasil kesimpulan ilmiah secara meyakinkan, menjawab pertanyaan kritis, dan membimbing diskusi.</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (category === "pancasila") {
    rubrikHtml = `
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: var(--primary-light); color: var(--primary);">
            <th style="width: 25%;">Kriteria / Aspek Asesmen</th>
            <th style="width: 18%;">Baru Berkembang (0 - 60)</th>
            <th style="width: 18%;">Layak (61 - 70)</th>
            <th style="width: 18%;">Cakap (71 - 85)</th>
            <th style="width: 21%;">Mahir (86 - 100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold">Pemahaman Nilai Pancasila/Aturan</td>
            <td>Belum memahami nilai moral Pancasila, simbol negara, atau tata tertib terkait <b>${topicName}</b>.</td>
            <td>Mampu menyebutkan simbol atau aturan dasar tetapi belum bisa menjelaskan tujuannya bagi kehidupan bersama.</td>
            <td>Memahami dan mampu menceritakan urgensi serta tujuan mematuhi aturan/nilai Pancasila secara jelas.</td>
            <td>Sangat menguasai nilai Pancasila, mampu menganalisis hubungan norma sosial, dan memberikan masukan kritis.</td>
          </tr>
          <tr>
            <td class="fw-bold">Penerapan Gotong Royong / Kolaborasi</td>
            <td>Belum bersedia ikut serta bekerja bakti atau berdiskusi kelompok di kelas.</td>
            <td>Ikut berpartisipasi dalam gotong royong/diskusi kelompok namun pasif dan sering menunggu instruksi teman.</td>
            <td>Menunjukkan sikap kooperatif, aktif berbagi peran, and saling menghargai pendapat teman sekelompok.</td>
            <td>Menjadi inisiator kolaborasi, memimpin pembagian tugas secara adil, and menyelesaikan gesekan kelompok secara damai.</td>
          </tr>
          <tr>
            <td class="fw-bold">Simulasi Sikap & Role-play</td>
            <td>Belum mampu mensimulasikan perilaku baik (sopan, antre, tertib) dalam bermain peran.</td>
            <td>Mampu bermain peran menunjukkan sikap sopan/tertib namun ekspresi masih canggung dan kaku.</td>
            <td>Mampu bermain peran mempraktikkan sikap terpuji terkait <b>${topicName}</b> secara percaya diri dan natural.</td>
            <td>Sangat mahir menjiwai peran, menyampaikan pesan moral dengan kuat, and menjadi teladan perilaku nyata di kelas.</td>
          </tr>
          <tr>
            <td class="fw-bold">Refleksi Sikap Nyata</td>
            <td>Belum mampu mengidentifikasi kesalahan perilaku diri sendiri yang melanggar aturan.</td>
            <td>Mampu mengidentifikasi perilaku tidak baik tetapi belum bisa menjelaskan cara memperbaikinya.</td>
            <td>Mampu merefleksikan diri, mengakui kekeliruan sikap, and merumuskan janji perbaikan diri secara tertulis.</td>
            <td>Secara mandiri dan konsisten mempraktikkan pembiasaan karakter luhur Pancasila tanpa diawasi oleh guru.</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (category === "kristen" || category === "pai") {
    rubrikHtml = `
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: var(--primary-light); color: var(--primary);">
            <th style="width: 25%;">Kriteria / Aspek Asesmen</th>
            <th style="width: 18%;">Baru Berkembang (0 - 60)</th>
            <th style="width: 18%;">Layak (61 - 70)</th>
            <th style="width: 18%;">Cakap (71 - 85)</th>
            <th style="width: 21%;">Mahir (86 - 100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold">Pemahaman Nilai Ajaran Moral Agama</td>
            <td>Belum memahami dasar ajaran moral Alkitab/Hadis terkait kisah/tema <b>${topicName}</b>.</td>
            <td>Mampu menceritakan kembali kisah agama sederhana namun belum menangkap makna moral spiritual di dalamnya.</td>
            <td>Memahami dan mampu menceritakan makna moral spiritual dari ajaran agama secara tepat dan jelas.</td>
            <td>Sangat mendalam memahami pesan firman Tuhan/Hadis, mampu mengaitkannya dengan kehidupan sosial secara kritis.</td>
          </tr>
          <tr>
            <td class="fw-bold">Adab Beribadah & Berdoa</td>
            <td>Belum menunjukkan sikap tenang, tertib, and khusyuk saat berdoa bersama di kelas.</td>
            <td>Mampu mengikuti tata cara berdoa/ibadah dengan tertib namun masih sering tidak fokus atau terdistraksi.</td>
            <td>Menunjukkan adab berdoa yang sangat baik (sikap melipat tangan/tertib, hening, dan fokus) secara konsisten.</td>
            <td>Sangat khusyuk beribadah, mampu memimpin doa pembuka/penutup kelas secara tulus, runtut, and bermakna.</td>
          </tr>
          <tr>
            <td class="fw-bold">Sikap Kasih dan Toleransi Sosial</td>
            <td>Belum bersedia berbagi dengan teman atau menunjukkan sikap kurang toleran terhadap perbedaan.</td>
            <td>Mau berteman dengan sesama tetapi masih membeda-bedakan berdasarkan latar belakang suku/agama.</td>
            <td>Menunjukkan sikap toleran yang tulus, senang menolong teman kesulitan, dan mempraktikkan kasih sesama secara nyata.</td>
            <td>Menjadi teladan kerukunan, memelopori aktivitas tolong-menolong lintas teman, and bersikap ramah kepada semua orang.</td>
          </tr>
          <tr>
            <td class="fw-bold">Komitmen Karakter Nyata</td>
            <td>Belum mampu merumuskan komitmen tertulis atau doa pribadi untuk perbaikan akhlak.</td>
            <td>Mampu menuliskan doa/komitmen sederhana tetapi masih bersifat formalitas dan belum diterapkan di rumah.</td>
            <td>Mampu merumuskan komitmen iman/akhlak tertulis secara mandiri dan bertekad menerapkannya di lingkungan rumah.</td>
            <td>Secara konsisten menjalankan komitmen iman di kehidupan sehari-hari (dibuktikan dengan catatan kebaikan bersama orang tua).</td>
          </tr>
        </tbody>
      </table>
    `;
  } else {
    rubrikHtml = `
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: var(--primary-light); color: var(--primary);">
            <th style="width: 25%;">Kriteria / Aspek Asesmen</th>
            <th style="width: 18%;">Baru Berkembang (0 - 60)</th>
            <th style="width: 18%;">Layak (61 - 70)</th>
            <th style="width: 18%;">Cakap (71 - 85)</th>
            <th style="width: 21%;">Mahir (86 - 100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold">Keterampilan Membaca / Artikulasi</td>
            <td>Belum mampu mengeja kata-kata dasar dan suara membaca tidak terdengar (kurang nyaring).</td>
            <td>Mampu membaca kata dasar tetapi intonasi masih terbata-bata, kurang memperhatikan tanda titik/koma.</td>
            <td>Membaca dengan lancar, artikulasi kata jelas, dan intonasi tepat sesuai tanda baca yang tertera.</td>
            <td>Membaca nyaring secara ekspresif, artikulasi sangat sempurna, dan mampu menjiwai emosi karakter teks.</td>
          </tr>
          <tr>
            <td class="fw-bold">Menyusun Struktur Kata / Kalimat</td>
            <td>Belum mampu menyusun kartu kata menjadi satu kalimat utuh yang berpola subjek-predikat.</td>
            <td>Mampu menyusun kalimat dasar namun struktur tanda bacanya (kapital/titik) masih sering salah.</td>
            <td>Mampu merangkai kalimat berpola SPOK dan menulis paragraf deskriptif secara runtut dan sistematis.</td>
            <td>Sangat mahir merangkai kalimat kompleks, kaya kosakata baru, and menulis paragraf deskriptif yang sangat hidup.</td>
          </tr>
          <tr>
            <td class="fw-bold">Komunikasi Lisan & Bermain Peran</td>
            <td>Belum berani berbicara di depan kelas dan pasif saat diminta melakukan percakapan peran.</td>
            <td>Mampu berkomunikasi lisan dasar tetapi suara masih sangat lirih dan kontak mata dengan lawan bicara kurang.</td>
            <td>Mampu melakukan wawancara/percakapan secara percaya diri, suara lantang, and kontak mata terjaga baik.</td>
            <td>Sangat lancar mengomunikasikan gagasan secara persuasif, berani menjawab tanggapan secara taktis, and ekspresif.</td>
          </tr>
          <tr>
            <td class="fw-bold">Kreativitas Storyboard / Konsep Visual</td>
            <td>Belum mampu menggambarkan ilustrasi visual atau peta pikiran alur cerita kelompok.</td>
            <td>Mampu menggambarkan sketsa visual alur cerita sederhana namun detail informasinya kurang lengkap.</td>
            <td>Mampu menyusun storyboard alur cerita secara rapi, indah, and bermakna bagi penonton.</td>
            <td>Sangat mahir mendesain ilustrasi visual yang artistik, memiliki jalinan konsep cerita yang sangat kuat.</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  return `
    ${headers}
    <div style="margin-top: 15px;">
      <h3 class="fw-bold">I. Tujuan Pembelajaran (TP)</h3>
      <p style="margin-bottom: 12px;">Tujuan Pembelajaran yang diukur ketercapaiannya pada pertemuan ini adalah:</p>
      <div class="editable-content" data-field="tp" style="background-color: var(--primary-light); padding: 12px; border-left: 4px solid var(--primary); border-radius: var(--radius-sm); margin-bottom: 25px;">
        ${tp}
      </div>
      
      <h3 class="fw-bold" style="margin-bottom: 12px;">II. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</h3>
      <p style="margin-bottom: 15px;">Instrumen penilaian di bawah ini menggunakan <b>Interval Nilai Kriteria Deskriptif</b> untuk mengklasifikasikan tingkat kompetensi peserta didik setelah menuntaskan pembelajaran:</p>
      
      ${rubrikHtml}
      
      <div style="margin-top: 25px; background-color: #fafafa; border-radius: var(--radius-sm); padding: 15px; border: 1px solid var(--border-color); font-size: 13px; line-height: 1.5;">
        <h4 class="fw-bold" style="margin-bottom: 6px; color: var(--text-main);">Petunjuk Interval Ketercapaian:</h4>
        <ul>
          <li><b>0 - 60% (Baru Berkembang)</b>: Belum mencapai ketuntasan minimum. Murid perlu intervensi khusus dan pendampingan remedial intensif dari guru.</li>
          <li><b>61 - 70% (Layak)</b>: Sudah mencapai ketuntasan dasar. Murid perlu penguatan pada aspek-aspek kriteria yang dinilai masih lemah.</li>
          <li><b>71 - 85% (Cakap)</b>: Sudah mencapai ketuntasan penuh. Murid siap beraktivitas mandiri tanpa pengawasan melekat.</li>
          <li><b>86 - 100% (Mahir)</b>: Sudah melampaui ketuntasan. Murid siap diberikan tantangan berupa pengayaan atau menjadi tutor sebaya.</li>
        </ul>
      </div>
    </div>
    ${compileTandaTangan()}
  `;
}

// ----------------------------------------------------
// RENDER TEMPLATES: CP UNTUK E-RAPORT
// ----------------------------------------------------
function compileERaport(subData, fase) {
  const headers = compileHeaderIdentitas("DESKRIPSI CAPAIAN KOMPETENSI UNTUK E-RAPORT");
  let listCp = "";

  const getNeutralVerb = (subjectId, chapterTitle, topics) => {
    const lowTitle = chapterTitle.toLowerCase();
    
    if (subjectId === "matematika") {
      if (lowTitle.includes("hitung") || lowTitle.includes("tambah") || lowTitle.includes("kurang") || lowTitle.includes("kali") || lowTitle.includes("bagi")) return "Menghitung";
      if (lowTitle.includes("pecahan") || lowTitle.includes("desimal")) return "Menyelesaikan masalah";
      if (lowTitle.includes("bangun") || lowTitle.includes("geometri")) return "Mengidentifikasi bangun";
      if (lowTitle.includes("ukur") || lowTitle.includes("panjang") || lowTitle.includes("berat")) return "Mengukur";
      if (lowTitle.includes("data") || lowTitle.includes("grafik")) return "Mengolah data";
      return "Menentukan";
    }
    if (subjectId === "indonesia") {
      if (lowTitle.includes("baca") || lowTitle.includes("nyaring")) return "Membaca";
      if (lowTitle.includes("tulis") || lowTitle.includes("kalimat")) return "Menulis";
      if (lowTitle.includes("bicara") || lowTitle.includes("kenal") || lowTitle.includes("tanya")) return "Mengomunikasikan";
      if (lowTitle.includes("dongeng") || lowTitle.includes("cerita")) return "Menceritakan kembali";
      return "Memahami";
    }
    if (subjectId === "pancasila") {
      if (lowTitle.includes("aturan") || lowTitle.includes("patuh")) return "Mematuhi aturan";
      if (lowTitle.includes("gotong royong") || lowTitle.includes("kerja sama")) return "Menerapkan gotong royong";
      if (lowTitle.includes("simbol") || lowTitle.includes("pancasila")) return "Mengidentifikasi simbol";
      if (lowTitle.includes("bhinneka") || lowTitle.includes("beda") || lowTitle.includes("identitas")) return "Menghargai keberagaman";
      return "Menerapkan";
    }
    if (subjectId === "pai") {
      if (lowTitle.includes("wudu") || lowTitle.includes("salat") || lowTitle.includes("suci") || lowTitle.includes("doa")) return "Mempraktikkan";
      if (lowTitle.includes("nabi") || lowTitle.includes("kisah") || lowTitle.includes("akhlak") || lowTitle.includes("jujur")) return "Meneladani";
      if (lowTitle.includes("huruf") || lowTitle.includes("baca") || lowTitle.includes("alquran") || lowTitle.includes("surah")) return "Melafalkan";
      return "Mengenal";
    }
    if (subjectId === "pjok") {
      if (lowTitle.includes("gerak") || lowTitle.includes("lokomotor") || lowTitle.includes("manipulatif")) return "Mempraktikkan gerak";
      if (lowTitle.includes("senam") || lowTitle.includes("lantai") || lowTitle.includes("keseimbangan") || lowTitle.includes("irama")) return "Mempraktikkan senam";
      if (lowTitle.includes("sehat") || lowTitle.includes("gizi") || lowTitle.includes("tubuh")) return "Memahami cara menjaga kesehatan";
      return "Mempraktikkan";
    }
    if (subjectId === "senirupa") {
      if (lowTitle.includes("gambar") || lowTitle.includes("sketsa") || lowTitle.includes("ekspresi")) return "Menggambar";
      if (lowTitle.includes("kolase") || lowTitle.includes("tempel") || lowTitle.includes("3d") || lowTitle.includes("clay") || lowTitle.includes("miniatur") || lowTitle.includes("konstruksi")) return "Membuat karya";
      return "Mengeksplorasi";
    }
    if (subjectId === "english") {
      if (lowTitle.includes("greet") || lowTitle.includes("introduce") || lowTitle.includes("talk") || lowTitle.includes("speak")) return "Mengucapkan kosakata";
      return "Merespons instruksi";
    }
    if (subjectId === "jawa") {
      if (lowTitle.includes("tembang") || lowTitle.includes("dolanan") || lowTitle.includes("dongeng")) return "Melafalkan";
      if (lowTitle.includes("kulawarga") || lowTitle.includes("silsilah")) return "Mengidentifikasi silsilah";
      if (lowTitle.includes("krama") || lowTitle.includes("unggah")) return "Memahami unggah-ungguh";
      return "Memahami";
    }
    if (subjectId === "koding") {
      if (lowTitle.includes("algoritma") || lowTitle.includes("scratch") || lowTitle.includes("game")) return "Membuat program";
      if (lowTitle.includes("ai") || lowTitle.includes("kecerdasan")) return "Mengidentifikasi konsep";
      return "Menerapkan";
    }
    if (subjectId === "ipas") {
      if (lowTitle.includes("cahaya") || lowTitle.includes("bunyi") || lowTitle.includes("energi") || lowTitle.includes("gaya")) return "Menyelidiki";
      if (lowTitle.includes("tumbuhan") || lowTitle.includes("hewan") || lowTitle.includes("tubuh") || lowTitle.includes("siklus")) return "Menganalisis";
      if (lowTitle.includes("sosial") || lowTitle.includes("sejarah") || lowTitle.includes("ekonomi")) return "Memahami kondisi";
      return "Mengidentifikasi";
    }
    
    if (lowTitle.includes("kenal") || lowTitle.includes("tahu") || lowTitle.includes("arti")) return "Mengidentifikasi";
    if (lowTitle.includes("buat") || lowTitle.includes("karya") || lowTitle.includes("praktik")) return "Mempraktikkan";
    return "Memahami";
  };

  const buildBodyForERaport = (subjectId, verb, cleanTitle, topics, maxChars) => {
    const lowTitle = cleanTitle.toLowerCase();
    let base = `${verb} ${lowTitle}`;
    
    if (base.length > maxChars) {
      return base.substring(0, maxChars - 3) + "...";
    }
    
    if (!topics || topics.length === 0) {
      return base;
    }
    
    const cleanTopics = topics.map(t => {
      return t.replace(/\s*\([^)]*\)/g, '')
              .replace(/\s*\[[^\]]*\]/g, '')
              .replace(/['"\u201c\u201d]/g, '')
              .trim();
    });
    
    let connector = " mengenai ";
    if (subjectId === "matematika") connector = " tentang ";
    else if (subjectId === "pai") connector = " dengan meneladani ";
    else if (subjectId === "pancasila") connector = " meliputi ";
    else if (subjectId === "pjok") connector = " melalui ";
    else if (subjectId === "senirupa") connector = " dengan mempraktikkan ";
    else if (subjectId === "english") connector = " for ";
    else if (subjectId === "jawa") connector = " ngenani ";
    
    let tempBody = base + connector;
    let addedTopics = [];
    
    for (let i = 0; i < cleanTopics.length; i++) {
      let topicPart = cleanTopics[i].toLowerCase();
      if (lowTitle.includes(topicPart) || topicPart.includes(lowTitle)) {
        continue;
      }
      
      let potentialTopics = [...addedTopics, topicPart];
      let joinedTopics = potentialTopics.join(", ");
      
      if (potentialTopics.length > 1) {
        const lastIndex = joinedTopics.lastIndexOf(", ");
        joinedTopics = joinedTopics.substring(0, lastIndex) + " dan " + joinedTopics.substring(lastIndex + 2);
      }
      
      if ((tempBody + joinedTopics).length <= maxChars) {
        addedTopics.push(topicPart);
      } else {
        break;
      }
    }
    
    if (addedTopics.length > 0) {
      let joined = addedTopics.join(", ");
      if (addedTopics.length > 1) {
        const lastIndex = joined.lastIndexOf(", ");
        joined = joined.substring(0, lastIndex) + " dan " + joined.substring(lastIndex + 2);
      }
      return tempBody + joined;
    }
    
    return base;
  };

  subData.chapters.forEach(ch => {
    // Function to clean text from parentheses and brackets to make it readable in raport descriptions
    const cleanText = (txt) => {
      if (!txt) return '';
      return txt
        .replace(/\s*\([^)]*\)/g, '') // remove (brackets content)
        .replace(/\s*\[[^\]]*\]/g, '') // remove [square brackets content]
        .replace(/['"\u201c\u201d]/g, '') // remove quotes
        .trim();
    };

    const titleText = ch.title.trim();
    const cleanTitle = cleanText(titleText);
    const lowTitle = cleanTitle.toLowerCase();

    // 1. Construct Neutral Summary (under 150 chars) using action verb
    const verb = getNeutralVerb(subData.id, cleanTitle, ch.topics || []);
    let netralBody = buildBodyForERaport(subData.id, verb, cleanTitle, ch.topics || [], 148);
    let netral = netralBody.charAt(0).toUpperCase() + netralBody.slice(1) + ".";

    // 2. Construct Tercapai description under 150 chars based on Neutral text
    let tercapai = "";
    let bodyA = buildBodyForERaport(subData.id, verb, cleanTitle, ch.topics || [], 107);
    let tercapaiA = `Menunjukkan penguasaan sangat baik dalam ${bodyA.charAt(0).toLowerCase() + bodyA.slice(1)}.`;
    
    if (tercapaiA.length <= 149) {
      tercapai = tercapaiA;
    } else {
      let bodyB = buildBodyForERaport(subData.id, verb, cleanTitle, ch.topics || [], 130);
      tercapai = `Sangat baik dalam ${bodyB.charAt(0).toLowerCase() + bodyB.slice(1)}.`;
    }

    // 3. Construct Perlu Bimbingan description under 150 chars based on Neutral text
    let bimbingan = "";
    let bodyBimbA = buildBodyForERaport(subData.id, verb, cleanTitle, ch.topics || [], 126);
    let bimbinganA = `Perlu bimbingan dalam ${bodyBimbA.charAt(0).toLowerCase() + bodyBimbA.slice(1)}.`;
    
    if (bimbinganA.length <= 149) {
      bimbingan = bimbinganA;
    } else {
      let bodyBimbB = buildBodyForERaport(subData.id, verb, cleanTitle, ch.topics || [], 131);
      bimbingan = `Perlu bimbingan: ${bodyBimbB.charAt(0).toLowerCase() + bodyBimbB.slice(1)}.`;
    }

    listCp += `
      <div style="border-bottom:1px solid var(--border-color); padding: 12px 0;">
        <p class="fw-bold" style="color: var(--primary);">Bab ${ch.no}: ${ch.title}</p>
        
        <p style="margin-top: 5px; font-size:13px; margin-bottom: 2px;"><b>Opsi A: Ringkasan Kompetensi (Netral - Tanpa Predikat) - ${netral.length} karakter:</b></p>
        <span style="background-color: rgba(11, 94, 86, 0.05); color: var(--primary); padding: 5px 10px; border-radius: 4px; display: inline-block; font-family: monospace; font-size:12px; margin-bottom: 8px;">
          "${netral}"
        </span>
        
        <p style="font-size:13px; margin-bottom: 2px;"><b>Opsi B: Kalimat E-Raport (Tercapai - Sangat Baik) - ${tercapai.length} karakter:</b></p>
        <span style="background-color: var(--joyful-bg); color: var(--joyful); padding: 5px 10px; border-radius: 4px; display: inline-block; font-family: monospace; font-size:12px; margin-bottom: 8px;">
          "${tercapai}"
        </span>
        
        <p style="font-size:13px; margin-bottom: 2px;"><b>Opsi C: Kalimat E-Raport (Perlu Bimbingan) - ${bimbingan.length} karakter:</b></p>
        <span style="background-color: var(--meaningful-bg); color: var(--meaningful); padding: 5px 10px; border-radius: 4px; display: inline-block; font-family: monospace; font-size:12px;">
          "${bimbingan}"
        </span>
      </div>
    `;
  });

  return `
    ${headers}
    <h2>Capaian Kompetensi Fase ${fase} - ${subData.title}</h2>
    <p class="text-muted" style="margin-bottom:15px; font-size: 13px;">Berikut adalah deskripsi capaian kompetensi per bab yang disesuaikan secara khusus agar memiliki panjang maksimal 150 karakter (cocok untuk langsung disalin ke Sistem E-Raport Dapodik).</p>
    ${listCp}
    ${compileTandaTangan()}
  `;
}
// ----------------------------------------------------
// SHARED UTILITIES: Header Identitas & Tanda Tangan
// ----------------------------------------------------
function compileHeaderIdentitas(judulDokumen) {
  return `
    <div class="doc-identitas-header" style="text-align: center; margin-bottom: 20px;">
      <h1 style="margin: 0; text-align: center; font-size: 20px; color:#0b5e56; text-transform: uppercase;">${judulDokumen}</h1>
    </div>
  `;
}

function compileTandaTangan() {
  const kotaName = state.teacherProfile.kota || "Karangmangu";
  const tahunAjar = state.teacherProfile.tahunAjaran ? state.teacherProfile.tahunAjaran.split('/')[0] : "2026";
  return `
    <div class="no-print" style="margin-top: 40px; border-top: 1px dashed var(--border-color); padding-top: 20px;"></div>
    <table style="width: 100%; border: none !important; margin-top: 30px; font-size: 12px; border-collapse: collapse;">
      <tr style="border: none !important;">
        <td style="width: 50%; border: none !important; text-align: center; padding: 10px 0;">
          Mengetahui,<br>
          Kepala Sekolah ${state.teacherProfile.namaSekolah}<br><br><br><br>
          <span class="fw-bold" style="text-decoration: underline;">${state.teacherProfile.kepalaSekolah}</span><br>
          NIP. ${state.teacherProfile.nipKepala}
        </td>
        <td style="width: 50%; border: none !important; text-align: center; padding: 10px 0;">
          ${kotaName}, ........................ ${tahunAjar}<br>
          Guru Kelas ${state.selectedClass}<br><br><br><br>
          <span class="fw-bold" style="text-decoration: underline;">${state.teacherProfile.namaGuru}</span><br>
          NIP. ${state.teacherProfile.nip}
        </td>
      </tr>
    </table>
  `;
}

// ----------------------------------------------------
// NEW DYNAMIC PROFILE LULUSAN & DESAIN PEMBELAJARAN
// ----------------------------------------------------
function getProfileLulusanChecked(subjectId, topicName) {
  const result = {
    iman: false,
    kritis: false,
    kolaborasi: false,
    kesehatan: false,
    kewargaan: false,
    kreativitas: false,
    kemandirian: false,
    komunikasi: false
  };

  const topicLower = (topicName || "").toLowerCase();

  // 1. Pencocokan otomatis berbasis Kata Kunci dari Topik Pertemuan
  // Keimanan & Ketaqwaan
  if (
    topicLower.includes("iman") || 
    topicLower.includes("taqwa") || 
    topicLower.includes("akhlak") || 
    topicLower.includes("wudu") || 
    topicLower.includes("wudhu") || 
    topicLower.includes("salat") || 
    topicLower.includes("sholat") || 
    topicLower.includes("doa") || 
    topicLower.includes("ibadah") || 
    topicLower.includes("tuhan") || 
    topicLower.includes("rasul") || 
    topicLower.includes("nabi") ||
    subjectId.includes("pai")
  ) {
    result.iman = true;
  }

  // Penalaran Kritis
  if (
    topicLower.includes("hitung") || 
    topicLower.includes("pecahan") || 
    topicLower.includes("logika") || 
    topicLower.includes("algoritma") || 
    topicLower.includes("analisis") || 
    topicLower.includes("eksperimen") || 
    topicLower.includes("selidiki") || 
    topicLower.includes("sains") || 
    topicLower.includes("koding") ||
    topicLower.includes("kode") ||
    topicLower.includes("komputasi") ||
    subjectId.includes("matematika") ||
    subjectId.includes("koding") ||
    subjectId.includes("ipas")
  ) {
    result.kritis = true;
  }

  // Kolaborasi
  if (
    topicLower.includes("kelompok") || 
    topicLower.includes("game") || 
    topicLower.includes("permainan") || 
    topicLower.includes("gotong royong") || 
    topicLower.includes("kolaborasi") || 
    topicLower.includes("diskusi") || 
    topicLower.includes("bareng") ||
    topicLower.includes("estafet") ||
    subjectId.includes("pjok") ||
    subjectId.includes("senirupa") ||
    subjectId.includes("pancasila")
  ) {
    result.kolaborasi = true;
  }

  // Kesehatan
  if (
    topicLower.includes("olahraga") || 
    topicLower.includes("gerak") || 
    topicLower.includes("jasmani") || 
    topicLower.includes("sehat") || 
    topicLower.includes("kesehatan") || 
    topicLower.includes("peregangan") || 
    topicLower.includes("bersih") || 
    topicLower.includes("phbs") ||
    subjectId.includes("pjok")
  ) {
    result.kesehatan = true;
  }

  // Kewargaan
  if (
    topicLower.includes("pancasila") || 
    topicLower.includes("kewargaan") || 
    topicLower.includes("negara") || 
    topicLower.includes("masyarakat") || 
    topicLower.includes("sosial") || 
    topicLower.includes("budaya") ||
    topicLower.includes("adat") ||
    subjectId.includes("pancasila")
  ) {
    result.kewargaan = true;
  }

  // Kreativitas
  if (
    topicLower.includes("kreatif") || 
    topicLower.includes("gambar") || 
    topicLower.includes("warna") || 
    topicLower.includes("seni") || 
    topicLower.includes("kolase") || 
    topicLower.includes("desain") || 
    topicLower.includes("prakarya") || 
    topicLower.includes("ide") ||
    subjectId.includes("senirupa") ||
    subjectId.includes("koding")
  ) {
    result.kreativitas = true;
  }

  // Kemandirian
  if (
    topicLower.includes("mandiri") || 
    topicLower.includes("gladhi") || 
    topicLower.includes("uji") || 
    topicLower.includes("asesmen") || 
    topicLower.includes("latihan") || 
    topicLower.includes("sendiri") ||
    subjectId.includes("matematika") ||
    subjectId.includes("koding")
  ) {
    result.kemandirian = true;
  }

  // Komunikasi
  if (
    topicLower.includes("membaca") || 
    topicLower.includes("menulis") || 
    topicLower.includes("bicara") || 
    topicLower.includes("presentasi") || 
    topicLower.includes("dialog") || 
    topicLower.includes("ngoko") || 
    topicLower.includes("krama") || 
    topicLower.includes("unggah-ungguh") || 
    topicLower.includes("bahasa") || 
    topicLower.includes("sapaan") ||
    subjectId.includes("english") ||
    subjectId.includes("jawa") ||
    subjectId.includes("indonesia")
  ) {
    result.komunikasi = true;
  }

  // 2. Jika tidak ada kata kunci yang cocok sama sekali, gunakan fallback default per mapel
  const activeCheckedCount = Object.values(result).filter(Boolean).length;
  if (activeCheckedCount === 0) {
    if (subjectId.includes("matematika")) {
      result.kritis = true;
      result.kolaborasi = true;
      result.kemandirian = true;
    } else if (subjectId.includes("koding")) {
      result.kritis = true;
      result.kreativitas = true;
      result.kemandirian = true;
      result.komunikasi = true;
    } else if (subjectId.includes("pjok")) {
      result.kolaborasi = true;
      result.kesehatan = true;
      result.kemandirian = true;
    } else if (subjectId.includes("senirupa")) {
      result.kreativitas = true;
      result.kemandirian = true;
      result.kolaborasi = true;
    } else if (subjectId.includes("pai")) {
      result.iman = true;
      result.kemandirian = true;
      result.komunikasi = true;
    } else if (subjectId.includes("pancasila")) {
      result.iman = true;
      result.kewargaan = true;
      result.kolaborasi = true;
      result.kritis = true;
    } else if (subjectId.includes("ipas")) {
      result.kritis = true;
      result.kolaborasi = true;
      result.kemandirian = true;
      result.komunikasi = true;
    } else if (subjectId.includes("english")) {
      result.komunikasi = true;
      result.kolaborasi = true;
      result.kewargaan = true;
    } else if (subjectId.includes("jawa")) {
      result.iman = true;
      result.komunikasi = true;
      result.kolaborasi = true;
    } else { // indonesia
      result.komunikasi = true;
      result.kritis = true;
      result.kreativitas = true;
    }
  }

  return result;
}

function getDimensiChecked(dimensiKey, subjectId, topicName) {
  const docKey = `${state.selectedClass}_${state.selectedSubjectId}_${state.selectedChapterIdx}_${state.selectedMeetingNum}_${state.activeTab}`;
  const cacheKey = `dimensi_${dimensiKey}`;
  if (state.editedDocuments[docKey] && state.editedDocuments[docKey][cacheKey] !== undefined) {
    return state.editedDocuments[docKey][cacheKey];
  }
  const defaults = getProfileLulusanChecked(subjectId, topicName);
  return defaults[dimensiKey];
}

function initCheckboxInteractivity() {
  const checkboxes = document.querySelectorAll(".interactive-checkbox");
  checkboxes.forEach(cb => {
    cb.addEventListener("click", () => {
      const dimensiKey = cb.dataset.dimensi;
      const isChecked = cb.textContent.trim() === "☑";
      const newChecked = !isChecked;
      
      const docKey = `${state.selectedClass}_${state.selectedSubjectId}_${state.selectedChapterIdx}_${state.selectedMeetingNum}_${state.activeTab}`;
      const cacheKey = `dimensi_${dimensiKey}`;
      
      if (!state.editedDocuments[docKey]) {
        state.editedDocuments[docKey] = {};
      }
      state.editedDocuments[docKey][cacheKey] = newChecked;
      cb.textContent = newChecked ? "☑" : "☐";
      showToast(`Dimensi Lulusan diperbarui!`);
    });
  });
}
