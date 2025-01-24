'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface PDFUploaderProps {
  onUpload: (file: File) => void;
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      const pdfFile = acceptedFiles[0];
      if (pdfFile) {
        setError(null);
        onUpload(pdfFile);
      }
    },
    onDropRejected: () => {
      setError('Please upload a valid PDF file.');
    },
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className="border-2 border-dashed p-6 text-center cursor-pointer hover:bg-gray-100"
    >
      <input {...getInputProps()} />
      <p>Drag and drop a PDF file, or click to select</p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}