import React, { useState } from 'react';
import { Volume2, Sparkles, Search, Filter, BookOpen, Layers } from 'lucide-react';
import { GLOSSARY_WORDS } from '../data/curriculumData';
import { speakText } from '../utils/audioSynth';
import { GlossaryWord } from '../types';

export const GlossaryExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<GlossaryWord>(GLOSSARY_WORDS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async (word: GlossaryWord) => {
    setIsPlaying(true);
    await speakText(word.audioText);
    setIsPlaying(false);
  };

  const filteredWords = GLOSSARY_WORDS.filter((word) => {
    const matchesSearch =
      word.ikuTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.spanishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.territoryContext.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Banner Card */}
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            ANDAMIAJE LINGÜÍSTICO Y ETNOCULTURAL
          </span>
          <span className="text-xs text-stone-400">10 Términos Clave del Pueblo Arhuaco</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif mb-2">
          Glosario Sonoro Bilingüe del Territorio (Iku - Español)
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
          El vocabulario sagrado de la Sierra Nevada de Santa Marta actúa como puente cognoscitivo (López y Hederich, 2010).
          Escucha la pronunciación en voz alta, comprende la dimensión ancestral de cada concepto y enlázalo con su término formal en castellano.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por término en Iku o español..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
          {['all', 'naturaleza', 'gramatica', 'ancestralidad', 'comunidad'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat === 'all' ? 'Todas las Categorías' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Featured Word Display */}
      {selectedWord && (
        <div className="bg-gradient-to-br from-stone-900 to-amber-950/40 border-2 border-amber-600/50 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 md:border-r border-stone-800 pr-0 md:pr-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  {selectedWord.category}
                </span>
                <span className="text-xs text-stone-400 italic">[{selectedWord.phonetic}]</span>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-semibold uppercase">Lengua Iku:</div>
                <div className="text-3xl font-bold font-serif text-amber-100">{selectedWord.ikuTerm}</div>
              </div>

              <div>
                <div className="text-xs text-emerald-400 font-semibold uppercase">Español Académico:</div>
                <div className="text-xl font-bold text-emerald-200">{selectedWord.spanishTerm}</div>
              </div>

              <button
                onClick={() => handlePlayAudio(selectedWord)}
                disabled={isPlaying}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                <span>{isPlaying ? 'Reproduciendo audio...' : 'Escuchar Pronunciación'}</span>
              </button>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Definición Pedagógica y Conceptual
                </h4>
                <p className="text-stone-200 text-sm leading-relaxed">{selectedWord.definition}</p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>En la Cosmovisión Arhuaca y la Sierra Nevada:</span>
                </h4>
                <p className="text-xs text-stone-300 italic leading-relaxed">
                  {selectedWord.territoryContext}
                </p>
              </div>

              <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-800/40">
                <h4 className="text-xs font-bold text-emerald-300 mb-1">Ejemplo en Redacción Escrita:</h4>
                <p className="text-xs text-emerald-100 font-mono">
                  «{selectedWord.exampleSentence}»
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredWords.map((word) => {
          const isCurrent = selectedWord.id === word.id;
          return (
            <div
              key={word.id}
              onClick={() => setSelectedWord(word)}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? 'bg-amber-950/50 border-amber-500 shadow-lg'
                  : 'bg-stone-900/80 border-stone-800 hover:border-amber-700/50 hover:bg-stone-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 font-mono">
                    {word.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(word);
                    }}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition"
                    title="Escuchar audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-lg font-bold text-amber-100 font-serif mb-0.5">
                  {word.ikuTerm}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mb-2">
                  {word.spanishTerm}
                </div>

                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {word.definition}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-800/70 text-[11px] text-stone-400 flex items-center justify-between">
                <span>{word.phonetic}</span>
                <span className="text-amber-400 font-semibold text-[10px]">Ver detalles →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
