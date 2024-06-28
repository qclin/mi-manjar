import React, { ReactElement } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, useInstantSearch } from "react-instantsearch";
import SearchHits from "./SearchHits";
import SearchBox from "./SearchBox";
import useLangugageToggle, {
  LanguageContext,
} from "@/app/ui/useLanguageToggle";
import DarkModeToggle from "../DarkModeToggle";
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
        <div className="hidden w-full items-baseline justify-between border-b border-b-primary px-8 py-3 text-primary md:flex">
          <h1 className="textura text-xl">Mi manjar</h1>
          <div className="flex items-baseline">
            <Link href="/about" className="uppercase hover:underline">
              About
            </Link>
            <SearchBox />
            <DarkModeToggle />
          </div>
        </div>

        <header
          className="block border-b border-b-primary px-2 py-3 text-primary md:hidden md:px-8"
          id="search-bar"
        >
          <div className="mb-4 flex w-full items-baseline justify-between">
            <h1 className="textura text-xl">Mi manjar</h1>
            <div className="flex items-baseline">
              <Link href="/about" className="uppercase">
                About
              </Link>
              <DarkModeToggle />
            </div>
          </div>
          <SearchBox />
        </header>
        <EmptyQueryBoundary>
          <div className="max-w-screen fixed right-0 z-20 h-[90vh] w-full overflow-y-scroll bg-paper-dark px-2 pb-12 text-primary md:h-[93vh] md:max-w-prose md:px-8">
            <LanguageToggler className="absolute right-4 top-4 md:right-12" />
            <SearchHits />
          </div>
        </EmptyQueryBoundary>
      </InstantSearch>
    </LanguageContext.Provider>
  );
};

export default SearchPanel;
