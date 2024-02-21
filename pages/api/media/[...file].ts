import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  logger: console,
});

const s3 = new AWS.S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = Array.isArray(req.query.file)
    ? req.query.file.join("/")
    : req.query.file;
  const params: AWS.S3.GetObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: file || "",
  };

  try {
    const url = await s3.getSignedUrlPromise("getObject", params);
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
}
