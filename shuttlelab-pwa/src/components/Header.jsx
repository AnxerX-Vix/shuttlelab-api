import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const Header = ({ title, showBack = false, subtitle = '' }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between min-h-[36px]">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label="Kembali"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          )}
          <div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {!showBack && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>SHUTTLELAB</span>
          </div>
        )}
      </div>
    </header>
  );
};
