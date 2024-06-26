import { Overview } from "@/app/lib/definitions";
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, HTMLProps } from "react";
import useLangugageToggle from "../useLanguageToggle";
import OverviewInfo from "./OverviewInfo";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { fetchAudioPresignedURL } from "@/app/lib/api";
import { PlayIcon, PauseIcon, SeekBackIcon, ExpandIcon } from "../Icons";
import { formatTime } from "@/app/lib/helpers";


interface Props extends HTMLProps<HTMLAudioElement>{
  overview: Overview;
  filename: string;
  
}

export interface PlayerRef {
  currentTime: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

const SummaryPanel = forwardRef<PlayerRef, Props>(({filename, overview}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, LanguageToggler] = useLangugageToggle();
  const togglePanel = () => setIsOpen(!isOpen);


  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAudioPresignedURL(filename);
        setAudioUrl(data?.url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filename]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAudioPresignedURL(filename);
        setAudioUrl(data?.url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filename]);

  useImperativeHandle(ref, () => ({
    currentTime: audioRef.current?.currentTime || 0,
    play: () => {
      if (!audioRef.current) return;
      audioRef.current.play();
      setIsPlaying(true);
    },
    pause: () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
      setIsPlaying(false);
    },
    seek: (time: number) => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    },
  }));

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const bgTextStyle = clsx("border-t border-primary bg-paper-light text-primary")
  return (
    <div className="summary-panel fixed inset-x-0 bottom-0 z-30">
            <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleMetadata}
        />
      <div className={bgTextStyle}>
        <button onClick={togglePanel} className="w-full px-3 py-3 md:px-10">
          <OverviewInfo
            isOpen={isOpen}
            selectedLanguage={selectedLanguage}
            overview={overview}
          />
        </button>
        <div className="flex items-center justify-between p-4">
          <button onClick={togglePlayPause} className="mx-4">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <input
            type="range"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="h-1 w-full cursor-pointer rounded-lg bg-gray-700"
          />
          <div className="ml-4 text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span> /{" "}
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <Transition show={isOpen}>
        <div
          className="fixed inset-0 bg-paper-light bg-opacity-50"
          onClick={togglePanel}
        />
      </Transition>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 z-30"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in duration-300"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <div
          className={clsx(
            "inset-x-0 bottom-0 z-30 h-2/3 max-h-[90vh] transform overflow-y-auto md:h-auto",
            bgTextStyle
          )}
        >
          <div className="p-4 pt-8 md:px-10 md:py-8">
            <OverviewInfo
              isOpen={isOpen}
              selectedLanguage={selectedLanguage}
              overview={overview}
            />
            <LanguageToggler className="absolute right-4 top-2 block md:hidden" />
            <div className="mt-4 flex items-center">
                <button
                  onClick={() => setCurrentTime(currentTime - 10)}
                  className="mx-4"
                >
                  <SeekBackIcon />
                </button>
                <button onClick={togglePlayPause} className="mx-4">
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  onClick={() => setCurrentTime(currentTime + 10)}
                  className="mx-4"
                >
                  <SeekBackIcon />
                  
                </button>
              </div>
            <div className="mx-auto mt-2  hidden gap-8 text-sm text-secondary md:flex">
              <p className="max-w-prose">{overview.summary.es}</p>
              <p className="max-w-prose">{overview.summary.en}</p>
            </div>
            <p className="my-4 block text-sm text-secondary md:hidden">
              {overview.summary[selectedLanguage]}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  );
});

export default SummaryPanel;
