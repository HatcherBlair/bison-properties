import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

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
const docClient = DynamoDBDocumentClient.from(dbClient);

// Updates the information for a property
export async function updateProperty(userId: string, message: string) {
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

// Returns all records in table
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
