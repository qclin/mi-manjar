import clsx from "clsx";
import { TopicFilter, Overview } from "../lib/definitions";
import { useAppContext } from "@/app/ui/AppContext";
import { useRouter } from "next/navigation";
import { PlayIcon, PlusIcon } from "@/app/ui/icons";

type Props = {
  isExpanded: boolean;
  topic?: TopicFilter;
  overview: Overview;
  onClick(): void;
};

const SummaryTextCell = ({ text }: { text: string }) => (
  <td>
    <p className="line-clamp-5 max-w-prose pr-4 text-sm text-secondary">
      {text}
    </p>
  </td>
);

const EpisodeTableRow = ({ isExpanded, topic, overview, onClick }: Props) => {
  const {
    title,
    season,
    episode,
    summary,
    release_date,
    duration,
    words_per_minute,
  } = overview;

  const { topics, sub_topics, key_figures, keywords } = topic as TopicFilter;
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
        onClick={onClick}
        className="items-start hover:bg-paper-dark [&>*]:cursor-pointer [&>*]:border-b"
      >
        <td className="w-8 px-2">
          <PlayIcon alt="play audio" size={24} className="text-primary" />
        </td>
        <td className="p-2 text-primary">{title.es}</td>
        <td className="text-primary">{title.en}</td>
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
      <tr
        onClick={() => handleNavigation(season, episode, title.es)}
        className={clsx(
          "cursor-pointer hover:bg-paper-dark [&>*]:border-b [&>*]:py-2 [&>*]:align-baseline",
          isExpanded ? "visible" : "hidden"
        )}
      >
        <td></td>
        <SummaryTextCell text={summary.es} />
        <SummaryTextCell text={summary.en} />
        <td colSpan={2} className="max-w-10">
          <dl>
            <dt className="text-sm uppercase text-secondary">Key figures</dt>
            <dd className="pr-2 text-sm text-secondary">
              {key_figures.join(", ")}
            </dd>
          </dl>
        </td>
        <td colSpan={2} className="max-w-10">
          <dl>
            <dt className="text-sm uppercase text-secondary">keywords</dt>
            <dd className="text-sm text-secondary">{keywords.join(", ")}</dd>
          </dl>
        </td>
      </tr>
    </>
  );
};

export default EpisodeTableRow;
