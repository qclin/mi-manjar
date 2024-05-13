"use client";
import { useState } from "react";
import Link from "next/link";
import range from "lodash/range";
import {
  type TranslatedString,
  type SeasonOverview,
} from "@/app/lib/definitions";
import useLangugageToggle, {
  LanguageContext,
} from "@/app/ui/useLanguageToggle";
import Dropdown from "@/app/ui/Dropdown";
import SearchPanel from "@/app/ui/SearchPanel";
import { SeasonDisplayText } from "@/app/lib/constants";
import EpisodeTag from "../ui/EpisodeTag";

const options = (language: keyof TranslatedString) =>
  range(1, 5)
    .sort((a, b) => b - a)
    .map((i) => ({ value: i, label: `${SeasonDisplayText[language]} ${i}` }));

const Content = ({ data }: { data: SeasonOverview }) => {
  const [selectedLanguage, LanguageToggler] = useLangugageToggle();
  const [selectedSeason, setSelectedSeason] = useState(4);

  return (
    <LanguageContext.Provider value={selectedLanguage}>
      <SearchPanel />
      <div className="fixed right-0 top-0 m-3">
        <LanguageToggler />
      </div>
      <section className="relative mt-16 h-screen overflow-y-scroll px-16 ">
        <Dropdown<number>
          label=""
          options={options(selectedLanguage)}
          onChange={setSelectedSeason}
        />
        <ul className="grid max-w-prose divide-y divide-gray-400">
          {data[`season_${selectedSeason}` as keyof SeasonOverview].map(
            ({ title, season, episode, summary, duration }) => (
              <li
                key={`season-${season}-episode-${episode}`}
                className="mb-8 pt-6"
              >
                <Link href={`podcast/${season}/${episode}`}>
                  <h3 className="text-lg">{title[selectedLanguage]}</h3>
                  <EpisodeTag
                    season={season}
                    episode={episode}
                    time={duration}
                    className="text-sm uppercase text-gray-500"
                  />
                  <p className="line-clamp-3 max-w-prose text-sm text-gray-700">
                    {summary[selectedLanguage]}
                  </p>
                </Link>
              </li>
            )
          )}
        </ul>
      </section>
    </LanguageContext.Provider>
  );
};

export default Content;
