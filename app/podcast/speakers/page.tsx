"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import subtitleData from "../../lib/tears_es_speakers_words_translated.json";
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
      <div>
        {subtitles.map(({ text, start, sequence, speaker, words, text_en }) => {
          const isHighlight = currentSequence === sequence;
          return (
            <div
              key={`sequence-${sequence}`}
              className="grid gap-4 grid-cols-10 my-2"
            >
              <span className="text-gray-600">
                {speaker == "A" ? "Carmen " : speaker == "B" ? "Ana  " : ""}
              </span>
              <p className="block col-span-4 max-w-prose">
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
              {isHighlight && text_en && (
                <p className="block col-span-4 max-w-prose">
                  <div className="border-rose-300 border-y-2 text-bold block break-words py-2">
                    {text_en}
                  </div>
                </p>
              )}
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
