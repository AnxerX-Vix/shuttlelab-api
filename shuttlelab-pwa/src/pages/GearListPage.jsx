import { useState, useEffect } from 'react';
import { Search, AlertCircle, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { fetchCategories, fetchGears } from '../api/apiClient';
import { GearCard } from '../components/GearCard';
import { GearGridSkeleton } from '../components/SkeletonLoader';

export const GearListPage = () => {
  const [categories, setCategories] = useState([]);
  const [gears, setGears] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (err) {
        console.error('Gagal mengambil kategori:', err);
      }
    };
    loadCategories();
  }, []);

  const loadGears = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const data = await fetchGears(params);
      setGears(data || []);
    } catch (err) {
      setError(err.message || 'Koneksi ke backend API terputus.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadGears();
    }, 200);
    return () => clearTimeout(timeout);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-3.5">
      {/* Search Input Bar */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari raket, seri, atau sepatu..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Horizontal Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 -mx-4 px-4 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.slug
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Grid Section */}
      {error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <AlertCircle size={24} className="text-rose-600 mx-auto mb-1.5" />
          <p className="text-xs font-bold text-rose-900">Gagal Mengambil Data Gear</p>
          <p className="text-[11px] text-rose-700 mt-0.5">{error}</p>
          <button
            onClick={loadGears}
            className="mt-2.5 inline-flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-700 active:scale-95 transition-all"
          >
            <RefreshCw size={12} />
            Muat Ulang
          </button>
        </div>
      ) : loading ? (
        <GearGridSkeleton />
      ) : gears.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
            <SlidersHorizontal size={18} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Gear Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tidak ada produk yang cocok dengan kata kunci pencarian.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold text-emerald-700 hover:underline"
          >
            Tampilkan semua gear
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {gears.length} Gear Tersedia
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {gears.map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
