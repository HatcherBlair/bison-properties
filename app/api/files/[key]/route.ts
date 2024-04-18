import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/AWSComponents/s3Client";

// Gets signed URL of image from S3
// NOT NEEDED ANYMORE
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
