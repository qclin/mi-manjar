import fs from "fs";
import { NextApiResponse } from "next";

// Helper function to read a file and return a promise
export const readFilePromise = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

export interface FileStructure {
  name: string;
  key: string;
}

export interface ResponseObject {
  [key: string]: any; // Use a more specific type according to your data structure
}

export const sendResponse = <T>(
  res: NextApiResponse<T>,
  statusCode: number,
  data: T
) => {
  res.status(statusCode).json(data);
};
