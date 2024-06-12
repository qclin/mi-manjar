import path from "path";
import { readFilePromise } from "./helpers";
import type { ResponseObject } from "./helpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseObject | { message: string }>
) {
  const filename = path.join(
    process.cwd(),
    "public/data/media/instagram_by_date.json"
  );
  try {
    const captions = await readFilePromise(filename);
    res.status(200).json(captions);
  } catch (error) {
    console.error("Failed to read files", error);
    res.status(500).json({ message: "Error reading the data files" });
  }
}
