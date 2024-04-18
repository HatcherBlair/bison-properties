"use server";
import Image from "next/image";
import images from "./_components/S3Image";
import FileUpload from "./_components/fileUploadForm";

function makeImages(urls: string[]) {
  return urls.map((url) => (
    <Image src={url} alt="image" width={500} height={500} />
  ));
}

export default async function Home() {
  const srcArray = await images();
  console.log(srcArray);
  return (
    <>
      <p>Testing...</p>
      {makeImages(srcArray)}
      <FileUpload />
    </>
  );
}
