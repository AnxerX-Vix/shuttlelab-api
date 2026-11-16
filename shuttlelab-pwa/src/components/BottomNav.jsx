import { NavLink } from 'react-router-dom';
import { Layers, Activity, User } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export const BottomNav = () => {
  const { wishlist } = useWishlist();

  const navItems = [
    { to: '/gears', label: 'Katalog', icon: Layers },
    { to: '/techniques', label: 'Drill Teknik', icon: Activity },
    {
      to: '/profile',
      label: 'Profil',
      icon: User,
      badge: wishlist.length > 0 ? wishlist.length : null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-3 gap-1">
        {navItems.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-emerald-700 font-bold bg-emerald-50/70'
                  : 'text-slate-400 font-medium hover:text-slate-700'
              }`
            }
          >
            <div className="relative">
              <Icon size={20} strokeWidth={2.3} />
              {badge !== null && (
                <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-extrabold rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center shadow-xs">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-[11px] tracking-tight mt-1 leading-none">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
