import {
  Overview,
  Supported_Language,
  TranslatedString,
} from "@/app/lib/definitions";
import clsx from "clsx";
import React, { useState, ReactNode } from "react";
import downIcon from "../../public/down.svg";
import Image from "next/image";

interface Props {
  children: ReactNode;
  overview: Overview;
}

const SummaryPanel: React.FC<Props> = ({ children, overview }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof TranslatedString>("es");
  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className="fixed z-30 bottom-4 inset-x-0 p-2">
      <div className="bg-white">
        <button onClick={togglePanel} className="px-10 flex pt-2">
          <div className="text-start">
            <h1 className="text-slate-900 dark:text-white font-medium text-lg flex items-center">
              {overview.title[selectedLanguage]}
              <Image src={downIcon} alt="expand panel" width={24} height={24} />
            </h1>
            <div className="text-slate-500 dark:text-slate-400 font-light uppercase text-xs">
              season {overview.season}, episode {overview.episode}
            </div>
          </div>
        </button>
        {children}
      </div>
      <div
        className={`fixed bottom-0 inset-x-0 z-20 bg-white dark:bg-slate-800 shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="px-20 py-8">
          <div className="flex justify-between">
            <h1 className="text-slate-900 dark:text-white mt-5 text-xl font-medium">
              {overview.title[selectedLanguage]}
            </h1>
            <div className="flex align-baseline">
              {Object.values(Supported_Language).map((lang) => (
                <button
                  onClick={() => setSelectedLanguage(lang)}
                  key={lang}
                  className={clsx(
                    selectedLanguage === lang ? "font-black" : "",
                    "uppercase pl-2 h-fit"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="text-slate-500 dark:text-slate-400 font-light uppercase text-xs mb-6">
            season {overview.season}, episode {overview.episode}
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
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
