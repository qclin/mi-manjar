"use client";

import range from "lodash/range";
import { TopicFilter, type SeasonOverview } from "@/app/lib/definitions";
import PlusIcon from "@/public/icons/plus.svg";
import { useHits, UseHitsProps } from "react-instantsearch";
import type { BaseHit, Hit } from "instantsearch.js";
import EpisodeTableRow from "./EpisodeTableRow";

type Props = { data: SeasonOverview };
type FiterHit = TopicFilter & BaseHit;

const EpisodeTable = ({ data, ...rest }: UseHitsProps<FiterHit> & Props) => {
  const { hits } = useHits({ ...rest });
  
  return (
    <table className="container mx-auto my-24 table-auto">
      <thead className="sticky top-0 border-b bg-paper-light text-primary">
        <tr className="[&>*]:border-b [&>*]:border-b-primary [&>*]:font-normal [&>*]:uppercase [&>*]:text-secondary">
          <th>
          <PlusIcon
                alt="expand all rows"
                size={24}
                className="text-primary"
              />
          </th>
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
        {range(1, 5)
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
              .map((overview, index) => (
                  <EpisodeTableRow
                    key={`season${seasonIndex}_episode${index}`}
                    overview={overview}
                    topic={hits.find(
                      (hit) =>
                        overview.season === hit.season &&
                        overview.episode === hit.episode
                    )}
                  />
              ));
          })}
      </tbody>
    </table>
  );
};

export default EpisodeTable;
