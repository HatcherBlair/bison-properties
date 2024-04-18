"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/AWSComponents/s3Client";

export async function handleFileUpload(currentState: any, formData: any) {
  const file = formData.get("file");

  const fileName = file?.name;
  const fileType = file?.type;

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
    return { status: "success", message: `Uploaded: ${upload}` };
  } catch (e) {
    console.log(e);
    return { status: "Error", message: e };
  }
}
