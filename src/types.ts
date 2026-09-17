export type QuestionType = 'single' | 'complex' | 'true_false' | 'matching';

export type QuestionTopic = 
  | 'Dekomposisi' 
  | 'Pengenalan Pola' 
  | 'Abstraksi' 
  | 'Algoritma' 
  | 'Pengenalan Scratch';

export interface SingleOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ComplexOption {
  id: string;
  text: string;
}

export interface TrueFalseItem {
  id: string;
  statement: string;
  correctAnswer: boolean; // true = Benar, false = Salah
}

export interface MatchingPair {
  id: string;
  premise: string; // Teks di sebelah kiri
  correctMatchId: string; // ID target yang benar
}

export interface MatchingTarget {
  id: string;
  text: string; // Pilihan di sebelah kanan
}

export interface Question {
  id: number;
  type: QuestionType;
  topic: QuestionTopic;
  contextText?: string;
  question: string;
  // Untuk 'single'
  options?: SingleOption[];
  correctAnswer?: 'A' | 'B' | 'C' | 'D';
  // Untuk 'complex'
  complexOptions?: ComplexOption[];
  correctComplexAnswers?: string[];
  // Untuk 'true_false'
  trueFalseItems?: TrueFalseItem[];
  // Untuk 'matching'
  matchingPremises?: MatchingPair[];
  matchingTargets?: MatchingTarget[];
  explanation: string;
}

export type StudentAnswerValue = 
  | 'A' | 'B' | 'C' | 'D'
  | string[]
  | Record<string, boolean>
  | Record<string, string>;

export type ExamStep = 'login' | 'instructions' | 'exam' | 'result';

export interface StudentIdentity {
  name: string;
  className: string;
  attendanceNumber: string;
}

export interface ExamSession {
  studentName: string;
  studentClass: string;
  studentAttendanceNo: string;
  startTime: number | null;
  endTime: number | null;
  remainingSeconds: number;
  answers: Record<number, StudentAnswerValue>;
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
