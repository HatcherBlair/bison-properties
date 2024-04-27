import { getProperty } from "@/AWSComponents/dynamoActions";
import { propertySchema } from "@/types/Property";
import { redirect } from "next/navigation";
import UpdateImages from "@/components/updateImages";

export default async function UpdatePhotos({
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

  return (
    <div>
      {property ? (
        <UpdateImages property={property.data} />
      ) : (
        <p>loading property information...</p>
      )}
    </div>
  );
}
