'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publishedServices } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// TODO(data): set the real form endpoint (Cloudflare Pages Function, Formspree, CRM webhook).
// While empty, the form refuses to submit and shows a call fallback, so a lead is never
// silently dropped behind a fake success page.
const FORM_ENDPOINT = '';

// TODO(data): final SMS/TCPA consent wording must be approved by the client/counsel and match /privacy/.
const CONSENT_TEXT =
  'I agree to receive calls and text messages from AIRPRO SOLUTIONS about my service request. Message and data rates may apply. Consent is not a condition of purchase. See our Privacy Policy.';

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'unconfigured'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(e.currentTarget) });
      if (!res.ok) throw new Error('bad response');
      router.push('/thank-you/');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="field">Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label className="field">Phone
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label className="field">Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="field">Service needed
        <select name="service" required defaultValue="">
          <option value="" disabled>Select a service</option>
          {publishedServices.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
          <option value="other">Other / not sure</option>
        </select>
      </label>
      <label className="field">Message
        <textarea name="message" rows={4} />
      </label>
      <label className="consent">
        <input name="sms_consent" type="checkbox" required />
        <span>{CONSENT_TEXT}</span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Request service'}
      </button>
      {status === 'unconfigured' && (
        <p className="pending" role="alert">
          <strong>Form not connected yet.</strong> Please call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
        </p>
      )}
      {status === 'error' && (
        <p className="pending" role="alert">
          Something went wrong. Please call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
        </p>
      )}
    </form>
  );
}
