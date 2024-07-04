import { Overview } from "../lib/definitions";
import PlayIcon from "@/public/icons/play.svg";
import { convertMinutesSecondsToHoursMinutesSeconds } from "../lib/helpers";
import React from "react";

type Props = {
  overview: Overview;
  onClick(season: number, episode: number, title: string): void;
};

const EpisodeListItem = ({ overview, onClick }: Props) => {
  const { title, season, episode, release_date, duration, words_per_minute } =
    overview;
  return (
    <li
      className="border-b px-4 py-2"
      onClick={() => onClick(season, episode, title.es)}
    >
      <div className="mb-4 flex items-center text-primary">
        <PlayIcon className="w-8" alt="play audio" size={24} />
        <div className="max-w-[90%]">
          <p>{title.es}</p>
          <span className="italic">{title.en}</span>
        </div>
      </div>
      <div className="ml-8 flex justify-between text-sm uppercase text-secondary">
        <span>{new Date(release_date).toLocaleDateString()}</span>
        <span>
          S{season} - EP {episode}
        </span>
        <span> {convertMinutesSecondsToHoursMinutesSeconds(duration)}</span>
        <span>{words_per_minute} wpm</span>
      </div>
    </li>
  );
};

export default React.memo(EpisodeListItem);
