import React, { useState } from 'react';
import { Button, Menu, MenuItem, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useSession } from 'next-auth/react';

const UploadPdfButton: React.FC = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const showError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const showSuccess = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, fileName: string) => {
    if (!event.target.files || event.target.files.length === 0) return;
    setLoading(true);

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await fetch('/api/uploadPdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      showSuccess('Le fichier a été téléversé avec succès');
    } catch (error) {
      console.error('Error uploading file:', error);
      showError('Erreur lors du téléversement du fichier');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick} disabled={!session || loading}>
        {loading ? <CircularProgress size={24} /> : 'Téléverser PDF'}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <label htmlFor="upload-deck_vf" style={{ cursor: 'pointer' }}>
            deck_vf.pdf
          </label>
          <input
            id="upload-deck_vf"
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'deck_vf.pdf')}
          />
        </MenuItem>
        <MenuItem>
          <label htmlFor="upload-deck_uk" style={{ cursor: 'pointer' }}>
            deck_uk.pdf
          </label>
          <input
            id="upload-deck_uk"
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'deck_uk.pdf')}
          />
        </MenuItem>
      </Menu>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadPdfButton;