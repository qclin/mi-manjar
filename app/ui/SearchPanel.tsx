import React, { ReactElement } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, useInstantSearch, Pagination } from 'react-instantsearch';
import SearchHits from './SearchHits';
import { TranslatedString } from '../lib/definitions';


const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '', 
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

function EmptyQueryBoundary({ children } : {children: ReactElement }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
        <div hidden>{children}</div>
    );
  }

  return children;
}


const SearchPanel = () => {

  return (
    <InstantSearch searchClient={searchClient} indexName="utterances">
      <SearchBox/>
      <EmptyQueryBoundary>
        <>
          <SearchHits /> 
          <Pagination className='flex flex-row'/>
        </>
      </EmptyQueryBoundary>
    </InstantSearch>
  );
}

export default SearchPanel
