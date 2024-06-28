"use client";
import { ASEntity, Word } from "@/app/lib/definitions";
import {
  convertMillisecondsToSeconds,
  centerElementIntoViewport
} from "@/app/lib/helpers";
import clsx from "clsx";
import { splitParagraphIntoSentences, matchSentencesToWords } from "./utils";
import EntitySequence from "./EntitySequence";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  textTranslated: string;
  words: Word[];
  currentTime: number;
  entities: ASEntity[];
}

const calcIsActive = (currentTime: number, start: number, end: number) => {
  return (
    currentTime >= convertMillisecondsToSeconds(start) &&
    currentTime <= convertMillisecondsToSeconds(end)
  );
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

  const [activeIndex, setActiveIndex] = useState<number>();

  useEffect(() => {
    const activeSentence = sentenceInfo.findIndex((sentence) =>
      calcIsActive(currentTime, sentence.startTime, sentence.endTime)
    );
    if (activeSentence !== activeIndex) {
      setActiveIndex(activeSentence);
      centerElementIntoViewport(activeSentence);
    }
  }, [currentTime, activeIndex, sentenceInfo]);


  return (
    <div className="break-normal">
      {sentenceInfo.map((sentence, index) => {
        const isActiveSentence = activeIndex === index;
        const hasEntities = entities.length > 0; 
        return (
          <div
            className={clsx(
              "grid grid-cols-2 gap-8 text-3xl",
              isActiveSentence
                ? "mb-2 border-b border-b-fuchsia"
                : "text-gray-400"
            )}
            key={index}
            id={`sentence-${index}`}
          >
            {isActiveSentence ? (
              <div className="flex flex-wrap">
                {sentence.words.map((word, index) => {
                  const isActiveWord = calcIsActive(
                    currentTime,
                    word.start,
                    word.end
                  );
                  return (
                    <span
                      key={index}
                      className={clsx(
                        isActiveWord && "bg-yellow-200 dark:bg-lime-700",
                        "mx-1"
                      )}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
            ) : hasEntities ? (
              <EntitySequence text={sentence.sentence} entities={entities} />
            ) : (
              <p>{sentence.sentence}</p>
            )}
            <p>{translatedSentences[index]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HighlightSequence;
