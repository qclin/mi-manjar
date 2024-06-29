import React, {
  HTMLProps,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Transition } from "@headlessui/react";
import { fetchAudioPresignedURL } from "../lib/api";
import { PlayIcon, PauseIcon, SeekBackIcon, ExpandIcon } from "./Icons";
import { formatTime } from "../lib/helpers";
import clsx from "clsx";
interface AudioPlayerProps extends HTMLProps<HTMLAudioElement> {
  isExpanded: boolean;
  filename: string;
  className?: string;
}

export interface PlayerRef {
  currentTime: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

const AudioPlayer = forwardRef<PlayerRef, AudioPlayerProps>(
  ({ filename, className, ...rest }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [audioUrl, setAudioUrl] = useState<string>();

    const styles = {
      backgroundText: clsx(
        "border-t border-primary bg-paper-light text-primary"
      ),
      panelTransition: clsx("fixed duration-300 ease-in-out"),
    };

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

    if (!audioUrl) {
      return <p>Loading audio file...</p>;
    }

    console.log("[currentTime]", currentTime);
    return (
      <>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleMetadata}
        />
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
        <Transition
          show={isExpanded}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 transform scale-95"
          enterTo="opacity-100 transform scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 transform scale-100"
          leaveTo="opacity-0 transform scale-95"
        >
          <div
            className={clsx(
              "fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-90",
              styles.backgroundText
            )}
          >
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold">Title</h3>
              <p className="text-lg text-gray-400">Details</p>
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
                  <SeekBackIcon />{" "}
                  {/* Replace with SeekForwardIcon if needed */}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </>
    );
  }
);

AudioPlayer.displayName = "PlayWithTransition";
export default AudioPlayer;
