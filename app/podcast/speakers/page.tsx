'use client';

import { useRef, useState } from "react";
import clsx from 'clsx'; 
import subtitles from "../../lib/tears_es_speakers_words.json"; 
import { convertMillisecondsToSeconds } from "../../lib/helpers"; 


export default function Page() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentSequence, setCurrentSequence] = useState(0);

  const jumpToTimestamp = (startTime: number) => {
    if (!audioRef.current) return; 
    const seconds = convertMillisecondsToSeconds(startTime)
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  const updateCurrentSequence = () => {
    if (!audioRef.current) return; 
      const currentTime = audioRef.current.currentTime;
      const currentSegment = subtitles.find(segment => {
        const startSeconds = convertMillisecondsToSeconds(segment.start);
        const endSeconds = convertMillisecondsToSeconds(segment.end);
        return currentTime >= startSeconds && currentTime <= endSeconds;
      });

    const sequence = currentSegment?.sequence ?? 0
    setCurrentSequence(sequence);

    var my_element = document.getElementById(`sequence-${sequence}`);
    my_element?.scrollIntoView({
        block: "center",
        inline: "nearest"
      });
  };

    return (
    <div className="relative">
        <h1 className="text-xl">These tears are my delicacies</h1>
        <div className="max-w-prose">
        {subtitles.map(({text, start, sequence, speaker, words}) => {
          return (
            <button
              key={sequence}
              id={`sequence-${sequence}`}
              className={clsx({
                "border-rose-300 rounded text-xl": currentSequence === sequence,
                "text-gray-800": speaker === 'A', 
                'text-bold': speaker === 'C'
            },  "text-justify appearance-none block my-2")}
              onClick={() => jumpToTimestamp(start)}
            >
              <span> {speaker == 'A' ? 'Carmen: ' : speaker == 'B' ? 'Ana:  ': '' }
              {currentSequence === sequence ? (
                words.map((word) => (<span>
                  {word.text}
                </span>))
              ): text
              }
               </span>
            </button>
          );
        })}
        </div>
        <audio ref={audioRef} onTimeUpdate={updateCurrentSequence} 
        controls src="/media/audio/Son estas lágrimas mi manjar.mp3" className="w-9/12 my-6 fixed bottom-5"></audio>
        </div>
        );
  }