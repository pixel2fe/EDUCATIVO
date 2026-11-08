import React, { useState } from 'react';
import { Award, CheckSquare, Sparkles, Send, Download, BookOpen, User, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WRITING_SCAFFOLD_STEPS, GLOSSARY_WORDS } from '../data/curriculumData';

interface SessionFourProps {
  onUnlockBadge: (badgeId: string) => void;
  isBadgeUnlocked: boolean;
  onPublishStory: (newStory: {
    title: string;
    author: string;
    grade: string;
    ethnicity: string;
    community: string;
    content: string;
    ikuWords: string[];
  }) => void;
  onConsultAi: (studentText: string) => void;
}

export const SessionFour: React.FC<SessionFourProps> = ({
  onUnlockBadge,
  isBadgeUnlocked,
  onPublishStory,
  onConsultAi,
}) => {
  // Author info
  const [authorName, setAuthorName] = useState('');
  const [authorGrade, setAuthorGrade] = useState('8° Grado');
  const [ethnicity, setEthnicity] = useState('Pueblo Indígena Arhuaco (Iku)');
  const [community, setCommunity] = useState('Minas de Iracal (Sierra Nevada)');
  const [essayTitle, setEssayTitle] = useState('Puente entre el Iku y el Español');

  // 3-step text boxes
  const [step1Text, setStep1Text] = useState(
    'En nuestra institución educativa Minas de Iracal es fundamental aprender español sin olvidar nuestra lengua materna Iku, porque el castellano nos brinda herramientas para dialogar con el país;'
  );
  const [step2Text, setStep2Text] = useState(
    'Por ejemplo, en la siembra comunitaria de café y plátano, los mayores nos enseñan el respeto por las aguas sagradas de la Sierra. Cuando bajamos al mercado de Pueblo Bello usamos el español con respeto y claridad,'
  );
  const [step3Text, setStep3Text] = useState(
    'el español nos permite estudiar y defender nuestros derechos bioculturales; sin embargo, en la lengua Iku vive la memoria de nuestros Mamos y el equilibrio del territorio.'
  );

  // Self-assessment checklist
  const [checkCoherence, setCheckCoherence] = useState(false);
  const [checkCohesion, setCheckCohesion] = useState(false);
  const [checkOrthography, setCheckOrthography] = useState(false);

  // Status
  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const fullComposedText = `${step1Text.trim()} ${step2Text.trim()} ${step3Text.trim()}`.trim();

  const handleApplySuggestion = (stepId: number, text: string) => {
    if (stepId === 1) setStep1Text(text);
    if (stepId === 2) setStep2Text(text);
    if (stepId === 3) setStep3Text(text);
  };

  const handleInsertWord = (ikuWord: string, spanishWord: string) => {
    setStep2Text((prev) => `${prev} ${spanishWord} (${ikuWord})`);
  };

  const handlePublish = () => {
    if (!authorName.trim()) {
      alert('Por favor escribe tu nombre como autor del texto.');
      return;
    }

    if (!checkCoherence || !checkCohesion || !checkOrthography) {
      alert('Marca las 3 casillas de la lista de chequeo de autoevaluación para certificar la revisión de tu escrito.');
      return;
    }

    onPublishStory({
      title: essayTitle.trim() || 'Escrito Intercultural Bilingüe',
      author: authorName.trim(),
      grade: authorGrade,
      ethnicity,
      community,
      content: fullComposedText,
      ikuWords: ['Zanawina', 'Seynekun', 'Mamo', 'Andamiaje'],
    });

    setPublishedSuccess(true);
    setShowCertificate(true);

    if (!isBadgeUnlocked) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      onUnlockBadge('badge-4');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Session Title Header Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SESIÓN 4 DE 4
            </span>
            <span className="text-xs text-stone-400">Duración: 2 Horas (120 min) · Andamiaje de Producción</span>
          </div>

          {isBadgeUnlocked ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-pulse">
              <Award className="w-4 h-4 text-emerald-400" />
              Insignia Desbloqueada: Autor Bilingüe de la Sierra
            </div>
          ) : (
            <div className="text-xs text-amber-300/80 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              🎯 Reto: Redacta y publica tu escrito de 8 a 12 líneas para obtener el diploma
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Nuestra Palabra Escrita: Redactamos sobre nuestra lengua y nuestro territorio
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Supera el bloqueo de la hoja en blanco con la plantilla de 3 bloques guiados. Conecta tu postura inicial,
          tu vivencia en la comunidad y cierra con punto y coma (;) y un conector adversativo o consecutivo.
        </p>
      </div>

      {/* Author and Metadata Bar */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-md">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Datos del Autor / Estudiante para Publicación y Diploma</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] text-stone-400 block mb-1">Nombre completo:</label>
            <input
              type="text"
              placeholder="Ej. Dwia Villafaña"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="text-[11px] text-stone-400 block mb-1">Grado escolar:</label>
            <select
              value={authorGrade}
              onChange={(e) => setAuthorGrade(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="8° Grado">8° Grado (Octavo)</option>
              <option value="9° Grado">9° Grado (Noveno)</option>
              <option value="Docente / Comunidad">Docente / Líder Comunitario</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-stone-400 block mb-1">Pueblo / Filiación:</label>
            <input
              type="text"
              value={ethnicity}
              onChange={(e) => setEthnicity(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="text-[11px] text-stone-400 block mb-1">Comunidad o Vereda:</label>
            <input
              type="text"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="text-[11px] text-stone-400 block mb-1">Título de tu escrito:</label>
          <input
            type="text"
            value={essayTitle}
            onChange={(e) => setEssayTitle(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs font-semibold text-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Main 3-Box Guided Scaffold */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Box 1: Idea Principal (Azul) */}
          <div className="bg-stone-900 border-2 border-sky-600/70 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <h4 className="font-bold text-sky-200 text-sm">Bloque 1: Mi Idea Principal (Líneas 1 a 3)</h4>
              </div>
              <span className="text-[11px] text-sky-400 font-mono">Borde Azul</span>
            </div>
            <p className="text-xs text-stone-400 mb-2">
              Explica por qué es importante que la escuela enseñe en castellano sin dejar de usar la lengua Iku.
            </p>

            <textarea
              rows={3}
              value={step1Text}
              onChange={(e) => setStep1Text(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-sky-400 leading-relaxed font-sans"
            />

            <div className="mt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-400 font-semibold">Inicios sugeridos:</span>
              {WRITING_SCAFFOLD_STEPS[0].suggestions.slice(0, 2).map((sug: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleApplySuggestion(1, sug)}
                  className="text-[10px] px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-sky-300 border border-stone-700 cursor-pointer"
                >
                  Usar opción {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Box 2: Vivencia Comunitaria (Verde) */}
          <div className="bg-stone-900 border-2 border-emerald-600/70 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                  2
                </span>
                <h4 className="font-bold text-emerald-200 text-sm">Bloque 2: Mi Vivencia en la Sierra (Líneas 4 a 7)</h4>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">Borde Verde</span>
            </div>
            <p className="text-xs text-stone-400 mb-2">
              Relata un ejemplo real vivido con tu familia en el resguardo, la chagra de café o en Pueblo Bello.
            </p>

            <textarea
              rows={4}
              value={step2Text}
              onChange={(e) => setStep2Text(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-400 leading-relaxed font-sans"
            />

            <div className="mt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-400 font-semibold">Ejemplos territoriales:</span>
              {WRITING_SCAFFOLD_STEPS[1].suggestions.slice(0, 2).map((sug: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleApplySuggestion(2, sug)}
                  className="text-[10px] px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-stone-700 cursor-pointer"
                >
                  Usar vivencia {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Box 3: Conclusión con Punto y Coma (Naranja) */}
          <div className="bg-stone-900 border-2 border-amber-600/70 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <h4 className="font-bold text-amber-200 text-sm">Bloque 3: Mi Conclusión con Punto y Coma (Líneas 8 a 10)</h4>
              </div>
              <span className="text-[11px] text-amber-400 font-mono">Borde Naranja</span>
            </div>
            <p className="text-xs text-stone-400 mb-2">
              Une tus reflexiones finales usando punto y coma (;) seguido de un conector como «sin embargo,» o «por lo tanto,».
            </p>

            <textarea
              rows={3}
              value={step3Text}
              onChange={(e) => setStep3Text(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed font-sans"
            />

            <div className="mt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-400 font-semibold">Cierres con punto y coma:</span>
              {WRITING_SCAFFOLD_STEPS[2].suggestions.slice(0, 2).map((sug: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleApplySuggestion(3, sug)}
                  className="text-[10px] px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 cursor-pointer"
                >
                  Usar cierre {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel: Vocabulary & Connector Dock */}
        <div className="space-y-4">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-md">
            <h4 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Banco de Vocabulario Ancestral
            </h4>
            <p className="text-[11px] text-stone-400 mb-3">
              Haz clic para insertar términos del glosario en tu vivencia:
            </p>

            <div className="space-y-2">
              {GLOSSARY_WORDS.slice(0, 6).map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleInsertWord(word.ikuTerm, word.spanishTerm)}
                  className="w-full text-left p-2 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-xs transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-amber-300">{word.spanishTerm}</span>
                    <span className="text-[10px] text-stone-400 block">{word.ikuTerm}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">+ Insertar</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Pedagogical Mentor Integration Button */}
          <div className="bg-gradient-to-br from-amber-950/60 to-stone-900 border border-amber-800/40 rounded-2xl p-5 shadow-md">
            <h4 className="text-sm font-bold text-amber-200 mb-2 flex items-center gap-1.5">
              <span>🧠</span>
              Consultar al Sabedor IA (Argon High Thinking)
            </h4>
            <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
              ¿Deseas que el Sabedor Virtual analice tu borrador con pensamiento profundo y te dé consejos de
              cohesión, puntuación y respeto etnocultural?
            </p>
            <button
              onClick={() => onConsultAi(fullComposedText)}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
            >
              Analizar mi Escrito con el Sabedor
            </button>
          </div>
        </div>
      </div>

      {/* Full Integrated Preview */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
        <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-2">
          Vista Previa Completa del Escrito (8 a 12 líneas integradas)
        </h4>
        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 font-serif text-sm text-stone-100 leading-relaxed italic">
          "{fullComposedText}"
        </div>
      </div>

      {/* Self-Assessment Rubric (Semáforo de 3 Preguntas) */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
        <h4 className="text-base font-bold text-amber-200 font-serif mb-2 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-amber-400" />
          Autoevaluación con Semáforo de 3 Preguntas (Rúbrica Módulo V)
        </h4>
        <p className="text-xs text-stone-400 mb-4">
          Marca cada casilla para certificar que tu escrito cumple los estándares antes de enviarlo al libro digital:
        </p>

        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:bg-stone-900 transition">
            <input
              type="checkbox"
              checked={checkCoherence}
              onChange={(e) => setCheckCoherence(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
            />
            <div className="text-xs text-stone-200">
              <strong className="text-sky-300 block mb-0.5">1. Coherencia y Adecuación al Tema (Ítem 18):</strong>
              ¿Expliqué con claridad por qué son importantes el español y el Iku con un ejemplo real de mi vida en la comunidad?
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:bg-stone-900 transition">
            <input
              type="checkbox"
              checked={checkCohesion}
              onChange={(e) => setCheckCohesion(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
            />
            <div className="text-xs text-stone-200">
              <strong className="text-emerald-300 block mb-0.5">2. Cohesión Sintáctica y Puntuación Interna (Ítem 19):</strong>
              ¿Usé comas (,), punto y coma (;) y conectores lógicos como «porque», «por lo tanto» o «sin embargo»?
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:bg-stone-900 transition">
            <input
              type="checkbox"
              checked={checkOrthography}
              onChange={(e) => setCheckOrthography(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
            />
            <div className="text-xs text-stone-200">
              <strong className="text-amber-300 block mb-0.5">3. Riqueza Léxica y Ortografía Funcional (Ítem 20):</strong>
              ¿Revisé que no hubiera abreviaturas de chat como «pq» y que palabras como «países» y «lengua» estuvieran bien escritas?
            </div>
          </label>
        </div>

        {/* Action Buttons: Publish for Free and Generate Diploma */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-800">
          <div className="text-xs text-stone-400">
            Publicación 100% gratuita y libre de costo para la comunidad educativa.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Publicar en Libro Digital & Recibir Diploma</span>
            </button>
          </div>
        </div>
      </div>

      {/* Diploma and Congratulations Modal / Card */}
      {showCertificate && (
        <div className="bg-gradient-to-br from-amber-950/80 via-stone-900 to-emerald-950/80 border-2 border-amber-500/80 rounded-2xl p-8 shadow-2xl text-center space-y-4">
          <span className="text-4xl">📜</span>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            INSTITUCIÓN EDUCATIVA MINAS DE IRACAL · PUEBLO BELLO, CESAR
          </div>
          <h3 className="text-2xl font-bold font-serif text-amber-100">
            DIPLOMA DE RECONOCIMIENTO PEDAGÓGICO
          </h3>
          <p className="text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
            Se otorga la distinción de <strong className="text-amber-300">«Autor Bilingüe de la Sierra: Nivel 4»</strong> a:
          </p>
          <div className="text-2xl font-bold text-emerald-300 font-serif underline decoration-amber-400">
            {authorName || 'Estudiante de Minas de Iracal'}
          </div>
          <p className="text-xs text-stone-300 max-w-lg mx-auto">
            Por culminar con éxito la secuencia didáctica bilingüe, fortaleciendo la argumentación escrita en castellano
            y enalteciendo la sabiduría de la lengua materna Iku en el territorio sagrado.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Imprimir / Guardar Diploma en PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
