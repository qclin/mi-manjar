import React from "react";
import {
  ASEntity,
  ASEntityType,
  Entity,
  EntityType,
} from "@/app/lib/definitions";

interface Props {
  text: string;
  entities: ASEntity[] | Entity[];
}

enum ClassnamesByEntity {
  WavyAmber = "underline decoration-amber-500 decoration-wavy",
  WavyGreen = "underline decoration-green-800 decoration-wavy underline-offset-2",
  WavyRoseThick = "underline decoration-rose-800 decoration-wavy decoration-4 underline-offset-4",
  DoubleGreen = "underline decoration-double decoration-lime-700",
  DashZinc = "underline decoration-dashed decoration-4 decoration-zinc-400",
  SolidBlue = "text-sky-700 font-medium",
  Fushsia = "underline underline-offset-2 decoration-fuchsia-700 text-fuchsia-800 bg-fuchsia-100",
  default = "underline decoration-purple-500 decoration-3 decoration-dashed",
}

const getASClassnames = (type: ASEntityType) => {
  switch (type) {
    case ASEntityType.date:
    case ASEntityType.date_interval:
    case ASEntityType.person_age:
    case ASEntityType.time:
      return ClassnamesByEntity.DoubleGreen;
    case ASEntityType.drug:
    case ASEntityType.injury:
    case ASEntityType.medical_condition:
    case ASEntityType.medical_process:
    case ASEntityType.gender_sexuality:
      return ClassnamesByEntity.WavyGreen;
    case ASEntityType.location:
      return ClassnamesByEntity.DoubleGreen;
    case ASEntityType.person_name:
      return ClassnamesByEntity.WavyAmber;
    case ASEntityType.religion:
    case ASEntityType.political_affiliation:
      return ClassnamesByEntity.DashZinc;
    case ASEntityType.occupation:
      return ClassnamesByEntity.SolidBlue;
    case ASEntityType.event:
      return ClassnamesByEntity.Fushsia;
    default:
      return ClassnamesByEntity.default;
  }
};

const getClassnames = (type: EntityType) => {
  switch (type) {
    case EntityType.Food:
      return ClassnamesByEntity.DoubleGreen;
    case EntityType.Brand:
    case EntityType.Family:
      return ClassnamesByEntity.WavyGreen;
    case EntityType.Location:
      return ClassnamesByEntity.DoubleGreen;
    case EntityType.Person:
    case EntityType.Artist:
    case EntityType.Author:
    case EntityType.Authors:
      return ClassnamesByEntity.WavyAmber;
    case EntityType["Religious Concept"]:
    case EntityType["Religious Figure"]:
    case EntityType.Deity:
    case EntityType.Demon:
    case EntityType.Angel:
      return ClassnamesByEntity.DashZinc;
    case EntityType.Saint:
    case EntityType["Historical Figure"]:
    case EntityType["Fictional Character"]:
      return ClassnamesByEntity.SolidBlue;
    case EntityType.Concept:
    case EntityType.Metaphorical:
    case EntityType.Book:
    case EntityType.Artwork:
      return ClassnamesByEntity.Fushsia;
    default:
      return ClassnamesByEntity.default;
  }
};

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
        color: getClassNamesByType(entity)
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
