import { fetchFiles } from "@/AWSComponents/s3Actions";
import { FileDropzone } from "@/components/fileDropzone";
import ImagesWithDelete from "@/components/imagesWithDelete";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default async function Page() {
  const [keys, imageUrls] = await fetchFiles();

  return (
    <MaxWidthWrapper>
      <h1>Add New Photos</h1>
      <FileDropzone />

      <h1>Current images</h1>
      {imageUrls && (
        <ImagesWithDelete
          images={imageUrls as string[]}
          keys={keys as string[]}
        />
      )}
    </MaxWidthWrapper>
  );
}
