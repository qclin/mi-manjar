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

const searchClient = algoliasearch(
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
        <div className="fixed right-0 top-0">
          <div className="flex items-baseline p-4">
            <SearchBox />
            <LanguageToggler />
          </div>
          <EmptyQueryBoundary>
            <div className="z-50 h-[93vh] max-w-prose overflow-y-scroll bg-white px-8 pb-12">
              <SearchHits />
              <Pagination className="[&>ul>*]:px-2 [&>ul]:flex [&>ul]:w-fit [&>ul]:flex-row" />
            </div>
          </EmptyQueryBoundary>
        </div>
      </InstantSearch>
    </LanguageContext.Provider>
  );
};

export default SearchPanel;
