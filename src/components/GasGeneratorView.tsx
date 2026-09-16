import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  FileText, 
  HelpCircle, 
  Link as LinkIcon, 
  Mail, 
  Table, 
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { generateCodeGs, generateIndexHtml, extractSpreadsheetId } from '../utils/gasGenerator';

interface GasGeneratorViewProps {
  initialSheetUrl?: string;
  teacherEmail?: string;
}

export const GasGeneratorView: React.FC<GasGeneratorViewProps> = ({
  initialSheetUrl = '',
  teacherEmail = 'informatikaspanju2026@gmail.com'
}) => {
  const [sheetInput, setSheetInput] = useState(initialSheetUrl);
  const [sheetName, setSheetName] = useState('Sheet1');
  const [email, setEmail] = useState(teacherEmail);
  const [duration, setDuration] = useState(60);
  const [password, setPassword] = useState('1234');

  const [activeCodeTab, setActiveCodeTab] = useState<'codegs' | 'indexhtml' | 'guide'>('codegs');
  const [copiedCodeGs, setCopiedCodeGs] = useState(false);
  const [copiedIndexHtml, setCopiedIndexHtml] = useState(false);

  const extractedId = extractSpreadsheetId(sheetInput);

  const codeGsContent = generateCodeGs({
    spreadsheetId: extractedId,
    sheetName: sheetName,
    teacherEmail: email,
    examDurationMinutes: duration,
    passwordRequired: password
  });

  const indexHtmlContent = generateIndexHtml({
    teacherEmail: email,
    examDurationMinutes: duration,
    passwordRequired: password
  });

  const copyToClipboard = (text: string, type: 'gs' | 'html') => {
    navigator.clipboard.writeText(text);
    if (type === 'gs') {
      setCopiedCodeGs(true);
      setTimeout(() => setCopiedCodeGs(false), 2000);
    } else {
      setCopiedIndexHtml(true);
      setTimeout(() => setCopiedIndexHtml(false), 2000);
    }
  };

  const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generator Kode Google Apps Script & Spreadsheet</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Kode Siap Pakai & Panduan Deploy Ujian Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Dapatkan kode <code className="font-mono text-blue-600 font-bold">Code.gs</code> dan <code className="font-mono text-blue-600 font-bold">Index.html</code> yang sudah terkonfigurasi dengan bank soal berpikir komputasional, sistem anti-curang, rekaman Google Spreadsheet, dan notifikasi email ke guru.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveCodeTab('guide')}
              className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Lihat Petunjuk Deploy</span>
            </button>
          </div>
        </div>

        {/* Input Konfigurasi Interaktif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                Link / ID Google Spreadsheet:
              </span>
            </label>
            <input
              type="text"
              value={sheetInput}
              onChange={(e) => setSheetInput(e.target.value)}
              placeholder="Paste link Google Sheet Anda di sini..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-600 outline-hidden font-mono"
            />
            <div className="mt-1 text-[11px] text-slate-500">
              {extractedId ? (
                <span className="text-emerald-600 font-medium">
                  ✓ ID Terdeteksi: <code className="font-mono">{extractedId.substring(0, 16)}...</code>
                </span>
              ) : (
                <span>*Contoh: https://docs.google.com/spreadsheets/d/.../edit</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Email Notifikasi Guru:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-600 outline-hidden font-mono"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Sesuai instruksi: informatikaspanju2026@gmail.com
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-blue-600" />
              Nama Sheet / Tab:
            </label>
            <input
              type="text"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-600 outline-hidden font-mono"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Header kolom: Timestamp, Nama Siswa, Skor Benar, Total Soal, Nilai Akhir, Status Kecurangan
            </span>
          </div>
        </div>
      </div>

      {/* Code Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveCodeTab('codegs')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeCodeTab === 'codegs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>File 1: Code.gs (Google Apps Script)</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('indexhtml')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeCodeTab === 'indexhtml'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>File 2: Index.html (1 File Web App CBT)</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('guide')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeCodeTab === 'guide'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Petunjuk Cara Pasang & Deploy</span>
        </button>
      </div>

      {/* TAB CONTENT: CODE.GS */}
      {activeCodeTab === 'codegs' && (
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
          <div className="bg-slate-800/80 px-4 sm:px-6 py-3 border-b border-slate-700 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-300 ml-2 font-bold">Code.gs</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(codeGsContent, 'gs')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCodeGs ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeGs ? 'Tersalin!' : 'Salin Code.gs'}</span>
              </button>
              <button
                onClick={() => downloadFile('Code.gs', codeGsContent)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .gs</span>
              </button>
            </div>
          </div>
          <pre className="p-4 sm:p-6 text-xs font-mono text-slate-300 overflow-x-auto max-h-[540px] leading-relaxed select-text">
            {codeGsContent}
          </pre>
        </div>
      )}

      {/* TAB CONTENT: INDEX.HTML */}
      {activeCodeTab === 'indexhtml' && (
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
          <div className="bg-slate-800/80 px-4 sm:px-6 py-3 border-b border-slate-700 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-300 ml-2 font-bold">Index.html (Lengkap dalam 1 file)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(indexHtmlContent, 'html')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedIndexHtml ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndexHtml ? 'Tersalin!' : 'Salin Index.html'}</span>
              </button>
              <button
                onClick={() => downloadFile('Index.html', indexHtmlContent)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .html</span>
              </button>
            </div>
          </div>
          <pre className="p-4 sm:p-6 text-xs font-mono text-slate-300 overflow-x-auto max-h-[540px] leading-relaxed select-text">
            {indexHtmlContent}
          </pre>
        </div>
      )}

      {/* TAB CONTENT: PANDUAN LANGKAH DEMI LANGKAH */}
      {activeCodeTab === 'guide' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-9 space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Petunjuk Praktis Memasang Ujian ke Google Spreadsheet & Apps Script
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ikuti 6 langkah mudah berikut untuk mengaktifkan CBT online anti-curang Anda:
            </p>
          </div>

          <div className="space-y-4">
            {/* Langkah 1 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Siapkan Google Spreadsheet
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Buat spreadsheet baru di Google Drive Anda. Pastikan nama tab sheet pertamanya bernama <strong>Sheet1</strong> (atau Sheet 1). Baris pertama otomatis diisikan oleh skrip atau Anda dapat membuat header kolom persis seperti berikut:
                </p>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800">
                  Timestamp | Nama Siswa | Skor Benar | Total Soal | Nilai Akhir | Status Kecurangan
                </div>
              </div>
            </div>

            {/* Langkah 2 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Buka Editor Google Apps Script
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Pada menu Google Spreadsheet di atas, klik menu <strong>Ekstensi (Extensions)</strong> &gt; <strong>Apps Script</strong>. Tab editor skrip baru akan terbuka.
                </p>
              </div>
            </div>

            {/* Langkah 3 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Tempelkan (Paste) Kode Code.gs
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Buka file default <code>Code.gs</code> di editor Apps Script, hapus seluruh isi lamanya, kemudian klik tombol <strong>Salin Code.gs</strong> di tab di atas dan paste seluruh kodenya. Masukkan ID Spreadsheet Anda pada variabel <code>CONFIG.SPREADSHEET_ID</code>.
                </p>
              </div>
            </div>

            {/* Langkah 4 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                4
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Buat File Baru Bernama "Index" (HTML)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Di sebelah kiri editor Apps Script, klik tombol <strong>+ (Tambah file)</strong> &gt; pilih <strong>HTML</strong>. Beri nama file tepat: <code>Index</code> (tanpa ekstensi .html karena otomatis ditambahkan). Hapus isi default dan paste seluruh kode dari tab <strong>Index.html</strong> di atas.
                </p>
              </div>
            </div>

            {/* Langkah 5 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                5
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Deploy Web App (Terapkan sebagai Aplikasi Web)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Klik tombol biru <strong>Deploy</strong> (Terapkan) di kanan atas &gt; pilih <strong>New deployment (Penerapan baru)</strong>:
                </p>
                <ul className="text-xs sm:text-sm list-disc list-inside space-y-1 text-slate-700 pt-1">
                  <li>Pilih jenis: <strong>Web app</strong> (ikon roda gigi)</li>
                  <li>Deskripsi: <em>Ulangan Harian Informatika Kelas 7</em></li>
                  <li>Execute as (Jalankan sebagai): <strong>Me (email guru Anda)</strong></li>
                  <li>Who has access (Siapa yang memiliki akses): <strong>Anyone (Siapa saja)</strong></li>
                </ul>
              </div>
            </div>

            {/* Langkah 6 */}
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                ✓
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-emerald-900 text-sm">
                  Bagikan Tautan Web App ke Siswa!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Salin tautan Web App yang berakhiran <code>/exec</code> dan bagikan ke siswa pada jam ulangan. Siswa masuk dengan nama masing-masing dan password <strong>1234</strong>. Setiap siswa menyelesaikan ujian, nilai dan status kecurangan akan langsung masuk ke Spreadsheet dan terkirim ke email <strong>{email}</strong>!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
