"use client";
import { convertMillisecondsToDisplayFriendly } from "@/app/lib/helpers";
import { Highlight } from "@/app/lib/definitions";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  highlight: Highlight;
  onClick(start_time: number): void;
}

const TableOfContent = ({ isOpen, highlight, onClick }: Props): JSX.Element => {
  const { citations, entities, topics } = highlight;
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 h-screen overflow-y-scroll shadow-md transition-width duration-300 ease-in-out overflow-hidden top-0",
        isOpen ? "w-1/3 min-w-[350px]" : "w-0"
      )}
    >
      <div className="p-4 pl-12 pb-28">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left *:font-light *:text-zinc-400">
              <th></th>
              <th>Topics</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(({ topic, start_time }, index) => (
              <tr
                key={`topic-${index}`}
                className="hover:font-semibold cursor-pointer *:py-1 border-y hover:font-medium hover:border-rose-300"
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
      </div>
    </div>
  );
};

export default TableOfContent;
