import React, { ReactElement } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  useInstantSearch,
  Pagination,
} from "react-instantsearch";
import SearchHits from "./SearchHits";
import SearchBox from "./SearchBox";
import useLangugageToggle, {
  LanguageContext,
} from "@/app/ui/useLanguageToggle";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ""
);

function EmptyQueryBoundary({ children }: { children: ReactElement }) {
  const { indexUiState } = useInstantSearch();
  if (!indexUiState.query) {
    return <div hidden>{children}</div>;
  }

  return children;
}

const SearchPanel = () => {
  const [selectedLanguage, LanguageToggler] = useLangugageToggle();
  return (
    <LanguageContext.Provider value={selectedLanguage}>
      <InstantSearch searchClient={searchClient} indexName="utterances">
        <div className="flex w-full items-baseline justify-between border-b border-b-primary px-8 py-3 text-primary ">
          <h1 className="textura text-xl">Mi manjar</h1>
          <div className="flex items-baseline">
            <Link href="/about" className="uppercase hover:underline">
              About
            </Link>
            <SearchBox />
            <DarkModeToggle />
          </div>
        </div>
        <EmptyQueryBoundary>
          <div className="fixed right-0 z-20 h-[93vh] max-w-prose overflow-y-scroll bg-paper-dark px-8 pb-12 text-primary">
            <LanguageToggler className="absolute right-12 top-4" />
            <SearchHits />
            <Pagination className="[&>ul>*]:px-2 [&>ul]:flex [&>ul]:w-fit [&>ul]:flex-row" />
          </div>
        </EmptyQueryBoundary>
      </InstantSearch>
    </LanguageContext.Provider>
  );
};

export default SearchPanel;
