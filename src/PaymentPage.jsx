import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PaymentPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex h-screen">
            {/* Left Side - PDF Preview */}
            <div className="w-1/2 p-6 bg-gray-50">
                <Document
                    file="/sample.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="border rounded-lg overflow-hidden"
                >
                    <Page pageNumber={1} width={500} />
                </Document>
            </div>

            {/* Right Side - Payment Form */}
            <div className="w-1/2 p-6 bg-white">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="MM/YY"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">CVV</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="123"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Pay Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;