import PropertyForm from "@/components/addPropertyForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default async function NewProperty() {
  return <PropertyForm />;
}
