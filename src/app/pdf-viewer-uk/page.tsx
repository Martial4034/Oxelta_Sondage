"use client" ;

import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography, Container } from '@mui/material';

const PDFViewerAdaptive: React.FC = () => {
  const pdfUrl = "https://firebasestorage.googleapis.com/v0/b/oxelta.appspot.com/o/pdfs%2Fdeck_uk.pdf?alt=media&token=d7faf1f0-7a60-4d08-a243-f9b090316ed8";

  useEffect(() => {
    // Redirect the user to the PDF URL immediately
    window.location.href = pdfUrl;
  }, []);

  return (
    <Container 
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="textSecondary" mt={3}>
        Chargement du document PDF...
      </Typography>
      <Typography variant="body2" color="textSecondary" mt={1}>
        Vous serez redirigé sous peu.
      </Typography>
    </Container>
  );
}

export default PDFViewerAdaptive;
