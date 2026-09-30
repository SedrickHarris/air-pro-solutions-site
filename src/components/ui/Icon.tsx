// Minimal stroke icon set. TODO(design): swap for the approved icon artwork if it differs.
const paths: Record<string, string> = {
  snowflake: 'M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.3-.7-.7-2.3z',
  'calendar-check': 'M4 5h16v16H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4',
  flame: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z',
  furnace: 'M4 4h16v16H4zM8 9h8M8 13h8M8 17h8',
  'heat-pump': 'M3 8h18v8H3zM7 12h.01M11 12h6',
  'mini-split': 'M3 6h18v6H3zM6 15l-1 4M12 15v4M18 15l1 4',
  duct: 'M3 8h12v8H3zM15 10h6v4h-6z',
  air: 'M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h8',
  alert: 'M12 3l10 18H2zM12 10v5M12 18h.01',
  building: 'M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18',
  home: 'M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6',
  store: 'M4 9l1-5h14l1 5M4 9v11h16V9M4 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-6h4v6',
  dollar: 'M12 3v18M16 7.5c-1-1-2.4-1.5-4-1.5-2.2 0-4 1-4 3s1.8 2.5 4 3 4 1 4 3-1.800 3-4 3c-1.700 0-3.200-.6-4.200-1.700',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  check: 'M4 12l5 5L20 6',
  pin: 'M12 21s-7-6.200-7-11.500a7 7 0 0 1 14 0C19 14.800 12 21 12 21zM12 7.500a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5z',
  shield: 'M12 3l8 3v6c0 4.500-3.400 8-8 9-4.600-1-8-4.500-8-9V6zM9 12l2 2 4-4',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  star: 'M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z',
  refresh: 'M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0 0 14.1 3.5M19.5 9a8 8 0 0 0-14.1-3.5',
  'shield-check': 'M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  buildings: 'M4 21V9l6-4v16M10 21V3l10 5v13M3 21h18M14 11h2M14 15h2',
  'doc-check': 'M7 3h7l4 4v14H7zM14 3v4h4M10 13.5l1.7 1.7 3-3.4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6L6 18',
  thermometer: 'M12 3a2 2 0 0 0-2 2v9.5a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2zM10 8h3',
  droplet: 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z',
  doc: 'M7 3h9l4 4v14H7zM16 3v4h4M9 12h6M9 16h6',
  // Added for the /ductwork/ related-services row (Furnace Repair card) - see build report.
  flag: 'M5 21V4M5 4h13l-3 4 3 4H5',
  gauge: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 12l4-4M8 16l.01.01',
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] ?? 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'} />
    </svg>
  );
}
