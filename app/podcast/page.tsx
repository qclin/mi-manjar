"use client";

import { useRef, useState } from "react";
import subtitles from "../lib/tears_en.json";
import { subtitleFormatToSeconds } from "../lib/helpers";
import clsx from "clsx";

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSequence, setCurrentSequence] = useState(0);

  const jumpToTimestamp = (startTime: string, sequence: number) => {
    if (!audioRef.current) return;
    const seconds = subtitleFormatToSeconds(startTime);

    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  const updateCurrentSequence = () => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    const currentSegment = subtitles.find((segment) => {
      const startSeconds = subtitleFormatToSeconds(segment.start);
      const endSeconds = subtitleFormatToSeconds(segment.end);
      return currentTime >= startSeconds && currentTime <= endSeconds;
    });

    const sequence = currentSegment?.sequence ?? 0;
    setCurrentSequence(sequence);

    var my_element = document.getElementById(`sequence-${sequence}`);

    my_element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  return (
    <div className="relative">
      <h1 className="text-xl">These tears are my delicacies</h1>
      <p className="max-w-prose">
        {subtitles.map(({ text, start, sequence }) => {
          return (
            <button
              key={sequence}
              id={`sequence-${sequence}`}
              className={clsx(
                {
                  "bg-rose-300 rounded text-white":
                    currentSequence === sequence,
                },
                "appearance-none text-justify"
              )}
              onClick={() => jumpToTimestamp(start, sequence)}
            >
              <span className="hover:text-rose-500">{text} </span>
            </button>
          );
        })}
      </p>
      <audio
        ref={audioRef}
        onTimeUpdate={updateCurrentSequence}
        controls
        src="/media/audio/Son estas lágrimas mi manjar.mp3"
        className="w-9/12 my-6 fixed bottom-5"
      ></audio>
    </div>
  );
}
