"use client";

import { convertFileToUrl } from "@/lib/utils";
import { on } from "events";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="file"
          width={600}
          height={600}
          className="max-h-[600px] overflow-hidden object-cover"
        />
      ) : (
        <p className="p-5 border border-dashed">Click here to upload a file</p>
      )}
    </div>
  );
};
