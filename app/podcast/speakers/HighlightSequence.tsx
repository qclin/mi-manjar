"use client";
import { Word } from "@/app/lib/definitions";
import { convertMillisecondsToSeconds } from "@/app/lib/helpers";
import clsx from "clsx";

interface Props {
  words: Word[];
  currentTime: number; // Current playback time of the audio in seconds
}

const HighlightSequence = ({ words, currentTime }: Props): JSX.Element => {
  console.log("[HighlightSequence] --- ", currentTime);
  return (
    <div className="border-rose-300 border-y-2 text-bold block break-words py-2">
      {words.map((word, index) => {
        console.log(
          convertMillisecondsToSeconds(word.start),
          convertMillisecondsToSeconds(word.end)
        );

        const isActive =
          currentTime >= convertMillisecondsToSeconds(word.start) &&
          currentTime <= convertMillisecondsToSeconds(word.end);
        return (
          <span
            key={index}
            className={clsx(isActive && "bg-yellow-200", "mr-1")}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
};

export default HighlightSequence;
