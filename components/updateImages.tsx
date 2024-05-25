"use client";
import { type Property, type s3Object } from "@/types/Property";
import { useState, useEffect, type ChangeEvent } from "react";
import { getAllURLs } from "@/AWSComponents/s3Actions";
import Image from "next/image";
import { FileDropzone } from "./fileDropzone";
import { Input } from "./ui/input";

interface s3WithUrl extends s3Object {
  url: string;
}

export default function UpdateImages({ property }: { property: Property }) {
  const [loading, setLoading] = useState(true);
  const [floorPlan, setFloorPlan] = useState<s3WithUrl[]>([]);
  const [photos, setPhotos] = useState<s3WithUrl[]>([]);
  const [videos, setvideos] = useState<s3WithUrl[]>([]);

  // Store starting images and captions in local state
  useEffect(() => {
    async function getUrls() {
      if (property.photos) {
        const phURLS = await getAllURLs(property.photos, property.id);
        setPhotos(
          property.photos.map((ph, i) => {
            return {
              ...ph,
              url: phURLS[i],
            };
          })
        );
      }
      if (property.floorPlan) {
        const fpURLS = await getAllURLs(property.floorPlan, property.id);
        setFloorPlan(
          property.floorPlan.map((fp, i) => {
            return {
              ...fp,
              url: fpURLS[i],
            };
          })
        );
      }
      if (property.videos) {
        const vidURLS = await getAllURLs(property.videos, property.id);
        setvideos(
          property.videos.map((vid, i) => {
            return {
              ...vid,
              url: vidURLS[i],
            };
          })
        );
      }
      setLoading(false);
    }

    getUrls();
  }, [property]);

  function onCaptionChange(
    i: number,
    type: string,
    e: ChangeEvent<HTMLInputElement>
  ) {
    switch (type) {
      case "photos":
        const newPhotos = [...photos];
        newPhotos[i] = { ...newPhotos[i], caption: e.target.value };
        setPhotos(newPhotos);
        break;
      case "videos":
        const newVideos = [...videos];
        newVideos[i] = { ...newVideos[i], caption: e.target.value };
        setvideos(newVideos);
        break;
      case "floorPlan":
        const newFloorPlan = [...videos];
        newFloorPlan[i] = { ...newFloorPlan[i], caption: e.target.value };
        setFloorPlan(newFloorPlan);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h4 className="text-center text-red-500 text-xl font-semibold pb-4">
        Warning... Pictures are rendered in low quality on this page. The images
        on this page do not reflect the quality of the rest of the images on
        this site
      </h4>

      <h3 className="text-xl px-8 pb-1 border-b-2 border-black">Photos</h3>
      <RenderImages
        objectsToRender={photos}
        type="photos"
        callback={onCaptionChange}
      />
      <FileDropzone property={property} />

      <h3 className="text-xl px-8 pb-1 border-b-2 border-black">Videos</h3>
      <FileDropzone property={property} />
      <h3 className="text-xl px-8 pb-1 border-b-2 border-black">Floorplan</h3>
      <FileDropzone property={property} />
    </div>
  );
}

function RenderImages({
  objectsToRender,
  type,
  callback,
}: {
  objectsToRender: s3WithUrl[];
  type: string;
  callback: (i: number, tpye: string, e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {objectsToRender.map((object, i) => {
        return (
          <div key={i} className="flex flex-col gap-1">
            <div className="w-[250px] h-[141px] relative">
              <Image
                fill={true}
                alt="image"
                src={object.url}
                sizes="(max-width: 640px) 50vw, (max-width: 830px) 33vw, (max-wdith: 1100px) 25vw, 20vw"
                quality={25}
              />{" "}
            </div>
            <Input
              type="text"
              value={object.caption ?? ""}
              onChange={(e) => callback(i, type, e)}
              className="bg-slate-300 border-black/20"
            />
          </div>
        );
      })}
    </div>
  );
}
