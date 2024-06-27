"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderThumbItem,
  SliderMainItem,
} from "./ui/carouselWithThumbs";
import { useMemo } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export default function DetailsCarousel({
  urls,
  captions,
}: {
  urls: string[];
  captions?: string[];
}) {
  const mainImage = useMemo(() => {
    return urls.map((url, i) => {
      return (
        <SliderMainItem key={i} className="relative aspect-video w-full">
          <Image
            src={url}
            alt={`Property Photo ${i + 1}`}
            fill
            style={{ objectFit: "cover" }}
          />
          {captions && captions[i] && (
            <span className="w-full absolute bottom-0 text-center bg-black">
              {captions[i]}
            </span>
          )}
        </SliderMainItem>
      );
    });
  }, [urls, captions]);

  const thumbImage = useMemo(() => {
    return urls.map((url, i) => {
      return (
        <SliderThumbItem key={i} index={i} className="basis-1/4 md:basis-1/6">
          <Image
            src={url}
            fill
            alt={`Thumbnail for Image ${i + 1}`}
            style={{ objectFit: "cover" }}
            quality={50}
          />
        </SliderThumbItem>
      );
    });
  }, [urls]);

  return (
    <Carousel
      carouselOptions={{ axis: "x" }}
      plugins={[
        WheelGesturesPlugin({
          forceWheelAxis: "y",
        }),
      ]}
      className="p-6"
    >
      <CarouselMainContainer>{mainImage}</CarouselMainContainer>
      <CarouselThumbsContainer>{thumbImage}</CarouselThumbsContainer>
    </Carousel>
  );
}
