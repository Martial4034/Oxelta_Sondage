"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure le worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewerUK: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  const [preloadedPages, setPreloadedPages] = useState<{ [key: number]: boolean }>({});

  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess(pageNumber: number) {
    setPageWidth(window.innerWidth);
    setLoading(false);

    // Précharger la page suivante si elle n'est pas encore préchargée
    if (pageNumber < numPages && !preloadedPages[pageNumber + 1]) {
      setPreloadedPages((prev) => ({ ...prev, [pageNumber + 1]: true }));
    }
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  // Go to next page
  function goToNextPage() {
    if (pageNumber < numPages) {
      setLoading(true);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setLoading(true);
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    handleResize(); // Appel initial pour définir la largeur
    window.addEventListener('resize', handleResize); // Ajoute un listener pour les redimensionnements

    return () => {
      window.removeEventListener('resize', handleResize); // Nettoie le listener à la suppression du composant
    };
  }, []);

  return (
    <>
      <Nav pageNumber={pageNumber} numPages={numPages} />
      <div hidden={loading} style={{ height: "calc(100vh - 64px)" }} className="flex items-center">
        <div className="flex items-center justify-between w-full absolute z-10 px-2">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-10 w-10" aria-hidden="true" />
          </button>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>

        <div className="h-full flex justify-center mx-auto">
          <Document
            file="https://firebasestorage.googleapis.com/v0/b/oxelta.appspot.com/o/pdfs%2Fdeck_vf.pdf?alt=media&token=298b11ba-b460-4f68-b259-a396a6f1c16d"
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            renderMode="canvas"
            className=""
          >
            <Page
              className=""
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={() => onPageLoadSuccess(pageNumber)}
              onRenderError={() => setLoading(false)}
              width={Math.max(pageWidth * 0.8, 390)}
            />
            {/* Précharger la page suivante sans l'afficher */}
            {pageNumber < numPages && preloadedPages[pageNumber + 1] && (
              <Page
                className="hidden"
                key={pageNumber + 1}
                pageNumber={pageNumber + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                width={Math.max(pageWidth * 0.8, 390)}
              />
            )}
          </Document>
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75">
          <span>Loading...</span>
        </div>
      )}
    </>
  );
}

function Nav({ pageNumber, numPages }: { pageNumber: number, numPages: number }) {
  return (
    <nav className="bg-black">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-2xl font-bold tracking-tighter text-white">
                Oxelta
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
              <span>{pageNumber}</span>
              <span className="text-gray-400"> / {numPages}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PDFViewerUK;