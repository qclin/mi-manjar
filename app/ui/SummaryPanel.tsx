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

  const [selectedLanguage, LanguageToggler] = useLangugageToggle();
  const togglePanel = () => setIsOpen(!isOpen);

  const tagClassname = clsx("text-xs uppercase text-secondary");

  const EpisodeTag = () => (
    <div className={tagClassname}>
      {SeasonDisplayText[selectedLanguage]} {overview.season},{" "}
      {EpisodeDisplayText[selectedLanguage]} {overview.episode}
    </div>
  );

  const OverviewInfo = () => (
    <div className="flex flex-wrap md:flex-wrap-none justify-between items-center">
      <div className="flex items-center mb-2 md:mb-0">
        <ToggleIcon
          isOpen={isOpen}
          altText={isOpen ? "close" : "open" + " summary panel"}
        />
        <span className="hidden md:block ml-4">Summary</span>
        <h1 className="block md:hidden ml-3 text-left">{overview.title[selectedLanguage]}</h1>
      </div>
      
      <h1 className="text-left hidden md:block">{overview.title.es}</h1>
      <h1 className="text-left hidden md:block">{overview.title.en}</h1>
      
      <p className="flex items-baseline justify-between w-full md:w-auto">
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
      <div className={clsx("bg-paper-light", styles.backgroundText)}>
        <button onClick={togglePanel} className="w-full px-3 md:px-10 py-3">
          <OverviewInfo />
        </button>
        {children}
      </div>
      <div
        className={clsx(
          "inset-x-0 bottom-0 z-20 transform shadow-md transition-transform overflow-y-auto h-2/3 md:h-auto max-h-[90vh]",
          isOpen ? "translate-y-0 " : "translate-y-full",
          styles.backgroundText,
          styles.panelTransition
        )}
      >
        <div className="p-4 pt-8 md:px-10 md:py-8">
          <OverviewInfo />
          <LanguageToggler className="block md:hidden absolute right-4 top-2" />
          <div className="hidden md:flex  mx-auto mt-2 gap-8 text-sm text-secondary">
            <p className="max-w-prose">{overview.summary.es}</p>
            <p className="max-w-prose">{overview.summary.en}</p>
          </div>
          <p className="block md:hidden text-sm text-secondary my-4">{overview.summary[selectedLanguage]}</p>
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
