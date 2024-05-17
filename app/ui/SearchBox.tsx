import React, { useState, useRef } from "react";
import {
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";
import { MoonIcon } from "./icons";
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
        className="w-96 border-0 bg-gray-300 px-2 py-1 focus:outline-none"
      />
      <button type="reset" hidden={inputValue.length === 0 || isSearchStalled}>
        X
      </button>
      <MoonIcon alt="reset search" size={24} className="ml-3 inline" />
      <span hidden={!isSearchStalled}>Searching…</span>
    </form>
  );
}

export default CustomSearchBox;
