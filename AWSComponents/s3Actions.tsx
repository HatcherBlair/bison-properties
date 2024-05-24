"use server";

import {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/AWSComponents/s3Client";
import { v4 as uuidV4 } from "uuid";
import { Property, s3Object } from "@/types/Property";
import { revalidatePath } from "next/cache";

// Uploads files to S3: returns the key for the file, if the key is Error the file was not able to be uploaded
export async function handleFileUpload(data: FormData, propertyKey: string) {
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

  revalidatePath("/properties/[id]");
  return keys;
}

// Fetch specified number of images from S3 Bucket
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

// Generates a presigned GET URL with given key
export async function getURL(key: string): Promise<string> {
  const response = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: key,
    }),
    { expiresIn: 60 * 60 * 1 }
  ); // Default expiration 90s
  return response;
}

// Generates a presigned PUT URL with a given key
export async function putURL(key: string): Promise<string> {
  const response = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: key,
    }),
    { expiresIn: 60 * 60 * 1 }
  );
  return response;
}

// Returns all of the urls for a property
export async function getAllURLs(property: Property) {
  const floorPlanUrls = property.floorPlan
    ? await Promise.all(
        property.floorPlan.map(async (item: s3Object) => {
          return await getURL(`${property.id}/${item.Key}`);
        })
      )
    : [];

  const photosUrls = property.photos
    ? await Promise.all(
        property.photos.map(async (item: s3Object) => {
          return await getURL(`${property.id}/${item.Key}`);
        })
      )
    : [];

  const videosUrls = property.videos
    ? await Promise.all(
        property.videos.map(async (item: s3Object) => {
          return await getURL(`${property.id}/${item.Key}`);
        })
      )
    : [];

  return [floorPlanUrls, photosUrls, videosUrls];
}

export async function deleteFile(path: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key: path,
  });

  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}
