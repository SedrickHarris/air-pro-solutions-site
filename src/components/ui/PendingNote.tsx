// Visible "coming soon" state for content that depends on Phase 0 inputs.
// Search for PendingNote before launch: every use is unresolved client data.
export function PendingNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="pending" data-pending="phase-0">
      <strong>Coming soon:</strong> {children}
    </p>
  );
}
