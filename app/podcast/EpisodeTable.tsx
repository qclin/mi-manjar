"use client";

import range from "lodash/range";
import flatten from "lodash/flatten";
import { TopicFilter, type SeasonOverview } from "@/app/lib/definitions";
import { useAppContext } from "@/app/ui/AppContext";
import { useRouter } from "next/navigation";
import { useHits, UseHitsProps } from "react-instantsearch";
import type { BaseHit, Hit } from "instantsearch.js";
import EpisodeTableRow from "./EpisodeTableRow";
import EpisodeListItem from "./EpisodeListItem";

type Props = { data: SeasonOverview };
type FiterHit = TopicFilter & BaseHit;

const EpisodeTable = ({ data, ...rest }: UseHitsProps<FiterHit> & Props) => {
  const { hits } = useHits({ ...rest });

  const router = useRouter();
  const { setNavigationState } = useAppContext();

  const handleNavigation = (season: number, episode: number, title: string) => {
    const stateData = { season, episode, title };
    setNavigationState(stateData);
    router.push(`podcast/${season}/${episode}`);
  };

  const EpisodeData = flatten(
    range(1, 5)
      .sort((a, b) => b - a)
      .map((seasonIndex) => {
        return data[`season_${seasonIndex}` as keyof SeasonOverview]
          .filter((overview) =>
            hits.some(
              (hit) =>
                overview.season === hit.season &&
                overview.episode === hit.episode
            )
          )
          .map((overview, index) => ({ seasonIndex, overview, index }));
      })
  );

  return (
    <div className="container mx-auto mb-12">
      <div className="hidden md:block">
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
            {EpisodeData.map(({ seasonIndex, overview, index }) => (
              <EpisodeTableRow
                key={`season${seasonIndex}_episode${index}`}
                overview={overview}
                topic={hits.find(
                  (hit) =>
                    overview.season === hit.season &&
                    overview.episode === hit.episode
                )}
                onClick={handleNavigation}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        <ul className="border-y border-primary">
          {EpisodeData.map(({ seasonIndex, overview, index }) => (
            <EpisodeListItem
              key={`season${seasonIndex}_episode${index}`}
              overview={overview}
              topic={hits.find(
                (hit) =>
                  overview.season === hit.season &&
                  overview.episode === hit.episode
              )}
              onClick={handleNavigation}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpisodeTable;
