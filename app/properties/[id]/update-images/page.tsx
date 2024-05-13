import { getProperty } from "@/AWSComponents/dynamoActions";
import { propertySchema } from "@/types/Property";
import { redirect } from "next/navigation";
import UpdateImages from "@/components/updateImages";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function UpdatePhotos({
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
