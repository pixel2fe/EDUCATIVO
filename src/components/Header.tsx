import React from 'react';
import { BookOpen, Sparkles, Download, Users, Brain, Award, ShieldCheck, FileText } from 'lucide-react';
import { BadgeAward } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unlockedBadges: BadgeAward[];
  onOpenBadgesModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unlockedBadges,
  onOpenBadgesModal,
}) => {
  const navItems = [
    { id: 'sesiones', label: 'Ruta de Aprendizaje (4 Sesiones)', icon: BookOpen },
    { id: 'glosario', label: 'Glosario Sonoro Iku', icon: Sparkles },
    { id: 'taller', label: 'Taller de Redacción', icon: Award },
    { id: 'comunidad', label: 'Voces de la Sierra (Publicaciones)', icon: Users },
    { id: 'sabedor', label: 'Sabedor Pedagógico IA', icon: Brain },
    { id: 'investigacion', label: 'Diagnóstico & Tesis PDF', icon: FileText },
    { id: 'descargas', label: 'Centro de Descargas', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/40 text-stone-100 shadow-lg">
      {/* Top Banner: Free Access Notice & Community Identification */}
      <div className="bg-gradient-to-r from-emerald-950 via-amber-950 to-stone-950 px-4 py-1.5 text-xs text-amber-200/90 flex flex-wrap justify-between items-center border-b border-amber-800/30">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            100% GRATIS · SIN ANUNCIOS · ACCESO LIBRE
          </span>
          <span className="hidden sm:inline text-stone-400">|</span>
          <span className="hidden sm:inline font-medium text-stone-300">
            I.E. Minas de Iracal · Pueblo Bello, Cesar · Sierra Nevada de Santa Marta
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBadgesModal}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition border border-amber-500/40 cursor-pointer"
            title="Ver insignias obtenidas"
          >
            <span className="text-sm">🏅</span>
            <span>{unlockedBadges.length} de 4 Insignias</span>
          </button>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('sesiones')}>
            {/* Visual Emblem inspired by thesis Logo: Sierra Nevada Peaks, Golden Sun, Chumbe pattern, Bridge L1->L2 */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-emerald-700 to-stone-900 p-0.5 shadow-md flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="text-2xl" role="img" aria-label="Sierra Nevada">🏔️</span>
                <span className="absolute bottom-0 right-0 text-[10px] bg-amber-500 text-stone-950 font-black px-1 rounded-tl">IKU</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-amber-100 font-serif">
                  Puentes de la Sierra
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/50">
                  RED Bilingüe
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Leo y escribo en español con apoyo de mi lengua Iku · Grados 8° y 9°
              </p>
            </div>
          </div>

          {/* Quick Action Button for Offline Download */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('descargas')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Todo Offline</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pt-3 pb-1 scrollbar-none text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
