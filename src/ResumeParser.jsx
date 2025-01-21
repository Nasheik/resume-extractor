import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeParser = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [extractedData, setExtractedData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.includes('text'))) {
            setFile(file);
            extractText(file);
        }
    };

    const extractText = async (file) => {
        // Simulated data extraction - in a real app, you'd use a proper parser
        const mockData = {
            name: "John Smith",
            email: "john@example.com",
            phone: "(555) 123-4567",
            experience: [
                "Software Engineer at Tech Corp - 2020-Present",
                "Junior Developer at StartUp Inc - 2018-2020"
            ],
            education: [
                "BS Computer Science - University Name - 2018"
            ],
            skills: [
                "JavaScript", "React", "Node.js", "Python"
            ]
        };
        setExtractedData(mockData);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Resume Parser</h1>

                {/* Upload Section */}
                <div className="mb-8">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>

                {/* Preview Section */}
                {file && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Preview</h2>
                        {file.type === 'application/pdf' ? (
                            <Document
                                file={file}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="border rounded-lg overflow-hidden"
                            >
                                <Page pageNumber={1} width={600} />
                            </Document>
                        ) : (
                            <div className="p-4 bg-white rounded border">
                                Document preview not available for this file type
                            </div>
                        )}
                    </div>
                )}

                {/* Extracted Data Section */}
                {extractedData && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Extracted Information</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-700">Personal Info</h3>
                                <p>Name: {extractedData.name}</p>
                                <p>Email: {extractedData.email}</p>
                                <p>Phone: {extractedData.phone}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700">Experience</h3>
                                <ul className="list-disc pl-5">
                                    {extractedData.experience.map((exp, i) => (
                                        <li key={i}>{exp}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700">Education</h3>
                                <ul className="list-disc pl-5">
                                    {extractedData.education.map((edu, i) => (
                                        <li key={i}>{edu}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {extractedData.skills.map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeParser;