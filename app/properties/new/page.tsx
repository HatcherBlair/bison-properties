import PropertyForm from "@/components/addPropertyForm";
import { isAdmin } from "@/lib/utils";

export default async function NewProperty() {
  if (!(await isAdmin())) {
    throw new Error("Must be admin to view this page");
  }

  return <PropertyForm />;
}
