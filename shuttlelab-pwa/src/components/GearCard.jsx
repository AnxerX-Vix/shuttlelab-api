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
      className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150 flex flex-col justify-between group"
    >
      <div>
        <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-2.5">
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
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Simpan ke Wishlist"
          >
            <Bookmark size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2.2} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {gear.brand}
          </span>
          {gear.categories?.name && (
            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
              {gear.categories.name}
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {gear.name}
        </h3>

        {gear.weight_grip && (
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {gear.weight_grip} {gear.balance_point ? `• ${gear.balance_point.split(' ')[0]}` : ''}
          </p>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-600">
          {gear.price_range || '-'}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Detail &rarr;</span>
      </div>
    </Link>
  );
};
