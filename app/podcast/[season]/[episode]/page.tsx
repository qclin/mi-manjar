"use client";

import { Podcast } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Player from "./Player";
import { fetchPodcast } from "@/app/lib/api";
import { useSearchParams } from 'next/navigation'


type RouteParams = { season: string; episode: string }; 

export default function Page({params }:{ params: RouteParams }) {
  const [podcastData, setPodcastData] = useState<Podcast>();

  const searchParams = useSearchParams(); 
  const jumpToTime = searchParams?.get('start')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcast(
          params.season as string,
          params.episode as string
        );
        setPodcastData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [params.episode, params.season]);

  if (!podcastData)
    return <div>Loading podcast data for: {params.episode}</div>;

  return <Player podcast={podcastData} jumpToTime={jumpToTime} />;
}
