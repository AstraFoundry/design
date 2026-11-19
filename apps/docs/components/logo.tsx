/** The docs' mark: a sun, one yellow disc on ink. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect width="24" height="24" rx="7" fill="var(--foreground)" />
      <circle cx="12" cy="12" r="5" fill="var(--yellow-500)" />
    </svg>
  );
}
