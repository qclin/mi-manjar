import { Entity, Transcription } from "@/app/lib/definitions";
import TranscriptionLog from "./TranscriptionLog";
import ExpandableView from "../ExpandableView";
import PreviewSnippets from "./PreviewSnippets";

type Props = {
  isLoading: boolean;
  transcription: Transcription;
  translatedEntities: Entity[];
};

const TranscriptView = ({ isLoading, ...rest }: Props) => {
  if (isLoading) return <p> ... Loading audio file</p>;

  return (
    <>
      <div className="block md:hidden">
        <ExpandableView
          title="transcription"
          preview={
            <PreviewSnippets
              snippets={rest.transcription.utterances.slice(1, 4)}
            />
          }
        >
          <Content key="mobile" {...rest} />
        </ExpandableView>
      </div>
      <div className="hidden md:block">
        <Content key="desktop" {...rest} />
      </div>
    </>
  );
};

export default TranscriptView;

type ContentProps = {
  key: string;
  transcription: Transcription;
  translatedEntities: Entity[];
};

const Content = ({ key, transcription, translatedEntities }: ContentProps) => {
  const { entities, utterances } = transcription;
  return (
    <section className="p-3 text-primary md:p-12 md:pb-36">
      {utterances.map((utterance) => {
        const seletedEntities = entities.filter(
          (entity) => entity.sequence === utterance.sequence
        );
        const selectedTranslatedEntities = translatedEntities.filter((entity) =>
          entity.sequences.includes(utterance.sequence)
        );
        return (
          <TranscriptionLog
            key={[key, utterance.sequence].join("-")}
            entities={seletedEntities}
            translatedEntities={selectedTranslatedEntities}
            utterance={utterance}
          />
        );
      })}
    </section>
  );
};
