"use client";

import range from "lodash/range";
import { TopicFilter, type SeasonOverview } from "@/app/lib/definitions";
import { useState } from "react";
import clsx from "clsx";
import PlayIcon from "@/public/icons/play.svg";
import PlusIcon from "@/public/icons/plus.svg";
import { useAppContext } from "@/app/ui/AppContext";

import { useHits, UseHitsProps } from "react-instantsearch";
import type { BaseHit, Hit } from "instantsearch.js";
import EpisodeTableRow from "./EpisodeTableRow";

type Props = { data: SeasonOverview };
type FiterHit = TopicFilter & BaseHit;

const EpisodeTable = ({ data, ...rest }: UseHitsProps<FiterHit> & Props) => {
  const { hits } = useHits({ ...rest });

  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAllRows = () => {
    if (allExpanded) {
      setExpandedRows([]);
    }
    setAllExpanded(!allExpanded);
  };

  const handleRowClick = (index: string) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(index);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== index)
      : currentExpandedRows.concat(index);

    setExpandedRows(newExpandedRows);
  };

  return (
    <table className="container mx-auto my-24 table-auto">
      <thead className="sticky top-0 border-b bg-paper-light text-primary">
        <tr className="[&>*]:border-b [&>*]:border-b-primary [&>*]:font-normal [&>*]:uppercase [&>*]:text-secondary">
          <th className="">
            <button onClick={toggleAllRows}>
              <PlusIcon
                alt="expand all rows"
                size={24}
                className="text-primary"
              />
            </button>
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
                <>
                  <EpisodeTableRow
                    key={`season${seasonIndex}_episode${index}`}
                    onClick={() => handleRowClick(`s${seasonIndex}-ep${index}`)}
                    overview={overview}
                    isExpanded={
                      allExpanded ||
                      expandedRows.includes(`s${seasonIndex}-ep${index}`)
                    }
                    topic={hits.find(
                      (hit) =>
                        overview.season === hit.season &&
                        overview.episode === hit.episode
                    )}
                  />
                  {/* <tr
                        onClick={() =>
                          handleRowClick(`s${seasonIndex}-ep${index}`)
                        }
                        key={`season${seasonIndex}_episode${index}`}
                        className="hover:bg-paper-dark [&>*]:cursor-pointer [&>*]:border-b"
                      >
                        <td className="w-8 px-2">
                          <PlayIcon
                            alt="play audio"
                            size={24}
                            className="text-primary"
                          />
                        </td>
                        <td className="text-primary p-2">{title.es}</td>
                        <td className="text-primary">{title.en}</td>
                        <td className="text-secondary p-2 text-sm">
                          {new Date(release_date).toLocaleDateString()}
                        </td>
                        <td className="text-secondary p-2 text-sm">
                          S{season} - EP {episode}
                        </td>
                        <td className="text-secondary p-2 text-sm uppercase">
                          {duration}
                        </td>
                        <td className="text-secondary p-2 text-sm uppercase">
                          {words_per_minute} wpm
                        </td>
                      </tr>
                      <tr
                        onClick={() =>
                          handleNavigation(season, episode, title.es)
                        }
                        key={`row-data-${index}-summary`}
                        className={clsx(
                          "cursor-pointer hover:bg-paper-dark [&>*]:border-b [&>*]:py-2 ",
                          allExpanded ||
                            expandedRows.includes(`s${seasonIndex}-ep${index}`)
                            ? "visible"
                            : "hidden"
                        )}
                      >
                        <td></td>
                        <SummaryTextCell text={summary.es} />
                        <SummaryTextCell text={summary.en} />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr> */}
                </>
              ));
          })}
      </tbody>
    </table>
  );
};

export default EpisodeTable;
