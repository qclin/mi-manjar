import { Overview, SupportedLanguage } from "@/app/lib/definitions";
import { EpisodeDisplayText, SeasonDisplayText } from "@/app/lib/constants";
import PlayIcon from "@/public/icons/play.svg";
import PauseIcon from "@/public/icons/pause.svg";

import clsx from "clsx";
import ToggleIcon from "../ToggleIcon";

type Props = {
  isPlaying: boolean;
  isOpen: boolean;
  selectedLanguage: SupportedLanguage;
  overview: Overview;
  onTogglePlayPause(): void;
};

const OverviewInfo = ({
  isPlaying,
  isOpen,
  selectedLanguage,
  overview,
  onTogglePlayPause,
}: Props) => {
  const tagClassname = clsx("text-xs uppercase text-secondary md:ml-4");

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
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onTogglePlayPause();
          }}
          className="mr-2 md:mr-4"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <h1 className="block text-left md:hidden">
          {overview.title[selectedLanguage]}
        </h1>
        <h1 className="hidden text-left md:block">{overview.title.es}</h1>
      </div>

      <h1 className="hidden text-left md:block">{overview.title.en}</h1>

      <p className="flex w-full items-baseline justify-between md:w-auto">
        <EpisodeTag />
        <span className={tagClassname}>{overview.duration}</span>
        <span className={tagClassname}>
          {overview.words_per_minute ? `${overview.words_per_minute} wpm` : ""}
        </span>
      </p>
      <div className="hidden items-center md:flex">
        {!isOpen && (
          <span className="mr-2 hidden text-sm md:block">Summary</span>
        )}
        <ToggleIcon
          isOpen={isOpen}
          altText={isOpen ? "close" : "open" + " summary panel"}
        />
      </div>
    </div>
  );
};

export default OverviewInfo;
