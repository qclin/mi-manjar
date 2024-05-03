"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import {
  convertMillisecondsToSeconds,
  isElementOverlappingViewport,
} from "@/app/lib/helpers";
import AudioPlayer from "@/app/ui/AudioPlayer";
import HighlightSequence from "@/app/ui/HighlightSequence";
import { Podcast, SpeakerName } from "@/app/lib/definitions";
import TableOfContent from "@/app/ui/TableOfContent";
import SummaryPanel from "@/app/ui/SummaryPanel";
import downIcon from "@/public/down.svg";
import Image from "next/image";

type Props = {
  podcast: Podcast;
};

export default function Player({ podcast }: Props) {
  const { overview, highlight, transcription } = podcast;
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

    centerElementIntoViewport(sequence);
  };

  const centerElementIntoViewport = (sequence: number) => {
    var myElement = document.getElementById(`sequence-${sequence}`);

    if (myElement && !isElementOverlappingViewport(myElement)) {
      myElement?.scrollIntoView({
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="flex">
      <button
        className="absolute -left-2 top-1/2 z-20 flex -translate-y-1/2 -rotate-90 transform"
        onClick={togglePanel}
      >
        <Image
          src={downIcon}
          alt="expand panel"
          className={clsx(isPanelOpen && "rotate-180 transform")}
          width={24}
          height={24}
        />
        Index
        <Image
          src={downIcon}
          alt="expand panel"
          className={clsx(isPanelOpen && "rotate-180 transform")}
          width={24}
          height={24}
        />
      </button>
      <TableOfContent
        isOpen={isPanelOpen}
        highlight={highlight}
        onClick={jumpToTimestamp}
      />
      <div
        className={clsx(
          "transition-margin flex-1 duration-300 ease-in-out",
          isPanelOpen ? "ml-[33%]" : "ml-0"
        )}
      >
        <section className="relative p-8 md:p-12">
          {transcription.map(
            ({ text, start, sequence, speaker, words, text_en }) => {
              const isHighlight = currentSequence === sequence;
              const isLater = currentSequence < sequence;

              return (
                <div
                  key={`sequence-${sequence}`}
                  className="my-2 grid grid-cols-10 gap-4"
                >
                  <span className="text-gray-600">
                    {SpeakerName[speaker as keyof typeof SpeakerName]}
                  </span>
                  <div className={clsx("col-span-8 block max-w-prose")}>
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
                          isLater ? "text-gray-100" : "text-gray-600",
                          "appearance-none text-justify"
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
