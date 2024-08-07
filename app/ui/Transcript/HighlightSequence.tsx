"use client";
import { ASEntity, Word } from "@/app/lib/definitions";
import {
  convertMillisecondsToSeconds,
  centerElementIntoViewport,
} from "@/app/lib/helpers";
import clsx from "clsx";
import { splitParagraphIntoSentences, matchSentencesToWords } from "./utils";
import EntitySequence from "./EntitySequence";
import { useEffect, useState } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";

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
  const isMobile = useIsMobile();
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

  if (isMobile) {
    if (
      activeIndex === undefined ||
      activeIndex === -1 ||
      !sentenceInfo[activeIndex]
    ) {
      return <></>;
    }

    const activeSentence = sentenceInfo[activeIndex];

    return (
      <div className="flex h-[75vh] flex-col justify-center overflow-y-auto px-2 text-2xl">
        <div className="flex flex-wrap rounded-lg bg-white py-2 dark:bg-black">
          {activeSentence.words.map((word, index) => {
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
        <p className="py-2 text-secondary">
          {translatedSentences[activeIndex ?? 0]}
        </p>
      </div>
    );
  }
  return (
    <div className="break-normal">
      {sentenceInfo.map((sentence, index) => {
        const isActiveSentence = activeIndex === index;
        const hasEntities = entities.length > 0;
        return (
          <div
            className={clsx(
              "grid text-3xl md:grid-cols-2 md:gap-8",
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
