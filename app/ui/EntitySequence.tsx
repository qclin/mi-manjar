import React from "react";
import { ASEntity, ASEntityType } from "@/app/lib/definitions";

interface Props {
  text: string;
  entities: ASEntity[];
}

enum ClassnamesByEntity {
  WavyAmber = "underline decoration-amber-500 decoration-wavy",
  WavyGreen = "underline decoration-green-800 decoration-wavy underline-offset-2",
  WavyRoseThick = "underline decoration-rose-800 decoration-wavy decoration-4 underline-offset-4",
  DoubleGreen = "underline decoration-double decoration-lime-700",
  DashZinc = "underline decoration-dashed decoration-4 decoration-zinc-400",
  SolidBlue = "text-sky-700 font-medium",
  Fushsia = "underline underline-offset-2 decoration-fuchsia-700 text-fuchsia-800 bg-fuchsia-100",
  default = "underline decoration-yellow-100 decoration-4 decoration-dashed",
}

const getClassnames = (entity: ASEntityType) => {
  switch (entity) {
    case ASEntityType.date,  ASEntityType.person_age, ASEntityType.time:
      return ClassnamesByEntity.DoubleGreen
    case ASEntityType.drug, ASEntityType.injury, ASEntityType.medical_condition, ASEntityType.medical_process: 
      return ClassnamesByEntity.WavyGreen
    case ASEntityType.location: 
      return ClassnamesByEntity.DoubleGreen
    case ASEntityType.person_name: 
      return ClassnamesByEntity.WavyAmber
    case ASEntityType.religion, ASEntityType.political_affiliation: 
      return ClassnamesByEntity.DashZinc
    case ASEntityType.occupation: 
      return ClassnamesByEntity.SolidBlue
    case ASEntityType.event: 
      return ClassnamesByEntity.Fushsia
    default:
      return ClassnamesByEntity.default
  }
}
const EntitySequence: React.FC<Props> = ({ text, entities }) => {  
  // Function to escape special characters in regex patterns
  const escapeRegExp = (text: string) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // Build a regex pattern from the entitys and map them to their colors
  const entityPatterns = entities.filter((entity) => entity.text.length >= 3).map((entity) => ({
    pattern: new RegExp(escapeRegExp(entity.text), "gi"),
    color: getClassnames(entity.entity_type)
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
