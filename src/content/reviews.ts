import { siteConfig } from '@/content/site-config';

// Customer reviews copied from the Google Business Profile. Text is verbatim (typos, caps and punctuation kept).
// The only edits: Tamalin P.'s three em dashes became " - ", and the emoji at the end of Silvia S.'s review was dropped.
// All 21 reviews are 5 stars, checked against the Google profile. Do not add reviews that were not pasted by the owner.
// The headline figure shown on the site (4.8 stars, 40 Google reviews) comes from siteConfig, never from this list.

export const GOOGLE_REVIEW_URL = siteConfig.googleReviewUrl;

// One-line switch for the 15 service-neutral reviews (no appliance or service is named, so we cannot confirm
// they were HVAC jobs). Set to false to show only the six reviews that name HVAC work.
export const INCLUDE_GENERAL_REVIEWS = true;

export type Review = {
  id: string;
  name: string;
  rating: 5;
  date: string | null;
  text: string;
  service: 'hvac' | 'general';
  serviceSlug?: 'ac-repair' | 'heating-repair' | 'ductwork'; // map through serviceHref(); verified against services.ts
  lang?: 'es';
};

// HVAC reviews first (the work is named in the review), then service-neutral reviews.
export const reviews: Review[] = [
  {
    id: 'tamalin-p',
    name: 'Tamalin P.',
    rating: 5,
    date: 'Oct 2025',
    service: 'hvac',
    serviceSlug: 'ac-repair',
    text:
      'Chris from AirPro Solutions was beyond the best. He came over three times to fix a tricky AC leak, and every time I called, he was calm, cool as a cucumber, and always found a solution. What stood out most is his honesty - one company quoted me $1,200, but Chris only charged a tenth of that. Another time he replaced a pipe and still kept the cost minimal.\n\nIn a day and age where so many companies are price gouging, Chris is fair, knowledgeable, and truly trustworthy. He even refused to charge me when he was just testing different fixes. He’s certified, services reputable buildings in Los Angeles, and even gave me tips on keeping my unit healthy for the long run. I found AirPro Solutions on Thumbtack - Chris texted me right after hours and was at my place the next day. Honest, dependable, and professional - I couldn’t recommend him more highly.',
  },
  {
    id: 'cometbeats',
    name: 'COMETBEATS',
    rating: 5,
    date: 'Sep 2025',
    service: 'hvac',
    serviceSlug: 'ac-repair',
    text: 'I wasn’t home at the time of the service, but I came home to a very cooled down house!',
  },
  {
    id: 'jocelyn-s',
    name: 'Jocelyn S.',
    rating: 5,
    date: 'May 2024',
    service: 'hvac',
    serviceSlug: 'heating-repair',
    text: 'David recently replaced my heater he gave me a great price & replaced it the next day. The team is always happy to answer any questions and is always just a quick call away. I would definitely recommend their services!',
  },
  {
    id: 'jonathan-r',
    name: 'Jonathan R.',
    rating: 5,
    date: 'May 2024',
    service: 'hvac',
    serviceSlug: 'ductwork',
    // TODO(copy): names "A&G Home Services", the name in the owner's Google replies. Shown verbatim; see docs/open-items.md "Reviews page".
    text: 'I recently hired A&G Home Services to replace the air ducts in my home , and I’m very happy with the results. The new ducts have made a noticeable difference in the air quality and efficiency of my HVAC system .',
  },
  {
    id: 'robert-g',
    name: 'Robert G.',
    rating: 5,
    date: 'May 2024',
    service: 'hvac',
    serviceSlug: 'ac-repair',
    // TODO(copy): names "A &G" and uses the word "crapped". Shown verbatim pending the owner's call; see docs/open-items.md.
    text: 'Had a great experience with David, Tim and Cristobal… my AC unit crapped and they came in and solve my issue at affordable prices!!! Very good business!! Love A &G',
  },
  {
    id: 'jamie-m',
    name: 'Jamie M.',
    rating: 5,
    date: 'May 2024',
    service: 'hvac',
    serviceSlug: 'ac-repair',
    text: 'Chris & David came to replace my Ac compressor they were very professional & thorough with their work.',
  },
  // Service-neutral reviews (no appliance or service named). Newest first, then by date.
  { id: 'hilda-c', name: 'Hilda C.', rating: 5, date: 'Nov 2025', service: 'general', text: 'Great and very helpful service!!' },
  { id: 'danae', name: 'Danae', rating: 5, date: 'Jun 2025', service: 'general', text: 'Service was quick and they communicated well as far as timing of the part arriving and scheduling the service appointment.' },
  { id: 'vinicio-a', name: 'Vinicio A.', rating: 5, date: 'Jun 2025', service: 'general', text: 'Great technician Cristobal is very hard working . I like the communication betweeen the company amd myself . Great experience .' },
  { id: 'paul-u', name: 'Paul U.', rating: 5, date: 'Apr 2025', service: 'general', text: 'Excellent prompt professional service!' },
  { id: 'virginia-d', name: 'Virginia D.', rating: 5, date: 'Nov 2024', service: 'general', text: 'They came immediately to help, same day and fixed my issue.' },
  { id: 'manuela-a', name: 'Manuela A.', rating: 5, date: 'Sep 2024', service: 'general', lang: 'es', text: 'Muy buen sevicio.' },
  { id: 'sergio-v', name: 'Sergio V.', rating: 5, date: 'Jul 2024', service: 'general', text: 'Cris was accurate with his troubleshooting and courteous.' },
  { id: 'patty-s', name: 'Patty S.', rating: 5, date: 'May 2024', service: 'general', text: 'I was very pleased with the service. Both men arrived in a timely manner. Parts were ordered and repair completed in time promised.' },
  { id: 'silvia-s', name: 'Silvia S.', rating: 5, date: 'May 2024', service: 'general', text: 'Professional, timely, very knowledgeable, precise, courteous, clean work, very reasonable pricing!!' },
  { id: 'santiago-s', name: 'Santiago S.', rating: 5, date: 'May 2024', service: 'general', text: 'Quick service and trustworthy. I would definitely recommend!!!' },
  // TODO(copy): "AG services" is the owner's reply name, "A&G Home Services". Shown verbatim.
  { id: 'bob-w', name: 'Bob W.', rating: 5, date: 'May 2024', service: 'general', text: 'AG services were prompt and friendly. We work together to schedule my service. They explained in detail what was to be done and was done within the time allotted!' },
  { id: 'jamsline-m', name: 'Jamsline M.', rating: 5, date: 'May 2024', service: 'general', text: 'Very good work. Not pricey at all. Honest with integrity. Not going to rip you off! Shows you how to save money! Would definitely recommend.' },
  { id: 'gary-b', name: 'Gary B.', rating: 5, date: 'Apr 2024', service: 'general', text: 'Work was great, friendly, attentive and on time. Would have Them back if We had more work.' },
  { id: 'peretz-g', name: 'Peretz G.', rating: 5, date: null, service: 'general', text: 'The technician did an excellent job very thorough' },
  { id: 'michelle-a', name: 'Michelle A.', rating: 5, date: null, service: 'general', text: 'Always on time and efficient' },
];

export const getReviews = (): Review[] =>
  reviews.filter((r) => INCLUDE_GENERAL_REVIEWS || r.service === 'hvac');
