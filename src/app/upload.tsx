import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const FileUploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, #6366f1 45%, #6366f1 55%, transparent 55%),
              linear-gradient(-45deg, transparent 45%, #6366f1 45%, #6366f1 55%, transparent 55%)
            `,
            backgroundSize: '30px 30px'
          }}>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          File Upload
        </h1>

        <div 
          className={`
            rounded-xl p-12 
            transition-all duration-200 ease-in-out
            shadow-lg backdrop-blur-sm
            ${isDragging ? 'bg-white/80 ring-4 ring-blue-500' : 'bg-white/60'}
            ${file ? 'ring-4 ring-green-500' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`
              w-24 h-24 rounded-full mb-6 flex items-center justify-center
              ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}
              ${file ? 'bg-green-100' : ''}
            `}>
              <Upload 
                className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'} ${file ? 'text-green-500' : ''}`}
              />
            </div>
            <p className="text-lg mb-2 text-gray-600">
              Drag and drop your file here, or
            </p>
            <label className="
              cursor-pointer px-4 py-2 rounded-full
              bg-gradient-to-r from-blue-500 to-purple-500
              text-white hover:from-blue-600 hover:to-purple-600
              transition-all duration-200
            ">
              Choose File
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {file && (
              <p className="mt-4 text-green-600">
                Selected: {file.name}
              </p>
            )}
          </div>
        </div>

        <button 
          className="
            w-full mt-8 px-6 py-3 
            bg-gradient-to-r from-blue-500 to-purple-500
            text-white rounded-lg
            transform transition-all duration-200
            hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02]
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl
          "
          disabled={!file}
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default FileUploadPage;