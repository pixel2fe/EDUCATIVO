import React, { useState } from 'react';
import { SessionOne } from './SessionOne';
import { SessionTwo } from './SessionTwo';
import { SessionThree } from './SessionThree';
import { SessionFour } from './SessionFour';
import { BadgeAward } from '../types';

interface SessionsNavigatorProps {
  onUnlockBadge: (badgeId: string) => void;
  unlockedBadges: BadgeAward[];
  onPublishStory: (newStory: {
    title: string;
    author: string;
    grade: string;
    ethnicity: string;
    community: string;
    content: string;
    ikuWords: string[];
  }) => void;
  onConsultAi: (text: string) => void;
}

export const SessionsNavigator: React.FC<SessionsNavigatorProps> = ({
  onUnlockBadge,
  unlockedBadges,
  onPublishStory,
  onConsultAi,
}) => {
  const [activeSessionNumber, setActiveSessionNumber] = useState(1);

  const unlockedIds = new Set(unlockedBadges.map((b) => b.id));

  const sessionTabs = [
    { num: 1, title: '1. Voces de la Sierra', badgeId: 'badge-1', label: 'Vocabulario Iku & Navegación' },
    { num: 2, title: '2. Leyendas del Territorio', badgeId: 'badge-2', label: 'Lectura Comprensiva e Inferencial' },
    { num: 3, title: '3. Tejiendo Palabras', badgeId: 'badge-3', label: 'Conectores, Concordancia & Puntuación' },
    { num: 4, title: '4. Nuestra Palabra Escrita', badgeId: 'badge-4', label: 'Redacción Guiada & Diálogo de Saberes' },
  ];

  return (
    <div className="space-y-6">
      {/* Horizontal Steps Bar */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-3 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sessionTabs.map((s) => {
            const isActive = activeSessionNumber === s.num;
            const hasBadge = unlockedIds.has(s.badgeId);

            return (
              <button
                key={s.num}
                onClick={() => setActiveSessionNumber(s.num)}
                className={`p-3 rounded-xl text-left transition flex flex-col justify-between cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-700/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] uppercase font-mono font-bold ${isActive ? 'text-stone-900' : 'text-amber-400'}`}>
                    Sesión {s.num}
                  </span>
                  {hasBadge && (
                    <span className="text-xs" title="Insignia ganada">
                      🏅
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold leading-tight line-clamp-1">{s.title.split('. ')[1]}</div>
                <div className={`text-[10px] line-clamp-1 mt-0.5 ${isActive ? 'text-stone-800' : 'text-stone-400'}`}>
                  {s.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Session */}
      {activeSessionNumber === 1 && (
        <SessionOne
          onUnlockBadge={onUnlockBadge}
          isBadgeUnlocked={unlockedIds.has('badge-1')}
          onGoToNextSession={() => setActiveSessionNumber(2)}
        />
      )}

      {activeSessionNumber === 2 && (
        <SessionTwo
          onUnlockBadge={onUnlockBadge}
          isBadgeUnlocked={unlockedIds.has('badge-2')}
          onGoToNextSession={() => setActiveSessionNumber(3)}
        />
      )}

      {activeSessionNumber === 3 && (
        <SessionThree
          onUnlockBadge={onUnlockBadge}
          isBadgeUnlocked={unlockedIds.has('badge-3')}
          onGoToNextSession={() => setActiveSessionNumber(4)}
        />
      )}

      {activeSessionNumber === 4 && (
        <SessionFour
          onUnlockBadge={onUnlockBadge}
          isBadgeUnlocked={unlockedIds.has('badge-4')}
          onPublishStory={onPublishStory}
          onConsultAi={onConsultAi}
        />
      )}
    </div>
  );
};
