"use client";
import { convertMillisecondsToDisplayFriendly } from "@/app/lib/helpers";
import { Highlight } from "@/app/lib/definitions";
import clsx from "clsx";
import { useState } from "react";
import { MoonIcon } from "./icons";

interface Props {
  highlight: Highlight;
  onSelect(start_time: number): void;
  onSelectSequence(sequence: number): void;
}

const TableOfContent = ({ highlight, onSelect, onSelectSequence }: Props) => {
  const { citations, topics } = highlight;

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  return (
    <>
      <button
        className="fixed right-0 top-0 z-20 mx-12 flex items-center py-4 uppercase text-primary"
        onClick={togglePanel}
      >
        <span className="mx-4">Index</span>
        {/* <MoonIcon alt="display mode" size={24} /> */}
      </button>
      <div
        className={clsx(
          "transition-width fixed right-0 top-[54px] z-20 h-[80vh] overflow-y-scroll bg-paper-dark text-primary duration-500 ease-in-out",
          isPanelOpen ? "w-1/3 min-w-[350px]" : "w-0"
        )}
      >
        <div className="px-8 pb-28 pt-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm font-semibold uppercase [&>*]:pb-2">
                <th></th>
                <th>Topics</th>
              </tr>
            </thead>
            <tbody>
              {topics.map(({ topic, start_time }, index) => (
                <tr
                  key={`topic-${index}`}
                  className="cursor-pointer border-y border-secondary hover:border-primary hover:bg-paper-light hover:font-medium [&>*]:py-2"
                  tabIndex={0}
                  onClick={() => onSelect(start_time)}
                >
                  <td className="pr-8">
                    {convertMillisecondsToDisplayFriendly(start_time)}
                  </td>
                  <td>{topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="mb-2 mt-8 text-sm font-semibold uppercase">
            Citations
          </h2>
          {citations &&
            citations.map(({ citation, sequence }) => (
              <button
                key={`citation-${sequence}`}
                className="text-left"
                onClick={() => onSelectSequence(sequence)}
              >
                {citation}
              </button>
            ))}
        </div>
      </div>
      {isPanelOpen && (
        <div
          className="bg-paper-translucent fixed inset-0 z-10 transition-opacity duration-300 ease-in-out"
          onClick={togglePanel}
        ></div>
      )}
    </>
  );
};

export default TableOfContent;
