"use client";
import { ASEntity, Word } from "@/app/lib/definitions";
import {
  convertMillisecondsToSeconds,
  scrollToElementCenter,
  isElementInViewport,
} from "@/app/lib/helpers";
import clsx from "clsx";
import { splitParagraphIntoSentences, matchSentencesToWords } from "./utils";
import EntitySequence from "./EntitySequence";
import { useEffect, useState } from "react";

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

  const [active, setActive] = useState<number>();

  useEffect(() => {
    const activeIndex = sentenceInfo.findIndex((sentence) =>
      calcIsActive(currentTime, sentence.startTime, sentence.endTime)
    );
    if (activeIndex !== active) {
      setActive(activeIndex);
      centerElementIntoViewport(activeIndex);
    }
  }, [currentTime, active, sentenceInfo]);

  const centerElementIntoViewport = (index: number) => {
    var myElement = document.getElementById(`sentence-${index}`);
    const topOffset = document.querySelector("header")?.offsetHeight || 0;
    const bottomOffset =
      (document.querySelector(".summary-panel") as HTMLElement)?.offsetHeight ||
      0;

    if (myElement && !isElementInViewport(myElement, topOffset, bottomOffset)) {
      myElement?.scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  return (
    <div className="break-normal">
      {sentenceInfo.map((sentence, index) => {
        return (
          <div
            className={clsx(
              "grid grid-cols-2 gap-8 text-3xl",
              active === index
                ? "mb-2 border-b border-b-fuchsia"
                : "text-gray-400"
            )}
            key={index}
            id={`sentence-${index}`}
          >
            {active === index ? (
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
                      className={clsx(isActiveWord && "bg-yellow-200", "mx-1")}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
            ) : entities.length > 0 ? (
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
