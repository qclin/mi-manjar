"use client";
import { useRouter } from "next/navigation";
import range from "lodash/range";
import { type SeasonOverview } from "@/app/lib/definitions";
import { useState } from "react";
import clsx from "clsx";
import { PlayIcon, PlusIcon } from "@/app/ui/icons";
import { useAppContext } from "@/app/ui/AppContext";

const EpisodeTable = ({ data }: { data: SeasonOverview }) => {
  const { setNavigationState } = useAppContext();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);
  const router = useRouter();

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

  const handleNavigation = (season: number, episode: number, title: string) => {
    const stateData = { season, episode, title };
    setNavigationState(stateData);
    router.push(`podcast/${season}/${episode}`);
  };

  const SummaryTextCell = ({ text }: { text: string }) => (
    <td>
      <p className="line-clamp-5 max-w-prose pr-4 text-sm text-secondary">
        {text}
      </p>
    </td>
  );
  return (
    <table className="container mx-auto my-24 table-auto">
      <thead className="sticky top-0 border-b bg-paper-light text-primary">
        <tr className="[&>*]:border-b [&>*]:border-b-primary [&>*]:font-normal [&>*]:uppercase [&>*]:text-secondary">
          <th className="">
            <button onClick={toggleAllRows}>
              <PlusIcon
                alt="expand all rows"
                size={20}
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
            return data[`season_${seasonIndex}` as keyof SeasonOverview].map(
              (
                {
                  title,
                  season,
                  episode,
                  summary,
                  release_date,
                  duration,
                  words_per_minute,
                },
                index
              ) => (
                <>
                  <tr
                    onClick={() => handleRowClick(`s${seasonIndex}-ep${index}`)}
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
                    <td className="p-2 text-primary">{title.es}</td>
                    <td className="text-primary">{title.en}</td>
                    <td className="p-2 text-sm text-secondary">
                      {new Date(release_date).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-sm text-secondary">
                      S{season} - EP {episode}
                    </td>
                    <td className="p-2 text-sm uppercase text-secondary">
                      {duration}
                    </td>
                    <td className="p-2 text-sm uppercase text-secondary">
                      {words_per_minute} wpm
                    </td>
                  </tr>
                  <tr
                    onClick={() => handleNavigation(season, episode, title.es)}
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
                  </tr>
                </>
              )
            );
          })}
      </tbody>
    </table>
  );
};

export default EpisodeTable;
