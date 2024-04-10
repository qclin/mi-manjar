import type { Overview, TranslatedString } from "../lib/definitions";
import Content from "./content";

type SeasonIndex = "season_1" | "season_2" | "season_3" | "season_4";

const Page: React.FC = async () => {
  const data: Record<SeasonIndex, Overview[]> = await getSeasons();
  return <Content data={data} />;
};

export default Page;

async function getSeasons() {
  const response = await fetch("http://127.0.0.1:5000/season");
  const data = await response.json();
  return data;
}
