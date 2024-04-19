"use client";
import { handleFileUpload } from "../../AWSComponents/s3Actions";
import { useFormState } from "react-dom";

// Form for uploading file to S3
// TODO: Add multi file support
// TODO: Make form for entire property, not just file upload
export default function FileUpload() {
  const [state, formAction] = useFormState(handleFileUpload, null);

  return (
    <>
      <form action={formAction}>
        <label htmlFor="file">Choose A file</label>
        <input type="file" id="file" name="file" accept="image/*, video/*" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}
