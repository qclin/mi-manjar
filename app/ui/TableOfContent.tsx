"use client";
import { convertMillisecondsToDisplayFriendly } from "@/app/lib/helpers";
import { Topic } from "@/app/lib/definitions";

interface Props {
  isOpen: boolean;
  topics: Topic[];
  onClick(start_time: number): void;
}

const TableOfContent = ({ isOpen, topics, onClick }: Props): JSX.Element => {
  return (
    <div
      className={`h-screen overflow-y-scroll shadow-md transition-width duration-300 ease-in-out ${
        isOpen ? "w-1/3" : "w-0"
      } overflow-hidden`}
    >
      <div className="p-4">
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
                className="hover:bg-rose-200 cursor-pointer *:py-1 border-t"
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
