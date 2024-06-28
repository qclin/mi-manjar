import React from "react";
import { ASEntity, Entity } from "@/app/lib/definitions";
import { getASClassnames, getClassnames } from "./types";

interface Props {
  text: string;
  entities: ASEntity[] | Entity[];
}

const textToCheck = (entity: Entity | ASEntity): string =>
  "text" in entity ? entity.text : entity.entity;

const getClassNamesByType = (entity: Entity | ASEntity): string =>
  "entity_type" in entity
    ? getASClassnames(entity.entity_type)
    : getClassnames(entity.type);

const escapeRegExp = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const EntitySequence: React.FC<Props> = ({ text, entities }) => {
  const entityPatterns = entities
    .filter((entity) => textToCheck(entity).length >= 3)
    .map((entity) => ({
      pattern: new RegExp(escapeRegExp(textToCheck(entity)), "gi"),
      color: getClassNamesByType(entity),
    }));

  const tokens = [];
  let lastOffset = 0;

  const combinedPattern = new RegExp(entityPatterns.map((p) => p.pattern.source).join("|"), "gi");

  let uniqueId = 0; // To generate unique keys

  text.replace(combinedPattern, (match, offset) => {
    const entityDetail = entityPatterns.find((p) => p.pattern.test(match));
    const className = entityDetail ? entityDetail.color : "bg-pink";

    tokens.push(<span key={`non-match-${uniqueId}`}>{text.slice(lastOffset, offset)}</span>);
    uniqueId++;

    tokens.push(
      <span key={`match-${uniqueId}`} className={className}>
        {match}
      </span>
    );
    uniqueId++;

    lastOffset = offset + match.length;
    return match;
  });

  tokens.push(<span key={`non-match-${uniqueId}`}>{text.slice(lastOffset)}</span>);

  return <div>{tokens}</div>;
};

export default EntitySequence;
