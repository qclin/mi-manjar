"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { convertMillisecondsToSeconds } from "@/app/lib/helpers";
import AudioPlayer from "@/app/ui/AudioPlayer";
import { Podcast } from "@/app/lib/definitions";
import useIndexPanel from "@/app/ui/useIndexPanel";
import SummaryPanel from "@/app/ui/SummaryPanel";
import TranscriptionLog from "@/app/ui/TranscriptionLog";

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
  const [isPanelOpen, TableOfContent] = useIndexPanel(highlight);

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
    const startTime = convertMillisecondsToSeconds(parseInt(jumpToTime));
    audio.currentTime = startTime;
    audio.play();
    setIsReady(true);
  }, [jumpToTime, isReady]);

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
  };

  return (
    <div className="flex">
      <TableOfContent
        onSelect={jumpToTimestamp}
        onSelectSequence={(s) => {
          const sequence = transcription.utterances.find(
            (t) => t.sequence === s
          );
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
          {transcription.utterances.map((utterance) => {
            const isActiveSequence = currentSequence === utterance.sequence;
            const entities = transcription.entities.filter(
              (entity) => entity.sequence === utterance.sequence
            );
            const translatedEntities = highlight.entities.filter((entity) =>
              entity.sequences.includes(utterance.sequence)
            );

            return (
              <TranscriptionLog
                key={utterance.sequence}
                currentTime={currentTime}
                isActive={isActiveSequence}
                entities={entities}
                translatedEntities={translatedEntities}
                onSelect={jumpToTimestamp}
                utterance={utterance}
              />
            );
          })}
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
