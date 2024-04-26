"use client";

import { handleFileUpload } from "@/AWSComponents/s3Actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Property, propertySchema, s3ObjectSchema } from "@/types/Property";
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
// TODO: Add multi file support
// TODO: Make form for entire property, not just file upload
export default function FileUpload({ property }: { property: Property }) {
  const fileSchema = z.object({
    file: z.instanceof(FileList),
    id: z.string(),
  });

  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
  });

  const fileRef = form.register("file");

  function onSubmit(data: z.infer<typeof fileSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
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
