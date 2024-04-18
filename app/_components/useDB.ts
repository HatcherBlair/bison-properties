"use server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
  region: process.env.REGION,
});
const docClient = DynamoDBDocumentClient.from(dbClient);

export async function createNewUser(userId: string, message: string) {
  const command = new PutCommand({
    TableName: "test-table",
    Item: {
      id: userId,
      message: message,
    },
  });
  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function scanTable() {
  const command = new ScanCommand({
    TableName: "test-table",
  });

  try {
    const data = await docClient.send(command);
    return data.Items;
  } catch (e) {
    throw e;
  }
}
