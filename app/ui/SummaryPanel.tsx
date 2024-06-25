import { Overview } from "@/app/lib/definitions";
import React, { useState, ReactNode } from "react";
import useLangugageToggle from "./useLanguageToggle";
import { EpisodeDisplayText, SeasonDisplayText } from "../lib/constants";

import clsx from "clsx";
import ToggleIcon from "./ToggleIcon";
interface Props {
  children: ReactNode;
  overview: Overview;
}

const SummaryPanel: React.FC<Props> = ({ children, overview }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedLanguage] = useLangugageToggle();
  const togglePanel = () => setIsOpen(!isOpen);

  const tagClassname = clsx("text-xs uppercase text-secondary");

  const EpisodeTag = () => (
    <div className={tagClassname}>
      {SeasonDisplayText[selectedLanguage]} {overview.season},{" "}
      {EpisodeDisplayText[selectedLanguage]} {overview.episode}
    </div>
  );

  const OverviewInfo = () => (
    <div className="flex justify-between">
      <div className="flex items-center">
        <ToggleIcon
          isOpen={isOpen}
          altText={isOpen ? "close" : "open" + " summary panel"}
        />
        <span className="ml-4">Summary</span>
      </div>
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

  const styles = {
    backgroundText: clsx("border-t border-primary bg-paper-light text-primary"),
    panelTransition: clsx("fixed duration-300 ease-in-out"),
  };

  return (
    <div className="summary-panel fixed inset-x-0 bottom-0 z-30">
      <div className={clsx(" bg-paper-light", styles.backgroundText)}>
        <button onClick={togglePanel} className="w-full px-10 py-2">
          <OverviewInfo />
        </button>
        {children}
      </div>
      <div
        className={clsx(
          "inset-x-0 bottom-0 z-20 transform shadow-md transition-transform",
          isOpen ? "translate-y-0 " : "translate-y-full",
          styles.backgroundText,
          styles.panelTransition
        )}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="px-10 py-8">
          <OverviewInfo />
          <div className="mx-auto mt-2 flex gap-8 text-sm text-secondary">
            <p className="max-w-prose">{overview.summary.es}</p>
            <p className="max-w-prose">{overview.summary.en}</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={clsx(
            "inset-0 z-10 bg-paper-light opacity-50 transition-opacity",
            styles.panelTransition
          )}
          onClick={togglePanel}
        ></div>
      )}
    </div>
  );
};

export default SummaryPanel;
