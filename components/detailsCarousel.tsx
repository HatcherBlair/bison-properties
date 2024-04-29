import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

// TODO: Add captions to images
// TODO: Make Captions appear nicely in an on hover
// TODO: Make bottom navigation carousel(I think the way to do it is dispaly carousel below and have carousel display image)
export default function DetailsCarousel({ urls }: { urls: string[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {urls.map((url) => (
          <CarouselItem
            key={url}
            className="w-[800px] h-[500px] flex justify-center items-center"
          >
            <Image src={url} alt="property Image" width={500} height={281.25} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
