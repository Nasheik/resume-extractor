import React, { useState } from 'react';

const ResumeUpload = ({ navigate, file, setFile }) => {
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
        <div className="min-h-screen w-full">
            {/* Pattern Background */}
            <div className="absolute inset-0" style={{
                backgroundColor: '#ffffff',
                backgroundImage: `
          radial-gradient(circle at 50% 0%, transparent 9px, #e0e0e0 10px, transparent 11px),
          linear-gradient(#ffffff 40px, transparent 0)
        `,
                backgroundSize: '40px 40px',
                opacity: '0.8'
            }} />
            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md px-3 pb-1 pt-10 mb-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Reform My Resume
                    </h1>
                </div>
                {/* Title */}


                {/* Upload Section */}
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 place-items-center">
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
                    {uploadedFile && (uploadedFile.startsWith('data:application/pdf') ? (
                        setFile(uploadedFile),
                        < embed
                            src={uploadedFile}
                            type="application/pdf"
                            width="24.7%"
                            height="194"
                            className="rounded"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Document Preview Available
                        </div>

                    )
                    )}
                    {uploadedFile ? (
                        <div className='flex justify-center mt-6'>
                            <button onClick={() => navigate(2)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Reform
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div >
    );
};

export default ResumeUpload;