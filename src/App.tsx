import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { InstructionsView } from './components/InstructionsView';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { GasGeneratorView } from './components/GasGeneratorView';
import { QuestionBankView } from './components/QuestionBankView';
import { QUESTIONS_BANK } from './data/questions';
import { ExamStep, ExamSession, Question } from './types';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'simulation' | 'generator' | 'questions'>('simulation');

  // CBT Simulation State
  const [examStep, setExamStep] = useState<ExamStep>('login');
  const [studentName, setStudentName] = useState('');
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);

  // Default Teacher Configuration
  const [teacherEmail] = useState('informatikaspanju2026@gmail.com');
  const [sheetUrl] = useState('');

  // 1. Shuffling Questions per Student (Ketentuan: "Soal tampil secara acak untuk masing-masing siswa.")
  const shuffleQuestions = (items: Question[]): Question[] => {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 2. Handlers for Exam Lifecycle
  const handleLoginSuccess = (name: string) => {
    setStudentName(name);
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
    // Siswa mencoba mulai ujian dengan layar sudah terbelah
    const session: ExamSession = {
      studentName: studentName || 'Siswa',
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
    setExamSession(session);
    setExamStep('result');
  };

  const handleFinishExam = (
    answers: Record<number, 'A' | 'B' | 'C' | 'D'>,
    cheatStatus: string
  ) => {
    // Hitung skor benar
    let correct = 0;
    QUESTIONS_BANK.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const total = QUESTIONS_BANK.length;
    const isCheated = cheatStatus !== 'Bersih (Tidak Ada Kecurangan)';
    const score = Math.round((correct / total) * 100);

    const session: ExamSession = {
      studentName: studentName || 'Siswa',
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
    setStudentName('');
    setExamSession(null);
    setRandomizedQuestions([]);
    setExamStep('login');
  };

  const isExamRunning = activeTab === 'simulation' && examStep === 'exam';

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* Global Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExamRunning={isExamRunning}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'simulation' && (
          <div>
            {examStep === 'login' && (
              <LoginView
                onLoginSuccess={handleLoginSuccess}
                expectedPassword="1234"
              />
            )}

            {examStep === 'instructions' && (
              <InstructionsView
                studentName={studentName}
                onStartExam={handleStartExam}
                onCheatDetectedBeforeStart={handleCheatBeforeStart}
              />
            )}

            {examStep === 'exam' && (
              <ExamView
                studentName={studentName}
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
                onOpenGenerator={() => setActiveTab('generator')}
              />
            )}
          </div>
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

      {/* Persistent Footer (hidden during active exam) */}
      {!isExamRunning && (
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © 2026 CBT Informatika SMP Kelas 7 • Materi Berpikir Komputasional
            </p>
            <p className="text-slate-400">
              Integrasi Google Apps Script, Google Spreadsheet & Notifikasi Email ({teacherEmail})
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
