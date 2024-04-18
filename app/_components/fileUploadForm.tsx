"use client";
import { handleFileUpload } from "../fileActions";
import { useFormState } from "react-dom";

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
