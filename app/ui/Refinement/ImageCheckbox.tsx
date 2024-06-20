import clsx from "clsx";
import React from "react";
import Image from "next/image";

type Props = {
  label: string;
  isChecked: boolean;
  onClick(): void;
  className: string;
};

const ImageCheckbox = ({ label, isChecked, onClick, className }: Props) => {
  console.log(isChecked);
  return (
    <label
      className={clsx(
        "h-36 w-36 overflow-hidden rounded-md hover:bg-paper-dark",
        className
      )}
      onClick={onClick}
    >
      <input
        type="checkbox"
        checked={isChecked}
        className="absolute h-full w-full cursor-pointer opacity-0"
        aria-labelledby={`${label}-label`}
      />
      <Image
        src={`/paintings/${label}.webp`}
        alt=""
        width={180}
        height={180}
        className="saturate-50"
      />
      <span className="z-5 absolute bottom-0 text-center font-semibold text-white">
        {label}
      </span>
    </label>
  );
};

export default ImageCheckbox;
