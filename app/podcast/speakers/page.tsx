"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import subtitleData from "../../lib/tears_es_speakers_words_translated.json";
import topicsData from "../../lib/podcast_topics_time.json";

import { convertMillisecondsToSeconds } from "../../lib/helpers";
import AudioPlayer from "../../ui/AudioPlayer";
import HighlightSequence from "./HighlightSequence";
import { Sentence, Topic } from "@/app/lib/definitions";
import TableOfContent from "./TableOfContent";

const subtitles: Sentence[] = subtitleData;
const topics: Topic[] = topicsData.topics;

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

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
    <div className="flex">
      <TableOfContent
        isOpen={isPanelOpen}
        topics={topics}
        onClick={jumpToTimestamp}
      />
      <div
        className={clsx(
          "flex-1 transition-margin duration-300 ease-in-out",
          isPanelOpen ? "ml-2" : "ml-0"
        )}
      >
        <button className="underline" onClick={togglePanel}>
          {isPanelOpen ? "<< Hide" : ">> Show"} Index
        </button>
        <section className="relative">
          {subtitles.map(
            ({ text, start, sequence, speaker, words, text_en }) => {
              const isHighlight = currentSequence === sequence;
              return (
                <div
                  key={`sequence-${sequence}`}
                  className="grid gap-4 grid-cols-10 my-2"
                >
                  <span className="text-gray-600">
                    {speaker == "A" ? "Carmen " : speaker == "B" ? "Ana  " : ""}
                  </span>
                  <p
                    className={clsx(
                      "block max-w-prose",
                      isPanelOpen ? "col-span-8" : "col-span-4"
                    )}
                  >
                    {isHighlight ? (
                      <HighlightSequence
                        words={words}
                        currentTime={currentTime}
                      />
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
                    <p className={clsx(
                      "block max-w-prose",
                      isPanelOpen ? "col-start-2 col-span-8" : "col-span-4"
                    )}>
                      <div className="border-rose-300 border-y-2 text-bold block break-words py-2">
                        {text_en}
                      </div>
                    </p>
                  )}
                </div>
              );
            }
          )}

          <AudioPlayer
            ref={audioRef}
            onTimeUpdate={updateCurrentSequence}
            filename="las-hijas-de-filipe/Son estas lágrimas mi manjar.mp3"
            className={clsx(
              isPanelOpen ? "w-7/12" : "w-9/12",
              "my-6 fixed bottom-5"
            )}
          />
        </section>
      </div>
    </div>
  );
}
