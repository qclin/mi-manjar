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
    <div className="md:flex-wrap-none flex flex-wrap items-center justify-between">
      <div className="mb-2 flex items-center md:mb-0">
        <ToggleIcon
          isOpen={isOpen}
          altText={isOpen ? "close" : "open" + " summary panel"}
        />
        <span className="ml-4 hidden md:block">Summary</span>
        <h1 className="ml-3 block text-left md:hidden">
          {overview.title[selectedLanguage]}
        </h1>
      </div>

      <h1 className="hidden text-left md:block">{overview.title.es}</h1>
      <h1 className="hidden text-left md:block">{overview.title.en}</h1>

      <p className="flex w-full items-baseline justify-between md:w-auto">
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
        <button onClick={togglePanel} className="w-full px-3 py-3 md:px-10">
          <OverviewInfo />
        </button>
        {children}
      </div>
      <div
        className={clsx(
          "inset-x-0 bottom-0 z-20 h-2/3 max-h-[90vh] transform overflow-y-auto shadow-md transition-transform md:h-auto",
          isOpen ? "translate-y-0 " : "translate-y-full",
          styles.backgroundText,
          styles.panelTransition
        )}
      >
        <div className="p-4 pt-8 md:px-10 md:py-8">
          <OverviewInfo />
          <LanguageToggler className="absolute right-4 top-2 block md:hidden" />
          <div className="mx-auto mt-2  hidden gap-8 text-sm text-secondary md:flex">
            <p className="max-w-prose">{overview.summary.es}</p>
            <p className="max-w-prose">{overview.summary.en}</p>
          </div>
          <p className="my-4 block text-sm text-secondary md:hidden">
            {overview.summary[selectedLanguage]}
          </p>
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
