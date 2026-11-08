export interface GlossaryWord {
  id: string;
  ikuTerm: string;
  phonetic: string;
  spanishTerm: string;
  definition: string;
  territoryContext: string;
  category: 'naturaleza' | 'gramatica' | 'ancestralidad' | 'comunidad';
  exampleSentence: string;
  audioText: string;
}

export interface QuestionItem {
  id: number;
  module: string;
  question: string;
  context?: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: string;
  ikuHint?: string;
}

export interface WritingStep {
  id: number;
  title: string;
  subtitle: string;
  placeholder: string;
  suggestions: string[];
  grammarTip: string;
  ikuScaffold: string;
}

export interface PublicationItem {
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

export interface BadgeAward {
  id: string;
  level: number;
  title: string;
  symbol: string;
  description: string;
  sessionTitle: string;
  unlockedAt?: string;
}

export interface DiagnosticResult {
  score: number;
  maxScore: number;
  answers: Record<number, string>;
  moduleScores: Record<string, { correct: number; total: number }>;
  completedAt: string;
}
