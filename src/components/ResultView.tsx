import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  RotateCcw, 
  Lock, 
  Calendar, 
  User, 
  BookOpen
} from 'lucide-react';
import { ExamSession } from '../types';

interface ResultViewProps {
  session: ExamSession;
  teacherEmail: string;
  onRestart: () => void;
  onOpenAdminLogin: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  session,
  teacherEmail,
  onRestart,
  onOpenAdminLogin
}) => {
  const isCheat = session.hasCheated;

  const currentTimestamp = new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + ' WIB';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      {/* KARTU NOTIFIKASI SELESAI SISWA (TANPA REKAP NILAI) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Top Accent Bar */}
        <div 
          className={`absolute top-0 left-0 right-0 h-2.5 ${
            isCheat ? 'bg-red-600' : 'bg-emerald-600'
          }`} 
        />

        {/* Icon Notifikasi Selesai */}
        <div className="mb-5">
          <div 
            className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-sm ${
              isCheat 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            }`}
          >
            {isCheat ? (
              <XCircle className="w-11 h-11" />
            ) : (
              <CheckCircle2 className="w-11 h-11" />
            )}
          </div>
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Konfirmasi Ujian Siswa
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
          {isCheat ? 'Ujian Dihentikan (Pelanggaran)' : 'Ujian Telah Selesai!'}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
          {isCheat ? (
            <span>
              Sistem pengawasan mendeteksi tindakan pelanggaran aturan ujian: <strong className="text-red-600">{session.cheatStatus}</strong>. Sesi ujian Anda telah dihentikan dan data pelanggaran otomatis dilaporkan ke guru.
            </span>
          ) : (
            <span>
              Terima kasih telah mengerjakan <strong>Ulangan Harian Informatika</strong> dengan tertib dan jujur. Jawaban Anda telah berhasil direkam ke server.
            </span>
          )}
        </p>

        {/* Kotak Informasi Selesai - Transparan & Menghormati Ketentuan Nilai Tidak Tampil di Siswa */}
        <div className="my-6 p-5 bg-slate-50/80 rounded-2xl border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-blue-600" /> Nama Siswa:
            </span>
            <strong className="text-slate-900 font-bold text-sm">
              {session.studentName}
            </strong>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Kelas & No. Absen:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                Kelas {session.studentClass}
              </span>
              <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">
                No. #{session.studentAttendanceNo}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600" /> Waktu Selesai:
            </span>
            <span className="font-mono text-slate-700 font-semibold">
              {currentTimestamp}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Status Penyimpanan:
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan di Database Guru
            </span>
          </div>
        </div>

        {/* Pemberitahuan Kebijakan Nilai Guru */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs text-left leading-relaxed">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-950">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Kebijakan Penilaian Ujian:</span>
          </div>
          <p>
            Sesuai kebijakan sekolah, <strong>rekap nilai ujian tidak ditampilkan di akun siswa</strong>. Seluruh rekapitulasi nilai dan hasil evaluasi hanya dapat dilihat oleh Guru melalui <strong>Akun Admin</strong>. Silakan menunggu pengumuman nilai dari guru pengampu mata pelajaran Informatika.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Selesai & Kembali ke Depan</span>
          </button>

          <button
            onClick={onOpenAdminLogin}
            className="w-full sm:w-auto px-5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-blue-200"
          >
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Login Admin (Lihat Rekap Nilai)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
