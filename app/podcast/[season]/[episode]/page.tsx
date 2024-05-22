"use client";

import { Podcast } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Player from "./Player";
import { fetchPodcast } from "@/app/lib/api";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader } from "@/app/ui/Loader";
import { useAppContext } from "@/app/ui/AppContext";

type RouteParams = { season: string; episode: string };

export default function Page({ params }: { params: RouteParams }) {
  const [podcastData, setPodcastData] = useState<Podcast>();

  const searchParams = useSearchParams();
  const jumpToTime = searchParams?.get("start");
  const { navigationState } = useAppContext();

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

  const episodeText =
    navigationState?.title ??
    `episode ${params.episode} of season ${params.season}`;
  if (!podcastData)
    return <Loader text={`Loading podcast transcript for ${episodeText}`} />;

  return (
    <>
      <header className="fixed sticky top-0 z-20 w-full border-b border-b-black bg-paper-light px-8 py-3 dark:border-b-white">
        <h1 className="mt-1 uppercase">
          <Link href="/podcast">Mi manjar</Link>
        </h1>
      </header>
      <Player podcast={podcastData} jumpToTime={jumpToTime} />
    </>
  );
}
