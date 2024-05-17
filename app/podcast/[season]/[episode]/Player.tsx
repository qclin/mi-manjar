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
import useIndexPanel from "@/app/ui/useIndexPanel";
import SummaryPanel from "@/app/ui/SummaryPanel";
import EntitySequence from "@/app/ui/EntitySequence";
import { DownChevronIcon } from "@/app/ui/icons";

type Props = {
  podcast: Podcast;
  jumpToTime?: string | null;
};

export default function Player({ podcast, jumpToTime }: Props) {

  const { overview, highlight, transcription } = podcast;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPanelOpen, TableOfContent] = useIndexPanel(highlight)
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
    if (currentSequence != sequence) setCurrentSequence(sequence);
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
      <TableOfContent
        onSelect={jumpToTimestamp}
        onSelectSequence={(s) => {
          const sequence = transcription.utterances.find((t) => t.sequence === s);
          sequence && jumpToTimestamp(sequence?.start);
        }}
      />
      <div
        className={clsx(
          "transition-margin flex-1 duration-300 ease-in-out",
          isPanelOpen ? "mr-[33%]" : "mr-0"
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
