"use client";
import {
  Overview,
  TopicFilter,
  type SeasonOverview,
} from "@/app/lib/definitions";
import { useAppContext } from "@/app/ui/AppContext";
import { useRouter } from "next/navigation";
import { useHits, UseHitsProps } from "react-instantsearch";
import type { BaseHit, Hit } from "instantsearch.js";
import EpisodeTableRow from "./EpisodeTableRow";
import EpisodeListItem from "./EpisodeListItem";
import useIsMobile from "../hooks/useIsMobile";

type Props = { data: SeasonOverview };
type FiterHit = TopicFilter & BaseHit;

const EpisodeTable = ({ data, ...rest }: UseHitsProps<FiterHit> & Props) => {
  const { hits } = useHits({ ...rest });
  const isMobile = useIsMobile();
  const router = useRouter();
  const { setNavigationState } = useAppContext();

  const handleNavigation = (season: number, episode: number, title: string) => {
    const stateData = { season, episode, title };
    setNavigationState(stateData);
    router.push(`podcast/${season}/${episode}`);
  };

  const episodeData = processSeasonData(data, hits);

  if (isMobile) {
    return (
      <div className="container mx-auto mb-12">
        <ul className="border-y border-primary">
          {episodeData.map(({ seasonIndex, overview, index }) => {
            return (
              <EpisodeListItem
                key={`season${seasonIndex}_episode${index}`}
                overview={overview}
                onClick={handleNavigation}
              />
            );
          })}
        </ul>
      </div>
    );
  }
  return (
    <div className="container mx-auto mb-12">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="sticky top-0 border-b bg-paper-light text-primary">
          <tr className="[&>*]:border-b [&>*]:border-b-primary [&>*]:font-normal [&>*]:uppercase [&>*]:text-secondary">
            <th></th>
            <th className="px-4 py-2 text-left">Episode Title</th>
            <th className="px-4 py-2 text-left">English</th>
            <th className="whitespace-nowrap px-4 py-2 text-sm">Date</th>
            <th className="whitespace-nowrap px-4 py-2 text-sm">
              Season - Episode
            </th>
            <th className="px-4 py-2 text-sm">Duration</th>
            <th className="whitespace-nowrap px-4 py-2 text-sm">
              Words per minute
            </th>
          </tr>
        </thead>
        <tbody>
          {episodeData.map(({ seasonIndex, overview, index }) => (
            <EpisodeTableRow
              key={`season${seasonIndex}_episode${index}`}
              overview={overview}
              onClick={handleNavigation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodeTable;

type EpisodeData = { seasonIndex: number; overview: Overview; index: number };

function processSeasonData(data: SeasonOverview, hits: Hit<FiterHit>[]) {
  const episodeData: Array<EpisodeData> = [];

  // Preprocess hits into a Set for O(1) access
  const hitsSet = new Set(hits.map((hit) => `${hit.season}-${hit.episode}`));

  for (let seasonIndex = 4; seasonIndex >= 1; seasonIndex--) {
    const seasonKey = `season_${seasonIndex}` as keyof SeasonOverview;
    const seasonData = data[seasonKey];

    const filteredEpisodes = seasonData.reduce(
      (acc: EpisodeData[], overview, index) => {
        const hitKey = `${overview.season}-${overview.episode}`;
        if (hitsSet.has(hitKey)) {
          acc.push({ seasonIndex, overview, index });
        }
        return acc;
      },
      []
    );

    Array.prototype.push.apply(episodeData, filteredEpisodes);
  }
  return episodeData;
}
