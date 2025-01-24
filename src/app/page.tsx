'use client';

import React, { useState } from 'react';
import PDFUploader from '@/components/PDFUploader';
import { extractPDFText } from '@/lib/pdf-utils';

export default function Home() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePDFUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const pdfText = await extractPDFText(file);
      console.log('PDF text:', pdfText);

      const response = await fetch('/api/analyze-pdf', {
        method: 'POST',
        body: JSON.stringify({ text: pdfText })
      });

      if (!response.ok) {
        throw new Error('PDF analysis failed');
      }

      const result = await response.json();
      setAnalysis(result.analysis);
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      setAnalysis('An error occurred during PDF analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Anthropic Analyzer</h1>
      <PDFUploader onUpload={handlePDFUpload} />
      
      {isLoading && (
        <div className="mt-4 text-center">
          <p>Analyzing PDF...</p>
        </div>
      )}
      
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-black">
          <h2 className="text-xl font-semibold mb-2">Analysis Result:</h2>
          <p>{analysis}</p>
        </div>
      )}
    </main>
  );
}