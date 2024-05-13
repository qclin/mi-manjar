"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import {
  convertMillisecondsToSeconds,
  isElementOverlappingViewport,
} from "@/app/lib/helpers";
import AudioPlayer from "@/app/ui/AudioPlayer";
import HighlightSequence from "@/app/ui/HighlightSequence";
import { Podcast } from "@/app/lib/definitions";
import TableOfContent from "@/app/ui/TableOfContent";
import SummaryPanel from "@/app/ui/SummaryPanel";
import downIcon from "@/public/down.svg";
import Image from "next/image";
import EntitySequence from "@/app/ui/EntitySequence";

type Props = {
  podcast: Podcast;
  jumpToTime?: string | null;
};

export default function Player({ podcast, jumpToTime }: Props) {

  const { overview, highlight, transcription } = podcast;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const jumpToTimestamp = (startTime: number) => {
    if (!audioRef.current) return;
    const seconds = convertMillisecondsToSeconds(startTime);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };


  const handleCanPlayThrough = useCallback(() => {
    // Jump to timestamp in the route search param
    const audio = audioRef.current;
    if (!audio || !jumpToTime || isReady) return;
    const startTime = convertMillisecondsToSeconds(parseInt(jumpToTime))
    console.log("Audio is fully loaded and can play through without interruption.");
    audio.currentTime = startTime;  
    audio.play(); 
    setIsReady(true);
}, [jumpToTime, isReady, audioRef.current]);


  const updateCurrentSequence = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;
    setCurrentTime(time);
    const currentSegment = transcription.utterances.find((segment) => {
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
        className="absolute -left-3.5 top-1/2 z-20 flex -translate-y-1/2 -rotate-90 transform font-medium underline"
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
        onSelectSequence={(s) => {
          const sequence = transcription.utterances.find((t) => t.sequence === s);
          sequence && jumpToTimestamp(sequence?.start);
        }}
      />
      <div
        className={clsx(
          "transition-margin flex-1 duration-300 ease-in-out",
          isPanelOpen ? "ml-[33%]" : "ml-0"
        )}
      >
        <section className="relative p-8 md:p-12 md:pb-36">
          {!isReady && jumpToTime && <p> ... Loading audio file</p>}
          {transcription.utterances.map(
            ({ text, start, sequence, speaker, words, text_en }) => {
              const isActiveSequence = currentSequence === sequence;
              const isLater = currentSequence < sequence;
              const entities = transcription.entities.filter((entity) =>
                entity.sequence === sequence
              );

              return (
                <div
                  key={sequence}
                  id={`sequence-${sequence}`}
                  className="my-2 grid grid-cols-10 gap-4"
                >
                  <span className="text-gray-600">
                    {speaker}
                    <span className="text-xs text-gray-400">{sequence}</span>
                  </span>
                  <div className={clsx("col-span-8 block max-w-prose")}>
                    {isActiveSequence ? (
                      <HighlightSequence
                        text={text}
                        textTranslated={text_en || ""}
                        words={words}
                        currentTime={currentTime}
                        entities={entities}
                      />
                    ) : (
                      <button
                        className={clsx(
                          {
                            "font-medium ": speaker === "C",
                          },
                          isLater ? "text-gray-400" : "text-gray-600",
                          "appearance-none text-justify"
                        )}
                        onClick={() => jumpToTimestamp(start)}
                      >
                        {entities.length > 0 ? (
                          <EntitySequence text={text} entities={entities} />
                        ) : (
                          text
                        )}
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
              onCanPlayCapture={handleCanPlayThrough}
            />
          </SummaryPanel>
        </section>
      </div>
    </div>
  );
}
