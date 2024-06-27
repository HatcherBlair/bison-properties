import { z } from "zod";

export const s3ObjectSchema = z.object({
  Key: z.string(),
  caption: z.string().optional(),
});

export const propertySchema = z.object({
  id: z.string(),
  description: z.string().min(2),
  price: z.coerce.number(),
  leased: z.coerce.boolean(),
  numUnits: z.coerce.number().int(),
  sqFt: z.coerce.number().int().optional(),
  beds: z.coerce.number().int().optional(),
  baths: z.coerce.number().optional(),
  addressLineOne: z.string(),
  addressLineTwo: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  floorPlan: z.array(s3ObjectSchema).optional(),
  photos: z.array(s3ObjectSchema).optional(),
  videos: z.array(s3ObjectSchema).optional(),
});

// Defines the structure of a Property stored in DynamoDB
export type Property = z.infer<typeof propertySchema>;

// Defines the structure of a video or image
export type s3Object = z.infer<typeof s3ObjectSchema>;
