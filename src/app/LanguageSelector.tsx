import React from 'react';
import Image from 'next/image';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useEffect } from 'react';

const LanguageSelector = () => {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<string>("en");

  useEffect(() => {
    const languageSelected = localStorage.getItem("languageSelected");
    if (!languageSelected) {
      setOpen(true);
    } else {
      setLanguage(languageSelected);
    }
  }, []);

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem("languageSelected", lang);
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <>
      <div className="fixed top-4 right-4">
        <button onClick={() => setOpen(true)} className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
          {language === "en" ? (
            <Image src="/flags/uk.png" alt="English" width={32} height={21.3} />
          ) : (
            <Image src="/flags/fr.png" alt="Français" width={32} height={21.3} />
          )}
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="text-center">Sélectionnez la langue</DialogTitle>
        <DialogContent>
          <div className="flex justify-center space-x-4">
            <button onClick={() => handleLanguageSelect("en")} className="border-none bg-transparent p-0">
              <Image src="/flags/uk.png" alt="English" width={96} height={64} />
            </button>
            <button onClick={() => handleLanguageSelect("fr")} className="border-none bg-transparent p-0">
              <Image src="/flags/fr.png" alt="Français" width={96} height={64} />
            </button>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center">
          <Button onClick={() => setOpen(false)}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LanguageSelector;
