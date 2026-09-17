import React, { useState, useMemo } from 'react';
import { 
  Users, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Copy, 
  Search, 
  Filter, 
  RotateCcw, 
  LogOut, 
  FileCode2, 
  Table, 
  ShieldAlert, 
  ArrowUpDown,
  BookOpen,
  Mail,
  Check
} from 'lucide-react';
import { ExamRecord } from '../types';

interface AdminRekapViewProps {
  records: ExamRecord[];
  onClearRecords: () => void;
  onResetToDemo: () => void;
  onLogoutAdmin: () => void;
  onOpenGenerator: () => void;
  teacherEmail: string;
}

const CLASS_OPTIONS = ['Semua Kelas', '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H'];

export const AdminRekapView: React.FC<AdminRekapViewProps> = ({
  records,
  onClearRecords,
  onResetToDemo,
  onLogoutAdmin,
  onOpenGenerator,
  teacherEmail
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Semua Kelas');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'remedial' | 'cheat'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'timestamp' | 'name' | 'class' | 'score'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Filter and Sort
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        // Class filter
        if (selectedClass !== 'Semua Kelas' && rec.studentClass !== selectedClass) {
          return false;
        }
        // Status filter
        if (statusFilter === 'passed' && (rec.score < 75 || rec.hasCheated)) return false;
        if (statusFilter === 'remedial' && (rec.score >= 75 || rec.hasCheated)) return false;
        if (statusFilter === 'cheat' && !rec.hasCheated) return false;
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = rec.studentName.toLowerCase().includes(q);
          const matchAbsen = rec.studentAttendanceNo.includes(q);
          const matchClass = rec.studentClass.toLowerCase().includes(q);
          if (!matchName && !matchAbsen && !matchClass) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortField === 'score') {
          return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
        }
        if (sortField === 'name') {
          return sortOrder === 'asc' 
            ? a.studentName.localeCompare(b.studentName)
            : b.studentName.localeCompare(a.studentName);
        }
        if (sortField === 'class') {
          const comp = a.studentClass.localeCompare(b.studentClass);
          if (comp !== 0) return sortOrder === 'asc' ? comp : -comp;
          return Number(a.studentAttendanceNo) - Number(b.studentAttendanceNo);
        }
        // timestamp default
        return sortOrder === 'asc' 
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id);
      });
  }, [records, selectedClass, statusFilter, searchQuery, sortField, sortOrder]);

  // Overall Statistics
  const stats = useMemo(() => {
    const total = records.length;
    if (total === 0) {
      return { total: 0, average: 0, highest: 0, lowest: 0, passedCount: 0, passedPercent: 0, cheatCount: 0 };
    }
    const scores = records.map(r => r.score);
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const avg = Math.round(sum / total);
    const high = Math.max(...scores);
    const low = Math.min(...scores);
    const passed = records.filter(r => r.score >= 75 && !r.hasCheated).length;
    const cheat = records.filter(r => r.hasCheated).length;
    const pct = Math.round((passed / total) * 100);

    return {
      total,
      average: avg,
      highest: high,
      lowest: low,
      passedCount: passed,
      passedPercent: pct,
      cheatCount: cheat
    };
  }, [records]);

  // Copy as Google Sheet Tab-Separated format
  const handleCopyForSheet = () => {
    const header = "Timestamp\tNama Siswa\tSkor Benar\tTotal Soal\tNilai Akhir\tStatus Kecurangan";
    const rows = filteredRecords.map(r => {
      const studentLabel = `${r.studentName} (${r.studentClass} - #${r.studentAttendanceNo})`;
      return `${r.timestamp}\t${studentLabel}\t${r.correctCount}\t${r.totalQuestions}\t${r.score}\t${r.cheatStatus}`;
    });
    const content = [header, ...rows].join("\n");
    navigator.clipboard.writeText(content);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // Export as CSV
  const handleExportCSV = () => {
    const header = "Timestamp,Nama Siswa,Skor Benar,Total Soal,Nilai Akhir,Status Kecurangan";
    const rows = filteredRecords.map(r => {
      const cleanName = `"${r.studentName} (${r.studentClass} - #${r.studentAttendanceNo})"`;
      const cleanCheat = `"${r.cheatStatus}"`;
      return `${r.timestamp},${cleanName},${r.correctCount},${r.totalQuestions},${r.score},${cleanCheat}`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_Informatika_Kelas7_${selectedClass.replace(/\s+/g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Admin */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Mode Akun Admin Terverifikasi
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Rekapitulasi Nilai Keseluruhan Ujian
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Ulangan Harian Informatika Kelas 7 SMP • Materi 4 Pilar Berpikir Komputasional & Scratch (30 Soal)
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onOpenGenerator}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileCode2 className="w-4 h-4" />
              <span>Kode Apps Script</span>
            </button>
            <button
              onClick={onLogoutAdmin}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Mode Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATISTIK RINGKASAN */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Total Siswa</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Siswa telah submit</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Rata-Rata</span>
          </div>
          <div className="text-2xl font-black text-indigo-600">{stats.average}</div>
          <div className="text-[11px] text-slate-500 mt-1">Skala 0 - 100</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nilai Tertinggi</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">{stats.highest}</div>
          <div className="text-[11px] text-slate-500 mt-1">Terendah: {stats.lowest}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tuntas KKM</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.passedCount} <span className="text-xs font-semibold text-slate-500">({stats.passedPercent}%)</span></div>
          <div className="text-[11px] text-slate-500 mt-1">Batas KKM: 75</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Remidial</span>
          </div>
          <div className="text-2xl font-black text-amber-600">{stats.total - stats.passedCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Nilai di bawah 75</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Pelanggaran</span>
          </div>
          <div className="text-2xl font-black text-red-600">{stats.cheatCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Diskualifikasi sistem</div>
        </div>
      </div>

      {/* FILTER & TOOLBAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Kelas Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-bold text-slate-600 mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CLASS_OPTIONS.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedClass === cls
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyForSheet}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              title="Salin data dengan format tab yang siap paste ke Google Spreadsheet"
            >
              {copiedNotification ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedNotification ? 'Tersalin ke Clipboard!' : 'Salin ke Sheet'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Search and Secondary Filter Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa atau no absen..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="all">Semua Status Kelulusan</option>
              <option value="passed">Tuntas (≥ 75)</option>
              <option value="remedial">Remidial (&lt; 75)</option>
              <option value="cheat">Terdeteksi Curang</option>
            </select>

            <select
              value={`${sortField}-${sortOrder}`}
              onChange={(e) => {
                const [f, o] = e.target.value.split('-');
                setSortField(f as any);
                setSortOrder(o as any);
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="timestamp-desc">Waktu Terbaru</option>
              <option value="score-desc">Nilai Tertinggi</option>
              <option value="score-asc">Nilai Terendah</option>
              <option value="name-asc">Nama (A - Z)</option>
              <option value="class-asc">Urut Kelas & Absen</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABEL REKAP NILAI KESELURUHAN (6 KOLOM SESUAI SPREADSHEET) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <Table className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Tabel Rekapitulasi Nilai Siswa (Sheet 1)
              </h3>
              <p className="text-xs text-slate-500">
                Menampilkan {filteredRecords.length} dari total {records.length} rekaman siswa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetToDemo}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
            >
              Reset Data Contoh (Kelas 7A-7H)
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={onClearRecords}
              className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
            >
              Kosongkan Semua
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">No</th>
                <th className="px-4 py-3 whitespace-nowrap">Timestamp</th>
                <th className="px-4 py-3 whitespace-nowrap">Nama Siswa</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Skor Benar</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Total Soal</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Nilai Akhir</th>
                <th className="px-4 py-3 whitespace-nowrap">Status Kecurangan</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    <Table className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-700">Tidak ada rekaman nilai siswa ditemukan</p>
                    <p className="text-xs text-slate-400 mt-1">Coba sesuaikan filter kelas atau kata kunci pencarian</p>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec, idx) => {
                  const isPassed = rec.score >= 75 && !rec.hasCheated;
                  const isCheat = rec.hasCheated;

                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 text-slate-400 font-mono">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                        {rec.timestamp}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{rec.studentName}</span>
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            {rec.studentClass}
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            #{rec.studentAttendanceNo}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-slate-800">
                        {rec.correctCount}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-500">
                        {rec.totalQuestions}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span 
                          className={`text-base font-black px-2.5 py-0.5 rounded-md ${
                            isCheat 
                              ? 'text-red-700 bg-red-50' 
                              : isPassed 
                              ? 'text-emerald-700 bg-emerald-50' 
                              : 'text-amber-700 bg-amber-50'
                          }`}
                        >
                          {rec.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span 
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isCheat 
                              ? 'bg-red-100 text-red-700 border border-red-200' 
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {rec.cheatStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {isCheat ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white uppercase">
                            Diskualifikasi
                          </span>
                        ) : isPassed ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-600 text-white uppercase">
                            Tuntas (KKM)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500 text-white uppercase">
                            Remidial
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catatan Guru & Integrasi Spreadsheet */}
      <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
        <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-sm text-blue-950 mb-0.5">
            Sistem Notifikasi & Rekaman Database Guru
          </strong>
          Semua nilai di atas secara otomatis tercatat ke <strong>Google Spreadsheet (Sheet 1)</strong> melalui Google Apps Script Web App dan notifikasi ringkasan langsung terkirim ke email <strong>{teacherEmail}</strong> setiap kali seorang siswa menekan tombol selesai atau didiskualifikasi oleh sistem pengawasan anti-curang. Siswa di akun mereka hanya menerima notifikasi penyelesaian tanpa rincian angka skor.
        </div>
      </div>
    </div>
  );
};
