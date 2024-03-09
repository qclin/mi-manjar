import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface FileStructure {
  name: string;
  key: string;
}

interface ResponseObject {
  [key: string]: any; // Use a more specific type according to your data structure
}

// Helper function to read a file and return a promise
const readFilePromise = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseObject | { message: string }>
) {
  const title = Array.isArray(req.query.title)
    ? req.query.title[0]
    : req.query.title;

  // Define the base directory for JSON files
  const baseDir = path.join(process.cwd(), "public/data/episodes", title as string);

  const files: FileStructure[] = [
    { name: "overview.json", key: "overview" },
    { name: "topics.json", key: "topics" },
    { name: "transcription.json", key: "transcription" },
  ];

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
