"use client";

import { useCallback, useRef, useState } from "react";
import { convertMillisecondsToSeconds } from "@/app/lib/helpers";
import AudioPlayer from "@/app/ui/AudioPlayer";
import AudioPlayerWithTransition, {PlayerRef} from "@/app/ui/AudioPlayerWithTransition";
import { Podcast } from "@/app/lib/definitions";
import TableOfContent from "@/app/ui/TableOfContent";
import SummaryPanel from "@/app/ui/SummaryPanel/SummaryPanel";
import TranscriptionLog from "@/app/ui/TranscriptionLog";

type Props = {
  podcast: Podcast;
  timeToSkip?: string | null;
};

export default function PodcastView({ podcast, timeToSkip }: Props) {
  const { overview, highlight, transcription } = podcast;
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<PlayerRef>(null);

  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const jumpToTimestamp = (startTime: number) => {
    if (!audioRef.current) return;

    const seconds = convertMillisecondsToSeconds(startTime);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  const handleCanPlayThrough = useCallback(() => {
    // Jump to timestamp in the route search param
    const audio = audioRef.current;
    if (!audio || !timeToSkip || isReady) return;
    const startTime = convertMillisecondsToSeconds(parseInt(timeToSkip));
    audio.currentTime = startTime;
    audio.play();
    setIsReady(true);
  }, [timeToSkip, isReady]);

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
        highlight={highlight}
        onSelect={jumpToTimestamp}
        onSelectSequence={(s) => {
          const sequence = transcription.utterances.find(
            (t) => t.sequence === s
          );
          sequence && jumpToTimestamp(sequence.start);
        }}
      />
      <div>
        <section className="hidden p-12 pb-36 text-primary md:block">
          {!isReady && timeToSkip && <p> ... Loading audio file</p>}
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
        </section>
        {/* <SummaryPanel overview={overview}>
          <AudioPlayer
            ref={audioRef}
            onTimeUpdate={updateCurrentSequence}
            filename={overview.audio_path}
            className="w-full"
            onCanPlayCapture={handleCanPlayThrough}
          />
        </SummaryPanel> */}
        <SummaryPanel overview={overview}             ref={playerRef}
            onTimeUpdate={updateCurrentSequence}
            filename={overview.audio_path}
            className="w-full"
            onCanPlayCapture={handleCanPlayThrough}>
        </SummaryPanel>
      </div>
    </div>
  );
}
