'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { publishedServices } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// Both values are inlined at build time (static export). See README "Contact form" and .env.example.
// The production build fails if either is missing (scripts/check-form-env.mjs). In local dev an empty
// endpoint makes the form refuse to submit and show a call fallback, so a lead is never silently
// dropped behind a fake success page, and an empty site key simply skips the Turnstile widget.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

// TODO(data): final SMS/TCPA consent wording must be approved by the client/counsel and match /privacy/.
const CONSENT_NON_MARKETING =
  'By checking this box, I consent to receive non-marketing text messages from AIRPRO SOLUTIONS about appointments, service updates, and account notifications. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.';
const CONSENT_MARKETING =
  'By checking this box, I consent to receive marketing text messages from AIRPRO SOLUTIONS about special offers, discounts, and promotions. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.';

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'service' | 'captcha', string>>;
type Status = 'idle' | 'sending' | 'error' | 'unconfigured';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

function validate(fd: FormData, hasCaptcha: boolean, token: string): Errors {
  const e: Errors = {};
  if (!String(fd.get('name') ?? '').trim()) e.name = 'Enter your name.';
  if (String(fd.get('phone') ?? '').replace(/\D/g, '').length < 10) e.phone = 'Enter a phone number with area code.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get('email') ?? '').trim())) e.email = 'Enter a valid email address.';
  if (!String(fd.get('service') ?? '')) e.service = 'Choose a service.';
  if (hasCaptcha && !token) e.captcha = 'Complete the verification before sending.';
  return e;
}

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const mount = () => {
      if (!window.turnstile || !widgetRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };
    if (window.turnstile) {
      mount();
      return;
    }
    const src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    let s = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (!s) {
      s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    s.addEventListener('load', mount);
    return () => s?.removeEventListener('load', mount);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real visitors never see or fill this field. Pretend success, send nothing.
    if (String(fd.get('company_website') ?? '').trim()) {
      router.push('/thank-you/');
      return;
    }

    const found = validate(fd, Boolean(TURNSTILE_SITE_KEY), token);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      fd.delete('company_website');
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('bad response');
      router.push('/thank-you/');
    } catch {
      setStatus('error');
      setToken('');
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  const err = (k: keyof Errors) => (errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `err-${k}` } : {});
  const msg = (k: keyof Errors) =>
    errors[k] ? (
      <span className="field-error" id={`err-${k}`} role="alert">
        {errors[k]}
      </span>
    ) : null;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label className="field">Name
        <input name="name" type="text" autoComplete="name" required {...err('name')} />
        {msg('name')}
      </label>
      <label className="field">Phone
        <input name="phone" type="tel" autoComplete="tel" required {...err('phone')} />
        {msg('phone')}
      </label>
      <label className="field">Email
        <input name="email" type="email" autoComplete="email" required {...err('email')} />
        {msg('email')}
      </label>
      <label className="field">Service needed
        <select name="service" required defaultValue="" {...err('service')}>
          <option value="" disabled>Select a service</option>
          {publishedServices.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
          <option value="other">Other / not sure</option>
        </select>
        {msg('service')}
      </label>
      <label className="field">Message
        <textarea name="message" rows={4} />
      </label>
      {/* Honeypot, hidden from people and assistive tech. */}
      <div className="hp-field" aria-hidden="true">
        <label>Company website
          <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {/* Both boxes are optional and unchecked by default: SMS consent must not be a condition of submitting. */}
      <label className="consent">
        <input name="sms_consent_non_marketing" type="checkbox" value="yes" />
        <span>{CONSENT_NON_MARKETING}</span>
      </label>
      <label className="consent">
        <input name="sms_consent_marketing" type="checkbox" value="yes" />
        <span>{CONSENT_MARKETING}</span>
      </label>
      {TURNSTILE_SITE_KEY && <div ref={widgetRef} className="turnstile-box" />}
      {msg('captcha')}
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Request service'}
      </button>
      {status === 'unconfigured' && (
        <p className="pending" role="alert">
          We could not send your request from this page. Please call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
        </p>
      )}
      {status === 'error' && (
        <p className="pending" role="alert">
          Something went wrong and your request was not sent. Please try again or call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
        </p>
      )}
    </form>
  );
}
