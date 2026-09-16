import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  Maximize2,
  Minimize2,
  Split,
  EyeOff
} from 'lucide-react';

interface ExamViewProps {
  studentName: string;
  questions: Question[];
  onFinishExam: (answers: Record<number, 'A' | 'B' | 'C' | 'D'>, cheatStatus: string) => void;
  examDurationMinutes?: number;
}

export const ExamView: React.FC<ExamViewProps> = ({
  studentName,
  questions,
  onFinishExam,
  examDurationMinutes = 60
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [secondsLeft, setSecondsLeft] = useState(examDurationMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCheatSimMenu, setShowCheatSimMenu] = useState(false);

  // References to prevent double submission
  const isSubmittedRef = useRef(false);

  // 1. TIMER 60 MENIT (Ketentuan: "Ada timer 60 menit di bagian kanan header, habis Waktu, maka ujian selesai.")
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isSubmittedRef.current) {
            isSubmittedRef.current = true;
            onFinishExam(userAnswers, 'Waktu Ujian Habis (60 Menit)');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinishExam, userAnswers]);

  // Format timer MM:SS
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const isWarningTime = secondsLeft <= 600; // 10 menit
  const isDangerTime = secondsLeft <= 180;  // 3 menit

  // 2. ANTI CHEAT REAL-TIME LISTENERS
  useEffect(() => {
    // Fungsi cek belah layar
    const checkSplitScreen = () => {
      if (isSubmittedRef.current) return;
      const screenH = window.screen.availHeight || window.screen.height;
      const screenW = window.screen.availWidth || window.screen.width;
      const innerH = window.innerHeight;
      const innerW = window.innerWidth;

      const ratioH = innerH / screenH;
      const ratioW = innerW / screenW;

      // Jika rasio tinggi atau lebar berkurang drastis (khas split screen di Android/iPhone/Laptop)
      if (ratioH < 0.62 || ratioW < 0.70) {
        triggerCheat('Terdeteksi Layar Terbelah (Split Screen) Saat Ujian Berlangsung');
      }
    };

    // Listener visibilitychange (Pindah Tab / Minimize)
    const handleVisibilityChange = () => {
      if (isSubmittedRef.current) return;
      if (document.hidden) {
        triggerCheat('Pindah Tab / Minimize Aplikasi Saat Ujian');
      }
    };

    // Listener window blur (Klik keluar browser / buka aplikasi lain)
    const handleWindowBlur = () => {
      if (isSubmittedRef.current) return;
      // Beri sedikit toleransi jika browser sedang transisi fullscreen
      triggerCheat('Pindah Jendela / Terdeteksi Membuka Aplikasi Lain');
    };

    // Listener fullscreen change
    const handleFullscreenChange = () => {
      if (isSubmittedRef.current) return;
      if (!document.fullscreenElement) {
        // Keluar fullscreen
        triggerCheat('Keluar dari Mode Layar Penuh (Kecurangan Terdeteksi)');
      }
    };

    // Cegah klik kanan
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Cegah shortcut keyboard inspect / copy / paste
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('resize', checkSplitScreen);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', checkSplitScreen);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userAnswers]);

  const triggerCheat = (reason: string) => {
    if (isSubmittedRef.current) return;
    isSubmittedRef.current = true;
    onFinishExam(userAnswers, reason);
  };

  const currentQ = questions[currentIndex] || questions[0];
  const selectedOption = userAnswers[currentQ?.id];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleManualSubmit = () => {
    if (isSubmittedRef.current) return;
    isSubmittedRef.current = true;
    onFinishExam(userAnswers, 'Bersih (Tidak Ada Kecurangan)');
  };

  const totalAnswered = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col select-none">
      {/* HEADER DI BAGIAN ATAS SOAL UJIAN (Responsive & Mobile Friendly) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 px-4 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Sisi Kiri: Judul Mapel & Identitas Siswa */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                INFORMATIKA KELAS 7
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                <Shield className="w-3 h-3" /> Anti-Curang
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-slate-800 truncate mt-0.5">
              Siswa: <span className="text-blue-600 font-extrabold">{studentName}</span>
            </h1>
          </div>

          {/* Sisi Kanan: Timer 60 Menit & Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold font-mono text-xs sm:text-sm tracking-wider border shadow-xs transition-colors ${
                isDangerTime 
                  ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                  : isWarningTime
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-current" />
              <span>{timeFormatted}</span>
            </div>

            {/* Tombol Test Cheat Simulator khusus untuk penguji/guru */}
            <button
              onClick={() => setShowCheatSimMenu(!showCheatSimMenu)}
              title="Menu Pengujian Anti-Curang (Khusus Penguji)"
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Uji Curang</span>
            </button>
          </div>
        </div>

        {/* Dropdown Panel Pengujian Anti Curang */}
        {showCheatSimMenu && (
          <div className="max-w-4xl mx-auto mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2 animate-in fade-in">
            <div className="font-bold text-amber-900 flex items-center justify-between">
              <span>Panel Uji Fitur Anti-Curang (Simulasikan pelanggaran siswa):</span>
              <button 
                onClick={() => setShowCheatSimMenu(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => triggerCheat('Terdeteksi Layar Terbelah (Split Screen) Saat Ujian Berlangsung')}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs flex items-center gap-1.5"
              >
                <Split className="w-3 h-3" />
                Simulasi Belah Layar (Split Screen)
              </button>
              <button
                onClick={() => triggerCheat('Pindah Tab / Minimize Aplikasi Saat Ujian')}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs flex items-center gap-1.5"
              >
                <EyeOff className="w-3 h-3" />
                Simulasi Pindah Tab / Minimize
              </button>
              <button
                onClick={() => triggerCheat('Keluar dari Mode Layar Penuh (Kecurangan Terdeteksi)')}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs flex items-center gap-1.5"
              >
                <Minimize2 className="w-3 h-3" />
                Simulasi Keluar Layar Penuh
              </button>
            </div>
          </div>
        )}
      </header>

      {/* BODY KONTEN SOAL UJIAN (1 SOAL 1 HALAMAN) */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 sm:p-8">
          {/* Header Soal */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                Pilar: {currentQ.topic}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500">
              Soal {currentIndex + 1} dari {questions.length}
            </span>
          </div>

          {/* Context Text dari Word (Teks Pengantar Soal Cerita) */}
          {currentQ.contextText && (
            <div className="bg-slate-50/90 border-l-4 border-blue-600 rounded-r-xl p-4 sm:p-5 mb-5 text-xs sm:text-sm leading-relaxed text-slate-700 font-normal">
              <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                Teks Bacaan / Kasus Soal:
              </div>
              <p className="whitespace-pre-line">{currentQ.contextText}</p>
            </div>
          )}

          {/* Pertanyaan */}
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-6">
            {currentQ.question}
          </h2>

          {/* Pilihan Ganda (A, B, C, D) */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                  }`}
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className={`text-xs sm:text-sm leading-relaxed pt-0.5 ${
                    isSelected ? 'font-semibold text-slate-900' : 'text-slate-700'
                  }`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tombol Navigasi: Sebelumnya & Berikutnya / Selesai */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100 gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                currentIndex === 0
                  ? 'invisible'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai & Kumpulkan</span>
              </button>
            )}
          </div>
        </div>

        {/* Palet Nomor Soal (Grid) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Navigasi Nomor Soal
            </h3>
            <span className="text-xs font-medium text-slate-500">
              Terjawab: <strong className="text-blue-600">{totalAnswered}</strong> / {questions.length}
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 sm:h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-slate-900 bg-blue-600 text-white scale-105 shadow-xs'
                      : isAnswered
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Modal Konfirmasi Selesai Ujian */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Kumpulkan Ujian Sekarang?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Anda telah menjawab <strong>{totalAnswered}</strong> dari <strong>{questions.length}</strong> soal. Setelah dikumpulkan, nilai Anda akan langsung keluar.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
              >
                Cek Kembali
              </button>
              <button
                onClick={handleManualSubmit}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs shadow-md shadow-emerald-600/20 transition-colors"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
