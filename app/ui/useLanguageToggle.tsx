"use client";
import clsx from "clsx";
import { SupportedLanguage } from "../lib/definitions";
import { useState, createContext } from "react";

const defaultLanguage = SupportedLanguage.spanish;
export const LanguageContext = createContext(defaultLanguage);

function useLangugageToggle(): [SupportedLanguage, () => JSX.Element] {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const Toggler = () => {
    return (
      <div className="flex align-baseline">
        {Object.values(SupportedLanguage).map((lang) => (
          <button
            onClick={() => setSelectedLanguage(lang)}
            key={lang}
            className={clsx(
              selectedLanguage === lang ? "font-medium underline" : "",
              "h-fit pl-2 uppercase"
            )}
          >
            {lang}
          </button>
        ))}
      </div>
    );
  };

  return [selectedLanguage, Toggler];
}

export default useLangugageToggle;
