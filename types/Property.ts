// Defines the structure of a Property stored in DynamoDB
export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  leased: boolean;
  numUnits: number;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
  floorPlan?: s3Object[];
  photos?: s3Object[];
  videos?: s3Object[];
}

// Defines the structure of a video or image
// To retreive an object from S3 the path is Property.id/type/key
export interface s3Object {
  key: string;
  type: "video" | "image" | "floorPlan";
  caption: string;
}
