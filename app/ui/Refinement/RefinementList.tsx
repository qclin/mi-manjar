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

const RefinementList = ({title, square, ...rest}: UseRefinementListProps & Props) => {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList(rest);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
   

    const updateFiler = useCallback(
      (attribute: string, value: string) => {

        const currentParams = new URLSearchParams(searchParams?.toString());
        let values = currentParams.getAll(attribute)
        console.log((values));
        
        if(values.includes(value)){
          values = values.filter(v => v !== value); 
        }else{
          values.push(value); 
        }
        currentParams.delete(attribute); 
        values.forEach(v => currentParams.append(attribute, v)); 

        refine(value)
        // router.replace(`${pathname}?${currentParams.toString()}`)
        
      },
      [searchParams, router, refine, items]
    )
 
    
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
            : "flex-wrap space-x-2 space-y-2",
          "flex"
        )}
      >
        {items.map((item) => (
          <li key={item.label}>
            <label
              className={
                clsx(
                  item.isRefined ? "bg-paper-dark border-white dark:border-black" : "border-primary",
                  square
                    ? "h-36 w-36 overflow-hidden rounded-md hover:bg-paper-dark"
                    : "rounded-full bg-white px-4 dark:bg-black",
                  "relative flex cursor-pointer items-center justify-center border text-primary hover:text-primary"
                )
              }
              onClick={() => updateFiler(rest.attribute, item.value)}
            >

              {square ? (
                <>
                  <Image
                    src={`/${title?.toLowerCase()}/${item.label}.webp`}
                    alt=""
                    width={180}
                    height={180}
                    className="saturate-50 max-w-[none] w-auto h-auto"
                  />
                  <span className="absolute text-center font-semibold text-white bottom-0 mb-3">
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
          className="float-right font-sans text-sm hover:underline"
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
