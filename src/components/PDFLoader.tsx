"use client";

import { useEffect } from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';

interface PDFLoaderProps {
  signedUrl: string;
}

const  PDFLoader: React.FC<PDFLoaderProps> = ({ signedUrl }) => {
  useEffect(() => {
    if (signedUrl) {
      window.location.href = signedUrl;
    }
  }, [signedUrl]);

  return (
    <Container
      component="main"
      maxWidth="xl"
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
};

export default PDFLoader;
