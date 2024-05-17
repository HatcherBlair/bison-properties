import PictureCarousel from "@/components/picturesCarousel";
import About from "@/components/aboutSection";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default async function Home() {
  return (
    <div>
      <MaxWidthWrapper>
        <h1 className="text-5xl text-center font-semibold p-16">
          Bison Properties
        </h1>
      </MaxWidthWrapper>
      <div className="w-full lg:aspect-[16/4] aspect-[16/6] m-0 p-0">
        <PictureCarousel />
      </div>
      <MaxWidthWrapper>
        <About />
      </MaxWidthWrapper>
    </div>
  );
}
