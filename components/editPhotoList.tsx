import { s3Object, Property } from "@/types/Property";
import { getURL } from "@/AWSComponents/s3Actions";

export default async function UpdateCaptions({
  property,
}: {
  property: Property;
}) {
  const [floorPlanUrls, photosUrls, videosUrls] = await Promise.all([
    property.floorPlan?.map((item: s3Object) => {
      return getURL(`${property.id}/${item.Key}`);
    }),
    property.photos?.map((item: s3Object) => {
      return getURL(`${property.id}/${item.Key}`);
    }),
    property.videos?.map((item: s3Object) => {
      return getURL(`${property.id}/${item.Key}`);
    }),
  ]);

  console.log(`FloorplanURLS: ${floorPlanUrls}`);
  console.log(`PhotosURLS: ${photosUrls}`);
  console.log(`Video URLS: ${videosUrls}`);

  return <div>Update Captions Component</div>;
}
