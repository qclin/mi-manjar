import React, { useState, useRef } from 'react';
import { useInstantSearch, useSearchBox, UseSearchBoxProps } from 'react-instantsearch';
import { MoonIcon } from './icons';
import "./customSearch.css";

function CustomSearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === 'stalled';

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    
      <form
        action=""
        role="search"
        className='mx-auto'
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setQuery('');
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        
          <span className='uppercase mx-2'>Search</span>
        <input
          ref={inputRef}
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
          className="w-96 px-2 py-1 border-0 focus:outline-none bg-gray-300"
        />
        <button
          type="reset"
          hidden={inputValue.length === 0 || isSearchStalled}
        >
            X
        </button>
        <MoonIcon alt="reset search" size={24} className='inline ml-3'/>
        <span hidden={!isSearchStalled}>Searching…</span>
      </form>
  );
}

export default CustomSearchBox