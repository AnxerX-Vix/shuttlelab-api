import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export const GearCard = ({ gear }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(gear.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(gear);
  };

  return (
    <Link
      to={`/gears/${gear.id}`}
      className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xs hover:border-slate-300 active:scale-[0.98] transition-all duration-150 flex flex-col justify-between group"
    >
      <div>
        <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-2">
          <img
            src={gear.image_url || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80'}
            alt={gear.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80';
            }}
          />
          <button
            onClick={handleWishlistClick}
            className={`absolute top-1.5 right-1.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/85 text-slate-500 hover:text-slate-900 active:scale-90'
            }`}
            aria-label="Tandai gear"
          >
            <Bookmark size={14} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2.3} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-[10px] uppercase font-extrabold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded tracking-wide">
            {gear.brand}
          </span>
          {gear.categories?.name && (
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {gear.categories.name}
            </span>
          )}
        </div>

        <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {gear.name}
        </h3>

        {gear.weight_grip && (
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium line-clamp-1">
            {gear.weight_grip} {gear.balance_point ? `• ${gear.balance_point.split(' ')[0]}` : ''}
          </p>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-900">
          {gear.price_range || '-'}
        </span>
        <span className="text-[10px] text-emerald-700 font-bold group-hover:underline">
          Spek &rarr;
        </span>
      </div>
    </Link>
  );
};
