import React, { HTMLProps, useEffect, useState, forwardRef } from 'react';

interface AudioPlayerProps extends HTMLProps<HTMLAudioElement>{
  filename: string; 
  className?: string;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(({ filename, className, ...rest }, ref) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        const response = await fetch(`/api/media/audio/${encodeURIComponent(filename)}`);
        if (!response.ok) {
          throw new Error(`Error fetching presigned URL: ${response.statusText}`);
        }
        const data = await response.json() as { url: string }; // Specify the expected shape of the response data
        setAudioUrl(data.url);
      } catch (error) {
        console.error('Failed to fetch presigned URL', error);
      }
    };

    fetchPresignedUrl();
  }, [filename]);

  if (!audioUrl) {
    return <div>Loading audio...</div>;
  }

  return (
    <audio controls src={audioUrl} className={className} ref={ref} {...rest}>
      Your browser does not support the audio element.
    </audio>
  );
});

export default AudioPlayer;
