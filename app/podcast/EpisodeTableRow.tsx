import clsx from "clsx";
import { TopicFilter, Overview } from "../lib/definitions";
import { useAppContext } from "@/app/ui/AppContext";
import { useRouter } from "next/navigation";
import PlayIcon from "@/public/icons/play.svg";
import { convertMinutesSecondsToHoursMinutesSeconds } from "../lib/helpers";

type Props = {
  topic?: TopicFilter;
  overview: Overview;
  onClick(season: number, episode: number, title: string): void;
};

const EpisodeTableRow = ({ topic, overview, onClick }: Props) => {
  const { title, season, episode, release_date, duration, words_per_minute } =
    overview;

  return (
    <tr
      onClick={() => onClick(season, episode, title.es)}
      className="border-b py-2 hover:bg-paper-dark [&>*]:cursor-pointer [&>*]:p-2"
    >
      <td className="w-8 px-2">
        <PlayIcon alt="play audio" size={24} className="text-primary" />
      </td>
      <td className="text-primary">{title.es}</td>
      <td className="text-primary">{title.en}</td>
      <td className="text-center text-sm text-secondary">
        {new Date(release_date).toLocaleDateString()}
      </td>
      <td className="text-center text-sm text-secondary">
        S{season} - EP {episode}
      </td>
      <td className="text-right text-sm uppercase text-secondary">
        {convertMinutesSecondsToHoursMinutesSeconds(duration)}
      </td>
      <td className="text-right text-sm uppercase text-secondary">
        {words_per_minute} wpm
      </td>
    </tr>
  );
};

export default EpisodeTableRow;
