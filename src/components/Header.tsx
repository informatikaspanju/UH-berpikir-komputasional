import React from 'react';
import { ShieldCheck, FileCode2, BookOpen, Laptop, Lock, ShieldAlert, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulation' | 'generator' | 'questions' | 'admin';
  setActiveTab: (tab: 'simulation' | 'generator' | 'questions' | 'admin') => void;
  isExamRunning: boolean;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  isExamRunning,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onLogoutAdmin
}) => {
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
                {isAdminLoggedIn && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                    <ShieldAlert className="w-3 h-3 text-amber-700" /> Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Ulangan Harian: 4 Pilar Berpikir Komputasional & Scratch Kelas 7 • Google Apps Script & Sheet
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

            {/* TAB REKAP NILAI ADMIN (Jika sudah login admin) ATAU TOMBOL ADMIN (Jika belum login) */}
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'admin'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Rekap Nilai (Admin)</span>
                </button>

                <button
                  onClick={onLogoutAdmin}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                  title="Keluar dari akun admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs"
                title="Masuk ke Panel Guru / Administrator"
              >
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Tombol Admin</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('generator')}
              className={`hidden sm:flex px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors items-center gap-1.5 ${
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
              <span>Bank Soal (30)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
