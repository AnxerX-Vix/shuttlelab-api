import { useState, useEffect } from 'react';
import { fetchTechniques } from '../api/apiClient';
import { TechniqueCard } from '../components/TechniqueCard';
import { TechniqueListSkeleton } from '../components/SkeletonLoader';
import { AlertCircle, RefreshCw, Footprints } from 'lucide-react';

export const TechniqueListPage = () => {
  const [techniques, setTechniques] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const difficultyOptions = [
    { key: 'All', label: 'Semua' },
    { key: 'Beginner', label: 'Dasar' },
    { key: 'Intermediate', label: 'Menengah' },
    { key: 'Advanced', label: 'Mahir' },
  ];

  const loadTechniques = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedDifficulty !== 'All') {
        params.difficulty = selectedDifficulty;
      }
      const data = await fetchTechniques(params);
      setTechniques(data || []);
    } catch (err) {
      setError(err.message || 'Koneksi ke server terputus.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechniques();
  }, [selectedDifficulty]);

  return (
    <div className="space-y-3.5">
      {/* Segmented Filter Control */}
      <div className="grid grid-cols-4 gap-1 bg-slate-200/70 p-1 rounded-xl">
        {difficultyOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedDifficulty(key)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedDifficulty === key
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content Stream */}
      {error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <AlertCircle size={24} className="text-rose-600 mx-auto mb-1.5" />
          <p className="text-xs font-bold text-rose-900">Gagal Mengambil Materi Teknik</p>
          <p className="text-[11px] text-rose-700 mt-0.5">{error}</p>
          <button
            onClick={loadTechniques}
            className="mt-2.5 inline-flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-700 active:scale-95 transition-all"
          >
            <RefreshCw size={12} />
            Muat Ulang
          </button>
        </div>
      ) : loading ? (
        <TechniqueListSkeleton />
      ) : techniques.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
            <Footprints size={18} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Belum Ada Materi</h3>
          <p className="text-xs text-slate-500 mt-1">
            Belum ada panduan teknik untuk tingkat ini.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {techniques.length} Drill Tersedia
            </span>
          </div>
          {techniques.map((tech) => (
            <TechniqueCard key={tech.id} technique={tech} />
          ))}
        </div>
      )}
    </div>
  );
};
