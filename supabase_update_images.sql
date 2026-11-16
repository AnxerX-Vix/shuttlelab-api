-- Skrip Pembaruan Image URL Aktif (HTTP 200 Terverifikasi)
-- Jalankan di Supabase Dashboard > SQL Editor

-- 1. Update Tabel Gears
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Astrox 88D Pro%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Thruster Ryuga II%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1627627256672-027a4613d028?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Aeronaut 9000%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Nanoflare 1000Z%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Power Cushion 65 Z3%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%P9200III%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Aerosensa 50%';
UPDATE gears SET image_url = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Aerobite Boost%';

-- 2. Update Tabel Techniques
UPDATE techniques SET image_url = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Split Step%';
UPDATE techniques SET image_url = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Forehand Overhead Clear%';
UPDATE techniques SET image_url = 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Forehand Low Service%';
UPDATE techniques SET image_url = 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Backhand Defense%';
UPDATE techniques SET image_url = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80' WHERE name ILIKE '%Attacking Jump Smash%';
