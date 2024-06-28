"use client";

import { ASEntity, Entity, Utterance } from "../../lib/definitions";
import HighlightSequence from "./HighlightSequence";
import EntitySequence from "./EntitySequence";
import { useTranscriptContext } from "./TranscriptContext";

type Props = {
  utterance: Utterance;
  entities: ASEntity[];
  translatedEntities: Entity[];
};

const TranscriptionLog = ({
  utterance,
  entities,
  translatedEntities,
}: Props) => {
  const { sequence, speaker, text, text_en, words, start } = utterance;
  const { currentTime, currentSequence, onSelect } = useTranscriptContext();
  const isActive = currentSequence === sequence;

  const renderTextOrEntities = (
    text: string,
    entities: ASEntity[] | Entity[]
  ) => {
    return entities.length > 0 ? (
      <EntitySequence text={text} entities={entities} />
    ) : (
      <span>{text}</span>
    );
  };

  return (
    <div id={`sequence-${sequence}`} className="my-2 grid grid-cols-10 gap-4">
      <span className="text-secondary">{speaker}</span>
      <div className="col-span-9">
        {isActive ? (
          <HighlightSequence
            text={text}
            textTranslated={text_en || ""}
            words={words}
            currentTime={currentTime}
            entities={entities}
          />
        ) : (
          <p className="w-full appearance-none" onClick={() => onSelect(start)}>
            <div className="grid grid-cols-2 gap-8">
              {renderTextOrEntities(text, entities)}
              {renderTextOrEntities(text_en || "", translatedEntities)}
            </div>
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionLog;
