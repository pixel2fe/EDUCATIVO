import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, BarChart3, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/curriculumData';

export const ResearchHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'interactive_test' | 'stats_results' | 'thesis_document'>('interactive_test');

  // Test simulator state
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submittedTest, setSubmittedTest] = useState(false);

  const handleSelectOption = (questionId: number, letter: string) => {
    if (submittedTest) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const calculateScore = () => {
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      const correctOption = q.options.find((opt) => opt.isCorrect)?.letter;
      if (userAnswers[q.id] === correctOption) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetTest = () => {
    setUserAnswers({});
    setSubmittedTest(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              MARCO CIENTÍFICO Y DIAGNÓSTICO
            </span>
            <span className="text-xs text-stone-400">Tesis de Maestría en TIC para la Educación (UDI, 2026)</span>
          </div>
          <a
            href="/assets/aistudio/DOCUMENTO_e5e87348.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Tesis Completa (PDF 190 págs.)</span>
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Fundamentación de la Investigación & Instrumentos Diagnósticos
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Estrategia pedagógica mediada por TIC desde un enfoque diferencial para el fortalecimiento del español
          como segunda lengua, usando el Iku como andamiaje etnocultural en estudiantes de 8º y 9º de la I.E. Minas de Iracal
          (Pueblo Bello, Cesar).
        </p>

        {/* Sub-tab Navigation */}
        <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-amber-950">
          <button
            onClick={() => setActiveSubTab('interactive_test')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'interactive_test'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Simulador de Prueba Diagnóstica (Pretest / Postest)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('stats_results')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'stats_results'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Estadísticas & Resultados Empíricos (SPSS / Atlas.ti)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('thesis_document')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'thesis_document'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documento Oficial de Grado (Visor & Ficha)</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Interactive Test Simulator */}
      {activeSubTab === 'interactive_test' && (
        <div className="space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-amber-200 font-serif">
                Prueba Diagnóstica Estandarizada de Rendimiento en Español L2
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Instrumento de 20 preguntas aplicado a la muestra de 15 estudiantes de 8° y 9°. Valorado sobre 20 puntos
                (convertible a escala de 1.0 a 5.0).
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {submittedTest ? (
                <button
                  onClick={handleResetTest}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Reiniciar Prueba
                </button>
              ) : (
                <button
                  onClick={() => setSubmittedTest(true)}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Calificar y Ver Justificaciones
                </button>
              )}
            </div>
          </div>

          {/* Test Results Summary Header */}
          {submittedTest && (
            <div className="bg-stone-950 border-2 border-emerald-500/60 rounded-2xl p-6 text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Resultado Obtenido en la Simulación
              </div>
              <div className="text-4xl font-bold font-serif text-white">
                {calculateScore()} / {DIAGNOSTIC_QUESTIONS.length}{' '}
                <span className="text-sm font-sans text-stone-400">
                  (Nota: {((calculateScore() / DIAGNOSTIC_QUESTIONS.length) * 4 + 1).toFixed(2)} sobre 5.0)
                </span>
              </div>
              <p className="text-xs text-stone-300 max-w-xl mx-auto">
                Promedio de entrada (pretest) en el colegio: <strong>12.37 / 20 (nota 3.47)</strong>.
                Revisa a continuación cada ítem con la justificación pedagógica y lingüística formulada en la tesis.
              </p>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-6">
            {DIAGNOSTIC_QUESTIONS.map((q) => {
              const selected = userAnswers[q.id];
              const correctOpt = q.options.find((opt) => opt.isCorrect)?.letter;
              const isCorrect = selected === correctOpt;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition ${
                    submittedTest
                      ? isCorrect
                        ? 'bg-emerald-950/20 border-emerald-800/60'
                        : 'bg-rose-950/20 border-rose-800/60'
                      : 'bg-stone-900/90 border-stone-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                      {q.module}
                    </span>
                    <span className="text-xs font-mono text-stone-400">Ítem {q.id} de 20</span>
                  </div>

                  {q.context && (
                    <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80 text-xs text-stone-300 italic mb-3">
                      {q.context}
                    </div>
                  )}

                  <h4 className="font-semibold text-sm text-stone-100 mb-4">{q.question}</h4>

                  <div className="space-y-2 mb-4">
                    {q.options.map((opt) => {
                      const isOptionSelected = selected === opt.letter;
                      let btnStyle = 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500';

                      if (submittedTest) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-100 font-bold';
                        } else if (isOptionSelected && !opt.isCorrect) {
                          btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 line-through';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-amber-500 text-stone-950 font-bold border-amber-400';
                      }

                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleSelectOption(q.id, opt.letter)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>
                            <strong className="mr-2 font-mono">[{opt.letter}]</strong>
                            {opt.text}
                          </span>
                          {submittedTest && opt.isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Justification & Pedagogical Clue */}
                  {submittedTest && (
                    <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-1">
                      <div className="font-bold text-amber-300">Justificación pedagógica y lingüística:</div>
                      <p>
                        {q.options.find((opt) => opt.isCorrect)?.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Statistical Results and SPSS / Atlas.ti Insights */}
      {activeSubTab === 'stats_results' && (
        <div className="space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-amber-200 font-serif mb-2">
              Hallazgos Empíricos del Estudio (Capítulo 4 de la Tesis)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              El estudio adoptó un diseño cuasiexperimental de tipo preexperimental con preprueba, postprueba y un solo grupo
              intacto (n=15), articulado a un alcance descriptivo y evaluativo dentro de una matriz metodológica mixta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center">
                <div className="text-2xl font-bold text-amber-400">80.0%</div>
                <div className="text-xs text-stone-300 font-semibold mt-1">Población Indígena</div>
                <div className="text-[11px] text-stone-400">Arhuacos (Iku), Kankuamos y Koguis</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center">
                <div className="text-2xl font-bold text-emerald-400">r = 0.84</div>
                <div className="text-xs text-stone-300 font-semibold mt-1">Correlación Pearson</div>
                <div className="text-[11px] text-stone-400">El Iku explica el 71.2% de la competencia global (p = 0.0001)</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center">
                <div className="text-2xl font-bold text-sky-400">93.3%</div>
                <div className="text-xs text-stone-300 font-semibold mt-1">Acceso Celular Móvil</div>
                <div className="text-[11px] text-stone-400">0% computadores en hogares rurales</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center">
                <div className="text-2xl font-bold text-amber-300">α = 0.78</div>
                <div className="text-xs text-stone-300 font-semibold mt-1">Alfa de Cronbach</div>
                <div className="text-[11px] text-stone-400">Alta confiabilidad métrica de los instrumentos</div>
              </div>
            </div>

            {/* Triangulation Summary */}
            <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-amber-200">
                Triangulación Cualitativa (Atlas.ti) y Cuantitativa (SPSS v.24)
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                El cruce entre los diarios de campo, las entrevistas semiestructuradas a docentes (D1 y D2) y los puntajes de
                las pruebas estandarizadas demostró que el rezago en producción escrita (nota inicial de 2.64/5.0 en el pretest)
                no es una carencia intelectual de los jóvenes arhuacos, sino la consecuencia del filtro afectivo y la falta de
                materiales bilingües contextualizados. Al introducir el software eXeLearning en modalidad offline con relatos
                del territorio y plantillas paso a paso, los educandos ganaron seguridad discursiva y aprendieron a coordinar
                oraciones con punto y coma (;) y conectores formales.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Thesis Document Viewer & Metadata */}
      {activeSubTab === 'thesis_document' && (
        <div className="space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-amber-200 font-serif">
                  Documento Completo de Grado: Maestría en TIC para la Educación
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  190 páginas con antecedentes, marco teórico, metodología, análisis estadístico y anexos.
                </p>
              </div>

              <a
                href="/assets/aistudio/DOCUMENTO_e5e87348.pdf"
                download="Tesis_Estrategia_Pedagogica_Iku_Espanol.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Archivo PDF Directo</span>
              </a>
            </div>

            {/* Embedded PDF iframe */}
            <div className="w-full h-[600px] rounded-xl overflow-hidden border border-stone-700 bg-stone-950">
              <iframe
                src="/assets/aistudio/DOCUMENTO_e5e87348.pdf#toolbar=1"
                title="Tesis Maestría en TIC para la Educación"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
