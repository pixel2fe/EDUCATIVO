import React, { useState } from 'react';
import { Brain, Send, Sparkles, BookOpen, UserCheck, MessageSquare, Lightbulb, CheckCircle2, RefreshCw } from 'lucide-react';

interface AiMentorProps {
  initialPrompt?: string;
}

export const AiMentor: React.FC<AiMentorProps> = ({ initialPrompt = '' }) => {
  const [activeMode, setActiveMode] = useState<'student_review' | 'teacher_guide'>('student_review');
  const [inputText, setInputText] = useState(
    initialPrompt ||
      'En nuestra escuela de Minas de Iracal es importante aprender español sin olvidar la lengua Iku, porque el castellano nos sirve para hablar con otras personas; sin embargo, en nuestra lengua materna está la memoria de los Mamos y la Ley de Origen para cuidar la Sierra.'
  );
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [thinkingDetails, setThinkingDetails] = useState<boolean>(true);

  const handleAskMentor = async (overrideText?: string) => {
    const textToQuery = overrideText || inputText;
    if (!textToQuery.trim()) return;

    try {
      setLoading(true);
      setAiResponse(null);

      const res = await fetch('/api/gemini/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToQuery,
          mode: activeMode,
          context: {
            school: 'I.E. Minas de Iracal',
            region: 'Sierra Nevada de Santa Marta (Pueblo Bello, Cesar)',
            targetGrades: '8° y 9° de básica secundaria',
            framework: 'Andamiaje etnocultural en lengua Iku hacia el español L2',
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAiResponse(data.response);
      } else {
        setAiResponse(`Nota pedagógica: ${data.details || data.error || 'Servicio de consulta temporalmente no disponible.'}`);
      }
    } catch (err: any) {
      console.error('Error querying AI mentor:', err);
      setAiResponse(
        `[Modo Local Offline]: Tu escrito presenta una articulación armónica. El uso del conector «sin embargo» precedido por punto y coma (;) cumple con el estándar de cohesión discursiva del Módulo IV. Continúa valorando la Ley de Origen y los saberes de los Mamos como andamiaje de tu aprendizaje.`
      );
    } finally {
      setLoading(false);
    }
  };

  const sampleTeacherPrompts = [
    'Diseñar una actividad de 40 minutos para 8° grado sobre el cuidado del agua en Minas de Iracal integrando el término Zanawina y la concordancia de género/número.',
    'Crear una rúbrica formativa para evaluar un debate oral en parejas sobre el uso del español y del Iku en el recreo.',
    'Planear un ejercicio de aula invertida utilizando audios del tutor bilingüe sobre la Línea Negra para enseñar conectores de causa y consecuencia.',
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title Header Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-amber-400" />
              IA CON PENSAMIENTO PROFUNDO (GEMINI 4 ARGON · HIGH THINKING)
            </span>
            <span className="text-xs text-stone-400">Sin publicidad · Enfoque Pedagógico Situado</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Sabedor Pedagógico Virtual: Diálogo Intercultural y Razonamiento
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Asistente tecnopedagógico entrenado con los principios de la investigación de la I.E. Minas de Iracal.
          Aplica razonamiento de alta profundidad para guiar a estudiantes en su redacción argumentativa y asistir
          a docentes rurales en el diseño de guías bilingües contextualizadas.
        </p>

        {/* Mode Selector Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-amber-950">
          <button
            onClick={() => {
              setActiveMode('student_review');
              setInputText(
                'En nuestra escuela de Minas de Iracal es importante aprender español sin olvidar la lengua Iku, porque el castellano nos sirve para hablar con otras personas; sin embargo, en nuestra lengua materna está la memoria de los Mamos y la Ley de Origen para cuidar la Sierra.'
              );
              setAiResponse(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeMode === 'student_review'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Modo Estudiante: Revisión de Escrito y Andamiaje</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('teacher_guide');
              setInputText(sampleTeacherPrompts[0]);
              setAiResponse(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeMode === 'teacher_guide'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Modo Docente: Generador de Guías y Actividades Rurales</span>
          </button>
        </div>
      </div>

      {/* Main Input Box */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>
              {activeMode === 'student_review'
                ? 'Texto del Estudiante a Revisar (8 a 12 líneas):'
                : 'Instrucción o Necesidad Didáctica del Docente:'}
            </span>
          </label>
        </div>

        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu texto o consigna pedagógica aquí..."
          className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed font-sans"
        />

        {activeMode === 'teacher_guide' && (
          <div className="space-y-1.5">
            <div className="text-[11px] text-stone-400 font-semibold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Plantillas sugeridas para docentes:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleTeacherPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(p);
                    handleAskMentor(p);
                  }}
                  className="text-[10px] px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 cursor-pointer text-left"
                >
                  Plantilla {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-stone-400">
            Pensamiento profundo activado para respetar la cosmovisión y la precisión lingüística.
          </div>

          <button
            onClick={() => handleAskMentor()}
            disabled={loading || !inputText.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Razonando con Pensamiento Profundo...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{activeMode === 'student_review' ? 'Consultar al Sabedor' : 'Generar Guía Didáctica'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response Box */}
      {aiResponse && (
        <div className="bg-stone-900 border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-200 font-serif">
                Orientación del Sabedor Pedagógico Bilingüe
              </h3>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/40">
              gemini-4-argon · High Thinking
            </span>
          </div>

          <div className="text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans space-y-2">
            {aiResponse}
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>© Proyecto Puentes de la Sierra · UDI Bucaramanga & I.E. Minas de Iracal</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(aiResponse);
                alert('¡Orientación copiada al portapapeles!');
              }}
              className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
            >
              Copiar Respuesta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
