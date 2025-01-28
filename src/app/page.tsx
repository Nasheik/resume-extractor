"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import PDFUploader from "@/components/PDFUploader";
import EmbedPDF from "@/components/EmbedPDF";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <Layout>
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
          <h1 className="text-4xl font-bold text-center">Reform My Resume</h1>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
          <div className="flex flex-col h-full gap-8">
            <PDFUploader onUpload={(file) => setUploadedFile(file)} />

            {uploadedFile && (
              <EmbedPDF file={URL.createObjectURL(uploadedFile)} />
            )}

            {uploadedFile && (
              <Link
                href="/selection"
                className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reform
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
