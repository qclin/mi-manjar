import React, { HTMLProps, useEffect, useState, forwardRef } from "react";
import { fetchAudioPresignedURL } from "../lib/api";

interface AudioPlayerProps extends HTMLProps<HTMLAudioElement> {
  filename: string;
  className?: string;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ filename, className, ...rest }, ref) => {
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

    if (!audioUrl) {
      return <p>Loading audio file...</p>;
    }

    return (
      <audio controls src={audioUrl} className={className} ref={ref} {...rest}>
        Your browser does not support the audio element.
      </audio>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
