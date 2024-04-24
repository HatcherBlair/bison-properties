import { z } from "zod";
import { propertySchema } from "./Property";

export const getPropertySchema = z.object({
  $metadata: z.object({
    httpStatusCode: z.number(),
    requestId: z.string(),
    extendedRequestId: z.union([z.string(), z.undefined()]),
    cfId: z.union([z.string(), z.undefined()]),
    attempts: z.number(),
    totalRetryDelay: z.number(),
  }),
  Item: z.object({
    property: propertySchema,
    id: z.string(),
  }),
});
