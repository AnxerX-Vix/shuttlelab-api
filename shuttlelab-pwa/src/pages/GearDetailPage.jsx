import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  AlertCircle,
  Tag,
  Dumbbell,
  Compass,
  Activity,
  Check,
} from 'lucide-react';
import { fetchGearById } from '../api/apiClient';
import { useWishlist } from '../hooks/useWishlist';

export const GearDetailPage = () => {
  const { id } = useParams();
  const [gear, setGear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = gear ? isWishlisted(gear.id) : false;

  useEffect(() => {
    const loadGear = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGearById(id);
        setGear(data);
      } catch (err) {
        setError(err.message || 'Gagal memuat detail gear.');
      } finally {
        setLoading(false);
      }
    };
    loadGear();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: gear?.name || 'ShuttleLab Gear',
          text: `Cek spesifikasi ${gear?.name} di ShuttleLab`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3.5 animate-pulse">
        <div className="h-60 bg-slate-200 rounded-2xl"></div>
        <div className="h-5 w-24 bg-slate-200 rounded"></div>
        <div className="h-7 w-3/4 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 bg-slate-200 rounded-xl"></div>
          <div className="h-16 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error || !gear) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center my-4">
        <AlertCircle size={28} className="text-rose-600 mx-auto mb-1.5" />
        <h3 className="text-sm font-bold text-rose-900">Gear Tidak Ditemukan</h3>
        <p className="text-xs text-rose-700 mt-0.5">{error || 'Data produk tidak tersedia di sistem.'}</p>
        <Link
          to="/gears"
          className="mt-3 inline-flex items-center gap-1 bg-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-700 active:scale-95 transition-all"
        >
          <ChevronLeft size={14} />
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Top Nav Action */}
      <div className="flex items-center justify-between">
        <Link
          to="/gears"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronLeft size={15} strokeWidth={2.5} />
          Katalog
        </Link>
        <button
          onClick={handleShare}
          className="p-1.5 text-slate-600 bg-white border border-slate-200 rounded-xl shadow-2xs hover:text-slate-900 active:scale-95 transition-all"
          aria-label="Bagikan spek"
        >
          {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
        </button>
      </div>

      {copied && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-3 py-1.5 rounded-xl text-center">
          Tautan gear berhasil disalin
        </div>
      )}

      {/* Main Image Frame */}
      <div className="w-full aspect-[4/3] bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs overflow-hidden flex items-center justify-center">
        <img
          src={gear.image_url || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80'}
          alt={gear.name}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80';
          }}
        />
      </div>

      {/* Product Spec Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded tracking-wide">
              {gear.brand}
            </span>
            {gear.categories?.name && (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {gear.categories.name}
              </span>
            )}
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
            {gear.name}
          </h2>
          <p className="text-base font-black text-emerald-700 mt-1">
            {gear.price_range || '-'}
          </p>
        </div>

        {/* Technical Specs Grid */}
        <div className="border-t border-slate-100 pt-3.5">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Spesifikasi Lapangan
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold mb-0.5">
                <Dumbbell size={12} className="text-emerald-700" />
                <span>Berat & Grip</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.weight_grip || '-'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold mb-0.5">
                <Compass size={12} className="text-emerald-700" />
                <span>Keseimbangan</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.balance_point || '-'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold mb-0.5">
                <Activity size={12} className="text-emerald-700" />
                <span>Flex Shaft</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.shaft_flexibility || '-'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold mb-0.5">
                <Tag size={12} className="text-emerald-700" />
                <span>Seri</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.model || '-'}</p>
            </div>
          </div>
        </div>

        {/* Play Characteristics Description */}
        <div className="border-t border-slate-100 pt-3.5">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Karakter di Lapangan
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {gear.description || 'Tidak ada catatan karakter untuk seri ini.'}
          </p>
        </div>

        {/* Toggle Wishlist Action Button */}
        <button
          onClick={() => toggleWishlist(gear)}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            wishlisted
              ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              : 'bg-emerald-700 text-white shadow-xs hover:bg-emerald-800'
          }`}
        >
          <Bookmark size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2.3} />
          {wishlisted ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'}
        </button>
      </div>
    </div>
  );
};
