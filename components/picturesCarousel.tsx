"use client";
import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import MaxWidthWrapper from "./maxWidthWrapper";
import styles from "@/styles/imageCarousel.module.css";

export default function PicturesCarousel() {
  // Temp for testing purposes
  // TODO: pass images in with props and allow for admin to upload images for this slider
  const images = [
    "/SLC1.jpeg",
    "/SLC2.jpeg",
    "/SLC3.jpeg",
    "/SLC4.jpeg",
    "/SLC5.jpeg",
    "/SLC6.jpeg",
  ];

  const [imageIndex, setImageIndex] = useState(0);
  // Auto play is disabled once the user interacts with a button
  const [autoPlay, setAutoPlay] = useState(true);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) {
        return 0;
      }

      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) {
        return images.length - 1;
      }

      return index - 1;
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoPlay) {
        showNextImage();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [autoPlay]);

  return (
    <MaxWidthWrapper className="relative px-0 md:px-0 max-w-max">
      <div className="w-full h-full flex overflow-hidden">
        {images.map((url: string) => {
          return (
            <img
              key={url}
              src={url}
              className={styles.Image}
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          showPrevImage();
          setAutoPlay(false);
        }}
        className={styles.Btn}
        style={{ left: "0" }}
      >
        <ArrowBigLeft />
      </button>
      <button
        onClick={() => {
          showNextImage();
          setAutoPlay(false);
        }}
        className={styles.Btn}
        style={{ right: "0" }}
      >
        <ArrowBigRight />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => {
          return (
            <button
              className={styles.dotBtn}
              onClick={() => {
                setImageIndex(index);
                setAutoPlay(false);
              }}
              key={index}
            >
              {index === imageIndex ? <CircleDot /> : <Circle />}
            </button>
          );
        })}
      </div>
    </MaxWidthWrapper>
  );
}
