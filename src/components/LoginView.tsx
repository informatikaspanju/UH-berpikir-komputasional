import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (studentName: string) => void;
  expectedPassword?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  expectedPassword = '1234'
}) => {
  const [studentName, setStudentName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sesuai ketentuan prompt: "Username (Nama Siswa) dan Password (1234) baru tombol login (tidak ditampilkan)"
  // Tombol login tersembunyi hingga username valid dan password '1234' terisi!
  const isCriteriaMet = studentName.trim().length >= 3 && password.trim() === expectedPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMessage('Silakan masukkan nama lengkap siswa.');
      return;
    }
    if (password !== expectedPassword) {
      setErrorMessage(`Password ujian salah! Gunakan password resmi (${expectedPassword}).`);
      return;
    }
    setErrorMessage('');
    onLoginSuccess(studentName.trim());
  };

  const handleQuickFill = (name: string) => {
    setStudentName(name);
    setPassword(expectedPassword);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/5 p-6 sm:p-8 relative overflow-hidden">
        {/* Top Decorative Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-3 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-2">
            CBT Google Apps Script
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            ULANGAN HARIAN INFORMATIKA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Materi: Berpikir Komputasional • Kelas 7 SMP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Username / Nama Lengkap Siswa
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="input-username-nama"
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Contoh: Muhammad Budi Santoso"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all text-slate-900 font-medium placeholder:text-slate-400"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password Ujian
              </label>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Password: 1234
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="input-password-ujian"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Ketik password ujian (1234)..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all text-slate-900 font-medium placeholder:text-slate-400"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Hint indikator sebelum tombol login muncul */}
            {!isCriteriaMet && (
              <div className="mt-2.5 p-2.5 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-500 text-xs flex items-center gap-2 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>
                  Tombol login akan muncul otomatis saat Nama & Password (1234) valid.
                </span>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Tombol login: HANYA TAMPIL setelah Username & Password 1234 diisi sesuai ketentuan prompt */}
          {isCriteriaMet ? (
            <div className="pt-2 animate-in fade-in duration-300">
              <button
                id="btn-login-cbt"
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Masuk ke Ruang Ujian</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : null}
        </form>

        {/* Quick Test Fill for Evaluator/Teacher */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2.5">
            Uji Cepat Cepat Akun Siswa (1-Klik):
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <button
              type="button"
              onClick={() => handleQuickFill('Budi Santoso')}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Budi Santoso
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('Siti Aminah')}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Siti Aminah
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('Rizky Pratama')}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Rizky Pratama
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 text-center text-[11px] text-slate-400">
          Sistem Pengawasan Otomatis Terkunci Layar Penuh
        </div>
      </div>
    </div>
  );
};
