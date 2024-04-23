import { z } from "zod";

export const s3ObjectSchema = z.object({
  Key: z.string(),
  type: z.enum(["video", "image", "floorPlan"]),
  caption: z.string(),
});

export const propertySchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  description: z.string().min(2),
  price: z.coerce.number(),
  leased: z.coerce.boolean(),
  numUnits: z.coerce.number().int(),
  addressLineOne: z.string(),
  addressLineTwo: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  floorPlan: s3ObjectSchema.optional(),
  photos: z.array(s3ObjectSchema).optional(),
  videos: z.array(s3ObjectSchema).optional(),
});

// Defines the structure of a Property stored in DynamoDB
export type Property = z.infer<typeof propertySchema>;

// Defines the structure of a video or image
export type s3Object = z.infer<typeof s3ObjectSchema>;
