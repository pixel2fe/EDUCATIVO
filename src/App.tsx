import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SessionsNavigator } from './components/SessionsNavigator';
import { GlossaryExplorer } from './components/GlossaryExplorer';
import { SessionFour } from './components/SessionFour';
import { CommunityLibrary } from './components/CommunityLibrary';
import { AiMentor } from './components/AiMentor';
import { ResearchHub } from './components/ResearchHub';
import { DownloadCenter } from './components/DownloadCenter';
import { BadgesModal } from './components/BadgesModal';
import { BADGES } from './data/curriculumData';
import { BadgeAward } from './types';
import { ShieldCheck, Heart, BookOpen, Download } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sesiones');
  const [unlockedBadges, setUnlockedBadges] = useState<BadgeAward[]>(() => {
    try {
      const saved = localStorage.getItem('puentes_unlocked_badges');
      return saved ? JSON.parse(saved) : [BADGES[0]]; // Start with badge 1 awarded or saved
    } catch {
      return [BADGES[0]];
    }
  });

  const [sharedTextForAi, setSharedTextForAi] = useState('');
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('puentes_unlocked_badges', JSON.stringify(unlockedBadges));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [unlockedBadges]);

  const handleUnlockBadge = (badgeId: string) => {
    const badgeObj = BADGES.find((b) => b.id === badgeId);
    if (!badgeObj) return;

    setUnlockedBadges((prev) => {
      if (prev.some((b) => b.id === badgeId)) return prev;
      return [...prev, { ...badgeObj, unlockedAt: new Date().toISOString() }];
    });
  };

  const handleConsultAiFromSession = (text: string) => {
    setSharedTextForAi(text);
    setActiveTab('sabedor');
  };

  const handlePublishStory = async (newStory: {
    title: string;
    author: string;
    grade: string;
    ethnicity: string;
    community: string;
    content: string;
    ikuWords: string[];
  }) => {
    try {
      await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStory),
      });
    } catch (e) {
      console.error('Error posting story:', e);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Header and Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unlockedBadges={unlockedBadges}
        onOpenBadgesModal={() => setIsBadgesModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'sesiones' && (
          <SessionsNavigator
            onUnlockBadge={handleUnlockBadge}
            unlockedBadges={unlockedBadges}
            onPublishStory={handlePublishStory}
            onConsultAi={handleConsultAiFromSession}
          />
        )}

        {activeTab === 'glosario' && <GlossaryExplorer />}

        {activeTab === 'taller' && (
          <SessionFour
            onUnlockBadge={handleUnlockBadge}
            isBadgeUnlocked={unlockedBadges.some((b) => b.id === 'badge-4')}
            onPublishStory={handlePublishStory}
            onConsultAi={handleConsultAiFromSession}
          />
        )}

        {activeTab === 'comunidad' && <CommunityLibrary />}

        {activeTab === 'sabedor' && <AiMentor initialPrompt={sharedTextForAi} />}

        {activeTab === 'investigacion' && <ResearchHub />}

        {activeTab === 'descargas' && <DownloadCenter />}
      </main>

      {/* Badges Modal */}
      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        unlockedBadges={unlockedBadges}
      />

      {/* Footer */}
      <footer className="mt-16 bg-stone-900 border-t border-amber-950/60 text-stone-400 py-10 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-serif text-sm font-bold text-amber-200">
              <span>🏔️ Puentes de la Sierra</span>
              <span className="text-[11px] font-sans px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                Acceso Abierto & Gratuito
              </span>
            </div>
            <p className="text-stone-400 max-w-md">
              Recurso Educativo Digital (RED) contextualizado para la Institución Educativa Minas de Iracal,
              municipio de Pueblo Bello, Cesar. Basado en el andamiaje etnocultural de la lengua Iku.
            </p>
            <p className="text-[11px] text-stone-400">
              Investigación: Yuri Angelica Carvajal Lopez, José Ignacio Zapata Osorio y Gloria Edicely Jaramillo Arango.
              Maestría en TIC para la Educación · Universidad de Investigación y Desarrollo (UDI, 2026).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
            <button
              onClick={() => setActiveTab('descargas')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Descargas Libres sin Anuncios</span>
            </button>
            <a
              href="/assets/aistudio/DOCUMENTO_e5e87348.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ver Tesis Completa (PDF)</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sin rastreadores comerciales ni anuncios publicitarios. Diseñado para la soberanía educativa rural.</span>
          </div>
          <div>Preservando el patrimonio biocultural de la Sierra Nevada de Santa Marta.</div>
        </div>
      </footer>
    </div>
  );
}
