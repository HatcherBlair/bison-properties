"use client";
import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MousePointerSquareDashed, Image } from "lucide-react";
import { putURL } from "@/AWSComponents/s3Actions";
import { v4 as uuidV4 } from "uuid";
import { s3Object, type Property } from "@/types/Property";
import { Button } from "./ui/button";
import { FileUploadWithProgress } from "./fileUploadWithProgress";
import { s3PutByURL } from "@/lib/s3PutByURL";
import { FileWrapper } from "@/types/fileWrapper";
import { putProperty } from "@/AWSComponents/dynamoActions";

export function FileDropzone({ property }: { property?: Property }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<FileWrapper[]>([]);

  // Curently not handling rejected files
  function handleDrop(accFiles: File[]) {
    const newFiles: FileWrapper[] = accFiles.map((file) => {
      const newFile: FileWrapper = {
        file: file,
        uuid: uuidV4(),
        thumbURL: URL.createObjectURL(file),
        progress: 0,
      };
      return newFile;
    });

    setFiles([...newFiles, ...files]);
  }

  // Cleans up any leftover object URLI's for thumbnails
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.thumbURL));
  });

  // Removes a file from the list
  function onDelete(file: File) {
    const updatedFiles = files.filter((f) => f.file !== file);
    setFiles(updatedFiles);
  }

  // Sets progress of upload
  function setProgress(file: File, progress: number) {
    const newFiles = files.map((f) => {
      if (f.file !== file) {
        return f;
      }
      f.progress = progress;
      return f;
    });
    setFiles(newFiles);
  }

  async function handleUpload() {
    setIsUploading(true);
    // Get the PUT urls
    const filesWithURL = await Promise.all(
      files.map(async (f) => {
        let key: string;
        if (!property) {
          key = "homepage";
        } else {
          key = `${property.id}/${f.uuid}`;
        }
        f.uploadURL = await putURL(key);
        return f;
      })
    );

    // Wait for PUTs to settle
    const uploadStatus = await Promise.allSettled(
      filesWithURL.map((file) =>
        s3PutByURL(file.uploadURL as string, file.file, setProgress)
      )
    );

    // Add successful uploads to db and removed from files list
    let photos: s3Object[] = [];
    const newFiles = uploadStatus.map((upload, i) => {
      if (upload.status === "fulfilled") {
        // No Error, return undefined
        photos.push({
          Key: files[i].uuid,
        });
        return;
      } else {
        // Error, attach it to FileWrapper
        return { ...files[i], error: upload.reason.message };
      }
    });

    if (property) {
      await putProperty({
        ...property,
        photos: photos,
      });
    }

    const filteredFiles = newFiles.filter((file) => typeof file === undefined);
    setFiles(filteredFiles as FileWrapper[]);

    setIsUploading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[40vh]">
      <div
        className={cn(
          "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
          {
            "ring-blue-900/25 bg-blue-900/10": isDragOver,
          }
        )}
      >
        <div className="relative flex flex-1 flex-col items-center justify-center w-full">
          <Dropzone
            onDrop={handleDrop}
            accept={{
              "image/*": [".png", ".jpeg", ".jpg"],
              "video/*": [".mp4"],
            }}
            multiple={true}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            disabled={isUploading}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center">
                  {isDragOver ? (
                    <p className="text-xl flex gap-1">
                      <MousePointerSquareDashed className="text-blue-500" />{" "}
                      <span className="font-semibold text-blue-500">Drop</span>{" "}
                      files to upload
                    </p>
                  ) : (
                    <p className="text-xl text-slate-800">
                      <span className="font-semibold text-blue-500">
                        Drag and Drop
                      </span>{" "}
                      files here or{" "}
                      <span className="font-semibold text-blue-500">Click</span>{" "}
                      to upload
                    </p>
                  )}
                  <p className="text-sm text-blue-500 flex gap-1">
                    <Image /> Accepts png, jpg, jpeg, and mp4 files
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <div className="flex flex-col gap-1 ">
        {files.map((file, i) => (
          <FileUploadWithProgress
            key={i}
            file={file.file}
            thumbnail={file.thumbURL}
            progress={file.progress}
            error={file.error}
            onDelete={onDelete}
          />
        ))}
        <Button onClick={handleUpload} disabled={!Boolean(files.length)}>
          Upload Files
        </Button>
      </div>
    </div>
  );
}
