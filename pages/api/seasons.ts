import path from "path";
import { readFilePromise } from "../utils/apiHelpers";
import type { FileStructure, ResponseObject } from "../utils/apiHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseObject | { message: string }>
) {
  // Define the base directory for JSON files
  const baseDir = path.join(process.cwd(), "public/data/overview");

  const files: FileStructure[] = [1, 2, 3, 4].map((index) => ({
    name: `season_${index}.json`,
    key: `season_${index}`,
  }));

  try {
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

    res.status(200).json(responseObject);
  } catch (error) {
    console.error("Failed to read files", error);
    res.status(500).json({ message: "Error reading the data files" });
  }
}
