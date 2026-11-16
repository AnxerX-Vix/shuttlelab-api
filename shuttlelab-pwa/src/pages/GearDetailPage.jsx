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
      navigator.share({
        title: gear?.name || 'ShuttleLab Gear',
        text: `Lihat spesifikasi ${gear?.name} di ShuttleLab`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 bg-slate-200 rounded-3xl"></div>
        <div className="h-6 w-1/3 bg-slate-200 rounded-md"></div>
        <div className="h-8 w-3/4 bg-slate-200 rounded-md"></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 bg-slate-200 rounded-2xl"></div>
          <div className="h-20 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !gear) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center my-6">
        <AlertCircle size={32} className="text-rose-500 mx-auto mb-2" />
        <h3 className="text-base font-bold text-rose-900">Gear Tidak Ditemukan</h3>
        <p className="text-xs text-rose-600 mt-1">{error || 'Data perlengkapan tidak tersedia.'}</p>
        <Link
          to="/gears"
          className="mt-4 inline-flex items-center gap-1 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
        >
          <ChevronLeft size={16} />
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-6">
      {/* Top Floating Controls */}
      <div className="flex items-center justify-between">
        <Link
          to="/gears"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 px-3 py-1.5 rounded-full shadow-sm hover:bg-slate-50 transition-all active:scale-95"
        >
          <ChevronLeft size={16} />
          Katalog
        </Link>
        <button
          onClick={handleShare}
          className="p-2 text-slate-600 bg-white border border-slate-200/90 rounded-full shadow-sm hover:text-slate-900 active:scale-95 transition-all"
          aria-label="Bagikan"
        >
          <Share2 size={16} />
        </button>
      </div>

      {copied && (
        <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-xl text-center">
          Tautan berhasil disalin ke clipboard!
        </div>
      )}

      {/* Product Image Card */}
      <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-slate-200/80 p-3 shadow-sm overflow-hidden flex items-center justify-center">
        <img
          src={gear.image_url || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80'}
          alt={gear.name}
          className="w-full h-full object-cover rounded-2xl"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80';
          }}
        />
      </div>

      {/* Main Info */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs uppercase font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {gear.brand}
            </span>
            {gear.categories?.name && (
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {gear.categories.name}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{gear.name}</h2>
          <p className="text-lg font-extrabold text-emerald-600 mt-1">{gear.price_range || '-'}</p>
        </div>

        {/* Specifications Grid */}
        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Spesifikasi Teknis
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Dumbbell size={14} className="text-emerald-600" />
                <span>Bobot & Grip</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.weight_grip || '-'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Compass size={14} className="text-emerald-600" />
                <span>Titik Keseimbangan</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.balance_point || '-'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Activity size={14} className="text-emerald-600" />
                <span>Fleksibilitas Batang</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.shaft_flexibility || '-'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Tag size={14} className="text-emerald-600" />
                <span>Model Seri</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{gear.model || '-'}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Karakteristik & Deskripsi
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {gear.description || 'Tidak ada deskripsi detail untuk perlengkapan ini.'}
          </p>
        </div>

        {/* Toggle Wishlist Button */}
        <button
          onClick={() => toggleWishlist(gear)}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            wishlisted
              ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              : 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
          }`}
        >
          <Bookmark size={18} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2.2} />
          {wishlisted ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'}
        </button>
      </div>
    </div>
  );
};
