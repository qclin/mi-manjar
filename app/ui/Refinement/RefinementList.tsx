import React from "react";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";

type Props = {
  title?: string;
};

const RefinementList = (props: UseRefinementListProps & Props) => {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList(props);

  if (items.length === 0) return <></>;
  return (
    <div>
      <h3 className="boder-b-primary my-4 border-b font-medium uppercase">
        {props.title}
      </h3>
      <ul className="flex flex-wrap">
        {items.map((item) => (
          <li key={item.label} className="ml-4">
            <label>
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="mr-1"
              />
              <span>{item.label}</span>
              {item.count > 1 && (
                <span className="font-sans text-sm"> ({item.count})</span>
              )}
            </label>
          </li>
        ))}
      </ul>
      {canToggleShowMore && (
        <button
          onClick={toggleShowMore}
          disabled={!canToggleShowMore}
          className="float-right font-sans text-sm font-medium underline "
        >
          {isShowingMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default RefinementList;
