import { Overview, SupportedLanguage } from "@/app/lib/definitions";
import PlayIcon from "@/public/icons/play.svg";
import PauseIcon from "@/public/icons/pause.svg";
import ToggleIcon from "../ToggleIcon";
import useIsMobile from "@/app/hooks/useIsMobile";
import EpisodeMetaTag from "./EpisodeMetaTag";

type Props = {
  isPlaying: boolean;
  isOpen: boolean;
  selectedLanguage: SupportedLanguage;
  overview: Overview;
  onTogglePlayPause(): void;
  onTogglePanel?: () => void;
};

const OverviewInfo = ({
  isPlaying,
  isOpen,
  selectedLanguage,
  overview,
  onTogglePlayPause,
  onTogglePanel,
}: Props) => {
  const isMobile = useIsMobile();

  const PlayPauseButton = () => (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onTogglePlayPause();
      }}
      className="mr-2 md:mr-4"
    >
      {isPlaying ? <PauseIcon className="mx-1" /> : <PlayIcon />}
    </button>
  );

  const EpisodeTitle = ({ language }: { language: SupportedLanguage }) => (
    <h1 className="text-left">{overview.title[language]}</h1>
  );

  if (isMobile) {
    return (
      <div>
        <div className="mb-2 flex w-full items-center justify-between">
          <div className="flex items-center">
            <PlayPauseButton />
            <EpisodeTitle language={selectedLanguage} />
          </div>
          <button onClick={onTogglePanel} className="ml-2">
            <ToggleIcon
              isOpen={isOpen}
              altText={isOpen ? "close" : "open" + " summary panel"}
              size={20}
            />
          </button>
        </div>
        <EpisodeMetaTag
          overview={overview}
          selectedLanguage={selectedLanguage}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="mb-0 flex items-center">
        <PlayPauseButton />
        <EpisodeTitle language={SupportedLanguage.spanish} />
      </div>
      <EpisodeTitle language={SupportedLanguage.english} />
      <EpisodeMetaTag overview={overview} selectedLanguage={selectedLanguage} />
      <ToggleIcon
        isOpen={isOpen}
        altText={isOpen ? "close" : "open" + " summary panel"}
      />
    </div>
  );
};

export default OverviewInfo;
