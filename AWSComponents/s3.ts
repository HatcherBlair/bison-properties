"use server";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
});

export async function GET(id: string, file: File) {
  try {
  } catch (e) {
    throw e;
  }
}
