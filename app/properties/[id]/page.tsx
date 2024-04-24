import { getProperty, deleteProperty } from "@/AWSComponents/dynamoActions";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import Buttons from "./buttons";
import { propertySchema } from "@/types/Property";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const unsafeProperty = await getProperty(params.id);
  const property = propertySchema.safeParse(unsafeProperty);
  if (!property.success) {
    console.error(property.error);
    redirect("/");
  }

  const session = await getSession();

  return (
    <section>
      <h1>Property Name: {property.data.name}</h1>
      <h3>
        {property.data.leased ? "Leased" : "Available"} | $
        {property.data.price.toFixed(2)} / mo.
      </h3>
      <p>{property.data.description}</p>
      <p>{property.data.numUnits}</p>
      {session ? <Buttons id={property.data.id} /> : <></>}
    </section>
  );
}
