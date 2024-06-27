import PictureCarousel from "@/components/picturesCarousel";
import About from "@/components/aboutSection";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default async function Home() {
  return (
    <div>
      <div className="bg-slate-200">
        <MaxWidthWrapper>
          <h1 className=" text-center font-semibold py-5 p-16 text-5xl">
            <span className="text-blue-800">Bison</span> Properties
          </h1>
        </MaxWidthWrapper>
        <div className="w-full lg:aspect-[16/4] aspect-[16/6] m-0 p-0">
          <PictureCarousel />
        </div>
      </div>
      <MaxWidthWrapper>
        <About />
      </MaxWidthWrapper>
    </div>
  );
}
