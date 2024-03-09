"use client";

import { Podcast } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Player from "./Player";

export default function Page({ params }: { params: { slug: string } }) {

const [podcastData, setPodcastData] = useState<Podcast>(); 

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/episode/${params.slug}`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching podcast data for episode: ${response.statusText}`
        );
      }
      const data = (await response.json()) as Podcast;
      setPodcastData(data);
    } catch (error) {
      console.error("Failed to fetch podcast data", error);
    }
  };

  fetchData();
}, [params.slug])


  if(!podcastData) return <div>Loading podcast data for: {params.slug}</div>;

  return <Player overview={podcastData.overview} topics={podcastData.topics} transcripts={podcastData.transcription} />
}
