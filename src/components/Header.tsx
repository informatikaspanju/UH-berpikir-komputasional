import React from 'react';
import { ShieldCheck, FileCode2, BookOpen, Laptop, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulation' | 'generator' | 'questions';
  setActiveTab: (tab: 'simulation' | 'generator' | 'questions') => void;
  isExamRunning: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, isExamRunning }) => {
  if (isExamRunning) {
    // Hide global navigation header when student is in active exam mode for distraction-free anti-cheat UI
    return null;
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-500/20">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight sm:text-lg">
                  CBT Informatika SMP
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Anti-Curang
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Ulangan Harian: Berpikir Komputasional Kelas 7 • Google Apps Script & Sheet
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'simulation'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Simulasi CBT</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'generator'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Kode Apps Script</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`hidden md:flex px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors items-center gap-1.5 ${
                activeTab === 'questions'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bank Soal (20)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
