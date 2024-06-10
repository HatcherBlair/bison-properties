import { getProperty } from "@/AWSComponents/dynamoActions";
import { getAllURLs } from "@/AWSComponents/s3Actions";
import { redirect } from "next/navigation";
import Buttons from "./buttons";
import { propertySchema } from "@/types/Property";
import DetailsCarousel from "@/components/detailsCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isAdmin } from "@/lib/utils";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const unsafeProperty = await getProperty(params.id);
  const property = propertySchema.safeParse(unsafeProperty);
  if (!property.success) {
    console.error(property.error);
    redirect("/properties");
  }

  const [floorPlanUrls, photoUrls, videoUrls] = await Promise.all([
    property.data.floorPlan?.length
      ? await getAllURLs(property.data.floorPlan, property.data.id)
      : [],
    property.data.photos?.length
      ? await getAllURLs(property.data.photos, property.data.id)
      : [],
    property.data.videos?.length
      ? await getAllURLs(property.data.videos, property.data.id)
      : [],
  ]);

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center justify-center">
        {(await isAdmin()) && <Buttons id={property.data.id} />}
        {/* <Tabs defaultValue="photos" className="w-[800px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="floorPlan">Floor Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="photos">
            {photoUrls.length ? (
              <DetailsCarousel urls={photoUrls} />
            ) : (
              <div>No Photos</div>
            )}
          </TabsContent>
          <TabsContent value="videos">
            {videoUrls.length ? (
              <DetailsCarousel urls={videoUrls} />
            ) : (
              <div>No Videos</div>
            )}
          </TabsContent>
          <TabsContent value="floorPlan">
            {floorPlanUrls.length ? (
              <DetailsCarousel urls={floorPlanUrls} />
            ) : (
              <div>No Floor Plan</div>
            )}
          </TabsContent>
        </Tabs> */}
        <MaxWidthWrapper>
          {photoUrls.length ? (
            <DetailsCarousel urls={photoUrls} />
          ) : (
            <div>No Photos</div>
          )}
        </MaxWidthWrapper>
        <h3>
          {property.data.leased ? "Leased" : "Available"} |{" "}
          {property.data.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          / mo. | {property.data.numUnits} units
        </h3>
        <h3 className="font-semibold text-3xl place-self-start">
          Property Description
        </h3>
        <p>{property.data.description}</p>
      </section>
    </MaxWidthWrapper>
  );
}
