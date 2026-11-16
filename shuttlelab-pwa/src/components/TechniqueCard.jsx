import { Link } from 'react-router-dom';
import { ChevronRight, Award } from 'lucide-react';

export const TechniqueCard = ({ technique }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const stepCount = Array.isArray(technique.steps)
    ? technique.steps.length
    : typeof technique.steps === 'string'
    ? JSON.parse(technique.steps || '[]').length
    : 0;

  return (
    <Link
      to={`/techniques/${technique.id}`}
      className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-150 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {technique.category}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyColor(
              technique.difficulty
            )}`}
          >
            {technique.difficulty}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
          {technique.name}
        </h3>

        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
          {technique.description}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Award size={14} className="text-emerald-600" />
          <span>{stepCount} Langkah Panduan</span>
        </div>
        <div className="flex items-center gap-0.5 text-emerald-600 font-semibold">
          <span>Pelajari</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </Link>
  );
};
