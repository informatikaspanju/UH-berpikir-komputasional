import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Shuffle, 
  Maximize2, 
  Split, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Layers,
  BookOpen,
  UserCheck
} from 'lucide-react';

interface InstructionsViewProps {
  studentName: string;
  studentClass?: string;
  studentAttendanceNo?: string;
  onStartExam: () => void;
  onCheatDetectedBeforeStart: (reason: string) => void;
}

export const InstructionsView: React.FC<InstructionsViewProps> = ({
  studentName,
  studentClass = '7A',
  studentAttendanceNo = '-',
  onStartExam,
  onCheatDetectedBeforeStart
}) => {
  const [simulateSplitScreen, setSimulateSplitScreen] = useState(false);

  const handleStartExamClick = () => {
    // 1. Deteksi belah layar riil atau simulasi
    // Sesuai ketentuan: "Ketika klik 'mulai ujian' dengan layar android/iPhone terbelah juga langsung selesai ujian."
    const screenH = window.screen.availHeight || window.screen.height;
    const screenW = window.screen.availWidth || window.screen.width;
    const innerH = window.innerHeight;
    const innerW = window.innerWidth;

    const ratioH = innerH / screenH;
    const ratioW = innerW / screenW;

    const isRealSplitScreen = ratioH < 0.62 || ratioW < 0.70;

    if (simulateSplitScreen || isRealSplitScreen) {
      onCheatDetectedBeforeStart("Terdeteksi Layar Terbelah (Split Screen) saat Memulai Ujian");
      return;
    }

    onStartExam();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-9 relative">
        {/* Header Section */}
        <div className="border-b border-slate-100 pb-6 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Petunjuk Ujian & Tata Tertib Anti-Curang</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Selamat Datang, <span className="text-blue-600">{studentName}</span>
          </h2>
          
          {/* Identitas Lengkap Siswa */}
          <div className="flex items-center gap-2 mt-2 flex-wrap text-xs sm:text-sm text-slate-600">
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-bold border border-blue-100">
              <UserCheck className="w-3.5 h-3.5" />
              Kelas: {studentClass}
            </span>
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-bold border border-indigo-100">
              No. Absen: #{studentAttendanceNo}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">
              Ulangan Harian INFORMATIKA Kelas 7 SMP
            </span>
          </div>
        </div>

        {/* Anti-Cheat Critical Warning Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 mb-6 text-amber-900">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm sm:text-base">
                PERHATIAN: Sistem Pengawasan Ketat Otomatis Aktif
              </h3>
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                Aplikasi ini dilengkapi <strong>pendeteksi kecurangan real-time</strong>. Ujian akan <strong>LANGSUNG DIBATALKAN & NILAI DITUTUP</strong> jika Anda:
              </p>
              <ul className="text-xs sm:text-sm list-disc list-inside space-y-1 mt-2 text-amber-900 font-medium">
                <li>Membelah layar (Split-Screen / Floating App) di HP Android, iPhone, maupun Laptop</li>
                <li>Pindah tab, membuka Google, atau meminimalkan jendela aplikasi</li>
                <li>Keluar dari mode Layar Penuh (Fullscreen)</li>
                <li>Mencoba copy-paste teks atau membuka menu klik kanan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rule Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Waktu Ujian</div>
              <div className="text-sm font-bold text-slate-900">60 Menit</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100/70 text-indigo-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Jumlah Soal</div>
              <div className="text-sm font-bold text-slate-900">30 Butir</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-100/70 text-violet-700 flex items-center justify-center shrink-0">
              <Shuffle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Model Soal</div>
              <div className="text-sm font-bold text-slate-900">Acak Per Siswa</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Tampilan</div>
              <div className="text-sm font-bold text-slate-900">1 Soal 1 Layar</div>
            </div>
          </div>
        </div>

        {/* Rincian Komposisi 30 Soal */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Komposisi 30 Butir Soal (Kurikulum Merdeka):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-500 block">PG Tunggal:</span>
              <strong className="text-slate-900 text-sm">15 Soal</strong> (A, B, C, D)
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-500 block">PG Kompleks:</span>
              <strong className="text-slate-900 text-sm">5 Soal</strong> (Centang &gt;1)
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Benar / Salah:</span>
              <strong className="text-slate-900 text-sm">5 Soal</strong> (Tabel B/S)
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Menjodohkan:</span>
              <strong className="text-slate-900 text-sm">5 Soal</strong> (Pasangkan)
            </div>
          </div>
        </div>

        {/* Interactive Testing Box for Split Screen simulation */}
        <div className="p-4 bg-slate-100/70 rounded-xl border border-slate-200 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-semibold text-slate-700">
                Fitur Pengujian Penguji/Guru: Simulasi HP Terbelah Layar (Split Screen)
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={simulateSplitScreen}
                onChange={(e) => setSimulateSplitScreen(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-slate-600">
                {simulateSplitScreen ? '🔴 Simulasi Belah Layar Aktif' : '⚪ Normal (Satu Layar Penuh)'}
              </span>
            </label>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Centang untuk menguji ketentuan prompt: <em>"Ketika klik 'mulai ujian' dengan layar android/iPhone terbelah juga langsung selesai ujian"</em>.
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            id="btn-mulai-ujian"
            onClick={handleStartExamClick}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-base rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-3 cursor-pointer mx-auto group"
          >
            <Maximize2 className="w-5 h-5" />
            <span>KUNCI LAYAR & MULAI UJIAN</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-slate-400 mt-3">
            Dengan mengklik tombol di atas, browser akan meminta izin Layar Penuh (Fullscreen) otomatis.
          </p>
        </div>
      </div>
    </div>
  );
};
