import React from "react";
import { Entity } from "@/app/lib/definitions";

interface Props {
  text: string;
  entities: Entity[];
}

enum ColorByEntity {
  Person = "underline decoration-amber-500 decoration-wavy",
  Character = "underline decoration-green-800 decoration-wavy underline-offset-2",
  "Historical Figure" = "underline decoration-rose-800 decoration-wavy decoration-4 underline-offset-4",
  Place = "underline decoration-double decoration-lime-700 bg-lime-100",
  Location = "underline decoration-double decoration-lime-700",
  Group = "underline decoration-solid decoration-4 decoration-sky-700",
  Organization = "underline decoration-solid decoration-4 decoration-sky-700",
  Event = "underline underline-offset-8 decoration-fuchsia-700 bg-fuchsia-100",
  default = "underline decoration-yellow-500 decoration-2 decoration-dashed",
}

const EntitySequence: React.FC<Props> = ({ text, entities }) => {
  // Function to escape special characters in regex patterns
  const escapeRegExp = (text: string) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // Build a regex pattern from the entitys and map them to their colors
  const entityPatterns = entities.map((entity) => ({
    pattern: new RegExp(escapeRegExp(entity.entity), "gi"),
    color: Object.keys(ColorByEntity).includes(entity.type)
      ? ColorByEntity[entity.type as keyof typeof ColorByEntity]
      : ColorByEntity.default,
  }));

  const tokens = [];
  let lastOffset = 0;

  text.replace(
    new RegExp(entityPatterns.map((p) => p.pattern.source).join("|"), "gi"),
    (match, offset) => {
      const entityDetail = entityPatterns.find((p) => p.pattern.test(match));
      const className = entityDetail ? entityDetail.color : "bg-pink";

      // Push previous non-matching text if any
      tokens.push(
        <span key={lastOffset + "n"}>{text.slice(lastOffset, offset)}</span>
      );

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
  tokens.push(<span key={lastOffset + "n"}>{text.slice(lastOffset)}</span>);

  return <div>{tokens}</div>;
};

export default EntitySequence;
