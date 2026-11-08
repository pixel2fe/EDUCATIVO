import React from 'react';
import { Award, CheckCircle2, Lock, X } from 'lucide-react';
import { BADGES } from '../data/curriculumData';
import { BadgeAward } from '../types';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedBadges: BadgeAward[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose, unlockedBadges }) => {
  if (!isOpen) return null;

  const unlockedIds = new Set(unlockedBadges.map((b) => b.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-800/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-amber-100 font-serif">
              Insignias de Logro: Camino del Saber Arhuaco
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-300 mb-5 leading-relaxed">
          Cada insignia reconoce tu avance pedagógico en las sesiones del recurso educativo digital.
          Has desbloqueado <strong className="text-amber-300">{unlockedBadges.length}</strong> de {BADGES.length} insignias.
        </p>

        <div className="space-y-3">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedIds.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-center gap-4 transition ${
                  isUnlocked
                    ? 'bg-amber-950/40 border-amber-500/60 text-stone-100'
                    : 'bg-stone-950/60 border-stone-800 text-stone-500 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                    isUnlocked
                      ? 'bg-amber-500/20 border-amber-500/50 shadow-inner'
                      : 'bg-stone-900 border-stone-800'
                  }`}
                >
                  {badge.symbol}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-amber-200">{badge.title}</h4>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-900 text-amber-400 border border-stone-800">
                      Nivel {badge.level}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 mb-1">{badge.sessionTitle}</div>
                  <p className="text-xs text-stone-300">{badge.description}</p>
                </div>

                <div className="flex-shrink-0">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-stone-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-3 border-t border-stone-800 text-center">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer"
          >
            Aceptar y Continuar Aprendiendo
          </button>
        </div>
      </div>
    </div>
  );
};
