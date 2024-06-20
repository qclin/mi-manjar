import clsx from "clsx";
import React, { useCallback } from "react";
import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  square?: boolean;
  title?: string;
};

const RefinementList = ({
  title,
  square,
  ...rest
}: UseRefinementListProps & Props) => {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList(rest);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFiler = useCallback(
    (attribute: string, value: string) => {
      const currentParams = new URLSearchParams(searchParams?.toString());
      let values = currentParams.getAll(attribute);
      console.log(values);

      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }
      currentParams.delete(attribute);
      values.forEach((v) => currentParams.append(attribute, v));

      refine(value);
      // router.replace(`${pathname}?${currentParams.toString()}`)
    },
    [searchParams, router, refine, items]
  );

  if (items.length === 0) return <></>;

  return (
    <div className="">
      <h3 className="boder-b-primary textura my-4 border-b text-xl font-medium">
        {title}
      </h3>
      <ul
        className={clsx(
          square
            ? "w-full space-x-4 overflow-x-scroll"
            : "flex flex-wrap gap-2",
          "flex"
        )}
      >
        {items.map((item) => (
          <li key={item.label}>
            <label
              className={clsx(
                item.isRefined
                  ? "border-[#EF3CFF] text-[#EF3CFF] dark:border-primary dark:!bg-lime-700 dark:!text-primary"
                  : "border-primary",
                square
                  ? "h-36 w-36 overflow-hidden rounded-md hover:bg-paper-dark"
                  : "rounded-full bg-white px-4 py-0.5 hover:border-[#EF3CFF] hover:text-[#EF3CFF] dark:bg-black hover:dark:border-primary hover:dark:bg-lime-700 dark:hover:text-primary",
                "relative flex cursor-pointer items-center justify-center border text-primary"
              )}
              onClick={() => updateFiler(rest.attribute, item.value)}
            >
              {square ? (
                <>
                  <Image
                    src={`/${title?.toLowerCase()}/${item.label}.webp`}
                    alt=""
                    width={150}
                    height={150}
                    className="h-auto w-auto max-w-[none] saturate-50"
                  />
                  <span className="absolute bottom-0 mb-3 text-center font-semibold text-white">
                    {item.label}
                  </span>
                </>
              ) : (
                <span className="text-center">{item.label}</span>
              )}
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => {}}
                className="absolute h-full w-full cursor-pointer opacity-0"
                aria-labelledby={`${item.label}-label`}
              />
            </label>
          </li>
        ))}
      </ul>
      {canToggleShowMore && (
        <button
          onClick={toggleShowMore}
          disabled={!canToggleShowMore}
          className="float-right"
        >
          {isShowingMore ? (
            <MinusIcon alt="Show less" />
          ) : (
            <PlusIcon alt="Show more" />
          )}
        </button>
      )}
    </div>
  );
};

export default RefinementList;
