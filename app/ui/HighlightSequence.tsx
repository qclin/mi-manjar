"use client";
import { Entity, Word } from "@/app/lib/definitions";
import { convertMillisecondsToSeconds } from "@/app/lib/helpers";
import clsx from "clsx";
import { splitParagraphIntoSentences, matchSentencesToWords } from "./utils";
import EntitySequence from "./EntitySequence";

interface Props {
  text: string;
  textTranslated: string;
  words: Word[];
  currentTime: number; // Current playback time of the audio in seconds
  entities: Entity[];
}

const calcIsActive = (currentTime: number, start: number, end: number) => {
  return (
    currentTime >= convertMillisecondsToSeconds(start) &&
    currentTime <= convertMillisecondsToSeconds(end)
  );
};

const calcIsAfter = (currentTime: number, start: number) => {
  return currentTime < convertMillisecondsToSeconds(start);
};

const HighlightSequence = ({
  text,
  textTranslated,
  words,
  currentTime,
  entities,
}: Props): JSX.Element => {
  const sentences = splitParagraphIntoSentences(text);
  const translatedSentences = splitParagraphIntoSentences(textTranslated);
  const sentenceInfo = matchSentencesToWords(sentences, words);

  return (
    <div className="block break-words">
      {sentenceInfo.map((sentence, index) => {
        const isActiveSentence = calcIsActive(
          currentTime,
          sentence.startTime,
          sentence.endTime
        );
        const isAfter = calcIsAfter(currentTime, sentence.startTime);
        return isActiveSentence ? (
          <>
            <div className="font-semibold">
              {sentence.words.map((word, index) => {
                const isActiveWord = calcIsActive(
                  currentTime,
                  word.start,
                  word.end
                );
                return (
                  <span
                    key={index}
                    className={clsx(isActiveWord && "bg-yellow-200", "mr-1")}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>
            <p className="border-t border-rose-300 py-2">
              {translatedSentences[index]}
            </p>
          </>
        ) : (
          <div className={isAfter ? "text-gray-400" : "text-gray-600"}>
            {entities.length > 0 ? (
              <EntitySequence text={sentence.sentence} entities={entities} />
            ) : (
              sentence.sentence
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HighlightSequence;
