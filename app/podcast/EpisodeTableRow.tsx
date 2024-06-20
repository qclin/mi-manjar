import clsx from "clsx";
import { TopicFilter, Overview } from "../lib/definitions";
import { useAppContext } from "@/app/ui/AppContext";
import { useRouter } from "next/navigation";
import PlayIcon from "@/public/icons/play.svg";

type Props = {
  topic?: TopicFilter;
  overview: Overview;
};

const EpisodeTableRow = ({ topic, overview }: Props) => {
  const { title, season, episode, release_date, duration, words_per_minute } =
    overview;

  const router = useRouter();
  const { setNavigationState } = useAppContext();

  const handleNavigation = (season: number, episode: number, title: string) => {
    const stateData = { season, episode, title };
    setNavigationState(stateData);
    router.push(`podcast/${season}/${episode}`);
  };

  return (
    <>
      <tr
        onClick={() => handleNavigation(season, episode, title.es)}
        className="flex flex-wrap items-start border-b hover:bg-paper-dark md:table [&>*]:cursor-pointer"
      >
        <td className="w-8 px-2">
          <PlayIcon alt="play audio" size={24} className="text-primary" />
        </td>
        <td className="inline max-w-[80%] text-primary md:p-2">{title.es}</td>
        <td className="ml-8 w-full max-w-[80%]  italic text-primary md:w-auto md:not-italic">
          {title.en}
        </td>
        <td className="p-2 text-sm text-secondary">
          {new Date(release_date).toLocaleDateString()}
        </td>
        <td className="p-2 text-sm text-secondary">
          S{season} - EP {episode}
        </td>
        <td className="p-2 text-sm uppercase text-secondary">{duration}</td>
        <td className="p-2 text-sm uppercase text-secondary">
          {words_per_minute} wpm
        </td>
      </tr>
    </>
  );
};

export default EpisodeTableRow;
