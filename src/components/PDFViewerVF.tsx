import React from 'react';

const PDFViewerVF: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src="https://firebasestorage.googleapis.com/v0/b/oxelta.appspot.com/o/pdfs%2Fdeck_vf.pdf?alt=media&token=298b11ba-b460-4f68-b259-a396a6f1c16d"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default PDFViewerVF;
