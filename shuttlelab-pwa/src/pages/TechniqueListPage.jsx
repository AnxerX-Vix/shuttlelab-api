import { useState, useEffect } from 'react';
import { fetchTechniques } from '../api/apiClient';
import { TechniqueCard } from '../components/TechniqueCard';
import { TechniqueListSkeleton } from '../components/SkeletonLoader';
import { AlertCircle, RefreshCw, Activity } from 'lucide-react';

export const TechniqueListPage = () => {
  const [techniques, setTechniques] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const difficultyTabs = ['All', 'Beginner', 'Intermediate', 'Advanced'];

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
      setError(err.message || 'Gagal mengambil data teknik badminton.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechniques();
  }, [selectedDifficulty]);

  return (
    <div className="space-y-4">
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-3xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
          <Activity size={14} />
          <span>Panduan Komprehensif</span>
        </div>
        <h2 className="text-base font-bold leading-snug">
          Kuasai Footwork & Pukulan Standar BWF
        </h2>
        <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
          Pelajari postur tubuh, timing lompatan, hingga penyelesaian smash yang efektif.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-200/80 p-1 rounded-2xl">
        {difficultyTabs.map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
              selectedDifficulty === diff
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Techniques List / Loading / Error */}
      {error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <AlertCircle size={28} className="text-rose-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-rose-800">Koneksi API Gagal</p>
          <p className="text-xs text-rose-600 mt-1">{error}</p>
          <button
            onClick={loadTechniques}
            className="mt-3 inline-flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
          >
            <RefreshCw size={13} />
            Coba Lagi
          </button>
        </div>
      ) : loading ? (
        <TechniqueListSkeleton />
      ) : techniques.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center shadow-sm">
          <Activity size={28} className="text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900">Belum Ada Teknik</h3>
          <p className="text-xs text-slate-500 mt-1">
            Belum ada panduan untuk tingkat kesulitan ini.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {techniques.map((tech) => (
            <TechniqueCard key={tech.id} technique={tech} />
          ))}
        </div>
      )}
    </div>
  );
};
