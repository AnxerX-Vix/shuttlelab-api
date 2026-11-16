import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GearListPage } from './pages/GearListPage';
import { GearDetailPage } from './pages/GearDetailPage';
import { TechniqueListPage } from './pages/TechniqueListPage';
import { TechniqueDetailPage } from './pages/TechniqueDetailPage';
import { ProfilePage } from './pages/ProfilePage';

export const App = () => {
  const location = useLocation();

  const getHeaderProps = () => {
    const path = location.pathname;
    if (path === '/gears' || path === '/') {
      return { title: 'Katalog Gear', subtitle: 'Raket, sepatu & perlengkapan' };
    }
    if (path.startsWith('/gears/')) {
      return { title: 'Spesifikasi Gear', showBack: true };
    }
    if (path === '/techniques') {
      return { title: 'Drill Teknik', subtitle: 'Footwork & pukulan lapangan' };
    }
    if (path.startsWith('/techniques/')) {
      return { title: 'Detail Drill', showBack: true };
    }
    if (path === '/profile') {
      return { title: 'Profil & Simpanan', subtitle: 'Informasi praktikan & offline gear' };
    }
    return { title: 'ShuttleLab' };
  };

  const { title, subtitle, showBack } = getHeaderProps();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-20 shadow-xs relative flex flex-col">
      <Header title={title} subtitle={subtitle} showBack={showBack} />
      <main className="flex-1 px-4 py-3.5">
        <Routes>
          <Route path="/" element={<Navigate to="/gears" replace />} />
          <Route path="/gears" element={<GearListPage />} />
          <Route path="/gears/:id" element={<GearDetailPage />} />
          <Route path="/techniques" element={<TechniqueListPage />} />
          <Route path="/techniques/:id" element={<TechniqueDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/gears" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
};

export default App;
