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
  dollar: 'M12 3v18M16 7.5c-1-1-2.4-1.5-4-1.5-2.2 0-4 1-4 3s1.8 2.5 4 3 4 1 4 3-1.800 3-4 3c-1.700 0-3.200-.6-4.200-1.700',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  check: 'M4 12l5 5L20 6',
  pin: 'M12 21s-7-6.200-7-11.500a7 7 0 0 1 14 0C19 14.800 12 21 12 21zM12 7.500a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5z',
  shield: 'M12 3l8 3v6c0 4.500-3.400 8-8 9-4.600-1-8-4.500-8-9V6zM9 12l2 2 4-4',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  star: 'M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z',
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] ?? 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'} />
    </svg>
  );
}
