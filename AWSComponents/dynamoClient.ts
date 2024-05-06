import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Client for interacting with DynamoDB
// TODO: Split into separate file
// TODO: Split into 2 clients, one with full access and one with only GET access
const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY as string,
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY as string,
  },
  region: process.env.REGION as string,
});

export const docClient = DynamoDBDocumentClient.from(dbClient);
