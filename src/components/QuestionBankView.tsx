import React, { useState } from 'react';
import { QUESTIONS_BANK } from '../data/questions';
import { QuestionType, QuestionTopic } from '../types';
import { BookOpen, CheckCircle, Search, Layers, Check } from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredQuestions = QUESTIONS_BANK.filter((q) => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.contextText && q.contextText.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    const matchesType = selectedType === 'all' || q.type === selectedType;
    return matchesSearch && matchesTopic && matchesType;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Bank Soal Ulangan Harian ({QUESTIONS_BANK.length} Butir Soal)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Informatika Kelas 7 SMP • 4 Pilar Berpikir Komputasional & Pengenalan Aplikasi Scratch
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari teks bacaan atau soal..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-600 outline-hidden"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-600 outline-hidden cursor-pointer"
            >
              <option value="all">Semua Tipe Soal (30)</option>
              <option value="single">15 PG Tunggal</option>
              <option value="complex">5 PG Kompleks</option>
              <option value="true_false">5 Benar / Salah</option>
              <option value="matching">5 Menjodohkan</option>
            </select>
          </div>

          <div>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-600 outline-hidden cursor-pointer"
            >
              <option value="all">Semua Topik ({QUESTIONS_BANK.length})</option>
              <option value="Dekomposisi">Dekomposisi</option>
              <option value="Pengenalan Pola">Pengenalan Pola</option>
              <option value="Abstraksi">Abstraksi</option>
              <option value="Algoritma">Algoritma</option>
              <option value="Pengenalan Scratch">Pengenalan Scratch</option>
            </select>
          </div>
        </div>
      </div>

      {/* List of Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div 
            key={q.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                  {q.topic}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                  {q.type === 'single' && 'PG Tunggal'}
                  {q.type === 'complex' && 'PG Kompleks'}
                  {q.type === 'true_false' && 'Benar / Salah'}
                  {q.type === 'matching' && 'Menjodohkan'}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Nomor {q.id}
              </span>
            </div>

            {/* Context Text dari Word / Kasus */}
            {q.contextText && (
              <div className="bg-slate-50 p-3.5 rounded-lg border-l-4 border-blue-600 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                <span className="font-bold text-slate-900 block text-[11px] uppercase mb-1">
                  Konteks Bacaan / Kasus Soal:
                </span>
                {q.contextText}
              </div>
            )}

            <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
              {q.question}
            </h3>

            {/* 1. Tipe PG Tunggal */}
            {q.type === 'single' && q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt) => {
                  const isCorrect = opt.key === q.correctAnswer;
                  return (
                    <div
                      key={opt.key}
                      className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="pt-0.5 leading-snug">{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Tipe PG Kompleks */}
            {q.type === 'complex' && q.complexOptions && (
              <div className="space-y-2 pt-1">
                {q.complexOptions.map((opt) => {
                  const isCorrect = q.correctComplexAnswers?.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-300 bg-white text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <span className="pt-0.5 leading-snug">{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 3. Tipe Benar / Salah */}
            {q.type === 'true_false' && q.trueFalseItems && (
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden text-xs sm:text-sm">
                {q.trueFalseItems.map((item, idx) => (
                  <div key={item.id} className="p-2.5 sm:p-3 flex items-center justify-between gap-3 bg-white">
                    <span className="text-slate-700">({idx + 1}) {item.statement}</span>
                    <span className={`px-2.5 py-1 rounded-md font-bold text-xs shrink-0 ${
                      item.correctAnswer 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      Kunci: {item.correctAnswer ? 'BENAR' : 'SALAH'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Tipe Menjodohkan */}
            {q.type === 'matching' && q.matchingPremises && q.matchingTargets && (
              <div className="space-y-2 pt-1 text-xs sm:text-sm">
                {q.matchingPremises.map((premise, idx) => {
                  const targetObj = q.matchingTargets?.find((t) => t.id === premise.correctMatchId);
                  return (
                    <div key={premise.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-bold text-slate-800">({idx + 1}) {premise.premise}</div>
                      <div className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        ➔ {targetObj ? targetObj.text : '-'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Kunci Jawaban & Pembahasan */}
            <div className="pt-2 text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pembahasan:</strong> {q.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
