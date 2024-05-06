"use client";
import { deleteProperty } from "@/AWSComponents/dynamoActions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Buttons({ id }: { id: string }) {
  const router = useRouter();

  async function handleDeleteClick() {
    const response = await deleteProperty(id);
    router.push("/properties");
  }

  function handleUpdateClick() {
    router.push(`/properties/${id}/edit`);
  }

  function handleUpdatePicturesClick() {
    router.push(`/properties/${id}/update-images`);
  }

  return (
    <div>
      <Button onClick={handleUpdateClick}>Update Property Info</Button>
      <Button onClick={handleDeleteClick}>Delete Property</Button>
      <Button onClick={handleUpdatePicturesClick}>Update Pictures</Button>
    </div>
  );
}
