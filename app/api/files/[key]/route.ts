import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
});

// Gets signed URL of image from S3
export async function GET(
  _: NextRequest,
  { params }: { params: { key: string } }
) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key: params.key,
  });

  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}
