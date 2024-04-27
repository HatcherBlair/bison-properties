"use server";

import {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/AWSComponents/s3Client";
import { v4 as uuidV4 } from "uuid";
import { s3Object } from "@/types/Property";

// Uploads files to S3: returns the key for the file, if the key is Error the file was not able to be uploaded
// TODO: Add proper error handling
export async function handleFileUpload(data: FormData, propertyKey: string) {
  // Validate file[1] contains size, type, name, lastModified, maybe parse with File type

  const keys = await Promise.all(
    Array.from(data.entries()).map(async ([key, value]) => {
      const file = value as File;
      const fileType = file.type;
      const Key = uuidV4();
      const binary = await file.arrayBuffer();
      const buffer = Buffer.from(binary);

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${propertyKey}/${Key}`,
        Body: buffer,
        ContentType: fileType,
      };

      try {
        const upload = await s3Client.send(new PutObjectCommand(params));
        console.log(upload);
        return { Key: Key };
      } catch (e) {
        console.log(e);
        return { Key: "Error", file: file.name };
      }
    })
  );

  return keys;

  // console.log(file);
  // const fileType = file.type;
  // const fileKey = uuidV4();

  // const binary = await file.arrayBuffer();
  // const buffer = Buffer.from(binary);

  // const params = {
  //   Bucket: process.env.BUCKET_NAME,
  //   Key: `${propertyKey}/${fileKey}`,
  //   Body: buffer,
  //   ContentType: fileType,
  // };

  // try {
  //   const upload = await s3Client.send(new PutObjectCommand(params));
  //   console.log(upload);
  //   return { Key: fileKey };
  // } catch (e) {
  //   console.log(e);
  //   return { Key: "Error" };
  // }
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
