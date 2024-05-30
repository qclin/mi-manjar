import React, { useContext } from "react";
import type { BaseHit, Hit } from "instantsearch.js";
import { Snippet, useHits } from "react-instantsearch";
import { convertMillisecondsToDisplayFriendly } from "../lib/helpers";
import { LanguageContext } from "./useLanguageToggle";
import { SupportedLanguage, UtteranceSearch } from "@/app/lib/definitions";
import { ResultsDisplayText } from "@/app/lib/constants";
import EpisodeTag from "./EpisodeTag";
import Link from "next/link";

type UtteranceHit = Hit<UtteranceSearch & BaseHit>;

const CustomHit = ({ hit }: { hit: UtteranceHit }) => {
  const selectedLanguage = useContext(LanguageContext);
  const textAttributeToDisplay =
    selectedLanguage === SupportedLanguage.english ? "text_en" : "text";

  return (
    <li className="my-2 max-w-prose border-b py-2">
      <Link href={`podcast/${hit.season}/${hit.episode}?start=${hit.start}`}>
        <Snippet
          hit={hit}
          attribute={textAttributeToDisplay}
          className="block"
        />
        <EpisodeTag
          season={hit.season}
          episode={hit.episode}
          time={convertMillisecondsToDisplayFriendly(hit.start)}
          className="text-sm font-medium text-secondary"
        />
      </Link>
    </li>
  );
};

const SearchHits = () => {
  const { hits, results } = useHits();
  const selectedLanguage = useContext(LanguageContext);
  const resultCount = results?.nbHits;

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
    </section>
  );
};

export default SearchHits;
