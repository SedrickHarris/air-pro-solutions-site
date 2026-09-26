'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Fires the conversion event once on load.
// TODO(data): confirm the event name with the GA4/GTM setup and add the GTM container to layout.tsx.
export function ThankYouEvent() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', form: 'contact' });
  }, []);
  return null;
}
