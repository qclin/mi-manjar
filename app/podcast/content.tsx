"use client";
import Link from "next/link";
import type {
  Overview,
  TranslatedString,
  SeasonOverview,
} from "../lib/definitions";
import { SeasonIndex } from "../lib/definitions";
import useLangugageToggle from "../ui/useLanguageToggle";

type ListProp = {
  index: number;
  language: keyof TranslatedString;
  list: Overview[];
};

const SeasonList = ({ index, list, language }: ListProp) => (
  <section className="relative h-screen overflow-y-scroll">
    <div className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 transform">
      <p className="px-4 py-2 underline">
        {language === "es" ? "Temporada" : "Season"} {index}
      </p>
    </div>
    <ul className="ml-14">
      {list.map(({ title, season, episode, summary, duration }) => (
        <li key={`season-${season}-episode-${episode}`} className="mb-16">
          <Link href={`podcast/${season}/${episode}`}>
            {" "}
            <h3 className="text-lg">{title[language]}</h3>
            <span className="text-sm uppercase text-gray-500">
              {language === "es" ? "T" : "S"}
              {season} - EP{episode} · {duration}
            </span>
            <p className="line-clamp-3 max-w-prose text-sm text-gray-700">
              {summary[language]}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const Content = ({ data }: { data: SeasonOverview }) => {
  const [selectedLanguage, Toggler] = useLangugageToggle();

  return (
    <>
      <div className="fixed right-0 top-0 m-3">
        <Toggler />
      </div>
      <div>
        {[1, 2, 3, 4].map((index) => (
          <SeasonList
            key={`season-${index}`}
            index={index}
            language={selectedLanguage}
            list={data[`season_${index}` as SeasonIndex]}
          />
        ))}
      </div>
    </>
  );
};

export default Content;
