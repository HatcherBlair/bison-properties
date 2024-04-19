import { scanTable } from "@/AWSComponents/db";
import { Property } from "@/types/Property";
import PropertyCard from "@/components/propertyCard";

export default async function Home() {
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
      {filteredProperties.map((property: Property) => (
        <PropertyCard
          key={property.id}
          name={property.name}
          description={property.description}
          price={property.price}
          leased={property.leased}
        />
      ))}
    </>
  );
}
