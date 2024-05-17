import React from "react";
import downIcon from "@/public/icons/down.svg";
import moonIcon from "@/public/icons/moon.svg";
import plusIcon from "@/public/icons/plus.svg";
import playIcon from "@/public/icons/play.svg";
import Image from "next/image";

type Props = {
  size: number;
  alt: string;
  className?: string;
}

export const DownChevronIcon = ({ size, alt, className }: Props) => (
  <Image
    src={downIcon}
    alt={alt}
    width={size}
    height={size}
    className={className}
  />
);

export const MoonIcon = ({ size, alt, className }: Props) => (
  <Image
    src={moonIcon}
    alt={alt}
    width={size}
    height={size}
    className={className}
  />
);
export const PlusIcon = ({ size, alt, className }: Props) => (
  <Image
    src={plusIcon}
    alt={alt}
    width={size}
    height={size}
    className={className}
  />
);

export const PlayIcon = ({ size, alt, className }: Props) => (
  <Image
    src={playIcon}
    alt={alt}
    width={size}
    height={size}
    className={className}
  />
);
