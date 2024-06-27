"use client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { error } from "console";

interface FileUploadProps {
  file: File;
  progress: number;
  thumbnail: string;
  error?: string;
  onDelete: (file: File) => void;
}
export function FileUploadWithProgress({
  file,
  thumbnail,
  onDelete,
  progress,
  error,
}: FileUploadProps) {
  return (
    <div className="flex gap-4 justify-between items-center rounded-lg border-slate-600 border p-2">
      <div className="flex items-center gap-1">
        <Image width={50} height={50} src={thumbnail} alt="Uploaded photo" />
        <div>{file.name}</div>
      </div>
      <div className="flex items-center w-[20vw]">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <Progress value={progress} />
        )}
        <Button size={"icon"} variant={"ghost"} onClick={() => onDelete(file)}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
