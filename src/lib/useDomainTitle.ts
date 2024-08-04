'use client';

import { useEffect, useState } from 'react';

export function useDomainTitle() {
  const [title, setTitle] = useState('Sondage Oxelta');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;

      if (hostname === 'deck.vf.oxelta.io') {
        setTitle('Deck Oxelta FR');
      } else if (hostname === 'deck.oxelta.io') {
        setTitle('Deck Oxelta EN');
      }
    }
  }, []);

  return title;
}
