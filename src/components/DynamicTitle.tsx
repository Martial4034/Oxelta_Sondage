// src/components/DynamicTitle.tsx

'use client';

import { useEffect, useState } from 'react';

export function DynamicTitle() {
  const [title, setTitle] = useState('Sondage Oxelta');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;

      if (hostname.includes('deck.vf.oxelta.io')) {
        setTitle('Deck Oxelta FR');
      } else if (hostname.includes('deck.oxelta.io')) {
        setTitle('Deck Oxelta EN');
      } else {
        setTitle('Sondage Oxelta');
      }
    }

    document.title = title; // Set the document title directly
  }, [title]);

  return null; // This component only sets the title and doesn't render anything visible
}
