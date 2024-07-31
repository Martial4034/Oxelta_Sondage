import React from 'react';

const PDFViewerVF: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src="/pdfs/deck_vf.pdf"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default PDFViewerVF;
