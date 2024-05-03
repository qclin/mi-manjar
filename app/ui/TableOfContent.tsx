"use client";
import { convertMillisecondsToDisplayFriendly } from "@/app/lib/helpers";
import { Highlight } from "@/app/lib/definitions";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  highlight: Highlight;
  onClick(start_time: number): void;
  onSelectSequence(sequence: number): void;
}

const TableOfContent = ({
  isOpen,
  highlight,
  onClick,
  onSelectSequence,
}: Props): JSX.Element => {
  const { citations, entities, topics } = highlight;

  return (
    <div
      className={clsx(
        "transition-width fixed left-0 top-0 h-[90%] overflow-y-scroll shadow-md duration-300 ease-in-out",
        isOpen ? "w-1/3 min-w-[350px]" : "w-0"
      )}
    >
      <div className="p-4 pb-28 pl-12">
        <table className="w-full table-auto">
          <thead>
            <tr className="my-2 text-left text-sm font-semibold uppercase">
              <th></th>
              <th>Topics</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(({ topic, start_time }, index) => (
              <tr
                key={`topic-${index}`}
                className="cursor-pointer border-y *:py-1 hover:border-rose-300 hover:font-medium"
                tabIndex={0}
                onClick={() => onClick(start_time)}
              >
                <td className="pr-2.5">
                  {convertMillisecondsToDisplayFriendly(start_time)}
                </td>
                <td>{topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mb-2 mt-8 text-sm font-semibold uppercase">Citations</h2>
        {citations &&
          citations.map(({ citation, sequence }) => (
            <button
              key={`citation-${sequence}`}
              onClick={() => onSelectSequence(sequence)}
            >
              {citation}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TableOfContent;
