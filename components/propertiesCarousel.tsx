import PropertyCard from "./propertyCard";
import { scanTable } from "@/AWSComponents/dynamoActions";
import { scanTableSchema } from "@/types/getPropertyValidator";
import { type Property } from "@/types/Property";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import { getURL } from "@/AWSComponents/s3Actions";

type SmallCardProps = Omit<React.ComponentProps<typeof Card>, "property"> & {
  property: Property;
};

async function SmallCard({ property, className, ...props }: SmallCardProps) {
  const coverPhoto = property.photos?.length
    ? await getURL(`${property.id}/${property.photos?.at(0)?.Key}`)
    : null;

  return (
    <Card className="w-full h-full">
      <CardContent className="flex flex-col justify-center items-center gap-2">
        <div className="text-center">{property.addressLineOne}</div>
        {coverPhoto ? (
          <img className="w-2/3" src={coverPhoto} />
        ) : (
          <div>No Photo</div>
        )}
      </CardContent>
    </Card>
  );
}

type carouselProps = React.ComponentProps<typeof Carousel>;

export default async function PropertiesCarousel({
  className,
  ...props
}: carouselProps) {
  const res: unknown = await scanTable();
  const parsedProperties = scanTableSchema.safeParse(res);
  if (!parsedProperties.success) {
    return <div>Error Loading Properties</div>;
  }

  const properties = parsedProperties.data.map((item) => item.property);

  return (
    <Carousel className={cn(["p-3", className])} {...props}>
      <CarouselContent>
        {properties.map((property) => {
          return (
            <CarouselItem
              className="basis-1/2 lg:basis-1/3 xl:basis-1/5"
              key={property.id}
            >
              <Link href={`/properties/${property.id}`}>
                <SmallCard property={property} />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
