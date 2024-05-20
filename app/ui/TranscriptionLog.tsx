"use client";

import { ASEntity, Entity, Utterance } from "../lib/definitions";
import HighlightSequence from "./HighlightSequence";
import EntitySequence from "./EntitySequence";

type Props = {
  isActive: boolean;
  currentTime: number;
  utterance: Utterance;
  entities: ASEntity[];
  translatedEntities: Entity[];
  onSelect(start: number): void;
};

const TranscriptionLog = ({
  utterance,
  currentTime,
  isActive,
  entities,
  translatedEntities,
  onSelect,
}: Props) => {
  const { sequence, speaker, text, text_en, words, start } = utterance;
  return (
    <div id={`sequence-${sequence}`} className="my-2 grid grid-cols-10 gap-4">
      <span className="text-gray-600">{speaker}</span>
      <div className="col-span-8">
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
              {entities.length > 0 ? (
                <EntitySequence text={text} entities={entities} />
              ) : (
                <span>{text}</span>
              )}
              {translatedEntities.length > 0 ? (
                <EntitySequence
                  text={text_en || ""}
                  entities={translatedEntities}
                />
              ) : (
                <span>{text_en}</span>
              )}
            </div>
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionLog;
