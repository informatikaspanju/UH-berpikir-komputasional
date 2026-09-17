import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { InstructionsView } from './components/InstructionsView';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { GasGeneratorView } from './components/GasGeneratorView';
import { QuestionBankView } from './components/QuestionBankView';
import { AdminRekapView } from './components/AdminRekapView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { QUESTIONS_BANK } from './data/questions';
import { INITIAL_EXAM_RECORDS } from './data/mockRecords';
import { ExamStep, ExamSession, Question, StudentAnswerValue, StudentIdentity, ExamRecord } from './types';

const STORAGE_KEY = 'cbt_exam_records_v1';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'simulation' | 'generator' | 'questions' | 'admin'>('simulation');

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Rekap Nilai Keseluruhan (Persisten via LocalStorage)
  const [examRecords, setExamRecords] = useState<ExamRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_EXAM_RECORDS;
  });

  // Sinkronisasi ke LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(examRecords));
    } catch {
      // Abaikan jika kuota storage penuh
    }
  }, [examRecords]);

  // CBT Simulation State
  const [examStep, setExamStep] = useState<ExamStep>('login');
  const [studentIdentity, setStudentIdentity] = useState<StudentIdentity>({
    name: '',
    className: '7A',
    attendanceNumber: ''
  });
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);

  // Default Teacher Configuration
  const [teacherEmail] = useState('informatikaspanju2026@gmail.com');
  const [sheetUrl] = useState('');

  // 1. Shuffling Questions per Student
  const shuffleQuestions = (items: Question[]): Question[] => {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 2. Handlers for Exam Lifecycle
  const handleLoginSuccess = (identity: StudentIdentity) => {
    setStudentIdentity(identity);
    setExamStep('instructions');
  };

  const handleStartExam = () => {
    // Acak urutan soal untuk siswa ini
    const shuffled = shuffleQuestions(QUESTIONS_BANK);
    setRandomizedQuestions(shuffled);
    setExamStep('exam');

    // Request fullscreen mode jika didukung
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {
      // Abaikan jika browser membatasi iframe
    }
  };

  const handleCheatBeforeStart = (reason: string) => {
    const timestampStr = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' WIB';

    // Siswa mencoba mulai ujian dengan layar sudah terbelah
    const session: ExamSession = {
      studentName: studentIdentity.name || 'Siswa',
      studentClass: studentIdentity.className || '7A',
      studentAttendanceNo: studentIdentity.attendanceNumber || '-',
      startTime: Date.now(),
      endTime: Date.now(),
      remainingSeconds: 3600,
      answers: {},
      currentQuestionIndex: 0,
      isCompleted: true,
      score: 0,
      correctCount: 0,
      totalQuestions: QUESTIONS_BANK.length,
      cheatStatus: `DIDISKUALIFIKASI: ${reason}`,
      hasCheated: true,
      cheatDetails: reason
    };

    // Rekam ke daftar rekap admin
    const newRecord: ExamRecord = {
      id: 'rec-' + Date.now(),
      timestamp: timestampStr,
      studentName: session.studentName,
      studentClass: session.studentClass,
      studentAttendanceNo: session.studentAttendanceNo,
      correctCount: 0,
      totalQuestions: QUESTIONS_BANK.length,
      score: 0,
      cheatStatus: session.cheatStatus,
      hasCheated: true
    };
    setExamRecords((prev) => [newRecord, ...prev]);

    setExamSession(session);
    setExamStep('result');
  };

  const checkAnswerCorrectness = (q: Question, userAns: StudentAnswerValue | undefined): boolean => {
    if (!userAns) return false;

    if (q.type === 'single') {
      return userAns === q.correctAnswer;
    }

    if (q.type === 'complex') {
      if (!Array.isArray(userAns)) return false;
      const correct = q.correctComplexAnswers || [];
      if (userAns.length !== correct.length) return false;
      const sortedUser = [...userAns].sort();
      const sortedCorrect = [...correct].sort();
      return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
    }

    if (q.type === 'true_false') {
      const items = q.trueFalseItems || [];
      const ansMap = userAns as Record<string, boolean>;
      for (const item of items) {
        if (ansMap[item.id] !== item.correctAnswer) return false;
      }
      return true;
    }

    if (q.type === 'matching') {
      const premises = q.matchingPremises || [];
      const ansMap = userAns as Record<string, string>;
      for (const premise of premises) {
        if (ansMap[premise.id] !== premise.correctMatchId) return false;
      }
      return true;
    }

    return false;
  };

  const handleFinishExam = (
    answers: Record<number, StudentAnswerValue>,
    cheatStatus: string
  ) => {
    // Hitung skor benar
    let correct = 0;
    QUESTIONS_BANK.forEach((q) => {
      if (checkAnswerCorrectness(q, answers[q.id])) {
        correct++;
      }
    });

    const total = QUESTIONS_BANK.length;
    const isCheated = cheatStatus !== 'Bersih (Tidak Ada Kecurangan)';
    const score = Math.round((correct / total) * 100);

    const timestampStr = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' WIB';

    const session: ExamSession = {
      studentName: studentIdentity.name || 'Siswa',
      studentClass: studentIdentity.className || '7A',
      studentAttendanceNo: studentIdentity.attendanceNumber || '-',
      startTime: Date.now() - 1000 * 60 * 15,
      endTime: Date.now(),
      remainingSeconds: 0,
      answers,
      currentQuestionIndex: total - 1,
      isCompleted: true,
      score,
      correctCount: correct,
      totalQuestions: total,
      cheatStatus: isCheated ? `DIDISKUALIFIKASI: ${cheatStatus}` : 'Bersih (Tanpa Kecurangan)',
      hasCheated: isCheated,
      cheatDetails: isCheated ? cheatStatus : undefined
    };

    // Rekam ke daftar rekap admin (persisten)
    const newRecord: ExamRecord = {
      id: 'rec-' + Date.now(),
      timestamp: timestampStr,
      studentName: session.studentName,
      studentClass: session.studentClass,
      studentAttendanceNo: session.studentAttendanceNo,
      correctCount: correct,
      totalQuestions: total,
      score: score,
      cheatStatus: session.cheatStatus,
      hasCheated: isCheated
    };
    setExamRecords((prev) => [newRecord, ...prev]);

    setExamSession(session);
    setExamStep('result');

    // Exit fullscreen jika aktif
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {
      // Abaikan
    }
  };

  const handleRestartExam = () => {
    setStudentIdentity({
      name: '',
      className: '7A',
      attendanceNumber: ''
    });
    setExamSession(null);
    setRandomizedQuestions([]);
    setExamStep('login');
  };

  // Admin Actions
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminModalOpen(false);
    setActiveTab('admin');
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setActiveTab('simulation');
  };

  const isExamRunning = activeTab === 'simulation' && examStep === 'exam';

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* Global Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExamRunning={isExamRunning}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'simulation' && (
          <div>
            {examStep === 'login' && (
              <LoginView
                onLoginSuccess={handleLoginSuccess}
                expectedPassword="1234"
                onOpenAdminLogin={() => setIsAdminModalOpen(true)}
              />
            )}

            {examStep === 'instructions' && (
              <InstructionsView
                studentName={studentIdentity.name}
                studentClass={studentIdentity.className}
                studentAttendanceNo={studentIdentity.attendanceNumber}
                onStartExam={handleStartExam}
                onCheatDetectedBeforeStart={handleCheatBeforeStart}
              />
            )}

            {examStep === 'exam' && (
              <ExamView
                studentName={studentIdentity.name}
                studentClass={studentIdentity.className}
                studentAttendanceNo={studentIdentity.attendanceNumber}
                questions={randomizedQuestions}
                onFinishExam={handleFinishExam}
                examDurationMinutes={60}
              />
            )}

            {examStep === 'result' && examSession && (
              <ResultView
                session={examSession}
                teacherEmail={teacherEmail}
                onRestart={handleRestartExam}
                onOpenAdminLogin={() => setIsAdminModalOpen(true)}
              />
            )}
          </div>
        )}

        {/* Tab Rekapitulasi Nilai Keseluruhan (Admin Dashboard) */}
        {activeTab === 'admin' && (
          <AdminRekapView
            records={examRecords}
            onClearRecords={() => setExamRecords([])}
            onResetToDemo={() => setExamRecords(INITIAL_EXAM_RECORDS)}
            onLogoutAdmin={handleLogoutAdmin}
            onOpenGenerator={() => setActiveTab('generator')}
            teacherEmail={teacherEmail}
          />
        )}

        {activeTab === 'generator' && (
          <GasGeneratorView
            initialSheetUrl={sheetUrl}
            teacherEmail={teacherEmail}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBankView />
        )}
      </main>

      {/* Admin Login Modal (password: spanju2026) */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Persistent Footer (hidden during active exam) */}
      {!isExamRunning && (
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © 2026 CBT Informatika SMP Kelas 7 • 4 Pilar Berpikir Komputasional & Pengenalan Scratch
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Guru: {teacherEmail}</span>
              <span>•</span>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                Akses Admin Guru
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
