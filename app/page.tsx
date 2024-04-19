import PropertyForm from "@/components/addPropertyForm";
import FileUpload from "@/components/fileUploadForm";
import PictureCarousel from "@/components/picturesCarousel";
import About from "@/components/aboutSection";

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
    <div className="flex flex-col border-2 items-center">
      <h1 className="text-5xl p-5">Bison Properties</h1>
      <PictureCarousel />
      <About />
    </div>
  );
}
