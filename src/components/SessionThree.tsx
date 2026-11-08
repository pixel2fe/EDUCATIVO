import React, { useState } from 'react';
import { Award, ChevronRight, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SessionThreeProps {
  onUnlockBadge: (badgeId: string) => void;
  isBadgeUnlocked: boolean;
  onGoToNextSession: () => void;
}

export const SessionThree: React.FC<SessionThreeProps> = ({
  onUnlockBadge,
  isBadgeUnlocked,
  onGoToNextSession,
}) => {
  // Reto 1: Sujeto agente vs Objeto (Sentence: "El mamo explicó la historia comunitaria a los alumnos de octavo grado")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentFeedback, setAgentFeedback] = useState<string | null>(null);

  // Reto 2: Concordancia de Género y Número (Solving item 17: 46.7% error rate)
  const [agreementChoice, setAgreementChoice] = useState<string | null>(null);
  const [agreementFeedback, setAgreementFeedback] = useState<string | null>(null);

  // Reto 3: Puente de conectores y punto y coma (Solving item 15 & 19)
  const [c1, setC1] = useState<string>('');
  const [hasSemicolon, setHasSemicolon] = useState<boolean>(false);
  const [c2, setC2] = useState<string>('');
  const [connectorPuzzleFeedback, setConnectorPuzzleFeedback] = useState<string | null>(null);

  // Reto 4: Limpiador de errores de chat («pq» -> «porque», etc.)
  const [fixedSlangWords, setFixedSlangWords] = useState<Record<string, string>>({
    pq: '',
    paises: '',
    prender: '',
    legua: '',
  });
  const [slangFeedback, setSlangFeedback] = useState<string | null>(null);

  // Track completed challenges
  const [completedChallenges, setCompletedChallenges] = useState<{
    r1: boolean;
    r2: boolean;
    r3: boolean;
    r4: boolean;
  }>({
    r1: false,
    r2: false,
    r3: false,
    r4: false,
  });

  const checkBadgeCondition = (updated: typeof completedChallenges) => {
    const total = Object.values(updated).filter(Boolean).length;
    if (total >= 3 && !isBadgeUnlocked) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onUnlockBadge('badge-3');
    }
  };

  const handleCheckAgent = (choice: string) => {
    setSelectedAgent(choice);
    if (choice === 'mamo') {
      setAgentFeedback('¡Correcto! (Etiqueta Verde) «El mamo» es el sujeto agente que ejecuta de forma directa la acción de explicar.');
      const next = { ...completedChallenges, r1: true };
      setCompletedChallenges(next);
      checkBadgeCondition(next);
    } else if (choice === 'alumnos') {
      setAgentFeedback('Fíjate bien: «Los alumnos» no realizan la explicación; ellos la reciben como objeto indirecto.');
    } else {
      setAgentFeedback('«La historia comunitaria» es el objeto directo (lo que se explica), no quien ejecuta la acción.');
    }
  };

  const handleCheckAgreement = (choice: string) => {
    setAgreementChoice(choice);
    if (choice === 'correcta') {
      setAgreementFeedback('¡Excelente! «Los recursos educativos digitales presentan actividades adaptadas...» mantiene concordancia perfecta en masculino plural y femenino plural.');
      const next = { ...completedChallenges, r2: true };
      setCompletedChallenges(next);
      checkBadgeCondition(next);
    } else {
      setAgreementFeedback('Observa el desacierto: mezclar singular y plural («La estrategia pedagógica diseñadas ofrecen») rompe la cohesión gramatical requerida.');
    }
  };

  const handleCheckConnectorPuzzle = () => {
    if (c1 === 'por lo tanto' && hasSemicolon && c2 === 'sin embargo') {
      setConnectorPuzzleFeedback('¡Perfecto! Has tejido la oración con maestría: ", por lo tanto" expresa la consecuencia lógica y "; sin embargo," introduce el contraste contextual delimitado con punto y coma.');
      const next = { ...completedChallenges, r3: true };
      setCompletedChallenges(next);
      checkBadgeCondition(next);
    } else {
      setConnectorPuzzleFeedback('Revisa con calma: Primero selecciona "por lo tanto", activa la casilla del punto y coma (;), y finalmente coloca "sin embargo".');
    }
  };

  const handleCheckSlang = () => {
    const isPq = fixedSlangWords.pq.toLowerCase().trim() === 'porque';
    const isPaises = fixedSlangWords.paises.toLowerCase().trim() === 'países';
    const isPrender = fixedSlangWords.prender.toLowerCase().trim() === 'aprender';
    const isLegua = fixedSlangWords.legua.toLowerCase().trim() === 'lengua';

    if (isPq && isPaises && isPrender && isLegua) {
      setSlangFeedback('¡Impecable! Limpiaste las abreviaturas informales de celular y restauraste la ortografía académica: "porque", "países", "aprender" y "lengua".');
      const next = { ...completedChallenges, r4: true };
      setCompletedChallenges(next);
      checkBadgeCondition(next);
    } else {
      setSlangFeedback('Algunas palabras aún tienen errores. Recuerda: «pq» -> «porque» (sin tilde), «países» (con tilde), «aprender» (con a-) y «lengua» (con n).');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Session Title Header Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SESIÓN 3 DE 4
            </span>
            <span className="text-xs text-stone-400">Duración: 2 Horas (120 min) · Semáforo Gramatical</span>
          </div>

          {isBadgeUnlocked ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-pulse">
              <Award className="w-4 h-4 text-emerald-400" />
              Insignia Desbloqueada: Tejedor de Ideas
            </div>
          ) : (
            <div className="text-xs text-amber-300/80 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              🎯 Reto: Completa 3 de los 4 retos para desbloquear la insignia
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Tejiendo Palabras: Conectores lógicos, concordancia y signos de puntuación
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Aprende con el sistema de semáforo por colores: 
          <span className="text-emerald-400 font-bold mx-1">Verde para el Sujeto</span>, 
          <span className="text-sky-400 font-bold mx-1">Azul para los Conectores</span> y 
          <span className="text-rose-400 font-bold mx-1">Rojo para Comas y Puntos y Coma</span>.
        </p>

        {/* Visual Semáforo Guide Bar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300 block">Verde: Sujeto Agente</span>
              <span className="text-stone-400 text-[11px]">¿Quién realiza la acción principal?</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/40 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-sky-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-sky-300 block">Azul: Conectores Lógicos</span>
              <span className="text-stone-400 text-[11px]">por lo tanto, sin embargo, porque</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-rose-300 block">Rojo: Puntuación Interna</span>
              <span className="text-stone-400 text-[11px]">Uso clave de la coma (,) y punto y coma (;)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reto 1: Sujeto Agente Directo */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-amber-200 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/40">
              1
            </span>
            Reto 1: ¿Quién realiza la acción? (Sujeto Agente Directo)
          </h3>
          {completedChallenges.r1 && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        </div>
        <p className="text-xs text-stone-300 mb-4">
          Lee la siguiente oración sobre la vida escolar en Minas de Iracal y selecciona qué sintagma cumple la función
          de sujeto que ejecuta la acción:
        </p>

        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 mb-4 text-center">
          <span className="text-base font-medium text-stone-100">
            «El mamo explicó la historia comunitaria a los alumnos de octavo grado»
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => handleCheckAgent('mamo')}
            className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              selectedAgent === 'mamo'
                ? 'bg-emerald-600 text-stone-950 font-bold border-emerald-400'
                : 'bg-stone-950 text-stone-200 border-stone-800 hover:border-emerald-500'
            }`}
          >
            A) El mamo
          </button>
          <button
            onClick={() => handleCheckAgent('historia')}
            className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              selectedAgent === 'historia'
                ? 'bg-rose-900/60 text-rose-200 border-rose-500'
                : 'bg-stone-950 text-stone-200 border-stone-800 hover:border-amber-500'
            }`}
          >
            B) La historia comunitaria
          </button>
          <button
            onClick={() => handleCheckAgent('alumnos')}
            className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              selectedAgent === 'alumnos'
                ? 'bg-rose-900/60 text-rose-200 border-rose-500'
                : 'bg-stone-950 text-stone-200 border-stone-800 hover:border-amber-500'
            }`}
          >
            C) Los alumnos de octavo grado
          </button>
        </div>

        {agentFeedback && (
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-200">
            {agentFeedback}
          </div>
        )}
      </div>

      {/* Reto 2: Concordancia de Género y Número */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-amber-200 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold border border-sky-500/40">
              2
            </span>
            Reto 2: Concordancia Morfosintáctica de Género y Número
          </h3>
          {completedChallenges.r2 && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        </div>
        <p className="text-xs text-stone-300 mb-4">
          En las lenguas Chibchas no existen las mismas marcas obligatorias de género y número que en español.
          ¿Cuál de las siguientes opciones preserva la concordancia gramatical correcta?
        </p>

        <div className="space-y-2 mb-4">
          <button
            onClick={() => handleCheckAgreement('discordancia_1')}
            className={`w-full text-left p-3.5 rounded-xl border text-xs transition cursor-pointer ${
              agreementChoice === 'discordancia_1'
                ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500'
            }`}
          >
            A) «La estrategia pedagógica diseñadas ofrecen soluciones claras a la comunidad.» (Error: singular / plural)
          </button>

          <button
            onClick={() => handleCheckAgreement('correcta')}
            className={`w-full text-left p-3.5 rounded-xl border text-xs transition cursor-pointer ${
              agreementChoice === 'correcta'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-emerald-500'
            }`}
          >
            B) «Los recursos educativos digitales presentan actividades adaptadas a la realidad cultural del territorio.»
          </button>

          <button
            onClick={() => handleCheckAgreement('discordancia_2')}
            className={`w-full text-left p-3.5 rounded-xl border text-xs transition cursor-pointer ${
              agreementChoice === 'discordancia_2'
                ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500'
            }`}
          >
            C) «Las cartillas interactivas fueron revisado por los profesores del área.» (Error: femenino / masculino)
          </button>
        </div>

        {agreementFeedback && (
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-200">
            {agreementFeedback}
          </div>
        )}
      </div>

      {/* Reto 3: Puente de Conectores y Punto y Coma */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold border border-rose-500/40">
              3
            </span>
            Reto 3: El Puente de los Conectores y el Punto y Coma (;)
          </h3>
          {completedChallenges.r3 && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        </div>
        <p className="text-xs text-stone-300 mb-4">
          Arma la siguiente proposición seleccionando los conectores adecuados y delimitando con punto y coma:
        </p>

        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 mb-4 text-sm leading-relaxed text-stone-200">
          «El recurso digital funciona sin internet,{' '}
          <select
            value={c1}
            onChange={(e) => setC1(e.target.value)}
            className="bg-stone-900 border border-sky-500/50 text-sky-300 px-2.5 py-1 rounded-md text-xs font-bold focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            <option value="">[Seleccionar conector 1]</option>
            <option value="por lo tanto">por lo tanto (consecuencia)</option>
            <option value="porque">porque (causa)</option>
            <option value="a pesar de que">a pesar de que</option>
          </select>{' '}
          los jóvenes pueden repasar en sus casas
          <button
            onClick={() => setHasSemicolon(!hasSemicolon)}
            className={`inline-block mx-1.5 px-2 py-0.5 rounded font-mono font-bold text-xs cursor-pointer border ${
              hasSemicolon
                ? 'bg-rose-500 text-stone-950 border-rose-400'
                : 'bg-stone-800 text-stone-400 border-stone-700 hover:border-rose-400'
            }`}
            title="Pulsa para colocar o quitar el punto y coma"
          >
            {hasSemicolon ? '; [Punto y coma activo]' : '[Insertar ;]'}
          </button>{' '}
          <select
            value={c2}
            onChange={(e) => setC2(e.target.value)}
            className="bg-stone-900 border border-sky-500/50 text-sky-300 px-2.5 py-1 rounded-md text-xs font-bold focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            <option value="">[Seleccionar conector 2]</option>
            <option value="sin embargo">sin embargo (restricción/contraste)</option>
            <option value="además">además (suma)</option>
            <option value="es decir">es decir (aclaración)</option>
          </select>
          , la falta de electricidad en algunas veredas aún representa una dificultad.»
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleCheckConnectorPuzzle}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer"
          >
            Comprobar Estructura de Oración
          </button>
        </div>

        {connectorPuzzleFeedback && (
          <div className="mt-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-200">
            {connectorPuzzleFeedback}
          </div>
        )}
      </div>

      {/* Reto 4: Limpiar Errores de Celular / Chat */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/40">
              4
            </span>
            Reto 4: Limpiador de Errores de Chat a Escritura Formal
          </h3>
          {completedChallenges.r4 && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        </div>
        <p className="text-xs text-stone-300 mb-4">
          En las pruebas escritas se detectaron abreviaturas de WhatsApp y palabras mal escritas.
          Escribe la forma académica correcta en cada casilla:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
            <div className="text-xs text-rose-300 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Abreviatura informal: «pq»</span>
            </div>
            <input
              type="text"
              placeholder="Escribe la palabra formal..."
              value={fixedSlangWords.pq}
              onChange={(e) => setFixedSlangWords({ ...fixedSlangWords, pq: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <span className="text-[10px] text-stone-400">Pista: Se escribe pegado y sin tilde para dar razón.</span>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
            <div className="text-xs text-rose-300 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Palabra sin tilde: «paises»</span>
            </div>
            <input
              type="text"
              placeholder="Escribe con acento ortográfico..."
              value={fixedSlangWords.paises}
              onChange={(e) => setFixedSlangWords({ ...fixedSlangWords, paises: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <span className="text-[10px] text-stone-400">Pista: Lleva tilde en la vocal débil para romper el diptongo.</span>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
            <div className="text-xs text-rose-300 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Falla léxica: «prender» (por adquirir saber)</span>
            </div>
            <input
              type="text"
              placeholder="Escribe el verbo correcto..."
              value={fixedSlangWords.prender}
              onChange={(e) => setFixedSlangWords({ ...fixedSlangWords, prender: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <span className="text-[10px] text-stone-400">Pista: Comienza por «a-» (adquirir conocimiento).</span>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
            <div className="text-xs text-rose-300 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Separación errónea: «le gua»</span>
            </div>
            <input
              type="text"
              placeholder="Escribe la palabra unida..."
              value={fixedSlangWords.legua}
              onChange={(e) => setFixedSlangWords({ ...fixedSlangWords, legua: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <span className="text-[10px] text-stone-400">Pista: Idioma o sistema de comunicación oral y escrito.</span>
          </div>
        </div>

        <button
          onClick={handleCheckSlang}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer"
        >
          Validar Correcciones Ortográficas
        </button>

        {slangFeedback && (
          <div className="mt-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-200">
            {slangFeedback}
          </div>
        )}
      </div>

      {/* Advance button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onGoToNextSession}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition cursor-pointer"
        >
          <span>Continuar a Sesión 4: Taller de Redacción Guiada</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
