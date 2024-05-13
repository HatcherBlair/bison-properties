import PropertyForm from "@/components/addPropertyForm";
import { getProperty } from "@/AWSComponents/dynamoActions";
import { isAdmin } from "@/lib/utils";

export default async function EditProperty({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdmin())) {
    throw new Error("Must be admin to view this page");
  }

  const property = await getProperty(params.id);

  return <PropertyForm property={property} />;
}
