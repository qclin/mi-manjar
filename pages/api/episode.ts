import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Overview } from "@/app/lib/definitions";
import { readFilePromise } from "./helpers";
import type { FileStructure, ResponseObject } from "./helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseObject | { message: string }>
) {
  const { season, episode } = req.query;
  const baseDir = path.join(process.cwd(), "public/data");

  const seasonFile = path.join(baseDir, `overview/season_${season}.json`);

  try {
    const episodes = (await readFilePromise(seasonFile)) as Overview[];

    const overview = episodes.find(
      (ep) => ep.episode === parseInt(episode as string)
    );

    const filename = `S${season}E${episode}.json`;

    const files: FileStructure[] = [
      { name: `topics/${filename}`, key: "highlight" },
      { name: `utterances/${filename}`, key: "transcription" },
    ];

    const fileReadPromises = files.map(({ name, key }) =>
      readFilePromise(path.join(baseDir, name)).then((data) => ({ key, data }))
    );

    // Wait for all file reading operations to complete
    const fileContents = await Promise.all(fileReadPromises);

    // Construct a response object with keys for each file
    const responseObject = fileContents.reduce(
      (acc: ResponseObject, { key, data }) => {
        acc[key] = data;
        return acc;
      },
      {}
    );
    responseObject.overview = overview;

    res.status(200).json(responseObject);
  } catch (error) {
    console.error("Failed to read files", error);
    res.status(500).json({ message: "Error reading the data files" });
  }
}
