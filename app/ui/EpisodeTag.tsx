import { useContext } from "react";
import { LanguageContext } from "@/app/ui/useLanguageToggle";
import { SupportedLanguage } from "../lib/definitions";

type Props = {
  season: number;
  episode: number;
  time: string;
  className: string;
};

const EpisodeTag = ({ season, episode, time, className }: Props) => {
  const selectedLanguage = useContext(LanguageContext);

  return (
    <span className={className}>
      {selectedLanguage === SupportedLanguage.spanish
        ? `T${season} - E${episode} · ${time}`
        : `S${season} - EP${episode} · ${time}`}
    </span>
  );
};

export default EpisodeTag;
