import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Mail, 
  Table, 
  RotateCcw, 
  FileCode2, 
  Award, 
  Clock, 
  Send
} from 'lucide-react';
import { ExamSession } from '../types';

interface ResultViewProps {
  session: ExamSession;
  teacherEmail: string;
  onRestart: () => void;
  onOpenGenerator: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  session,
  teacherEmail,
  onRestart,
  onOpenGenerator
}) => {
  const [emailSentSimulated, setEmailSentSimulated] = useState(true);

  const isCheat = session.hasCheated;
  const isPassed = session.score >= 75;

  const currentTimestamp = new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + ' WIB';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* CARD UTAMA HASIL UJIAN */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-9 text-center relative overflow-hidden">
        {/* Accent Bar */}
        <div 
          className={`absolute top-0 left-0 right-0 h-2 ${
            isCheat 
              ? 'bg-red-600' 
              : isPassed 
              ? 'bg-emerald-600' 
              : 'bg-amber-500'
          }`} 
        />

        {/* Icon Status */}
        <div className="mb-4">
          <div 
            className={`w-18 h-18 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-sm ${
              isCheat 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : isPassed 
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            {isCheat ? (
              <XCircle className="w-10 h-10" />
            ) : (
              <Award className="w-10 h-10" />
            )}
          </div>
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Evaluasi Ulangan Harian Informatika Kelas 7 SMP
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
          {isCheat ? 'Ujian Selesai (Terdeteksi Pelanggaran)' : 'Ujian Telah Selesai!'}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2 flex-wrap text-xs sm:text-sm text-slate-600">
          <span>Siswa: <strong className="text-slate-800">{session.studentName}</strong></span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
            Kelas: {session.studentClass}
          </span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
            Absen: #{session.studentAttendanceNo}
          </span>
        </div>

        {/* Score Display Card */}
        <div className="my-6 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-sm mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            NILAI AKHIR ANDA
          </div>
          <div 
            className={`text-6xl font-black tracking-tight leading-none ${
              isCheat 
                ? 'text-red-600' 
                : isPassed 
                ? 'text-blue-600' 
                : 'text-amber-600'
            }`}
          >
            {session.score}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-3">
            Skor Benar: <span className="text-slate-900 font-bold">{session.correctCount}</span> dari {session.totalQuestions} Soal
          </div>
          <div className="mt-2 inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
            KKM: 75 • Status: {session.score >= 75 ? 'Tuntas' : 'Remidial'}
          </div>
        </div>

        {/* Status Kejujuran / Anti-Curang Badge */}
        <div 
          className={`p-4 rounded-xl border text-xs sm:text-sm text-left max-w-lg mx-auto ${
            isCheat 
              ? 'bg-red-50/90 border-red-200 text-red-900' 
              : 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            {isCheat ? (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>Status Pengawasan Anti-Curang:</span>
          </div>
          <p className="font-semibold text-xs sm:text-sm pl-6">
            {session.cheatStatus}
          </p>
          {isCheat && (
            <p className="text-[11px] text-red-700 pl-6 mt-1">
              Catatan: Pelanggaran ini otomatis tercatat di Google Spreadsheet dan diteruskan ke email guru pengampu.
            </p>
          )}
        </div>
      </div>

      {/* INTEGRASI SPREADSHEET (PERSIS DENGAN HEADER KOLOM YANG DIMINTA) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Pratinjau Rekaman Google Spreadsheet (Sheet 1)
            </h3>
            <p className="text-xs text-slate-500">
              Format baris persis sesuai kolom yang ditentukan di prompt
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-3.5 py-2.5">Timestamp</th>
                <th className="px-3.5 py-2.5">Nama Siswa</th>
                <th className="px-3.5 py-2.5 text-center">Skor Benar</th>
                <th className="px-3.5 py-2.5 text-center">Total Soal</th>
                <th className="px-3.5 py-2.5 text-center">Nilai Akhir</th>
                <th className="px-3.5 py-2.5">Status Kecurangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-slate-50">
                <td className="px-3.5 py-3 whitespace-nowrap text-slate-600 font-mono">
                  {currentTimestamp}
                </td>
                <td className="px-3.5 py-3 font-bold text-slate-900 whitespace-nowrap">
                  {session.studentName} <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded ml-1">({session.studentClass} - #{session.studentAttendanceNo})</span>
                </td>
                <td className="px-3.5 py-3 text-center font-bold text-slate-800">
                  {session.correctCount}
                </td>
                <td className="px-3.5 py-3 text-center text-slate-600">
                  {session.totalQuestions}
                </td>
                <td className="px-3.5 py-3 text-center font-black text-blue-600 text-sm">
                  {session.score}
                </td>
                <td className="px-3.5 py-3 whitespace-nowrap">
                  <span 
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      isCheat 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {session.cheatStatus}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTIFIKASI EMAIL KE INFORMATIKASPANJU2026@GMAIL.COM */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Notifikasi Email Otomatis ke Guru
              </h3>
              <p className="text-xs text-slate-500">
                Terkirim ke: <span className="font-semibold text-blue-600">{teacherEmail}</span>
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
            <Send className="w-3.5 h-3.5" /> Terkirim Otomatis
          </span>
        </div>

        {/* Email Preview Card */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs bg-slate-50/50">
          <div className="bg-slate-800 text-slate-200 px-4 py-2.5 flex items-center justify-between">
            <span className="font-semibold">
              Subject: {isCheat ? '[PERINGATAN KECURANGAN] ' : '[NILAI UJIAN] '} Ulangan Informatika - {session.studentName} (Nilai: {session.score})
            </span>
            <span className="text-[10px] text-slate-400">MailApp.sendEmail()</span>
          </div>
          <div className="p-4 space-y-2 text-slate-700">
            <p>Halo Bapak/Ibu Guru Informatika,</p>
            <p>Berikut adalah rekaman hasil ujian ulangan harian siswa:</p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 font-mono text-[11px]">
              <div>• <strong>Nama Siswa</strong>: {session.studentName}</div>
              <div>• <strong>Kelas / No. Absen</strong>: {session.studentClass} / #{session.studentAttendanceNo}</div>
              <div>• <strong>Materi</strong>: 4 Pilar Berpikir Komputasional & Scratch (Kelas 7 SMP)</div>
              <div>• <strong>Skor Benar</strong>: {session.correctCount} / {session.totalQuestions} Soal</div>
              <div>• <strong>Nilai Akhir</strong>: <span className="text-blue-600 font-bold">{session.score} / 100</span></div>
              <div>• <strong>Status Kejujuran</strong>: <span className={isCheat ? "text-red-600 font-bold" : "text-emerald-600 font-bold"}>{session.cheatStatus}</span></div>
              <div>• <strong>Waktu Submit</strong>: {currentTimestamp}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Simulasi Ujian</span>
        </button>

        <button
          onClick={onOpenGenerator}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileCode2 className="w-4 h-4" />
          <span>Lihat & Salin Kode Google Apps Script</span>
        </button>
      </div>
    </div>
  );
};
