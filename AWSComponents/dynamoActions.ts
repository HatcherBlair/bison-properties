"use server";
import { Property } from "@/types/Property";
import { docClient } from "./dynamoClient";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { getPropertySchema } from "@/types/getPropertyValidator";

// TODO: GetCommand for fetching one record
// TODO: PutCommand for updating/adding record
// TODO: ScanCommand for fetching all records
// TODO: QueryCommand for custom sorting maybe?

// Add or update property information
// If the property already exists, the information will be overwritten
export async function putProperty(property: Property) {
  const command = new PutCommand({
    TableName: "test-table",
    Item: {
      id: property.id,
      property: property,
    },
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

// Gets a single property from the table
// TODO: Handle error fetching property
// TODO: Use Zod to check status code
export async function getProperty(id: string) {
  const command = new GetCommand({
    TableName: "test-table",
    Key: {
      id: id,
    },
  });

  const response = await docClient.send(command);
  const validatedResponse = getPropertySchema.safeParse(response);
  return validatedResponse.success
    ? validatedResponse.data.Item.property
    : undefined;
}

// Delete a property from the table
export async function deleteProperty(id: string) {
  const command = new DeleteCommand({
    TableName: "test-table",
    Key: {
      id: id,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
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
