import { Overview, SupportedLanguage } from "@/app/lib/definitions";
import { EpisodeDisplayText, SeasonDisplayText } from "@/app/lib/constants";

type Props = {
  overview: Overview;
  selectedLanguage: SupportedLanguage;
};

const EpisodeMetaTag = ({ overview, selectedLanguage }: Props) => {
  const tagClassname = "text-xs uppercase text-secondary";
  const seasonText = `${SeasonDisplayText[selectedLanguage]} ${overview.season}`;
  const episodeText = `${EpisodeDisplayText[selectedLanguage]} ${overview.episode}`;
  const wpmText = overview.words_per_minute
    ? `${overview.words_per_minute} wpm`
    : "";

  return (
    <div className="flex w-full items-baseline justify-between md:w-auto md:gap-4">
      <p className={tagClassname}>
        {seasonText}, {episodeText}
      </p>
      {wpmText && <span className={tagClassname}>{wpmText}</span>}
    </div>
  );
};

export default EpisodeMetaTag;
