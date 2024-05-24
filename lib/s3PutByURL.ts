import { S3PutResponseObject } from "@/types/s3PutResponse";

// Uploads file to s3 PUT URL
export function s3PutByURL(
  url: string,
  file: File,
  setProgress: (file: File, progress: number) => void
): Promise<S3PutResponseObject> {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          res({
            status: xhr.status,
            message: xhr.statusText,
          });
        } else {
          rej({
            message: xhr.statusText,
          });
        }
      }
    };

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        setProgress(file, Math.floor((e.loaded / e.total) * 100));
      }
    };

    xhr.open("PUT", url);
    xhr.send(file);
  });
}
