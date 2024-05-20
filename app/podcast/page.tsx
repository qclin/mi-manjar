"use client";

import { useEffect, useState } from "react";
import { fetchSeasons } from "../lib/api";
import type { SeasonOverview } from "../lib/definitions";
import EpisodeTable from "./EpisodeTable";
import SearchPanel from "../ui/SearchPanel";

export default function Page() {
  const [overviewData, setOverviewData] = useState<SeasonOverview>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSeasons();
        setOverviewData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!overviewData) return <>Loading podcast table</>;
  return (
    <>
      <SearchPanel />
      <EpisodeTable data={overviewData} />
    </>
  );
}
