// Client used for S3 interactions throughout site
// TODO: Split into 2 clients, one with full access and one with only GET access
import { S3Client } from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});
