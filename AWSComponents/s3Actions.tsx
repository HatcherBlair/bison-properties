"use server";

import {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/AWSComponents/s3Client";

// Uploads a file to s3 : True if success | False if fail
// TODO: Add proper error handling
export async function handleFileUpload(file: File) {
  const fileName = file.name;
  const fileType = file.type;

  const binary = await file.arrayBuffer();
  const buffer = Buffer.from(binary);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: fileType,
  };

  try {
    const upload = await s3Client.send(new PutObjectCommand(params));
    console.log(upload);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Fetch specified number of images from S3 Bucket
// TODO: Add prefix for homepage files
export async function fetchFiles(numItems: number) {
  const files = await s3Client.send(
    new ListObjectsCommand({
      Bucket: process.env.BUCKET_NAME,
      MaxKeys: 5,
    })
  );

  if (!files.Contents) {
    console.log("Couldnt find files...");
    return [];
  }

  let urls = await Promise.all(
    files.Contents.map((file) => {
      if (!file.Key) {
        return;
      }
      return getURL(file.Key);
    }).filter(Boolean) // Remove undefined values
  );

  return urls;
}

// Fetch Specific Image
export async function fetchFile(path: string) {}

// Generates a presigned URL with given key
async function getURL(key: string): Promise<string> {
  return await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: key,
    }),
    { expiresIn: 60 * 60 * 1 }
  ); // Default expiration 90s
}
