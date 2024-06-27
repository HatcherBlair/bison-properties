"use client";
import { deleteFile } from "@/AWSComponents/s3Actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImagesWithDelete({
  images,
  keys,
}: {
  images: string[];
  keys: string[];
}) {
  const [localImages, setLocalImages] = useState(images);
  const [localKeys, setLocalKeys] = useState(keys);

  async function onDelete(i: number) {
    const res = await deleteFile(keys[i]);
    console.log(res);
    if (!res) {
      return;
    }

    const newImages = [...localImages];
    newImages.splice(i, 1);
    setLocalImages(newImages);

    const newKeys = [...localKeys];
    newKeys.splice(i, 1);
    setLocalKeys(newKeys);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {localImages.map((url, i) => (
        <div key={i}>
          <Image
            src={url as string}
            height={250}
            width={250}
            alt="homepage image"
          />
          <Button onClick={() => onDelete(i)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
