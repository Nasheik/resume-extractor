import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";



const ResumeParser = () => {
    const [resumeData, setResumeData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function loadPDF(file) {
        try {
            const arrayBuffer = file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            console.log('PDF loaded, total pages:', pdf.numPages);
            // Call another function or perform operations
            processLoadedPDF(pdf);
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    }

    const parseResume = (file) => {
        loadPDF(file);


        setLoading(true);
        setError('');

        // const reader = new FileReader();
        // reader.onload = (e) => {
        //     try {
        //         // This is a simplified parser - in a real app you'd want more sophisticated parsing
        //         const text = e.target.result;
        //         console.log(file);
        //         // Basic extraction of common resume sections
        //         const arrayBuffer = file.arrayBuffer();

        //         const pdf = pdfjsLib.getDocument(arrayBuffer).promise.then((pdf) => { console.log(pdf); }).catch((err) => { console.log(err); });
        //         // console.log(pdf);
        //         // const pdf = pdfjsLib.getDocument(e);

        //         const parsed = {
        //             contact: extractContact(text),
        //             education: extractSection(text, "Education"),
        //             experience: extractSection(text, "Experience"),
        //             skills: extractSection(text, "Skills")
        //         };

        //         setResumeData(parsed);
        //         setLoading(false);
        //     } catch (err) {
        //         setError('Failed to parse resume. Please try again.');
        //         setLoading(false);
        //     }
        // };

        // reader.onerror = () => {
        //     setError('Failed to read file. Please try again.');
        //     setLoading(false);
        // };

        // reader.readAsText(file);
    };

    // Simple extraction functions - would need to be more sophisticated in production
    const extractContact = (text) => {
        const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
        const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;

        return {
            email: text.match(emailRegex)?.[0] || '',
            phone: text.match(phoneRegex)?.[0] || ''
        };
    };

    const extractSection = (text, sectionName) => {
        // Very basic section extraction - would need improvement
        const sections = text.split(/\n(?=[A-Z][A-Z\s]+:?$)/m);
        const section = sections.find(s => s.includes(sectionName));
        return section?.split('\n').slice(1).filter(Boolean) || [];
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Resume Parser</h1>
                    <p className="text-gray-600">Upload your resume to extract information</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                            type="file"
                            accept=".txt,.doc,.docx,.pdf"
                            onChange={(e) => e.target.files?.[0] && parseResume(e.target.files[0])}
                            className="hidden"
                            id="resume-upload"
                        />
                        <label
                            htmlFor="resume-upload"
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <Upload className="h-12 w-12 text-gray-400 mb-3" />
                            <span className="text-gray-600">Drop your resume here or click to upload</span>
                            <span className="text-sm text-gray-500 mt-1">Supports PDF, DOC, DOCX, and TXT</span>
                        </label>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Parsing resume...</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {resumeData && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="h-5 w-5 text-green-500" />
                            <h2 className="text-xl font-semibold">Extracted Information</h2>
                        </div>

                        <div className="space-y-6">
                            <section>
                                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p>{resumeData.contact.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p>{resumeData.contact.phone}</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium mb-2">Education</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {resumeData.education.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium mb-2">Experience</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {resumeData.experience.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium mb-2">Skills</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {resumeData.skills.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeParser;