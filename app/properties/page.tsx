import { scanTable } from "@/AWSComponents/dynamoActions";
import { Property } from "@/types/Property";
import PropertyCard from "@/components/propertyCard";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { scanTableSchema } from "@/types/getPropertyValidator";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function PropertyPage() {
  const response: any = await scanTable();
  const parsedProperties = scanTableSchema.safeParse(response);
  if (!parsedProperties.success) {
    throw new Error(parsedProperties.error.message);
  }
  const properties = parsedProperties.data.map((item) => item.property);

  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress as string;
  const adminEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(" ");

  return (
    <>
      <MaxWidthWrapper className="min-h-screen">
        <p className="font-semibold text-5xl text-center pt-5">Properties</p>
        {adminEmails && adminEmails.includes(userEmail) && (
          <Link
            className={cn([buttonVariants({ variant: "outline" })])}
            href="/properties/new"
          >
            Add Property
          </Link>
        )}
        <div className="pt-10 flex flex-1 justify-evenly md:flex-wrap md:flex-row flex-col gap-1 ">
          {properties.map((property: Property) => (
            <Link
              className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 aspect-[7/8] -p-3 hover:scale-105 transition-all"
              key={property.id}
              href={`/properties/${property.id}`}
            >
              <PropertyCard className="w-full h-full" property={property} />
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}
