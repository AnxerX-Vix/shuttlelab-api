import { NavLink } from 'react-router-dom';
import { Layers, Activity, User } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export const BottomNav = () => {
  const { wishlist } = useWishlist();

  const navItems = [
    { to: '/gears', label: 'Gear', icon: Layers },
    { to: '/techniques', label: 'Teknik', icon: Activity },
    {
      to: '/profile',
      label: 'Profile',
      icon: User,
      badge: wishlist.length > 0 ? wishlist.length : null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-emerald-600 font-semibold bg-emerald-50/80'
                  : 'text-slate-400 font-medium hover:text-slate-600'
              }`
            }
          >
            <div className="relative">
              <Icon size={22} strokeWidth={2.2} />
              {badge !== null && (
                <span className="absolute -top-1 -right-2.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-[11px] tracking-tight mt-0.5">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
