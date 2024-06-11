"use client";
import clsx from "clsx";
import { SupportedLanguage } from "../lib/definitions";
import { useState, createContext } from "react";

const defaultLanguage = SupportedLanguage.spanish;
export const LanguageContext = createContext(defaultLanguage);

function useLangugageToggle(): [
  SupportedLanguage,
  ({ className }: { className: string }) => JSX.Element,
] {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const Toggler = ({ className }: { className: string }) => {
    return (
      <div className={clsx("flex align-baseline", className)}>
        {Object.values(SupportedLanguage).map((lang) => (
          <button
            onClick={() => setSelectedLanguage(lang)}
            key={lang}
            className={clsx(
              selectedLanguage === lang ? "font-medium underline" : "",
              "h-fit px-1 uppercase hover:underline"
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
