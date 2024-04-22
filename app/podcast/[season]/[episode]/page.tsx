"use client";

import { Podcast } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Player from "./Player";
import { fetchPodcast } from "@/app/lib/api";

export default function Page({ params }: { params: { season: string, episode: string } }) {
  const [podcastData, setPodcastData] = useState<Podcast>();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcast(params.season as string, params.episode as string);
        setPodcastData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [params.episode]);

  if (!podcastData) return <div>Loading podcast data for: {params.episode}</div>;

  console.log( "[podcastData] ", podcastData)
  return (
    <Player podcast={podcastData} />
  );
}
