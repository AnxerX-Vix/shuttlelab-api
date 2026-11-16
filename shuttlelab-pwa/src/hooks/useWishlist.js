import { useState, useEffect } from 'react';

const STORAGE_KEY = 'shuttlelab_wishlist';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveWishlist = (items) => {
    setWishlist(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (e) {
      console.error('Gagal menyimpan wishlist ke localStorage', e);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setWishlist(saved ? JSON.parse(saved) : []);
      } catch {
        setWishlist([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlist-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlist-updated', handleStorageChange);
    };
  }, []);

  const isWishlisted = (id) => {
    return wishlist.some((item) => Number(item.id) === Number(id));
  };

  const toggleWishlist = (gear) => {
    if (!gear || !gear.id) return;
    const exists = isWishlisted(gear.id);
    if (exists) {
      const updated = wishlist.filter((item) => Number(item.id) !== Number(gear.id));
      saveWishlist(updated);
    } else {
      const updated = [gear, ...wishlist];
      saveWishlist(updated);
    }
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => Number(item.id) !== Number(id));
    saveWishlist(updated);
  };

  const clearWishlist = () => {
    saveWishlist([]);
  };

  return {
    wishlist,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  };
};
