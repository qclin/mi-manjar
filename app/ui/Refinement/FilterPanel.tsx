import React, { useState } from "react";
import { CurrentRefinements } from "react-instantsearch";
import RefinementList from "./RefinementList";
import clsx from "clsx";

export const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => setIsOpen(!isOpen);
  return (
    <section>
      <button onClick={togglePanel}>Filter</button>
      <CurrentRefinements />
      <div className={clsx(isOpen ? "h-100 p-8" : "h-0 overflow-hidden", '')}>
        <RefinementList
          attribute="key_figures"
          limit={10}
          showMore
          showMoreLimit={100}
          title="Key figures"
        />
        <RefinementList
          attribute="keywords"
          limit={10}
          showMore
          showMoreLimit={100}
          title="Keywords"
        />
        <RefinementList
          attribute="literature"
          limit={5}
          showMore
          showMoreLimit={20}
          title="Literature"
        />
        <RefinementList attribute="objects" showMore={false} title="Objects" />
        <RefinementList
          attribute="paintings"
          showMore={false}
          title="Paintings"
        />
      </div>
    </section>
  );
};
