"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import subtitleData from "../../lib/tears_es_speakers_words.json";
import { convertMillisecondsToSeconds } from "../../lib/helpers";
import AudioPlayer from "../../ui/AudioPlayer";
import HighlightSequence from "./HighlightSequence";
import { Sentence } from "@/app/lib/definitions";

const subtitles: Sentence[] = subtitleData;

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const jumpToTimestamp = (startTime: number) => {
    if (!audioRef.current) return;
    const seconds = convertMillisecondsToSeconds(startTime);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  const updateCurrentSequence = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;
    setCurrentTime(time);
    const currentSegment = subtitles.find((segment) => {
      const startSeconds = convertMillisecondsToSeconds(segment.start);
      const endSeconds = convertMillisecondsToSeconds(segment.end);
      return time >= startSeconds && currentTime <= endSeconds;
    });

    const sequence = currentSegment?.sequence ?? 0;
    setCurrentSequence(sequence);

    var my_element = document.getElementById(`sequence-${sequence}`);
    my_element?.scrollIntoView({
      block: "center",
      inline: "nearest",
    });
  };

  return (
    <div className="relative">
      <div className="max-w-prose">
        {subtitles.map(({ text, start, sequence, speaker, words }) => {
          const isHighlight = currentSequence === sequence;
          return (
            <div
              key={`sequence-${sequence}`}
              className="grid gap-4 grid-cols-5"
            >
              <span className="text-gray-600 ">
                {speaker == "A" ? "Carmen " : speaker == "B" ? "Ana  " : ""}
              </span>
              <p className="block my-2 col-span-4">
                {isHighlight ? (
                  <HighlightSequence words={words} currentTime={currentTime} />
                ) : (
                  <button
                    key={sequence}
                    id={`sequence-${sequence}`}
                    className={clsx(
                      {
                        "text-gray-800": speaker === "A",
                        "text-medium ": speaker === "C",
                      },
                      "appearance-none text-justify"
                    )}
                    onClick={() => jumpToTimestamp(start)}
                  >
                    {text}
                  </button>
                )}
              </p>
            </div>
          );
        })}
      </div>
      <AudioPlayer
        ref={audioRef}
        onTimeUpdate={updateCurrentSequence}
        filename="las-hijas-de-filipe/Son estas lágrimas mi manjar.mp3"
        className="w-9/12 my-6 fixed bottom-5"
      />
    </div>
  );
}
