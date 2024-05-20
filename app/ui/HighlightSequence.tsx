"use client";
import { ASEntity, Word } from "@/app/lib/definitions";
import { convertMillisecondsToSeconds } from "@/app/lib/helpers";
import clsx from "clsx";
import { splitParagraphIntoSentences, matchSentencesToWords } from "./utils";
import EntitySequence from "./EntitySequence";

interface Props {
  text: string;
  textTranslated: string;
  words: Word[];
  currentTime: number; // Current playback time of the audio in seconds
  entities: ASEntity[];
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
        return (
          <div className="grid grid-cols-2 gap-8 text-3xl" key={index}>
            {isActiveSentence ? (
              <div className="border-b border-b-fuchsia text-3xl">
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
            ) : (
              <p className="text-gray-700">
                {entities.length > 0 ? (
                  <EntitySequence
                    text={sentence.sentence}
                    entities={entities}
                  />
                ) : (
                  sentence.sentence
                )}
              </p>
            )}
            <p
              className={clsx(
                isActiveSentence ? "border-b border-b-fuchsia" : "text-gray-700"
              )}
            >
              {translatedSentences[index]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HighlightSequence;
