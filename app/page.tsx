import PictureCarousel from "@/components/picturesCarousel";
import About from "@/components/aboutSection";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import PropertiesCarousel from "@/components/propertiesCarousel";

// Images need to be on client I think
// TODO: Make function in fileActions to return array of urls for Images
// function makeImages(urls: string[]) {
//   return urls.map((url) => (
//     <Image src={url} alt="image" width={500} height={500} />
//   ));
// }

export default async function Home() {
  // Property Pictures carosel
  // Properties Carasel
  // About

  // const srcArray = await images();
  // console.log(srcArray);
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
        <div>
          <h2 className="text-5xl font-semibold text-center pt-4">
            Properties
          </h2>
          <PropertiesCarousel />
        </div>
        <About />
      </MaxWidthWrapper>
    </div>
  );
}
