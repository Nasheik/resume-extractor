import React, { useState } from 'react';

const ResumeUpload = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedFile(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-100">
            {/* Pattern Background */}
            <div className="absolute inset-0" style={{
                backgroundColor: '#ffffff',
                backgroundImage: `
          radial-gradient(circle at 0% 50%, transparent 9px, #e0e0e0 10px, transparent 11px),
          radial-gradient(circle at 100% 50%, transparent 9px, #e0e0e0 10px, transparent 11px),
          linear-gradient(#ffffff 40px, transparent 0)
        `,
                backgroundSize: '40px 40px',
                opacity: '0.5'
            }} />

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen px-4 py-8">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Reform My Resume
                </h1>

                {/* Upload Section */}
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                    {/* Upload Button - Always Visible */}
                    <div className="text-center mb-6">
                        <label className="block">
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                            />
                            <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                                {uploadedFile ? 'Replace Resume' : 'Upload Your Resume'}
                            </span>
                        </label>
                        <p className="mt-2 text-sm text-gray-600">
                            Supported formats: PDF, DOC, DOCX
                        </p>
                    </div>

                    {/* Preview Section - Shows only when file is uploaded */}
                    {uploadedFile && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4 text-center">Resume Preview</h2>
                            <div className="aspect-[8.5/11] w-full bg-white rounded shadow-sm border border-gray-200">
                                {uploadedFile.startsWith('data:application/pdf') ? (
                                    <embed
                                        src={uploadedFile}
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                        className="rounded"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        Document Preview Available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeUpload;