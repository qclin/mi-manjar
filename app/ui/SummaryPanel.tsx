import { Overview } from "@/app/lib/definitions";
import React, { useState, ReactNode } from "react";
import useLangugageToggle from "./useLanguageToggle";
import { EpisodeDisplayText, SeasonDisplayText } from "../lib/constants";

import clsx from "clsx";

interface Props {
  children: ReactNode;
  overview: Overview;
}

const SummaryPanel: React.FC<Props> = ({ children, overview }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedLanguage] = useLangugageToggle();
  const togglePanel = () => setIsOpen(!isOpen);

  const tagClassname = clsx(
    "text-xs uppercase text-slate-500 dark:text-slate-200"
  );
  const EpisodeTag = () => (
    <div className={tagClassname}>
      {SeasonDisplayText[selectedLanguage]} {overview.season},{" "}
      {EpisodeDisplayText[selectedLanguage]} {overview.episode}
    </div>
  );

  const OverviewInfo = () => (
    <div className="grid grid-cols-3 gap-4 items-baseline">
      <h1 className="text-left">{overview.title.es}</h1>
      <h1 className="text-left">{overview.title.en}</h1>
      <p className="flex items-baseline justify-between">
        <EpisodeTag />
        <span className={tagClassname}>{overview.duration}</span>
        <span className={tagClassname}>
          {overview.words_per_minute ? `${overview.words_per_minute} wpm` : ""}
        </span>
      </p>
    </div>
  );
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2">
      <div className="bg-paper-light border-t border-black">
        <button onClick={togglePanel} className="w-full px-10 pt-2">
          <OverviewInfo />
        </button>
        {children}
      </div>
      <div
        className={`bg-paper-light fixed inset-x-0 bottom-0 z-20 transform shadow-md transition-transform duration-300 ease-in-out dark:bg-slate-800 ${
          isOpen ? "translate-y-0 border-t border-black" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="px-10 py-8">
          <OverviewInfo />
          <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-slate-500 dark:text-slate-400">
            <p>{overview.summary.es}</p>
            <p>{overview.summary.en}</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="bg-paper-light fixed inset-0 z-10 bg-opacity-50  transition-opacity duration-300 ease-in-out dark:bg-slate-800"
          onClick={togglePanel}
        ></div>
      )}
    </div>
  );
};

export default SummaryPanel;
