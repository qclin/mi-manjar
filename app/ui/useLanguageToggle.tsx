"use client";
import clsx from "clsx";
import { Supported_Language, TranslatedString } from "../lib/definitions";
import { useState } from "react";

function useLangugageToggle(): [keyof TranslatedString, () => JSX.Element] {
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof TranslatedString>("es");

  const Toggler = () => {
    return (
      <div className="flex align-baseline">
        {Object.values(Supported_Language).map((lang) => (
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
