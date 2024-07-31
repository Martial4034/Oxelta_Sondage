import React from 'react';

const PDFViewerUK: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src="https://firebasestorage.googleapis.com/v0/b/oxelta.appspot.com/o/pdfs%2Fdeck_uk.pdf?alt=media&token=d7faf1f0-7a60-4d08-a243-f9b090316ed8"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default PDFViewerUK;
