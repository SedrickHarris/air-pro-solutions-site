import type { ReactNode } from 'react';

// Splits `text` on **bold** markers and wraps the matched segments in <strong>. The plain string
// (with ** markers stripped) is what should be fed to any matching schema text.
export function renderBold(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}
