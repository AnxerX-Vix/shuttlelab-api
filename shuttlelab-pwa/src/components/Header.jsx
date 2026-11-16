import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const Header = ({ title, showBack = false, subtitle = '' }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Kembali"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        {!showBack && (
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            PPB 2026
          </div>
        )}
      </div>
    </header>
  );
};
