"use client";
import { getProperty } from "@/AWSComponents/dynamoActions";
import FileUpload from "@/components/fileUploadForm";
import { propertySchema } from "@/types/Property";
import { z } from "zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePhotos({ params }: { params: { id: string } }) {
  type nullableProperty = null | z.infer<typeof propertySchema>;
  const [property, setProperty] = useState<nullableProperty>(null);

  useEffect(() => {
    async function fetchProperty() {
      const unsafeProperty = await getProperty(params.id);
      const safeProperty = propertySchema.safeParse(unsafeProperty);
      if (!safeProperty.success) {
        console.error(safeProperty.error);
        redirect("/");
      }

      setProperty(safeProperty.data);
    }
  }, [params]);

  return <h1>Hello from Update Pictures</h1>;
}
