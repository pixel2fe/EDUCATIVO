import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Award, Sparkles, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GLOSSARY_WORDS } from '../data/curriculumData';
import { speakText } from '../utils/audioSynth';

interface SessionOneProps {
  onUnlockBadge: (badgeId: string) => void;
  isBadgeUnlocked: boolean;
  onGoToNextSession: () => void;
}

export const SessionOne: React.FC<SessionOneProps> = ({
  onUnlockBadge,
  isBadgeUnlocked,
  onGoToNextSession,
}) => {
  const [selectedWord, setSelectedWord] = useState(GLOSSARY_WORDS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Matching game state
  const wordsToMatch = [
    { id: 'm1', iku: 'Zanawina', es: 'Preservación y cuidado continuo del bosque y los ríos' },
    { id: 'm2', iku: 'Guni', es: 'Adversas (condiciones desfavorables o perjudiciales para la siembra)' },
    { id: 'm3', iku: 'Kaku Serankwa', es: 'Sostenibilidad y equilibrio con la Madre Tierra' },
    { id: 'm4', iku: 'Zaka', es: 'Antes de (acción de preparación previa a redactar)' },
    { id: 'm5', iku: 'Duna', es: 'Andamiaje (soporte de ayuda para aprender sin frustración)' },
  ];

  const [selectedIku, setSelectedIku] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Time Connector Exercise (antes de / después de)
  const [connectorChoice, setConnectorChoice] = useState<string | null>(null);
  const [connectorFeedback, setConnectorFeedback] = useState<string | null>(null);

  const handlePlayAudio = async (textToSpeak: string) => {
    setIsPlayingAudio(true);
    await speakText(textToSpeak);
    setIsPlayingAudio(false);
  };

  const handleSelectIku = (iku: string) => {
    setSelectedIku(iku);
    setFeedbackMsg({ text: `Seleccionaste "${iku}". Ahora pulsa sobre su significado correspondiente en la columna derecha.`, type: 'info' });
  };

  const handleSelectSpanish = (id: string, correctIku: string) => {
    if (!selectedIku) {
      setFeedbackMsg({ text: 'Primero selecciona una palabra en lengua Iku de la columna izquierda.', type: 'info' });
      return;
    }

    if (selectedIku === correctIku) {
      const nextMatched = [...matchedPairs, id];
      setMatchedPairs(nextMatched);
      setSelectedIku(null);
      setFeedbackMsg({ text: `¡Excelente acierto! ${selectedIku} se conecta con su significado en español.`, type: 'success' });

      if (nextMatched.length === wordsToMatch.length && !isBadgeUnlocked) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        onUnlockBadge('badge-1');
      }
    } else {
      setFeedbackMsg({ text: `Observa con atención: "${selectedIku}" no corresponde a esa opción. ¡Inténtalo de nuevo!`, type: 'error' });
    }
  };

  const handleResetGame = () => {
    setMatchedPairs([]);
    setSelectedIku(null);
    setFeedbackMsg(null);
  };

  const handleCheckConnector = (choice: string) => {
    setConnectorChoice(choice);
    if (choice === 'antes_de') {
      setConnectorFeedback('¡Correcto! "Antes de" indica la relación temporal de anterioridad: primero se ordenan las ideas en la mente o en lengua Iku, y luego se procede a redactar.');
      if (!isBadgeUnlocked && matchedPairs.length >= 3) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        onUnlockBadge('badge-1');
      }
    } else {
      setConnectorFeedback('Fíjate bien: la acción de organizar ideas se realiza de forma previa; por lo tanto, la locución correcta es "antes de".');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Session Title Header Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SESIÓN 1 DE 4
            </span>
            <span className="text-xs text-stone-400">Duración: 2 Horas (120 min) · Modo Offline</span>
          </div>

          {isBadgeUnlocked ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-pulse">
              <Award className="w-4 h-4 text-emerald-400" />
              Insignia Desbloqueada: Guardián de la Palabra
            </div>
          ) : (
            <div className="text-xs text-amber-300/80 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              🎯 Reto: Empareja 5 palabras y el conector para ganar la insignia
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Voces de la Sierra: Vocabulario bilingüe y navegación sin internet
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Aprende a navegar el recurso de forma autónoma desde cualquier computador o memoria USB.
          Descubre el significado formal en castellano de las palabras sagradas del territorio mediante
          audios guiados y el andamiaje de la lengua materna Iku.
        </p>

        {/* Rompehielos Pedagógico (CA1.2) */}
        <div className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              🌿 Rompehielos Bilingüe · Círculo de la Palabra
            </div>
            <p className="text-xs text-stone-300">
              Escucha el saludo en lengua Iku y español grabado con el docente dinamizador bilingüe.
            </p>
          </div>
          <button
            onClick={() => handlePlayAudio('¡Manikwa! Bienvenidos a Puentes de la Sierra. En este lugar nuestras palabras caminan juntas.')}
            disabled={isPlayingAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer flex-shrink-0"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-stone-950' : ''}`} />
            <span>{isPlayingAudio ? 'Reproduciendo...' : 'Escuchar Saludo Bilingüe'}</span>
          </button>
        </div>
      </div>

      {/* Part 1: Interactive Sound Glossary (10 Words) */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Glosario Sonoro del Territorio (Iku - Castellano)
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Selecciona una palabra para ver su pronunciación fonética, su contexto en la Sierra y escuchar su audio.
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-800 text-amber-300 border border-stone-700">
            10 Términos Clave
          </span>
        </div>

        {/* Word Select Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {GLOSSARY_WORDS.map((w) => {
            const isSelected = selectedWord.id === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWord(w)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                <span>{w.ikuTerm}</span>
                <span className="text-[10px] opacity-75">({w.spanishTerm})</span>
              </button>
            );
          })}
        </div>

        {/* Word Detail Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-stone-950/70 border border-amber-900/30 rounded-xl p-6">
          <div className="md:col-span-1 space-y-3 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-4">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Término en Lengua Iku</div>
            <div className="text-2xl font-bold text-amber-100 font-serif">{selectedWord.ikuTerm}</div>
            <div className="text-xs text-stone-400 italic">Fonética: [{selectedWord.phonetic}]</div>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Equivalente Formal Español</div>
              <div className="text-lg font-bold text-emerald-200">{selectedWord.spanishTerm}</div>
            </div>

            <button
              onClick={() => handlePlayAudio(selectedWord.audioText)}
              disabled={isPlayingAudio}
              className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar Pronunciación</span>
            </button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                Definición y Significado Pedagógico
              </div>
              <p className="text-stone-200 text-sm leading-relaxed">{selectedWord.definition}</p>
            </div>

            <div className="bg-amber-950/20 border-l-4 border-amber-500 p-3 rounded-r-lg">
              <div className="text-xs font-bold text-amber-300 mb-1">En el Territorio de la Sierra Nevada:</div>
              <p className="text-xs text-stone-300 italic">{selectedWord.territoryContext}</p>
            </div>

            <div className="bg-stone-900 p-3 rounded-lg border border-stone-800">
              <div className="text-xs font-bold text-emerald-300 mb-1">Ejemplo de Uso en Oración Formal:</div>
              <p className="text-xs text-stone-200">«{selectedWord.exampleSentence}»</p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Matching Challenge (iDevice eXeLearning Emulation) */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Juego Interactivo de Emparejamiento: El Puente de las Palabras
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Haz clic sobre la palabra en lengua Iku y luego pulsa su significado exacto en español.
            </p>
          </div>

          <button
            onClick={handleResetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Juego</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center justify-between ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-800/50'
                : feedbackMsg.type === 'error'
                ? 'bg-rose-950/60 text-rose-200 border border-rose-800/50'
                : 'bg-amber-950/60 text-amber-200 border border-amber-800/50'
            }`}
          >
            <span>{feedbackMsg.text}</span>
            {feedbackMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Iku Column */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              1. Lengua Materna Iku (Selecciona una)
            </div>
            {wordsToMatch.map((w) => {
              const isMatched = matchedPairs.includes(w.id);
              const isCurrent = selectedIku === w.iku;
              return (
                <button
                  key={w.id}
                  disabled={isMatched}
                  onClick={() => handleSelectIku(w.iku)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300 line-through opacity-70 cursor-not-allowed'
                      : isCurrent
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md scale-[1.01]'
                      : 'bg-stone-950 border-stone-800 text-stone-200 hover:border-amber-600/50'
                  }`}
                >
                  <span className="font-semibold text-sm">{w.iku}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Spanish Column */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              2. Significado en Castellano Formal
            </div>
            {wordsToMatch.map((w) => {
              const isMatched = matchedPairs.includes(w.id);
              return (
                <button
                  key={w.id}
                  disabled={isMatched}
                  onClick={() => handleSelectSpanish(w.id, w.iku)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300 font-medium opacity-70 cursor-not-allowed'
                      : 'bg-stone-950 border-stone-800 text-stone-200 hover:border-emerald-600/50 hover:bg-stone-900'
                  }`}
                >
                  <span className="text-xs leading-relaxed">{w.es}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-right text-xs text-stone-400">
          Progreso: <strong className="text-amber-300">{matchedPairs.length}</strong> de {wordsToMatch.length} parejas correctas
        </div>
      </div>

      {/* Part 3: Time Connector Exercise (antes de / después de) */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-amber-200 font-serif">
            Ejercicio de Orden Lógico: Conector de Anterioridad (Zaka)
          </h3>
        </div>
        <p className="text-xs text-stone-300 mb-4 leading-relaxed">
          En el pretest, el 66.7% de los estudiantes tuvo dudas al identificar la locución temporal de anterioridad.
          Completa la siguiente oración que describe cómo organizas tus ideas antes de escribir:
        </p>

        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 mb-4 text-stone-200 text-sm">
          «El estudiante organizó sus ideas en lengua Iku <span className="underline decoration-amber-400 font-bold px-1 text-amber-300">__________</span> redactar su texto argumentativo en español.»
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => handleCheckConnector('antes_de')}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${
              connectorChoice === 'antes_de'
                ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500'
            }`}
          >
            Opción A: «antes de» (Indica relación temporal de anterioridad o preparación)
          </button>

          <button
            onClick={() => handleCheckConnector('en_conclusion')}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${
              connectorChoice === 'en_conclusion'
                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500'
            }`}
          >
            Opción B: «en conclusión» (Indica cierre o resumen final)
          </button>
        </div>

        {connectorFeedback && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
            {connectorFeedback}
          </div>
        )}
      </div>

      {/* Advance to next session */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onGoToNextSession}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition cursor-pointer"
        >
          <span>Continuar a Sesión 2: Leyendas del Territorio</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
