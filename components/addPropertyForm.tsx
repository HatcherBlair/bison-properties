"use client";
import { putProperty } from "@/AWSComponents/dynamoActions";
import { Property } from "@/types/Property";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/types/propertyFormValidator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function PropertyForm({ property }: { property?: Property }) {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: property?.id || "",
      name: property?.name || "",
      description: property?.description || "",
      leased: property?.leased || true,
      price: property?.price || 0.0,
      numUnits: property?.numUnits || 1,
      addressLineOne: property?.addressLineOne || "",
      addressLineTwo: property?.addressLineTwo || "",
      city: property?.city || "Salt Lake City",
      state: property?.state || "UT",
      zip: property?.zip || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    try {
      const submittedProperty: Property = {
        id: values.id || uuidv4(),
        name: values.name,
        description: values.description,
        price: values.price,
        leased: values.leased,
        numUnits: values.numUnits,
        addressLineOne: values.addressLineOne,
        addressLineTwo: values.addressLineTwo,
        city: values.city,
        state: values.state,
        zip: values.zip,
      };

      const response = await putProperty(submittedProperty);

      // TODO: Check response before redirection
      window.location.href = "/properties";
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="6th South" {...field} />
              </FormControl>
              <FormDescription>
                This is just a nickname for the property, only visible to you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Description of the property... Visible to everyone
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLineOne"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line One</FormLabel>
              <FormControl>
                <Input placeholder="1332 Colonial Dr." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLineTwo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line Two</FormLabel>
              <FormControl>
                <Input placeholder="apt. B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Salt Lake City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="UT" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="84108" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormDescription>
                Only Enter Numbers, no $, no /mo or any of that
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Of Units</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Only Integers</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leased"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leased?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue="true">
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel>Leased</FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="" />
                    </FormControl>
                    <FormLabel>Available</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          Submit
        </Button>
        <Button type="button" disabled={pending} onClick={() => history.back()}>
          Cancel
        </Button>
      </form>
    </Form>
  );
}
