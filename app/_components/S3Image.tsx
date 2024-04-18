"use server";
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";

const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
});

export default async function images(): Promise<string[]> {
  const files = await s3Client.send(
    new ListObjectsCommand({
      Bucket: process.env.BUCKET_NAME,
    })
  );

  if (!files.Contents) {
    return ["Error Finding Images"];
  }

  const urls = await Promise.all(
    files.Contents.map((file) => {
      return getSrc(file.Key as string);
    })
  );

  return urls;
}

async function getSrc(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key: key,
  });

  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return src;
}
