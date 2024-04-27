"use client";
import { Property } from "@/types/Property";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import FileUpload from "./fileUploadForm";

export default function UpdateImages({ property }: { property: Property }) {
  return (
    <div>
      <FileUpload property={property} type={"floorPlan"} />
    </div>
  );
}
