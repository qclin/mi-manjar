import React from "react";
import { ASEntity, Entity } from "@/app/lib/definitions";
import { getASClassnames, getClassnames } from "./types";

interface Props {
  text: string;
  entities: ASEntity[] | Entity[];
}

const textToCheck = (entity: Entity | ASEntity) =>
  "text" in entity ? entity.text : entity.entity;

const getClassNamesByType = (entity: Entity | ASEntity) =>
  "entity_type" in entity
    ? getASClassnames(entity.entity_type)
    : getClassnames(entity.type);

const EntitySequence: React.FC<Props> = ({ text, entities }) => {
  // Function to escape special characters in regex patterns
  const escapeRegExp = (text: string) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // Build a regex pattern from the entitys and map them to their colors
  const entityPatterns = entities
    .filter((entity) => textToCheck(entity).length >= 3)
    .map((entity) => ({
      pattern: new RegExp(escapeRegExp(textToCheck(entity)), "gi"),
      color: getClassNamesByType(entity),
    }));

  const tokens = [];
  let lastOffset = 0;

  text.replace(
    new RegExp(entityPatterns.map((p) => p.pattern.source).join("|"), "gi"),
    (match, offset) => {
      const entityDetail = entityPatterns.find((p) => p.pattern.test(match));
      const className = entityDetail ? entityDetail.color : "bg-pink";

      // Push previous non-matching text if any
      tokens.push(<span>{text.slice(lastOffset, offset)}</span>);

      // Push highlighted text
      tokens.push(
        <span key={offset + "h"} className={className}>
          {match}
        </span>
      );

      lastOffset = offset + match.length;
      return match;
    }
  );

  // Push any trailing text
  tokens.push(<span>{text.slice(lastOffset)}</span>);

  return <div>{tokens}</div>;
};

export default EntitySequence;
