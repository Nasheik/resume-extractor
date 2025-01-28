import React from 'react';

interface EmbedPDFProps {
    file: string;
}

const EmbedPDF: React.FC<EmbedPDFProps> = ({ file }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '33vh' }}>
            <embed src={file} type="application/pdf" width="200vh" height="257.5vh" style={{ overflow: 'hidden' }} />
        </div>
    );
};

export default EmbedPDF;