import clsx from "clsx";
import React from "react";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";

type Props = {
  square?: boolean;
  title?: string;
};

const RefinementList = (props: UseRefinementListProps & Props) => {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList(props);

  if (items.length === 0) return <></>;
  return (
    <div className="">
      <h3 className="boder-b-primary my-4 border-b font-medium uppercase">
        {props.title}
      </h3>
      <ul
        className={clsx(
          props.square
            ? "w-full space-x-4 overflow-x-scroll"
            : "flex-wrap space-x-2 space-y-2",
          "flex"
        )}
      >
        {items.map((item) => (
          <li key={item.label}>
            <label
              className={clsx(
                props.square
                  ? "h-32 w-32 rounded-md px-1 hover:bg-paper-dark"
                  : "rounded-full px-4",
                item.isRefined ? "bg-paper-dark" : "border-secondary",
                "relative flex cursor-pointer items-center justify-center border text-secondary hover:text-primary"
              )}
              onClick={() => refine(item.value)}
            >
              <input
                type="checkbox"
                checked={item.isRefined}
                className="absolute h-full w-full cursor-pointer opacity-0"
                aria-labelledby={`${item.label}-label`}
              />
              <span id="culture-label" className="text-center">
                {item.label}
              </span>
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
