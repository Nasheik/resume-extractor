import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload'
import ResumeParser from './ResumeParser'
import PaymentPage from './PaymentPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState(null);

  const navigate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {currentPage === 2 && <ResumeUpload navigate={navigate} file={file} setFile={setFile} />}
      {currentPage === 1 && <ResumeParser navigate={navigate} file={file} />}
      {currentPage === 3 && <PaymentPage navigate={navigate} file={file} />}
    </div>
  );
};

export default App