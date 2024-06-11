import React, { useState } from "react";
import { CurrentRefinements } from "react-instantsearch";
import RefinementList from "./RefinementList";
import clsx from "clsx";

export const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => setIsOpen(!isOpen);
  return (
    <section className="container mx-auto mt-12">
      <button onClick={togglePanel} className="uppercase hover:underline">
        filter
      </button>
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
          // transformItems={items =>
          //   items.filter(item => item.count > 2)
          // }
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
