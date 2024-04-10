import { Podcast, SeasonOverview } from "./definitions";

export const fetchPodcast = async (slug: string) => {
  try {
    const response = await fetch(`/api/episode/${slug}`);
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
