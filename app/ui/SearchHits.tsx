import React, { useContext } from "react";
import type { BaseHit, Hit } from "instantsearch.js";
import { Snippet, useHits, Pagination } from "react-instantsearch";
import { convertMillisecondsToDisplayFriendly } from "../lib/helpers";
import { LanguageContext } from "./useLanguageToggle";
import { SupportedLanguage, UtteranceSearch } from "@/app/lib/definitions";
import { ResultsDisplayText } from "@/app/lib/constants";
import EpisodeTag from "./EpisodeTag";
import Link from "next/link";
import { useAppContext } from "./AppContext";
type UtteranceHit = Hit<UtteranceSearch & BaseHit>;

const CustomHit = ({ hit }: { hit: UtteranceHit }) => {
  const { episodesList } = useAppContext();

  const selectedLanguage = useContext(LanguageContext);
  const isEnglish = selectedLanguage === SupportedLanguage.english;
  const textAttributeToDisplay = isEnglish ? "text_en" : "text";

  const episode = episodesList.find(
    (ep) => ep.season === hit.season && ep.episode === hit.episode
  );
  const episodeTitle = episode?.title[isEnglish ? "en" : "es"];

  return (
    <li className="my-2 max-w-prose border-b px-2 py-2 md:px-0">
      <Link href={`podcast/${hit.season}/${hit.episode}?start=${hit.start}`}>
        <Snippet
          hit={hit}
          attribute={textAttributeToDisplay}
          className="block"
        />
        <div className="mt-4 flex flex-wrap text-sm text-secondary">
          <EpisodeTag
            season={hit.season}
            episode={hit.episode}
            time={convertMillisecondsToDisplayFriendly(hit.start)}
            className="font-medium"
          />
          <span className="mx-2">|</span>
          <p>{episodeTitle}</p>
        </div>
      </Link>
    </li>
  );
};

const SearchHits = () => {
  const { hits, results } = useHits();
  const selectedLanguage = useContext(LanguageContext);
  const resultCount = results?.nbHits;

  console.log("SearchHits", results, hits);
  

  return (
    <section className="pt-4">
      {resultCount}{" "}
      {(resultCount && resultCount > 1) || resultCount === 0
        ? ResultsDisplayText[selectedLanguage].plural
        : ResultsDisplayText[selectedLanguage].singular}
      <ul>
        {hits.map((h) => (
          <CustomHit hit={h as UtteranceHit} key={h.objectID} />
        ))}
      </ul>
      <Pagination className="[&>ul>*]:px-2 [&>ul]:flex [&>ul]:w-fit [&>ul]:flex-row" hidden={resultCount === 0 || results?.nbPages === 1} />
    </section>
  );
};

export default SearchHits;
