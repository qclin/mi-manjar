"use client";
import {
  checkIsMobile,
  convertMillisecondsToDisplayFriendly,
  innerViewportHeightOffset,
} from "@/app/lib/helpers";
import { Highlight } from "@/app/lib/definitions";
import clsx from "clsx";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

interface Props {
  highlight: Highlight;
  onSelect(start_time: number): void;
  onSelectSequence(sequence: number): void;
}

const TableOfContent = ({ highlight, onSelect, onSelectSequence }: Props) => {
  const { citations, topics } = highlight;

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const isMobile = checkIsMobile();

  return (
    <>
      <div className="fixed right-0 top-0 z-20 mx-4 flex md:mx-12">
        <button
          className="flex items-center py-4 uppercase text-primary"
          onClick={togglePanel}
        >
          Index
        </button>
        <DarkModeToggle />
      </div>
      <div
        className={clsx(
          "transition-width fixed right-0 top-[54px] z-20 overflow-y-scroll bg-paper-dark text-primary duration-500 ease-in-out",
          isPanelOpen ? "w-screen md:w-1/3" : "w-0"
        )}
        style={{
          height: `calc(100vh - ${innerViewportHeightOffset()}px)`,
        }}
      >
        <div className="px-2 pb-6 pt-4 md:px-4 md:pb-28">
          <table className="w-full table-auto">
            <thead>
              <tr className="px-2 text-left text-sm font-semibold uppercase md:px-4 [&>*]:pb-2">
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
                  onClick={() => {
                    onSelect(start_time);
                    isMobile && setIsPanelOpen(false);
                  }}
                >
                  <td className="px-2 md:px-4">
                    {convertMillisecondsToDisplayFriendly(start_time)}
                  </td>
                  <td className="pr-2 md:pr-4">{topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="md:mx4 mx-2 mb-2 mt-8">
            <h2 className="text-sm font-semibold uppercase">Citations</h2>
            {citations &&
              citations.map(({ citation, sequence }) => (
                <button
                  key={`citation-${sequence}`}
                  className="text-left"
                  onClick={() => {
                    onSelectSequence(sequence);
                    isMobile && setIsPanelOpen(false);
                  }}
                >
                  {citation}
                </button>
              ))}
          </div>
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
