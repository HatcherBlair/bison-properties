import { scanTable } from "@/AWSComponents/dynamoActions";
import { Property } from "@/types/Property";
import PropertyCard from "@/components/propertyCard";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default async function PropertyPage() {
  const session = await getSession();
  const response: any = await scanTable();
  const properties = response.map((res: any) => {
    if (!res.property) {
      return;
    }

    const property: Property = {
      id: res.property.id,
      name: res.property.name,
      description: res.property.description,
      price: res.property.price,
      leased: res.property.leased,
      numUnits: res.property.numUnits,
      addressLineOne: res.property.addressLineOne,
      addressLineTwo: res.property.addressLineTwo,
      city: res.property.city,
      state: res.property.state,
      zip: res.property.zip,
    };
    return property;
  });
  const filteredProperties = properties.filter(Boolean);
  return (
    <>
      <p>Hello From properties</p>
      {session ? <Link href={"/properties/new"}>New Property</Link> : <></>}
      {filteredProperties.map((property: Property) => (
        <Link href={`/properties/${property.id}`} key={property.id}>
          <PropertyCard property={property} />
        </Link>
      ))}
    </>
  );
}