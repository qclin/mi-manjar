export type Subtitle = {
  sequence: number;
  start: string;
  end: string;
  text: string;
};

export type Links = {
  title: string;
  href: string;
};

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
