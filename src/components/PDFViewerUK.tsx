import React from 'react';

const PDFViewerUK: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src="/pdfs/deck_uk.pdf"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default PDFViewerUK;
