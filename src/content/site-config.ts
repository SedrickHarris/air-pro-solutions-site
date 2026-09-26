export const siteConfig = {
  name: 'Air Pro Solutions',
  domain: 'airprosolutionsheatingandcooling.com',
  url: 'https://airprosolutionsheatingandcooling.com',
  email: 'contact@airprosolutionsheatingandcooling.com',
  phone: '(323) 776-9047',
  phoneHref: 'tel:+13237769047',
  licenses: ['1126691', '50251'],
  rating: 4.8,
  reviewCount: 40,
  // Supplied in the homepage build brief.
  hours: 'Mon-Fri 7a-7p · Sat 8a-4p',
  emergency: '24/7 emergency dispatch',
  orgId: 'https://airprosolutionsheatingandcooling.com/#organization',
  // Derived from public/images/brand/logos (originals kept there). logo-mark.webp is the transparent 192px WebP icon.
  logo: '/images/logo-mark.webp',
  ogImage: '/images/og-default.png', // 1200x630, generated from the full-color navy logo
} as const;
