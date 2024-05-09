import { scanTable } from "@/AWSComponents/dynamoActions";
import { Property } from "@/types/Property";
import PropertyCard from "@/components/propertyCard";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { scanTableSchema } from "@/types/getPropertyValidator";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default async function PropertyPage() {
  const response: any = await scanTable();
  console.log(scanTableSchema.safeParse(response));
  const parsedProperties = scanTableSchema.safeParse(response);
  if (!parsedProperties.success) {
    throw new Error(parsedProperties.error.message);
  }
  const properties = parsedProperties.data.map((item) => item.property);

  const { userId } = auth();

  return (
    <>
      <MaxWidthWrapper>
        <p>Hello From properties</p>
        {userId && <Link href="/properties/new">New Property</Link>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-center items-center">
          {properties.map((property: Property) => (
            <div className="w-400[px]">
              <Link href={`/properties/${property.id}`} key={property.id}>
                <PropertyCard property={property} />
              </Link>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}
