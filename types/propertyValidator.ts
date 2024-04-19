import { z } from "zod";

export const propertySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  price: z.coerce.number(),
  leased: z.coerce.boolean(),
  numUnits: z.coerce.number().int(),
  addressLineOne: z.string(),
  addressLineTwo: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});
