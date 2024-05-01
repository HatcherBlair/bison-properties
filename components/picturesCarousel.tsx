import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchFiles } from "@/AWSComponents/s3Actions";
import Image from "next/image";

// Main Carousel
export default async function PictureCarousel() {
  const numItems = 5; // Number of items in Carousel, consider moving to prop
  const urls = await fetchFiles(numItems);
  return (
    <Carousel className="text-center">
      <CarouselContent>{generateItems(urls as string[])}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// Generate Items
function generateItems(urls: string[]): JSX.Element[] {
  return urls.map((url) => (
    <CarouselItem key={url}>
      <Image src={url} alt="Property Photo" height={250} width={250} />
    </CarouselItem>
  ));
}
