import juanaDeAustriaImage from "@/public/cover/Juana de Austria.jpeg";
import infantsImage from "@/public/cover/Las infantas Isabel Clara Eugenia y Catalina Micaela.jpeg";
import clsx from "clsx";

import Image from "next/image";

type Props = {
  text: string;
  className?: string;
};

const ImageRoster = [
  {
    src: juanaDeAustriaImage,
    alt: "Juana de Austria, Alonso Sanchez Coello, 1557",
  },
  {
    src: infantsImage,
    alt: "Las infantas Isabel Clara Eugenia y Catalina Micaela, Alonso Sanchez Coello, Museo Nacional del Prado",
  },
];

export const Loader = ({ text, className }: Props) => {
  const randomImage =
    ImageRoster[Math.floor(Math.random() * ImageRoster.length)];
  return (
    <div className="flex h-screen flex-col items-center justify-center text-primary">
      <p className="textura fixed inset-0 top-1/2 z-10 mx-auto w-1/2 text-5xl text-zinc-400 filter">
        {randomImage.alt}
      </p>
      <Image
        src={randomImage.src}
        alt={randomImage.alt}
        className={clsx("max-h-[80vh] w-auto", className)}
      />
      <p className="text-lg">{text}...</p>
    </div>
  );
};
