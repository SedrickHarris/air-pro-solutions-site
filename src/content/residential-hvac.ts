import { siteConfig } from '@/content/site-config';
import { getService } from '@/content/services';
import type { Faq } from '@/content/faq';
import type { DecisionCard } from '@/components/sections/DecisionGrid';
import type { Card } from '@/components/sections/ServicesGrid';

// TODO(copy): client review of every string before launch.
// Rating and review count are rendered from siteConfig, never hardcoded here.

const intro =
  'Air Pro Solutions provides residential HVAC service for homeowners across Los Angeles County, the South Bay, Orange County, and the Inland Empire, from AC repair and heating repair to installation and seasonal maintenance.';

export const residentialHub = {
  path: '/residential-hvac/',
  primaryKeyword: 'residential hvac los angeles',
  // Title/H1 are built from src/lib/seo.ts (residentialHubTitle/residentialHubH1) per CLAUDE.md, not hand-written here.
  description:
    'Residential HVAC for homeowners across Los Angeles and Southern California: AC repair, heating repair, installation, and maintenance. Schedule home service.',
  intro, // also the Service schema description - must stay word-for-word identical to the hero copy

  hero: {
    primaryCta: { label: 'Schedule Home Service', href: '/contact/' },
    phoneCta: { label: `Call ${siteConfig.phone}`, href: siteConfig.phoneHref },
    proof: [
      { icon: 'check', text: 'Licensed HVAC contractor' },
      { icon: 'star', text: `${siteConfig.rating.toFixed(1)}-star Google rating` },
      // TODO(data): keep only if client confirms financing partner. /financing/ stub already says financing is available.
      { icon: 'dollar', text: 'Financing options available' },
      { icon: 'pin', text: 'Serving four Southern California regions' },
    ],
    photo: {
      src: '/images/services/residential-hub/hero.webp',
      alt: 'Bright living room with a wall-mounted HVAC thermostat and a view of drought-tolerant landscaping',
      captionTitle: 'Residential HVAC',
      captionBody: 'Cooling and heating service for Southern California homes',
    },
  },

  trust: [
    // TODO(data): financing item held until partner confirmed.
    { num: 'Financing', label: 'available on qualifying projects' },
    { num: `${siteConfig.rating.toFixed(1)}★`, label: `Google rating, ${siteConfig.reviewCount} reviews` },
    { num: '4', label: 'Southern California regions served' },
    { num: 'C-20', label: 'California licensed HVAC contractor' },
  ],

  decision: {
    eyebrow: 'Where to start',
    heading: 'How can we help with your home today?',
    lede: 'Tell us what is going on and we will point you to the right service.',
    cards: [
      { icon: 'x', title: 'My AC or heat is not working', body: 'Tell us what is happening and we will get a technician on the schedule.', href: '/emergency-hvac/', ctaLabel: 'Get urgent help' },
      { icon: 'refresh', title: 'I need a repair', body: 'Noises, leaks, weak airflow, or a system that will not turn on.', href: '/ac-repair/', ctaLabel: 'See AC repair' },
      { icon: 'plus', title: 'I need a new system', body: 'Replacement or new installation with an in-home estimate.', href: '/ac-installation/', ctaLabel: 'See AC installation' },
      { icon: 'calendar-check', title: 'I want a tune-up', body: 'Seasonal maintenance to catch small problems early.', href: '/ac-maintenance/', ctaLabel: 'See AC maintenance' },
      { icon: 'building', title: 'I live in a condo or HOA', body: 'Tell us about your building and access needs when you contact us.', href: '/contact/', ctaLabel: 'Contact us' },
      { icon: 'dollar', title: 'I want to ask about financing', body: 'Flexible financing is available for qualifying HVAC projects.', href: '/financing/', ctaLabel: 'See financing' },
    ] satisfies DecisionCard[],
  },

  why: {
    eyebrow: 'Why homeowners choose us',
    heading: 'A licensed local contractor homeowners rate highly',
    cards: [
      { icon: 'check', title: 'Licensed contractor', body: `California C-20 HVAC license, license numbers ${siteConfig.licenses.join(' and ')}.` },
      { icon: 'star', title: 'Rated by homeowners', body: `${siteConfig.rating.toFixed(1)} stars across ${siteConfig.reviewCount} Google reviews.` },
      { icon: 'pin', title: 'Across four regions', body: 'Los Angeles County, the South Bay, Orange County, and the Inland Empire.' },
    ] satisfies DecisionCard[],
  },

  services: {
    eyebrow: 'Core home services',
    heading: 'Everything your home comfort system needs',
    items: [
      { href: '/ac-repair/', name: 'AC Repair', description: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.', icon: 'snowflake', image: getService('ac-repair')?.image },
      { href: '/ac-installation/', name: 'AC Installation and Replacement', description: 'Properly sized systems, installed for homes across Southern California.', icon: 'wrench', image: getService('ac-installation')?.image },
      { href: '/heating-repair/', name: 'Heating Repair', description: 'Furnace and heating repair for Southern California homes.', icon: 'flame', image: getService('heating-repair')?.image },
      { href: '/heat-pump-services/', name: 'Heat Pump Services', description: 'One system for both heating and cooling, well suited to mild winters.', icon: 'wrench', image: getService('heat-pump-services')?.image },
      { href: '/ductless-mini-split/', name: 'Ductless Mini-Splits', description: 'Room-by-room comfort for older homes, ADUs, and additions with no ductwork.', icon: 'snowflake', image: getService('ductless-mini-split')?.image },
      {
        href: '/maintenance-plan/',
        name: 'HVAC Maintenance Plans',
        description: 'Seasonal tune-ups that help catch small problems early.',
        icon: 'calendar-check',
        image: { src: '/images/services/cards/maintenance-plan.webp', alt: 'Outdoor AC condenser beside a stucco home with desert landscaping' },
      },
    ] satisfies Card[],
  },

  process: {
    eyebrow: 'How it works',
    heading: 'Getting started with home service',
    steps: [
      { title: 'Call or book', body: 'Tell us what is going on: a repair, a replacement, or a tune-up.' },
      { title: 'Diagnose', body: 'A technician evaluates your system and explains what is wrong.' },
      { title: 'Confirm the plan', body: 'Pricing, scope, and scheduling are confirmed with you before work begins.' },
      { title: 'Service and follow-up', body: 'Your technician completes the work and reviews what was done.' },
    ],
  },

  areas: {
    eyebrow: 'Where we work',
    heading: 'Residential HVAC service across Southern California',
    intro: `Not sure whether we cover your city? Call ${siteConfig.phone} and we will confirm.`,
  },

  proof: {
    eyebrow: 'Why Air Pro',
    heading: 'Rated by homeowners across Southern California',
    body: `Homeowners have rated Air Pro Solutions ${siteConfig.rating.toFixed(1)} stars across ${siteConfig.reviewCount} Google reviews.`,
    ctaLabel: 'Read our reviews',
    ctaHref: '/reviews/',
    stats: [
      { num: `${siteConfig.rating.toFixed(1)}★`, label: 'Google rating' },
      { num: String(siteConfig.reviewCount), label: 'Google reviews' },
      { num: '4', label: 'Southern California regions' },
      { num: 'C-20', label: 'California HVAC license classification' },
    ],
  },

  faqEyebrow: 'Direct answers',
  faqHeading: 'Home HVAC questions Southern California homeowners ask',
  faqs: [
    {
      q: 'Does Air Pro Solutions offer financing for AC or heating replacement?',
      a: 'Flexible financing is available for qualifying HVAC projects. Contact Air Pro Solutions to talk through your options.',
    },
    {
      q: 'What rebates are available on a new home HVAC system?',
      a: 'Rebates vary by season and by utility provider. Qualifying high-efficiency air conditioners and heat pumps can be eligible for manufacturer or utility rebates. Ask about current eligibility when you request an estimate.',
    },
    {
      q: 'What should I ask about warranty before a repair or replacement?',
      a: 'Ask what parts and labor coverage applies and for how long. Equipment warranties from the manufacturer often depend on registration and regular maintenance. Have your technician explain what applies to your system before you decide.',
    },
    {
      q: "How do I know if I should repair or replace my home's AC?",
      a: 'Repair a single, minor failure on a system that has otherwise been reliable. Consider replacement when breakdowns become frequent, a major component such as the compressor fails, or the system is well past its expected lifespan. A technician can compare repair cost against replacement so you can decide with the full picture.',
    },
    {
      q: 'Do I need a permit to replace my AC in Southern California?',
      a: 'In most California cities, replacing or installing HVAC equipment requires a permit, and the work must meet Title 24 energy standards. Requirements vary by city, so confirm the details with your contractor and your local building department.',
    },
    {
      q: 'What does an HVAC maintenance visit typically cover?',
      a: 'A typical visit includes a seasonal inspection of your cooling and heating equipment, cleaning and checking key components, filter check and replacement guidance, and a written summary of what the technician found. Contact us to ask about maintenance plans.',
    },
    {
      q: 'How long does a home AC installation take?',
      a: 'Most single-system residential installations take one to two days, depending on the equipment, access, and whether ductwork or electrical work is needed. Air Pro Solutions can give you a timeline with your estimate.',
    },
    {
      q: 'What should I do if my AC stops working during a heat wave?',
      a: `Check that the thermostat is set to cool and that the air filter is clean. If the air is still warm, turn the system off and call a technician, since running it can cause more damage. Call ${siteConfig.phone} to request service.`,
    },
    {
      q: 'Is a heat pump a good choice for a Southern California home?',
      a: 'Often, yes. A heat pump both heats and cools using one system, and mild winters suit it well. Whether it fits your home depends on your existing equipment, ductwork, and comfort goals, so it is worth having a technician assess your home before deciding.',
    },
  ] satisfies Faq[],
  // TODO(copy): client review of every FAQ answer above before launch.

  finalCta: {
    heading: 'Request service for your home',
    body: 'Tell us what you need and we will get back to you.',
    primaryLabel: `Call ${siteConfig.phone}`,
    secondaryLabel: 'Schedule Home Service',
    secondaryHref: '/contact/',
  },
};
