import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Lightbulb, AlertCircle } from 'lucide-react';
import { fetchTechniqueById } from '../api/apiClient';

export const TechniqueDetailPage = () => {
  const { id } = useParams();
  const [technique, setTechnique] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTechniqueById(id);
        setTechnique(data);
      } catch (err) {
        setError(err.message || 'Gagal memuat materi teknik.');
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-3.5 animate-pulse">
        <div className="h-44 bg-slate-200 rounded-2xl"></div>
        <div className="h-5 w-24 bg-slate-200 rounded"></div>
        <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-12 bg-slate-200 rounded-xl"></div>
          <div className="h-12 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error || !technique) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center my-4">
        <AlertCircle size={28} className="text-rose-600 mx-auto mb-1.5" />
        <h3 className="text-sm font-bold text-rose-900">Materi Tidak Ditemukan</h3>
        <p className="text-xs text-rose-700 mt-0.5">{error || 'Panduan tidak tersedia di database.'}</p>
        <Link
          to="/techniques"
          className="mt-3 inline-flex items-center gap-1 bg-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-700 active:scale-95 transition-all"
        >
          <ChevronLeft size={14} />
          Kembali ke Drill
        </Link>
      </div>
    );
  }

  const stepsArray = Array.isArray(technique.steps)
    ? technique.steps
    : typeof technique.steps === 'string'
    ? JSON.parse(technique.steps || '[]')
    : [];

  const getDifficultyLabel = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 'Dasar';
      case 'intermediate':
        return 'Menengah';
      case 'advanced':
        return 'Mahir';
      default:
        return diff || 'Umum';
    }
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Top Nav Control */}
      <div>
        <Link
          to="/techniques"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronLeft size={15} strokeWidth={2.5} />
          Daftar Drill
        </Link>
      </div>

      {/* Hero Visual Card */}
      {technique.image_url && (
        <div className="w-full aspect-[16/9] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <img
            src={technique.image_url}
            alt={technique.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Technique Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            {technique.category}
          </span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Level {getDifficultyLabel(technique.difficulty)}
          </span>
        </div>

        <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
          {technique.name}
        </h2>

        <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
          {technique.description}
        </p>
      </div>

      {/* Step by Step Execution Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Urutan Gerakan ({stepsArray.length} Langkah)
        </h3>

        <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {stepsArray.map((step, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-5 top-0 w-4 h-4 rounded-full bg-slate-900 text-white font-extrabold text-[10px] flex items-center justify-center ring-3 ring-white">
                {index + 1}
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium pl-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Coach Note Callout */}
      {technique.key_tips && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
              <Lightbulb size={16} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-amber-950 uppercase tracking-wider mb-0.5">
                Catatan Pelatih
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {technique.key_tips}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
