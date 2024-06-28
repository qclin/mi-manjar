import { Entity, Transcription } from "@/app/lib/definitions";
import TranscriptionLog from "./TranscriptionLog";
import ExpandableView from "../ExpandableView";
import PreviewSnippets from "./PreviewSnippets";
type Props = {
  isReady: boolean;
  transcription: Transcription;
  translatedEntities: Entity[];
  timeToSkip?: string | null;
};

const TranscriptView = ({
  isReady,
  transcription,
  timeToSkip,
  translatedEntities,
}: Props) => {
  const { entities, utterances } = transcription;

  if (!isReady && timeToSkip) return <p> ... Loading audio file</p>;

  const Content = () => (
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
            key={utterance.sequence}
            entities={seletedEntities}
            translatedEntities={selectedTranslatedEntities}
            utterance={utterance}
          />
        );
      })}
    </section>
  );

  return (
    <>
      <div className="block md:hidden">
        <ExpandableView
          title="transcription"
          preview={
            <PreviewSnippets snippets={transcription.utterances.slice(1, 4)} />
          }
        >
          <Content />
        </ExpandableView>
      </div>
      <div className="hidden md:block">
        <Content />
      </div>
    </>
  );
};

export default TranscriptView;
