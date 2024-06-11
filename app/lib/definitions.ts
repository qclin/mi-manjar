export type Word = {
  text: string;
  start: number; // Start timestamp in seconds
  end: number; // End timestamp in seconds
};

export type Utterance = {
  sequence: number;
  start: number;
  end: number;
  text: string;
  speaker: string;
  words: Word[];
  text_en?: string;
};

export type Citation = {
  citation: string;
  sequence: number;
};

export type Entity = {
  entity: string;
  type: EntityType;
  sequences: number[];
};

export enum EntityType {
  Angel = "Angel",
  Artist = "Artist",
  Artwork = "Artwork",
  Author = "Author",
  Authors = "Authors",
  Brand = "Brand",
  Book = "Book",
  Deity = "Deity",
  Demon = "Demon",
  Concept = "Concept",
  Metaphorical = "Metaphorical",
  Family = "Family",
  Film = "Film",
  Food = "Food",
  "Historical Figure" = "Historical Figure",
  "Fictional Character" = "Fictional Character",
  Group = "Group",
  "Music Group" = "Music Group",
  Person = "Person",
  Literature = "Literature",
  Location = "Location",
  Place = "Place",
  Organization = "Organization",
  Saint = "Saint",
  "Religious Figure" = "Religious Figure",
  "Religious Concept" = "Religious Concept",
}

// https://www.assemblyai.com/docs/audio-intelligence/entity-detection#supported-entities
export enum ASEntityType {
  date = "date",
  date_interval = "date_interval",
  drug = "drug",
  event = "event",
  injury = "injury",
  language = "language",
  location = "location",
  medical_condition = "medical_condition",
  medical_process = "medical_process",
  nationality = "nationality",
  occupation = "occupation",
  organization = "organization",
  gender_sexuality = "gender_sexuality",
  person_age = "person_age",
  person_name = "person_name",
  political_affiliation = "political_affiliation",
  religion = "religion",
  time = "time",
  url = "url",
}

export type ASEntity = {
  entity_type: ASEntityType;
  text: string;
  start: number;
  end: number;
  sequence: number;
};

export type Highlight = {
  citations: Citation[];
  topics: Topic[];
  entities: Entity[];
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

export enum SupportedLanguage {
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
  release_date: string;
  word_count: number;
  words_per_minute: number;
};

export type Podcast = {
  overview: Overview;
  highlight: Highlight;
  transcription: Transcription;
};

export type Transcription = {
  utterances: Utterance[];
  entities: ASEntity[];
  audio_url: string;
  audio_duration: string;
  text: string;
};

export enum SpeakerName {
  A = "Carmen",
  B = "Ana",
  C = "",
}
export type SeasonIndex = "season_1" | "season_2" | "season_3" | "season_4";
export type SeasonOverview = Record<SeasonIndex, Overview[]>;

export type UtteranceSearch = {
  id: string;
  objectID: string;
  episode: number;
  season: number;
  sequence: number;
  text: string;
  text_en: string;
  start: number;
};

export type TopicFilter = {
  id: string;
  objectID: string;
  episode: number;
  season: number;
  title: TranslatedString;
  topics: string[];
  sub_topics: string[];
  keywords: string[];
  key_figures: string[];
  literature?: string[];
  objects?: string[];
  paintings?: string[];
};
