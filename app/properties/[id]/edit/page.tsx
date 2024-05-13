import PropertyForm from "@/components/addPropertyForm";
import { getProperty } from "@/AWSComponents/dynamoActions";
import { currentUser } from "@clerk/nextjs/server";

export default async function EditProperty({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress as string;
  const adminEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(" ");

  if (!(adminEmails && adminEmails.includes(userEmail))) {
    throw new Error("Must be admin to view this page");
  }

  const property = await getProperty(params.id);

  return <PropertyForm property={property} />;
}
