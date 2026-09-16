import { QUESTIONS_BANK } from '../data/questions';

export function extractSpreadsheetId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

export function generateCodeGs(config: {
  spreadsheetId: string;
  sheetName: string;
  teacherEmail: string;
  examDurationMinutes: number;
  passwordRequired: string;
}): string {
  const cleanId = extractSpreadsheetId(config.spreadsheetId) || 'MASUKKAN_SPREADSHEET_ID_ANDA';
  const questionsJson = JSON.stringify(QUESTIONS_BANK, null, 2);

  return `/**
 * ============================================================================
 * ULANGAN HARIAN INFORMATIKA - BERPIKIR KOMPUTASIONAL KELAS 7 SMP
 * SISTEM CBT ANTI-CURANG GOOGLE APPS SCRIPT
 * ============================================================================
 * Sekolah   : SMP
 * Mapel     : INFORMATIKA
 * Materi    : Berpikir Komputasional (Kurikulum Merdeka)
 * Durasi    : ${config.examDurationMinutes} Menit
 * Password  : ${config.passwordRequired}
 * Sheet     : ${config.sheetName}
 * Email     : ${config.teacherEmail}
 * ============================================================================
 */

// KONFIGURASI UTAMA
var CONFIG = {
  // Ganti dengan Spreadsheet ID Anda jika belum sesuai
  SPREADSHEET_ID: "${cleanId}",
  SHEET_NAME: "${config.sheetName}",
  EMAIL_NOTIFIKASI: "${config.teacherEmail}",
  PASSWORD_UJIAN: "${config.passwordRequired}",
  DURASI_MENIT: ${config.examDurationMinutes},
  MAPEL: "INFORMATIKA",
  MATERI: "Berpikir Komputasional Kelas 7 SMP"
};

/**
 * Entry point web app Google Apps Script
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('CBT Informatika Kelas 7 - Berpikir Komputasional')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

/**
 * Mengambil bank soal dari server Apps Script
 */
function getQuestions() {
  return BANK_SOAL;
}

/**
 * Verifikasi login siswa
 */
function verifyLogin(namaSiswa, password) {
  if (!namaSiswa || namaSiswa.trim().length < 3) {
    return { success: false, message: "Nama siswa minimal 3 karakter." };
  }
  if (password !== CONFIG.PASSWORD_UJIAN) {
    return { success: false, message: "Password salah! Gunakan password resmi (1234)." };
  }
  return { 
    success: true, 
    namaSiswa: namaSiswa.trim(), 
    durasiMenit: CONFIG.DURASI_MENIT,
    totalSoal: BANK_SOAL.length 
  };
}

/**
 * Menyimpan hasil ujian ke Google Spreadsheet dan mengirim email notifikasi
 * Header Kolom: Timestamp, Nama Siswa, Skor Benar, Total Soal, Nilai Akhir, Status Kecurangan
 */
function simpanHasilUjian(data) {
  try {
    var ss;
    if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID !== "MASUKKAN_SPREADSHEET_ID_ANDA") {
      ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      // Jika sheet belum ada, buat baru
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    }

    // Pastikan header sesuai ketentuan jika baris masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Nama Siswa",
        "Skor Benar",
        "Total Soal",
        "Nilai Akhir",
        "Status Kecurangan"
      ]);
      // Format header
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setBackground("#1e293b");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var timestamp = new Date();
    var namaSiswa = data.namaSiswa || "Anonim";
    var skorBenar = Number(data.skorBenar) || 0;
    var totalSoal = Number(data.totalSoal) || BANK_SOAL.length;
    var nilaiAkhir = Number(data.nilaiAkhir) || Math.round((skorBenar / totalSoal) * 100);
    var statusKecurangan = data.statusKecurangan || "Bersih (Tidak Ada Kecurangan)";

    // Append baris ke Spreadsheet
    sheet.appendRow([
      timestamp,
      namaSiswa,
      skorBenar,
      totalSoal,
      nilaiAkhir,
      statusKecurangan
    ]);

    // Berikan warna khusus jika terdeteksi kecurangan
    var lastRow = sheet.getLastRow();
    if (statusKecurangan !== "Bersih (Tidak Ada Kecurangan)") {
      sheet.getRange(lastRow, 6).setBackground("#fee2e2").setFontColor("#b91c1c").setFontWeight("bold");
    } else {
      sheet.getRange(lastRow, 6).setBackground("#dcfce7").setFontColor("#15803d");
    }

    // Kirim notifikasi email ke guru
    kirimEmailNotifikasi({
      timestamp: Utilities.formatDate(timestamp, "Asia/Jakarta", "dd-MM-yyyy HH:mm:ss WIB"),
      namaSiswa: namaSiswa,
      skorBenar: skorBenar,
      totalSoal: totalSoal,
      nilaiAkhir: nilaiAkhir,
      statusKecurangan: statusKecurangan
    });

    return {
      success: true,
      message: "Hasil ujian berhasil disimpan dan notifikasi email telah terkirim.",
      row: lastRow
    };
  } catch (err) {
    Logger.log("Error simpanHasilUjian: " + err.toString());
    return {
      success: false,
      message: "Gagal menyimpan ke Google Spreadsheet: " + err.toString()
    };
  }
}

/**
 * Mengirim notifikasi email otomatis ke guru pengampu
 */
function kirimEmailNotifikasi(data) {
  try {
    if (!CONFIG.EMAIL_NOTIFIKASI) return;

    var isCurang = data.statusKecurangan !== "Bersih (Tidak Ada Kecurangan)";
    var subject = (isCurang ? "[PERINGATAN KECURANGAN] " : "[NILAI UJIAN] ") + 
                  "Ulangan Informatika - " + data.namaSiswa + " (Nilai: " + data.nilaiAkhir + ")";

    var htmlBody = "" +
      "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;'>" +
      "  <div style='background-color: " + (isCurang ? "#b91c1c" : "#1e40af") + "; color: #ffffff; padding: 18px 24px;'>" +
      "    <h2 style='margin: 0; font-size: 20px;'>Laporan Hasil Ulangan Harian Informatika</h2>" +
      "    <p style='margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;'>Materi: " + CONFIG.MATERI + "</p>" +
      "  </div>" +
      "  <div style='padding: 24px; background-color: #ffffff; color: #334155; line-height: 1.6;'>" +
      "    <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>" +
      "      <tr style='border-bottom: 1px solid #f1f5f9;'>" +
      "        <td style='padding: 10px 0; font-weight: bold; width: 40%;'>Nama Siswa:</td>" +
      "        <td style='padding: 10px 0; font-size: 16px; font-weight: bold; color: #0f172a;'>" + data.namaSiswa + "</td>" +
      "      </tr>" +
      "      <tr style='border-bottom: 1px solid #f1f5f9;'>" +
      "        <td style='padding: 10px 0; font-weight: bold;'>Waktu Submit:</td>" +
      "        <td style='padding: 10px 0;'>" + data.timestamp + "</td>" +
      "      </tr>" +
      "      <tr style='border-bottom: 1px solid #f1f5f9;'>" +
      "        <td style='padding: 10px 0; font-weight: bold;'>Skor Benar:</td>" +
      "        <td style='padding: 10px 0;'>" + data.skorBenar + " dari " + data.totalSoal + " Soal</td>" +
      "      </tr>" +
      "      <tr style='border-bottom: 1px solid #f1f5f9;'>" +
      "        <td style='padding: 10px 0; font-weight: bold;'>Nilai Akhir:</td>" +
      "        <td style='padding: 10px 0; font-size: 22px; font-weight: bold; color: " + (data.nilaiAkhir >= 75 ? "#15803d" : "#b91c1c") + ";'>" + data.nilaiAkhir + " / 100</td>" +
      "      </tr>" +
      "      <tr>" +
      "        <td style='padding: 10px 0; font-weight: bold;'>Status Kejujuran / Kecurangan:</td>" +
      "        <td style='padding: 10px 0; font-weight: bold; color: " + (isCurang ? "#dc2626" : "#16a34a") + ";'>" + data.statusKecurangan + "</td>" +
      "      </tr>" +
      "    </table>" +
      "    <div style='margin-top: 24px; padding: 14px; background-color: #f8fafc; border-radius: 6px; font-size: 12px; color: #64748b; text-align: center;'>" +
      "      Data ini telah otomatis direkam pada Spreadsheet: <strong>" + CONFIG.SHEET_NAME + "</strong>.<br>Dikirim otomatis oleh Sistem CBT Anti-Curang Informatika SMP." +
      "    </div>" +
      "  </div>" +
      "</div>";

    MailApp.sendEmail({
      to: CONFIG.EMAIL_NOTIFIKASI,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (e) {
    Logger.log("Gagal mengirim email: " + e.toString());
  }
}

// BANK SOAL DARI WORD (MATERI BERPIKIR KOMPUTASIONAL KELAS 7 SMP)
var BANK_SOAL = ${questionsJson};
`;
}

export function generateIndexHtml(config: {
  teacherEmail: string;
  examDurationMinutes: number;
  passwordRequired: string;
}): string {
  const questionsJson = JSON.stringify(QUESTIONS_BANK);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Ulangan Harian Informatika Kelas 7 - Berpikir Komputasional</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      -webkit-user-select: none;
    }
    :root {
      --primary: #2563eb;
      --primary-dark: #1d4ed8;
      --danger: #dc2626;
      --success: #16a34a;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
    }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      min-height: 100vh;
      overflow-x: hidden;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 16px;
    }
    /* HEADER UJIAN */
    .exam-header {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 12px 16px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    }
    .header-content {
      max-width: 860px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header-left h1 {
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: -0.02em;
    }
    .header-left p {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .timer-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f1f5f9;
      padding: 8px 14px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      font-weight: 700;
      font-size: 15px;
      color: #0f172a;
      letter-spacing: 0.05em;
    }
    .timer-badge.warning {
      background: #fef3c7;
      color: #b45309;
      border-color: #fde68a;
    }
    .timer-badge.danger {
      background: #fee2e2;
      color: #b91c1c;
      border-color: #fecaca;
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    /* CARD STYLES */
    .card {
      background: var(--card-bg);
      border-radius: 16px;
      border: 1px solid var(--border);
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03);
      margin-top: 16px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: var(--primary);
      color: #ffffff;
    }
    .btn-primary:hover {
      background: var(--primary-dark);
    }
    .btn-secondary {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    .btn-danger {
      background: var(--danger);
      color: #ffffff;
    }
    .btn-success {
      background: var(--success);
      color: #ffffff;
    }
    /* INPUTS */
    .form-group {
      margin-bottom: 18px;
    }
    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #334155;
    }
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1.5px solid var(--border);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      border-color: var(--primary);
    }
    /* SOAL */
    .soal-tag {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      background: #eff6ff;
      color: var(--primary);
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .soal-context {
      background: #f8fafc;
      border-left: 4px solid var(--primary);
      padding: 14px 16px;
      border-radius: 0 10px 10px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 16px;
      white-space: pre-line;
    }
    .soal-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      color: #0f172a;
      margin-bottom: 20px;
    }
    /* PILIHAN JAWABAN */
    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 12px;
      border: 1.5px solid var(--border);
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.15s ease;
      background: #ffffff;
    }
    .option-item:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
    .option-item.selected {
      border-color: var(--primary);
      background: #eff6ff;
    }
    .option-key {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f1f5f9;
      color: #475569;
      font-weight: 700;
      font-size: 13px;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .option-item.selected .option-key {
      background: var(--primary);
      color: #ffffff;
    }
    .option-text {
      font-size: 14px;
      line-height: 1.5;
      color: #1e293b;
      padding-top: 4px;
    }
    /* PALET NOMOR */
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
      gap: 8px;
      margin-top: 16px;
    }
    .palette-btn {
      height: 38px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: #ffffff;
      color: #334155;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .palette-btn.answered {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
    }
    .palette-btn.active {
      outline: 2px solid #0f172a;
      outline-offset: 1px;
    }
    /* ANTI CHEAT WARNING OVERLAY */
    .anti-cheat-banner {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      padding: 10px 14px;
      border-radius: 10px;
      color: #9f1239;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .hidden {
      display: none !important;
    }
    /* MOBILE TWEAKS */
    @media (max-width: 640px) {
      .card {
        padding: 18px;
      }
      .header-content {
        gap: 8px;
      }
      .header-left h1 {
        font-size: 13px;
      }
      .timer-badge {
        font-size: 13px;
        padding: 6px 10px;
      }
    }
  </style>
</head>
<body>

  <!-- 1. HALAMAN LOGIN -->
  <div id="view-login" class="container">
    <div class="card" style="max-width: 460px; margin: 40px auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 56px; height: 56px; background: #eff6ff; color: #2563eb; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800; margin-bottom: 12px;">
          INF
        </div>
        <h2 style="font-size: 20px; font-weight: 800; color: #0f172a;">ULANGAN HARIAN INFORMATIKA</h2>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Berpikir Komputasional • Kelas 7 SMP</p>
      </div>

      <div class="form-group">
        <label for="input-nama">Nama Lengkap Siswa</label>
        <input type="text" id="input-nama" class="form-control" placeholder="Ketik nama lengkap Anda..." autocomplete="off">
      </div>

      <div class="form-group">
        <label for="input-password">Password Ujian (1234)</label>
        <input type="password" id="input-password" class="form-control" placeholder="Masukkan password ujian...">
        <p id="password-hint" style="font-size: 11px; color: #94a3b8; margin-top: 4px;">*Tombol login akan muncul otomatis setelah password (1234) dimasukkan dengan benar.</p>
      </div>

      <!-- Tombol login: awalnya tidak ditampilkan (hidden) sampai password 1234 & nama diisi -->
      <div id="login-action-container" class="hidden" style="margin-top: 20px;">
        <button id="btn-login" class="btn btn-primary" style="width: 100%; padding: 14px;">
          Masuk ke Ruang Ujian
        </button>
      </div>
      
      <div style="margin-top: 24px; border-top: 1px solid var(--border); padding-top: 16px; text-align: center; font-size: 12px; color: #64748b;">
        Sistem Ujian Online Anti-Curang Terintegrasi Google Spreadsheet
      </div>
    </div>
  </div>

  <!-- 2. HALAMAN PETUNJUK UJIAN -->
  <div id="view-instructions" class="container hidden">
    <div class="card" style="max-width: 680px; margin: 30px auto;">
      <div style="border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 20px;">
        <span class="soal-tag">Petunjuk Pelaksanaan</span>
        <h2 style="font-size: 20px; font-weight: 800; color: #0f172a;">Peraturan & Tata Tertib Ulangan Harian</h2>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Halo, <strong id="student-display-name" style="color: #2563eb;">Siswa</strong>! Harap baca instruksi ini dengan seksama.</p>
      </div>

      <div class="anti-cheat-banner">
        <strong>PERINGATAN SISTEM ANTI-CURANG AKTIF:</strong> Ujian akan langsung SELESAI & NILAI DITUTUP jika terdeteksi keluar dari layar penuh, membuka tab lain, atau membagi layar (split-screen)!
      </div>

      <div style="font-size: 14px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
        <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
          <li>Durasi pengerjaan adalah <strong>60 Menit</strong> untuk 20 butir soal berpikir komputasional.</li>
          <li>Urutan soal dan pilihan jawaban diacak secara otomatis untuk setiap siswa.</li>
          <li><strong>Dilarang keras membelah layar (Split Screen)</strong> di HP Android, iPhone, maupun Laptop. Layar terbelah akan langsung membatalkan ujian.</li>
          <li><strong>Dilarang beralih ke aplikasi lain</strong>, membuka browser lain, atau berpindah tab.</li>
          <li>Saat tombol "Mulai Ujian" ditekan, layar akan otomatis dikunci ke mode Layar Penuh (Fullscreen).</li>
          <li>Nilai akhir akan langsung muncul seketika setelah ujian selesai dan terkirim otomatis ke email guru serta Google Spreadsheet.</li>
        </ol>
      </div>

      <div style="text-align: center;">
        <button id="btn-start-exam" class="btn btn-primary" style="padding: 16px 36px; font-size: 16px; width: 100%;">
          KUNCI LAYAR & MULAI UJIAN SEKARANG
        </button>
      </div>
    </div>
  </div>

  <!-- 3. HALAMAN UJIAN UTAMA -->
  <div id="view-exam" class="hidden">
    <!-- Header Ujian -->
    <header class="exam-header">
      <div class="header-content">
        <div class="header-left">
          <h1>INFORMATIKA • BERPIKIR KOMPUTASIONAL KELAS 7</h1>
          <p>Siswa: <span id="header-student-name" style="font-weight: 600; color: #0f172a;">-</span> | Soal <span id="header-current-num">1</span> dari <span id="header-total-num">20</span></p>
        </div>
        <div id="timer-box" class="timer-badge">
          <span>⏱️ Sisa Waktu:</span>
          <span id="timer-text">60:00</span>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- Card Soal 1 Soal 1 Halaman -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span id="question-topic" class="soal-tag">Topik</span>
          <span style="font-size: 13px; font-weight: 600; color: #64748b;">Nomor <span id="q-index-badge">1</span></span>
        </div>

        <!-- Teks pengantar / cerita dari Word -->
        <div id="question-context" class="soal-context"></div>

        <!-- Pertanyaan -->
        <div id="question-title" class="soal-text"></div>

        <!-- Pilihan A, B, C, D -->
        <div id="options-container"></div>

        <!-- Tombol Navigasi Sebelumnya & Berikutnya -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 10px;">
          <button id="btn-prev" class="btn btn-secondary">
            ← Sebelumnya
          </button>
          
          <div style="display: flex; gap: 8px;">
            <button id="btn-next" class="btn btn-primary">
              Berikutnya →
            </button>
            <button id="btn-finish" class="btn btn-success hidden">
              Selesai & Kumpulkan Ujian ✓
            </button>
          </div>
        </div>
      </div>

      <!-- Palet Nomor Soal -->
      <div class="card" style="margin-top: 16px;">
        <h4 style="font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Daftar Nomor Soal</h4>
        <div id="palette-container" class="palette-grid"></div>
      </div>
    </div>
  </div>

  <!-- 4. HALAMAN HASIL / NILAI AKHIR -->
  <div id="view-result" class="container hidden">
    <div class="card" style="max-width: 600px; margin: 40px auto; text-align: center;">
      <div id="result-icon-box" style="width: 72px; height: 72px; border-radius: 50%; background: #dcfce7; color: #16a34a; font-size: 32px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        ✓
      </div>
      <h2 id="result-title" style="font-size: 22px; font-weight: 800; color: #0f172a;">Ujian Selesai!</h2>
      <p id="result-subtitle" style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Hasil evaluasi ulangan harian Anda langsung keluar secara instan.</p>

      <div style="margin: 24px 0; padding: 20px; background: #f8fafc; border-radius: 14px; border: 1px solid var(--border);">
        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">NILAI AKHIR ANDA</div>
        <div id="result-score" style="font-size: 54px; font-weight: 800; color: #2563eb; line-height: 1;">0</div>
        <div id="result-ratio" style="font-size: 14px; font-weight: 600; color: #475569; margin-top: 8px;">Skor Benar: 0 / 20 Soal</div>
      </div>

      <div style="text-align: left; background: #ffffff; border: 1px solid var(--border); border-radius: 12px; padding: 16px; font-size: 13px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="color: #64748b;">Nama Siswa:</span>
          <strong id="result-student-name">-</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="color: #64748b;">Mata Pelajaran:</span>
          <strong>Informatika (Kelas 7 SMP)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="color: #64748b;">Materi:</span>
          <strong>Berpikir Komputasional</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0;">
          <span style="color: #64748b;">Status Kejujuran:</span>
          <strong id="result-cheat-status" style="color: #16a34a;">Bersih (Tanpa Kecurangan)</strong>
        </div>
      </div>

      <div id="submit-status-msg" style="font-size: 12px; color: #64748b; padding: 10px; background: #f1f5f9; border-radius: 8px;">
        Menyimpan ke Google Spreadsheet & Mengirim Notifikasi ke ${config.teacherEmail}...
      </div>
    </div>
  </div>

  <script>
    // BANK SOAL
    var RAW_QUESTIONS = ${questionsJson};
    var TEACHER_EMAIL = "${config.teacherEmail}";
    var EXAM_DURATION = ${config.examDurationMinutes} * 60; // dalam detik (3600)
    var REQUIRED_PASSWORD = "${config.passwordRequired}";

    // STATE UJIAN
    var studentName = "";
    var randomizedQuestions = [];
    var currentQuestionIdx = 0;
    var userAnswers = {}; // { questionId: 'A' | 'B' | 'C' | 'D' }
    var timerInterval = null;
    var secondsLeft = EXAM_DURATION;
    var isExamActive = false;
    var cheatDetected = false;
    var cheatReason = "Bersih (Tidak Ada Kecurangan)";

    // ELEMENT REFERENCES
    var inputNama = document.getElementById('input-nama');
    var inputPassword = document.getElementById('input-password');
    var loginActionContainer = document.getElementById('login-action-container');
    var btnLogin = document.getElementById('btn-login');

    // LISTENER INPUT LOGIN (Tombol login hanya muncul jika password benar '1234' dan nama sudah diisi)
    function checkLoginFields() {
      var namaVal = inputNama.value.trim();
      var passVal = inputPassword.value.trim();
      if (passVal === REQUIRED_PASSWORD && namaVal.length >= 3) {
        loginActionContainer.classList.remove('hidden');
      } else {
        loginActionContainer.classList.add('hidden');
      }
    }

    inputNama.addEventListener('input', checkLoginFields);
    inputPassword.addEventListener('input', checkLoginFields);

    btnLogin.addEventListener('click', function() {
      studentName = inputNama.value.trim();
      if (!studentName) return;
      document.getElementById('student-display-name').innerText = studentName;
      document.getElementById('header-student-name').innerText = studentName;
      
      // Pindah ke Halaman Petunjuk
      document.getElementById('view-login').classList.add('hidden');
      document.getElementById('view-instructions').classList.remove('hidden');
    });

    // SISTEM DETEKSI SPLIT SCREEN / BELAH LAYAR
    function isSplitScreen() {
      try {
        var screenH = window.screen.availHeight || window.screen.height;
        var screenW = window.screen.availWidth || window.screen.width;
        var innerH = window.innerHeight;
        var innerW = window.innerWidth;

        // Jika tinggi jendela kurang dari 62% tinggi layar perangkat -> terindikasi belah layar (split screen atas/bawah)
        var ratioH = innerH / screenH;
        // Jika lebar jendela kurang dari 70% lebar layar -> terindikasi belah layar (split screen kiri/kanan)
        var ratioW = innerW / screenW;

        if (ratioH < 0.62 || ratioW < 0.70) {
          return true;
        }
      } catch (e) {
        // Abaikan jika tidak didukung
      }
      return false;
    }

    // TOMBOL MULAI UJIAN
    document.getElementById('btn-start-exam').addEventListener('click', function() {
      // 1. CEK APAKAH LAYAR TERBELAH SEBELUM MULAI (Ketentuan: Ketika klik mulai ujian dengan layar android/iPhone terbelah juga langsung selesai ujian)
      if (isSplitScreen()) {
        triggerCheatDisqualification("Terdeteksi Layar Terbelah (Split Screen) saat Klik Mulai Ujian");
        return;
      }

      // 2. KUNCI KE FULLSCREEN
      requestFullScreenMode();

      // 3. ACAK SOAL
      randomizedQuestions = shuffleArray(JSON.parse(JSON.stringify(RAW_QUESTIONS)));
      document.getElementById('header-total-num').innerText = randomizedQuestions.length;

      // 4. BUKA RUANG UJIAN & MULAI TIMER
      document.getElementById('view-instructions').classList.add('hidden');
      document.getElementById('view-exam').classList.remove('hidden');
      isExamActive = true;

      renderQuestion(0);
      renderPalette();
      startTimer();
      attachAntiCheatListeners();
    });

    // FUNGSI ACAK ARRAY
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    // FULLSCREEN REQUEST
    function requestFullScreenMode() {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(function(){});
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }

    // ANTI CHEAT ENGINE
    function attachAntiCheatListeners() {
      // Pindah tab / minimize (document.hidden)
      document.addEventListener('visibilitychange', function() {
        if (!isExamActive) return;
        if (document.hidden) {
          triggerCheatDisqualification("Pindah Tab / Minimize Aplikasi Saat Ujian");
        }
      });

      // Window blur (klik aplikasi lain)
      window.addEventListener('blur', function() {
        if (!isExamActive) return;
        triggerCheatDisqualification("Pindah Jendela / Terdeteksi Membuka Aplikasi Lain");
      });

      // Keluar fullscreen
      document.addEventListener('fullscreenchange', function() {
        if (!isExamActive) return;
        if (!document.fullscreenElement) {
          triggerCheatDisqualification("Keluar dari Mode Layar Penuh (Kecurangan)");
        }
      });

      // Resize window (Deteksi belah layar selama ujian)
      window.addEventListener('resize', function() {
        if (!isExamActive) return;
        if (isSplitScreen()) {
          triggerCheatDisqualification("Terdeteksi Layar Terbelah (Split Screen) Saat Ujian Berlangsung");
        }
      });

      // Cegah klik kanan
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });

      // Cegah shortcut keyboard (Ctrl+C, Ctrl+V, F12, dsb)
      document.addEventListener('keydown', function(e) {
        if (
          e.keyCode === 123 || // F12
          (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
          (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 83)) // Ctrl+C, V, U, S
        ) {
          e.preventDefault();
          return false;
        }
      });
    }

    // TRIGGER DISKUALIFIKASI KECURANGAN
    function triggerCheatDisqualification(reason) {
      if (!isExamActive && !document.getElementById('view-instructions').classList.contains('hidden')) {
        // Terjadi saat di halaman petunjuk atau klik mulai
        isExamActive = false;
        cheatDetected = true;
        cheatReason = reason;
        finishExam();
        return;
      }
      if (!isExamActive) return;
      isExamActive = false;
      cheatDetected = true;
      cheatReason = reason;
      finishExam();
    }

    // TIMER 60 MENIT
    function startTimer() {
      updateTimerDisplay();
      timerInterval = setInterval(function() {
        secondsLeft--;
        updateTimerDisplay();
        if (secondsLeft <= 0) {
          clearInterval(timerInterval);
          isExamActive = false;
          cheatReason = cheatReason === "Bersih (Tidak Ada Kecurangan)" ? "Waktu Ujian Habis (60 Menit)" : cheatReason;
          finishExam();
        }
      }, 1000);
    }

    function updateTimerDisplay() {
      var minutes = Math.floor(secondsLeft / 60);
      var seconds = secondsLeft % 60;
      var str = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      var timerTextEl = document.getElementById('timer-text');
      var timerBox = document.getElementById('timer-box');
      if (timerTextEl) timerTextEl.innerText = str;

      if (secondsLeft <= 180) {
        timerBox.className = "timer-badge danger";
      } else if (secondsLeft <= 600) {
        timerBox.className = "timer-badge warning";
      }
    }

    // RENDER SOAL 1 SOAL 1 HALAMAN
    function renderQuestion(idx) {
      currentQuestionIdx = idx;
      var q = randomizedQuestions[idx];
      if (!q) return;

      document.getElementById('header-current-num').innerText = idx + 1;
      document.getElementById('q-index-badge').innerText = (idx + 1) + " dari " + randomizedQuestions.length;
      document.getElementById('question-topic').innerText = q.topic || "Berpikir Komputasional";

      var contextEl = document.getElementById('question-context');
      if (q.contextText) {
        contextEl.innerText = q.contextText;
        contextEl.classList.remove('hidden');
      } else {
        contextEl.classList.add('hidden');
      }

      document.getElementById('question-title').innerText = q.question;

      // Render pilihan jawaban
      var optContainer = document.getElementById('options-container');
      optContainer.innerHTML = "";

      var currentAnswer = userAnswers[q.id];

      q.options.forEach(function(opt) {
        var optDiv = document.createElement('div');
        optDiv.className = "option-item" + (currentAnswer === opt.key ? " selected" : "");
        optDiv.innerHTML = "<div class='option-key'>" + opt.key + "</div>" +
                           "<div class='option-text'>" + opt.text + "</div>";
        optDiv.addEventListener('click', function() {
          userAnswers[q.id] = opt.key;
          renderQuestion(idx);
          renderPalette();
        });
        optContainer.appendChild(optDiv);
      });

      // Tombol Navigasi Sebelumnya / Berikutnya
      var btnPrev = document.getElementById('btn-prev');
      var btnNext = document.getElementById('btn-next');
      var btnFinish = document.getElementById('btn-finish');

      if (idx === 0) {
        btnPrev.style.visibility = "hidden";
      } else {
        btnPrev.style.visibility = "visible";
      }

      if (idx === randomizedQuestions.length - 1) {
        btnNext.classList.add('hidden');
        btnFinish.classList.remove('hidden');
      } else {
        btnNext.classList.remove('hidden');
        btnFinish.classList.add('hidden');
      }
    }

    // TOMBOL PREV & NEXT
    document.getElementById('btn-prev').addEventListener('click', function() {
      if (currentQuestionIdx > 0) {
        renderQuestion(currentQuestionIdx - 1);
      }
    });
    document.getElementById('btn-next').addEventListener('click', function() {
      if (currentQuestionIdx < randomizedQuestions.length - 1) {
        renderQuestion(currentQuestionIdx + 1);
      }
    });
    document.getElementById('btn-finish').addEventListener('click', function() {
      var answeredCount = Object.keys(userAnswers).length;
      var total = randomizedQuestions.length;
      if (answeredCount < total) {
        if (!confirm("Anda baru menjawab " + answeredCount + " dari " + total + " soal. Yakin ingin mengakhiri dan mengumpulkan ujian?")) {
          return;
        }
      } else {
        if (!confirm("Apakah Anda yakin ingin menyelesaikan dan mengumpulkan ujian sekarang?")) {
          return;
        }
      }
      isExamActive = false;
      finishExam();
    });

    // PALET NOMOR
    function renderPalette() {
      var container = document.getElementById('palette-container');
      container.innerHTML = "";
      randomizedQuestions.forEach(function(q, i) {
        var btn = document.createElement('button');
        var isAnswered = userAnswers[q.id] !== undefined;
        var isActive = currentQuestionIdx === i;
        btn.className = "palette-btn" + (isAnswered ? " answered" : "") + (isActive ? " active" : "");
        btn.innerText = i + 1;
        btn.addEventListener('click', function() {
          renderQuestion(i);
          renderPalette();
        });
        container.appendChild(btn);
      });
    }

    // FINISH EXAM & HITUNG NILAI
    function finishExam() {
      if (timerInterval) clearInterval(timerInterval);

      // Hitung skor benar
      var correctCount = 0;
      var total = randomizedQuestions.length > 0 ? randomizedQuestions.length : RAW_QUESTIONS.length;

      RAW_QUESTIONS.forEach(function(q) {
        if (userAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });

      var nilaiAkhir = Math.round((correctCount / total) * 100);

      // Sembunyikan view ujian & tampilkan view hasil
      document.getElementById('view-login').classList.add('hidden');
      document.getElementById('view-instructions').classList.add('hidden');
      document.getElementById('view-exam').classList.add('hidden');
      document.getElementById('view-result').classList.remove('hidden');

      // Tampilkan data hasil
      document.getElementById('result-student-name').innerText = studentName;
      document.getElementById('result-score').innerText = nilaiAkhir;
      document.getElementById('result-ratio').innerText = "Skor Benar: " + correctCount + " dari " + total + " Soal";

      var cheatStatusEl = document.getElementById('result-cheat-status');
      var resultIconBox = document.getElementById('result-icon-box');
      var resultTitle = document.getElementById('result-title');

      if (cheatDetected) {
        cheatStatusEl.innerText = "DIDISKUALIFIKASI: " + cheatReason;
        cheatStatusEl.style.color = "#dc2626";
        resultIconBox.style.background = "#fee2e2";
        resultIconBox.style.color = "#dc2626";
        resultIconBox.innerText = "✕";
        resultTitle.innerText = "Ujian Dihentikan (Kecurangan)";
      } else {
        cheatStatusEl.innerText = "Bersih (Tidak Ada Kecurangan)";
        cheatStatusEl.style.color = "#16a34a";
      }

      // Kirim data ke Google Apps Script backend
      var payload = {
        namaSiswa: studentName,
        skorBenar: correctCount,
        totalSoal: total,
        nilaiAkhir: nilaiAkhir,
        statusKecurangan: cheatReason
      };

      var statusMsg = document.getElementById('submit-status-msg');

      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(function(res) {
            statusMsg.innerHTML = "✅ <strong>Berhasil Tersimpan!</strong> Nilai telah direkam ke Google Spreadsheet dan notifikasi email telah terkirim ke " + TEACHER_EMAIL + ".";
            statusMsg.style.background = "#dcfce7";
            statusMsg.style.color = "#166534";
          })
          .withFailureHandler(function(err) {
            statusMsg.innerHTML = "⚠️ Peringatan: Hasil lokal tersimpan, namun gagal sinkron ke Spreadsheet: " + err.message;
            statusMsg.style.background = "#fef3c7";
            statusMsg.style.color = "#92400e";
          })
          .simpanHasilUjian(payload);
      } else {
        // Mode Simulator di AI Studio
        statusMsg.innerHTML = "✅ <strong>Mode Simulasi Aktif:</strong> Nilai siswa (" + nilaiAkhir + ") siap direkam ke Google Spreadsheet & notifikasi email siap dikirimkan ke " + TEACHER_EMAIL + ".";
        statusMsg.style.background = "#dcfce7";
        statusMsg.style.color = "#166534";
      }
    }
  </script>
</body>
</html>`;
}
