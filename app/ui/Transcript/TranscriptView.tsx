import { ASEntity, Entity, Transcription } from "@/app/lib/definitions";
import TranscriptionLog from "./TranscriptionLog";
import ExpandableView from "../ExpandableView";
import PreviewSnippets from "./PreviewSnippets";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useTranscriptContext } from "./TranscriptContext";
import { useMemo } from "react";
import HighlightSequence from "./HighlightSequence";
import { filterEntitiesBySequence } from "./utils";

type Props = {
  isLoading: boolean;
  transcription: Transcription;
  translatedEntities: Entity[];
};

const TranscriptView = ({ isLoading, ...rest }: Props) => {
  const isMobile = useIsMobile();
  const { currentSequence, currentTime } = useTranscriptContext();
  const { transcription, translatedEntities } = rest;
  const { entities, utterances } = transcription;

  const activeIndex = useMemo(() => {
    const index = utterances.findIndex(
      ({ sequence }) => sequence === currentSequence
    );
    return index > -1 ? index : 1;
  }, [currentSequence]);

  if (isLoading) return <p> ... Loading audio file</p>;

  if (isMobile) {
    const activeUtterance = utterances[activeIndex];
    const { selectedEntities } = filterEntitiesBySequence(
      entities,
      translatedEntities,
      currentSequence
    );

    const { text, text_en, words } = activeUtterance;
    return (
      <ExpandableView
        title="transcription"
        preview={
          <PreviewSnippets
            snippets={utterances.slice(activeIndex, activeIndex + 2)}
          />
        }
      >
        <HighlightSequence
          text={text}
          textTranslated={text_en || ""}
          words={words}
          currentTime={currentTime}
          entities={selectedEntities}
        />
      </ExpandableView>
    );
  }

  return (
    <section className="p-3 text-primary md:p-12 md:pb-36">
      {utterances.map((utterance) => {
        const { selectedEntities, selectedTranslatedEntities } =
          filterEntitiesBySequence(
            entities,
            translatedEntities,
            utterance.sequence
          );
        return (
          <TranscriptionLog
            key={utterance.sequence}
            entities={selectedEntities}
            translatedEntities={selectedTranslatedEntities}
            utterance={utterance}
          />
        );
      })}
    </section>
  );
};

export default TranscriptView;
