import React, { useState } from "react";
import { CurrentRefinements } from "react-instantsearch";
import RefinementList from "./RefinementList";
import clsx from "clsx";
import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/Minus.svg";

export const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => setIsOpen(!isOpen);
  return (
    <section className="container mx-auto mt-8">
      <div className="mb-4 flex items-center">
        <button
          onClick={togglePanel}
          className="mr-3 rounded-md border border-primary px-3 py-1 uppercase hover:bg-white dark:hover:bg-black"
        >
          filter
        </button>
        {isOpen ? (
          <MinusIcon alt="close filter panel" />
        ) : (
          <PlusIcon alt="open filter panel" />
        )}
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
