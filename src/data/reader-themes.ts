export type ReaderMotif = "beauty" | "music" | "synchronicity";

export interface ReaderTheme {
  motif: ReaderMotif;
  romanNumeral: string;
  essayIndex: number;
}

const READER_THEMES: Record<string, ReaderTheme> = {
  beauty: {
    motif: "beauty",
    romanNumeral: "I",
    essayIndex: 0,
  },
  music: {
    motif: "music",
    romanNumeral: "II",
    essayIndex: 1,
  },
  synchronicity: {
    motif: "synchronicity",
    romanNumeral: "III",
    essayIndex: 2,
  },
};

const DEFAULT_THEME: ReaderTheme = {
  motif: "beauty",
  romanNumeral: "I",
  essayIndex: 0,
};

export function getReaderTheme(insightId: string): ReaderTheme {
  return READER_THEMES[insightId] ?? DEFAULT_THEME;
}
