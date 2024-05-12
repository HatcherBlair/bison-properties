import PropertyForm from "@/components/addPropertyForm";
import { getProperty } from "@/AWSComponents/dynamoActions";
import { auth } from "@clerk/nextjs/server";

export default async function EditProperty({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Must be signed in to view this page");
  }

  const property = await getProperty(params.id);

  return <PropertyForm property={property} />;
}
