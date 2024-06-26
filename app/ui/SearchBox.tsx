import React, { useState, useRef } from "react";
import {
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";
import "./customSearch.css";

function CustomSearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === "stalled";

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);
    refine(newQuery);
  };

  return (
    <form
      action=""
      role="search"
      className="mx-auto"
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
        setQuery("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <span className="mx-2 uppercase">Search</span>
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
        className="w-[75%] border-0 bg-paper-dark px-2 py-1 text-primary focus:outline-none md:w-96"
      />
      <button
        className="absolute right-4 px-2 pt-1"
        type="reset"
        hidden={inputValue.length === 0 || isSearchStalled}
      >
        X
      </button>
      <span hidden={!isSearchStalled}>Searching…</span>
    </form>
  );
}

export default CustomSearchBox;
