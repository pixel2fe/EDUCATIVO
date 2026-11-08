import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI instance on server
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory community publications storage with realistic default entries from students of Minas de Iracal
interface Publication {
  id: string;
  title: string;
  author: string;
  grade: string;
  ethnicity: string;
  community: string;
  content: string;
  ikuWords: string[];
  createdAt: string;
  likes: number;
}

const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'El cuidado del agua y la voz de nuestros mayores',
    author: 'Dwia Villafaña (Estudiante E1)',
    grade: '8° Grado',
    ethnicity: 'Pueblo Arhuaco (Iku)',
    community: 'Resguardo Minas de Iracal',
    content: 'En nuestra escuela de Minas de Iracal es importante aprender español sin olvidar la lengua Iku, porque el castellano nos da herramientas para dialogar y defender nuestro territorio sagrado ante las instituciones; sin embargo, en la lengua Iku está guardada la memoria viva de nuestros Mamos y el mandamiento de la Ley de Origen para cuidar las aguas y los bosques. Cuando bajamos al casco urbano de Pueblo Bello necesitamos hacernos entender con claridad; no obstante, el corazón de nuestro pensamiento sigue latiendo en la Sierra.',
    ikuWords: ['Ni (Agua/Río)', 'Kaku Serankwa (Creador)', 'Mamo (Autoridad espiritual)', 'Territorio sagrado'],
    createdAt: '2026-10-14T10:30:00Z',
    likes: 24,
  },
  {
    id: 'pub-2',
    title: 'Tejiendo dos lenguas como una mochila arhuaca',
    author: 'Ati Izquierdo (Estudiante E2)',
    grade: '9° Grado',
    ethnicity: 'Pueblo Arhuaco (Iku)',
    community: 'Vereda El Chorrillo',
    content: 'Aprender a redactar en español nos ayuda a escribir nuestras propias peticiones y proyectos escolares con propiedad; no obstante, si dejamos de hablar Iku en el aula perderemos el hilo conductor que une nuestro pensamiento con la madre naturaleza. Mi abuela me enseñó que cada puntada de la mochila representa un pensamiento de armonía; por lo tanto, hablar dos lenguas no es una contradicción, sino una fortaleza para proteger nuestro legado biocultural.',
    ikuWords: ['Tutu (Mochila tradicional)', 'Seynekun (Madre Tierra)', 'Iku (Gente originaria)'],
    createdAt: '2026-10-18T14:15:00Z',
    likes: 19,
  },
  {
    id: 'pub-3',
    title: 'La siembra comunitaria y el valor de la palabra',
    author: 'Camilo Torres & Dinamizador D2',
    grade: '8° Grado y Tutoría Bilingüe',
    ethnicity: 'Intercultural (Kankuamo y Arhuaco)',
    community: 'Minas de Iracal',
    content: 'Durante las jornadas de siembra en la chagra, los mayores explican que las consecuencias adversas del clima se superan mediante la solidaridad comunitaria y el andamiaje entre familias; por consiguiente, en el colegio debemos ayudarnos mutuamente entre quienes dominan el Iku y quienes hablan castellano. Así fortalecemos la comprensión lectora sin avergonzarnos de nuestras raíces.',
    ikuWords: ['Zatukwa (Siembra sagrada)', 'Gwasékwa (Diálogo de respeto)'],
    createdAt: '2026-10-22T09:00:00Z',
    likes: 31,
  },
];

// --- API Endpoints ---

// 1. Gemini AI Pedagogical Mentor with High Thinking (gemini-4-argon)
app.post('/api/gemini/mentor', async (req, res) => {
  try {
    const { prompt, mode, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'El mensaje o consulta es requerido.' });
    }

    if (!ai) {
      // Fallback response if no API key is injected at runtime
      return res.json({
        response: `[Modo Pedagógico Offline / Sin conexión de API]: Excelente ejercicio de redacción. Recuerda conectar tus oraciones utilizando conectores lógicos como "por lo tanto", "sin embargo" o "no obstante", precedidos por punto y coma (;). El andamiaje en lengua Iku aporta significado a tus vivencias territoriales en la Sierra Nevada.`,
        thinkingUsed: false,
      });
    }

    const systemInstruction = `Eres el Sabedor y Tutor Pedagógico Bilingüe Intercultural del proyecto "Puentes de la Sierra" de la Institución Educativa Minas de Iracal (Pueblo Bello, Cesar, Colombia).
Tu labor es orientar a estudiantes de 8º y 9º grado (mayoría pueblo indígena Arhuaco e intercultural) y docentes rurales en el fortalecimiento del español como segunda lengua (L2), usando la lengua materna Iku y la cosmovisión de la Sierra Nevada de Santa Marta como andamiaje etnocultural.

Principios fundamentales:
1. Respeto absoluto a la Ley de Origen, la cosmovisión Arhuaca (Mamos, Sierra Nevada, naturaleza sagrada, territorio, armonía, Seynekun) y la interculturalidad crítica (Catherine Walsh).
2. Andamiaje etnocultural (Vygotsky, Bruner, López y Hederich): la lengua Iku no es un obstáculo ni dialecto aislado, sino la estructura cognitiva previa que da seguridad para comprender y expresarse en español.
3. Competencias comunicativas en español formal: orientar con calidez pedagógica en comprensión inferencial, enriquecimiento léxico, uso de conectores (sin embargo, por lo tanto, no obstante), concordancia de género y número, y signos de puntuación (la coma y el punto y coma ;).
4. Lenguaje cercano, respetuoso, motivador y claro, sin juzgar ni avergonzar al estudiante.
5. Si el estudiante escribe o pregunta en Iku o sobre vocabulario de la Sierra, reconoce y valida esos saberes.`;

    const modelName = 'gemini-4-argon';

    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Modo: ${mode || 'orientacion_general'}\nContexto: ${JSON.stringify(context || {})}\nConsulta/Texto del estudiante o docente:\n${prompt}`,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return res.json({
      response: response.text ?? 'No se pudo generar una respuesta.',
      thinkingUsed: true,
      model: modelName,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/mentor:', error);
    return res.status(500).json({
      error: 'Error procesando la consulta con el modelo inteligente.',
      details: error.message,
    });
  }
});

// 2. Public Community Publications (Free Access & Free Publishing)
app.get('/api/publications', (_req, res) => {
  return res.json({
    success: true,
    count: publications.length,
    publications,
  });
});

app.post('/api/publications', (req, res) => {
  try {
    const { title, author, grade, ethnicity, community, content, ikuWords } = req.body;

    if (!title || !author || !content) {
      return res.status(400).json({ error: 'Título, autor y contenido son campos obligatorios.' });
    }

    const newPub: Publication = {
      id: `pub-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      grade: grade ? grade.trim() : '8° o 9° Grado',
      ethnicity: ethnicity ? ethnicity.trim() : 'Pueblo Arhuaco (Iku)',
      community: community ? community.trim() : 'Minas de Iracal',
      content: content.trim(),
      ikuWords: Array.isArray(ikuWords) ? ikuWords : [],
      createdAt: new Date().toISOString(),
      likes: 1,
    };

    publications.unshift(newPub);

    return res.status(201).json({
      success: true,
      message: 'Publicación comunitaria guardada exitosamente. Es 100% libre y gratuita.',
      publication: newPub,
    });
  } catch (error: any) {
    console.error('Error saving publication:', error);
    return res.status(500).json({ error: 'Error al registrar la publicación.' });
  }
});

app.post('/api/publications/:id/like', (req, res) => {
  const { id } = req.params;
  const pub = publications.find((p) => p.id === id);
  if (!pub) {
    return res.status(404).json({ error: 'Publicación no encontrada.' });
  }
  pub.likes += 1;
  return res.json({ success: true, likes: pub.likes });
});

// Production vs Development Vite setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve production static assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In development mode, mount Vite dev server as middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Puentes de la Sierra Applet running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
