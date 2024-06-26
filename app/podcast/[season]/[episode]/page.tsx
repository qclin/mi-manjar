"use client";

import { MediaCaption, Podcast } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Player from "./Player";
import { fetchCaption, fetchPodcast } from "@/app/lib/api";
import { useSearchParams } from "next/navigation";

import { Loader } from "@/app/ui/Loader";
import { useAppContext } from "@/app/ui/AppContext";
import Header from "@/app/ui/Header";
import Carousel from "@/app/ui/Carousel";

type RouteParams = { season: string; episode: string };

export default function Page({ params }: { params: RouteParams }) {
  const [podcastData, setPodcastData] = useState<Podcast>();
  const [mediaData, setMediaData] = useState<MediaCaption>();

  const searchParams = useSearchParams();
  const timeToSkip = searchParams?.get("start");
  const { navigationState } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcast(params.season, params.episode);
        setPodcastData(data);

        const mediaData = await fetchCaption();
        setMediaData(mediaData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [params.episode, params.season]);

  const episodeText =
    navigationState?.title ??
    `episode ${params.episode} of season ${params.season}`;

  if (!podcastData)
    return <Loader text={`Loading podcast transcript for ${episodeText}`} />;

  return (
    <>
      <Header />
      {mediaData && mediaData[podcastData.overview.release_date] && (
        <Carousel caption={mediaData[podcastData.overview.release_date]} />
      )}
      <Player podcast={podcastData} timeToSkip={timeToSkip} />
    </>
  );
}
