"use client";

import { Podcast } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Player from "./Player";
import { fetchPodcast } from "@/app/lib/api";

export default function Page({ params }: { params: { slug: string } }) {
  const [podcastData, setPodcastData] = useState<Podcast>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcast(params.slug);
        setPodcastData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [params.slug]);

  if (!podcastData) return <div>Loading podcast data for: {params.slug}</div>;

  return (
    <Player
      overview={podcastData.overview}
      topics={podcastData.topics}
      transcripts={podcastData.transcription}
    />
  );
}
