'use client';
import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Upload } from 'lucide-react';

export default function Home() {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle the files
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Process files
    }
  };

  return (
    <Layout>
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
          <h1 className="text-4xl font-bold text-center">Reform My Resume</h1>
        </div>
      </div>
      <div className="flex flex-col h-full gap-8">
        
        <div 
          className={`flex-1 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">Drag and drop your files here, or click to select files</p>
          </div>
        </div>

        <Link 
          href="/carousel" 
          className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next Page
        </Link>
      </div>
    </Layout>
  );
}