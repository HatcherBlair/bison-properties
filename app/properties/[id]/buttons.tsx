"use client";
import { deleteProperty } from "@/AWSComponents/dynamoActions";
import { useRouter } from "next/navigation";

export default function Buttons({ id }: { id: string }) {
  const router = useRouter();

  async function handleDeleteClick() {
    const response = await deleteProperty(id);
    router.push("/properties");
  }

  function handleUpdateClick() {}

  return (
    <div>
      <button className="border-2">Update Property Info</button>
      <button className="border-2" onClick={handleDeleteClick}>
        Delete Property
      </button>
    </div>
  );
}
