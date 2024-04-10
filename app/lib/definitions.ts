export type Word = {
  text: string;
  start: number; // Start timestamp in seconds
  end: number; // End timestamp in seconds
};

export type Sentence = {
  sequence: number;
  start: number;
  end: number;
  text: string;
  speaker: string;
  words: Word[];
  text_en?: string;
};

export type Topic = {
  topic: string;
  sequence_range: string;
  start_time: number;
  end_time: number;
};

export type TranslatedString = {
  es: string;
  en: string;
};

export enum Supported_Language {
  spanish = "es",
  english = "en",
}

export type Overview = {
  title: TranslatedString;
  summary: TranslatedString;
  podcast_url: string;
  season: number;
  episode: number;
  duration: string;
  audio_path: string;
};

export type Podcast = {
  overview: Overview;
  topics: Topic[];
  transcription: Sentence[];
};
