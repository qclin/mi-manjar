"use client";
import type { Overview, TranslatedString } from "../lib/definitions";
import useLangugageToggle from "../ui/useLanguageToggle";

type SeasonIndex = "season_1" | "season_2" | "season_3" | "season_4";

type ListProp = {
  index: number;
  language: keyof TranslatedString;
  list: Overview[];
};

const SeasonList = ({ index, list, language }: ListProp) => (
  <section className="relative h-screen overflow-y-scroll">
    <div className="absolute top-1/2 -left-14 -translate-y-1/2 transform -rotate-90">
      <p className="py-2 px-4 underline">
        {language === "es" ? "Temporada":"Season"} {index}
      </p>
    </div>
    <ul className="ml-14">
      {list.map(({ title, season, episode, summary, duration }) => (
        <li key={`season-${season}-episode-${episode}`} className="mb-16">
          <h3 className="text-lg">{title[language]}</h3>
          <span className="text-sm uppercase text-gray-500">
            {language === "es" ? "T" : "S"}
            {season} - EP{episode} · {duration}
          </span>
          <p className="max-w-prose line-clamp-3 text-sm text-gray-700">
            {summary[language]}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

const Content = ({ data }: { data: Record<SeasonIndex, Overview[]> }) => {
  const [selectedLanguage, Toggler] = useLangugageToggle();

  return (
    <>
      <div className="fixed right-0 top-0 m-3">
        <Toggler />
      </div>
      <div>
        {[4, 3, 2, 1].map((index) => (
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
