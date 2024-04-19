"use server";
import { Property } from "@/types/Property";
import { docClient } from "./dynamoClient";
import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// TODO: GetCommand for fetching one record
// TODO: PutCommand for updating/adding record
// TODO: ScanCommand for fetching all records
// TODO: QueryCommand for custom sorting maybe?
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
