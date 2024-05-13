import { Overview } from "@/app/lib/definitions";
import React, { useState, ReactNode } from "react";
import downIcon from "../../public/down.svg";
import Image from "next/image";
import useLangugageToggle from "./useLanguageToggle";
import { EpisodeDisplayText, SeasonDisplayText } from "../lib/constants";

interface Props {
  children: ReactNode;
  overview: Overview;
}

const SummaryPanel: React.FC<Props> = ({ children, overview }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedLanguage, LanguageToggler] = useLangugageToggle();
  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 p-2">
      <div className="bg-white">
        <button onClick={togglePanel} className="flex px-10 pt-2">
          <div className="text-start">
            <h1 className="flex items-center text-lg font-medium text-slate-900 dark:text-white">
              {overview.title[selectedLanguage]}
              <Image src={downIcon} alt="expand panel" width={24} height={24} />
            </h1>
            <div className="text-xs font-light uppercase text-slate-500 dark:text-slate-400">
              season {overview.season}, episode {overview.episode}
            </div>
          </div>
        </button>
        {children}
      </div>
      <div
        className={`fixed inset-x-0 bottom-0 z-20 transform bg-white shadow-md transition-transform duration-300 ease-in-out dark:bg-slate-800 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="px-20 py-8">
          <div className="flex justify-between"> 
          <h1 className="mt-5 text-xl font-medium text-slate-900 dark:text-white">
            {overview.title[selectedLanguage]}
          </h1>
          <LanguageToggler/>
          </div>
          <div className="mb-6 text-xs font-light uppercase text-slate-500 dark:text-slate-400">
            {SeasonDisplayText[selectedLanguage]} {overview.season},{" "}
            {EpisodeDisplayText[selectedLanguage]} {overview.episode}
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {overview.summary[selectedLanguage]}
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={togglePanel}
        ></div>
      )}
    </div>
  );
};

export default SummaryPanel;
