import clsx from "clsx";
import React, { useCallback } from "react";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ScrollList from "./ScrollList";
import ToggleIcon from "../ToggleIcon";

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
    [searchParams, refine]
  );

  if (items.length === 0) return <></>;

  const Checkbox = ({
    isRefined,
    label,
  }: {
    isRefined: boolean;
    label: string;
  }) => (
    <input
      type="checkbox"
      checked={isRefined}
      onChange={() => {}}
      className="absolute h-full w-full cursor-pointer opacity-0"
      aria-labelledby={`${label}-label`}
    />
  );
  return (
    <div className="relative">
      <h3 className="boder-b-primary textura my-4 px-4 md:px-0 border-b text-xl font-medium">
        {title}
      </h3>
      {square ? (
        <ScrollList>
          {items.map((item) => (
            <li key={item.label}>
              <label
                className={clsx(
                  item.isRefined
                    ? "border-fuchsia text-fuchsia dark:border-primary dark:!bg-white dark:!text-black"
                    : "border-primary",
                  "h-36 w-36 overflow-hidden rounded-md hover:bg-paper-dark",

                  "group relative flex cursor-pointer snap-center items-center justify-center border text-primary"
                )}
                onClick={() => updateFiler(rest.attribute, item.value)}
              >
                <Image
                  src={`/${title?.toLowerCase()}/${item.label}.webp`}
                  alt=""
                  width={150}
                  height={150}
                  className={clsx(
                    item.isRefined
                      ? "grayscale-0"
                      : "grayscale group-hover:grayscale-0",
                    "h-auto w-auto max-w-[none] saturate-50"
                  )}
                />
                <span className="absolute bottom-0 mb-3 text-center font-semibold text-white">
                  {item.label}
                </span>
                <Checkbox isRefined={item.isRefined} label={item.label} />
              </label>
            </li>
          ))}
        </ScrollList>
      ) : (
        <ul className="flex flex-wrap gap-2 pb-4 px-4 md:px-0">
          {items.map((item) => (
            <li key={item.label}>
              <label
                className={clsx(
                  item.isRefined
                    ? "border-fuchsia text-fuchsia dark:border-primary dark:!bg-white dark:!text-black"
                    : "border-primary",
                  "rounded-full bg-white px-4 py-0.5 hover:border-fuchsia hover:text-fuchsia dark:bg-black hover:dark:border-primary hover:dark:bg-lime-700 dark:hover:text-primary",
                  "relative flex cursor-pointer items-center justify-center border text-primary"
                )}
                onClick={() => updateFiler(rest.attribute, item.value)}
              >
                <span className="text-center">{item.label}</span>
                <Checkbox isRefined={item.isRefined} label={item.label} />
              </label>
            </li>
          ))}
        </ul>
      )}
      {canToggleShowMore && (
        <button
          onClick={toggleShowMore}
          disabled={!canToggleShowMore}
          className="float-right"
        >
          <ToggleIcon altText={isShowingMore? "Show less": "Show more" } isOpen={isShowingMore} />
        </button>
      )}
    </div>
  );
};

export default RefinementList;
