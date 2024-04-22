import { Podcast, SeasonOverview } from "./definitions";

export const fetchPodcast = async (season: string, episode: string) => {
  try {
    console.log(
      "[fetchPodcast]",
      season,
      episode,
      `/api/episode?season=${season}&episode=${episode}`
    );

    const response = await fetch(
      `/api/episode?season=${season}&episode=${episode}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching podcast data for episode: ${response.statusText}`
      );
    }
    const data = (await response.json()) as Podcast;
    return data;
  } catch (error) {
    console.error("Failed to fetch podcast data", error);
  }
};

export const fetchSeasons = async () => {
  try {
    const response = await fetch("api/seasons");

    if (!response.ok) {
      throw new Error(`Error fetching season overview: ${response.statusText}`);
    }
    const data = (await response.json()) as SeasonOverview;
    return data;
  } catch (error) {
    console.error("Failed to fetch season overview", error);
  }
};
