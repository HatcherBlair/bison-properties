import PropertyForm from "@/components/addPropertyForm";
import { auth } from "@clerk/nextjs/server";

export default async function NewProperty() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Must be logged in to view this page");
  }

  return <PropertyForm />;
}
