// Defines the GET and POST request for file uploads

import { NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client } from "@/AWSComponents/s3Client";

// Uploads image to S3
// NOT NEEDED ANYMORE
export async function POST(request: Request) {
  const data = await request.formData();
  const files = data.getAll("file") as File[];
  console.log(`Data: ${data}`);
  console.log(`Files: ${files}`);

  const response = await Promise.all(
    files.map(async (file) => {
      const binary = await file.arrayBuffer();
      const Body = Buffer.from(binary);

      const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: file.name,
        Body: Body,
        ContentType: file.type,
      };

      s3Client.send(new PutObjectCommand(params));
    })
  );
  console.log(response);
  return NextResponse.json(response);
}
