import { Overview, SupportedLanguage } from "@/app/lib/definitions";
import { EpisodeDisplayText, SeasonDisplayText } from "../../lib/constants";

import clsx from "clsx";
import ToggleIcon from "../ToggleIcon";

type Props = {
  isOpen: boolean;
  selectedLanguage: SupportedLanguage;
  overview: Overview;
};

const OverviewInfo = ({ isOpen, selectedLanguage, overview }: Props) => {
  const tagClassname = clsx("text-xs uppercase text-secondary");

  const EpisodeTag = () => {
    return (
      <div className={tagClassname}>
        {SeasonDisplayText[selectedLanguage]} {overview.season},{" "}
        {EpisodeDisplayText[selectedLanguage]} {overview.episode}
      </div>
    );
  };
  return (
    <div className="md:flex-wrap-none flex flex-wrap items-center justify-between">
      <div className="mb-2 flex items-center md:mb-0">
        <ToggleIcon
          isOpen={isOpen}
          altText={isOpen ? "close" : "open" + " summary panel"}
        />
        <span className="ml-4 hidden md:block">Summary</span>
        <h1 className="ml-3 block text-left md:hidden">
          {overview.title[selectedLanguage]}
        </h1>
      </div>

      <h1 className="hidden text-left md:block">{overview.title.es}</h1>
      <h1 className="hidden text-left md:block">{overview.title.en}</h1>

      <p className="flex w-full items-baseline justify-between md:w-auto">
        <EpisodeTag />
        <span className={tagClassname}>{overview.duration}</span>
        <span className={tagClassname}>
          {overview.words_per_minute ? `${overview.words_per_minute} wpm` : ""}
        </span>
      </p>
    </div>
  );
};

export default OverviewInfo;
