import JSZip from 'jszip';
import { GLOSSARY_WORDS, DIAGNOSTIC_QUESTIONS } from '../data/curriculumData';

export async function generateOfflinePackage(): Promise<Blob> {
  const zip = new JSZip();

  // 1. Readme with instructions for rural schools and teachers
  const readmeContent = `====================================================================
PUENTES DE LA SIERRA: LEO Y ESCRIBO EN ESPAÑOL CON APOYO DE MI LENGUA IKU
RECURSO EDUCATIVO DIGITAL (RED) - MODALIDAD AUTÓNOMA Y OFFLINE
====================================================================

Institución Educativa Minas de Iracal - Pueblo Bello, Cesar, Colombia
Dirigido a: Grados 8° y 9° de Educación Básica Secundaria
Enfoque: Diferencial, Etnoeducativo e Intercultural
Acceso: 100% Gratuito - Publicación Libre - Sin Publicidad

INSTRUCCIONES DE USO EN ZONAS SIN INTERNET:
1. Copie esta carpeta completa en una memoria USB.
2. Inserte la memoria USB en cualquier computador o portátil de la institución (no requiere internet ni datos móviles).
3. Abra el archivo "index.html" con cualquier navegador web (Chrome, Edge, Firefox, Brave).
4. El recurso cargará todas las actividades, lecturas, glosarios y juegos de forma 100% local y autónoma.

CONTENIDO DEL PAQUETE:
- index.html: Plataforma web interactiva autocontenida
- Glosario_Bilingue.json: Diccionario léxico y contextual Iku - Español
- Secuencia_Didactica_Docente.txt: Planeador de las 4 sesiones de clase con alineación a DBA de Lenguaje
- Cartilla_Imprimible.html: Cuaderno de trabajo y guía para imprimir en papel

Propuesta desarrollada por:
- Lic. Yuri Angelica Carvajal Lopez (Ciencias Naturales y Educación Ambiental)
- Lic. José Ignacio Zapata Osorio (Matemáticas y Computación)
- Lic. Gloria Edicely Jaramillo Arango (Humanidades y Lengua Castellana)
Maestría en TIC para la Educación - UDI Bucaramanga, 2026.
`;

  zip.file('LEEME_INSTRUCCIONES_USO_RURAL.txt', readmeContent);

  // 2. Standalone HTML app
  const offlineHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Puentes de la Sierra - RED Offline</title>
  <style>
    :root {
      --primary: #065f46;
      --secondary: #92400e;
      --accent: #d97706;
      --bg: #fbf9f5;
      --card: #ffffff;
      --text: #1f2937;
    }
    body {
      font-family: Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(135deg, #065f46, #047857);
      color: white;
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .badge {
      display: inline-block;
      background: #fbbf24;
      color: #78350f;
      padding: 4px 12px;
      border-radius: 999px;
      font-weight: bold;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .card {
      background: var(--card);
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 18px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .card h3 {
      color: var(--primary);
      margin-top: 0;
    }
    .iku-term {
      color: #b45309;
      font-weight: bold;
      font-size: 1.1em;
    }
    .btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
    }
    .btn:hover {
      background: #047857;
    }
    .interactive-box {
      background: #ecfdf5;
      border-left: 4px solid #059669;
      padding: 14px;
      margin: 14px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <span class="badge">PAQUETE OFFLINE 100% LIBRE Y SIN ANUNCIOS</span>
    <h1>Puentes de la Sierra: Leo y Escribo con Apoyo del Iku</h1>
    <p>Institución Educativa Minas de Iracal · Pueblo Bello, Cesar · Grados 8° y 9°</p>
  </div>

  <h2>Glosario Intercultural del Territorio</h2>
  <div class="grid">
    ${GLOSSARY_WORDS.map(
      (w) => `
      <div class="card">
        <div class="iku-term">${w.ikuTerm} <small>(${w.phonetic})</small></div>
        <h3>${w.spanishTerm}</h3>
        <p><strong>Definición:</strong> ${w.definition}</p>
        <p><strong>En el Territorio:</strong> ${w.territoryContext}</p>
        <div class="interactive-box">
          <em>Ejemplo: "${w.exampleSentence}"</em>
        </div>
      </div>
    `
    ).join('')}
  </div>

  <h2>Sesión 2: Relato Ancestral - El canto del río y la palabra del Mamo</h2>
  <div class="card" style="margin-bottom: 24px;">
    <p>La transmisión del conocimiento entre los pueblos de la Sierra Nevada se apoya principalmente en la palabra hablada y en el ejemplo directo en el campo de cultivo. Cuando la escuela formal exige únicamente el uso del idioma escrito en castellano sin tender puentes hacia el idioma nativo, muchos jóvenes experimentan inseguridad y reducen su intervención en clase. Sin embargo, la mediación didáctica que incorpora recursos digitales contextualizados permite relacionar las narrativas de origen con los conceptos científicos contemporáneos, demostrando que aprender una segunda lengua no implica olvidar las raíces ancestrales.</p>
  </div>

  <h2>Cuestionario y Retos Didácticos</h2>
  <div class="grid">
    ${DIAGNOSTIC_QUESTIONS.slice(0, 4)
      .map(
        (q) => `
      <div class="card">
        <span class="badge">${q.category}</span>
        <p><strong>${q.id}. ${q.question}</strong></p>
        <ul>
          ${q.options.map((opt) => `<li>${opt.letter}) ${opt.text} ${opt.isCorrect ? '✅' : ''}</li>`).join('')}
        </ul>
        <div class="interactive-box">
          <strong>Pista Iku:</strong> ${q.ikuHint || 'Andamiaje etnocultural'}
        </div>
      </div>
    `
      )
      .join('')}
  </div>

  <div class="card" style="text-align: center; background: #fffbeb; border: 1px solid #fde68a;">
    <h3>🌱 Recurso de Acceso Libre para la Comunidad Educativa</h3>
    <p>Este material fue diseñado para garantizar la equidad educativa y el respeto al patrimonio lingüístico del pueblo Arhuaco.</p>
  </div>
</body>
</html>`;

  zip.file('index.html', offlineHtml);

  // 3. Bilingual JSON glossary for direct consumption
  zip.file('Glosario_Bilingue_Iku_Espanol.json', JSON.stringify(GLOSSARY_WORDS, null, 2));

  // 4. Didactic sequence summary
  const sequenceSummary = `PLAN DE LA SECUENCIA DIDÁCTICA BILINGÜE
======================================
Sesión 1: Voces de la Sierra (Vocabulario bilingüe, navegación offline y glosario sonoro)
Sesión 2: Leyendas del territorio (Lectura comprensiva e inferencial con puentes en Iku)
Sesión 3: Tejiendo palabras (Conectores lógicos, concordancia y signos de puntuación)
Sesión 4: Nuestra palabra escrita (Redacción argumentativa guiada en 3 bloques y diálogo de saberes)
`;
  zip.file('Secuencia_Didactica_Docente.txt', sequenceSummary);

  return await zip.generateAsync({ type: 'blob' });
}
