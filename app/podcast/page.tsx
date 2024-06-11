"use client";

import { useEffect, useState } from "react";
import { fetchSeasons } from "../lib/api";
import type { SeasonOverview } from "../lib/definitions";
import EpisodeTable from "./EpisodeTable";
import SearchPanel, { searchClient } from "../ui/SearchPanel";
import { Loader } from "../ui/Loader";
import { FilterPanel } from "../ui/Refinement/FilterPanel";
import { InstantSearch, Configure } from "react-instantsearch";
import { useAppContext } from "../ui/AppContext";

export default function Page() {
  const [overviewData, setOverviewData] = useState<SeasonOverview>();
  const { setEpisodeList } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSeasons();
        setOverviewData(data);
        if (data)
          setEpisodeList(Array.prototype.concat.apply([], Object.values(data)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!overviewData) return <Loader text="Loading podcast table" />;

  return (
    <>
      <SearchPanel />
      <InstantSearch searchClient={searchClient} indexName="topics" insights>
        <FilterPanel />
        <EpisodeTable data={overviewData} />
        <Configure hitsPerPage={100} />
      </InstantSearch>
    </>
  );
}
