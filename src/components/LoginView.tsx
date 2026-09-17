import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, BookOpen, Hash } from 'lucide-react';
import { StudentIdentity } from '../types';

interface LoginViewProps {
  onLoginSuccess: (identity: StudentIdentity) => void;
  expectedPassword?: string;
  onOpenAdminLogin?: () => void;
}

const CLASS_OPTIONS = [
  '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H'
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  expectedPassword = '1234',
  onOpenAdminLogin
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('7A');
  const [attendanceNo, setAttendanceNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sesuai ketentuan:
  // "Username (Nama Siswa) dan Password (1234) baru tombol login (tidak ditampilkan)"
  // Tambahan: isian kelas dan nomor absen.
  // Tombol login tersembunyi hingga seluruh identitas valid dan password '1234' terisi!
  const isCriteriaMet = 
    studentName.trim().length >= 3 && 
    studentClass.trim().length > 0 &&
    attendanceNo.trim().length > 0 &&
    password.trim() === expectedPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMessage('Silakan masukkan nama lengkap siswa.');
      return;
    }
    if (!studentClass.trim()) {
      setErrorMessage('Silakan pilih atau masukkan kelas.');
      return;
    }
    if (!attendanceNo.trim()) {
      setErrorMessage('Silakan masukkan nomor absen siswa.');
      return;
    }
    if (password !== expectedPassword) {
      setErrorMessage(`Password ujian salah! Gunakan password resmi (${expectedPassword}).`);
      return;
    }
    setErrorMessage('');
    onLoginSuccess({
      name: studentName.trim(),
      className: studentClass.trim(),
      attendanceNumber: attendanceNo.trim()
    });
  };

  const handleQuickFill = (name: string, cls: string, no: string) => {
    setStudentName(name);
    setStudentClass(cls);
    setAttendanceNo(no);
    setPassword(expectedPassword);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/5 p-6 sm:p-8 relative overflow-hidden">
        {/* Top Decorative Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-2.5 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-1.5">
            CBT Google Apps Script
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            ULANGAN HARIAN INFORMATIKA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            4 Pilar Berpikir Komputasional & Scratch • Kelas 7 SMP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* 1. NAMA LENGKAP SISWA */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
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
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all text-slate-900 font-medium placeholder:text-slate-400"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* 2. ISIAN KELAS & NOMOR ABSEN */}
          <div className="grid grid-cols-2 gap-3">
            {/* Input Kelas */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Kelas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <select
                  id="select-kelas"
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden transition-all text-slate-900 font-semibold cursor-pointer"
                  required
                >
                  {CLASS_OPTIONS.map((cls) => (
                    <option key={cls} value={cls}>
                      Kelas {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Nomor Absen */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Nomor Absen
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-3.5 h-3.5" />
                </div>
                <input
                  id="input-nomor-absen"
                  type="number"
                  min="1"
                  max="50"
                  value={attendanceNo}
                  onChange={(e) => {
                    setAttendanceNo(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Contoh: 12"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden transition-all text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-normal"
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. PASSWORD UJIAN (1234) */}
          <div>
            <div className="flex justify-between items-center mb-1">
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
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all text-slate-900 font-medium placeholder:text-slate-400"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Hint indikator sebelum tombol login muncul */}
            {!isCriteriaMet && (
              <div className="mt-2.5 p-2.5 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-500 text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>
                  Tombol login akan muncul otomatis saat Nama, Kelas, No. Absen & Password (1234) telah terisi lengkap.
                </span>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Tombol login: HANYA TAMPIL setelah Identitas & Password 1234 diisi sesuai ketentuan */}
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
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2">
            Uji Cepat Identitas Siswa (1-Klik):
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <button
              type="button"
              onClick={() => handleQuickFill('Muhammad Budi Santoso', '7A', '14')}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Budi (7A - 14)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('Siti Nur Aminah', '7B', '28')}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Siti (7B - 28)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('Rizky Ananda Pratama', '7C', '07')}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Rizky (7C - 07)
            </button>
          </div>
        </div>

        {/* Footer info & Admin login button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col items-center gap-2">
          {onOpenAdminLogin && (
            <button
              type="button"
              onClick={onOpenAdminLogin}
              className="text-xs font-bold text-slate-600 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Tombol Admin Guru (spanju2026)</span>
            </button>
          )}
          <span className="text-[11px] text-slate-400">
            Sistem Pengawasan Otomatis Terkunci Layar Penuh
          </span>
        </div>
      </div>
    </div>
  );
};
