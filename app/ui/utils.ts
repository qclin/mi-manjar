import { Word } from "../lib/definitions";

export type SentenceInfo = {
  sentence: string;
  startTime: number;
  endTime: number;
  words: Word[]; 
};

export function splitParagraphIntoSentences(paragraph: string): string[] {
    const regex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/;
    return paragraph.split(regex);
}

export function matchSentencesToWords(sentences: string[], words: Word[]): SentenceInfo[] {
    let result: SentenceInfo[] = [];
    let wordIndex = 0;

    sentences.forEach(sentence => {
        const sentenceWords = sentence.split(/\s+/);
        let sentenceLength = sentenceWords.length;
        let matchedWords: Word[] = [];

        while (sentenceLength > 0 && wordIndex < words.length) {
            matchedWords.push(words[wordIndex]);
            wordIndex++;
            sentenceLength--;
        }

        if (matchedWords.length > 0) {
            const startTime = matchedWords[0].start;
            const endTime = matchedWords[matchedWords.length - 1].end;
            result.push({
                sentence: sentence,
                startTime: startTime,
                endTime: endTime,
                words: matchedWords
            });
        }
    });

    return result;
}