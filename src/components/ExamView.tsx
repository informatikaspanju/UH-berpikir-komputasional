import React, { useState, useEffect, useRef } from 'react';
import { Question, StudentAnswerValue } from '../types';
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
  EyeOff,
  Check,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface ExamViewProps {
  studentName: string;
  studentClass?: string;
  studentAttendanceNo?: string;
  questions: Question[];
  onFinishExam: (answers: Record<number, StudentAnswerValue>, cheatStatus: string) => void;
  examDurationMinutes?: number;
}

export const ExamView: React.FC<ExamViewProps> = ({
  studentName,
  studentClass = '7A',
  studentAttendanceNo = '-',
  questions,
  onFinishExam,
  examDurationMinutes = 60
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, StudentAnswerValue>>({});
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
    const checkSplitScreen = () => {
      if (isSubmittedRef.current) return;
      const screenH = window.screen.availHeight || window.screen.height;
      const screenW = window.screen.availWidth || window.screen.width;
      const innerH = window.innerHeight;
      const innerW = window.innerWidth;

      const ratioH = innerH / screenH;
      const ratioW = innerW / screenW;

      if (ratioH < 0.62 || ratioW < 0.70) {
        triggerCheat('Terdeteksi Layar Terbelah (Split Screen) Saat Ujian Berlangsung');
      }
    };

    const handleVisibilityChange = () => {
      if (isSubmittedRef.current) return;
      if (document.hidden) {
        triggerCheat('Pindah Tab / Minimize Aplikasi Saat Ujian');
      }
    };

    const handleBlur = () => {
      if (isSubmittedRef.current) return;
      triggerCheat('Pindah Jendela / Terdeteksi Membuka Aplikasi Lain');
    };

    const handleFullscreenChange = () => {
      if (isSubmittedRef.current) return;
      if (!document.fullscreenElement) {
        triggerCheat('Keluar dari Mode Layar Penuh (Kecurangan Terdeteksi)');
      }
    };

    const handleResize = () => {
      checkSplitScreen();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('resize', handleResize);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    checkSplitScreen();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const triggerCheat = (reason: string) => {
    if (isSubmittedRef.current) return;
    isSubmittedRef.current = true;
    onFinishExam(userAnswers, reason);
  };

  const currentQ = questions[currentIndex];

  // Handlers for Answers per Type
  const handleSelectSingle = (key: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key
    }));
  };

  const handleToggleComplex = (optionId: string) => {
    const existing = (userAnswers[currentQ.id] as string[]) || [];
    let updated: string[];
    if (existing.includes(optionId)) {
      updated = existing.filter((id) => id !== optionId);
    } else {
      updated = [...existing, optionId];
    }
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: updated
    }));
  };

  const handleToggleTrueFalse = (itemId: string, value: boolean) => {
    const existing = (userAnswers[currentQ.id] as Record<string, boolean>) || {};
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...existing,
        [itemId]: value
      }
    }));
  };

  const handleSelectMatching = (premiseId: string, targetId: string) => {
    const existing = (userAnswers[currentQ.id] as Record<string, string>) || {};
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...existing,
        [premiseId]: targetId
      }
    }));
  };

  // Navigations
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinishConfirm = () => {
    setShowConfirmModal(false);
    if (!isSubmittedRef.current) {
      isSubmittedRef.current = true;
      onFinishExam(userAnswers, 'Bersih (Tidak Ada Kecurangan)');
    }
  };

  const isQuestionAnswered = (q: Question): boolean => {
    const ans = userAnswers[q.id];
    if (!ans) return false;
    if (q.type === 'single') return typeof ans === 'string' && ans !== '';
    if (q.type === 'complex') return Array.isArray(ans) && ans.length > 0;
    if (q.type === 'true_false') return typeof ans === 'object' && Object.keys(ans).length === (q.trueFalseItems || []).length;
    if (q.type === 'matching') return typeof ans === 'object' && Object.keys(ans).length === (q.matchingPremises || []).length;
    return false;
  };

  const answeredCount = questions.filter(isQuestionAnswered).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col select-none">
      {/* HEADER SOAL UJIAN */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">
          {/* Header Kiri */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              INF
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                ULANGAN HARIAN INFORMATIKA KELAS 7
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[240px] sm:max-w-none flex items-center gap-1.5 flex-wrap">
                <span>Siswa: <strong className="text-slate-800">{studentName}</strong></span>
                <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                  {studentClass} - Absen #{studentAttendanceNo}
                </span>
                <span>• 30 Soal</span>
              </p>
            </div>
          </div>

          {/* Header Kanan: Timer 60 Menit */}
          <div className="flex items-center gap-2">
            <div 
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
                isDangerTime
                  ? 'bg-red-50 text-red-700 border-red-200 animate-pulse font-extrabold'
                  : isWarningTime
                  ? 'bg-amber-50 text-amber-800 border-amber-200 font-bold'
                  : 'bg-slate-100 text-slate-800 border-slate-200 font-bold'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block leading-none sm:hidden">
                  Sisa
                </span>
                <span className="text-xs sm:text-sm tracking-wide font-mono font-bold">
                  {timeFormatted}
                </span>
              </div>
            </div>

            {/* Tombol Bantuan Simulator Pengawas/Guru */}
            <button
              type="button"
              onClick={() => setShowCheatSimMenu(!showCheatSimMenu)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-xs"
              title="Menu Pengujian Anti-Curang Guru"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulator Menu untuk Uji Coba Guru */}
        {showCheatSimMenu && (
          <div className="bg-red-50 border-t border-b border-red-200 px-4 py-2 text-xs text-red-900">
            <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                Panel Uji Coba Anti-Curang:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => triggerCheat('Terdeteksi Layar Terbelah (Split Screen) Saat Ujian Berlangsung')}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Split className="w-3 h-3" />
                  Simulasi Belah Layar (Split Screen)
                </button>
                <button
                  type="button"
                  onClick={() => triggerCheat('Pindah Tab / Minimize Aplikasi Saat Ujian')}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <EyeOff className="w-3 h-3" />
                  Simulasi Pindah Tab
                </button>
                <button
                  type="button"
                  onClick={() => triggerCheat('Keluar dari Mode Layar Penuh (Kecurangan Terdeteksi)')}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Minimize2 className="w-3 h-3" />
                  Simulasi Keluar Fullscreen
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* BODY KONTEN SOAL UJIAN (1 SOAL 1 HALAMAN) */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 sm:p-8">
          {/* Header Soal */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                Pilar: {currentQ.topic}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">
                {currentQ.type === 'single' && 'Pilihan Ganda Tunggal'}
                {currentQ.type === 'complex' && 'Pilihan Ganda Kompleks (Bisa >1 Jawaban)'}
                {currentQ.type === 'true_false' && 'Soal Benar / Salah'}
                {currentQ.type === 'matching' && 'Soal Menjodohkan Pasangan'}
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

          {/* 1. OPSI PILIHAN GANDA TUNGGAL (A, B, C, D) */}
          {currentQ.type === 'single' && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectSingle(opt.key)}
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
          )}

          {/* 2. OPSI PILIHAN GANDA KOMPLEKS (Checkbox Multi-selection) */}
          {currentQ.type === 'complex' && currentQ.complexOptions && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50/80 px-3 py-1.5 rounded-lg mb-2">
                ℹ️ Beri tanda centang pada semua pilihan yang menurut Anda benar (jawaban benar lebih dari satu).
              </div>
              {currentQ.complexOptions.map((opt) => {
                const selectedArr = (userAnswers[currentQ.id] as string[]) || [];
                const isChecked = selectedArr.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleToggleComplex(opt.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-blue-600 text-white'
                          : 'border-2 border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={`text-xs sm:text-sm leading-relaxed pt-0.5 ${
                      isChecked ? 'font-semibold text-slate-900' : 'text-slate-700'
                    }`}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. SOAL BENAR / SALAH (Table with B / S buttons) */}
          {currentQ.type === 'true_false' && currentQ.trueFalseItems && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50/80 px-3 py-1.5 rounded-lg mb-2">
                ℹ️ Klik tombol BENAR atau SALAH pada setiap pernyataan di bawah ini.
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {currentQ.trueFalseItems.map((item, idx) => {
                  const currentTF = (userAnswers[currentQ.id] as Record<string, boolean>) || {};
                  const userChoice = currentTF[item.id];
                  return (
                    <div key={item.id} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50/50">
                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                        <span className="font-bold mr-1">({idx + 1})</span> {item.statement}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleToggleTrueFalse(item.id, true)}
                          className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                            userChoice === true
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200'
                          }`}
                        >
                          BENAR
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleTrueFalse(item.id, false)}
                          className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                            userChoice === false
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-red-50 text-slate-700 border border-slate-200'
                          }`}
                        >
                          SALAH
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. SOAL MENJODOHKAN (Matching pairs) */}
          {currentQ.type === 'matching' && currentQ.matchingPremises && currentQ.matchingTargets && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50/80 px-3 py-1.5 rounded-lg mb-2">
                ℹ️ Pilih pasangan yang tepat dari kotak pilihan di setiap baris.
              </div>
              <div className="space-y-2.5">
                {currentQ.matchingPremises.map((premise, pIdx) => {
                  const currentMatches = (userAnswers[currentQ.id] as Record<string, string>) || {};
                  const userMatch = currentMatches[premise.id] || '';
                  return (
                    <div key={premise.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs sm:text-sm font-bold text-slate-800">
                        ({pIdx + 1}) {premise.premise}
                      </div>
                      <select
                        value={userMatch}
                        onChange={(e) => handleSelectMatching(premise.id, e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-600 focus:outline-hidden"
                      >
                        <option value="">-- Pilih Pasangan yang Cocok --</option>
                        {currentQ.matchingTargets?.map((target) => (
                          <option key={target.id} value={target.id}>
                            {target.text}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tombol Navigasi: Sebelumnya & Berikutnya / Selesai */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100 gap-3">
            <button
              type="button"
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
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai & Kumpulkan</span>
              </button>
            )}
          </div>
        </div>

        {/* PALET NOMOR SOAL (Ketentuan: 30 Soal) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Daftar Nomor Soal (30 Butir)
            </h3>
            <span className="text-xs font-semibold text-slate-600">
              Terjawab: <strong className="text-blue-600">{answeredCount}</strong> / {questions.length}
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = isQuestionAnswered(q);
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 sm:h-10 rounded-lg font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white'
                      : isAnswered
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
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

      {/* MODAL KONFIRMASI SUBMIT */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Kumpulkan Ujian Sekarang?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>{questions.length}</strong> soal.
                {answeredCount < questions.length && (
                  <span className="text-amber-600 block mt-1 font-semibold">
                    Masih ada {questions.length - answeredCount} soal yang belum dijawab!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
              >
                Periksa Lagi
              </button>
              <button
                type="button"
                onClick={handleFinishConfirm}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 cursor-pointer"
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
