import { getProperty } from "@/AWSComponents/dynamoActions";
import { getAllURLs } from "@/AWSComponents/s3Actions";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import Buttons from "./buttons";
import { propertySchema } from "@/types/Property";
import DetailsCarousel from "@/components/detailsCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const unsafeProperty = await getProperty(params.id);
  const property = propertySchema.safeParse(unsafeProperty);
  if (!property.success) {
    console.error(property.error);
    redirect("/");
  }

  const [floorPlanUrls, photoUrls, videoUrls] = await getAllURLs(property.data);

  const session = await getSession();

  return (
    <section className="flex flex-col items-center justify-center">
      <h1>Property Name: {property.data.name}</h1>
      <Tabs defaultValue="photos" className="w-[800px]">
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
      </Tabs>
      <h3>
        {property.data.leased ? "Leased" : "Available"} | $
        {property.data.price.toFixed(2)} / mo.
      </h3>
      <p>{property.data.description}</p>
      <p>{property.data.numUnits}</p>
      {session && <Buttons id={property.data.id} />}
    </section>
  );
}
