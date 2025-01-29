"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface PDFUploaderProps {
  onUpload: (file: File) => void;
  hasUploadedFile: Boolean;
}

export default function PDFUploader({
  onUpload,
  hasUploadedFile,
}: PDFUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      const pdfFile = acceptedFiles[0];
      if (pdfFile) {
        setError(null);
        onUpload(pdfFile);
      }
    },
    onDropRejected: () => {
      setError("Please upload a valid PDF file.");
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-6 text-center justify-items-center cursor-pointer hover:bg-gray-200"
    >
      <input {...getInputProps()} />
      {hasUploadedFile ? (
        <p>Drag and drop your resume PDF file, or click to select</p>
      ) : (
        <p>Drag and drop your resume PDF file, or click to select</p>
      )}
      {!hasUploadedFile && (
        <Image
          className="mt-5"
          src="/file.svg"
          alt="Upload"
          width={100}
          height={100}
        />
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
