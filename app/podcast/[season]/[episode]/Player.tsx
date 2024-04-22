"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { convertMillisecondsToSeconds, isElementOverlappingViewport } from "../../../lib/helpers";
import AudioPlayer from "../../../ui/AudioPlayer";
import HighlightSequence from "../../../ui/HighlightSequence";
import { Podcast, SpeakerName } from "@/app/lib/definitions";
import TableOfContent from "../../../ui/TableOfContent";
import SummaryPanel from "../../../ui/SummaryPanel";

type Props = {
  podcast: Podcast
};

export default function Player({ podcast }: Props) {
  const { overview, highlight, transcription } = podcast
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
    const currentSegment = transcription.find((segment) => {
      const startSeconds = convertMillisecondsToSeconds(segment.start);
      const endSeconds = convertMillisecondsToSeconds(segment.end);
      return time >= startSeconds && currentTime <= endSeconds;
    });

    const sequence = currentSegment?.sequence ?? 0;
    setCurrentSequence(sequence);

    centerElementIntoViewport(sequence)
  };

  const centerElementIntoViewport = (sequence: number) => {
    
    var myElement = document.getElementById(`sequence-${sequence}`);
    
    if (myElement && !isElementOverlappingViewport(myElement)){
      myElement?.scrollIntoView({
        block: "start",
        inline: "nearest",
      });
    }
  }

  return (
    <div className="flex">
      <TableOfContent
        isOpen={isPanelOpen}
        highlight={highlight}
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
          {transcription.map(
            ({ text, start, sequence, speaker, words, text_en }) => {
              const isHighlight = currentSequence === sequence;
              return (
                <div
                  key={`sequence-${sequence}`}
                  className="grid gap-4 grid-cols-10 my-2"
                >
                  <span className="text-gray-600">
                    {SpeakerName[speaker as  keyof typeof SpeakerName]}
                  </span>
                  <div
                    className={clsx(
                      "block max-w-prose",
                      isPanelOpen ? "col-span-4" : "col-span-8"
                    )}
                  >
                    {isHighlight ? (
                      <HighlightSequence
                        text={text}
                        textTranslated={text_en || ""}
                        words={words}
                        currentTime={currentTime}
                      />
                    ) : (
                      <button
                        key={sequence}
                        id={`sequence-${sequence}`}
                        className={clsx(
                          {
                            
                            "font-medium ": speaker === "C",
                          },
                          "appearance-none text-justify text-gray-400"
                        )}
                        onClick={() => jumpToTimestamp(start)}
                      >
                        {text}
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
          <SummaryPanel overview={overview}>
            <AudioPlayer
              ref={audioRef}
              onTimeUpdate={updateCurrentSequence}
              filename={overview.audio_path}
              className="w-full"
            />
          </SummaryPanel>
        </section>
      </div>
    </div>
  );
}
