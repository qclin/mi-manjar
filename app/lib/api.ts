import {
  MediaCaption,
  Podcast,
  SeasonOverview,
  SignedURL,
} from "./definitions";

const fetchData = async <T>(path: string): Promise<T | undefined> => {
  try {
    const response = await fetch(`/api/${path}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${path}: ${response.statusText}`
      );
    }
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${path}`, error);
  }
};

export const fetchPodcast = async (season: string, episode: string) => {
  const path = `episode?season=${season}&episode=${episode}`;
  return fetchData<Podcast>(path);
};

export const fetchSeasons = async () => {
  const path = "seasons";
  return fetchData<SeasonOverview>(path);
};

export const fetchCaption = async () => {
  const path = "captions";
  return fetchData<MediaCaption>(path);
};

export const fetchAudioPresignedURL = async (filename: string) => {
  const path = `media/audio/las-hijas-de-filipe/${encodeURIComponent(filename)}`;
  return fetchData<SignedURL>(path);
};

export const fetchPresignedURLs = async (filenames: string[]) => {
  const data = (await Promise.all(
    filenames.map((filename) => fetchPresignedURL(filename))
  )) as SignedURL[];
  return data;
};

const fetchPresignedURL = async (filename: string) => {
  const path = `media/instagram/${encodeURIComponent(filename)}`;
  return fetchData<SignedURL>(path);
};
