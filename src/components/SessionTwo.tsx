import React, { useState } from 'react';
import { Mic, Square, Play, Award, ChevronRight, HelpCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakText } from '../utils/audioSynth';

interface SessionTwoProps {
  onUnlockBadge: (badgeId: string) => void;
  isBadgeUnlocked: boolean;
  onGoToNextSession: () => void;
}

export const SessionTwo: React.FC<SessionTwoProps> = ({
  onUnlockBadge,
  isBadgeUnlocked,
  onGoToNextSession,
}) => {
  // Interactive Popup Term State
  const [activeTooltip, setActiveTooltip] = useState<{
    term: string;
    ikuEquivalent: string;
    meaning: string;
    context: string;
  } | null>(null);

  // 6 Inferential Questions from Session 2
  const inferentialQuestions = [
    {
      id: 1,
      question: '1. ¿Cuál es el medio primordial mediante el cual se transmite el saber ancestral en la comunidad?',
      ikuClue: 'Piensa en las enseñanzas que se dan junto al fogón y en la chagra.',
      options: [
        { letter: 'A', text: 'Los manuales impresos y diccionarios oficiales.', isCorrect: false },
        { letter: 'B', text: 'La palabra hablada y el ejemplo directo en el campo de cultivo.', isCorrect: true },
        { letter: 'C', text: 'Los exámenes escritos de fin de período escolar.', isCorrect: false },
      ],
      explanation: 'El texto señala claramente que la oralidad y la vivencia en el territorio son el pilar de la transmisión del saber originario.',
    },
    {
      id: 2,
      question: '2. Del relato se infiere que los estudiantes guardan silencio en el aula formal principalmente debido a:',
      ikuClue: 'Recuerda cómo surge la pena al exigir hablar únicamente en español sin apoyo.',
      options: [
        { letter: 'A', text: 'Desinterés por las materias científicas.', isCorrect: false },
        { letter: 'B', text: 'Inseguridad y temor a equivocarse frente a la exigencia exclusiva de un idioma que no dominan plenamente.', isCorrect: true },
        { letter: 'C', text: 'Rechazo a participar en actividades comunitarias.', isCorrect: false },
      ],
      explanation: 'El silencio escolar en contextos indígenas no es falta de capacidad, sino el resultado del filtro afectivo y la falta de andamiaje bilingüe.',
    },
    {
      id: 3,
      question: '3. En el texto, la expresión figurada «tender puentes hacia el idioma nativo» significa:',
      ikuClue: 'No es un puente de madera sobre el río, sino una conexión pedagógica.',
      options: [
        { letter: 'A', text: 'Construir caminos de piedra o cemento entre veredas.', isCorrect: false },
        { letter: 'B', text: 'Crear apoyos pedagógicos y de mutuo respeto entre la lengua materna Iku y el castellano.', isCorrect: true },
        { letter: 'C', text: 'Prohibir la enseñanza del español en la escuela.', isCorrect: false },
      ],
      explanation: '«Tender puentes» es una metáfora que alude al andamiaje etnocultural: usar la lengua materna para construir nuevos aprendizajes sin fracturar la identidad.',
    },
    {
      id: 4,
      question: '4. ¿Cuál es la idea principal que defiende el autor del texto?',
      ikuClue: 'Bilingüismo aditivo: sumar el español sin restar el Iku.',
      options: [
        { letter: 'A', text: 'La escritura es la única forma válida de preservar la historia.', isCorrect: false },
        { letter: 'B', text: 'El aprendizaje del español como segunda lengua se fortalece cuando la escuela integra la lengua materna y las mediaciones contextualizadas.', isCorrect: true },
        { letter: 'C', text: 'Las computadoras deben reemplazar a las autoridades tradicionales.', isCorrect: false },
      ],
      explanation: 'La tesis principal sostiene que las competencias en castellano florecen cuando se legitima la lengua materna en el salón.',
    },
    {
      id: 5,
      question: '5. ¿Qué función comunicativa cumple el conector «Sin embargo» en el relato?',
      ikuClue: 'Introduce un contraste o alternativa frente a una dificultad previa.',
      options: [
        { letter: 'A', text: 'Indicar la hora exacta de la clase.', isCorrect: false },
        { letter: 'B', text: 'Introducir un contraste o alternativa esperanzadora frente al problema del silencio escolar.', isCorrect: true },
        { letter: 'C', text: 'Enumerar los materiales del salón.', isCorrect: false },
      ],
      explanation: '«Sin embargo» es un conector adversativo que contrapone la dificultad de la lengua con la solución tecnológica y pedagógica.',
    },
    {
      id: 6,
      question: '6. ¿Cuándo resulta provechoso un recurso tecnológico en el aula rural de Minas de Iracal?',
      ikuClue: 'Piensa en las limitaciones de luz e internet de nuestras veredas.',
      options: [
        { letter: 'A', text: 'Cuando funciona de manera autónoma sin internet y rescata los saberes culturales de la comunidad.', isCorrect: true },
        { letter: 'B', text: 'Cuando obliga a los estudiantes a memorizar listas aisladas.', isCorrect: false },
        { letter: 'C', text: 'Cuando impide dialogar con los mayores del resguardo.', isCorrect: false },
      ],
      explanation: 'Un recurso offline y etnoeducativo garantiza accesibilidad y pertinencia cultural en la escuela rural.',
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [checkedResults, setCheckedResults] = useState<Record<number, boolean>>({});

  // Voice Reflection Simulator / Audio Recorder
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordTimer, setRecordTimer] = useState(0);

  const handleSelectAnswer = (qId: number, letter: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: letter }));
  };

  const handleCheckQuestion = (q: typeof inferentialQuestions[0]) => {
    const userChoice = selectedAnswers[q.id];
    if (!userChoice) return;

    const correct = q.options.find((opt) => opt.letter === userChoice)?.isCorrect || false;
    const nextResults = { ...checkedResults, [q.id]: correct };
    setCheckedResults(nextResults);

    // If all 6 answered correctly, unlock badge 2
    const totalCorrect = Object.values(nextResults).filter(Boolean).length;
    if (totalCorrect >= 5 && !isBadgeUnlocked) {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      onUnlockBadge('badge-2');
    }
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordTimer(0);
      const interval = setInterval(() => {
        setRecordTimer((t) => {
          if (t >= 30) {
            clearInterval(interval);
            setIsRecording(false);
            setRecordedAudioUrl('simulated-voice-note.mp3');
            return 30;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setRecordedAudioUrl('simulated-voice-note.mp3');
    }
  };

  const handlePlaySample = () => {
    speakText('En nuestra pareja reflexionamos que tender puentes significa ayudarnos entre compañeros: traducir una palabra en lengua Iku nos permite entender mejor la lectura en español sin olvidar nuestra cultura.');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Session Title Header Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SESIÓN 2 DE 4
            </span>
            <span className="text-xs text-stone-400">Duración: 2 Horas (120 min) · Andamiaje de Recepción</span>
          </div>

          {isBadgeUnlocked ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-pulse">
              <Award className="w-4 h-4 text-emerald-400" />
              Insignia Desbloqueada: Lector de la Línea Negra
            </div>
          ) : (
            <div className="text-xs text-amber-300/80 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              🎯 Reto: Resuelve las preguntas inferenciales para desbloquear la insignia
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Leyendas del Territorio: Leemos y descubrimos el sentido de nuestras historias
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Supera las dificultades para deducir el sentido profundo de las lecturas. Explora el relato ancestral
          tocando los términos resaltados en azul para abrir ventanas explicativas en lengua Iku y castellano.
        </p>
      </div>

      {/* Part 1: Interactive Reading with Iku Popups */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-amber-200 font-serif">
              Relato: «El Canto del Río y la Palabra del Mamo»
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Haz clic sobre los términos resaltados en azul para ver su significado cultural en lengua Iku.
            </p>
          </div>
          <button
            onClick={() => speakText('La transmisión del conocimiento entre los pueblos de la Sierra se apoya principalmente en la palabra hablada y en el ejemplo directo en el campo de cultivo.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs transition cursor-pointer self-start sm:self-auto"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Escuchar Lectura en Voz Alta</span>
          </button>
        </div>

        {/* Narrative Box */}
        <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 text-stone-200 text-base leading-relaxed space-y-4">
          <p>
            La transmisión del conocimiento entre los pueblos de la Sierra se apoya principalmente en la{' '}
            <button
              onClick={() =>
                setActiveTooltip({
                  term: 'Palabra hablada (Oralidad)',
                  ikuEquivalent: 'Gwasékwa',
                  meaning: 'Enseñanza oral que se transmite de generación en generación junto al fuego y en la chagra.',
                  context: 'En Minas de Iracal, la oralidad mantiene vivas las normas y los consejos de los abuelos.',
                })
              }
              className="text-amber-400 font-bold underline decoration-amber-500/50 hover:bg-amber-950/40 px-1 rounded cursor-pointer"
            >
              palabra hablada
            </button>{' '}
            y en el ejemplo directo en el campo de cultivo.
          </p>

          <p>
            Cuando la escuela formal exige únicamente el uso del idioma escrito en castellano sin{' '}
            <button
              onClick={() =>
                setActiveTooltip({
                  term: 'Tender puentes hacia el idioma nativo',
                  ikuEquivalent: 'Duna gwasékwa',
                  meaning: 'Establecer conexiones pedagógicas y de respeto mutuo entre la lengua materna Iku y el español.',
                  context: 'No es una obra física de cemento; es el apoyo didáctico que evita el rezago en clase.',
                })
              }
              className="text-amber-400 font-bold underline decoration-amber-500/50 hover:bg-amber-950/40 px-1 rounded cursor-pointer"
            >
              tender puentes hacia el idioma nativo
            </button>
            , muchos jóvenes experimentan{' '}
            <button
              onClick={() =>
                setActiveTooltip({
                  term: 'Inseguridad comunicativa (Filtro afectivo)',
                  ikuEquivalent: 'Guna kachi',
                  meaning: 'Sensación de timidez o temor a equivocarse al hablar o leer frente al docente y compañeros.',
                  context: 'El 60% de los estudiantes manifestó callar por temor a la pronunciación; por eso el trabajo en parejas es vital.',
                })
              }
              className="text-amber-400 font-bold underline decoration-amber-500/50 hover:bg-amber-950/40 px-1 rounded cursor-pointer"
            >
              inseguridad comunicativa
            </button>{' '}
            y reducen su intervención en clase.
          </p>

          <p>
            <button
              onClick={() =>
                setActiveTooltip({
                  term: 'Sin embargo (Conector adversativo)',
                  ikuEquivalent: 'Kwin',
                  meaning: 'Conector que introduce un contraste o alternativa frente a una dificultad planteada.',
                  context: 'Se usa con punto y coma antes y coma después: "; sin embargo,".',
                })
              }
              className="text-amber-400 font-bold underline decoration-amber-500/50 hover:bg-amber-950/40 px-1 rounded cursor-pointer"
            >
              Sin embargo
            </button>
            , la mediación didáctica que incorpora recursos digitales contextualizados permite relacionar las narrativas
            de origen con los conceptos científicos contemporáneos, demostrando que aprender una segunda lengua no
            implica olvidar las raíces ancestrales.
          </p>
        </div>

        {/* Dynamic Tooltip Card */}
        {activeTooltip && (
          <div className="mt-4 p-4 rounded-xl bg-amber-950/50 border border-amber-600/40 text-stone-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-200 text-sm">{activeTooltip.term}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  En Iku: {activeTooltip.ikuEquivalent}
                </span>
              </div>
              <button
                onClick={() => setActiveTooltip(null)}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
            <p className="text-xs text-stone-300 mb-1">{activeTooltip.meaning}</p>
            <p className="text-[11px] text-amber-300/80 italic">Contexto: {activeTooltip.context}</p>
          </div>
        )}
      </div>

      {/* Part 2: Inferential Questions (Solving 40% diagnostic bottleneck) */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            Taller de Pistas: Leer Entre Líneas (Comprensión Inferencial)
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Responde los siguientes retos para verificar tu comprensión profunda del texto. Cada respuesta correcta
            incluye retroalimentación pedagógica inmediata.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {inferentialQuestions.map((q) => {
            const userChoice = selectedAnswers[q.id];
            const isChecked = checkedResults[q.id] !== undefined;
            const isCorrect = checkedResults[q.id] === true;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border transition ${
                  isChecked
                    ? isCorrect
                      ? 'bg-emerald-950/30 border-emerald-700/50'
                      : 'bg-rose-950/30 border-rose-700/50'
                    : 'bg-stone-950/80 border-stone-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-semibold text-sm text-stone-100">{q.question}</h4>
                  {isChecked && (
                    <span className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </div>

                <div className="text-xs text-amber-300/80 mb-3 bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-800/30">
                  💡 <strong>Pista de apoyo en Iku:</strong> {q.ikuClue}
                </div>

                <div className="space-y-2 mb-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt.letter}
                      onClick={() => handleSelectAnswer(q.id, opt.letter)}
                      className={`w-full text-left p-3 rounded-lg text-xs transition flex items-center justify-between cursor-pointer ${
                        userChoice === opt.letter
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                          : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                      }`}
                    >
                      <span>
                        <strong className="mr-2">{opt.letter})</strong>
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleCheckQuestion(q)}
                    disabled={!userChoice}
                    className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Verificar Respuesta
                  </button>

                  {isChecked && (
                    <span className="text-xs text-stone-300 italic max-w-lg text-right">
                      {q.explanation}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Pair Oral Reflection Recorder (30s) */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Mic className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-amber-200 font-serif">
            Mensaje de Voz en Pareja (30 segundos): Círculo de Oralidad
          </h3>
        </div>
        <p className="text-xs text-stone-300 mb-4 leading-relaxed">
          Siguiendo la metodología de aula del tutor bilingüe (CA2.1), comparte con tu compañero de puesto
          qué enseñanza te dejó la lectura y graben una breve nota de voz para perder la timidez al hablar en voz alta.
        </p>

        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleRecord}
              className={`p-4 rounded-full transition flex items-center justify-center cursor-pointer shadow-lg ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
              }`}
            >
              {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <div>
              <div className="text-sm font-bold text-stone-200">
                {isRecording ? `Grabando reflexión... ${recordTimer}s / 30s` : 'Grabar Mensaje en Pareja'}
              </div>
              <div className="text-xs text-stone-400">
                {isRecording ? 'Hablen con confianza en Iku o español' : 'Pulsa para iniciar la grabación oral'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePlaySample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>Escuchar Ejemplo de Compañeros</span>
            </button>

            {recordedAudioUrl && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Reflexión Guardada Localmente
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Advance button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onGoToNextSession}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition cursor-pointer"
        >
          <span>Continuar a Sesión 3: Tejiendo Palabras</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
