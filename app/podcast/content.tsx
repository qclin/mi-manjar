"use client";
import Link from "next/link";
import type {
  TranslatedString,
  SeasonOverview,
} from "../lib/definitions";
import useLangugageToggle from "../ui/useLanguageToggle";
import range from "lodash/range";
import Dropdown from "../ui/Dropdown";
import { useState } from "react";

const options =(language: keyof TranslatedString) =>  range(1, 5).sort((a, b) => b-a).map((i) => ({ value: i, label: `${language === "es" ? "Temporada" : "Season"} ${i}`}))


const Content = ({ data }: { data: SeasonOverview }) => {
  const [selectedLanguage, LanguageToggler] = useLangugageToggle();
  const [selectedSeason, setSelectedSeason] = useState(4);

  return (
    <>
      <div className="fixed right-0 top-0 m-3">
        <LanguageToggler />
      </div>
    <section className="relative h-screen overflow-y-scroll px-16 mt-16 ">
      <h1 className="text-5xl font-serif fixed bottom-0 right-0 opacity-10">Las hijas de Felipe</h1>
    <Dropdown<number> label="" options={options(selectedLanguage)} onChange={setSelectedSeason} />
    <ul className="grid divide-gray-400 divide-y max-w-prose">
      {data[`season_${selectedSeason}` as keyof SeasonOverview].map(({ title, season, episode, summary, duration }) => (
        <li key={`season-${season}-episode-${episode}`} className="pt-6 mb-8">
          <Link href={`podcast/${season}/${episode}`}>
            {" "}
            <h3 className="text-lg">{title[selectedLanguage]}</h3>
            <span className="text-sm uppercase text-gray-500">
              {selectedLanguage === "es" ? "T" : "S"}
              {season} - EP{episode} · {duration}
            </span>
            <p className="line-clamp-3 max-w-prose text-sm text-gray-700">
              {summary[selectedLanguage]}
            </p>
          </Link>
        </li>
      ))}
    </ul>
    </section>
    </>
  );
};

export default Content;
