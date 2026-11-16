import { Link } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Layers,
  Info,
} from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export const ProfilePage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="space-y-4 pb-4">
      {/* Profil Pemilik / Praktikan */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-wider shadow-xs shrink-0">
            YS
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-extrabold text-slate-900 leading-tight truncate">
              Yesaya Sandya Putra Prabaswara
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              NIM 21120124120012
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-2.5 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/70">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Prodi</span>
            <span className="font-extrabold text-slate-800 text-[11px]">Teknik Komputer</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/70">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Kampus</span>
            <span className="font-extrabold text-slate-800 text-[11px]">Univ. Diponegoro</span>
          </div>
        </div>
      </div>

      {/* Tentang Aplikasi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
        <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xs">
          <Info size={15} className="text-emerald-700" />
          <span>Tentang ShuttleLab</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          ShuttleLab membantu pemain badminton membandingkan spesifikasi raket, sepatu, dan shuttlecock serta mempelajari urutan drill teknik di lapangan.
        </p>
      </div>

      {/* Wishlist Offline Storage Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Bookmark size={15} className="text-emerald-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Gear Disimpan ({wishlist.length})
            </h3>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[11px] text-rose-600 hover:text-rose-700 font-bold inline-flex items-center gap-1 active:scale-95 transition-all"
            >
              <Trash2 size={12} />
              Kosongkan
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-2xs">
            <Bookmark size={24} className="text-slate-300 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-slate-800">Belum Ada Gear Tersimpan</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
              Tandai raket atau sepatu incaranmu di katalog agar tersimpan offline di ponsel.
            </p>
            <Link
              to="/gears"
              className="mt-3 inline-flex items-center gap-1.5 bg-slate-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
            >
              <Layers size={13} />
              Buka Katalog Gear
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-2xs flex items-center justify-between gap-2.5 group"
              >
                <Link
                  to={`/gears/${item.id}`}
                  className="flex items-center gap-2.5 min-w-0 flex-1"
                >
                  <img
                    src={item.image_url || '/images/placeholder-gear.svg'}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-gear.svg';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase font-extrabold text-emerald-800 block">
                      {item.brand}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-extrabold text-slate-900 mt-0.5">
                      {item.price_range || '-'}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    to={`/gears/${item.id}`}
                    className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg active:scale-90 transition-colors"
                    aria-label="Buka Spek"
                  >
                    <ExternalLink size={14} />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg active:scale-90 transition-colors"
                    aria-label="Hapus dari simpanan"
                  >
                    <Trash2 size={14} />
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
