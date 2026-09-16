export interface Question {
  id: number;
  topic: 'Dekomposisi' | 'Pengenalan Pola' | 'Abstraksi' | 'Algoritma' | 'Representasi Data';
  contextText?: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export type ExamStep = 'login' | 'instructions' | 'exam' | 'result';

export interface ExamSession {
  studentName: string;
  startTime: number | null;
  endTime: number | null;
  remainingSeconds: number;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  currentQuestionIndex: number;
  isCompleted: boolean;
  score: number;
  correctCount: number;
  totalQuestions: number;
  cheatStatus: string;
  hasCheated: boolean;
  cheatDetails?: string;
}

export interface SpreadsheetConfig {
  sheetUrl: string;
  spreadsheetId: string;
  sheetName: string;
  teacherEmail: string;
  examDurationMinutes: number;
  passwordRequired: string;
}
