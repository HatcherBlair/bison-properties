"use server";
import { Property } from "@/types/Property";
import { docClient } from "./dynamoClient";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { deleteFile } from "./s3Actions";
import { getPropertySchema } from "@/types/getPropertyValidator";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/properties");
}

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

export async function deleteProperty(id: string) {
  // Delete photos from bucket before deleting property
  const property = await getProperty(id);
  if (property?.photos) {
    property.photos.forEach((file) => deleteFile(`${id}/${file.Key}`));
  }
  if (property?.floorPlan) {
    property.floorPlan.forEach((file) => deleteFile(`${id}/${file.Key}`));
  }
  if (property?.videos) {
    property.videos.forEach((file) => deleteFile(`${id}/${file.Key}`));
  }

  const command = new DeleteCommand({
    TableName: "test-table",
    Key: {
      id: id,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  revalidatePath("/properties");
  return response;
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
