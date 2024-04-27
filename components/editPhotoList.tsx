import { s3Object } from "@/types/Property";

export default function EditPhotoList(files: s3Object[]) {
  return (
    <div>
      {files.map((file: s3Object) => {
        return <div key={file.Key}>file.Key</div>;
      })}
    </div>
  );
}
