import { getProperty, deleteProperty } from "@/AWSComponents/dynamoActions";
import { redirect } from "next/navigation";
import Buttons from "./buttons";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getProperty(params.id);
  if (!response.Item) {
    return <h1>Error finding property</h1>;
  }
  const property = response.Item.property;

  async function handleDeleteClick() {
    const response = await deleteProperty(property.id);
    redirect("/properties");
  }
  return (
    <section>
      <h1>Property Name: {property.name}</h1>
      <h3>
        {property.leased ? "Leased" : "Available"} | $
        {property.price.toFixed(2)} / mo.
      </h3>
      <p>{property.description}</p>
      <p>{property.numUnits}</p>
      <Buttons id={property.id} />
    </section>
  );
}
