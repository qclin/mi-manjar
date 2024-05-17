"use client";
import { useRouter } from "next/navigation";
import range from "lodash/range";
import { type SeasonOverview } from "@/app/lib/definitions";
import { useState } from "react";
import clsx from "clsx";
import { PlayIcon, PlusIcon } from "../ui/icons";

const EpisodeTable = ({ data }: { data: SeasonOverview }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);
  const router = useRouter();

  const toggleAllRows = () => {
    if (allExpanded) {
      setExpandedRows([]);
    }
    setAllExpanded(!allExpanded);
  };

  const handleRowClick = (index: number) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(index);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== index)
      : currentExpandedRows.concat(index);

    setExpandedRows(newExpandedRows);
  };

  const SummaryTextCell = ({ text }: { text: string }) => (
    <td>
      <p className="line-clamp-3 max-w-prose text-sm text-gray-700">{text}</p>
    </td>
  );
  return (
    <table className="container mx-auto my-24 table-auto">
      <thead className="sticky top-0 border-b bg-paper-light">
        <tr className="[&>*]:border-b[&>*]:py-2[&>*]:border-b-black [&>*]:px-4 [&>*]:py-2 [&>*]:font-normal [&>*]:uppercase [&>*]:text-gray-500">
          <th>
            <button onClick={toggleAllRows}>
              <PlusIcon alt="expand all rows" size={20} />
            </button>
          </th>
          <th className="text-left">Episode Title</th>
          <th className="text-left">English</th>
          <th className="whitespace-nowrap text-left text-sm">Date</th>
          <th className="whitespace-nowrap text-sm">Season - Episode</th>
          <th className="text-sm">Duration</th>
          <th className="whitespace-nowrap text-sm">Words per minute</th>
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
                    onClick={() => handleRowClick(index)}
                    key={`row-data-${index}`}
                    className="hover:bg-gray-100 [&>*]:cursor-pointer [&>*]:border-b [&>*]:p-2 [&>*]:px-4"
                  >
                    <td>
                      <PlayIcon alt="play audio" size={24} />
                    </td>
                    <td>{title.es}</td>
                    <td>{title.en}</td>
                    <td className="text-sm text-gray-500">
                      {new Date(release_date).toLocaleDateString()}
                    </td>
                    <td className="text-sm text-gray-500">
                      S{season} - EP {episode}
                    </td>
                    <td className="text-sm uppercase text-gray-500">
                      {duration}
                    </td>
                    <td className="text-sm uppercase text-gray-500">
                      {words_per_minute} wpm
                    </td>
                  </tr>
                  <tr
                    onClick={() => router.push(`podcast/${season}/${episode}`)}
                    key={`row-data-${index}-summary`}
                    className={clsx(
                      "cursor-pointer [&>*]:border-b [&>*]:px-4 [&>*]:py-2",
                      allExpanded || expandedRows.includes(index)
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
