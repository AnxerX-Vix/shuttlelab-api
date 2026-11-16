import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Bookmark,
  Trash2,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export const ProfilePage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="space-y-5 pb-6">
      {/* Praktikan Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            YS
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
              <Sparkles size={11} />
              Praktikan PPB 2026
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Yesaya Sandya Putra Prabaswara
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              NIM: 21120124120012
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-400 block font-medium">Program Studi</span>
            <span className="font-semibold text-slate-800">Teknik Komputer</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-400 block font-medium">Universitas</span>
            <span className="font-semibold text-slate-800">Diponegoro (UNDIP)</span>
          </div>
        </div>
      </div>

      {/* About ShuttleLab Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Info size={17} className="text-emerald-600" />
          Tentang Aplikasi ShuttleLab
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          ShuttleLab adalah direktori katalog gear dan panduan teknik bulutangkis berbasis Progressive Web App (PWA). Aplikasi ini dirancang mobile-first sebagai Tugas Akhir Praktikum Pemrograman Perangkat Bergerak (PPB) 2026.
        </p>
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] font-semibold text-slate-500">
          <span className="bg-slate-100 px-2 py-0.5 rounded-md">React + Vite</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-md">Tailwind CSS</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-md">Express.js API</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-md">Supabase DB</span>
          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">PWA Service Worker</span>
        </div>
      </div>

      {/* Wishlist Lokal (localStorage) Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Bookmark size={18} className="text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Wishlist Gear Saya ({wishlist.length})
            </h3>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1"
            >
              <Trash2 size={13} />
              Hapus Semua
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center shadow-sm">
            <Bookmark size={30} className="text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">Wishlist Masih Kosong</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Tandai raket atau sepatu favoritmu di katalog untuk menyimpannya di browser secara offline.
            </p>
            <Link
              to="/gears"
              className="mt-4 inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Layers size={14} />
              Jelajahi Katalog Gear
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm flex items-center justify-between gap-3 group"
              >
                <Link
                  to={`/gears/${item.id}`}
                  className="flex items-center gap-3 min-w-0 flex-1"
                >
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=200&q=80'}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=200&q=80';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                      {item.brand}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5">
                      {item.price_range || '-'}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    to={`/gears/${item.id}`}
                    className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"
                    aria-label="Lihat Detail"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    aria-label="Hapus dari Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
