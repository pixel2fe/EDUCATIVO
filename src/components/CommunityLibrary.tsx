import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, Plus, BookOpen, Download, ShieldCheck, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PublicationItem } from '../types';

interface CommunityLibraryProps {
  onSelectStoryForWritingHelp?: (text: string) => void;
}

export const CommunityLibrary: React.FC<CommunityLibraryProps> = () => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New story modal state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newGrade, setNewGrade] = useState('8° Grado');
  const [newEthnicity, setNewEthnicity] = useState('Pueblo Arhuaco (Iku)');
  const [newCommunity, setNewCommunity] = useState('Minas de Iracal');
  const [newContent, setNewContent] = useState('');
  const [newIkuWords, setNewIkuWords] = useState('Zanawina, Seynekun');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch publications from backend
  const fetchPublications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/publications');
      if (res.ok) {
        const data = await res.json();
        setPublications(data.publications || []);
      }
    } catch (err) {
      console.error('Error fetching publications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`/api/publications/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPublications((prev) =>
          prev.map((p) => (p.id === id ? { ...p, likes: data.likes } : p))
        );
      }
    } catch (err) {
      console.error('Error liking publication:', err);
    }
  };

  const handleCreatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    try {
      setSubmitting(true);
      const ikuWordsArray = newIkuWords
        .split(',')
        .map((w) => w.trim())
        .filter(Boolean);

      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          author: newAuthor,
          grade: newGrade,
          ethnicity: newEthnicity,
          community: newCommunity,
          content: newContent,
          ikuWords: ikuWordsArray,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPublications((prev) => [data.publication, ...prev]);
        setIsModalOpen(false);
        setNewTitle('');
        setNewAuthor('');
        setNewContent('');
        setSuccessMessage('¡Tu escrito ha sido publicado libremente en la biblioteca comunitaria!');
        setTimeout(() => setSuccessMessage(null), 5000);
      }
    } catch (err) {
      console.error('Error creating publication:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadStory = (pub: PublicationItem) => {
    const textBlob = new Blob(
      [
        `===================================================\n`,
        `${pub.title.toUpperCase()}\n`,
        `Autor: ${pub.author} (${pub.grade})\n`,
        `Comunidad: ${pub.community} - ${pub.ethnicity}\n`,
        `Fecha: ${new Date(pub.createdAt).toLocaleDateString()}\n`,
        `===================================================\n\n`,
        `${pub.content}\n\n`,
        `Palabras en lengua originaria: ${pub.ikuWords.join(', ')}\n\n`,
        `Publicado en: Puentes de la Sierra (RED Etnocultural Libre)\n`,
        `I.E. Minas de Iracal - Pueblo Bello, Cesar\n`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(textBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pub.title.replace(/\s+/g, '_')}_Minas_de_Iracal.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered publications
  const filteredPublications = publications.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.community.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = filterGrade === 'all' || p.grade.includes(filterGrade);

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              PUBLICACIÓN Y ACCESO 100% LIBRE
            </span>
            <span className="text-xs text-stone-400">Sin anuncios · Sin costo de suscripción</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Mi Escrito Gratis</span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Voces de la Sierra: Biblioteca de Publicaciones Comunitarias
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          Espacio abierto donde estudiantes de 8° y 9°, docentes dinamizadores y familias de Minas de Iracal
          publican libremente sus historias, relatos de la Ley de Origen y ensayos argumentativos bilingües.
          Cualquier persona puede leer, comentar y descargar el contenido sin publicidad.
        </p>

        {successMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título, autor, vereda o palabra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
          >
            <option value="all">Todos los Grados y Roles</option>
            <option value="8°">8° Grado (Octavo)</option>
            <option value="9°">9° Grado (Noveno)</option>
            <option value="Tutor">Docentes y Dinamizadores</option>
          </select>
        </div>
      </div>

      {/* Publications Grid */}
      {loading ? (
        <div className="text-center py-12 text-stone-400 text-sm">
          Cargando biblioteca comunitaria...
        </div>
      ) : filteredPublications.length === 0 ? (
        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-amber-500/60 mx-auto" />
          <h3 className="text-base font-bold text-stone-200">No se encontraron publicaciones con ese criterio</h3>
          <p className="text-xs text-stone-400">Sé el primero en compartir tu escrito con la comunidad.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer"
          >
            Publicar Escrito Ahora
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-700/50 rounded-2xl p-6 shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                    {pub.grade} · {pub.ethnicity}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {new Date(pub.createdAt).toLocaleDateString('es-CO', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-amber-100 font-serif mb-1 leading-snug">
                  {pub.title}
                </h3>
                <div className="text-xs text-emerald-400 mb-3 font-medium">
                  Por {pub.author} · <span className="text-stone-400">{pub.community}</span>
                </div>

                <p className="text-stone-300 text-xs leading-relaxed line-clamp-4 mb-4">
                  "{pub.content}"
                </p>

                {pub.ikuWords && pub.ikuWords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pub.ikuWords.map((word, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-amber-300/90 border border-stone-800"
                      >
                        🌿 {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-800/70 text-xs">
                <button
                  onClick={() => handleLike(pub.id)}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-rose-400 transition cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                  <span>{pub.likes} valoraciones</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadStory(pub)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer text-[11px]"
                    title="Descargar este texto en archivo .txt sin costo"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar TXT</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Free Publishing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-amber-800/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-800">
              <h3 className="text-lg font-bold text-amber-200 font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Publicar Escrito en la Biblioteca Comunitaria
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white px-2 py-1 rounded bg-stone-800 text-xs cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            <form onSubmit={handleCreatePublication} className="space-y-4 text-xs">
              <div>
                <label className="text-stone-300 block mb-1 font-semibold">Título de tu obra o relato:</label>
                <input
                  type="text"
                  placeholder="Ej. Las aguas de la Sierra y la palabra de mi abuelo"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Autor (Nombre o Seudónimo):</label>
                  <input
                    type="text"
                    placeholder="Ej. Dwia Torres"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Grado Escolar / Rol:</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="8° Grado">8° Grado (Octavo)</option>
                    <option value="9° Grado">9° Grado (Noveno)</option>
                    <option value="Docente / Dinamizador">Docente / Dinamizador Bilingüe</option>
                    <option value="Comunidad Rural">Comunidad / Familia Rural</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Pueblo / Filiación Étnica:</label>
                  <input
                    type="text"
                    value={newEthnicity}
                    onChange={(e) => setNewEthnicity(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Vereda o Territorio:</label>
                  <input
                    type="text"
                    value={newCommunity}
                    onChange={(e) => setNewCommunity(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-300 block mb-1 font-semibold">
                  Palabras o conceptos en lengua Iku incluidos (separadas por comas):
                </label>
                <input
                  type="text"
                  placeholder="Ej. Zanawina, Seynekun, Tutu, Mamo"
                  value={newIkuWords}
                  onChange={(e) => setNewIkuWords(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="text-stone-300 block mb-1 font-semibold">
                  Contenido de tu escrito argumentativo o narrativo:
                </label>
                <textarea
                  rows={6}
                  placeholder="Escribe tu texto cuidando el uso de conectores (por lo tanto, sin embargo) y delimitando con punto y coma (;)..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                <span className="text-[11px] text-emerald-400">
                  ✓ Publicación 100% gratuita y abierta a la comunidad
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold cursor-pointer shadow-md"
                  >
                    {submitting ? 'Publicando...' : 'Publicar Ahora'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
