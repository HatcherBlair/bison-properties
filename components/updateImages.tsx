"use client";
import { Property } from "@/types/Property";
import FileUpload from "./fileUploadForm";
import { useState, useEffect } from "react";
import { getAllURLs } from "@/AWSComponents/s3Actions";
import Image from "next/image";
import { FileDropzone } from "./fileDropzone";
import { Input } from "./ui/input";

export default function UpdateImages({ property }: { property: Property }) {
  return (
    <div>
      <UpdateCaptions property={property} />
      <FileDropzone property={property} />
      <FileUpload property={property} type="videos" />
      <FileUpload property={property} type="photos" />
    </div>
  );
}

function UpdateCaptions({ property }: { property: Property }) {
  const [loading, setLoading] = useState(true);
  const [floorPlanURLS, setFloorPlanURLS] = useState<string[]>([]);
  const [photoURLS, setPhotoURLS] = useState<string[]>([]);
  const [videoURLS, setVideoURLS] = useState<string[]>([]);

  useEffect(() => {
    async function getUrls() {
      const [fp, ph, vid] = await getAllURLs(property);
      setFloorPlanURLS(fp);
      setPhotoURLS(ph);
      setVideoURLS(vid);
      setLoading(false);
    }

    getUrls();
  }, [property]);

  if (loading) {
    return <div>Loading photos... Please bear with us</div>;
  }

  return (
    <div>
      <div>
        Photos...
        <div className="flex flex-wrap gap-2">
          {photoURLS.length ? (
            photoURLS.map((url, i) => {
              return (
                <div key={i}>
                  <Image width={250} height={141} alt="image" src={url} />
                  <Input type="text" />
                </div>
              );
            })
          ) : (
            <p>No Photos</p>
          )}
        </div>
      </div>
      <div>
        Videos...
        {videoURLS.length ? (
          videoURLS.map((url) => {
            return (
              <Image key={url} width={250} height={200} alt="image" src={url} />
            );
          })
        ) : (
          <p>No Videos</p>
        )}
      </div>
      <div>
        Floor Plans...
        {floorPlanURLS.length ? (
          floorPlanURLS.map((url) => {
            return (
              <Image key={url} width={250} height={200} alt="image" src={url} />
            );
          })
        ) : (
          <p>No Floor Plans</p>
        )}
      </div>
    </div>
  );
}
