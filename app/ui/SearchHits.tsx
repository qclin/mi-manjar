import React, { useContext } from "react";
import type { BaseHit, Hit } from "instantsearch.js";
import { Snippet, useHits } from "react-instantsearch";
import { convertMillisecondsToDisplayFriendly } from "../lib/helpers";
import { LanguageContext } from "./useLanguageToggle";
import { SupportedLanguage, UtteranceSearch } from "@/app/lib/definitions";
import { ResultsDisplayText } from "@/app/lib/constants";
import EpisodeTag from "./EpisodeTag";

type UtteranceHit = Hit<UtteranceSearch & BaseHit>;

const Hit = ({ hit }: { hit: UtteranceHit }) => {
  const selectedLanguage = useContext(LanguageContext);
  const textAttributeToDisplay =
    selectedLanguage === SupportedLanguage.english ? "text_en" : "text";

  return (
    <div className="my-2 max-w-prose border-b pb-2">
      <Snippet hit={hit} attribute={textAttributeToDisplay} className="block" />
      <EpisodeTag
        season={hit.season}
        episode={hit.episode}
        time={convertMillisecondsToDisplayFriendly(hit.start)}
        className="text-xs font-medium text-gray-400"
      />
    </div>
  );
};

const SearchHits = () => {
  const { hits, results } = useHits();
  const selectedLanguage = useContext(LanguageContext);
  const resultCount = results?.nbHits;

  return (
    <>
      {resultCount}{" "}
      {(resultCount && resultCount > 1) || resultCount === 0
        ? ResultsDisplayText[selectedLanguage].plural
        : ResultsDisplayText[selectedLanguage].singular}
      {hits.map((h) => (
        <Hit hit={h as UtteranceHit} key={h.objectID} />
      ))}
    </>
  );
};

export default SearchHits;
