import { useState, useEffect } from 'react';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
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
      setError(err.message || 'Gagal terhubung ke API backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadGears();
    }, 250);
    return () => clearTimeout(timeout);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari raket, sepatu, atau shuttlecock..."
          className="w-full bg-white border border-slate-200/90 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
          >
            Hapus
          </button>
        )}
      </div>

      {/* Horizontal Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          Semua Gear
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.slug
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Content: Error / Loading / Grid */}
      {error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <AlertCircle size={28} className="text-rose-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-rose-800">Koneksi API Gagal</p>
          <p className="text-xs text-rose-600 mt-1">{error}</p>
          <button
            onClick={loadGears}
            className="mt-3 inline-flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
          >
            <RefreshCw size={13} />
            Coba Lagi
          </button>
        </div>
      ) : loading ? (
        <GearGridSkeleton />
      ) : gears.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center shadow-sm">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search size={22} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Gear Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tidak ada perlengkapan yang cocok dengan kata kunci atau filter ini.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-semibold text-emerald-600 hover:underline"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-slate-500">
              Menampilkan {gears.length} Produk
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {gears.map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
