import PropertyForm from "@/components/addPropertyForm";
import { getProperty } from "@/AWSComponents/dynamoActions";

export default async function EditProperty({
  params,
}: {
  params: { id: string };
}) {
  const property = await getProperty(params.id);

  return <div>Hello world</div>;
}
