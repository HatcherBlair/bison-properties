"use client";

import { handleFileUpload } from "@/AWSComponents/s3Actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Property, s3Object } from "@/types/Property";
import { putProperty } from "@/AWSComponents/dynamoActions";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Form for uploading file to S3
// @param type: floorPlan | Photos | Videos
// @param property: Property that owns the files
export default function FileUpload({
  property,
  type,
}: {
  property: Property;
  type: string;
}) {
  // Form Validation
  const fileSchema = z.object({
    files: z.instanceof(FileList),
  });
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
  });
  const fileRef = form.register("files");

  // File upload and DB update
  async function onSubmit(data: z.infer<typeof fileSchema>) {
    const formData = new FormData();
    for (let i = 0; i < data.files.length; i++) {
      formData.append(`file${i}`, data.files[i]);
    }

    const keys = await handleFileUpload(formData, property.id);

    // TODO: Create toast for each entry with Key error
    // Sort keys by upload error
    const problemKeys = keys.filter((entry) => entry.Key === "Error");

    // Get succsessful uploads and update DB with their keys
    const goodKeys: s3Object[] = keys.filter((entry) => entry.Key !== "Error");
    switch (type) {
      case "floorPlan":
        if (property.floorPlan) {
          property.floorPlan.push(...goodKeys);
        } else {
          property.floorPlan = goodKeys;
        }
        break;
      case "photos":
        if (property.photos) {
          property.photos.push(...goodKeys);
        } else {
          property.photos = goodKeys;
        }
        break;
      case "videos":
        if (property.videos) {
          property.videos.push(...goodKeys);
        } else {
          property.videos = goodKeys;
        }
        break;
      default:
        break;
    }

    // TODO: Make toast that upload and db update were successful
    await putProperty(property);

    console.log(keys);
    window.location.reload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{type}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    placeholder="shadcn"
                    {...fileRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
