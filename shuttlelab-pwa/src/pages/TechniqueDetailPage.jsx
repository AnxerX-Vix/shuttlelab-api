import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
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
        setError(err.message || 'Gagal memuat detail panduan teknik.');
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-slate-200 rounded-3xl"></div>
        <div className="h-6 w-1/3 bg-slate-200 rounded-md"></div>
        <div className="h-8 w-3/4 bg-slate-200 rounded-md"></div>
        <div className="space-y-3">
          <div className="h-16 bg-slate-200 rounded-2xl"></div>
          <div className="h-16 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !technique) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center my-6">
        <AlertCircle size={32} className="text-rose-500 mx-auto mb-2" />
        <h3 className="text-base font-bold text-rose-900">Teknik Tidak Ditemukan</h3>
        <p className="text-xs text-rose-600 mt-1">{error || 'Data panduan teknik tidak tersedia.'}</p>
        <Link
          to="/techniques"
          className="mt-4 inline-flex items-center gap-1 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
        >
          <ChevronLeft size={16} />
          Kembali ke Panduan
        </Link>
      </div>
    );
  }

  const stepsArray = Array.isArray(technique.steps)
    ? technique.steps
    : typeof technique.steps === 'string'
    ? JSON.parse(technique.steps || '[]')
    : [];

  return (
    <div className="space-y-5 pb-6">
      {/* Top Controls */}
      <div>
        <Link
          to="/techniques"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 px-3 py-1.5 rounded-full shadow-sm hover:bg-slate-50 transition-all active:scale-95"
        >
          <ChevronLeft size={16} />
          Semua Panduan
        </Link>
      </div>

      {/* Visual Image Header */}
      {technique.image_url && (
        <div className="w-full aspect-[16/9] bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
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

      {/* Title & Metadata Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
            {technique.category}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            {technique.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {technique.name}
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          {technique.description}
        </p>
      </div>

      {/* Step by Step Guide */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600" />
          Tahapan Eksekusi Langkah ({stepsArray.length} Step)
        </h3>

        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
          {stepsArray.map((step, index) => (
            <div key={index} className="relative group">
              <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white font-extrabold text-[11px] flex items-center justify-center ring-4 ring-white shadow-sm">
                {index + 1}
              </span>
              <p className="text-sm text-slate-800 leading-relaxed font-medium pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips Callout Box */}
      {technique.key_tips && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-4.5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-2xl shrink-0 mt-0.5 shadow-sm">
              <Lightbulb size={20} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1">
                Kunci Sukses / Pro Tips Pelatih
              </h4>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {technique.key_tips}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
