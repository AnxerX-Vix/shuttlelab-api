import { Link } from 'react-router-dom';
import { ChevronRight, Footprints } from 'lucide-react';

export const TechniqueCard = ({ technique }) => {
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return { label: 'Dasar', style: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'intermediate':
        return { label: 'Menengah', style: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'advanced':
        return { label: 'Mahir', style: 'bg-rose-50 text-rose-800 border-rose-200' };
      default:
        return { label: difficulty || 'Umum', style: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const badge = getDifficultyBadge(technique.difficulty);

  const stepCount = Array.isArray(technique.steps)
    ? technique.steps.length
    : typeof technique.steps === 'string'
    ? JSON.parse(technique.steps || '[]').length
    : 0;

  return (
    <Link
      to={`/techniques/${technique.id}`}
      className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs hover:border-slate-300 active:scale-[0.99] transition-all duration-150 flex flex-col justify-between group"
    >
      <div className="flex gap-3 items-start">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200/80">
          <img
            src={technique.image_url || '/images/placeholder-technique.svg'}
            alt={technique.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/images/placeholder-technique.svg';
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5 mb-1 flex-wrap">
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {technique.category}
            </span>
            <span
              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${badge.style}`}
            >
              {badge.label}
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight line-clamp-1">
            {technique.name}
          </h3>

          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {technique.description}
          </p>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
          <Footprints size={12} className="text-emerald-600" />
          <span>{stepCount} langkah gerakan</span>
        </div>
        <div className="flex items-center gap-0.5 text-emerald-700 font-bold text-xs group-hover:translate-x-0.5 transition-transform">
          <span>Buka drill</span>
          <ChevronRight size={13} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
};
