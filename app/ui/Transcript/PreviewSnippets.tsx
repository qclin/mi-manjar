import { Utterance } from "@/app/lib/definitions";

type Props = {
  snippets: Utterance[];
};

const PreviewSnippets = ({ snippets }: Props) => {
  return (
    <div>
      <ul className="rounded-lg border border-black bg-white p-2 dark:border-white dark:bg-black">
        {snippets.map(({ text, speaker, sequence }) => (
          <li key={`preview-${sequence}`}>
            <div className="flex">
              <span className="mr-4">{speaker.charAt(0)}:</span>
              <p className="line-clamp-2">{text}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className="p-2">
        {snippets.map(({ text_en, speaker, sequence }) => (
          <li key={`preview-${sequence}-english`}>
            <div className="flex">
              <span className="mr-4">{speaker.charAt(0)}:</span>
              <p className="line-clamp-3">{text_en}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewSnippets;
