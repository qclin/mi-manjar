import React, { useState } from "react";
import { CurrentRefinements } from "react-instantsearch";
import RefinementList from "./RefinementList";
import clsx from "clsx";

import ToggleIcon from "../ToggleIcon";

export const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => setIsOpen(!isOpen);
  return (
    <section className="container mx-auto mt-4 md:mt-8">
      <div className="mx-4 mb-10 flex items-center md:mx-0 md:mb-4">
        <button
          onClick={togglePanel}
          className="mr-3 rounded-lg border border-primary px-3 py-1 uppercase hover:bg-white dark:hover:bg-black"
        >
          filter
        </button>
        <ToggleIcon
          isOpen={isOpen}
          altText={isOpen ? "close" : "open" + " filter panel"}
        />
      </div>
      <CurrentRefinements />
      <div
        className={clsx(isOpen ? "mb-24 h-auto" : "h-0 overflow-hidden", "")}
      >
        <RefinementList
          attribute="key_figures"
          limit={22}
          transformItems={(items) => items.filter((item) => item.count > 2)}
          title="Key figures"
          square
        />
        <RefinementList
          attribute="keywords"
          limit={10}
          showMore
          showMoreLimit={100}
          // transformItems={(items) => items.filter((item) => item.count > 2)}
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
          square
        />
      </div>
    </section>
  );
};
