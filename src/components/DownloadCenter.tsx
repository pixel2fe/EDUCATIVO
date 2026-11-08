import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Printer, RefreshCw, FolderArchive, Layers } from 'lucide-react';
import { generateOfflinePackage } from '../utils/exportZip';
import { GLOSSARY_WORDS } from '../data/curriculumData';

export const DownloadCenter: React.FC = () => {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadedZipSuccess, setDownloadedZipSuccess] = useState(false);

  const handleDownloadOfflineZip = async () => {
    try {
      setDownloadingZip(true);
      const zipBlob = await generateOfflinePackage();
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Puentes_de_la_Sierra_RED_Offline_Minas_de_Iracal.zip';
      link.click();
      URL.revokeObjectURL(url);
      setDownloadedZipSuccess(true);
      setTimeout(() => setDownloadedZipSuccess(false), 6000);
    } catch (err) {
      console.error('Error generating offline package:', err);
      alert('Error generando el paquete offline. Por favor intenta de nuevo.');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadGlossaryJson = () => {
    const jsonBlob = new Blob([JSON.stringify(GLOSSARY_WORDS, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Glosario_Bilingue_Iku_Castellano.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDidacticSequenceTxt = () => {
    const content = `SECUENCIA DIDÁCTICA BILINGÜE: PUENTES DE LA SIERRA
INSTITUCIÓN EDUCATIVA MINAS DE IRACAL - PUEBLO BELLO, CESAR
GRADOS: 8° Y 9° DE BÁSICA SECUNDARIA
ENFOQUE: DIFERENCIAL, ETNOEDUCATIVO E INTERCULTURAL
AUTORES: YURI ANGELICA CARVAJAL, JOSÉ IGNACIO ZAPATA, GLORIA EDICELY JARAMILLO (UDI, 2026)

========================================================================
SESIÓN 1: VOCES DE LA SIERRA (VOCABULARIO BILINGÜE Y NAVEGACIÓN SIN INTERNET)
========================================================================
- Objetivo: Manejar de forma autónoma los botones del recurso en eXeLearning sin conexión a internet y asociar palabras clave en lengua Iku con sus equivalentes formales en castellano.
- Duración: 2 Horas (120 min)
- Estándar MEN: Comprendo e interpreto textos teniendo en cuenta el funcionamiento de la lengua en situaciones de comunicación.
- DBA: 3 y 6 de Lenguaje.
- Actividades: Saludo en círculo de la palabra, exploración del glosario sonoro, juego de emparejamiento con retroalimentación inmediata, ejercicio con conector temporal "antes de".

========================================================================
SESIÓN 2: LEYENDAS DEL TERRITORIO (LECTURA COMPRENSIVA E INFERENCIAL)
========================================================================
- Objetivo: Comprender ideas principales, causas implícitas y frases figuradas en textos cortos sobre la tradición oral arhuaca, usando pistas en lengua Iku como puente de apoyo.
- Duración: 2 Horas (120 min)
- Estándar MEN: Elaboro hipótesis de lectura acerca de las relaciones entre los elementos constitutivos de un texto literario y el contexto.
- DBA: 4 y 6 de Lenguaje.
- Actividades: Lectura compartida en voz alta de "El canto del río y la palabra del Mamo", ventanas emergentes con pistas en Iku (andamiaje de recepción), taller de 6 preguntas inferenciales, grabación de mensaje de voz oral de 30 segundos en parejas.

========================================================================
SESIÓN 3: TEJIENDO PALABRAS (CONECTORES, CONCORDANCIA Y PUNTUACIÓN)
========================================================================
- Objetivo: Utilizar de manera adecuada la concordancia de género y número, los conectores lógicos (por lo tanto, sin embargo, porque) y los signos de puntuación (la coma y el punto y coma) al armar oraciones en español.
- Duración: 2 Horas (120 min)
- Estándar MEN: Produzco textos escritos que evidencian el conocimiento que he alcanzado acerca del funcionamiento de la lengua en situaciones de comunicación.
- DBA: 7 y 8 de Lenguaje.
- Actividades: Sistema de semáforo por colores (Verde: Sujeto, Azul: Conectores, Rojo: Coma y punto y coma), identificación del sujeto agente directo, corrección de discordancias gramaticales, puente de conectores y limpieza de abreviaturas informales de celular.

========================================================================
SESIÓN 4: NUESTRA PALABRA ESCRITA (REDACCIÓN GUIADA Y DIÁLOGO DE SABERES)
========================================================================
- Objetivo: Producir un texto argumentativo corto (de 8 a 12 líneas) en español formal que explique la importancia de aprender castellano sin dejar de hablar la lengua Iku, integrando una vivencia propia, conectores lógicos y signos de puntuación.
- Duración: 2 Horas (120 min)
- Estándar MEN: Caracterizo y utilizo estrategias descriptivas, explicativas y analógicas en mi producción de textos orales y escritos.
- DBA: 8 de Lenguaje.
- Actividades: Círculo de la palabra para pensar la idea, plantilla guiada de 3 cajas con bordes de colores (Idea principal, Vivencia comunitaria, Conclusión con punto y coma), autoevaluación con semáforo de 3 preguntas de la rúbrica, publicación en la biblioteca comunitaria y diploma de Autor Bilingüe de la Sierra.
`;
    const textBlob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(textBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Secuencia_Didactica_Docente_Puentes_de_la_Sierra.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title Header Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            DESCARGA 100% LIBRE · CERO ANUNCIOS · CERO RASTREADORES
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Centro de Descargas Gratuitas: Materiales para el Aula Rural
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Todo el contenido de este recurso educativo digital está disponible para su libre descarga y uso sin internet.
          Los docentes y estudiantes de veredas apartadas pueden copiarlo a memorias USB o imprimirlo en papel sin ninguna
          restricción económica.
        </p>

        {downloadedZipSuccess && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>¡Paquete Offline descargado exitosamente! Descomprímelo en una memoria USB y úsalo sin internet.</span>
          </div>
        )}
      </div>

      {/* Main Download Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Paquete Offline Completo (ZIP) */}
        <div className="bg-stone-900/90 border border-amber-700/60 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 border border-amber-500/30">
              <FolderArchive className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-100 font-serif mb-1">
              Paquete Offline Autocontenido (.ZIP)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              Incluye la aplicación web completa en formato HTML/JS/CSS lista para abrir con doble clic desde cualquier
              memoria USB en computadores sin internet. Contiene las 4 sesiones, audios, glosario y juegos interactivos.
            </p>
            <div className="text-[11px] text-amber-300/80 bg-stone-950 p-2.5 rounded-lg border border-stone-800">
              ✓ No requiere instalación de programas adicionales ni conexión de red.
            </div>
          </div>

          <button
            onClick={handleDownloadOfflineZip}
            disabled={downloadingZip}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            {downloadingZip ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Empaquetando Archivos Offline...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar Paquete Offline (.ZIP)</span>
              </>
            )}
          </button>
        </div>

        {/* Card 2: Documento Oficial de Grado (PDF Tesis) */}
        <div className="bg-stone-900/90 border border-emerald-700/60 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-100 font-serif mb-1">
              Documento de Tesis de Maestría (PDF Oficial)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              Documento completo de 190 páginas con la justificación etnoeducativa, modelo TPACK, marco normativo
              (Constitución, Ley 115, Decreto 804 y Decreto 1290), análisis estadístico SPSS v.24 y matriz hermenéutica Atlas.ti.
            </p>
            <div className="text-[11px] text-emerald-300/80 bg-stone-950 p-2.5 rounded-lg border border-stone-800">
              ✓ Documento académico aprobado por la Universidad de Investigación y Desarrollo (UDI, 2026).
            </div>
          </div>

          <a
            href="/assets/aistudio/DOCUMENTO_e5e87348.pdf"
            download="Tesis_Maestria_Estrategia_Pedagogica_Iku_Espanol.pdf"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Tesis en PDF (190 Págs.)</span>
          </a>
        </div>

        {/* Card 3: Planeador y Secuencia Didáctica para Docentes */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 border border-sky-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-100 font-serif mb-1">
              Planeador de Secuencia Didáctica (Docente)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              Guía paso a paso con los estándares de lenguaje del MEN, los Derechos Básicos de Aprendizaje (DBA 3, 4, 6, 7 y 8)
              y la articulación de los saberes arhuacos de la Ley de Origen para las 4 sesiones de clase.
            </p>
          </div>

          <button
            onClick={handleDownloadDidacticSequenceTxt}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Guía Docente (.TXT)</span>
          </button>
        </div>

        {/* Card 4: Glosario Bilingüe Estructurado */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 border border-amber-500/30">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-100 font-serif mb-1">
              Glosario y Banco Léxico Iku - Castellano
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              Base de datos en formato JSON de los 10 términos clave del territorio con su pronunciación fonética,
              equivalente formal en español, categoría gramatical y ejemplos oracionales situados.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownloadGlossaryJson}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Glosario (.JSON)</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs shadow-md transition cursor-pointer"
              title="Imprimir versión en papel"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
